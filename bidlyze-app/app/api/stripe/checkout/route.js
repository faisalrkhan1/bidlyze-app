import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getStripe, getPlanByPriceId, PRICE_IDS } from "@/lib/stripe";

const validPriceIds = new Set(Object.values(PRICE_IDS));

export async function POST(request) {
  try {
    // Authenticate user
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized — no token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "undefined" || token === "null") {
      return NextResponse.json(
        { success: false, error: "Unauthorized — invalid token" },
        { status: 401 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized — session expired. Please log in again.",
        },
        { status: 401 }
      );
    }

    const { priceId } = await request.json();

    if (!priceId || !validPriceIds.has(priceId)) {
      return NextResponse.json(
        { success: false, error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    const plan = getPlanByPriceId(priceId);
    const stripe = getStripe();

    // Derive base URL from the request origin so it works in local dev and production
    const origin = request.headers.get("origin") || request.headers.get("referer")?.replace(/\/[^/]*$/, "") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Check if user already has a Stripe customer ID
    const { data: existingSub } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    let customerOptions = {};
    if (existingSub?.stripe_customer_id) {
      customerOptions = { customer: existingSub.stripe_customer_id };
    } else {
      customerOptions = {
        customer_email: user.email,
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      ...customerOptions,
      metadata: {
        user_id: user.id,
        plan: plan || "unknown",
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          plan: plan || "unknown",
        },
      },
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);

    // Surface the actual error message for debugging
    const message =
      error?.message || error?.raw?.message || "Unknown error creating checkout session";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

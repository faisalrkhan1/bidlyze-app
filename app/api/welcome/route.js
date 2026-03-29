import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail, buildWelcomeEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Send welcome email (fire and forget — no error returned to client)
    const email = buildWelcomeEmail();
    sendEmail({ to: user.email, subject: email.subject, html: email.html })
      .catch((err) => console.error("Failed to send welcome email:", err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Welcome API error:", error);
    return NextResponse.json({ success: false, error: "Failed" }, { status: 500 });
  }
}

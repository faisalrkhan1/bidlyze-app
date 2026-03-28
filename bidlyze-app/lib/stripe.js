import Stripe from "stripe";
import { DOC_LIMITS, PLAN_LIMITS, PLANS, PRICE_IDS } from "@/lib/billing-config";

let _stripe;
export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

export function getPlanByPriceId(priceId) {
  const mapping = {
    [PRICE_IDS.starter]: "starter",
    [PRICE_IDS.professional]: "professional",
    [PRICE_IDS.enterprise]: "enterprise",
  };
  return mapping[priceId] || null;
}

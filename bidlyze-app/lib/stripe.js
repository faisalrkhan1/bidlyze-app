import Stripe from "stripe";

let _stripe;
export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

export const PRICE_IDS = {
  starter: "price_1TDLd7JbZq5ga8LYLedS8Xsb",
  professional: "price_1TDLdkJbZq5ga8LY1wnyYxAC",
  enterprise: "price_1TDLeWJbZq5ga8LYsAOgqoQ1",
};

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    analysesLimit: 3,
    features: [
      "3 analyses per month",
      "PDF, DOCX, TXT upload",
      "AI-powered analysis",
      "PDF export",
      "Email notifications",
    ],
  },
  starter: {
    name: "Starter",
    price: 29,
    priceId: PRICE_IDS.starter,
    analysesLimit: 10,
    features: [
      "10 analyses per month",
      "Everything in Free",
      "Proposal Writer",
      "Amendment Intelligence",
      "Priority processing",
    ],
  },
  professional: {
    name: "Professional",
    price: 99,
    priceId: PRICE_IDS.professional,
    analysesLimit: 30,
    popular: true,
    features: [
      "30 analyses per month",
      "Everything in Starter",
      "Competitor Intelligence",
      "Pricing Advisor",
      "Risk Radar",
      "Priority support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 299,
    priceId: PRICE_IDS.enterprise,
    analysesLimit: null,
    features: [
      "Unlimited analyses",
      "Everything in Professional",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "Team collaboration",
    ],
  },
};

export function getPlanByPriceId(priceId) {
  const mapping = {
    [PRICE_IDS.starter]: "starter",
    [PRICE_IDS.professional]: "professional",
    [PRICE_IDS.enterprise]: "enterprise",
  };
  return mapping[priceId] || null;
}

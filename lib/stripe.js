import Stripe from "stripe";

let _stripe;
export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

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
    price: 49,
    analysesLimit: 15,
    features: [
      "15 analyses per month",
      "Everything in Free",
      "Proposal Writer",
      "Amendment Intelligence",
      "Priority processing",
    ],
  },
  professional: {
    name: "Professional",
    price: 149,
    analysesLimit: 50,
    popular: true,
    features: [
      "50 analyses per month",
      "Everything in Starter",
      "Competitor Intelligence",
      "Pricing Advisor",
      "Risk Radar",
      "Priority support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: null,
    analysesLimit: Infinity,
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
    [process.env.STRIPE_STARTER_PRICE_ID]: "starter",
    [process.env.STRIPE_PROFESSIONAL_PRICE_ID]: "professional",
  };
  return mapping[priceId] || null;
}

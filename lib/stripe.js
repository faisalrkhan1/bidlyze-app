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
      "Requirement extraction & tracking",
      "30-day history",
    ],
  },
  pro: {
    name: "Professional",
    price: 49,
    analysesLimit: 25,
    popular: true,
    features: [
      "25 analyses per month",
      "Everything in Free",
      "Source references & compliance matrix",
      "Deadline Tracker & action items",
      "Proposal Writer & bid comparison",
      "Excel export & unlimited history",
    ],
  },
  team: {
    name: "Team",
    price: 149,
    analysesLimit: 80,
    features: [
      "80 analyses per month",
      "Everything in Professional",
      "Internal review comments",
      "Audit trail",
      "Branded PDF exports",
      "Priority support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: null,
    analysesLimit: Infinity,
    features: [
      "Unlimited analyses",
      "Everything in Team",
      "Custom integrations",
      "SSO & admin controls",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
};

export function getPlanByPriceId(priceId) {
  const mapping = {
    [process.env.STRIPE_PRO_PRICE_ID]: "pro",
    [process.env.STRIPE_TEAM_PRICE_ID]: "team",
  };
  return mapping[priceId] || null;
}

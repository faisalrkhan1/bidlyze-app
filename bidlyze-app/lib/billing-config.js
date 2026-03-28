export const PRICE_IDS = {
  starter: "price_1TDLd7JbZq5ga8LYLedS8Xsb",
  professional: "price_1TDLdkJbZq5ga8LY1wnyYxAC",
  enterprise: "price_1TDLeWJbZq5ga8LYsAOgqoQ1",
};

// Canonical analyses limits used across UI and server code.
// null = unlimited (enterprise).
export const PLAN_LIMITS = {
  free: 3,
  starter: 10,
  professional: 50,
  enterprise: null,
};

// Max documents per upload session by plan.
// null = unlimited at the config level; the current upload UI caps it to 20.
export const DOC_LIMITS = {
  free: 1,
  starter: 5,
  professional: 20,
  enterprise: null,
};

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    period: "forever",
    analysesLimit: PLAN_LIMITS.free,
    cta: "Start Free",
    features: [
      "3 tender analyses per month",
      "Single document upload",
      "AI summary & bid score",
      "Basic compliance checklist",
      "PDF report export",
      "No signup required",
    ],
  },
  starter: {
    name: "Starter",
    price: 29,
    period: "/month",
    priceId: PRICE_IDS.starter,
    analysesLimit: PLAN_LIMITS.starter,
    cta: "Get Started",
    features: [
      "10 analyses per month",
      "5 documents per analysis",
      "Full risk & compliance analysis",
      "PDF + Excel export",
      "Full analysis history",
      "Email support",
    ],
  },
  professional: {
    name: "Professional",
    price: 99,
    period: "/month",
    priceId: PRICE_IDS.professional,
    analysesLimit: PLAN_LIMITS.professional,
    popular: true,
    cta: "Start Free Trial",
    features: [
      "50 analyses per month",
      "20 documents per analysis",
      "Everything in Starter",
      { text: "Multi-document intelligence", comingSoon: true },
      { text: "Scope decomposition", comingSoon: true },
      { text: "Proposal structure generator", comingSoon: true },
      { text: "Word template export", comingSoon: true },
      { text: "Up to 10 users", comingSoon: true },
      "Priority support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 299,
    period: "/month",
    priceId: PRICE_IDS.enterprise,
    analysesLimit: PLAN_LIMITS.enterprise,
    cta: "Contact Sales",
    ctaHref: "mailto:hello@bidlyze.com",
    features: [
      "Unlimited analyses",
      "Unlimited documents",
      "Everything in Professional",
      { text: "API access", comingSoon: true },
      { text: "Unlimited users", comingSoon: true },
      "Dedicated account manager",
      { text: "Custom integrations", comingSoon: true },
    ],
  },
};

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { getSupabase } from "@/lib/supabase";
import AppShell from "@/app/components/AppShell";

// ─── Pricing Data (easily editable) ────────────────────────────────────────

const PLANS = [
  {
    key: "starter",
    name: "Starter",
    audience: "For individuals and freelancers",
    price: 29,
    period: "/month",
    analysesLimit: 10,
    cta: "Start Free Trial",
    features: [
      "10 analyses per month",
      "RFI / RFQ / RFP / Other support",
      "Single-document analysis",
      "Summary & requirement extraction",
      "Basic compliance mapping",
      "PDF export",
      "30-day analysis history",
      "Email notifications",
    ],
  },
  {
    key: "professional",
    name: "Professional",
    audience: "For bid teams and consultancies",
    price: 99,
    period: "/month",
    analysesLimit: 40,
    popular: true,
    cta: "Start Free Trial",
    features: [
      "40 analyses per month",
      "Everything in Starter",
      "Advanced RFx-type outputs",
      "Full compliance matrix",
      "Risk & assumption mapping",
      "Clarification question generation",
      "Bid / No-Bid decision support",
      "Proposal Writer (6 sections)",
      "Amendment Intelligence",
      "Branded PDF exports",
      "Full analysis history",
      "Priority processing",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    audience: "For organizations and large bid teams",
    price: null,
    period: "",
    analysesLimit: null,
    cta: "Contact Sales",
    features: [
      "Custom analysis volume",
      "Everything in Professional",
      "Team workspace & collaboration",
      "Shared analysis library",
      "Admin controls & permissions",
      "Custom analysis templates",
      "Advanced export formats",
      "Priority support & SLA",
      "Custom onboarding",
      "API access (roadmap)",
    ],
  },
];

// ─── Feature Comparison Data ────────────────────────────────────────────────

const COMPARISON_SECTIONS = [
  {
    category: "Document Support",
    features: [
      { name: "RFI / RFQ / RFP / Other", starter: true, professional: true, enterprise: true },
      { name: "PDF, DOCX, TXT upload", starter: true, professional: true, enterprise: true },
      { name: "Single-document analysis", starter: true, professional: true, enterprise: true },
      { name: "Multi-document packages", starter: false, professional: "Roadmap", enterprise: true },
    ],
  },
  {
    category: "Analysis & Intelligence",
    features: [
      { name: "Summary & key information extraction", starter: true, professional: true, enterprise: true },
      { name: "Requirement extraction table", starter: true, professional: true, enterprise: true },
      { name: "Basic compliance mapping", starter: true, professional: true, enterprise: true },
      { name: "Full compliance matrix", starter: false, professional: true, enterprise: true },
      { name: "Risk & assumption mapping", starter: false, professional: true, enterprise: true },
      { name: "Clarification question generation", starter: false, professional: true, enterprise: true },
      { name: "Bid / No-Bid scoring & decision support", starter: false, professional: true, enterprise: true },
      { name: "Win probability & competitive positioning", starter: false, professional: true, enterprise: true },
      { name: "Pricing Advisor", starter: false, professional: true, enterprise: true },
      { name: "Competitor Intelligence", starter: false, professional: true, enterprise: true },
      { name: "Custom analysis templates", starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: "Response & Proposals",
    features: [
      { name: "AI Proposal Writer (6 sections)", starter: false, professional: true, enterprise: true },
      { name: "Amendment Intelligence (version comparison)", starter: false, professional: true, enterprise: true },
      { name: "Internal notes & annotations", starter: true, professional: true, enterprise: true },
    ],
  },
  {
    category: "Export & History",
    features: [
      { name: "PDF export", starter: true, professional: true, enterprise: true },
      { name: "JSON export", starter: true, professional: true, enterprise: true },
      { name: "Branded exports", starter: false, professional: true, enterprise: true },
      { name: "Analysis history", starter: "30 days", professional: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Team & Administration",
    features: [
      { name: "Team workspace & collaboration", starter: false, professional: false, enterprise: true },
      { name: "Shared analysis library", starter: false, professional: false, enterprise: true },
      { name: "Admin controls & permissions", starter: false, professional: false, enterprise: true },
      { name: "Priority support & SLA", starter: false, professional: false, enterprise: true },
      { name: "Custom onboarding", starter: false, professional: false, enterprise: true },
      { name: "API access", starter: false, professional: false, enterprise: "Roadmap" },
    ],
  },
];

// ─── Helper Components ──────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function DashIcon() {
  return <span className="w-4 h-4 flex items-center justify-center text-xs" style={{ color: "var(--text-muted)" }}>—</span>;
}

function CellValue({ value }) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <DashIcon />;
  return <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{value}</span>;
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function PricingPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const [currentPlan, setCurrentPlan] = useState("free");
  const [usageCount, setUsageCount] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);

  useEffect(() => {
    if (!user) return;

    const supabase = getSupabase();

    supabase
      .from("subscriptions")
      .select("plan, analyses_limit, status")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.status === "active" && data?.plan) {
          setCurrentPlan(data.plan);
        }
      });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    supabase
      .from("analyses")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", startOfMonth)
      .then(({ count }) => setUsageCount(count ?? 0));
  }, [user]);

  async function handleSubscribe(planKey) {
    if (planKey === "enterprise") return;
    setLoadingPlan(planKey);

    try {
      const { data: { session } } = await getSupabase().auth.getSession();

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ plan: planKey }),
      });

      const data = await res.json();
      if (data.success && data.url) {
        window.location.assign(data.url);
      } else {
        console.error("Checkout error:", data.error);
        setLoadingPlan(null);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setLoadingPlan(null);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <AppShell user={user} onLogout={logout} breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Pricing" }]}>
      <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Plans & Pricing
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            One platform for RFI, RFQ, RFP, and tender analysis. Choose the plan that fits your workflow.
          </p>
          {usageCount !== null && (
            <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
              Current plan: <strong style={{ color: "var(--text-primary)" }}>{currentPlan === "free" ? "Free" : PLANS.find((p) => p.key === currentPlan)?.name || "Free"}</strong>
              {" "}&middot;{" "}
              {usageCount} analyses used this month
            </p>
          )}
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {PLANS.map((plan) => {
            const isCurrent = plan.key === currentPlan;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.key}
                className="relative rounded-2xl p-6 flex flex-col transition-colors duration-300"
                style={{
                  background: "var(--bg-subtle)",
                  border: isPopular ? "2px solid #10b981" : "1px solid var(--border-primary)",
                }}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                    Recommended
                  </span>
                )}

                {/* Plan header */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background: "var(--bg-input)", color: "var(--text-muted)", border: "1px solid var(--border-secondary)" }}>
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{plan.audience}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {plan.price !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-sm" style={{ color: "var(--text-muted)" }}>{plan.period}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-2xl font-bold">Custom</span>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Tailored to your organization</p>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.key === "enterprise" ? (
                  <a
                    href="mailto:sales@bidlyze.com"
                    className="w-full py-3 rounded-xl font-semibold text-sm text-center block transition-colors"
                    style={{ border: "1px solid var(--border-secondary)", color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-input)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    Contact Sales
                  </a>
                ) : isCurrent ? (
                  <button disabled className="w-full py-3 rounded-xl font-semibold text-sm opacity-40 cursor-not-allowed" style={{ border: "1px solid var(--border-secondary)" }}>
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.key)}
                    disabled={loadingPlan === plan.key}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60 ${
                      isPopular ? "bg-emerald-500 hover:bg-emerald-400 text-white" : ""
                    }`}
                    style={!isPopular ? { border: "1px solid var(--border-secondary)", color: "var(--text-secondary)" } : {}}
                    onMouseEnter={(e) => { if (!isPopular) e.currentTarget.style.background = "var(--bg-input)"; }}
                    onMouseLeave={(e) => { if (!isPopular) e.currentTarget.style.background = "transparent"; }}
                  >
                    {loadingPlan === plan.key ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Redirecting...
                      </span>
                    ) : plan.cta}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-12">
          <h2 className="text-xl font-bold tracking-tight mb-6 text-center">Feature Comparison</h2>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-primary)" }}>
            {/* Table Header */}
            <div
              className="grid grid-cols-12 gap-2 px-5 py-4 text-xs font-semibold uppercase tracking-wider"
              style={{ background: "var(--bg-subtle)", color: "var(--text-muted)", borderBottom: "1px solid var(--border-primary)" }}
            >
              <div className="col-span-6">Feature</div>
              <div className="col-span-2 text-center">Starter</div>
              <div className="col-span-2 text-center text-emerald-500">Professional</div>
              <div className="col-span-2 text-center">Enterprise</div>
            </div>

            {/* Sections */}
            {COMPARISON_SECTIONS.map((section) => (
              <div key={section.category}>
                {/* Category Header */}
                <div
                  className="px-5 py-3 text-xs font-bold uppercase tracking-wider"
                  style={{ background: "var(--bg-subtle)", color: "var(--text-muted)", borderBottom: "1px solid var(--border-primary)" }}
                >
                  {section.category}
                </div>

                {/* Feature Rows */}
                {section.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="grid grid-cols-12 gap-2 px-5 py-3 items-center text-sm"
                    style={{ borderBottom: "1px solid var(--border-primary)" }}
                  >
                    <div className="col-span-6" style={{ color: "var(--text-secondary)" }}>{feature.name}</div>
                    <div className="col-span-2 flex justify-center"><CellValue value={feature.starter} /></div>
                    <div className="col-span-2 flex justify-center"><CellValue value={feature.professional} /></div>
                    <div className="col-span-2 flex justify-center"><CellValue value={feature.enterprise} /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
            All plans include support for RFI, RFQ, RFP, and other tender document types.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Need a custom plan or have questions?{" "}
            <a href="mailto:sales@bidlyze.com" className="text-emerald-500 hover:text-emerald-400 transition-colors">Contact sales</a>
          </p>
        </div>
      </div>
    </AppShell>
  );
}

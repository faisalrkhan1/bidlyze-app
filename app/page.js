import Link from "next/link";
import { LogoMark } from "@/app/components/Logo";

export const metadata = {
  title: "Bidlyze — AI-Powered Tender Analysis & Bid Intelligence Platform",
  description:
    "Analyze tender documents in 60 seconds with AI. Get compliance checks, risk assessment, bid scoring, win probability, and proposal generation. The smartest way to decide which tenders to pursue.",
  keywords: "tender analysis, bid management, procurement intelligence, tender compliance, bid scoring, proposal automation, tender risk assessment, bid intelligence, go no-go decision, tender management software",
  openGraph: {
    title: "Bidlyze — AI-Powered Tender Analysis & Bid Intelligence",
    description: "From tender document to bid decision in 60 seconds. AI-powered compliance checks, risk radar, bid scoring, and proposal generation.",
    type: "website",
    locale: "en_US",
    siteName: "Bidlyze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bidlyze — AI-Powered Tender Analysis",
    description: "From tender document to bid decision in 60 seconds.",
  },
};

const FEATURES = [
  {
    title: "Bid/No-Bid Scoring",
    description: "AI evaluates every tender on a 0-100 scale with a clear BID or NO-BID recommendation backed by detailed reasoning.",
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
  },
  {
    title: "Compliance Analysis",
    description: "Automatically extract every compliance requirement and map gaps, missing documents, and certification needs with an actionable remediation plan.",
    icon: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
  },
  {
    title: "Risk Radar",
    description: "Identify timeline, financial, technical, and compliance risks with severity ratings, likelihood assessments, and mitigation strategies.",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  },
  {
    title: "Win Probability",
    description: "Get AI-estimated win probability across 6 assessment factors with strengths, weaknesses, and competitive positioning analysis.",
    icon: "M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.04 6.04 0 0 1-2.02 1.118M14.27 9.728a6.04 6.04 0 0 1-2.02 1.118m0 0a5.97 5.97 0 0 1-.518.087M12.25 10.846a5.97 5.97 0 0 1-.518-.087",
  },
  {
    title: "Pricing Advisor",
    description: "Get AI-recommended pricing strategies — aggressive, balanced, or premium — with estimated ranges based on tender scope and market data.",
    icon: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    title: "Proposal Writer",
    description: "Generate tailored proposal sections — executive summary, technical response, compliance matrix, methodology, and more — from your analysis.",
    icon: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
  },
];

const STEPS = [
  { step: "01", title: "Upload Your Tender", description: "Drop a PDF, DOCX, or TXT file. Our AI reads the entire document in seconds." },
  { step: "02", title: "Get Instant Analysis", description: "Receive a comprehensive breakdown: compliance gaps, risks, scoring, and competitor insights." },
  { step: "03", title: "Decide & Respond", description: "Make informed bid/no-bid decisions and generate tailored proposal sections to accelerate your response." },
];

const DIFFERENTIATORS = [
  { label: "60-Second Analysis", detail: "Upload to insights in under a minute, not days" },
  { label: "10+ Analysis Dimensions", detail: "Compliance, risk, pricing, competitors, win probability, and more" },
  { label: "AI Proposal Writer", detail: "Generate bid sections from your actual tender data" },
  { label: "Amendment Intelligence", detail: "Compare tender versions to detect every change" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "var(--bg-primary-translucent)", borderBottom: "1px solid var(--border-primary)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark size={30} />
            <span className="text-base font-semibold tracking-tight">Bidlyze</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: "var(--text-secondary)" }}>
            <a href="#features" className="hover:text-emerald-500 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-emerald-500 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-emerald-500 transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium transition-colors" style={{ color: "var(--text-secondary)" }}>
              Sign In
            </Link>
            <Link href="/login?tab=signup" className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, #10b981, transparent 70%)" }} />
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8" style={{ background: "var(--accent-muted)", color: "var(--accent-text)", border: "1px solid var(--accent-border)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            AI-Powered Tender Intelligence Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Stop guessing which<br />
            tenders to pursue.<br />
            <span className="text-emerald-500">Start knowing.</span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Upload any tender document and get AI-powered analysis in 60 seconds —
            compliance checks, risk assessment, bid scoring, pricing strategy, and ready-to-submit proposal sections.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/login?tab=signup" className="px-7 py-3.5 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30">
              Start Analyzing Tenders
            </Link>
            <a href="#how-it-works" className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all" style={{ border: "1px solid var(--border-secondary)", color: "var(--text-secondary)" }}>
              See How It Works
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex items-center justify-center gap-8 flex-wrap" style={{ color: "var(--text-muted)" }}>
            <div className="flex items-center gap-2 text-xs">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              No credit card required
            </div>
            <div className="flex items-center gap-2 text-xs">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              3 free analyses per month
            </div>
            <div className="flex items-center gap-2 text-xs">
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
              Results in under 60 seconds
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-20" style={{ borderTop: "1px solid var(--border-primary)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Traditional tender review is <span style={{ color: "var(--text-muted)" }}>slow, manual, and expensive</span>
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                Bid teams spend hours reading dense documents, manually extracting requirements, and making gut-feel decisions on whether to pursue. Compliance gaps get missed. Risks get overlooked. Winnable tenders get ignored.
              </p>
              <div className="space-y-3">
                {["Hours spent reading each tender document", "Manual compliance tracking in spreadsheets", "No data-driven go/no-go framework", "Proposal writing starts from scratch every time"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-primary)" }}>
              <h3 className="text-lg font-bold mb-4 text-emerald-500">Bidlyze replaces all of that</h3>
              <div className="space-y-4">
                {DIFFERENTIATORS.map((d) => (
                  <div key={d.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{d.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{d.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20" style={{ borderTop: "1px solid var(--border-primary)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Everything you need to <span className="text-emerald-500">win more tenders</span>
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              From initial analysis to final proposal, Bidlyze covers the entire bid decision workflow with AI that understands procurement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl transition-all duration-300 group" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-primary)" }}>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20" style={{ borderTop: "1px solid var(--border-primary)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              How Bidlyze works
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
              Three steps from document upload to bid-ready intelligence. No training. No configuration. No waiting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="text-4xl font-bold text-emerald-500/20 mb-3">{s.step}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/login?tab=signup" className="inline-flex px-7 py-3.5 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-lg shadow-emerald-500/20">
              Try It Now — It Takes 60 Seconds
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-20" style={{ borderTop: "1px solid var(--border-primary)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Simple, transparent pricing
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
              Start free. Upgrade when your team needs more capacity.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { name: "Free", price: "$0", period: "forever", features: ["3 analyses / month", "AI-powered analysis", "PDF export", "Email notifications"], cta: "Get Started" },
              { name: "Starter", price: "$49", period: "/ month", features: ["15 analyses / month", "Proposal Writer", "Amendment Intelligence", "Priority processing"], cta: "Start Free Trial", popular: true },
              { name: "Professional", price: "$149", period: "/ month", features: ["50 analyses / month", "Competitor Intelligence", "Pricing Advisor", "Priority support"], cta: "Start Free Trial" },
            ].map((plan) => (
              <div
                key={plan.name}
                className="relative p-6 rounded-2xl flex flex-col"
                style={{
                  background: "var(--bg-subtle)",
                  border: plan.popular ? "2px solid #10b981" : "1px solid var(--border-primary)",
                }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login?tab=signup"
                  className={`w-full py-3 rounded-xl text-sm font-semibold text-center transition-colors ${
                    plan.popular ? "bg-emerald-500 hover:bg-emerald-400 text-white" : ""
                  }`}
                  style={!plan.popular ? { border: "1px solid var(--border-secondary)", color: "var(--text-secondary)" } : {}}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
            Enterprise plans available for teams with unlimited needs.{" "}
            <a href="mailto:sales@bidlyze.com" className="text-emerald-500 hover:text-emerald-400 transition-colors">Contact sales</a>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20" style={{ borderTop: "1px solid var(--border-primary)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Ready to make smarter bid decisions?
          </h2>
          <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: "var(--text-secondary)" }}>
            Join procurement teams, consultants, and contractors who use Bidlyze to analyze tenders faster, reduce risk, and win more business.
          </p>
          <Link href="/login?tab=signup" className="inline-flex px-8 py-4 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-lg shadow-emerald-500/20">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border-primary)" }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <LogoMark size={26} />
              <span className="text-sm font-semibold">Bidlyze</span>
            </div>
            <div className="flex items-center gap-6 text-xs" style={{ color: "var(--text-muted)" }}>
              <a href="mailto:support@bidlyze.com" className="hover:text-emerald-500 transition-colors">Support</a>
              <a href="mailto:sales@bidlyze.com" className="hover:text-emerald-500 transition-colors">Sales</a>
              <Link href="/login" className="hover:text-emerald-500 transition-colors">Sign In</Link>
            </div>
          </div>
          <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} Bidlyze. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

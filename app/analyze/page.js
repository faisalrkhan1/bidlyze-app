"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { useTheme } from "@/lib/theme";

function ScoreBadge({ score }) {
  const color =
    score >= 70
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : score >= 40
      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      : "bg-red-500/10 text-red-400 border-red-500/20";

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${color}`}>
      {score}/100
    </span>
  );
}

function RecommendationBadge({ recommendation }) {
  const isBid = recommendation === "BID";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border ${
        isBid
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          : "bg-red-500/10 text-red-400 border-red-500/20"
      }`}
    >
      {isBid ? "BID" : "NO-BID"}
    </span>
  );
}

function SeverityBadge({ severity }) {
  const colors = {
    HIGH: "bg-red-500/10 text-red-400",
    MEDIUM: "bg-yellow-500/10 text-yellow-400",
    LOW: "bg-emerald-500/10 text-emerald-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[severity] || ""}`} style={!colors[severity] ? { background: "var(--icon-muted)", color: "var(--text-secondary)" } : {}}>
      {severity}
    </span>
  );
}

function Section({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl overflow-hidden transition-colors duration-300" style={{ border: "1px solid var(--border-primary)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors duration-300"
        onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-card-hover)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
      >
        <h3 className="font-semibold">{title}</h3>
        <svg
          className={`w-5 h-5 transition-transform`}
          style={{ color: "var(--text-secondary)", transform: open ? "rotate(180deg)" : "" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 pt-4 transition-colors duration-300" style={{ borderTop: "1px solid var(--border-primary)" }}>{children}</div>}
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="p-4 rounded-xl transition-colors duration-300" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-primary)" }}>
      <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="text-sm font-medium">{value || "Not specified"}</p>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300"
      style={{ border: "1px solid var(--border-secondary)", background: "var(--bg-subtle)" }}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "var(--text-secondary)" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      ) : (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "var(--text-secondary)" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      )}
    </button>
  );
}

export default function AnalyzePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;

    const stored = sessionStorage.getItem("bidlyze-result");
    if (!stored) {
      router.push("/");
      return;
    }
    try {
      setResult(JSON.parse(stored));
    } catch {
      router.push("/");
    }
  }, [router, user, authLoading]);

  if (authLoading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const { analysis, fileName } = result;
  const { summary, requirements, complianceChecklist, riskFlags, keyDates, evaluationCriteria, financialRequirements, bidScore } = analysis;

  function exportJSON() {
    const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bidlyze-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Header */}
      <header className="transition-colors duration-300" style={{ borderBottom: "1px solid var(--border-primary)" }}>
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-base text-white">
              B
            </div>
            <span className="text-lg font-semibold tracking-tight">Bidlyze</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm hidden sm:block" style={{ color: "var(--text-secondary)" }}>{user?.email}</span>
            <ThemeToggle />
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
              style={{ border: "1px solid var(--border-secondary)", background: "transparent" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-subtle)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              Analyze Another
            </button>
            <button
              onClick={exportJSON}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 hover:bg-emerald-400 transition-colors text-white"
            >
              Export JSON
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
              style={{ border: "1px solid var(--border-secondary)", background: "transparent" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-subtle)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">{summary?.projectName || "Tender Analysis"}</h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{fileName}</p>
          </div>
          <div className="flex items-center gap-3">
            {bidScore && <ScoreBadge score={bidScore.score} />}
            {bidScore && <RecommendationBadge recommendation={bidScore.recommendation} />}
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <InfoCard label="Issuing Authority" value={summary?.issuingAuthority} />
          <InfoCard label="Tender Reference" value={summary?.tenderReference} />
          <InfoCard label="Estimated Value" value={summary?.estimatedValue ? `${summary.currency || ""} ${summary.estimatedValue}` : null} />
          <InfoCard label="Deadline" value={summary?.submissionDeadline} />
          <InfoCard label="Duration" value={summary?.projectDuration} />
          <InfoCard label="Location" value={summary?.location} />
          <InfoCard label="Sector" value={summary?.sector} />
          <InfoCard label="Currency" value={summary?.currency} />
        </div>

        {/* Brief Description */}
        {summary?.briefDescription && (
          <div className="p-5 rounded-2xl transition-colors duration-300" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-primary)" }}>
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>Brief Description</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{summary.briefDescription}</p>
          </div>
        )}

        {/* AI Recommendation */}
        {bidScore?.reasoning && (
          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
            <p className="text-emerald-400 text-xs uppercase tracking-wider mb-2 font-semibold">
              AI Recommendation
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{bidScore.reasoning}</p>
          </div>
        )}

        {/* Collapsible Sections */}
        <div className="space-y-3">
          {/* Requirements */}
          {requirements?.length > 0 && (
            <Section title={`Requirements (${requirements.length})`} defaultOpen>
              <div className="space-y-3">
                {requirements.map((r, i) => (
                  <div key={i} className="p-4 rounded-xl transition-colors duration-300" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-primary)" }}>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <span className="text-xs font-medium uppercase" style={{ color: "var(--text-muted)" }}>{r.category}</span>
                      <div className="flex items-center gap-2">
                        {r.mandatory && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400">
                            Mandatory
                          </span>
                        )}
                        <SeverityBadge severity={r.priority} />
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.requirement}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Compliance Checklist */}
          {complianceChecklist?.length > 0 && (
            <Section title={`Compliance Checklist (${complianceChecklist.length})`}>
              <div className="space-y-2">
                {complianceChecklist.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-3 p-3 rounded-lg transition-colors duration-300"
                    style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-primary)" }}
                  >
                    <div>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{c.item}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{c.category}</p>
                    </div>
                    {c.critical && (
                      <span className="shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400">
                        Critical
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Risk Flags */}
          {riskFlags?.length > 0 && (
            <Section title={`Risk Flags (${riskFlags.length})`}>
              <div className="space-y-3">
                {riskFlags.map((r, i) => (
                  <div key={i} className="p-4 rounded-xl transition-colors duration-300" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-primary)" }}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-sm font-medium">{r.risk}</p>
                      <SeverityBadge severity={r.severity} />
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.recommendation}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Key Dates */}
          {keyDates?.length > 0 && (
            <Section title={`Key Dates (${keyDates.length})`}>
              <div className="space-y-2">
                {keyDates.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg transition-colors duration-300"
                    style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-primary)" }}
                  >
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{d.event}</span>
                    <span className="text-emerald-400 text-sm font-medium">{d.date}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Evaluation Criteria */}
          {evaluationCriteria?.length > 0 && (
            <Section title={`Evaluation Criteria (${evaluationCriteria.length})`}>
              <div className="space-y-3">
                {evaluationCriteria.map((e, i) => (
                  <div key={i} className="p-4 rounded-xl transition-colors duration-300" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-primary)" }}>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="text-sm font-medium">{e.criterion}</p>
                      <span className="shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">
                        {e.weight}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{e.details}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Financial Requirements */}
          {financialRequirements && (
            <Section title="Financial Requirements">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoCard label="Bid Bond" value={financialRequirements.bidBond} />
                <InfoCard label="Performance Bond" value={financialRequirements.performanceBond} />
                <InfoCard label="Minimum Turnover" value={financialRequirements.minimumTurnover} />
                <InfoCard label="Other Financial" value={financialRequirements.otherFinancial} />
              </div>
            </Section>
          )}
        </div>
      </main>
    </div>
  );
}

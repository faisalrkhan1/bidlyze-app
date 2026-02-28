"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[severity] || "bg-white/5 text-gray-400"}`}>
      {severity}
    </span>
  );
}

function Section({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <h3 className="font-semibold">{title}</h3>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 border-t border-white/5 pt-4">{children}</div>}
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="text-white text-sm font-medium">{value || "Not specified"}</p>
    </div>
  );
}

export default function AnalyzePage() {
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
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
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#08090c] text-white flex items-center justify-center">
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
    <div className="min-h-screen bg-[#08090c] text-white">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-base text-white">
              B
            </div>
            <span className="text-lg font-semibold tracking-tight">Bidlyze</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-white/10 hover:bg-white/5 transition-colors"
            >
              Analyze Another
            </button>
            <button
              onClick={exportJSON}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 hover:bg-emerald-400 transition-colors"
            >
              Export JSON
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">{summary?.projectName || "Tender Analysis"}</h1>
            <p className="text-gray-400 text-sm">{fileName}</p>
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
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Brief Description</p>
            <p className="text-gray-300 text-sm leading-relaxed">{summary.briefDescription}</p>
          </div>
        )}

        {/* AI Recommendation */}
        {bidScore?.reasoning && (
          <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
            <p className="text-emerald-400 text-xs uppercase tracking-wider mb-2 font-semibold">
              AI Recommendation
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">{bidScore.reasoning}</p>
          </div>
        )}

        {/* Collapsible Sections */}
        <div className="space-y-3">
          {/* Requirements */}
          {requirements?.length > 0 && (
            <Section title={`Requirements (${requirements.length})`} defaultOpen>
              <div className="space-y-3">
                {requirements.map((r, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <span className="text-xs font-medium text-gray-500 uppercase">{r.category}</span>
                      <div className="flex items-center gap-2">
                        {r.mandatory && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400">
                            Mandatory
                          </span>
                        )}
                        <SeverityBadge severity={r.priority} />
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{r.requirement}</p>
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
                    className="flex items-start justify-between gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <div>
                      <p className="text-gray-300 text-sm">{c.item}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{c.category}</p>
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
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-white text-sm font-medium">{r.risk}</p>
                      <SeverityBadge severity={r.severity} />
                    </div>
                    <p className="text-gray-400 text-sm">{r.recommendation}</p>
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
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <span className="text-gray-300 text-sm">{d.event}</span>
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
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="text-white text-sm font-medium">{e.criterion}</p>
                      <span className="shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">
                        {e.weight}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{e.details}</p>
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

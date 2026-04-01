"use client";

import { ConfidenceBadge, AIDisclaimer, getSectionConfidence } from "./AIConfidence";

/**
 * Type-specific analysis results for RFI, RFQ, and Other documents.
 * RFP uses the existing comprehensive layout in the main analysis page.
 * These components provide specialized, scannable layouts per document type.
 */

// ─── Shared UI Helpers ──────────────────────────────────────────────────────

function Card({ title, badge, children, className = "" }) {
  return (
    <div className={`rounded-2xl overflow-hidden ${className}`} style={{ border: "1px solid var(--border-primary)" }}>
      {title && (
        <div className="flex items-center gap-2.5 px-5 py-4" style={{ borderBottom: "1px solid var(--border-primary)" }}>
          <h3 className="font-semibold">{title}</h3>
          {badge}
        </div>
      )}
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  if (!value || value === "Not specified") return null;
  return (
    <div className="flex items-start gap-3 py-2" style={{ borderBottom: "1px solid var(--border-primary)" }}>
      <span className="text-xs font-medium uppercase tracking-wider shrink-0 w-36 pt-0.5" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{value}</span>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const colors = {
    HIGH: "bg-red-500/10 text-red-400",
    MEDIUM: "bg-amber-500/10 text-amber-400",
    LOW: "bg-emerald-500/10 text-emerald-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${colors[priority] || "bg-gray-500/10 text-gray-400"}`}>
      {priority}
    </span>
  );
}

function DecisionBadge({ decision, positive }) {
  const isPositive = positive || ["RESPOND", "QUOTE", "PURSUE", "BID"].includes(decision);
  const isNeutral = ["CONSIDER", "REVIEW"].includes(decision);
  const cls = isPositive
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    : isNeutral
    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
    : "bg-red-500/10 text-red-400 border-red-500/20";
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${cls}`}>
      {decision}
    </span>
  );
}

function EmptyState({ text }) {
  return <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>{text}</p>;
}

// ─── RFI Results ────────────────────────────────────────────────────────────

export function RFIResults({ analysis }) {
  const { summary, qualificationSummary, requestedInformation, capabilityFit, missingDetails, clarificationQuestions, keyDates, recommendation } = analysis;

  return (
    <div className="space-y-6">
      {/* Qualification Summary */}
      {qualificationSummary && (
        <Card title="Qualification Summary" badge={<ConfidenceBadge level="medium" />}>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold" style={{ color: qualificationSummary.fitScore >= 60 ? "#10b981" : qualificationSummary.fitScore >= 35 ? "#eab308" : "#ef4444" }}>
                {qualificationSummary.fitScore}
              </p>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Fit Score</p>
            </div>
            <div className="flex-1">
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${
                qualificationSummary.overallFit === "strong" ? "bg-emerald-500/10 text-emerald-400" :
                qualificationSummary.overallFit === "moderate" ? "bg-amber-500/10 text-amber-400" :
                "bg-red-500/10 text-red-400"
              }`}>
                {qualificationSummary.overallFit?.charAt(0).toUpperCase() + qualificationSummary.overallFit?.slice(1)} Fit
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{qualificationSummary.reasoning}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Strengths</p>
              <ul className="space-y-1.5">
                {qualificationSummary.keyStrengths?.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">Gaps</p>
              <ul className="space-y-1.5">
                {qualificationSummary.keyGaps?.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z" /></svg>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Requested Information */}
      {requestedInformation?.length > 0 && (
        <Card title={`Requested Information (${requestedInformation.length})`} badge={<ConfidenceBadge level="high" />}>
          <div className="space-y-3">
            {requestedInformation.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
                <span className="text-xs font-bold shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--bg-input)", color: "var(--text-muted)" }}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{item.item}</span>
                    <PriorityBadge priority={item.priority} />
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.category} {item.notes ? `— ${item.notes}` : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Clarification Questions */}
      {clarificationQuestions?.length > 0 && (
        <Card title={`Clarification Questions (${clarificationQuestions.length})`} badge={<ConfidenceBadge level="medium" />}>
          <div className="space-y-3">
            {clarificationQuestions.map((q, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium">{q.question}</p>
                  <PriorityBadge priority={q.priority} />
                </div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{q.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Missing Details */}
      {missingDetails?.length > 0 && (
        <Card title="Missing Details">
          <ul className="space-y-2">
            {missingDetails.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                {d}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Recommendation */}
      {recommendation && (
        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-emerald-400 text-xs uppercase tracking-wider font-semibold">Recommendation</p>
            <DecisionBadge decision={recommendation.decision} />
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{recommendation.reasoning}</p>
          {recommendation.nextSteps?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>Next Steps</p>
              <ul className="space-y-1.5">
                {recommendation.nextSteps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="text-emerald-500 font-bold text-xs mt-0.5">{i + 1}.</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── RFQ Results ────────────────────────────────────────────────────────────

export function RFQResults({ analysis }) {
  const { summary, commercialSummary, lineItems, submissionRequirements, commercialRisks, assumptions, keyDates, comparisonLayout, recommendation } = analysis;

  return (
    <div className="space-y-6">
      {/* Commercial Summary */}
      {commercialSummary && (
        <Card title="Commercial Summary" badge={<ConfidenceBadge level="high" />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            <InfoRow label="Pricing Structure" value={commercialSummary.pricingStructure} />
            <InfoRow label="Payment Terms" value={commercialSummary.paymentTerms} />
            <InfoRow label="Contract Type" value={commercialSummary.contractType} />
            <InfoRow label="Scope" value={commercialSummary.estimatedScope} />
          </div>
        </Card>
      )}

      {/* Line Items / BOQ */}
      {lineItems?.length > 0 && (
        <Card title={`Line Items / BOQ (${lineItems.length})`} badge={<ConfidenceBadge level="high" />}>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-primary)" }}>
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-wider" style={{ background: "var(--bg-subtle)", color: "var(--text-muted)", borderBottom: "1px solid var(--border-primary)" }}>
              <div className="col-span-1">#</div>
              <div className="col-span-4">Item</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Qty / Scope</div>
              <div className="col-span-3">Notes</div>
            </div>
            {lineItems.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 px-4 py-2.5 items-center text-sm" style={{ borderBottom: "1px solid var(--border-primary)" }}>
                <div className="col-span-1 text-xs" style={{ color: "var(--text-muted)" }}>{i + 1}</div>
                <div className="col-span-4 font-medium">{item.item}</div>
                <div className="col-span-2 text-xs" style={{ color: "var(--text-muted)" }}>{item.category || "—"}</div>
                <div className="col-span-2 text-xs" style={{ color: "var(--text-secondary)" }}>{item.quantity || "—"} {item.unit || ""}</div>
                <div className="col-span-3 text-xs" style={{ color: "var(--text-muted)" }}>{item.notes || "—"}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Commercial Risks */}
      {commercialRisks?.length > 0 && (
        <Card title={`Commercial Risks (${commercialRisks.length})`} badge={<ConfidenceBadge level="medium" />}>
          <div className="space-y-3">
            {commercialRisks.map((r, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{r.risk}</span>
                  <PriorityBadge priority={r.severity} />
                </div>
                <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>{r.impact}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Mitigation: {r.mitigation}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Submission Requirements */}
      {submissionRequirements?.length > 0 && (
        <Card title="Submission Requirements">
          <div className="space-y-2">
            {submissionRequirements.map((r, i) => (
              <div key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                <div>
                  <span className="font-medium">{r.requirement}</span>
                  {r.format && <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>({r.format})</span>}
                  {r.mandatory && <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-semibold">Required</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Assumptions */}
      {assumptions?.length > 0 && (
        <Card title="Assumptions to State">
          <ul className="space-y-2">
            {assumptions.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="text-xs font-bold shrink-0 text-amber-400 mt-0.5">{i + 1}.</span>
                {a}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Evaluation / Comparison */}
      {comparisonLayout && (
        <Card title="Evaluation Method" badge={<ConfidenceBadge level="medium" />}>
          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>{comparisonLayout.evaluationMethod}</p>
          {comparisonLayout.evaluationCriteria?.length > 0 && (
            <div className="space-y-1.5 mb-3">
              {comparisonLayout.evaluationCriteria.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-1.5" style={{ borderBottom: "1px solid var(--border-primary)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>{c.criterion}</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{c.weight}</span>
                </div>
              ))}
            </div>
          )}
          {comparisonLayout.tips && <p className="text-xs p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400">{comparisonLayout.tips}</p>}
        </Card>
      )}

      {/* Recommendation */}
      {recommendation && (
        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-emerald-400 text-xs uppercase tracking-wider font-semibold">Recommendation</p>
            <DecisionBadge decision={recommendation.decision} />
          </div>
          <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>{recommendation.reasoning}</p>
          {recommendation.pricingStrategy && (
            <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
              <span className="font-medium" style={{ color: "var(--text-secondary)" }}>Pricing strategy:</span> {recommendation.pricingStrategy}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Other Tender Results ───────────────────────────────────────────────────

export function OtherResults({ analysis }) {
  const { summary, documentClassification, obligations, keyDates, requiredAttachments, eligibility, recommendedActions, recommendation } = analysis;

  return (
    <div className="space-y-6">
      {/* Document Classification */}
      {documentClassification && (
        <Card title="Document Classification" badge={<ConfidenceBadge level={documentClassification.confidence?.toLowerCase() || "medium"} />}>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: "var(--accent-muted)", color: "var(--accent-text)", border: "1px solid var(--accent-border)" }}>
              {documentClassification.type}
            </span>
          </div>
          {documentClassification.notes && <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{documentClassification.notes}</p>}
        </Card>
      )}

      {/* Obligations */}
      {obligations?.length > 0 && (
        <Card title={`Obligations (${obligations.length})`} badge={<ConfidenceBadge level="high" />}>
          <div className="space-y-3">
            {obligations.map((o, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
                <span className="text-xs font-bold shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "var(--bg-input)", color: "var(--text-muted)" }}>{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium">{o.obligation}</span>
                    {o.mandatory && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-semibold">Mandatory</span>}
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {o.category}{o.deadline && o.deadline !== "Not specified" ? ` — Due: ${o.deadline}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Required Attachments */}
      {requiredAttachments?.length > 0 && (
        <Card title="Required Attachments">
          <div className="space-y-2">
            {requiredAttachments.map((a, i) => (
              <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                <div>
                  <span className="font-medium">{a.document}</span>
                  {a.mandatory && <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-semibold">Required</span>}
                  {a.description && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{a.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Eligibility */}
      {eligibility && (eligibility.criteria?.length > 0 || eligibility.restrictions?.length > 0) && (
        <Card title="Eligibility">
          {eligibility.criteria?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>Criteria</p>
              <ul className="space-y-1.5">
                {eligibility.criteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {eligibility.restrictions?.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>Restrictions</p>
              <ul className="space-y-1.5">
                {eligibility.restrictions.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}

      {/* Recommended Actions */}
      {recommendedActions?.length > 0 && (
        <Card title="Recommended Actions" badge={<ConfidenceBadge level="medium" />}>
          <div className="space-y-3">
            {recommendedActions.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
                <span className="text-xs font-bold shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-400">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium">{a.action}</span>
                    <PriorityBadge priority={a.priority} />
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {a.owner && a.owner !== "Not specified" ? `Owner: ${a.owner}` : ""}
                    {a.deadline && a.deadline !== "Not specified" ? ` — ${a.deadline}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommendation */}
      {recommendation && (
        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-emerald-400 text-xs uppercase tracking-wider font-semibold">Recommendation</p>
            <DecisionBadge decision={recommendation.decision} />
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{recommendation.reasoning}</p>
        </div>
      )}
    </div>
  );
}

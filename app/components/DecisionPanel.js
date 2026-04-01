"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabase } from "@/lib/supabase";
import { APPROVAL_STATES } from "@/lib/permissions";
import { addAuditEvent } from "./AuditTrail";

const DECISIONS = [
  { value: "bid", label: "Bid", color: "bg-emerald-500 text-white" },
  { value: "no_bid", label: "No Bid", color: "bg-red-500 text-white" },
  { value: "hold", label: "Hold", color: "bg-amber-500 text-white" },
  { value: "review", label: "Review Further", color: "bg-blue-500 text-white" },
];

/**
 * Decision management panel with approval workflow.
 * Persists in the `workflow_decision` JSONB field on the analyses table.
 */
export default function DecisionPanel({ analysisId, userId, userEmail, aiRecommendation }) {
  const [decision, setDecision] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!analysisId || !userId) { setLoaded(true); return; }
    getSupabase().from("analyses").select("workflow_decision").eq("id", analysisId).eq("user_id", userId).single()
      .then(({ data }) => { if (data?.workflow_decision) setDecision(data.workflow_decision); setLoaded(true); });
  }, [analysisId, userId]);

  const persist = useCallback(async (d) => {
    if (!analysisId || !userId) return;
    await getSupabase().from("analyses").update({ workflow_decision: d }).eq("id", analysisId).eq("user_id", userId);
  }, [analysisId, userId]);

  useEffect(() => {
    if (!loaded || !decision) return;
    const t = setTimeout(() => persist(decision), 600);
    return () => clearTimeout(t);
  }, [decision, loaded, persist]);

  function updateField(field, value) {
    setDecision((prev) => ({ ...(prev || {}), [field]: value, updatedAt: new Date().toISOString() }));
  }

  function setDecisionValue(value) {
    const prev = decision?.decision;
    updateField("decision", value);
    if (prev !== value) {
      addAuditEvent(analysisId, userId, {
        type: "decision",
        description: `Decision changed to "${DECISIONS.find((d) => d.value === value)?.label || value}"`,
        user: userEmail || "User",
      });
    }
  }

  function setApprovalState(state) {
    const prevState = decision?.approvalStatus;
    setDecision((prev) => ({
      ...(prev || {}),
      approvalStatus: state,
      ...(state === "approved" ? { approvedBy: userEmail || "User", approvedAt: new Date().toISOString() } : {}),
      ...(state === "rejected" ? { rejectedBy: userEmail || "User", rejectedAt: new Date().toISOString() } : {}),
      updatedAt: new Date().toISOString(),
    }));
    if (prevState !== state) {
      addAuditEvent(analysisId, userId, {
        type: "approval",
        description: `Approval status changed to "${APPROVAL_STATES[state]?.label || state}"`,
        user: userEmail || "User",
      });
    }
  }

  if (!loaded) return null;

  const currentDecision = decision?.decision;
  const approvalStatus = decision?.approvalStatus || "draft";
  const approvalConfig = APPROVAL_STATES[approvalStatus] || APPROVAL_STATES.draft;
  const isLocked = approvalStatus === "approved";

  return (
    <div className={`rounded-2xl overflow-hidden ${isLocked ? "opacity-90" : ""}`} style={{ border: isLocked ? "2px solid rgba(16,185,129,0.3)" : "1px solid var(--border-primary)" }}>
      {/* Header with approval status */}
      <div className="p-5 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border-primary)" }}>
        <div className="flex items-center gap-2.5">
          <h3 className="font-semibold">Internal Decision</h3>
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${approvalConfig.color}`}>
            {approvalConfig.label}
          </span>
          {isLocked && (
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          )}
        </div>
        <div className="text-right">
          {decision?.updatedAt && (
            <span className="text-[10px] block" style={{ color: "var(--text-muted)" }}>
              Updated: {new Date(decision.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          {decision?.approvedBy && approvalStatus === "approved" && (
            <span className="text-[10px] block text-emerald-400">
              Approved by {decision.approvedBy}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* AI Recommendation Reference */}
        {aiRecommendation && (
          <div className="p-3 rounded-xl" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-primary)" }}>
            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>AI Recommendation</p>
            <p className="text-sm font-medium" style={{ color: "var(--accent-text)" }}>{aiRecommendation.decision || (typeof aiRecommendation === "string" ? aiRecommendation : "—")}</p>
            {aiRecommendation.reasoning && <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{typeof aiRecommendation.reasoning === "string" ? aiRecommendation.reasoning : aiRecommendation.summary || ""}</p>}
          </div>
        )}

        {/* Decision Selector */}
        <div>
          <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>Your Decision</p>
          <div className="flex items-center gap-2 flex-wrap">
            {DECISIONS.map((d) => (
              <button
                key={d.value}
                onClick={() => !isLocked && setDecisionValue(d.value)}
                disabled={isLocked}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isLocked ? "cursor-not-allowed" : ""} ${
                  currentDecision === d.value ? d.color : ""
                }`}
                style={currentDecision !== d.value ? { border: "1px solid var(--border-secondary)", color: "var(--text-secondary)" } : {}}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Decision Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>Decision Owner</p>
            <input type="text" value={decision?.owner || ""} onChange={(e) => updateField("owner", e.target.value)} disabled={isLocked} placeholder="Who is making this decision..." className="w-full px-3 py-2 rounded-lg text-sm disabled:opacity-60" style={{ background: "var(--bg-input)", border: "1px solid var(--border-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>Decision Date</p>
            <input type="date" value={decision?.decisionDate || ""} onChange={(e) => updateField("decisionDate", e.target.value)} disabled={isLocked} className="w-full px-3 py-2 rounded-lg text-sm disabled:opacity-60" style={{ background: "var(--bg-input)", border: "1px solid var(--border-secondary)", color: "var(--text-primary)" }} />
          </div>
        </div>

        {/* Rationale */}
        <div>
          <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>Decision Rationale</p>
          <textarea value={decision?.rationale || ""} onChange={(e) => updateField("rationale", e.target.value)} disabled={isLocked} placeholder="Document why this decision was made..." rows={3} className="w-full px-3 py-2 rounded-lg text-sm resize-y disabled:opacity-60" style={{ background: "var(--bg-input)", border: "1px solid var(--border-secondary)", color: "var(--text-primary)" }} />
        </div>

        {/* Approval Workflow */}
        <div className="pt-4" style={{ borderTop: "1px solid var(--border-primary)" }}>
          <p className="text-[10px] uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Approval Workflow</p>

          {/* Approval progress */}
          <div className="flex items-center gap-1 mb-4">
            {Object.entries(APPROVAL_STATES).map(([key, config], i) => {
              const isActive = key === approvalStatus;
              const isPast = Object.keys(APPROVAL_STATES).indexOf(key) < Object.keys(APPROVAL_STATES).indexOf(approvalStatus);
              return (
                <div key={key} className="flex items-center gap-1 flex-1">
                  <div className={`flex-1 h-1.5 rounded-full ${isActive || isPast ? "bg-emerald-500" : ""}`} style={!isActive && !isPast ? { background: "var(--border-secondary)" } : {}} />
                  {i < Object.keys(APPROVAL_STATES).length - 1 && <div className="w-1" />}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {currentDecision && approvalStatus === "draft" && (
              <button onClick={() => setApprovalState("under_review")} className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors">
                Submit for Review
              </button>
            )}
            {approvalStatus === "under_review" && (
              <>
                <button onClick={() => setApprovalState("approved")} className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-white transition-colors">
                  Approve
                </button>
                <button onClick={() => setApprovalState("rejected")} className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-400 text-white transition-colors">
                  Request Revision
                </button>
              </>
            )}
            {approvalStatus === "rejected" && (
              <button onClick={() => setApprovalState("draft")} className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors" style={{ border: "1px solid var(--border-secondary)", color: "var(--text-secondary)" }}>
                Revise Decision
              </button>
            )}
            {approvalStatus === "approved" && (
              <button onClick={() => setApprovalState("draft")} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors" style={{ border: "1px solid var(--border-secondary)", color: "var(--text-muted)" }}>
                Reopen
              </button>
            )}
          </div>

          {/* Review Notes */}
          {(approvalStatus === "under_review" || approvalStatus === "rejected" || decision?.reviewNotes) && (
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>Review / Approval Notes</p>
              <textarea value={decision?.reviewNotes || ""} onChange={(e) => updateField("reviewNotes", e.target.value)} placeholder="Notes from reviewers or approvers..." rows={2} className="w-full px-3 py-2 rounded-lg text-sm resize-y" style={{ background: "var(--bg-input)", border: "1px solid var(--border-secondary)", color: "var(--text-primary)" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { getSupabase } from "@/lib/supabase";

const EVENT_ICONS = {
  decision: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  compliance: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
  action: "M12 4.5v15m7.5-7.5h-15",
  comment: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
  export: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3",
  approval: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
  created: "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
};

const EVENT_COLORS = {
  decision: "text-purple-400 bg-purple-500/10",
  compliance: "text-emerald-400 bg-emerald-500/10",
  action: "text-blue-400 bg-blue-500/10",
  comment: "text-gray-400 bg-gray-500/10",
  export: "text-cyan-400 bg-cyan-500/10",
  approval: "text-amber-400 bg-amber-500/10",
  created: "text-emerald-400 bg-emerald-500/10",
};

/**
 * Audit trail component.
 * Tracks important events per analysis record.
 * Persists in the `audit_trail` JSONB field on the analyses table.
 */
export default function AuditTrail({ analysisId, userId }) {
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!analysisId || !userId) { setLoaded(true); return; }
    getSupabase().from("analyses").select("audit_trail").eq("id", analysisId).eq("user_id", userId).single()
      .then(({ data }) => { if (data?.audit_trail?.length > 0) setEvents(data.audit_trail); setLoaded(true); });
  }, [analysisId, userId]);

  if (!loaded || events.length === 0) return null;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-primary)" }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-card-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div className="flex items-center gap-2.5">
          <svg className="w-4 h-4" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h3 className="font-semibold">Activity Log</h3>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--bg-input)", color: "var(--text-muted)" }}>{events.length}</span>
        </div>
        <svg className="w-5 h-5 transition-transform" style={{ color: "var(--text-secondary)", transform: expanded ? "rotate(180deg)" : "" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
      </button>

      {expanded && (
        <div className="px-5 pb-5" style={{ borderTop: "1px solid var(--border-primary)" }}>
          <div className="relative mt-3">
            {/* Timeline line */}
            <div className="absolute left-3.5 top-2 bottom-2 w-px" style={{ background: "var(--border-primary)" }} />

            <div className="space-y-4">
              {[...events].reverse().map((event, i) => {
                const icon = EVENT_ICONS[event.type] || EVENT_ICONS.created;
                const color = EVENT_COLORS[event.type] || EVENT_COLORS.created;
                return (
                  <div key={i} className="flex items-start gap-3 relative">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${color}`}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{event.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {new Date(event.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {event.user && <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>by {event.user}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Helper to add an audit event.
 * Call this from other components when important events happen.
 */
export async function addAuditEvent(analysisId, userId, event) {
  if (!analysisId || !userId) return;

  const supabase = getSupabase();
  const { data } = await supabase.from("analyses").select("audit_trail").eq("id", analysisId).eq("user_id", userId).single();
  const trail = data?.audit_trail || [];
  trail.push({ ...event, timestamp: new Date().toISOString() });

  // Keep last 100 events
  const trimmed = trail.slice(-100);
  await supabase.from("analyses").update({ audit_trail: trimmed }).eq("id", analysisId).eq("user_id", userId);
}

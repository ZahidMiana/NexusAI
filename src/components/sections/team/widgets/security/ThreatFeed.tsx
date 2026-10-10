"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { THREAT_TEMPLATES } from "@/data/security";
import { useInterval } from "@/hooks/useInterval";
import { useLiveCounter } from "@/hooks/useLiveMetric";
import { formatInteger } from "@/lib/format";
import { pick, randomInt } from "@/lib/math";

interface ThreatEvent {
  id: number;
  owasp: string;
  label: string;
  source: string;
}

/** Documentation-range IPs (RFC 5737), so the feed never shows a real address. */
const sourceIp = () => `${pick(["192.0.2", "198.51.100", "203.0.113"])}.${randomInt(2, 254)}`;

const SEED: readonly ThreatEvent[] = [
  { id: 2, owasp: "LLM01", label: "Prompt injection blocked", source: "203.0.113.42" },
  { id: 1, owasp: "LLM07", label: "System prompt probe blocked", source: "198.51.100.7" },
];

/** Simulated live feed of attacks stopped by a hardened LLM gateway. */
export function ThreatFeed() {
  const [events, setEvents] = useState<readonly ThreatEvent[]>(SEED);
  const blocked = useLiveCounter({ initial: 1284, minStep: 0, maxStep: 2, intervalMs: 1800 });

  useInterval(() => {
    const template = pick(THREAT_TEMPLATES);
    setEvents((current) => [{ id: (current[0]?.id ?? 0) + 1, owasp: template.owasp, label: template.label, source: sourceIp() }, ...current].slice(0, 6));
  }, 2200);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-line bg-inset px-4 py-3">
        <span className="flex items-center gap-2 font-tech text-xs tracking-[0.12em] text-fg-muted uppercase">
          <ShieldCheck className="h-4 w-4 text-cyber-lime" /> Attacks stopped today
        </span>
        <span className="font-display text-xl font-black text-cyber-lime tabular-nums">{formatInteger(blocked)}</span>
      </div>
      <ul className="space-y-1.5" aria-live="polite">
        <AnimatePresence initial={false}>
          {events.map((event) => (
            <motion.li
              key={event.id}
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between gap-3 rounded-lg border border-line bg-inset px-3 py-2 font-mono text-xs"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 rounded border border-cyber-pink/50 px-1.5 font-tech text-cyber-pink">{event.owasp}</span>
                <span className="truncate text-fg">{event.label}</span>
              </span>
              <span className="shrink-0 text-fg-muted">{event.source}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <p className="font-mono text-xs text-fg-muted">Simulated feed. Source IPs use reserved documentation ranges.</p>
    </div>
  );
}

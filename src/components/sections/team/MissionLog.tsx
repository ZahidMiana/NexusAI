"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Radar } from "lucide-react";
import { useState } from "react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { TEAM } from "@/data/team";
import { useInterval } from "@/hooks/useInterval";
import { useUptime } from "@/hooks/useUptime";
import { siteConfig } from "@/config/site";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { pick } from "@/lib/math";

const EVENTS = [
  "eval suite passed · 312/312",
  "canary promoted → 100% traffic",
  "LoRA adapter hot-swapped",
  "p95 latency ↓ 12ms",
  "agent graph checkpoint saved",
  "GGUF build signed + shipped",
  "vector index compacted",
  "guardrail policy updated",
] as const;

interface LogEntry {
  id: number;
  memberIndex: number;
  message: string;
}

const SEED: readonly LogEntry[] = [
  { id: 3, memberIndex: 0, message: EVENTS[0] },
  { id: 2, memberIndex: 1, message: EVENTS[1] },
  { id: 1, memberIndex: 2, message: EVENTS[5] },
];

/** Squad-level live event stream and collective uptime. */
export function MissionLog() {
  return (
    <BentoCard accent="lime" className="flex h-full flex-col gap-5 p-6">
      <div className="flex items-center justify-between">
        <BentoLabel index="02.∑" accent="lime">
          Squad Sync
        </BentoLabel>
        <Radar className="h-5 w-5 animate-flicker text-cyber-lime drop-glow-lime" />
      </div>
      <MissionFeed />
    </BentoCard>
  );
}

/** Lives inside the card so its timers pause with the card's activity boundary. */
function MissionFeed() {
  const [entries, setEntries] = useState<readonly LogEntry[]>(SEED);
  const { label } = useUptime(siteConfig.foundedAt);

  useInterval(() => {
    setEntries((current) => {
      const next: LogEntry = { id: (current[0]?.id ?? 0) + 1, memberIndex: Math.floor(Math.random() * TEAM.length), message: pick(EVENTS) };
      return [next, ...current].slice(0, 6);
    });
  }, 2600);

  return (
    <>
      <div>
        <p className="font-tech text-xs tracking-[0.14em] text-zinc-400 uppercase">Mesh uptime</p>
        <p className="mt-1 font-display text-lg font-black text-cyber-lime text-glow-lime tabular-nums">{label ?? "syncing…"}</p>
      </div>

      <ul className="flex-1 space-y-2 overflow-hidden" aria-live="polite">
        <AnimatePresence initial={false}>
          {entries.map((entry) => {
            const member = TEAM[entry.memberIndex];
            const tokens = accentTokens(member.accent);
            return (
              <motion.li
                key={entry.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border border-zinc-900 bg-black/40 px-3 py-2 font-mono text-xs"
              >
                <span className={cn("font-tech tracking-wider", tokens.text)}>{member.handle}</span>
                <span className="block text-zinc-300">{entry.message}</span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </>
  );
}

"use client";

import { COORDINATION_NODES } from "@/data/telemetry";
import { useNow } from "@/hooks/useNow";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { formatClock } from "@/lib/format";
import { StatusDot } from "@/components/ui/StatusDot";

/** Live world clocks for each coordination node in the agency mesh. */
export function CoordinationLog() {
  const now = useNow(1000);

  return (
    <ul className="space-y-2">
      {COORDINATION_NODES.map((node) => {
        const tokens = accentTokens(node.accent);
        return (
          <li key={node.id} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-900 bg-black/30 px-3 py-2">
            <span className="flex min-w-0 items-center gap-2.5">
              <StatusDot accent={node.accent} />
              <span className="min-w-0">
                <span className={cn("block truncate font-tech text-xs tracking-[0.12em]", tokens.text)}>{node.city}</span>
                <span className="block font-mono text-xs text-zinc-400">{node.role}</span>
              </span>
            </span>
            <span className="font-mono text-sm tabular-nums text-zinc-300">{now ? formatClock(now, node.timeZone) : "--:--:--"}</span>
          </li>
        );
      })}
    </ul>
  );
}

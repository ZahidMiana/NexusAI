"use client";

import { Rocket } from "lucide-react";
import { useState } from "react";
import { PRODUCT_LAUNCHES, type ProductLaunch } from "@/data/telemetry";
import { useInterval } from "@/hooks/useInterval";
import { cn } from "@/lib/cn";

const STATUS_STYLES: Record<ProductLaunch["status"], string> = {
  LIVE: "border-cyber-lime/40 bg-cyber-lime/10 text-cyber-lime",
  CANARY: "border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan",
  DEPLOYING: "border-cyber-pink/40 bg-cyber-pink/10 text-cyber-pink",
};

/** Live feed of agentic product launches with a progressing deployment. */
export function LaunchFeed() {
  const [progress, setProgress] = useState(18);
  useInterval(() => setProgress((current) => (current >= 100 ? 6 : Math.min(100, current + 3 + Math.random() * 6))), 500);

  return (
    <ul className="space-y-2">
      {PRODUCT_LAUNCHES.map((launch) => (
        <li key={launch.id} className="rounded-xl border border-zinc-800 bg-black/40 p-3 transition-colors hover:border-zinc-700">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Rocket className="h-4 w-4 shrink-0 text-cyber-pink" />
              <div className="min-w-0">
                <p className="truncate font-tech text-sm tracking-wider text-zinc-100">{launch.name}</p>
                <p className="truncate font-mono text-xs text-zinc-400">
                  {launch.client} · <span className="text-zinc-300">{launch.metric}</span>
                </p>
              </div>
            </div>
            <span className={cn("shrink-0 rounded border px-2 py-0.5 font-tech text-xs tracking-[0.12em]", STATUS_STYLES[launch.status])}>
              {launch.status}
            </span>
          </div>
          {launch.status === "DEPLOYING" && (
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-900">
                <div
                  className="h-full rounded-full bg-cyber-pink transition-[width] duration-500 ease-hardware"
                  style={{ width: `${progress}%`, boxShadow: "0 0 8px rgba(255,0,127,0.8)" }}
                />
              </div>
              <span className="w-10 text-right font-mono text-xs text-cyber-pink tabular-nums">{progress.toFixed(0)}%</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

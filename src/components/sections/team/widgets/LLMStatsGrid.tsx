"use client";

import { Activity, Cpu, Gauge, Layers3 } from "lucide-react";
import type { ReactNode } from "react";
import { MetricBar } from "@/components/ui/MetricBar";
import { useLiveCounter, useLiveMetric, useLiveSeries } from "@/hooks/useLiveMetric";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { formatCompact, formatInteger } from "@/lib/format";
import type { Accent } from "@/types";
import { Sparkline } from "./Sparkline";

const GPU_SEEDS = [
  { id: "H100-0", initial: 87 },
  { id: "H100-1", initial: 74 },
  { id: "H100-2", initial: 91 },
  { id: "H100-3", initial: 66 },
] as const;

/** Live LLM deployment telemetry: GPU load, token throughput and latency. */
export function LLMStatsGrid() {
  const throughput = useLiveSeries({ initial: 11800, amplitude: 650, min: 8500, max: 14500, intervalMs: 700, length: 40 });
  const tokensServed = useLiveCounter({ initial: 38_412_907_331, minStep: 9_000, maxStep: 14_000, intervalMs: 700 });
  const latency = useLiveMetric({ initial: 84, amplitude: 6, min: 61, max: 118, intervalMs: 1100 });
  const activeRequests = useLiveMetric({ initial: 342, amplitude: 24, min: 220, max: 480, intervalMs: 900 });
  const currentThroughput = throughput[throughput.length - 1];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-3 rounded-xl border border-zinc-800 bg-black/40 p-4">
        <div className="flex items-center justify-between font-tech text-xs tracking-[0.14em] text-zinc-400 uppercase">
          <span className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-cyber-cyan" /> GPU Fleet
          </span>
          <span className="text-cyber-lime">8× H100 · TP=4</span>
        </div>
        {GPU_SEEDS.map((gpu) => (
          <GpuMeter key={gpu.id} id={gpu.id} initial={gpu.initial} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-zinc-800 bg-black/40 p-4">
          <div className="flex items-center justify-between font-tech text-xs tracking-[0.14em] text-zinc-400 uppercase">
            <span className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-cyber-pink" /> Token throughput
            </span>
            <span className="text-cyber-lime">LIVE</span>
          </div>
          <p className="mt-2 font-display text-2xl font-black text-white tabular-nums">
            {formatInteger(currentThroughput)}
            <span className="ml-1 font-tech text-xs font-normal text-zinc-400">tok/s</span>
          </p>
          <Sparkline values={throughput} min={8000} max={15000} accent="pink" className="mt-2 h-12 w-full" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <StatTile icon={<Layers3 className="h-3.5 w-3.5" />} label="Served" value={formatCompact(tokensServed)} accent="cyan" />
          <StatTile icon={<Gauge className="h-3.5 w-3.5" />} label="P95" value={`${latency.toFixed(0)}ms`} accent="lime" />
          <StatTile icon={<Activity className="h-3.5 w-3.5" />} label="Req" value={activeRequests.toFixed(0)} accent="pink" />
        </div>
      </div>
    </div>
  );
}

function GpuMeter({ id, initial }: { id: string; initial: number }) {
  const usage = useLiveMetric({ initial, amplitude: 5, min: 48, max: 99, intervalMs: 900 });
  const accent: Accent = usage > 92 ? "pink" : usage > 80 ? "cyan" : "lime";
  return <MetricBar label={id} value={usage} accent={accent} />;
}

function StatTile({ icon, label, value, accent }: { icon: ReactNode; label: string; value: string; accent: Accent }) {
  const tokens = accentTokens(accent);
  return (
    <div className="rounded-xl border border-zinc-800 bg-black/40 p-3">
      <p className={cn("flex items-center gap-1 font-tech text-xs tracking-[0.12em] uppercase", tokens.text)}>
        {icon}
        {label}
      </p>
      <p className="mt-1 truncate font-display text-base font-black text-white tabular-nums">{value}</p>
    </div>
  );
}

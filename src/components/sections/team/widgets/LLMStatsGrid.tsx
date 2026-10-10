"use client";

import { Activity, Gauge, Layers3, Target } from "lucide-react";
import type { ReactNode } from "react";
import { MetricBar } from "@/components/ui/MetricBar";
import { useLiveCounter, useLiveMetric, useLiveSeries } from "@/hooks/useLiveMetric";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { formatInteger } from "@/lib/format";
import type { Accent } from "@/types";
import { Sparkline } from "./Sparkline";

const PIPELINE_STAGES = [
  { id: "EMBED", initial: 58 },
  { id: "RETRIEVE", initial: 71 },
  { id: "RERANK", initial: 46 },
  { id: "GENERATE", initial: 83 },
] as const;

/** Simulated live telemetry for a RAG + agent pipeline. */
export function LLMStatsGrid() {
  const queries = useLiveSeries({ initial: 118, amplitude: 9, min: 80, max: 160, intervalMs: 700, length: 40 });
  const chunks = useLiveCounter({ initial: 128_406, minStep: 3, maxStep: 14, intervalMs: 900 });
  const latency = useLiveMetric({ initial: 840, amplitude: 45, min: 620, max: 1150, intervalMs: 1100 });
  const recall = useLiveMetric({ initial: 0.91, amplitude: 0.01, min: 0.86, max: 0.95, intervalMs: 1300 });
  const currentQueries = queries[queries.length - 1];

  return (
    <div className="space-y-2">
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-3 rounded-xl border border-line bg-inset p-4">
        <div className="flex items-center justify-between font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">
          <span className="flex items-center gap-1.5">
            <Layers3 className="h-3.5 w-3.5 text-cyber-cyan" /> Pipeline load
          </span>
          <span className="text-cyber-lime">Hybrid RAG</span>
        </div>
        {PIPELINE_STAGES.map((stage) => (
          <StageMeter key={stage.id} id={stage.id} initial={stage.initial} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-line bg-inset p-4">
          <div className="flex items-center justify-between font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">
            <span className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-cyber-pink" /> Queries / min
            </span>
            <span className="text-cyber-lime">LIVE</span>
          </div>
          <p className="mt-2 font-display text-2xl font-black text-fg tabular-nums">{formatInteger(currentQueries)}</p>
          <Sparkline values={queries} min={70} max={170} accent="pink" className="mt-2 h-12 w-full" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <StatTile icon={<Layers3 className="h-3.5 w-3.5" />} label="Chunks" value={`${Math.round(chunks / 1000)}K`} accent="cyan" />
          <StatTile icon={<Gauge className="h-3.5 w-3.5" />} label="P95 ms" value={latency.toFixed(0)} accent="lime" />
          <StatTile icon={<Target className="h-3.5 w-3.5" />} label="Recall" value={recall.toFixed(2)} accent="pink" />
        </div>
      </div>
    </div>
    <p className="font-mono text-xs text-fg-muted">Simulated demo data, not live production metrics.</p>
    </div>
  );
}

function StageMeter({ id, initial }: { id: string; initial: number }) {
  const load = useLiveMetric({ initial, amplitude: 6, min: 25, max: 97, intervalMs: 900 });
  const accent: Accent = load > 88 ? "pink" : load > 65 ? "cyan" : "lime";
  return <MetricBar label={id} value={load} accent={accent} />;
}

function StatTile({ icon, label, value, accent }: { icon: ReactNode; label: string; value: string; accent: Accent }) {
  const tokens = accentTokens(accent);
  return (
    <div className="rounded-xl border border-line bg-inset p-3">
      <p className={cn("flex items-center gap-1 font-tech text-xs tracking-[0.12em] uppercase", tokens.text)}>
        {icon}
        {label}
      </p>
      <p className="mt-1 truncate font-display text-sm font-black text-fg tabular-nums">{value}</p>
    </div>
  );
}

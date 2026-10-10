"use client";

import { useMemo, useState } from "react";
import { formatCompact, formatCurrency, formatInteger } from "@/lib/format";
import { calculateRoi, type RoiInputs } from "@/lib/roi";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/types";

interface SliderSpec {
  key: keyof RoiInputs;
  label: string;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
}

const SLIDERS: readonly SliderSpec[] = [
  { key: "teamSize", label: "Team size", min: 5, max: 500, step: 5, format: (value) => `${value} ppl` },
  { key: "hoursSavedPerWeek", label: "Hours automated / person / wk", min: 1, max: 20, step: 1, format: (value) => `${value} h` },
  { key: "hourlyCost", label: "Loaded hourly cost", min: 20, max: 250, step: 5, format: (value) => formatCurrency(value) },
  { key: "implementationCost", label: "Build investment", min: 25_000, max: 600_000, step: 5_000, format: (value) => `$${formatCompact(value)}` },
];

/** Interactive first-year ROI estimator for agentic automation. */
export function RoiCalculator() {
  const [inputs, setInputs] = useState<RoiInputs>({ teamSize: 60, hoursSavedPerWeek: 6, hourlyCost: 85, implementationCost: 180_000 });
  const result = useMemo(() => calculateRoi(inputs), [inputs]);

  return (
    <div className="grid gap-4 sm:grid-cols-[1.3fr_1fr]">
      <div className="space-y-4 rounded-xl border border-zinc-800 bg-black/40 p-4">
        {SLIDERS.map((slider) => (
          <label key={slider.key} className="block space-y-1.5">
            <span className="flex items-center justify-between font-tech text-xs tracking-[0.12em] text-zinc-400 uppercase">
              {slider.label}
              <span className="text-cyber-pink tabular-nums">{slider.format(inputs[slider.key])}</span>
            </span>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={inputs[slider.key]}
              onChange={(event) => setInputs((current) => ({ ...current, [slider.key]: Number(event.target.value) }))}
              className="w-full cursor-pointer"
            />
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
        <RoiOutput label="Annual savings" value={formatCurrency(result.annualSavings)} accent="lime" />
        <RoiOutput label="First-year ROI" value={`${formatInteger(result.roiPercent)}%`} accent={result.roiPercent >= 0 ? "pink" : "cyan"} />
        <RoiOutput label="Hours reclaimed" value={formatCompact(result.annualHoursSaved)} accent="cyan" />
        <RoiOutput
          label="Payback"
          value={Number.isFinite(result.paybackMonths) ? `${result.paybackMonths.toFixed(1)} mo` : "—"}
          accent="lime"
        />
      </div>
    </div>
  );
}

function RoiOutput({ label, value, accent }: { label: string; value: string; accent: Accent }) {
  const tokens = accentTokens(accent);
  return (
    <div className="rounded-xl border border-zinc-800 bg-black/40 px-4 py-3">
      <p className="font-tech text-xs tracking-[0.14em] text-zinc-400 uppercase">{label}</p>
      <p className={cn("mt-1 truncate font-display text-lg font-black tabular-nums", tokens.text, tokens.textGlow)}>{value}</p>
    </div>
  );
}

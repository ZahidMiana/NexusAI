import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { clamp } from "@/lib/math";
import type { Accent } from "@/types";

export interface MetricBarProps {
  label: string;
  value: number;
  max?: number;
  unit?: string;
  accent?: Accent;
  decimals?: number;
  className?: string;
}

export function MetricBar({ label, value, max = 100, unit = "%", accent = "cyan", decimals = 0, className }: MetricBarProps) {
  const tokens = accentTokens(accent);
  const percent = clamp((value / max) * 100, 0, 100);
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between font-tech text-xs tracking-widest uppercase">
        <span className="text-fg-muted">{label}</span>
        <span className={cn("tabular-nums", tokens.text)}>
          {value.toFixed(decimals)}
          {unit}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-track">
        <div
          className={cn("h-full rounded-full transition-[width] duration-700 ease-hardware", tokens.bg)}
          style={{ width: `${percent}%`, boxShadow: `0 0 10px rgb(${tokens.rgb} / 0.8)` }}
        />
      </div>
    </div>
  );
}

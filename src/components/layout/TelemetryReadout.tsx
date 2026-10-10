"use client";

import { StatusDot } from "@/components/ui/StatusDot";
import { siteConfig } from "@/config/site";
import { useLiveMetric } from "@/hooks/useLiveMetric";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";

export interface TelemetryReadoutProps {
  layout?: "row" | "stack";
  className?: string;
}

/** Live system status shown in the navbar and in the mobile menu. */
export function TelemetryReadout({ layout = "row", className }: TelemetryReadoutProps) {
  const coreTemp = useLiveMetric({ initial: 41.6, amplitude: 0.6, min: 38, max: 46, intervalMs: 1500 });

  return (
    <div
      className={cn(
        "font-tech text-xs tracking-[0.12em] uppercase",
        layout === "row" ? "flex items-center gap-5" : "grid gap-2",
        className,
      )}
    >
      {siteConfig.navTelemetry.map((item) => {
        const tokens = accentTokens(item.accent);
        return (
          <div key={item.label} className="flex items-center gap-2">
            <StatusDot accent={item.accent} />
            <span className="text-zinc-400">{item.label}:</span>
            <span className={cn(tokens.text, tokens.textGlow)}>{item.value}</span>
            {item.label === "CORE_TEMP" && <span className="text-zinc-400 tabular-nums">{coreTemp.toFixed(1)}°C</span>}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { MetricBar } from "@/components/ui/MetricBar";
import { useLiveMetric } from "@/hooks/useLiveMetric";
import type { DeviceMode } from "./types";

interface ModeProfile {
  label: string;
  npu: number;
  cpu: number;
  thermal: number;
}

const PROFILES: Record<DeviceMode, ModeProfile> = {
  home: { label: "IDLE", npu: 4, cpu: 9, thermal: 31 },
  llm: { label: "LLM_DECODE", npu: 82, cpu: 34, thermal: 39 },
  cv: { label: "CV_PIPELINE", npu: 64, cpu: 47, thermal: 37 },
};

export interface DeviceTelemetryProps {
  mode: DeviceMode;
  llmActive: boolean;
}

/** External readout mirroring the simulated device's compute state. */
export function DeviceTelemetry({ mode, llmActive }: DeviceTelemetryProps) {
  const effectiveMode: DeviceMode = mode === "llm" && !llmActive ? "home" : mode;
  const profile = PROFILES[effectiveMode];

  return (
    <div className="space-y-3 rounded-xl border border-line bg-inset p-4">
      <div className="flex items-center justify-between font-tech text-[11px] tracking-[0.14em] uppercase">
        <span className="text-fg-muted">Device telemetry</span>
        <span className="text-cyber-lime">{profile.label}</span>
      </div>
      <LiveBar key={`npu-${effectiveMode}`} label="NPU" target={profile.npu} accent="lime" />
      <LiveBar key={`cpu-${effectiveMode}`} label="CPU" target={profile.cpu} accent="cyan" />
      <LiveBar key={`therm-${effectiveMode}`} label="Thermal" target={profile.thermal} unit="°C" max={50} accent="pink" />
    </div>
  );
}

interface LiveBarProps {
  label: string;
  target: number;
  accent: "lime" | "cyan" | "pink";
  unit?: string;
  max?: number;
}

function LiveBar({ label, target, accent, unit = "%", max = 100 }: LiveBarProps) {
  const value = useLiveMetric({ initial: target, amplitude: Math.max(1, target * 0.06), min: Math.max(0, target * 0.85), max: Math.min(max, target * 1.12), intervalMs: 700 });
  return <MetricBar label={label} value={value} unit={unit} max={max} accent={accent} />;
}

"use client";

import { Play, Square } from "lucide-react";
import { useState } from "react";
import { ON_DEVICE_MODELS, ON_DEVICE_PROMPT, ON_DEVICE_RESPONSE, type OnDeviceModel } from "@/data/telemetry";
import { useInterval } from "@/hooks/useInterval";
import { useLiveMetric } from "@/hooks/useLiveMetric";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/cn";
import { ScreenHeader } from "./ScreenHeader";

type Phase = "idle" | "loading" | "generating" | "done";

export interface LlamaScreenProps {
  onBack: () => void;
  onActivityChange: (active: boolean) => void;
}

/** Simulates a quantized Llama model running fully on-device. */
export function LlamaScreen({ onBack, onActivityChange }: LlamaScreenProps) {
  const [model, setModel] = useState<OnDeviceModel>(ON_DEVICE_MODELS[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [runId, setRunId] = useState(0);

  const transition = (next: Phase) => {
    setPhase(next);
    onActivityChange(next === "loading" || next === "generating");
  };

  useInterval(
    () => {
      const next = Math.min(100, loadProgress + 100 / (model.sizeGb * 5));
      setLoadProgress(next);
      if (next >= 100) transition("generating");
    },
    phase === "loading" ? 60 : null,
    { kind: "functional" },
  );

  const run = () => {
    setLoadProgress(0);
    setRunId((id) => id + 1);
    transition("loading");
  };

  const stop = () => transition("idle");

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="Llama Local" onBack={onBack} />

      <div className="flex gap-1 overflow-x-auto px-3 py-2" role="radiogroup" aria-label="Quantization">
        {ON_DEVICE_MODELS.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            role="radio"
            aria-checked={candidate.id === model.id}
            disabled={phase === "loading" || phase === "generating"}
            onClick={() => setModel(candidate)}
            className={cn(
              "shrink-0 rounded-md border px-2 py-1 font-tech text-[11px] tracking-wider transition-colors disabled:opacity-50",
              candidate.id === model.id ? "border-cyber-lime bg-cyber-lime/10 text-cyber-lime" : "border-zinc-800 text-zinc-400",
            )}
          >
            {candidate.quantization}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-3 text-[11px] leading-relaxed">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-cyber-lime/15 px-3 py-2 text-zinc-100">{ON_DEVICE_PROMPT}</div>

        {phase === "loading" && (
          <div className="space-y-1 rounded-xl border border-zinc-800 bg-zinc-950 p-2">
            <p className="font-tech text-[11px] text-zinc-400">
              mmap {model.label} {model.quantization} · {model.sizeGb}GB
            </p>
            <div className="h-1 overflow-hidden rounded-full bg-zinc-900">
              <div className="h-full bg-cyber-lime transition-[width]" style={{ width: `${loadProgress}%` }} />
            </div>
          </div>
        )}

        {(phase === "generating" || phase === "done") && (
          <StreamingResponse key={runId} model={model} onComplete={() => transition("done")} />
        )}
      </div>

      <LlamaStats model={model} active={phase === "generating"} />

      <div className="px-3 pb-3">
        {phase === "loading" || phase === "generating" ? (
          <button type="button" onClick={stop} className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyber-pink/60 bg-cyber-pink/10 py-2 font-tech text-xs tracking-[0.12em] text-cyber-pink">
            <Square className="h-3 w-3" /> STOP
          </button>
        ) : (
          <button type="button" onClick={run} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyber-lime py-2 font-tech text-xs font-bold tracking-[0.12em] text-black glow-lime transition-transform active:scale-95">
            <Play className="h-3 w-3" /> {phase === "done" ? "RUN AGAIN" : "RUN ON-DEVICE"}
          </button>
        )}
      </div>
    </div>
  );
}

function StreamingResponse({ model, onComplete }: { model: OnDeviceModel; onComplete: () => void }) {
  const charsPerSecond = model.tokensPerSecond * 4;
  const { output, done } = useTypewriter(ON_DEVICE_RESPONSE, { speed: Math.max(8, Math.round(1000 / charsPerSecond)), step: 1, onComplete });

  return (
    <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300">
      {output}
      {!done && <span className="ml-0.5 inline-block h-3 w-1.5 animate-blink bg-cyber-lime align-middle" />}
    </div>
  );
}

function LlamaStats({ model, active }: { model: OnDeviceModel; active: boolean }) {
  const tps = useLiveMetric({ initial: model.tokensPerSecond, amplitude: 2, min: model.tokensPerSecond * 0.8, max: model.tokensPerSecond * 1.15, intervalMs: 400, paused: !active });

  return (
    <dl className="grid grid-cols-3 gap-1 border-t border-zinc-900 px-3 py-2 text-center font-tech text-[11px] tracking-wider text-zinc-400 uppercase">
      <div>
        <dt>tok/s</dt>
        <dd className="text-xs text-cyber-lime tabular-nums">{active ? tps.toFixed(1) : "0.0"}</dd>
      </div>
      <div>
        <dt>RAM</dt>
        <dd className="text-xs text-cyber-cyan tabular-nums">{model.ramGb}GB</dd>
      </div>
      <div>
        <dt>Net</dt>
        <dd className="text-xs text-cyber-pink">OFFLINE</dd>
      </div>
    </dl>
  );
}

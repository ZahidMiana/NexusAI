"use client";

import { Play, Square } from "lucide-react";
import { useState } from "react";
import { OCR_MODEL_INFO, OCR_MODELS, type OcrModel } from "@/data/telemetry";
import { useInterval } from "@/hooks/useInterval";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/cn";
import { ScreenHeader } from "./ScreenHeader";

type Phase = "idle" | "encoding" | "decoding" | "done";

export interface OcrScreenProps {
  onBack: () => void;
  onActivityChange: (active: boolean) => void;
}

/** Simulates the Vision to Markdown model turning a scanned page into Markdown. */
export function OcrScreen({ onBack, onActivityChange }: OcrScreenProps) {
  const [model, setModel] = useState<OcrModel>(OCR_MODELS[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [encodeProgress, setEncodeProgress] = useState(0);
  const [runId, setRunId] = useState(0);
  const busy = phase === "encoding" || phase === "decoding";

  const transition = (next: Phase) => {
    setPhase(next);
    onActivityChange(next === "encoding" || next === "decoding");
  };

  useInterval(
    () => {
      const next = Math.min(100, encodeProgress + 8);
      setEncodeProgress(next);
      if (next >= 100) transition("decoding");
    },
    phase === "encoding" ? 60 : null,
    { kind: "functional" },
  );

  const run = () => {
    setEncodeProgress(0);
    setRunId((id) => id + 1);
    transition("encoding");
  };

  const stop = () => transition("idle");

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="Vision to Markdown" onBack={onBack} />

      <div className="flex gap-1 px-3 py-2" role="radiogroup" aria-label="Model">
        {OCR_MODELS.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            role="radio"
            aria-checked={candidate.id === model.id}
            disabled={busy}
            onClick={() => setModel(candidate)}
            className={cn(
              "flex-1 rounded-md border px-2 py-1 font-tech text-[11px] tracking-wider transition-colors disabled:opacity-50",
              candidate.id === model.id ? "border-cyber-lime bg-cyber-lime/10 text-cyber-lime" : "border-line text-fg-muted",
            )}
          >
            {candidate.label}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-3 text-[11px] leading-relaxed">
        <ScannedPage />

        {phase === "encoding" && (
          <div className="space-y-1 rounded-xl border border-line bg-zinc-950 p-2">
            <p className="font-tech text-[11px] text-fg-muted">Encoding page · {OCR_MODEL_INFO.base}</p>
            <div className="h-1 overflow-hidden rounded-full bg-zinc-900">
              <div className="h-full bg-cyber-lime transition-[width]" style={{ width: `${encodeProgress}%` }} />
            </div>
          </div>
        )}

        {(phase === "decoding" || phase === "done") && <MarkdownOutput key={runId} text={model.output} onComplete={() => transition("done")} />}
      </div>

      <OcrStats model={model} />

      <div className="px-3 pb-3">
        {busy ? (
          <button type="button" onClick={stop} className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyber-pink/60 bg-cyber-pink/10 py-2 font-tech text-xs tracking-[0.12em] text-cyber-pink">
            <Square className="h-3 w-3" /> STOP
          </button>
        ) : (
          <button type="button" onClick={run} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyber-lime py-2 font-tech text-xs font-bold tracking-[0.12em] text-on-accent glow-lime transition-transform active:scale-95">
            <Play className="h-3 w-3" /> {phase === "done" ? "RUN AGAIN" : "CONVERT PAGE"}
          </button>
        )}
      </div>
    </div>
  );
}

/** Small stand-in for the scanned input page. */
function ScannedPage() {
  return (
    <div aria-label="Scanned page with a system of equations" role="img" className="rounded-lg bg-zinc-100 px-3 py-2 font-serif text-[11px] leading-snug text-zinc-900 italic">
      <p className="not-italic font-bold">Linear system</p>
      <p>x₁ + x₂ − 3x₃ = −10</p>
      <p>6x₂ − 2x₃ + x₄ = 7</p>
      <p>2x₃ − 3x₄ = 13</p>
    </div>
  );
}

function MarkdownOutput({ text, onComplete }: { text: string; onComplete: () => void }) {
  const { output, done } = useTypewriter(text, { speed: 18, step: 2, onComplete });

  return (
    <pre className="rounded-2xl rounded-bl-sm border border-line bg-zinc-950 px-3 py-2 font-mono text-[11px] whitespace-pre-wrap break-words text-fg-soft">
      {output}
      {!done && <span className="ml-0.5 inline-block h-3 w-1.5 animate-blink bg-cyber-lime align-middle" />}
    </pre>
  );
}

function OcrStats({ model }: { model: OcrModel }) {
  return (
    <dl className="grid grid-cols-3 gap-1 border-t border-line px-3 py-2 text-center font-tech text-[11px] tracking-wider text-fg-muted uppercase">
      <div>
        <dt>ROUGE-L</dt>
        <dd className="text-xs text-cyber-lime tabular-nums">{model.rougeL.toFixed(2)}</dd>
      </div>
      <div>
        <dt>Quant</dt>
        <dd className="text-xs text-cyber-cyan">{OCR_MODEL_INFO.quantization}</dd>
      </div>
      <div>
        <dt>LoRA r</dt>
        <dd className="text-xs text-cyber-pink tabular-nums">{OCR_MODEL_INFO.loraRank}</dd>
      </div>
    </dl>
  );
}

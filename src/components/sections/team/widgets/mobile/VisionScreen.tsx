"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { DETECTION_TEMPLATES } from "@/data/telemetry";
import { useInterval } from "@/hooks/useInterval";
import { useLiveMetric } from "@/hooks/useLiveMetric";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { randomBetween } from "@/lib/math";
import { ScreenHeader } from "./ScreenHeader";

const DETECTORS = [
  { id: "yolo", label: "YOLOv8n INT8", fps: 58 },
  { id: "ssd", label: "MobileNet-SSD", fps: 41 },
] as const;

interface BoxState {
  dx: number;
  dy: number;
  confidence: number;
}

export interface VisionScreenProps {
  onBack: () => void;
}

/** Simulated real-time object detection overlay on a mock camera feed. */
export function VisionScreen({ onBack }: VisionScreenProps) {
  const [overlays, setOverlays] = useState(true);
  const [detectorIndex, setDetectorIndex] = useState(0);
  const [boxes, setBoxes] = useState<BoxState[]>(() => DETECTION_TEMPLATES.map(() => ({ dx: 0, dy: 0, confidence: 0.9 })));
  const detector = DETECTORS[detectorIndex];
  const fps = useLiveMetric({ initial: detector.fps, amplitude: 3, min: detector.fps - 6, max: detector.fps + 3, intervalMs: 500 });

  useInterval(() => {
    setBoxes((current) =>
      current.map((box) => ({
        dx: Math.max(-3, Math.min(3, box.dx + randomBetween(-1, 1))),
        dy: Math.max(-3, Math.min(3, box.dy + randomBetween(-1, 1))),
        confidence: Math.max(0.71, Math.min(0.99, box.confidence + randomBetween(-0.03, 0.03))),
      })),
    );
  }, 180);

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="Vision CV" onBack={onBack} />

      <div className="relative flex-1 overflow-hidden bg-[linear-gradient(160deg,#0b1a24_0%,#120a1a_55%,#050505_100%)]">
        <div aria-hidden className="absolute inset-0 bg-matrix-grid opacity-60" />
        {/* Stylised scene silhouettes */}
        <div aria-hidden className="absolute top-[34%] left-[18%] h-10 w-10 rounded-full bg-zinc-700/70" />
        <div aria-hidden className="absolute top-[48%] left-[13%] h-[34%] w-[28%] rounded-t-[2.5rem] bg-zinc-800/80" />
        <div aria-hidden className="absolute top-[60%] left-[55%] h-[14%] w-[30%] skew-x-[-8deg] rounded-sm bg-zinc-700/70" />
        <div aria-hidden className="absolute top-[30%] left-[65%] h-[12%] w-[10%] rounded-b-lg bg-zinc-600/70" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-cyber-lime/10 to-transparent" />

        {overlays &&
          DETECTION_TEMPLATES.map((template, index) => {
            const tokens = accentTokens(template.accent);
            const box = boxes[index];
            return (
              <div
                key={template.id}
                className={cn("absolute rounded-sm border-2 transition-all duration-200 ease-linear", tokens.border)}
                style={{
                  left: `${template.baseX + box.dx}%`,
                  top: `${template.baseY + box.dy}%`,
                  width: `${template.width}%`,
                  height: `${template.height}%`,
                  boxShadow: `0 0 10px rgba(${tokens.rgb}, 0.6), inset 0 0 10px rgba(${tokens.rgb}, 0.25)`,
                }}
              >
                <span className={cn("absolute -top-4 left-[-2px] rounded-t-sm px-1 font-tech text-[11px] whitespace-nowrap text-black", tokens.bg)}>
                  {template.label} {(box.confidence * 100).toFixed(0)}%
                </span>
              </div>
            );
          })}

        <div className="absolute top-2 left-2 rounded bg-black/70 px-1.5 py-0.5 font-tech text-[11px] text-cyber-lime">● REC · {fps.toFixed(0)} FPS</div>
        <div className="absolute top-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-tech text-[11px] text-cyber-cyan">{(1000 / fps).toFixed(1)}ms</div>
      </div>

      <div className="flex items-center gap-2 border-t border-zinc-900 p-3">
        <button
          type="button"
          onClick={() => setOverlays((value) => !value)}
          aria-pressed={overlays}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors",
            overlays ? "border-cyber-lime bg-cyber-lime/10 text-cyber-lime" : "border-zinc-800 text-zinc-400",
          )}
          aria-label={overlays ? "Hide detection overlays" : "Show detection overlays"}
        >
          {overlays ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => setDetectorIndex((index) => (index + 1) % DETECTORS.length)}
          className="flex-1 rounded-xl border border-zinc-800 py-2 font-tech text-[11px] tracking-[0.12em] text-zinc-300 transition-colors hover:border-cyber-pink/60 hover:text-cyber-pink"
        >
          MODEL: {detector.label}
        </button>
      </div>
    </div>
  );
}

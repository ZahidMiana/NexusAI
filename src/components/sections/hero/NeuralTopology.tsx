"use client";

import { Network } from "lucide-react";
import { useRef } from "react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { useLiveMetric } from "@/hooks/useLiveMetric";
import { useCanHover } from "@/hooks/useMediaQuery";
import { useNeuralCanvas } from "@/hooks/useNeuralCanvas";
import { cn } from "@/lib/cn";

/** Interactive AI neural network topology map rendered on a canvas. */
export function NeuralTopology() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { active, handlers } = useNeuralCanvas(canvasRef);

  return (
    <BentoCard accent="cyan" scaleOnHover={false} className="relative h-full min-h-[440px] cursor-crosshair touch-pan-y select-none" {...handlers}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-label="Animated neural network topology map" role="img" />

      <div className="pointer-events-none relative z-10 flex h-full min-h-[440px] flex-col justify-between p-6">
        <div className="flex items-start justify-between gap-4">
          <BentoLabel index="01">Interactive neural network</BentoLabel>
          <Network className={cn("h-5 w-5 transition-colors", active ? "text-cyber-pink" : "text-cyber-cyan")} />
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <SynapticLoad active={active} />
          <StimulusHint active={active} />
        </div>
      </div>
    </BentoCard>
  );
}

function SynapticLoad({ active }: { active: boolean }) {
  const load = useLiveMetric({ initial: 62, amplitude: active ? 9 : 3, min: active ? 70 : 40, max: active ? 99 : 72, intervalMs: 600 });
  return (
    <div className="rounded-lg border border-line bg-inset px-4 py-3 backdrop-blur-sm">
      <p className="font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">Network activity</p>
      <p className={cn("font-display text-2xl font-black tabular-nums", active ? "text-cyber-pink" : "text-cyber-cyan")}>
        {load.toFixed(1)}%
      </p>
    </div>
  );
}

function StimulusHint({ active }: { active: boolean }) {
  const canHover = useCanHover();
  const idleHint = canHover ? "Hover or click to send signals" : "Tap or drag to send signals";
  return (
    <p className="rounded-md border border-line bg-inset px-3 py-1.5 font-tech text-xs tracking-[0.12em] text-fg-soft uppercase backdrop-blur-sm">
      {active ? "Signals spreading through the network" : idleHint}
    </p>
  );
}

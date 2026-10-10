import { Brain, Camera, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { DeviceMode } from "./types";

interface AppTile {
  mode: Exclude<DeviceMode, "home">;
  label: string;
  caption: string;
  icon: LucideIcon;
  gradient: string;
}

const APPS: readonly AppTile[] = [
  { mode: "llm", label: "Llama Local", caption: "On-Device Llama Quantized Models", icon: Brain, gradient: "from-cyber-lime/30 to-cyber-cyan/10" },
  { mode: "cv", label: "Vision CV", caption: "Real-time CV Object Detection", icon: Camera, gradient: "from-cyber-pink/30 to-cyber-cyan/10" },
];

export interface HomeScreenProps {
  onLaunch: (mode: Exclude<DeviceMode, "home">) => void;
}

export function HomeScreen({ onLaunch }: HomeScreenProps) {
  return (
    <div className="flex h-full flex-col gap-4 bg-[radial-gradient(circle_at_30%_10%,rgb(var(--accent-lime)_/_0.12),transparent_55%),radial-gradient(circle_at_80%_90%,rgb(var(--accent-pink)_/_0.12),transparent_55%)] px-4 pt-6">
      <div>
        <p className="font-tech text-[11px] tracking-[0.14em] text-fg-muted uppercase">Nexus Edge OS</p>
        <p className="font-display text-lg font-black text-fg">Select a demo</p>
      </div>
      <div className="flex flex-col gap-3">
        {APPS.map((app) => (
          <button
            key={app.mode}
            type="button"
            onClick={() => onLaunch(app.mode)}
            className={cn(
              "group flex items-center gap-3 rounded-2xl border border-line bg-gradient-to-br p-3 text-left transition-all duration-300 ease-hardware hover:scale-[1.03] hover:border-cyber-lime/70 active:scale-95",
              app.gradient,
            )}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-inset text-cyber-lime">
              <app.icon className="h-5 w-5 drop-glow-lime" />
            </span>
            <span className="min-w-0">
              <span className="block font-tech text-sm tracking-wider text-fg">{app.label}</span>
              <span className="block text-[11px] leading-tight text-fg-muted">{app.caption}</span>
            </span>
          </button>
        ))}
      </div>
      <p className="mt-auto pb-3 text-center font-mono text-[11px] text-fg-muted">✈ Airplane mode · 100% offline inference</p>
    </div>
  );
}

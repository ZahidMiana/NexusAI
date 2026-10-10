"use client";

import { Smartphone } from "lucide-react";
import { useState } from "react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import type { MemberCardProps } from "./types";
import { MemberHeader } from "./MemberHeader";
import { DeviceTelemetry } from "./widgets/mobile/DeviceTelemetry";
import { MobileSimulator } from "./widgets/mobile/MobileSimulator";
import type { DeviceMode } from "./widgets/mobile/types";

export function MobileDeveloperCard({ member }: MemberCardProps) {
  const [mode, setMode] = useState<DeviceMode>("home");
  const [llmActive, setLlmActive] = useState(false);

  const changeMode = (next: DeviceMode) => {
    setLlmActive(false);
    setMode(next);
  };

  return (
    <BentoCard accent={member.accent} scaleOnHover={false} className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <BentoLabel index="04.C" accent={member.accent}>
          Edge Intelligence Rig
        </BentoLabel>
        <Smartphone className="h-5 w-5 text-cyber-lime" />
      </div>

      <div className="flex flex-1 flex-col gap-6 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <MemberHeader member={member} />
          <DeviceTelemetry mode={mode} llmActive={llmActive} />
          <p className="font-mono text-xs leading-relaxed text-fg-soft">
            {"// Tap an app inside the device to run a live on-device inference simulation."}
          </p>
        </div>
        <MobileSimulator mode={mode} onModeChange={changeMode} onLlmActivityChange={setLlmActive} />
      </div>
    </BentoCard>
  );
}

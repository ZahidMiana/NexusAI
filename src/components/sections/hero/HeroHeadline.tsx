"use client";

import { ArrowDownRight, Power } from "lucide-react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { NeonButton, NeonLink } from "@/components/ui/NeonButton";
import { StatusDot } from "@/components/ui/StatusDot";
import { useContactLauncher } from "@/context/ContactContext";
import { PromptLine } from "./PromptLine";

export function HeroHeadline() {
  const { openContact } = useContactLauncher();

  return (
    <BentoCard accent="pink" scaleOnHover={false} className="flex h-full min-h-[440px] flex-col justify-between gap-10 p-6 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BentoLabel index="00" accent="pink">
          Agency Core
        </BentoLabel>
        <span className="flex items-center gap-2 rounded-full border border-cyber-lime/30 bg-cyber-lime/5 px-3 py-1 font-tech text-xs tracking-[0.14em] text-cyber-lime uppercase">
          <StatusDot accent="lime" />
          Accepting Q1 missions
        </span>
      </div>

      <div className="space-y-6">
        <PromptLine command="nexus --init protocol=elite_ai --deploy=production" />
        <h1 className="font-display text-4xl leading-[1.05] font-black tracking-tight text-white uppercase sm:text-5xl lg:text-6xl">
          We Architect{" "}
          <span className="bg-gradient-to-r from-cyber-cyan via-white to-cyber-cyan bg-clip-text text-transparent [filter:drop-shadow(0_0_18px_rgba(0,240,255,0.45))]">
            Intelligent
          </span>{" "}
          <span className="text-cyber-pink text-glow-pink">Ecosystems.</span>
        </h1>
        <p className="max-w-xl font-mono text-base leading-relaxed text-white sm:text-lg">
          We build production LLM platforms, AI agents and on device AI.
        </p>
        <p className="max-w-xl font-mono text-sm leading-relaxed text-zinc-300">
          Three senior engineers who design, ship and run the whole system, from GPU cluster to pocket. Typical first
          release in six to eight weeks.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <NeonButton accent="pink" variant="solid" size="lg" pulse className="tracking-[0.1em] sm:tracking-[0.14em]" icon={<Power className="h-4 w-4" />} onClick={() => openContact()}>
          <span className="block">Initiate Protocol</span>
          <span className="block font-mono text-[11px] font-medium tracking-normal normal-case opacity-80">Book a free 30 min call</span>
        </NeonButton>
        <NeonLink href="#work" accent="cyan" size="lg" icon={<ArrowDownRight className="h-4 w-4" />}>
          View work
        </NeonLink>
      </div>
    </BentoCard>
  );
}

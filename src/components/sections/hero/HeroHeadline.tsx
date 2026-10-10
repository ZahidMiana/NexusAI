"use client";

import { ArrowUpRight, Power } from "lucide-react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { StatusDot } from "@/components/ui/StatusDot";
import { useTerminalLauncher } from "@/context/TerminalContext";
import { PromptLine } from "./PromptLine";

export function HeroHeadline() {
  const { openTerminal } = useTerminalLauncher();

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
        <p className="max-w-xl font-mono text-sm leading-relaxed text-zinc-300 sm:text-base">
          Three elite AI engineers. One neural mesh. We design, ship and operate production LLM platforms, agentic
          products and on-device intelligence — from GPU cluster to pocket.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <NeonButton
          accent="pink"
          variant="solid"
          size="lg"
          pulse
          className="tracking-[0.1em] sm:tracking-[0.14em]"
          icon={<Power className="h-4 w-4" />}
          onClick={() => openTerminal("/contact")}
        >
          Initiate Protocol / Contact Us
        </NeonButton>
        <a
          href="#team"
          className="group inline-flex items-center gap-2 font-tech text-xs tracking-[0.14em] text-zinc-400 uppercase transition-colors hover:text-cyber-cyan"
        >
          Meet the operators
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </BentoCard>
  );
}

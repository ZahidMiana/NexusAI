"use client";

import { ArrowDownRight, Power } from "lucide-react";
import { useRef } from "react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { NeonButton, NeonLink } from "@/components/ui/NeonButton";
import { StatusDot } from "@/components/ui/StatusDot";
import { useContactLauncher } from "@/context/ContactContext";
import { useMagnetic } from "@/hooks/useMagnetic";
import { siteConfig } from "@/config/site";

const SERVICES = ["LLM apps", "RAG pipelines", "AI agents", "AI security"] as const;

export function HeroHeadline() {
  const { openContact } = useContactLauncher();
  const ctaRef = useRef<HTMLSpanElement>(null);
  const magnetic = useMagnetic(ctaRef);
  const startConversation = () => {
    const { bookingUrl } = siteConfig.contact;
    if (bookingUrl) window.open(bookingUrl, "_blank", "noopener,noreferrer");
    else openContact();
  };

  return (
    <BentoCard accent="pink" scaleOnHover={false} className="flex h-full min-h-[440px] flex-col justify-between gap-10 p-6 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BentoLabel index="00" accent="pink">
          AI engineering studio
        </BentoLabel>
        <span className="flex items-center gap-2 rounded-full border border-cyber-lime/30 bg-cyber-lime/5 px-3 py-1 font-tech text-xs tracking-[0.14em] text-cyber-lime uppercase">
          <StatusDot accent="lime" />
          {siteConfig.availability}
        </span>
      </div>

      <div className="space-y-6">
        <ul className="flex flex-wrap gap-2" aria-label="What we do">
          {SERVICES.map((service) => (
            <li key={service} className="rounded-full border border-line px-3 py-1 font-tech text-xs tracking-[0.1em] text-fg-soft uppercase">
              {service}
            </li>
          ))}
        </ul>
        <h1 className="font-display text-4xl leading-[1.05] font-black tracking-tight text-fg uppercase sm:text-5xl lg:text-6xl">
          We Architect{" "}
          <span className="bg-gradient-to-r from-cyber-cyan via-fg to-cyber-cyan bg-clip-text text-transparent">
            Intelligent
          </span>{" "}
          <span className="text-cyber-pink">Ecosystems.</span>
        </h1>
        <p className="max-w-xl font-mono text-base leading-relaxed text-fg sm:text-lg">
          We build production LLM apps, RAG pipelines and AI agents, and we secure them.
        </p>
        <p className="max-w-xl font-mono text-sm leading-relaxed text-fg-soft">
          AI engineers and security specialists who design, ship and harden the whole system, from retrieval
          pipeline to red-team audit. Typical first release in six to eight weeks.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <span ref={ctaRef} className="inline-flex transition-transform duration-200 ease-out" {...magnetic}>
        <NeonButton accent="pink" variant="solid" size="lg" className="tracking-[0.1em] sm:tracking-[0.14em]" icon={<Power className="h-4 w-4" />} onClick={startConversation}>
          <span className="block">Book a free call</span>
          <span className="block font-mono text-xs font-medium tracking-normal normal-case">30 min · no obligation</span>
        </NeonButton>
        </span>
        <NeonLink href="#work" accent="cyan" size="lg" icon={<ArrowDownRight className="h-4 w-4" />}>
          View work
        </NeonLink>
      </div>
    </BentoCard>
  );
}

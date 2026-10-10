"use client";

import { Check, Sparkles } from "lucide-react";
import { CountUp } from "@/components/effects/CountUp";
import { BentoCard } from "@/components/ui/BentoCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useContactLauncher } from "@/context/ContactContext";
import { SERVICE_PLANS } from "@/data/services";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { ServicePlan } from "@/types";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading
        headingId="services-heading"
        index="06"
        title="Engagement Models"
        accent="pink"
        subtitle="Pick the shape that fits your stage. Every engagement includes an NDA, full code ownership and weekly demos."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
        {SERVICE_PLANS.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 0.08} className={cn(plan.featured && "md:-my-3")}>
            <ServiceCard plan={plan} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ plan }: { plan: ServicePlan }) {
  const { openContact } = useContactLauncher();
  const tokens = accentTokens(plan.accent);

  return (
    <BentoCard accent={plan.accent} className={cn("flex h-full flex-col gap-6 p-6 sm:p-7", plan.featured && cn(tokens.borderSoft, tokens.glow))}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-black tracking-wide text-fg uppercase">{plan.name}</h3>
          <p className="mt-1 font-mono text-sm text-fg-soft">{plan.tagline}</p>
        </div>
        {plan.featured && (
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-cyber-pink/50 bg-cyber-pink/10 px-2.5 py-1 font-tech text-xs tracking-[0.1em] text-cyber-pink uppercase">
            <Sparkles className="h-3 w-3" /> Popular
          </span>
        )}
      </div>

      <div>
        <p className="font-tech text-xs tracking-[0.12em] text-fg-muted uppercase">{plan.priceNote}</p>
        <p className={cn("font-display text-4xl font-black", tokens.text, tokens.textGlow)}><CountUp value={plan.price} />
        </p>
        <p className="mt-1 font-mono text-sm text-fg-soft">Timeline: {plan.timeline}</p>
      </div>

      <ul className="flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 font-mono text-sm leading-relaxed text-fg-soft">
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", tokens.text)} />
            {feature}
          </li>
        ))}
      </ul>

      <NeonButton
        accent={plan.accent}
        variant={plan.featured ? "solid" : "outline"}
        className="w-full"
        onClick={() => openContact({ engagement: plan.id, projectType: plan.projectType })}
      >
        Choose {plan.name}
      </NeonButton>
    </BentoCard>
  );
}

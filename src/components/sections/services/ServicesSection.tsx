"use client";

import { Check, Sparkles } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SWIPE_ITEM, SWIPE_ROW } from "@/components/ui/swipe";
import { SwipeHint } from "@/components/ui/SwipeHint";
import { useContactLauncher } from "@/context/ContactContext";
import { PROCESS_STEPS } from "@/data/process";
import { SERVICE_PLANS } from "@/data/services";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { ProcessStep, ServicePlan } from "@/types";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading
        headingId="services-heading"
        index="05"
        eyebrow="Services & process"
        title="Services"
        accent="pink"
        subtitle="Pick the shape that fits your stage. Every engagement includes an NDA, full code ownership and weekly demos."
      />
      <SwipeHint count={SERVICE_PLANS.length} />
      <div className={cn(SWIPE_ROW, "md:grid md:grid-cols-3 md:items-stretch")}>
        {SERVICE_PLANS.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 0.08} className={cn(SWIPE_ITEM, plan.featured && "md:-my-3")}>
            <ServiceCard plan={plan} />
          </Reveal>
        ))}
      </div>
      <ProcessStrip />
    </section>
  );
}

/** Compact four-step delivery process shown under the plans. */
function ProcessStrip() {
  return (
    <Reveal className="mt-10">
      <h3 className="mb-4 font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">How every project runs</h3>
      <ol className={cn(SWIPE_ROW, "md:grid md:grid-cols-2 lg:grid-cols-4")}>
        {PROCESS_STEPS.map((step, index) => (
          <ProcessStepCard key={step.id} step={step} last={index === PROCESS_STEPS.length - 1} />
        ))}
      </ol>
    </Reveal>
  );
}

function ProcessStepCard({ step, last }: { step: ProcessStep; last: boolean }) {
  const tokens = accentTokens(step.accent);
  return (
    <li className={cn("relative", SWIPE_ITEM)}>
      <BentoCard accent={step.accent} className="h-full space-y-2 p-5">
        <div className="flex items-center justify-between">
          <span className={cn("flex h-8 w-8 items-center justify-center rounded-full border font-tech text-xs", tokens.border, tokens.text)}>{step.code}</span>
          <span className="font-tech text-xs tracking-[0.1em] text-fg-muted uppercase">{step.duration}</span>
        </div>
        <p className="font-display text-lg font-black tracking-wide text-fg">{step.title}</p>
        <p className="font-mono text-sm leading-relaxed text-fg-soft">{step.description}</p>
      </BentoCard>
      {!last && <span aria-hidden className="absolute top-1/2 -right-3 hidden h-px w-2 bg-line-strong lg:block" />}
    </li>
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

      <p className={cn("font-tech text-xs tracking-[0.12em] uppercase", tokens.text)}>Timeline: {plan.timeline}</p>

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
        onClick={() => openContact({ projectType: plan.projectType })}
      >
        Choose {plan.name}
      </NeonButton>
    </BentoCard>
  );
}

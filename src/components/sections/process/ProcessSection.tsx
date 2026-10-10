"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { BentoCard } from "@/components/ui/BentoCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/data/process";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { ProcessStep } from "@/types";

/** Engagement protocol timeline whose neon spine fills as you scroll. */
export function ProcessSection() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="process" aria-labelledby="process-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading
        headingId="process-heading"
        index="05"
        title="Engagement Protocol"
        accent="lime"
        subtitle="Four phases from first call to a system your team owns. Weekly demos, no black boxes."
      />

      <ol ref={timelineRef} className="relative space-y-6 pl-10 sm:pl-14">
        <span aria-hidden className="absolute top-2 bottom-2 left-[15px] w-px bg-line-strong sm:left-[23px]" />
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-gradient-to-b from-cyber-cyan via-cyber-pink to-cyber-lime shadow-[0_0_12px_rgb(var(--accent-cyan)_/_0.8)] sm:left-[23px]"
        />
        {PROCESS_STEPS.map((step, index) => (
          <ProcessStepItem key={step.id} step={step} delay={index * 0.05} />
        ))}
      </ol>
    </section>
  );
}

function ProcessStepItem({ step, delay }: { step: ProcessStep; delay: number }) {
  const tokens = accentTokens(step.accent);
  return (
    <li className="relative">
      <span
        aria-hidden
        className={cn(
          "absolute top-6 -left-10 flex h-8 w-8 items-center justify-center rounded-full border bg-void font-tech text-xs sm:-left-14 sm:h-12 sm:w-12 sm:text-sm",
          tokens.border,
          tokens.text,
          tokens.glow,
        )}
      >
        {step.code}
      </span>
      <Reveal delay={delay}>
        <BentoCard accent={step.accent} className="grid gap-5 p-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          <div>
            <p className={cn("font-tech text-xs tracking-[0.14em] uppercase", tokens.text)}>{step.duration}</p>
            <h3 className="mt-1 font-display text-2xl font-black tracking-wide text-fg uppercase">{step.title}</h3>
          </div>
          <p className="font-mono text-sm leading-relaxed text-fg-soft">{step.description}</p>
          <ul className="space-y-1.5" aria-label={`${step.title} deliverables`}>
            {step.deliverables.map((item) => (
              <li key={item} className="flex items-center gap-2 font-mono text-sm text-fg-soft">
                <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", tokens.bg)} />
                {item}
              </li>
            ))}
          </ul>
        </BentoCard>
      </Reveal>
    </li>
  );
}

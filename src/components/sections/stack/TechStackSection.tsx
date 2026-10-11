"use client";

import { MousePointerClick } from "lucide-react";
import { useState } from "react";
import { TerminalPanel } from "@/components/sections/terminal/TerminalPanel";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TERMINAL_SECTION_ID, useTerminal } from "@/context/TerminalContext";
import { TECH_CATEGORIES } from "@/data/techStack";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { TechItem } from "@/types";
import { TechBadge } from "./TechBadge";

/** Tech stack and terminal playground in one section: tapping a tool explains it in the terminal. */
export function TechStackSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { run } = useTerminal();

  const explain = (item: TechItem) => {
    setSelectedId(item.id);
    run(`/explain ${item.id}`);
    // Side by side on desktop; on phones the terminal is below, so bring it into view.
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      document.getElementById(TERMINAL_SECTION_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="stack" aria-labelledby="stack-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading
        headingId="stack-heading"
        index="06"
        eyebrow="Stack & playground"
        title="Tech Stack"
        accent="lime"
        subtitle="Everything our team works with, grouped by area. Tap a highlighted tool to see how we used it in real projects, or type your own commands in the terminal."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
        <Reveal>
          <BentoCard accent="lime" scaleOnHover={false} className="space-y-6 p-6">
            <div className="flex items-center justify-between gap-3">
              <BentoLabel index="06.A" accent="lime">
                Tools
              </BentoLabel>
              <span className="flex items-center gap-1.5 font-mono text-xs text-fg-muted">
                <MousePointerClick className="h-3.5 w-3.5" aria-hidden /> Tap to explain
              </span>
            </div>
            {TECH_CATEGORIES.map((category) => {
              const tokens = accentTokens(category.accent);
              return (
                <div key={category.id}>
                  <h3 className={cn("mb-2.5 font-tech text-xs tracking-[0.14em] uppercase", tokens.text)}>{category.label}</h3>
                  {category.items.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <TechBadge key={item.id} item={item} selected={item.id === selectedId} onSelect={explain} />
                      ))}
                    </div>
                  )}
                  <ul className={cn("flex flex-wrap gap-1.5", category.items.length > 0 && "mt-2.5")} aria-label={`More ${category.label} tools`}>
                    {category.alsoUsed.map((tool) => (
                      <li key={tool} className="rounded border border-dashed border-line px-2 py-0.5 font-tech text-[11px] tracking-[0.08em] text-fg-muted uppercase">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </BentoCard>
        </Reveal>
        <Reveal delay={0.08} className="lg:sticky lg:top-24">
          <TerminalPanel />
        </Reveal>
      </div>
    </section>
  );
}

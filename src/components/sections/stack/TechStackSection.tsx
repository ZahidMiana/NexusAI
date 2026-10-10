"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ALL_TECH_ITEMS, TECH_CATEGORIES } from "@/data/techStack";
import type { TechItem } from "@/types";
import { TechCategoryCard } from "./TechCategoryCard";
import { TechDetailTerminal } from "./TechDetailTerminal";

export function TechStackSection() {
  const [selected, setSelected] = useState<TechItem>(ALL_TECH_ITEMS[0]);

  return (
    <section id="stack" aria-labelledby="stack-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading
        headingId="stack-heading"
        index="08"
        title="Tech Stack Matrix"
        accent="lime"
        subtitle="Every module is battle-tested in production. Select any badge to pull its expertise dossier."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {TECH_CATEGORIES.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.08} className={index === 0 ? "md:col-span-2 lg:col-span-1" : undefined}>
            <TechCategoryCard category={category} selectedId={selected.id} onSelect={setSelected} />
          </Reveal>
        ))}
      </div>
      <div id="tech-detail" className="mt-6" aria-live="polite">
        <TechDetailTerminal key={selected.id} item={selected} />
      </div>
    </section>
  );
}

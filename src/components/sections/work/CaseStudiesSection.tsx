"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CASE_STUDIES } from "@/data/caseStudies";
import type { CaseStudy } from "@/types";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudyDialog } from "./CaseStudyDialog";

/** Bento placement per position: the first study is the large featured tile. */
const SPANS = [
  "md:col-span-2 xl:col-span-2 xl:row-span-2",
  "md:col-span-2 xl:col-span-2",
  "",
  "",
  "md:col-span-2 xl:col-span-2",
  "md:col-span-2 xl:col-span-2",
] as const;

export function CaseStudiesSection() {
  const [openStudy, setOpenStudy] = useState<CaseStudy | null>(null);

  return (
    <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading
        headingId="work-heading"
        index="02"
        title="Mission Logs"
        accent="cyan"
        subtitle="Real projects from the team. The problem, what we built and what it achieved. Open any log for the full story."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {CASE_STUDIES.map((study, index) => (
          <Reveal key={study.id} delay={index * 0.06} className={SPANS[index] ?? ""}>
            <CaseStudyCard study={study} index={index} featured={index === 0} onOpen={setOpenStudy} />
          </Reveal>
        ))}
      </div>
      <CaseStudyDialog study={openStudy} onClose={() => setOpenStudy(null)} />
    </section>
  );
}

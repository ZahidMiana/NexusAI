"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SWIPE_ITEM, SWIPE_ROW } from "@/components/ui/swipe";
import { SwipeHint } from "@/components/ui/SwipeHint";
import { cn } from "@/lib/cn";
import { CASE_STUDIES } from "@/data/caseStudies";
import type { CaseStudy } from "@/types";
import { CaseStudyCard } from "./CaseStudyCard";
import dynamic from "next/dynamic";

// The dialog code loads on demand, the first time a case study is opened.
const CaseStudyDialog = dynamic(() => import("./CaseStudyDialog").then((module) => module.CaseStudyDialog), { ssr: false });

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
  // Stays mounted after the first open so closing returns focus to the card that opened it.
  const [dialogLoaded, setDialogLoaded] = useState(false);
  const openCaseStudy = (study: CaseStudy) => {
    setDialogLoaded(true);
    setOpenStudy(study);
  };

  return (
    <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading
        headingId="work-heading"
        index="02"
        eyebrow="Our work"
        title="Selected Work"
        accent="cyan"
        subtitle="Real projects from the team: the problem, what we built and the result. Open any project for the full case study."
      />
      <SwipeHint count={CASE_STUDIES.length} />
      <div className={cn(SWIPE_ROW, "md:grid md:grid-cols-2 xl:grid-cols-4")}>
        {CASE_STUDIES.map((study, index) => (
          <Reveal key={study.id} delay={index * 0.06} className={cn(SWIPE_ITEM, SPANS[index])}>
            <CaseStudyCard study={study} index={index} featured={index === 0} onOpen={openCaseStudy} />
          </Reveal>
        ))}
      </div>
      {dialogLoaded && <CaseStudyDialog study={openStudy} onClose={() => setOpenStudy(null)} />}
    </section>
  );
}

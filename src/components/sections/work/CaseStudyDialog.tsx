"use client";

import { CheckCircle2, Clock, Quote, Rocket } from "lucide-react";
import { CountUp } from "@/components/effects/CountUp";
import { Dialog } from "@/components/ui/Dialog";
import { NeonButton } from "@/components/ui/NeonButton";
import { useContactLauncher } from "@/context/ContactContext";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/types";

export interface CaseStudyDialogProps {
  study: CaseStudy | null;
  onClose: () => void;
}

/** Full case study ("mission log") with a CTA that pre-fills the contact form. */
export function CaseStudyDialog({ study, onClose }: CaseStudyDialogProps) {
  const { openContact } = useContactLauncher();
  const titleId = "case-study-title";

  const startSimilar = () => {
    if (!study) return;
    onClose();
    openContact({ projectType: study.projectType });
  };

  return (
    <Dialog open={study !== null} onClose={onClose} labelledBy={titleId}>
      {study && <CaseStudyBody study={study} titleId={titleId} onStartSimilar={startSimilar} />}
    </Dialog>
  );
}

function CaseStudyBody({ study, titleId, onStartSimilar }: { study: CaseStudy; titleId: string; onStartSimilar: () => void }) {
  const tokens = accentTokens(study.accent);

  return (
    <article className="space-y-8 p-6 sm:p-10">
      <header className="space-y-3 pr-12">
        <p className={cn("font-tech text-xs tracking-[0.14em] uppercase", tokens.text)}>
          Mission log · {study.industry} · {study.client}
        </p>
        <h2 id={titleId} className="font-display text-3xl font-black tracking-wide text-fg uppercase sm:text-4xl">
          {study.title}
        </h2>
        <p className="font-mono text-base leading-relaxed text-fg-soft">{study.summary}</p>
        <p className="flex items-center gap-2 font-tech text-xs tracking-[0.12em] text-fg-muted uppercase">
          <Clock className="h-3.5 w-3.5" /> Delivered in {study.duration}
        </p>
      </header>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {study.results.map((metric) => (
          <div key={metric.label} className={cn("flex flex-col-reverse rounded-xl border bg-inset p-4", tokens.borderSoft)}>
              <dt className="mt-1 font-tech text-xs tracking-[0.1em] text-fg-muted uppercase">{metric.label}</dt>
              <dd className={cn("font-display text-3xl font-black", tokens.text, tokens.textGlow)}><CountUp value={metric.value} durationMs={900} />
              </dd>
          </div>
        ))}
      </dl>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="font-tech text-sm tracking-[0.14em] text-cyber-pink uppercase">The problem</h3>
          <p className="font-mono text-sm leading-relaxed text-fg-soft">{study.problem}</p>
        </div>
        <div className="space-y-3">
          <h3 className="font-tech text-sm tracking-[0.14em] text-cyber-lime uppercase">What we built</h3>
          <ul className="space-y-2">
            {study.solution.map((item) => (
              <li key={item} className="flex gap-2 font-mono text-sm leading-relaxed text-fg-soft">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyber-lime" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {study.quote && (
        <blockquote className={cn("relative rounded-xl border bg-inset p-5 pl-12", tokens.borderSoft)}>
          <Quote className={cn("absolute top-5 left-4 h-5 w-5", tokens.text)} />
          <p className="font-mono text-base leading-relaxed text-fg">{study.quote}</p>
          <footer className="mt-2 font-tech text-xs tracking-[0.12em] text-fg-muted uppercase">{study.client}</footer>
        </blockquote>
      )}

      <footer className="flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-2" aria-label="Technology used">
          {study.stack.map((tech) => (
            <li key={tech} className="rounded border border-line-strong bg-inset px-2 py-1 font-tech text-xs tracking-[0.1em] text-fg-soft uppercase">
              {tech}
            </li>
          ))}
        </ul>
        <NeonButton accent="pink" variant="solid" icon={<Rocket className="h-4 w-4" />} onClick={onStartSimilar}>
          Start a similar project
        </NeonButton>
      </footer>
    </article>
  );
}

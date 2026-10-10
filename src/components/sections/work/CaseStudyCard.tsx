import { ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/effects/CountUp";
import { BentoCard } from "@/components/ui/BentoCard";
import { getMemberById } from "@/data/team";
import { accentTokens } from "@/lib/accent";
import { ProjectCover } from "./ProjectCover";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/types";

export interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  featured: boolean;
  onOpen: (study: CaseStudy) => void;
}

export function CaseStudyCard({ study, index, featured, onOpen }: CaseStudyCardProps) {
  const tokens = accentTokens(study.accent);
  const metrics = featured ? study.results : study.results.slice(0, 2);

  return (
    <BentoCard accent={study.accent} className="h-full">
      <button
        type="button"
        onClick={() => onOpen(study)}
        aria-haspopup="dialog"
        className="flex h-full w-full flex-col gap-5 p-6 text-left"
      >
        <ProjectCover study={study} className={featured ? "h-44 md:h-52 xl:h-72" : "h-28"} sizes={featured ? "(min-width: 1280px) 600px, 100vw" : "(min-width: 1280px) 300px, 100vw"} />

        <div className="flex items-center justify-between gap-3">
          <span className={cn("font-tech text-xs tracking-[0.14em] uppercase", tokens.text)}>
            Project {String(index + 1).padStart(2, "0")} · {study.industry}
          </span>
          <ArrowUpRight className={cn("h-5 w-5 text-fg-muted transition-all duration-300 group-hover/bento:-translate-y-0.5 group-hover/bento:translate-x-0.5", tokens.groupHoverText)} />
        </div>

        <div>
          <h3 className={cn("font-display font-black tracking-wide text-fg uppercase", featured ? "text-3xl" : "text-xl")}>{study.title}</h3>
          <p className="mt-1 font-mono text-xs text-fg-muted">
            {study.client} · built by {getMemberById(study.owner)?.name ?? "NexusAI"}
          </p>
        </div>

        <p className={cn("font-mono leading-relaxed text-fg-soft", featured ? "text-base" : "text-sm")}>{study.summary}</p>

        {featured && (
          <div className="hidden space-y-5 xl:block">
            <div>
              <p className="font-tech text-xs tracking-[0.12em] text-cyber-pink uppercase">The problem</p>
              <p className="mt-2 font-mono text-sm leading-relaxed text-fg-soft">{study.problem}</p>
            </div>
            <div>
              <p className="font-tech text-xs tracking-[0.12em] text-cyber-lime uppercase">What we built</p>
              <ul className="mt-2 space-y-1.5">
                {study.solution.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2 font-mono text-sm leading-relaxed text-fg-soft">
                    <span aria-hidden className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", tokens.bg)} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {study.quote && (
              <blockquote className={cn("border-l-2 pl-4 font-mono text-base leading-relaxed text-fg italic", tokens.border)}>
                “{study.quote}”
              </blockquote>
            )}
            <div>
              <p className="font-tech text-xs tracking-[0.12em] text-fg-muted uppercase">Built with</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <li key={tech} className="rounded border border-line-strong bg-inset px-2 py-1 font-tech text-xs tracking-[0.1em] text-fg-soft uppercase">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <dl className={cn("mt-auto grid gap-3", featured ? "grid-cols-3" : "grid-cols-2")}>
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse rounded-lg border border-line bg-inset p-3">
              <dt className="mt-1 font-tech text-xs tracking-[0.1em] text-fg-muted uppercase">{metric.label}</dt>
              <dd className={cn("font-display font-black", featured ? "text-2xl" : "text-lg", tokens.text)}><CountUp value={metric.value} />
              </dd>
            </div>
          ))}
        </dl>

        <span className="font-tech text-xs tracking-[0.14em] text-fg-soft uppercase transition-colors group-hover/bento:text-fg">
          View case study →
        </span>
      </button>
    </BentoCard>
  );
}

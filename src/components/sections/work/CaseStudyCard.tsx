import { ArrowUpRight } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";
import { accentTokens } from "@/lib/accent";
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
        <div className="flex items-center justify-between gap-3">
          <span className={cn("font-tech text-xs tracking-[0.14em] uppercase", tokens.text)}>
            LOG_{String(index + 1).padStart(2, "0")} · {study.industry}
          </span>
          <ArrowUpRight className={cn("h-5 w-5 text-zinc-400 transition-all duration-300 group-hover/bento:-translate-y-0.5 group-hover/bento:translate-x-0.5", tokens.groupHoverText)} />
        </div>

        <div>
          <h3 className={cn("font-display font-black tracking-wide text-white uppercase", featured ? "text-3xl" : "text-xl")}>{study.title}</h3>
          <p className="mt-1 font-mono text-xs text-zinc-400">{study.client}</p>
        </div>

        <p className={cn("font-mono leading-relaxed text-zinc-300", featured ? "text-base" : "text-sm")}>{study.summary}</p>

        {featured && (
          <div className="hidden space-y-5 xl:block">
            <div>
              <p className="font-tech text-xs tracking-[0.12em] text-cyber-pink uppercase">The problem</p>
              <p className="mt-2 font-mono text-sm leading-relaxed text-zinc-300">{study.problem}</p>
            </div>
            {study.quote && (
              <blockquote className={cn("border-l-2 pl-4 font-mono text-base leading-relaxed text-white italic", tokens.border)}>
                “{study.quote}”
              </blockquote>
            )}
            <div>
              <p className="font-tech text-xs tracking-[0.12em] text-zinc-400 uppercase">Built with · {study.duration}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <li key={tech} className="rounded border border-zinc-700 bg-black/40 px-2 py-1 font-tech text-xs tracking-[0.1em] text-zinc-300 uppercase">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <dl className={cn("mt-auto grid gap-3", featured ? "grid-cols-3" : "grid-cols-2")}>
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse rounded-lg border border-zinc-800 bg-black/40 p-3">
              <dt className="mt-1 font-tech text-xs tracking-[0.1em] text-zinc-400 uppercase">{metric.label}</dt>
              <dd className={cn("font-display font-black", featured ? "text-2xl" : "text-lg", tokens.text, tokens.textGlow)}>{metric.value}</dd>
            </div>
          ))}
        </dl>

        <span className="font-tech text-xs tracking-[0.14em] text-zinc-300 uppercase transition-colors group-hover/bento:text-white">
          Open mission log →
        </span>
      </button>
    </BentoCard>
  );
}

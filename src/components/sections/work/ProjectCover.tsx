import Image from "next/image";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/types";

export interface ProjectCoverProps {
  study: CaseStudy;
  className?: string;
  /** Hint for next/image so the right size is downloaded. */
  sizes?: string;
}

/**
 * Visual header for a case study: the real screenshot when `cover` is set,
 * otherwise generated art (accent tint, dot grid and the project icon) so
 * cards never look text-only.
 */
export function ProjectCover({ study, className, sizes = "(min-width: 1280px) 50vw, 100vw" }: ProjectCoverProps) {
  const tokens = accentTokens(study.accent);
  const Icon = study.icon;

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-line", className)}>
      {study.cover ? (
        <Image src={study.cover} alt={`Screenshot of ${study.title}`} fill sizes={sizes} className="object-cover object-top" />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 75% 25%, rgb(${tokens.rgb} / 0.28), transparent 60%), radial-gradient(rgb(${tokens.rgb} / 0.22) 1px, transparent 1px)`,
            backgroundSize: "auto, 14px 14px",
            backgroundColor: "var(--inset)",
          }}
        >
          <Icon className={cn("absolute top-[42%] left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 opacity-80", tokens.text)} strokeWidth={1.4} />
          <ul className="absolute right-3 bottom-3 left-3 flex flex-nowrap gap-1.5 overflow-hidden">
            {study.stack.slice(0, 3).map((tech) => (
              <li key={tech} className="shrink-0 rounded bg-panel/80 px-1.5 py-0.5 font-tech text-xs tracking-[0.08em] text-fg-soft uppercase">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

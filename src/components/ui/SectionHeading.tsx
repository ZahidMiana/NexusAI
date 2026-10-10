import type { ReactNode } from "react";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/types";

export interface SectionHeadingProps {
  index: string;
  title: string;
  headingId?: string;
  subtitle?: ReactNode;
  accent?: Accent;
  className?: string;
}

export function SectionHeading({ index, title, headingId, subtitle, accent = "cyan", className }: SectionHeadingProps) {
  const tokens = accentTokens(accent);
  return (
    <header className={cn("mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        <p className={cn("font-tech text-xs tracking-[0.14em] uppercase", tokens.text)}>
          {"// "}SECTOR_{index}
        </p>
        <h2 id={headingId} className="mt-2 font-display text-2xl font-black tracking-wider text-white uppercase sm:text-3xl lg:text-4xl">
          {title}
        </h2>
      </div>
      {subtitle && <p className="max-w-md font-mono text-sm leading-relaxed text-zinc-300">{subtitle}</p>}
    </header>
  );
}

"use client";

import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { ActivityBoundary } from "@/context/ActivityContext";
import { useInView } from "@/hooks/useInView";
import { usePageVisible } from "@/hooks/usePageVisible";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/types";

export interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  accent?: Accent;
  /** Disable the hover lift for cards that host dense, precise interactions. */
  scaleOnHover?: boolean;
  children: ReactNode;
}

/**
 * The base container for every bento tile. Its look (radius, border, shadow,
 * hover) comes from the active design style via the `.bento` class. It is also
 * an activity boundary: live widgets inside pause while the card is off-screen.
 */
export function BentoCard({ accent = "cyan", scaleOnHover = true, className, children, ...rest }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tokens = accentTokens(accent);
  const inView = useInView(ref);
  const pageVisible = usePageVisible();

  return (
    <div
      ref={ref}
      className={cn(
        "bento group/bento relative isolate overflow-hidden rounded-2xl border border-line bg-panel",
        "transition-[translate,scale,box-shadow,border-color] duration-500 ease-hardware",
        scaleOnHover && "hover:scale-[1.012]",
        tokens.hoverBorder,
        className,
      )}
      {...rest}
    >
      <ActivityBoundary active={inView && pageVisible}>{children}</ActivityBoundary>
    </div>
  );
}

export interface BentoLabelProps {
  index?: string;
  children: ReactNode;
  accent?: Accent;
  className?: string;
}

export function BentoLabel({ index, children, accent = "cyan", className }: BentoLabelProps) {
  const tokens = accentTokens(accent);
  return (
    <div className={cn("flex items-center gap-2 font-tech text-xs tracking-[0.14em] text-fg-muted uppercase", className)}>
      {index && <span className={tokens.text}>{index}</span>}
      <span aria-hidden className="h-px w-6 bg-line-strong" />
      <span>{children}</span>
    </div>
  );
}

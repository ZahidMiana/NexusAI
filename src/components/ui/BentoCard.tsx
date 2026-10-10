"use client";

import { useRef, type CSSProperties, type HTMLAttributes, type PointerEvent, type ReactNode } from "react";
import { ActivityBoundary } from "@/context/ActivityContext";
import { useInView } from "@/hooks/useInView";
import { usePageVisible } from "@/hooks/usePageVisible";
import { useSpotlight } from "@/hooks/useSpotlight";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/types";

export interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  accent?: Accent;
  /** Disable the hover scale for cards that host dense, precise interactions. */
  scaleOnHover?: boolean;
  /** 3D tilt toward the cursor. Defaults to `scaleOnHover`. */
  tilt?: boolean;
  children: ReactNode;
}

/**
 * The base container for every bento tile: charcoal panel, cursor-tracked
 * spotlight border, optional tilt, and an activity boundary that pauses any
 * live widget inside it while the card is off-screen.
 */
export function BentoCard({
  accent = "cyan",
  scaleOnHover = true,
  tilt = scaleOnHover,
  className,
  style,
  children,
  onPointerMove,
  onPointerLeave,
  ...rest
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tokens = accentTokens(accent);
  const inView = useInView(ref);
  const pageVisible = usePageVisible();
  const spotlight = useSpotlight(ref, { tilt });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    spotlight.onPointerMove(event);
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    spotlight.onPointerLeave(event);
    onPointerLeave?.(event);
  };

  const cardStyle = {
    "--spot": `rgb(${tokens.rgb} / 0.9)`,
    "--spot-soft": `rgb(${tokens.rgb} / 0.1)`,
    transform: tilt ? "perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" : undefined,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      style={cardStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "bento group/bento relative isolate overflow-hidden rounded-2xl border border-line bg-panel",
        "transform-gpu transition-[transform,scale,box-shadow,border-color] duration-500 ease-hardware will-change-transform",
        scaleOnHover && "hover:scale-[1.012]",
        tokens.hoverBorder,
        tokens.hoverGlow,
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-scanlines opacity-20" />
      <span aria-hidden className="bento-spotlight-fill pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100" />
      <span aria-hidden className="bento-spotlight-border pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/bento:opacity-100" />
      <CornerBrackets accent={accent} />
      <ActivityBoundary active={inView && pageVisible}>{children}</ActivityBoundary>
    </div>
  );
}

const BRACKET_POSITIONS = [
  "top-2 left-2 border-t border-l",
  "top-2 right-2 border-t border-r",
  "bottom-2 left-2 border-b border-l",
  "bottom-2 right-2 border-b border-r",
] as const;

function CornerBrackets({ accent }: { accent: Accent }) {
  const { groupHoverBorder } = accentTokens(accent);
  return (
    <>
      {BRACKET_POSITIONS.map((position) => (
        <span
          key={position}
          aria-hidden
          className={cn(
            "bento-bracket pointer-events-none absolute h-3 w-3 border-line-strong opacity-0 transition-[opacity,border-color] duration-500 group-hover/bento:opacity-100",
            position,
            groupHoverBorder,
          )}
        />
      ))}
    </>
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

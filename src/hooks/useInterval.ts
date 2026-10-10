"use client";

import { useEffect, useRef } from "react";
import { useActivity } from "@/context/ActivityContext";
import { usePrefersReducedMotion } from "./useMediaQuery";

export type IntervalKind =
  /** Ambient telemetry: pauses off-screen, in hidden tabs and under reduced motion. */
  | "decorative"
  /** User-initiated work (loading bars, demos): always runs while mounted. */
  | "functional";

export interface IntervalOptions {
  kind?: IntervalKind;
}

/** Declarative setInterval. Pass `null` as the delay to pause. */
export function useInterval(callback: () => void, delay: number | null, { kind = "decorative" }: IntervalOptions = {}): void {
  const savedCallback = useRef(callback);
  const active = useActivity();
  const reducedMotion = usePrefersReducedMotion();
  const paused = kind === "decorative" && (!active || reducedMotion);
  const effectiveDelay = paused ? null : delay;

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (effectiveDelay === null) return;
    const id = window.setInterval(() => savedCallback.current(), effectiveDelay);
    return () => window.clearInterval(id);
  }, [effectiveDelay]);
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Runs a 0→1 progress animation on requestAnimationFrame once `start` is
 * true. Returns `null` until it starts and `1` when finished or skipped.
 */
export function useFrameAnimation(start: boolean, durationMs: number, enabled = true): number | null {
  const [progress, setProgress] = useState<number | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    if (!enabled) {
      const id = window.requestAnimationFrame(() => setProgress(1));
      return () => window.cancelAnimationFrame(id);
    }
    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const next = Math.min(1, (now - startedAt) / durationMs);
      setProgress(next);
      if (next < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [start, durationMs, enabled]);

  return progress;
}

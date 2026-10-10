"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

export interface TypewriterOptions {
  enabled?: boolean;
  /** Milliseconds between ticks. */
  speed?: number;
  /** Characters revealed per tick. */
  step?: number;
  onComplete?: () => void;
}

export interface TypewriterState {
  output: string;
  done: boolean;
}

interface Progress {
  runKey: string;
  length: number;
}

/**
 * Progressively reveals `text`, firing `onComplete` exactly once per run.
 * Reduced-motion users get the full text instantly (completion still fires).
 */
export function useTypewriter(text: string, { enabled: requested = true, speed = 14, step = 2, onComplete }: TypewriterOptions = {}): TypewriterState {
  const reducedMotion = usePrefersReducedMotion();
  const enabled = requested && !reducedMotion;
  const runKey = `${enabled ? 1 : 0}|${text}`;
  const startLength = enabled ? 0 : text.length;
  const [progress, setProgress] = useState<Progress>({ runKey, length: startLength });
  const completeRef = useRef(onComplete);
  const completedRunRef = useRef<string | null>(null);

  // Reset synchronously when the text or mode changes (derived-state pattern).
  if (progress.runKey !== runKey) {
    setProgress({ runKey, length: startLength });
  }
  const length = progress.runKey === runKey ? progress.length : startLength;

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      setProgress((current) => {
        if (current.runKey !== runKey) return current;
        const next = Math.min(text.length, current.length + step);
        if (next >= text.length) window.clearInterval(id);
        return { runKey, length: next };
      });
    }, speed);
    return () => window.clearInterval(id);
  }, [runKey, text, enabled, speed, step]);

  const done = length >= text.length;

  useEffect(() => {
    if (done && completedRunRef.current !== runKey) {
      completedRunRef.current = runKey;
      completeRef.current?.();
    }
  }, [done, runKey]);

  return { output: text.slice(0, length), done };
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface StepSequence<T> {
  steps: readonly T[];
  activeIndex: number;
  running: boolean;
  start: (steps: readonly T[]) => void;
  reset: () => void;
}

/** Walks through a list of steps on a timer — used for routing demos. */
export function useStepSequence<T>(stepMs = 520): StepSequence<T> {
  const [steps, setSteps] = useState<readonly T[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(
    (nextSteps: readonly T[]) => {
      clearTimer();
      setSteps(nextSteps);
      setActiveIndex(0);
      timerRef.current = window.setInterval(() => {
        setActiveIndex((current) => {
          if (current >= nextSteps.length - 1) {
            clearTimer();
            return current;
          }
          return current + 1;
        });
      }, stepMs);
    },
    [clearTimer, stepMs],
  );

  const reset = useCallback(() => {
    clearTimer();
    setSteps([]);
    setActiveIndex(-1);
  }, [clearTimer]);

  useEffect(() => clearTimer, [clearTimer]);

  const running = activeIndex >= 0 && activeIndex < steps.length - 1;

  return { steps, activeIndex, running, start, reset };
}

"use client";

import { useCallback, type PointerEvent, type RefObject } from "react";
import { useCanHover } from "./useMediaQuery";
import { useMotionAllowed } from "./usePreferences";

export interface SpotlightOptions {
  tilt?: boolean;
  /** Maximum tilt in degrees on each axis. */
  maxTilt?: number;
}

export interface SpotlightHandlers {
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: PointerEvent<HTMLElement>) => void;
}

/**
 * Writes cursor position (`--mx`, `--my`) and tilt (`--rx`, `--ry`) as CSS
 * variables straight onto the element, so tracking never re-renders React.
 * Mouse only; disabled for touch input and reduced-motion users.
 */
export function useSpotlight(ref: RefObject<HTMLElement | null>, { tilt = false, maxTilt = 4 }: SpotlightOptions = {}): SpotlightHandlers {
  const canHover = useCanHover();
  const motionAllowed = useMotionAllowed();
  const tiltEnabled = tilt && canHover && motionAllowed;

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const element = ref.current;
      if (!element || event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      element.style.setProperty("--mx", `${x}px`);
      element.style.setProperty("--my", `${y}px`);
      if (tiltEnabled) {
        const px = x / rect.width - 0.5;
        const py = y / rect.height - 0.5;
        element.style.setProperty("--rx", `${(-py * maxTilt * 2).toFixed(2)}deg`);
        element.style.setProperty("--ry", `${(px * maxTilt * 2).toFixed(2)}deg`);
      }
    },
    [ref, tiltEnabled, maxTilt],
  );

  const onPointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
  }, [ref]);

  return { onPointerMove, onPointerLeave };
}

"use client";

import { useCallback, type PointerEvent, type RefObject } from "react";
import { useCanHover } from "./useMediaQuery";
import { useMotionAllowed } from "./usePreferences";

/** Pulls an element slightly toward the cursor while hovered. */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.25, maxOffset = 10) {
  const canHover = useCanHover();
  const motionAllowed = useMotionAllowed();
  const enabled = canHover && motionAllowed;

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const element = ref.current;
      if (!enabled || !element || event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      const clamp = (value: number) => Math.max(-maxOffset, Math.min(maxOffset, value));
      const dx = clamp((event.clientX - (rect.left + rect.width / 2)) * strength);
      const dy = clamp((event.clientY - (rect.top + rect.height / 2)) * strength);
      element.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    },
    [ref, enabled, strength, maxOffset],
  );

  const onPointerLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, [ref]);

  return { onPointerMove, onPointerLeave };
}

"use client";

import { useEffect, useRef } from "react";
import { useCanHover } from "@/hooks/useMediaQuery";
import { useMotionAllowed, usePreferences } from "@/hooks/usePreferences";

const INTERACTIVE = "a, button, [role='button'], [role='option'], input, select, textarea, label, summary";

/**
 * A soft ring that trails the mouse and swells over interactive elements.
 * The native cursor stays visible; the ring is purely decorative.
 */
export function CursorRing() {
  const ringRef = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const motionAllowed = useMotionAllowed();
  const { style } = usePreferences();
  const enabled = canHover && motionAllowed && style === "cyber";

  useEffect(() => {
    const ring = ringRef.current;
    if (!enabled || !ring) return;

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let frame = 0;
    let running = false;

    const tick = () => {
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.3) {
        frame = window.requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      ring.dataset.visible = "true";
      ring.dataset.hover = String(Boolean((event.target as Element | null)?.closest?.(INTERACTIVE)));
      if (!running) {
        running = true;
        frame = window.requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      ring.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      ring.dataset.visible = "false";
    };
  }, [enabled]);

  return <div ref={ringRef} aria-hidden className="cursor-ring" data-visible="false" />;
}

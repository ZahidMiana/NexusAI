"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";
import { createNetwork, renderNetwork, stepNetwork, stimulate, type NetworkState } from "@/lib/neural/simulation";
import type { PointerState } from "@/types";
import { readAccentPalette, type AccentPalette } from "@/lib/accent";
import { useMotionAllowed, usePreferences } from "./usePreferences";

/** How long a touch keeps the mesh excited after the finger lifts. */
const TOUCH_LINGER_MS = 1600;

export interface NeuralCanvasHandlers {
  onPointerEnter: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLElement>) => void;
}

export interface NeuralCanvasBindings {
  active: boolean;
  handlers: NeuralCanvasHandlers;
}

/**
 * Owns the animation loop for the neural topology map: sizing, DPR scaling,
 * mouse + touch tracking, click/tap stimulus bursts, pausing off-screen, and a
 * single static frame for reduced-motion users.
 */
export function useNeuralCanvas(canvasRef: RefObject<HTMLCanvasElement | null>): NeuralCanvasBindings {
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });
  const stimulusRef = useRef<{ x: number; y: number } | null>(null);
  const lingerRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);
  const reducedMotion = !useMotionAllowed();
  const { theme, style } = usePreferences();
  const paletteRef = useRef<AccentPalette | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let state: NetworkState = { nodes: [], signals: [] };
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      state = createNetwork(width, height);
      paletteRef.current = readAccentPalette();
      if (reducedMotion) renderNetwork(context, state, width, height, { x: 0, y: 0, active: false }, paletteRef.current);
    };

    const loop = () => {
      if (visible) {
        const stimulus = stimulusRef.current;
        if (stimulus) {
          stimulate(state, stimulus.x, stimulus.y);
          stimulusRef.current = null;
        }
        stepNetwork(state, width, height, pointerRef.current);
        renderNetwork(context, state, width, height, pointerRef.current, paletteRef.current ?? readAccentPalette());
      }
      frame = window.requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    resize();
    if (!reducedMotion) frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [canvasRef, reducedMotion, theme, style]);

  useEffect(
    () => () => {
      if (lingerRef.current !== null) window.clearTimeout(lingerRef.current);
    },
    [],
  );

  const localPoint = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      return rect ? { x: event.clientX - rect.left, y: event.clientY - rect.top } : null;
    },
    [canvasRef],
  );

  const engage = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (reducedMotion) return;
      const point = localPoint(event);
      if (!point) return;
      if (lingerRef.current !== null) {
        window.clearTimeout(lingerRef.current);
        lingerRef.current = null;
      }
      pointerRef.current = { ...point, active: true };
      setActive(true);
    },
    [localPoint, reducedMotion],
  );

  const release = useCallback((event: PointerEvent<HTMLElement>) => {
    const deactivate = () => {
      pointerRef.current = { ...pointerRef.current, active: false };
      setActive(false);
      lingerRef.current = null;
    };
    if (event.pointerType === "mouse") {
      deactivate();
    } else {
      if (lingerRef.current !== null) window.clearTimeout(lingerRef.current);
      lingerRef.current = window.setTimeout(deactivate, TOUCH_LINGER_MS);
    }
  }, []);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      engage(event);
      const point = localPoint(event);
      if (point && !reducedMotion) stimulusRef.current = point;
    },
    [engage, localPoint, reducedMotion],
  );

  return {
    active,
    handlers: {
      onPointerEnter: engage,
      onPointerMove: engage,
      onPointerDown,
      onPointerLeave: release,
      onPointerCancel: release,
    },
  };
}

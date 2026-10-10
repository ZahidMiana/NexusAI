"use client";

import { useState } from "react";
import { jitter } from "@/lib/math";
import { useInterval } from "./useInterval";

export interface LiveMetricOptions {
  initial: number;
  amplitude: number;
  min: number;
  max: number;
  intervalMs?: number;
  paused?: boolean;
}

/** A bounded random-walk value that simulates live telemetry. */
export function useLiveMetric({ initial, amplitude, min, max, intervalMs = 1200, paused = false }: LiveMetricOptions): number {
  const [value, setValue] = useState(initial);
  useInterval(() => setValue((current) => jitter(current, amplitude, min, max)), paused ? null : intervalMs);
  return value;
}

export interface CounterOptions {
  initial: number;
  minStep: number;
  maxStep: number;
  intervalMs?: number;
  paused?: boolean;
}

/** A monotonically increasing counter with randomised increments. */
export function useLiveCounter({ initial, minStep, maxStep, intervalMs = 800, paused = false }: CounterOptions): number {
  const [value, setValue] = useState(initial);
  useInterval(
    () => setValue((current) => current + Math.round(minStep + Math.random() * (maxStep - minStep))),
    paused ? null : intervalMs,
  );
  return value;
}

export interface LiveSeriesOptions extends Omit<LiveMetricOptions, "initial"> {
  initial: number;
  length?: number;
}

/** A rolling window of random-walk samples, for sparklines. */
export function useLiveSeries({ initial, amplitude, min, max, intervalMs = 900, length = 32, paused = false }: LiveSeriesOptions): number[] {
  const [series, setSeries] = useState<number[]>(() => Array.from({ length }, () => initial));
  useInterval(() => {
    setSeries((current) => {
      const last = current[current.length - 1] ?? initial;
      return [...current.slice(1 - length), jitter(last, amplitude, min, max)];
    });
  }, paused ? null : intervalMs);
  return series;
}

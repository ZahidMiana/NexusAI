export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1));
}

/** Random walk step that stays within bounds — used for live telemetry. */
export function jitter(value: number, amplitude: number, min: number, max: number): number {
  return clamp(value + randomBetween(-amplitude, amplitude), min, max);
}

export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

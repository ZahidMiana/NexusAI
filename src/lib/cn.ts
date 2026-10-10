import { clsx, type ClassValue } from "clsx";

/** Compose conditional class names into a single string. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

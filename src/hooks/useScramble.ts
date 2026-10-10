"use client";

import { useState } from "react";
import { useInterval } from "./useInterval";
import { usePrefersReducedMotion } from "./useMediaQuery";

const GLYPHS = "ABCDEF0123456789#$%&@!?<>/\\=+*";

function isStructural(char: string): boolean {
  return char === " " || char === "@" || char === ".";
}

function scramble(text: string, revealed: number): string {
  return text
    .split("")
    .map((char, index) => (isStructural(char) || index < revealed ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
    .join("");
}

function mask(text: string): string {
  return text.replace(/[^\s@.]/g, "•");
}

/**
 * Shows `text` as cipher noise until `decrypt` is true, then resolves it
 * left-to-right. Ambient noise pauses off-screen; reduced-motion users see a
 * static mask and an instant reveal.
 */
export function useScramble(text: string, decrypt: boolean, speed = 28): string {
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(() => mask(text));
  const [revealed, setRevealed] = useState(0);
  const [lastDecrypt, setLastDecrypt] = useState(decrypt);

  if (lastDecrypt !== decrypt) {
    setLastDecrypt(decrypt);
    setRevealed(0);
  }

  const revealing = decrypt && revealed < text.length;

  useInterval(
    () => {
      const next = revealed + 1;
      setRevealed(next);
      setDisplay(scramble(text, next));
    },
    revealing ? speed : null,
    { kind: "functional" },
  );

  useInterval(() => setDisplay(scramble(text, 0)), decrypt ? null : 140);

  if (reducedMotion) return decrypt ? text : mask(text);
  return display;
}

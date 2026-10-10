"use client";

import { Check, Copy, Lock } from "lucide-react";
import { useState } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import { useScramble } from "@/hooks/useScramble";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/types";

export interface EncryptedMailProps {
  label: string;
  address: string;
  accent: Accent;
}

/** An email string shown as cipher noise that decrypts on hover/focus. */
export function EncryptedMail({ label, address, accent }: EncryptedMailProps) {
  const [decrypted, setDecrypted] = useState(false);
  const display = useScramble(address, decrypted);
  const { copied, copy } = useClipboard();
  const tokens = accentTokens(accent);

  return (
    <button
      type="button"
      onMouseEnter={() => setDecrypted(true)}
      onMouseLeave={() => setDecrypted(false)}
      onFocus={() => setDecrypted(true)}
      onBlur={() => setDecrypted(false)}
      onClick={() => copy(address)}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-inset px-3 py-2.5 text-left transition-all duration-300",
        tokens.hoverBorder,
      )}
      aria-label={`Copy ${label} address ${address}`}
    >
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">
          <Lock className="h-3 w-3" /> {label}
        </span>
        <span className={cn("mt-1 block truncate font-mono text-sm", decrypted ? tokens.text : "text-fg-muted")}>{display}</span>
      </span>
      {copied ? <Check className="h-4 w-4 shrink-0 text-cyber-lime" /> : <Copy className="h-4 w-4 shrink-0 text-fg-muted group-hover:text-fg-soft" />}
    </button>
  );
}

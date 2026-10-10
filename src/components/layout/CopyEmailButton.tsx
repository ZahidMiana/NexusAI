"use client";

import { Check, Copy } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useClipboard } from "@/hooks/useClipboard";

export function CopyEmailButton() {
  const { copied, copy } = useClipboard();
  return (
    <button
      type="button"
      onClick={() => copy(siteConfig.contact.email)}
      aria-label={copied ? "Email copied" : `Copy email address ${siteConfig.contact.email}`}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {copied ? <Check className="h-4 w-4 text-cyber-lime" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

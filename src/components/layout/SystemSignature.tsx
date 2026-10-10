"use client";

import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useUptime } from "@/hooks/useUptime";

const FOUNDING_YEAR = new Date(siteConfig.foundedAt).getUTCFullYear();

/** Signature block verifying the current system year and live uptime. */
export function SystemSignature() {
  const { label, year } = useUptime(siteConfig.foundedAt);
  const currentYear = year ?? FOUNDING_YEAR;
  const signature = `0x${(currentYear * 2654435761 >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center gap-2 font-tech tracking-[0.12em] text-cyber-lime uppercase">
        <ShieldCheck className="h-4 w-4" />
        Signature verified
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-fg-muted">
        <dt>SIG</dt>
        <dd className="truncate text-fg-soft">{signature}</dd>
        <dt>UPTIME</dt>
        <dd className="tabular-nums text-cyber-lime">{label ?? "syncing…"}</dd>
        <dt>EPOCH</dt>
        <dd className="text-fg-soft">
          {FOUNDING_YEAR}–{currentYear}
        </dd>
      </dl>
      <p className="text-fg-muted">
        © {currentYear} {siteConfig.name}. All neural rights reserved.
      </p>
    </div>
  );
}

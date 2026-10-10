import { ShieldAlert, ShieldCheck, ShieldX, type LucideIcon } from "lucide-react";
import type { Verdict } from "@/lib/security/guardrail";
import type { Accent } from "@/types";

/** Shared presentation of guardrail verdicts (Security Lab and hero demo). */
export const VERDICT_STYLE: Record<Verdict, { label: string; accent: Accent; icon: LucideIcon }> = {
  blocked: { label: "BLOCKED", accent: "pink", icon: ShieldX },
  flagged: { label: "FLAGGED FOR REVIEW", accent: "cyan", icon: ShieldAlert },
  allowed: { label: "ALLOWED", accent: "lime", icon: ShieldCheck },
};

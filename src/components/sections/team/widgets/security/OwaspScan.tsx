"use client";

import { CheckCircle2, CircleAlert, CircleX, Play, RotateCcw } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { OWASP_LLM_CHECKS, type ScanStatus } from "@/data/security";
import { useStepSequence } from "@/hooks/useStepSequence";
import { cn } from "@/lib/cn";

const STATUS: Record<ScanStatus, { icon: typeof CheckCircle2; className: string; label: string }> = {
  pass: { icon: CheckCircle2, className: "text-cyber-lime", label: "Pass" },
  warn: { icon: CircleAlert, className: "text-cyber-cyan", label: "Warning" },
  fail: { icon: CircleX, className: "text-cyber-pink", label: "Fail" },
};

/** Walks the OWASP LLM Top 10 against a demo target, one check at a time. */
export function OwaspScan() {
  const { activeIndex, running, start, reset } = useStepSequence<string>(380);
  const done = activeIndex >= OWASP_LLM_CHECKS.length - 1;
  const checked = OWASP_LLM_CHECKS.slice(0, activeIndex + 1);
  const count = (status: ScanStatus) => checked.filter((check) => check.status === status).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs text-fg-muted">
          Target: <span className="text-fg">demo RAG chatbot</span> · OWASP Top 10 for LLMs (2025)
        </p>
        {activeIndex < 0 ? (
          <NeonButton accent="pink" size="sm" icon={<Play className="h-3.5 w-3.5" />} onClick={() => start(OWASP_LLM_CHECKS.map((check) => check.id))}>
            Run audit
          </NeonButton>
        ) : (
          <NeonButton accent="cyan" size="sm" icon={<RotateCcw className="h-3.5 w-3.5" />} onClick={reset} disabled={running}>
            Reset
          </NeonButton>
        )}
      </div>

      <ol className="grid gap-1.5 sm:grid-cols-2" aria-live="polite">
        {OWASP_LLM_CHECKS.map((check, index) => {
          const revealed = index <= activeIndex;
          const status = STATUS[check.status];
          const Icon = status.icon;
          return (
            <li key={check.id} className={cn("rounded-lg border border-line bg-inset px-3 py-2 transition-opacity duration-300", !revealed && "opacity-50")}>
              <div className="flex items-center gap-2">
                {revealed ? <Icon className={cn("h-4 w-4 shrink-0", status.className)} aria-label={status.label} /> : <span className="h-4 w-4 shrink-0 rounded-full border border-line-strong" aria-hidden />}
                <span className="font-tech text-xs tracking-[0.08em] text-fg-muted">{check.id}</span>
                <span className="truncate font-mono text-xs text-fg">{check.name}</span>
              </div>
              {revealed && check.status !== "pass" && <p className="mt-1 pl-6 font-mono text-xs leading-relaxed text-fg-soft">{check.finding}</p>}
            </li>
          );
        })}
      </ol>

      {done && (
        <p className="font-mono text-xs text-fg-soft">
          Audit complete: <span className="text-cyber-pink">{count("fail")} fail</span> · <span className="text-cyber-cyan">{count("warn")} warn</span> ·{" "}
          <span className="text-cyber-lime">{count("pass")} pass</span>. Each finding ships with a fix and a retest.
        </p>
      )}
    </div>
  );
}

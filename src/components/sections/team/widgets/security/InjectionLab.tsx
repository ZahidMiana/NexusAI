"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, ShieldAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MetricBar } from "@/components/ui/MetricBar";
import { NeonButton } from "@/components/ui/NeonButton";
import { ATTACK_PRESETS } from "@/data/security";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { analyzePrompt, type GuardrailResult } from "@/lib/security/guardrail";
import { VERDICT_STYLE } from "./verdict";


/** Prompt injection firewall demo: pick or type a prompt and run the guardrail. */
export function InjectionLab() {
  const [prompt, setPrompt] = useState(ATTACK_PRESETS[1].prompt);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<GuardrailResult | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const scan = () => {
    if (!prompt.trim()) return;
    setScanning(true);
    setResult(null);
    timerRef.current = window.setTimeout(() => {
      setResult(analyzePrompt(prompt));
      setScanning(false);
    }, 650);
  };

  const pickPreset = (text: string) => {
    setPrompt(text);
    setResult(null);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5" aria-label="Example prompts">
          {ATTACK_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => pickPreset(preset.prompt)}
              aria-pressed={prompt === preset.prompt}
              className={cn(
                "rounded-md border px-2.5 py-1 font-tech text-xs tracking-[0.08em] uppercase transition-colors",
                prompt === preset.prompt ? "border-cyber-pink bg-cyber-pink/10 text-cyber-pink" : "border-line text-fg-muted hover:text-fg",
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <label htmlFor="injection-prompt" className="sr-only">
          Prompt to test
        </label>
        <textarea
          id="injection-prompt"
          value={prompt}
          onChange={(event) => {
            setPrompt(event.target.value);
            setResult(null);
          }}
          rows={4}
          maxLength={1000}
          className="field-control w-full resize-none rounded-lg border border-line-strong bg-inset px-3.5 py-2.5 font-mono text-sm text-fg outline-none focus:border-cyber-cyan"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-fg-muted">Demo heuristics, not a production filter.</p>
          <NeonButton accent="pink" variant="solid" size="sm" onClick={scan} disabled={scanning || !prompt.trim()} icon={scanning ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShieldAlert className="h-3.5 w-3.5" />}>
            {scanning ? "Scanning" : "Run guardrail"}
          </NeonButton>
        </div>
      </div>

      <div className="min-h-[13rem] rounded-xl border border-line bg-inset p-4" aria-live="polite">
        <AnimatePresence mode="wait">
          {scanning && (
            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2 font-mono text-xs text-fg-muted">
              <p>{"> tokenising input…"}</p>
              <p>{"> matching 9 detection rules…"}</p>
              <p>{"> scoring against OWASP LLM Top 10…"}</p>
            </motion.div>
          )}
          {!scanning && result && <ResultView key="result" result={result} />}
          {!scanning && !result && (
            <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm text-fg-muted">
              {"// Pick an attack or write your own, then run the guardrail."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ResultView({ result }: { result: GuardrailResult }) {
  const style = VERDICT_STYLE[result.verdict];
  const tokens = accentTokens(style.accent);
  const Icon = style.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
      <p className={cn("flex items-center gap-2 font-display text-lg font-black tracking-wide", tokens.text)}>
        <Icon className="h-5 w-5" aria-hidden /> {style.label}
      </p>
      <MetricBar label="Risk score" value={result.risk} unit="/100" accent={style.accent} />
      {result.findings.length === 0 ? (
        <p className="font-mono text-sm text-fg-soft">No attack patterns found. Prompt passed to the model.</p>
      ) : (
        <ul className="space-y-2">
          {result.findings.map((finding) => (
            <li key={finding.ruleId} className="rounded-lg border border-line bg-panel px-3 py-2">
              <p className="flex items-center justify-between gap-2 font-mono text-xs">
                <span className="text-fg">{finding.label}</span>
                <span className="shrink-0 font-tech tracking-[0.08em] text-fg-muted uppercase">{finding.severity}</span>
              </p>
              <p className={cn("mt-0.5 font-tech text-xs tracking-[0.08em]", tokens.text)}>{finding.owasp}</p>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

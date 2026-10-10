"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { INFERENCE_ARCHITECTURE } from "@/data/telemetry";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";

const LAYER_NOTES: Record<string, string> = {
  client: "Next.js chat UI that streams answers token by token and shows the source behind every citation.",
  gateway: "FastAPI service with JWT authentication, role-based access control and per-user rate limits.",
  orchestrator: "LangGraph agent graph with tools, persistent memory and human-in-the-loop checkpoints.",
  inference: "Hybrid retrieval: ChromaDB dense vectors plus BM25 keyword search, merged and re-ranked for accuracy.",
  memory: "Gemini or GPT models for generation, with Redis caching chat history and frequent answers.",
};

/** Interactive system architecture graph — click a layer to inspect it. */
export function ArchitectureGraph() {
  const [selected, setSelected] = useState<string>(INFERENCE_ARCHITECTURE[3].id);
  const selectedLayer = INFERENCE_ARCHITECTURE.find((layer) => layer.id === selected) ?? INFERENCE_ARCHITECTURE[0];
  const selectedTokens = accentTokens(selectedLayer.accent);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <ol className="relative space-y-2" aria-label="Inference architecture layers">
        {INFERENCE_ARCHITECTURE.map((layer, index) => {
          const tokens = accentTokens(layer.accent);
          const isSelected = layer.id === selected;
          return (
            <li key={layer.id} className="relative">
              {index < INFERENCE_ARCHITECTURE.length - 1 && (
                <svg className="absolute top-full left-6 z-0 h-2 w-px overflow-visible" aria-hidden>
                  <line x1="0" y1="0" x2="0" y2="8" style={{ stroke: tokens.hex }} strokeWidth="1.5" strokeDasharray="3 3" className="animate-dash" />
                </svg>
              )}
              <button
                type="button"
                onClick={() => setSelected(layer.id)}
                aria-pressed={isSelected}
                className={cn(
                  "relative z-10 flex w-full items-center justify-between gap-3 rounded-lg border bg-inset px-3 py-2 text-left transition-all duration-300 ease-hardware",
                  isSelected ? cn(tokens.border, tokens.glow) : "border-line hover:border-line-strong",
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn("font-tech text-xs tabular-nums", tokens.text)}>L{index + 1}</span>
                  <span className="font-tech text-xs tracking-[0.12em] text-fg-soft uppercase">{layer.label}</span>
                </span>
                <span className="hidden truncate font-mono text-xs text-fg-muted sm:inline">{layer.detail}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedLayer.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-line bg-inset p-4"
        >
          <p className={cn("flex items-center gap-1 font-tech text-xs tracking-[0.14em] uppercase", selectedTokens.text)}>
            <ChevronRight className="h-3.5 w-3.5" />
            {selectedLayer.label}
          </p>
          <p className="mt-1 font-mono text-xs text-fg-muted">{selectedLayer.detail}</p>
          <p className="mt-3 font-mono text-sm leading-relaxed text-fg-soft">{LAYER_NOTES[selectedLayer.id]}</p>
          <div className="mt-4 flex items-center gap-2 font-tech text-xs tracking-[0.14em] text-cyber-lime uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-lime" /> Health check passing
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

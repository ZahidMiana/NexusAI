"use client";

import { motion } from "framer-motion";
import { MousePointerClick, RotateCcw } from "lucide-react";
import { useMemo } from "react";
import { WORKFLOW_NODES, buildRoute } from "@/data/workflow";
import { useStepSequence } from "@/hooks/useStepSequence";
import { cn } from "@/lib/cn";
import type { WorkflowNode } from "@/types";
import { WorkflowGraph } from "./WorkflowGraph";

const nodeById = new Map(WORKFLOW_NODES.map((node) => [node.id, node]));

function describeStep(nodeId: string, agent: WorkflowNode | undefined): string {
  const agentLabel = agent?.label ?? "AGENT";
  switch (nodeId) {
    case "intake":
      return `INTAKE ← "${agent?.task ?? "task"}"`;
    case "router":
      return `ROUTER → intent classified → ${agentLabel}_AGENT (conf 0.96)`;
    case "qa":
      return "QA_GATE → eval score 0.97 · guardrails ✓";
    case "deliver":
      return "DELIVER → result shipped in 1.84s";
    default:
      return `${agentLabel}_AGENT → executing tool chain…`;
  }
}

/** Agentic workflow simulator — click an agent node to watch task routing. */
export function WorkflowDesigner() {
  const { steps, activeIndex, running, start, reset } = useStepSequence<string>(560);
  const agent = steps.length > 2 ? nodeById.get(steps[2]) : undefined;

  const litNodes = useMemo(() => new Set(steps.slice(0, activeIndex + 1)), [steps, activeIndex]);
  const litEdges = useMemo(() => {
    const keys = new Set<string>();
    for (let index = 0; index < activeIndex; index += 1) keys.add(`${steps[index]}->${steps[index + 1]}`);
    return keys;
  }, [steps, activeIndex]);

  const graphProps = {
    litNodes,
    litEdges,
    packetNodeId: activeIndex >= 0 ? steps[activeIndex] : undefined,
    disabled: running,
    onSelectAgent: (agentId: string) => start(buildRoute(agentId)),
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-tech text-xs tracking-[0.12em] text-zinc-400 uppercase">
          <MousePointerClick className="h-3.5 w-3.5 text-cyber-pink" /> Tap an agent node to route a task
        </p>
        <button
          type="button"
          onClick={reset}
          disabled={steps.length === 0}
          className="flex items-center gap-1.5 font-tech text-xs tracking-[0.12em] text-zinc-400 uppercase transition-colors hover:text-cyber-cyan disabled:opacity-40"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-black/50 p-2">
        {/* Both layouts are rendered; CSS picks one, so there is no hydration flash. */}
        <WorkflowGraph orientation="vertical" className="mx-auto max-w-xs sm:hidden" {...graphProps} />
        <WorkflowGraph orientation="horizontal" className="hidden sm:block" {...graphProps} />
      </div>

      <ol className="min-h-[7.5rem] space-y-1 rounded-xl border border-zinc-800 bg-black/60 p-3 font-mono text-xs" aria-live="polite">
        {steps.length === 0 ? (
          <li className="text-zinc-400">{"// awaiting task injection…"}</li>
        ) : (
          steps.slice(0, activeIndex + 1).map((nodeId, index) => (
            <motion.li
              key={`${nodeId}-${index}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(index === activeIndex ? "text-cyber-pink" : "text-zinc-300")}
            >
              <span className="text-zinc-400">[{String(index).padStart(2, "0")}]</span> {describeStep(nodeId, agent)}
            </motion.li>
          ))
        )}
      </ol>
    </div>
  );
}

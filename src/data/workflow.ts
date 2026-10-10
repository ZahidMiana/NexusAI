import type { WorkflowEdge, WorkflowNode } from "@/types";

/** Coordinates are expressed on a 100 × 60 virtual canvas. */
export const WORKFLOW_NODES: readonly WorkflowNode[] = [
  { id: "intake", label: "INTAKE", x: 9, y: 30, accent: "cyan", routable: false },
  { id: "router", label: "ROUTER", x: 29, y: 30, accent: "pink", routable: false },
  { id: "research", label: "RESEARCH", x: 50, y: 9, accent: "cyan", routable: true, task: "Summarise 40 competitor filings" },
  { id: "code", label: "CODE", x: 50, y: 30, accent: "lime", routable: true, task: "Patch failing checkout test" },
  { id: "support", label: "SUPPORT", x: 50, y: 51, accent: "pink", routable: true, task: "Resolve refund ticket #4821" },
  { id: "qa", label: "QA_GATE", x: 71, y: 30, accent: "lime", routable: false },
  { id: "deliver", label: "DELIVER", x: 91, y: 30, accent: "cyan", routable: false },
];

export const WORKFLOW_EDGES: readonly WorkflowEdge[] = [
  { from: "intake", to: "router" },
  { from: "router", to: "research" },
  { from: "router", to: "code" },
  { from: "router", to: "support" },
  { from: "research", to: "qa" },
  { from: "code", to: "qa" },
  { from: "support", to: "qa" },
  { from: "qa", to: "deliver" },
];

export function buildRoute(agentId: string): string[] {
  return ["intake", "router", agentId, "qa", "deliver"];
}

export function edgeKey(edge: WorkflowEdge): string {
  return `${edge.from}->${edge.to}`;
}

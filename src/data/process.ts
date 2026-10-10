import type { ProcessStep } from "@/types";

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    id: "discover",
    code: "01",
    title: "Discover",
    duration: "Week 1",
    accent: "cyan",
    description: "We map your workflows, data and constraints, then pick the use case with the clearest return.",
    deliverables: ["Opportunity map", "Data readiness report", "Success metrics"],
  },
  {
    id: "architect",
    code: "02",
    title: "Architect",
    duration: "Week 2",
    accent: "pink",
    description: "We design the system end to end: models, retrieval, agents, infrastructure, security and cost.",
    deliverables: ["System architecture", "Model selection", "Cost and latency budget"],
  },
  {
    id: "ship",
    code: "03",
    title: "Ship",
    duration: "Weeks 3 to 8",
    accent: "lime",
    description: "We build in weekly releases with an evaluation suite that guards quality from day one.",
    deliverables: ["Production code", "Evaluation harness", "Weekly demos"],
  },
  {
    id: "operate",
    code: "04",
    title: "Operate",
    duration: "Ongoing",
    accent: "cyan",
    description: "We monitor, tune and scale the system, then hand over playbooks so your team owns it.",
    deliverables: ["Monitoring dashboards", "Runbooks", "Team handover"],
  },
];

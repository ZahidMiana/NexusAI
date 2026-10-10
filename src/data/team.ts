import type { MemberSpecialty, TeamMember } from "@/types";

/**
 * Placeholder operators. Replace names, bios, add `photo` (e.g. "/team/kai.jpg"
 * in /public) and `socials` with real profile URLs before launch.
 */
export const TEAM: readonly TeamMember[] = [
  {
    id: "op-01",
    handle: "@kai.ronin",
    name: "Kai Ronin",
    role: "Full-Stack AI Engineer",
    specialty: "full-stack",
    accent: "cyan",
    status: "DEPLOYING",
    bio: "Architects GPU-dense inference platforms end to end — from CUDA kernels and vLLM clusters to streaming Next.js frontends.",
    focus: ["LLM Serving", "RAG Pipelines", "Distributed Inference", "Next.js Edge"],
    hireAs: "llm-platform",
  },
  {
    id: "op-02",
    handle: "@nova.reyes",
    name: "Nova Reyes",
    role: "AI Product Engineer",
    specialty: "product",
    accent: "pink",
    status: "SHIPPING",
    bio: "Turns frontier models into revenue: agentic workflows, evaluation harnesses and product loops that compound ROI.",
    focus: ["Agentic Systems", "LLM Evals", "Product Analytics", "Tool Routing"],
    hireAs: "agentic-product",
  },
  {
    id: "op-03",
    handle: "@zen.okafor",
    name: "Zen Okafor",
    role: "AI Mobile Developer",
    specialty: "mobile",
    accent: "lime",
    status: "ON-DEVICE",
    bio: "Squeezes quantized LLMs and real-time vision models onto phones with zero cloud round-trips and all-day battery.",
    focus: ["On-Device LLMs", "Core ML / NNAPI", "Real-time CV", "React Native"],
    hireAs: "on-device",
  },
];

export function getMemberBySpecialty(specialty: MemberSpecialty): TeamMember {
  const member = TEAM.find((candidate) => candidate.specialty === specialty);
  if (!member) {
    throw new Error(`No team member registered for specialty "${specialty}"`);
  }
  return member;
}

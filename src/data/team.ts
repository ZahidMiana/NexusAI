import type { MemberSpecialty, TeamMember } from "@/types";

/**
 * The NexusAI operators. To add a member, append an entry here; its
 * `specialty` picks the showcase card (see TeamSection SHOWCASES).
 * Photos go in /public/team and are referenced as "/team/<file>".
 */
export const TEAM: readonly TeamMember[] = [
  {
    id: "zahid",
    handle: "@zahidmiana",
    name: "Zahid Iqbal",
    role: "Full Stack AI Engineer",
    specialty: "full-stack",
    accent: "cyan",
    status: "BUILDING",
    bio: "Builds production LLM applications and RAG pipelines with LangChain and LangGraph, from hybrid retrieval and AI agents to FastAPI backends, Next.js frontends and Solana smart contracts.",
    focus: ["LLM Applications", "RAG Pipelines", "LangGraph Agents", "Web3 / Solana"],
    hireAs: "llm-platform",
    photo: "/team/zahid.jpg",
    whatsapp: "923085897061",
    socials: { github: "https://github.com/ZahidMiana", website: "https://zahidmiana.dev" },
  },
  {
    id: "zeeshan",
    handle: "@zeeshankhalid",
    name: "Zeeshan Khalid",
    role: "AI Security Engineer",
    specialty: "security",
    accent: "pink",
    status: "RED-TEAMING",
    bio: "Breaks AI systems before attackers do. Red-teams LLM apps and autonomous agents for prompt injection, jailbreaks and tool abuse, pentests web apps and APIs, then hardens them for production.",
    focus: ["LLM Red Teaming", "Prompt Injection", "Web & API Pentesting", "Vector Search"],
    hireAs: "security",
    photo: "/team/zeeshan.jpg",
    whatsapp: "923177680092",
    socials: { linkedin: "https://www.linkedin.com/in/zeeshan-khalid66", website: "https://zeshankhalid.com" },
  },
  {
    id: "zubair",
    handle: "@zubairsandhu",
    name: "Zubair Ali Sandhu",
    role: "Mobile & Vision AI Engineer",
    specialty: "mobile",
    accent: "lime",
    status: "FINE-TUNING",
    bio: "Builds native Android apps in Kotlin and the vision models behind them. Fine-tunes vision-language models with QLoRA, trains GANs and retrieval models in PyTorch, and ships on-device ML features.",
    focus: ["Android / Kotlin", "Vision-Language Models", "QLoRA Fine-Tuning", "On-Device ML"],
    hireAs: "on-device",
    photo: "/team/zubair.jpg",
    whatsapp: "923237988344",
    socials: {
      github: "https://github.com/Zubair-Ali-Sandhu",
      linkedin: "https://linkedin.com/in/zubair-sandhu",
      website: "https://zubairsandhu.dev",
    },
  },
];

export function getMemberById(id: string): TeamMember | undefined {
  return TEAM.find((member) => member.id === id);
}

export function getMemberBySpecialty(specialty: MemberSpecialty): TeamMember | undefined {
  return TEAM.find((candidate) => candidate.specialty === specialty);
}

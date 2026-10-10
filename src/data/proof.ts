import type { Credential } from "@/types";

/** Organisations and platforms behind the team's training and work. */
export const ORGANISATIONS: readonly string[] = [
  "FAST NUCES",
  "LANGCHAIN ACADEMY",
  "EXFILTRA",
  "FAST CYBER SECURITY SOCIETY",
  "HACK THE BOX",
  "SOLANA",
];

/** Verifiable certifications, roles and leadership from the team's resumes. */
export const CREDENTIALS: readonly Credential[] = [
  {
    id: "exfiltra",
    kind: "Role",
    title: "Junior Security Engineer",
    org: "Exfiltra",
    period: "2026 to present",
    memberId: "zeeshan",
    accent: "pink",
    detail: "Web app penetration tests, AI/LLM security assessments and adversarial prompt injection testing across autonomous agent workflows.",
  },
  {
    id: "freelance",
    kind: "Role",
    title: "Freelance AI/ML Developer",
    org: "Self-employed",
    period: "2025 to present",
    memberId: "zahid",
    accent: "cyan",
    detail: "Applied machine learning, deep learning and generative AI to solve business problems for clients.",
  },
  {
    id: "langgraph-cert",
    kind: "Certification",
    title: "LangGraph Advanced AI Agents",
    org: "LangChain Academy",
    period: "2026",
    memberId: "zahid",
    accent: "lime",
    detail: "State management, human-in-the-loop workflows and long-term memory for AI agents.",
  },
  {
    id: "langchain-cert",
    kind: "Certification",
    title: "LangChain AI Agent Development",
    org: "Professional course",
    period: "2026",
    memberId: "zahid",
    accent: "cyan",
    detail: "AI agent development from basics to production-ready deployment.",
  },
  {
    id: "cyber-society",
    kind: "Leadership",
    title: "President, FAST Society of Cyber Security",
    org: "FAST NUCES",
    period: "Student society",
    memberId: "zeeshan",
    accent: "pink",
    detail: "Led workshops on offensive web exploitation, API security and emerging AI/LLM attack vectors.",
  },
  {
    id: "ctf",
    kind: "Leadership",
    title: "CTF Lead Organizer",
    org: "FAST NUCES",
    period: "April 2025",
    memberId: "zeeshan",
    accent: "lime",
    detail: "Built Web, Reverse Engineering and Pwn challenges and the containerised competition infrastructure.",
  },
];

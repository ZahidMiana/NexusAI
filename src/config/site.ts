export const siteConfig = {
  name: "NexusAI",
  brandMark: "NEXUS_AI //",
  tagline: "We Architect Intelligent Ecosystems.",
  description:
    "NexusAI is a team of AI engineers and security specialists building production LLM apps, RAG pipelines and AI agents, and keeping them secure.",
  url: "https://nexus-ai.dev",
  foundedAt: "2025-01-01T00:00:00Z",
  contact: {
    email: "uplink@nexus-ai.dev",
    secureEmail: "secure@nexus-ai.dev",
    pgpFingerprint: "9F2C 7A1E 44B0 D3C8 1E6F  A07B 5C2D 88E1 3B9A 6F04",
  },
  navTelemetry: [
    { label: "SYSTEM", value: "ACTIVE", accent: "lime" },
    { label: "CORE_TEMP", value: "NOMINAL", accent: "cyan" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

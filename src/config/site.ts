export const siteConfig = {
  name: "NexusAI",
  brandMark: "NEXUS_AI //",
  tagline: "We Architect Intelligent Ecosystems.",
  description:
    "NexusAI is a team of AI engineers and security specialists building production LLM apps, RAG pipelines and AI agents, and keeping them secure.",
  url: "https://nexus-ai.dev",
  location: { city: "Lahore, Pakistan", timeZone: "Asia/Karachi", utcOffset: "UTC+5" },
  /** Shown in the navbar badge and the hero. */
  availability: "Available for new projects",
  responseTime: "Replies within one business day",
  contact: {
    // TODO: replace with the real inbox before launch. Also set CONTACT_TO_EMAIL for the form.
    email: "uplink@nexus-ai.dev",
    /** Optional Calendly (or similar) link. When set, "Book a call" buttons open it. */
    bookingUrl: undefined as string | undefined,
  },
} as const;

export type SiteConfig = typeof siteConfig;

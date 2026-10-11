function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "NexusAI",
  brandMark: "NEXUS_AI //",
  tagline: "We Architect Intelligent Ecosystems.",
  description:
    "NexusAI is a team of AI engineers and security specialists building production LLM apps, RAG pipelines and AI agents, and keeping them secure.",
  /**
   * Public site URL. NEXT_PUBLIC_SITE_URL wins (e.g. a custom domain); on Vercel
   * it falls back to the project's production domain, locally to localhost.
   */
  url: siteUrl(),
  location: { city: "Lahore, Pakistan", timeZone: "Asia/Karachi", utcOffset: "UTC+5" },
  /** Shown in the navbar badge and the hero. */
  availability: "Available for new projects",
  responseTime: "Replies within one business day",
  contact: {
    // Public inbox. The contact form sends to CONTACT_TO_EMAIL (see .env.example).
    email: "uplinknexussai@gmail.com",
    /** Optional Calendly (or similar) link. When set, "Book a call" buttons open it. */
    bookingUrl: undefined as string | undefined,
  },
} as const;

export type SiteConfig = typeof siteConfig;

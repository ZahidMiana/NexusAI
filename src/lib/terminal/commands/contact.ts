import { siteConfig } from "@/config/site";
import type { TerminalCommand } from "@/types";

export const contactCommand: TerminalCommand = {
  name: "/contact",
  aliases: ["/initiate"],
  description: "Show how to reach the team",
  execute: () => ({
    lines: [
      { text: "> NexusAI contact", tone: "pink" },
      { text: `  EMAIL     :: ${siteConfig.contact.email}`, tone: "cyan" },
      ...(siteConfig.contact.bookingUrl ? [{ text: `  BOOK CALL :: ${siteConfig.contact.bookingUrl}`, tone: "cyan" as const }] : []),
      { text: `  LOCATION  :: ${siteConfig.location.city} (${siteConfig.location.utcOffset})`, tone: "muted" },
      { text: `${siteConfig.responseTime}.`, tone: "lime" },
      { text: "Run /book to open the project form.", tone: "pink" },
    ],
  }),
};

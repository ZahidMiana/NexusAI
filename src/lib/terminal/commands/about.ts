import { siteConfig } from "@/config/site";
import type { TerminalCommand } from "@/types";

export const aboutCommand: TerminalCommand = {
  name: "/about",
  description: "Read the agency mission brief",
  execute: () => ({
    lines: [
      { text: `${siteConfig.brandMark} MISSION BRIEF`, tone: "pink" },
      { text: siteConfig.description },
      { text: "We ship: LLM platforms · agentic products · on-device AI · evaluation infra.", tone: "cyan" },
      { text: "Engagement models: embedded squad · fixed-scope sprint · architecture audit.", tone: "muted" },
    ],
  }),
};

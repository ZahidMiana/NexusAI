import { siteConfig } from "@/config/site";
import type { TerminalCommand } from "@/types";

export const aboutCommand: TerminalCommand = {
  name: "/about",
  description: "Read the agency mission brief",
  execute: () => ({
    lines: [
      { text: `${siteConfig.brandMark} MISSION BRIEF`, tone: "pink" },
      { text: siteConfig.description },
      { text: "We ship: LLM apps · RAG pipelines · AI agents · AI security audits.", tone: "cyan" },
      { text: "Engagement models: embedded squad · fixed-scope sprint · architecture audit.", tone: "muted" },
    ],
  }),
};

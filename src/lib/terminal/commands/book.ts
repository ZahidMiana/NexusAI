import { PROJECT_TYPES } from "@/data/contact";
import type { ProjectTypeId, TerminalCommand } from "@/types";

const isProjectType = (value: string): value is ProjectTypeId => PROJECT_TYPES.some((option) => option.value === value);

export const bookCommand: TerminalCommand = {
  name: "/book",
  aliases: ["/hire", "/call"],
  description: "Open the project intake form",
  execute: ({ args }) => {
    const requested = args[0]?.toLowerCase() ?? "";
    const projectType = isProjectType(requested) ? requested : undefined;
    return {
      lines: [
        { text: "> Routing to secure intake form ...", tone: "pink" },
        { text: projectType ? `  project_type preset → ${projectType}` : "  Tip: /book on-device presets the project type.", tone: "muted" },
        { text: "Form ready. Average reply time: under 24h.", tone: "lime" },
      ],
      effect: { type: "open-contact", prefill: projectType ? { projectType } : {} },
    };
  },
};

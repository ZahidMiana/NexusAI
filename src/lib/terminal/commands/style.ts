import { DESIGN_STYLES, DESIGN_STYLE_IDS, isDesignStyleId } from "@/lib/preferences/styles";
import type { TerminalCommand } from "@/types";

export const styleCommand: TerminalCommand = {
  name: "/style",
  aliases: ["/skin"],
  description: "Switch design style (cyber, clay, brutal)",
  execute: ({ args }) => {
    const requested = args[0]?.toLowerCase();
    if (!requested || !isDesignStyleId(requested)) {
      return {
        lines: [
          { text: requested ? `ERR::UNKNOWN_STYLE → "${requested}"` : "Design styles:", tone: requested ? "error" : "cyan" },
          ...DESIGN_STYLE_IDS.map((id) => ({ text: `  ${id.padEnd(9, ".")} ${DESIGN_STYLES[id].description}` })),
          { text: "Usage: /style clay", tone: "muted" },
        ],
      };
    }
    return {
      lines: [
        { text: `> Re-skinning interface → ${DESIGN_STYLES[requested].label.toUpperCase()}`, tone: "pink" },
        { text: `[ OK ] Style set to ${requested}. Saved for your next visit.`, tone: "lime" },
      ],
      effect: { type: "set-style", style: requested },
    };
  },
};

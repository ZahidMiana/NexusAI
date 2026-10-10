import { isEffectsMode } from "@/lib/preferences/effects";
import type { TerminalCommand } from "@/types";

export const fxCommand: TerminalCommand = {
  name: "/fx",
  aliases: ["/effects"],
  description: "Set visual effects: full or calm",
  execute: ({ args }) => {
    const requested = args[0]?.toLowerCase();
    if (!isEffectsMode(requested)) {
      return {
        lines: [
          { text: "Effects modes:", tone: "cyan" },
          { text: "  full ...... every animation and live widget" },
          { text: "  calm ...... no ambient motion or live counters" },
          { text: "Usage: /fx calm", tone: "muted" },
        ],
      };
    }
    return {
      lines: [{ text: `[ OK ] Effects set to ${requested.toUpperCase()}.`, tone: "lime" }],
      effect: { type: "set-effects", effects: requested },
    };
  },
};

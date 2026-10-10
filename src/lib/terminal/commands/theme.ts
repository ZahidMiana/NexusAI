import { THEMES, THEME_IDS, isThemeId } from "@/lib/preferences/themes";
import type { TerminalCommand } from "@/types";

export const themeCommand: TerminalCommand = {
  name: "/theme",
  description: "Switch colour theme (cyber, synthwave, matrix)",
  execute: ({ args }) => {
    const requested = args[0]?.toLowerCase();
    if (!requested || !isThemeId(requested)) {
      return {
        lines: [
          { text: requested ? `ERR::UNKNOWN_THEME → "${requested}"` : "Available themes:", tone: requested ? "error" : "cyan" },
          ...THEME_IDS.map((id) => ({ text: `  ${id.padEnd(11, ".")} ${THEMES[id].description}` })),
          { text: "Usage: /theme synthwave", tone: "muted" },
        ],
      };
    }
    return {
      lines: [
        { text: `> Recompiling shaders for ${THEMES[requested].label.toUpperCase()} ...`, tone: "pink" },
        { text: `[ OK ] Theme set to ${requested}. Saved for your next visit.`, tone: "lime" },
      ],
      effect: { type: "set-theme", theme: requested },
    };
  },
};

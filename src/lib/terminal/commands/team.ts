import { TEAM } from "@/data/team";
import type { TerminalCommand, TerminalLineDraft } from "@/types";

export const teamCommand: TerminalCommand = {
  name: "/team",
  aliases: ["/crew"],
  description: "Decrypt operator dossiers",
  execute: () => {
    const dossiers: TerminalLineDraft[] = TEAM.flatMap((member, index) => [
      { text: `[OPERATOR_0${index + 1}] ${member.name.toUpperCase()} ${member.handle}`, tone: member.accent },
      { text: `  ROLE    :: ${member.role}` },
      { text: `  STATUS  :: ${member.status}`, tone: "lime" },
      { text: `  VECTORS :: ${member.focus.join(" · ")}`, tone: "muted" },
    ]);

    return {
      lines: [
        { text: "> Decrypting personnel manifest... [OK]", tone: "muted" },
        ...dossiers,
        { text: `${TEAM.length} operators online. Combined latency to ship: minimal.`, tone: "pink" },
      ],
    };
  },
};

import { siteConfig } from "@/config/site";
import type { TerminalCommand } from "@/types";

export const contactCommand: TerminalCommand = {
  name: "/contact",
  aliases: ["/initiate"],
  description: "Open a secure uplink to the team",
  execute: () => ({
    lines: [
      { text: "> INITIATING PROTOCOL :: SECURE_HANDSHAKE", tone: "pink" },
      { text: "  ▸ Negotiating TLS 1.3 ........... OK", tone: "muted" },
      { text: "  ▸ Exchanging PGP keys ........... OK", tone: "muted" },
      { text: `  UPLINK  :: ${siteConfig.contact.email}`, tone: "cyan" },
      { text: `  SECURE  :: ${siteConfig.contact.secureEmail}`, tone: "cyan" },
      { text: `  PGP     :: ${siteConfig.contact.pgpFingerprint}`, tone: "muted" },
      { text: "Channel open. Average response window: < 24h.", tone: "lime" },
      { text: "Run /book to open the project intake form.", tone: "pink" },
    ],
  }),
};

import { BUDGET_RANGES, ENGAGEMENTS, PROJECT_TYPES, labelFor } from "@/data/contact";
import type { ContactSubmission } from "./validation";

export interface ContactLead extends ContactSubmission {
  ticket: string;
  receivedAt: Date;
}

/** Delivery channel for new leads. Add Slack, CRM, etc. by implementing this. */
export interface ContactNotifier {
  readonly channel: string;
  deliver(lead: ContactLead): Promise<void>;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}

function leadRows(lead: ContactLead): [string, string][] {
  return [
    ["Ticket", lead.ticket],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company || "Not specified"],
    ["Project type", labelFor(PROJECT_TYPES, lead.projectType)],
    ["Engagement", labelFor(ENGAGEMENTS, lead.engagement)],
    ["Budget", labelFor(BUDGET_RANGES, lead.budget)],
    ["Received", lead.receivedAt.toISOString()],
  ];
}

export function formatLeadText(lead: ContactLead): string {
  const rows = leadRows(lead).map(([label, value]) => `${label}: ${value}`);
  return `${rows.join("\n")}\n\nMessage:\n${lead.message}`;
}

export function formatLeadHtml(lead: ContactLead): string {
  const rows = leadRows(lead)
    .map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`)
    .join("");
  return `<div style="font-family:system-ui,sans-serif;font-size:14px"><h2 style="margin:0 0 12px">New project inquiry</h2><table>${rows}</table><h3 style="margin:16px 0 6px">Message</h3><p style="white-space:pre-wrap;margin:0">${escapeHtml(lead.message)}</p></div>`;
}

export class ResendNotifier implements ContactNotifier {
  readonly channel = "resend";

  constructor(
    private readonly apiKey: string,
    private readonly from: string,
    private readonly to: string,
  ) {}

  async deliver(lead: ContactLead): Promise<void> {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: this.from,
        to: [this.to],
        reply_to: lead.email,
        subject: `[${lead.ticket}] New inquiry from ${lead.name}`,
        text: formatLeadText(lead),
        html: formatLeadHtml(lead),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 200)}`);
    }
  }
}

/** Development fallback: prints the lead to the server console. */
export class ConsoleNotifier implements ContactNotifier {
  readonly channel = "console";

  async deliver(lead: ContactLead): Promise<void> {
    console.info(`\n[contact] New lead (dev mode, no email sent)\n${formatLeadText(lead)}\n`);
  }
}

/**
 * Chooses a notifier from the environment. Returns `null` in production when
 * email is not configured, so the UI can show a clear fallback instead of
 * silently dropping leads.
 */
export function createContactNotifier(env: NodeJS.ProcessEnv = process.env): ContactNotifier | null {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
  if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
    return new ResendNotifier(RESEND_API_KEY, CONTACT_FROM_EMAIL || "NexusAI <onboarding@resend.dev>", CONTACT_TO_EMAIL);
  }
  return env.NODE_ENV === "production" ? null : new ConsoleNotifier();
}

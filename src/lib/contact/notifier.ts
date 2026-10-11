import { siteConfig } from "@/config/site";
import { PROJECT_TYPES, labelFor } from "@/data/contact";
import { formatBytes, type LeadAttachment } from "./attachment";
import type { ContactSubmission } from "./validation";

export interface ContactLead extends ContactSubmission {
  ticket: string;
  receivedAt: Date;
  attachment?: LeadAttachment;
}

/** Delivery channel for new leads. Add Slack, CRM, etc. by implementing this. */
export interface ContactNotifier {
  readonly channel: string;
  deliver(lead: ContactLead): Promise<void>;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}

/** "11 Oct 2026, 1:42 PM PKT" in the team's own time zone. */
function formatReceived(date: Date): string {
  const local = new Intl.DateTimeFormat("en-GB", {
    timeZone: siteConfig.location.timeZone,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return `${local} (${siteConfig.location.utcOffset})`;
}

function leadRows(lead: ContactLead): [string, string][] {
  return [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company || "Not specified"],
    ["Project type", labelFor(PROJECT_TYPES, lead.projectType)],
    ["Budget range", lead.budget],
    ["Attachment", lead.attachment ? `${lead.attachment.filename} (${formatBytes(lead.attachment.size)})` : "None"],
    ["Received", formatReceived(lead.receivedAt)],
  ];
}

function briefText(lead: ContactLead): string {
  return lead.message || "No written brief. See the attached file.";
}

export function formatLeadText(lead: ContactLead): string {
  const rows = leadRows(lead).map(([label, value]) => `${label}: ${value}`);
  return `New project inquiry (${lead.ticket})\n\n${rows.join("\n")}\n\nProject brief:\n${briefText(lead)}\n\nReply to this email to answer ${lead.name} directly.`;
}

/* Email-safe version of the site's neo-brutalist look: tables, inline styles, web-safe fonts. */
const INK = "#111111";
const CREAM = "#fff4d6";
const PAPER = "#fffaea";
const YELLOW = "#ffe066";
const PINK = "#be123c";
const MONO = "'Courier New',Courier,monospace";
const SANS = "Arial,Helvetica,sans-serif";

export function formatLeadHtml(lead: ContactLead): string {
  const rows = leadRows(lead)
    .map(([label, value], index) => {
      const shown = label === "Email" ? `<a href="mailto:${escapeHtml(value)}" style="color:${INK};text-decoration:underline">${escapeHtml(value)}</a>` : escapeHtml(value);
      const border = index === 0 ? "" : `border-top:2px solid ${INK};`;
      return `<tr><td style="${border}padding:10px 12px;width:34%;font-family:${MONO};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#474747;vertical-align:top">${label}</td><td style="${border}padding:10px 12px;font-family:${SANS};font-size:15px;font-weight:bold;color:${INK}">${shown}</td></tr>`;
    })
    .join("");

  const subject = encodeURIComponent(`Re: your ${siteConfig.name} inquiry (${lead.ticket})`);

  return `<!doctype html><html><body style="margin:0;padding:0;background:${CREAM}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
  <tr><td style="padding:0 0 14px;font-family:${SANS};font-size:18px;font-weight:900;letter-spacing:3px;color:${INK}">${escapeHtml(siteConfig.brandMark)}</td></tr>
  <tr><td style="background:#ffffff;border:3px solid ${INK}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="background:${YELLOW};border-bottom:3px solid ${INK};padding:18px 20px">
        <div style="font-family:${MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${PINK}">Ticket ${escapeHtml(lead.ticket)}</div>
        <div style="margin-top:6px;font-family:${SANS};font-size:24px;font-weight:900;text-transform:uppercase;color:${INK}">New project inquiry</div>
      </td></tr>
      <tr><td style="padding:20px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:2px solid ${INK};background:${PAPER}">${rows}</table>
        <div style="margin:22px 0 8px;font-family:${MONO};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${PINK}">Project brief</div>
        <div style="border:2px solid ${INK};background:${PAPER};padding:14px;font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};white-space:pre-wrap">${escapeHtml(briefText(lead))}</div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px"><tr><td style="background:${PINK};border:2px solid ${INK}">
          <a href="mailto:${escapeHtml(lead.email)}?subject=${subject}" style="display:inline-block;padding:12px 22px;font-family:${SANS};font-size:13px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#ffffff;text-decoration:none">Reply to ${escapeHtml(lead.name.split(" ")[0])}</a>
        </td></tr></table>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:14px 2px 0;font-family:${MONO};font-size:11px;color:#474747">Sent by the contact form on ${escapeHtml(siteConfig.name)}. Replying to this email goes straight to the sender.</td></tr>
</table>
</td></tr></table>
</body></html>`;
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
        ...(lead.attachment ? { attachments: [{ filename: lead.attachment.filename, content: lead.attachment.content }] } : {}),
      }),
      signal: AbortSignal.timeout(20_000),
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

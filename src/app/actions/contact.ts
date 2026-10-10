"use server";

import { headers } from "next/headers";
import { siteConfig } from "@/config/site";
import { HONEYPOT_FIELD, type ContactFormState } from "@/lib/contact/formState";
import { createContactNotifier } from "@/lib/contact/notifier";
import { SlidingWindowRateLimiter } from "@/lib/contact/rateLimit";
import { validateContact, valuesFromFormData } from "@/lib/contact/validation";

const limiter = new SlidingWindowRateLimiter(5, 10 * 60 * 1000);

function createTicket(): string {
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NX-${Date.now().toString(36).toUpperCase()}-${random}`;
}

async function clientKey(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headerList.get("x-real-ip") || "anonymous";
}

/** Server Action behind the contact form. */
export async function submitContact(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Bots fill every field, people never see this one. Pretend success so bots learn nothing.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success", ticket: createTicket() };
  }

  if (!limiter.consume(await clientKey())) {
    return { status: "error", message: "Too many messages from this connection. Please try again in a few minutes." };
  }

  const result = validateContact(valuesFromFormData(formData));
  if (!result.success) {
    return { status: "error", message: "Please fix the highlighted fields.", errors: result.errors };
  }

  const notifier = createContactNotifier();
  if (!notifier) {
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL are not configured.");
    return { status: "error", message: `Our form is offline right now. Please email us at ${siteConfig.contact.email}.` };
  }

  const ticket = createTicket();
  try {
    await notifier.deliver({ ...result.data, ticket, receivedAt: new Date() });
  } catch (error) {
    console.error(`[contact] Delivery via ${notifier.channel} failed`, error);
    return { status: "error", message: `We could not send your message. Please email us at ${siteConfig.contact.email}.` };
  }

  return { status: "success", ticket };
}

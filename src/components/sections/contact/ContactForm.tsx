"use client";

import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useActionState, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { submitContact } from "@/app/actions/contact";
import { NeonButton } from "@/components/ui/NeonButton";
import { FileField, SelectField, TextAreaField, TextField } from "@/components/ui/FormField";
import { siteConfig } from "@/config/site";
import { useContactRequest } from "@/context/ContactContext";
import { PROJECT_TYPES } from "@/data/contact";
import { ATTACHMENT_ACCEPT, ATTACHMENT_FIELD, ATTACHMENT_MAX_BYTES, formatBytes, validateAttachment, type AttachmentInfo } from "@/lib/contact/attachment";
import { HONEYPOT_FIELD, INITIAL_CONTACT_STATE, type ContactFormState } from "@/lib/contact/formState";
import {
  CONTACT_FIELDS,
  EMPTY_CONTACT_VALUES,
  LIMITS,
  validateContact,
  type ContactField,
  type ContactValues,
  type FieldErrors,
} from "@/lib/contact/validation";

/**
 * Project intake form. Validates in the browser with the same rules the
 * Server Action enforces, keeps input on errors, and applies prefill
 * requests coming from CTAs, service cards or the terminal.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL_CONTACT_STATE);
  const [values, setValues] = useState<ContactValues>(EMPTY_CONTACT_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [seenState, setSeenState] = useState<ContactFormState>(state);
  const [dismissedTicket, setDismissedTicket] = useState<string | null>(null);
  const request = useContactRequest();
  const [appliedRequestId, setAppliedRequestId] = useState(0);
  const [attachment, setAttachment] = useState<AttachmentInfo | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Sync server results into local state (derived-state pattern, no effect needed).
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "error") {
      setErrors(state.errors ?? {});
      // React resets the native file input after every submit, so mirror that here.
      setAttachment(null);
    }
    if (state.status === "success") {
      setValues(EMPTY_CONTACT_VALUES);
      setErrors({});
      setAttempted(false);
      setAttachment(null);
    }
  }

  // Apply prefill from the latest "open contact" request.
  if (request && request.id !== appliedRequestId) {
    setAppliedRequestId(request.id);
    setValues((current) => ({
      ...current,
      projectType: request.prefill.projectType ?? current.projectType,
    }));
    if (state.status === "success") setDismissedTicket(state.ticket);
  }

  const requestId = request?.id ?? 0;
  useEffect(() => {
    if (requestId === 0) return;
    const timer = window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
    return () => window.clearTimeout(timer);
  }, [requestId]);

  const update = (field: ContactField) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (attempted) {
      const result = validateContact(next, { hasAttachment: Boolean(attachment) });
      setErrors((current) => ({ ...(result.success ? {} : result.errors), ...(current.attachment ? { attachment: current.attachment } : {}) }));
    } else if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const changeAttachment = (file: File | null) => {
    const problem = file ? validateAttachment(file) : undefined;
    // Invalid or removed files are cleared from the input so they are never submitted.
    if (!file || problem) {
      if (fileRef.current) fileRef.current.value = "";
      setAttachment(null);
    } else {
      setAttachment({ name: file.name, size: file.size });
    }
    setErrors((current) => {
      const next = { ...current };
      if (problem) next.attachment = problem;
      else delete next.attachment;
      // A valid file makes the written brief optional.
      if (file && !problem && next.message && values.message.trim().length <= LIMITS.messageMax) delete next.message;
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const result = validateContact(values, { hasAttachment: Boolean(attachment) });
    if (result.success) return;
    event.preventDefault();
    setAttempted(true);
    setErrors(result.errors);
    const firstInvalid = CONTACT_FIELDS.find((field) => result.errors[field]);
    if (firstInvalid) formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
  };

  if (state.status === "success" && state.ticket !== dismissedTicket) {
    return <SuccessPanel ticket={state.ticket} onReset={() => setDismissedTicket(state.ticket)} />;
  }

  const hasFieldErrors = Object.keys(errors).length > 0;
  const serverMessage = state.status === "error" && (!state.errors || hasFieldErrors) ? state.message : null;

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="space-y-5" aria-describedby={serverMessage ? "contact-form-status" : undefined}>
      {serverMessage && (
        <p id="contact-form-status" role="alert" className="flex items-start gap-2 rounded-lg border border-danger/50 bg-danger/10 px-4 py-3 font-mono text-sm text-danger">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {serverMessage}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField ref={nameRef} id="contact-name" name="name" label="Name" autoComplete="name" placeholder="Ada Lovelace" value={values.name} onChange={update("name")} error={errors.name} maxLength={LIMITS.nameMax} />
        <TextField id="contact-email" name="email" type="email" label="Work email" autoComplete="email" placeholder="ada@company.com" value={values.email} onChange={update("email")} error={errors.email} maxLength={LIMITS.emailMax} />
      </div>

      <TextField id="contact-company" name="company" label="Company" optional autoComplete="organization" placeholder="Company name" value={values.company} onChange={update("company")} error={errors.company} maxLength={LIMITS.companyMax} />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField id="contact-project" name="projectType" label="Project type" placeholder="Select…" options={PROJECT_TYPES} value={values.projectType} onChange={update("projectType")} error={errors.projectType} />
        <TextField id="contact-budget" name="budget" label="Budget range" placeholder="e.g. $5k to $10k" value={values.budget} onChange={update("budget")} error={errors.budget} maxLength={LIMITS.budgetMax} />
      </div>

      <TextAreaField
        id="contact-message"
        name="message"
        label="Project brief"
        hint={`${values.message.trim().length}/${LIMITS.messageMax}`}
        placeholder="What are you building, what is blocking you, and when do you need it live? You can also attach a brief below."
        rows={5}
        value={values.message}
        onChange={update("message")}
        error={errors.message}
        maxLength={LIMITS.messageMax}
      />

      <FileField
        ref={fileRef}
        id="contact-attachment"
        name={ATTACHMENT_FIELD}
        label="Attach a brief"
        optional
        accept={ATTACHMENT_ACCEPT}
        help={`PDF, Word, PowerPoint, Excel, text or image. Max ${formatBytes(ATTACHMENT_MAX_BYTES)}.`}
        file={attachment ? { name: attachment.name, size: formatBytes(attachment.size) } : null}
        error={errors.attachment}
        onChange={changeAttachment}
      />

      {/* Honeypot: hidden from people and assistive tech, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-w-0 font-mono text-xs leading-relaxed text-fg-muted">
          Protected by NDA on request. Prefer email? <a href={`mailto:${siteConfig.contact.email}`} className="text-cyber-cyan underline-offset-4 hover:underline">{siteConfig.contact.email}</a>
        </p>
        <NeonButton
          type="submit"
          accent="pink"
          variant="solid"
          size="lg"
          disabled={pending}
          aria-busy={pending}
          className="shrink-0 whitespace-nowrap"
          icon={pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        >
          {pending ? "Sending…" : "Send message"}
        </NeonButton>
      </div>
    </form>
  );
}

function SuccessPanel({ ticket, onReset }: { ticket: string; onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center gap-5 rounded-xl border border-cyber-lime/40 bg-inset p-6 font-mono sm:p-8">
      <CheckCircle2 className="h-10 w-10 text-cyber-lime" />
      <h3 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-black tracking-wide text-fg uppercase outline-none">
        Message sent
      </h3>
      <div className="space-y-1.5 text-sm text-fg-soft">
        <p>Thanks! Your project brief is with the team.</p>
        <p>
          Your reference: <span className="text-cyber-cyan">{ticket}</span>
        </p>
        <p>{siteConfig.responseTime}.</p>
      </div>
      <NeonButton accent="cyan" onClick={onReset}>
        Send another message
      </NeonButton>
    </div>
  );
}

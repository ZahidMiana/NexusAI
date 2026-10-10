"use client";

import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useActionState, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { submitContact } from "@/app/actions/contact";
import { NeonButton } from "@/components/ui/NeonButton";
import { SelectField, TextAreaField, TextField } from "@/components/ui/FormField";
import { siteConfig } from "@/config/site";
import { useContactRequest } from "@/context/ContactContext";
import { BUDGET_RANGES, ENGAGEMENTS, PROJECT_TYPES } from "@/data/contact";
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
  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Sync server results into local state (derived-state pattern, no effect needed).
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "error") setErrors(state.errors ?? {});
    if (state.status === "success") {
      setValues(EMPTY_CONTACT_VALUES);
      setErrors({});
      setAttempted(false);
    }
  }

  // Apply prefill from the latest "open contact" request.
  if (request && request.id !== appliedRequestId) {
    setAppliedRequestId(request.id);
    setValues((current) => ({
      ...current,
      projectType: request.prefill.projectType ?? current.projectType,
      engagement: request.prefill.engagement ?? current.engagement,
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
      const result = validateContact(next);
      setErrors(result.success ? {} : result.errors);
    } else if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const result = validateContact(values);
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
        <p id="contact-form-status" role="alert" className="flex items-start gap-2 rounded-lg border border-red-400/50 bg-red-400/10 px-4 py-3 font-mono text-sm text-red-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {serverMessage}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField ref={nameRef} id="contact-name" name="name" label="Name" autoComplete="name" placeholder="Ada Lovelace" value={values.name} onChange={update("name")} error={errors.name} maxLength={LIMITS.nameMax} />
        <TextField id="contact-email" name="email" type="email" label="Work email" autoComplete="email" placeholder="ada@company.com" value={values.email} onChange={update("email")} error={errors.email} maxLength={LIMITS.emailMax} />
      </div>

      <TextField id="contact-company" name="company" label="Company" optional autoComplete="organization" placeholder="Company name" value={values.company} onChange={update("company")} error={errors.company} maxLength={LIMITS.companyMax} />

      <div className="grid gap-5 sm:grid-cols-3">
        <SelectField id="contact-project" name="projectType" label="Project type" placeholder="Select…" options={PROJECT_TYPES} value={values.projectType} onChange={update("projectType")} error={errors.projectType} />
        <SelectField id="contact-engagement" name="engagement" label="Engagement" optional placeholder="Not sure" options={ENGAGEMENTS} value={values.engagement} onChange={update("engagement")} error={errors.engagement} />
        <SelectField id="contact-budget" name="budget" label="Budget" placeholder="Select…" options={BUDGET_RANGES} value={values.budget} onChange={update("budget")} error={errors.budget} />
      </div>

      <TextAreaField
        id="contact-message"
        name="message"
        label="Project brief"
        hint={`${values.message.trim().length}/${LIMITS.messageMax}`}
        placeholder="What are you building, what is blocking you, and when do you need it live?"
        rows={5}
        value={values.message}
        onChange={update("message")}
        error={errors.message}
        maxLength={LIMITS.messageMax}
      />

      {/* Honeypot: hidden from people and assistive tech, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-w-0 font-mono text-xs leading-relaxed text-zinc-400">
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
          {pending ? "Transmitting…" : "Send transmission"}
        </NeonButton>
      </div>
    </form>
  );
}

function SuccessPanel({ ticket, onReset }: { ticket: string; onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center gap-5 rounded-xl border border-cyber-lime/40 bg-black/50 p-6 font-mono sm:p-8">
      <CheckCircle2 className="h-10 w-10 text-cyber-lime drop-glow-lime" />
      <h3 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-black tracking-wide text-white uppercase outline-none">
        Transmission received
      </h3>
      <div className="space-y-1 text-sm text-zinc-300">
        <p>
          <span className="text-cyber-lime">[ OK ]</span> Brief encrypted and delivered to the squad.
        </p>
        <p>
          <span className="text-cyber-lime">[ OK ]</span> Ticket <span className="text-cyber-cyan">{ticket}</span> logged.
        </p>
        <p>
          <span className="text-cyber-pink">[ ETA ]</span> A real engineer will reply within one business day.
        </p>
      </div>
      <NeonButton accent="cyan" onClick={onReset}>
        Send another message
      </NeonButton>
    </div>
  );
}

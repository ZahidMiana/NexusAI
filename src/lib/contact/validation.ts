import { PROJECT_TYPES } from "@/data/contact";
import type { ProjectTypeId } from "@/types";

/**
 * Single source of truth for contact form rules. Runs in the browser for
 * instant feedback and again on the server, which never trusts the client.
 */

export const CONTACT_FIELDS = ["name", "email", "company", "projectType", "budget", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export type ContactValues = Record<ContactField, string>;

export type FieldErrors = Partial<Record<ContactField | "attachment", string>>;

export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  projectType: ProjectTypeId;
  /** Free text range typed by the visitor, e.g. "$5k to $10k". */
  budget: string;
  message: string;
}

export type ValidationResult = { success: true; data: ContactSubmission } | { success: false; errors: FieldErrors };

export const EMPTY_CONTACT_VALUES: ContactValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

export const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  companyMax: 120,
  budgetMin: 2,
  budgetMax: 60,
  messageMin: 20,
  messageMax: 3000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isOneOf = <T extends string>(options: readonly { value: T }[], value: string): value is T =>
  options.some((option) => option.value === value);

export interface ValidateOptions {
  /** A brief file is attached, so the written brief becomes optional. */
  hasAttachment?: boolean;
}

export function validateContact(values: ContactValues, { hasAttachment = false }: ValidateOptions = {}): ValidationResult {
  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();
  const company = values.company.trim();
  const budget = values.budget.trim();
  const message = values.message.trim();
  const errors: FieldErrors = {};

  if (name.length < LIMITS.nameMin) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.nameMax) errors.name = `Name must be under ${LIMITS.nameMax} characters.`;

  if (!email) errors.email = "Please enter your email.";
  else if (email.length > LIMITS.emailMax || !EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  if (company.length > LIMITS.companyMax) errors.company = `Company must be under ${LIMITS.companyMax} characters.`;

  if (!isOneOf(PROJECT_TYPES, values.projectType)) errors.projectType = "Please choose a project type.";

  if (budget.length < LIMITS.budgetMin) errors.budget = "Please enter your budget range.";
  else if (budget.length > LIMITS.budgetMax) errors.budget = `Budget must be under ${LIMITS.budgetMax} characters.`;

  if (message.length > LIMITS.messageMax) errors.message = `Message must be under ${LIMITS.messageMax} characters.`;
  else if (!hasAttachment && message.length < LIMITS.messageMin) {
    errors.message = `Write a short brief (at least ${LIMITS.messageMin} characters) or attach a file.`;
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      name,
      email,
      company,
      projectType: values.projectType as ProjectTypeId,
      budget,
      message,
    },
  };
}

/** Reads only the known fields from FormData, ignoring anything extra. */
export function valuesFromFormData(formData: FormData): ContactValues {
  return CONTACT_FIELDS.reduce<ContactValues>(
    (values, field) => {
      const raw = formData.get(field);
      values[field] = typeof raw === "string" ? raw : "";
      return values;
    },
    { ...EMPTY_CONTACT_VALUES },
  );
}

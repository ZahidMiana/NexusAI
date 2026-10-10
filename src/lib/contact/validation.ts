import { BUDGET_RANGES, ENGAGEMENTS, PROJECT_TYPES } from "@/data/contact";
import type { EngagementId, ProjectTypeId } from "@/types";

/**
 * Single source of truth for contact form rules. Runs in the browser for
 * instant feedback and again on the server, which never trusts the client.
 */

export const CONTACT_FIELDS = ["name", "email", "company", "projectType", "engagement", "budget", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export type ContactValues = Record<ContactField, string>;

export type FieldErrors = Partial<Record<ContactField, string>>;

export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  projectType: ProjectTypeId;
  engagement: EngagementId | "";
  budget: string;
  message: string;
}

export type ValidationResult = { success: true; data: ContactSubmission } | { success: false; errors: FieldErrors };

export const EMPTY_CONTACT_VALUES: ContactValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  engagement: "",
  budget: "",
  message: "",
};

export const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  companyMax: 120,
  messageMin: 20,
  messageMax: 3000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isOneOf = <T extends string>(options: readonly { value: T }[], value: string): value is T =>
  options.some((option) => option.value === value);

export function validateContact(values: ContactValues): ValidationResult {
  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();
  const company = values.company.trim();
  const message = values.message.trim();
  const errors: FieldErrors = {};

  if (name.length < LIMITS.nameMin) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.nameMax) errors.name = `Name must be under ${LIMITS.nameMax} characters.`;

  if (!email) errors.email = "Please enter your email.";
  else if (email.length > LIMITS.emailMax || !EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address.";

  if (company.length > LIMITS.companyMax) errors.company = `Company must be under ${LIMITS.companyMax} characters.`;

  if (!isOneOf(PROJECT_TYPES, values.projectType)) errors.projectType = "Please choose a project type.";

  if (values.engagement && !isOneOf(ENGAGEMENTS, values.engagement)) errors.engagement = "Please choose a valid engagement.";

  if (!isOneOf(BUDGET_RANGES, values.budget)) errors.budget = "Please choose a budget range.";

  if (message.length < LIMITS.messageMin) errors.message = `Tell us a little more (at least ${LIMITS.messageMin} characters).`;
  else if (message.length > LIMITS.messageMax) errors.message = `Message must be under ${LIMITS.messageMax} characters.`;

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    data: {
      name,
      email,
      company,
      projectType: values.projectType as ProjectTypeId,
      engagement: (values.engagement as EngagementId) || "",
      budget: values.budget,
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

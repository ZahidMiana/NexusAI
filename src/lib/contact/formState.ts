import type { FieldErrors } from "./validation";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; ticket: string }
  | { status: "error"; message: string; errors?: FieldErrors };

export const INITIAL_CONTACT_STATE: ContactFormState = { status: "idle" };

/** Name of the hidden anti-spam field. Real users never see or fill it. */
export const HONEYPOT_FIELD = "website";

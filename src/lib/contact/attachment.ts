/**
 * Rules for the optional brief attachment. Shared by the browser (instant
 * feedback) and the Server Action (which re-checks everything).
 */

export const ATTACHMENT_FIELD = "attachment";

/** 4 MB keeps the whole request under Vercel's 4.5 MB body limit. */
export const ATTACHMENT_MAX_BYTES = 4 * 1024 * 1024;

export const ATTACHMENT_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".csv", ".txt", ".md", ".rtf", ".png", ".jpg", ".jpeg", ".webp"] as const;

/** Value for the file input's `accept` attribute. */
export const ATTACHMENT_ACCEPT = ATTACHMENT_EXTENSIONS.join(",");

export interface AttachmentInfo {
  name: string;
  size: number;
}

export interface LeadAttachment {
  filename: string;
  size: number;
  /** Base64 encoded file content, as Resend expects. */
  content: string;
}

function extensionOf(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot).toLowerCase();
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Returns an error message, or undefined when the file is acceptable. */
export function validateAttachment(file: AttachmentInfo): string | undefined {
  if (!(ATTACHMENT_EXTENSIONS as readonly string[]).includes(extensionOf(file.name))) {
    return "Please attach a PDF, Word, PowerPoint, Excel, text or image file.";
  }
  if (file.size > ATTACHMENT_MAX_BYTES) return `File is too large. The limit is ${formatBytes(ATTACHMENT_MAX_BYTES)}.`;
  if (file.size === 0) return "This file is empty.";
  return undefined;
}

/** Keeps the original name readable but safe for email headers. */
export function safeFilename(name: string): string {
  const extension = extensionOf(name);
  const base = name
    .slice(0, name.length - extension.length)
    .replace(/[^\w.\- ]+/g, "_")
    .trim()
    .slice(0, 80);
  return `${base || "brief"}${extension}`;
}

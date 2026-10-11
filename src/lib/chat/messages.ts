export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export const CHAT_LIMITS = {
  /** Longest message a visitor can send. */
  userMax: 600,
  /** Assistant turns are trimmed to this when sent back as history. */
  assistantMax: 2000,
  /** Only the latest turns are sent to the model. */
  historyMax: 10,
} as const;

/**
 * Validates the history posted by the browser. Only user/assistant roles are
 * accepted (never "system"), content is trimmed and capped, and the list must
 * end with a non-empty user message.
 */
export function parseChatMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;

  const messages: ChatMessage[] = [];
  for (const entry of (body as { messages: unknown[] }).messages.slice(-CHAT_LIMITS.historyMax)) {
    if (!entry || typeof entry !== "object") return null;
    const { role, content } = entry as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const max = role === "user" ? CHAT_LIMITS.userMax : CHAT_LIMITS.assistantMax;
    const trimmed = content.trim().slice(0, max);
    if (trimmed) messages.push({ role, content: trimmed });
  }

  const last = messages.at(-1);
  return last?.role === "user" ? messages : null;
}

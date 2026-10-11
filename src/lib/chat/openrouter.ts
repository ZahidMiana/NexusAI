import { siteConfig } from "@/config/site";
import type { ChatMessage } from "./messages";

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

/** Free NVIDIA models: the first is preferred, the rest are fallbacks when it is busy. */
const DEFAULT_MODELS = ["nvidia/nemotron-3-super-120b-a12b:free", "nvidia/nemotron-3.5-lightning:free"] as const;

export class ChatProviderError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

interface StreamOptions {
  apiKey: string;
  systemPrompt: string;
  messages: readonly ChatMessage[];
  signal?: AbortSignal;
  /** Comma separated model ids, e.g. from OPENROUTER_MODEL. */
  models?: string;
}

/**
 * Calls OpenRouter with streaming on and returns a stream of plain text
 * deltas. Throws ChatProviderError when the request is rejected up front
 * (rate limit, bad key, provider down) so the caller can answer gracefully.
 */
export async function streamChatCompletion({ apiKey, systemPrompt, messages, signal, models }: StreamOptions): Promise<ReadableStream<Uint8Array>> {
  const modelList = models
    ? models
        .split(",")
        .map((model) => model.trim())
        .filter(Boolean)
    : [...DEFAULT_MODELS];

  const response = await fetch(ENDPOINT, {
    method: "POST",
    signal,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteConfig.url,
      "X-Title": siteConfig.name,
    },
    body: JSON.stringify({
      models: modelList,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
      max_tokens: 700,
      temperature: 0.4,
      // Short visitor questions do not need long hidden reasoning; keep replies fast.
      reasoning: { effort: "low", exclude: true },
    }),
  });

  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => "");
    throw new ChatProviderError(`OpenRouter responded ${response.status}: ${detail.slice(0, 300)}`, response.status);
  }

  return response.body.pipeThrough(new TextDecoderStream()).pipeThrough(sseToText()).pipeThrough(new TextEncoderStream());
}

/** Turns OpenRouter's server-sent events into the assistant's text deltas. */
function sseToText(): TransformStream<string, string> {
  let buffer = "";

  const handleLine = (line: string, controller: TransformStreamDefaultController<string>) => {
    // Lines starting with ":" are keep-alive comments.
    if (!line.startsWith("data:")) return;
    const data = line.slice(5).trim();
    if (!data || data === "[DONE]") return;
    try {
      const event = JSON.parse(data) as { choices?: { delta?: { content?: string } }[]; error?: { message?: string } };
      if (event.error) throw new ChatProviderError(event.error.message ?? "Provider error", 502);
      const text = event.choices?.[0]?.delta?.content;
      if (text) controller.enqueue(text);
    } catch (error) {
      if (error instanceof ChatProviderError) controller.error(error);
      // Ignore partial or malformed events.
    }
  };

  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk;
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) handleLine(line.trim(), controller);
    },
    flush(controller) {
      if (buffer) handleLine(buffer.trim(), controller);
    },
  });
}

import type { NextRequest } from "next/server";
import { getSystemPrompt } from "@/lib/chat/knowledge";
import { parseChatMessages } from "@/lib/chat/messages";
import { ChatProviderError, streamChatCompletion } from "@/lib/chat/openrouter";
import { SlidingWindowRateLimiter } from "@/lib/rateLimit";

// Streaming replies from free models can take a while to finish.
export const maxDuration = 60;

const limiter = new SlidingWindowRateLimiter(12, 10 * 60 * 1000);

function clientKey(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous";
}

function errorResponse(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

/** Streams the assistant's reply as plain text. Errors come back as JSON `{ error }`. */
export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return errorResponse("The assistant is offline right now. Please use WhatsApp or the contact form.", 503);

  if (!limiter.consume(clientKey(request))) {
    return errorResponse("You are sending messages too quickly. Please wait a few minutes, or reach us on WhatsApp.", 429);
  }

  const messages = parseChatMessages(await request.json().catch(() => null));
  if (!messages) return errorResponse("Please type a message.", 400);

  try {
    const stream = await streamChatCompletion({
      apiKey,
      systemPrompt: getSystemPrompt(),
      messages,
      signal: request.signal,
      models: process.env.OPENROUTER_MODEL,
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
    });
  } catch (error) {
    console.error("[chat] Provider request failed", error);
    const busy = error instanceof ChatProviderError && error.status === 429;
    return errorResponse(
      busy
        ? "The assistant has reached its limit for now. Please message us on WhatsApp or send a project brief."
        : "The assistant could not answer right now. Please try again, or message us on WhatsApp.",
      busy ? 429 : 502,
    );
  }
}

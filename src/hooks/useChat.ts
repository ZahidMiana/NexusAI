"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHAT_LIMITS, type ChatMessage } from "@/lib/chat/messages";

export type ChatStatus = "idle" | "waiting" | "streaming";

export interface UseChat {
  messages: ChatMessage[];
  status: ChatStatus;
  error: string | null;
  send: (text: string) => void;
  stop: () => void;
}

/** Talks to /api/chat and streams the assistant's reply into the last message. */
export function useChat(endpoint = "/api/chat"): UseChat {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => () => abortRef.current?.abort(), []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
  }, []);

  const send = useCallback(
    (text: string) => {
      const content = text.trim().slice(0, CHAT_LIMITS.userMax);
      if (!content || abortRef.current) return;

      const history: ChatMessage[] = [...messagesRef.current, { role: "user", content }];
      setMessages(history);
      setError(null);
      setStatus("waiting");

      const controller = new AbortController();
      abortRef.current = controller;

      void (async () => {
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: history }),
            signal: controller.signal,
          });

          if (!response.ok || !response.body) {
            const body = (await response.json().catch(() => null)) as { error?: string } | null;
            throw new Error(body?.error ?? "The assistant could not answer right now. Please try again.");
          }

          const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
          let reply = "";
          setMessages([...history, { role: "assistant", content: "" }]);
          setStatus("streaming");

          for (;;) {
            const { value, done } = await reader.read();
            if (done) break;
            reply += value;
            setMessages([...history, { role: "assistant", content: reply }]);
          }

          if (!reply.trim()) {
            setMessages(history);
            throw new Error("The assistant sent an empty reply. Please try asking again.");
          }
        } catch (caught) {
          if (controller.signal.aborted) return;
          setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
        } finally {
          if (abortRef.current === controller) {
            abortRef.current = null;
            setStatus("idle");
          }
        }
      })();
    },
    [endpoint],
  );

  return { messages, status, error, send, stop };
}

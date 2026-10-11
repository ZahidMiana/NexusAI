"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, FileText, SendHorizontal, Square, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { siteConfig } from "@/config/site";
import { useContactLauncher } from "@/context/ContactContext";
import { useChat } from "@/hooks/useChat";
import { CHAT_LIMITS } from "@/lib/chat/messages";
import { cn } from "@/lib/cn";
import { ChatText } from "./ChatText";

const STARTERS = ["What services do you offer?", "Who is on the team?", "Can you build a RAG chatbot for us?", "Show me your AI security work"] as const;

const GREETING = `Hi! I'm the ${siteConfig.name} Assistant. Ask me about our services, team or past projects, or tell me what you want to build.`;

/**
 * Floating AI assistant (bottom right, below the WhatsApp button). Answers questions about NexusAI from
 * the site's own data and hands visitors over to the contact form.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const { messages, status, error, send, stop } = useChat();
  const { openContact } = useContactLauncher();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const busy = status !== "idle";

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [messages, status, error]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = (text: string) => {
    if (!text.trim() || busy) return;
    send(text);
    setDraft("");
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit(draft);
  };

  const onInputKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit(draft);
    }
  };

  const sendBrief = () => {
    setOpen(false);
    openContact();
  };

  return (
    <div className="fixed right-4 bottom-24 z-40 flex flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)] sm:right-6 md:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.section
            id={panelId}
            role="dialog"
            aria-label={`${siteConfig.name} Assistant`}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[min(34rem,calc(100dvh-11rem))] w-[min(24rem,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-lg border-2 border-line bg-panel shadow-[var(--shadow-pop)] md:h-[min(34rem,calc(100dvh-8rem))]"
          >
            <header className="flex items-start justify-between gap-3 border-b-2 border-line bg-cyber-cyan px-4 py-3 text-on-accent">
              <div>
                <p className="font-display text-base font-black">{siteConfig.name} Assistant</p>
                <p className="font-mono text-xs opacity-90">AI answers about our services, team and work</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded p-1 transition-colors hover:bg-white/15">
                <X className="h-4 w-4" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed" aria-live="polite">
              <Bubble role="assistant">{GREETING}</Bubble>

              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {STARTERS.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => submit(starter)}
                      className="rounded-full border-2 border-line bg-inset px-3 py-1 text-left text-xs text-fg transition-colors hover:bg-cyber-cyan/10"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message, index) => (
                <Bubble key={index} role={message.role}>
                  {message.role === "assistant" ? <ChatText text={message.content} /> : message.content}
                </Bubble>
              ))}

              {status === "waiting" && (
                <Bubble role="assistant">
                  <span className="inline-flex gap-1" aria-label="Assistant is typing">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-muted [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-muted [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-muted" />
                  </span>
                </Bubble>
              )}

              {error && (
                <p role="alert" className="rounded-md border-2 border-danger bg-danger/10 px-3 py-2 text-xs text-danger">
                  {error}
                </p>
              )}
            </div>

            <div className="border-t-2 border-line px-3 pt-3 pb-3">
              <button
                type="button"
                onClick={sendBrief}
                className="mb-2 flex w-full items-center justify-center gap-2 rounded-md border-2 border-line bg-inset py-1.5 font-tech text-xs tracking-[0.1em] text-fg uppercase transition-colors hover:bg-panel-raised"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden /> Send a project brief
              </button>
              <form onSubmit={onSubmit} className="flex items-end gap-2">
                <label htmlFor={`${panelId}-input`} className="sr-only">
                  Message the assistant
                </label>
                <textarea
                  ref={inputRef}
                  id={`${panelId}-input`}
                  rows={1}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={onInputKey}
                  maxLength={CHAT_LIMITS.userMax}
                  placeholder="Ask about our services…"
                  className="max-h-28 min-h-10 flex-1 resize-none rounded-md border-2 border-line bg-inset px-3 py-2 font-mono text-sm text-fg placeholder:text-fg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan"
                />
                {busy ? (
                  <button type="button" onClick={stop} aria-label="Stop reply" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-line bg-cyber-pink text-on-accent">
                    <Square className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-line bg-cyber-cyan text-on-accent transition-opacity disabled:opacity-40"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </button>
                )}
              </form>
              <p className="mt-2 text-center font-mono text-[11px] text-fg-muted">AI can make mistakes. For anything important, contact the team.</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close assistant" : `Ask the ${siteConfig.name} Assistant`}
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-line bg-cyber-cyan text-on-accent shadow-[var(--shadow-pop)] transition-transform duration-200 ease-hardware hover:-translate-y-0.5 active:translate-y-0.5"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-7 w-7" />}
      </button>
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg border-2 border-line px-3 py-2 break-words",
          role === "user" ? "bg-cyber-cyan text-on-accent" : "bg-inset text-fg",
        )}
      >
        {children}
      </div>
    </div>
  );
}

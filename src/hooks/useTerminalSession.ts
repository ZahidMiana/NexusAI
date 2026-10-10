"use client";

import { useCallback, useMemo, useReducer, useRef, useState, type KeyboardEvent } from "react";
import { executeInput, type CommandRegistry } from "@/lib/terminal";
import type { TerminalLine, TerminalLineDraft } from "@/types";

const MAX_LINES = 240;

interface BufferState {
  lines: TerminalLine[];
  revealedCount: number;
}

type BufferAction =
  | { type: "append"; lines: TerminalLine[] }
  | { type: "replace"; lines: TerminalLine[] }
  | { type: "reveal" };

function bufferReducer(state: BufferState, action: BufferAction): BufferState {
  switch (action.type) {
    case "append": {
      const lines = [...state.lines, ...action.lines];
      const overflow = Math.max(0, lines.length - MAX_LINES);
      return { lines: lines.slice(overflow), revealedCount: Math.max(0, state.revealedCount - overflow) };
    }
    case "replace":
      return { lines: action.lines, revealedCount: 0 };
    case "reveal":
      return { ...state, revealedCount: Math.min(state.lines.length, state.revealedCount + 1) };
  }
}

export interface TerminalSession {
  lines: readonly TerminalLine[];
  revealedCount: number;
  busy: boolean;
  input: string;
  setInput: (value: string) => void;
  run: (raw: string) => void;
  markLineRevealed: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Terminal state machine: scrollback, sequential typewriter reveal, command
 * history and autocomplete. Command semantics are delegated to the registry.
 */
export function useTerminalSession(registry: CommandRegistry, bootLines: readonly TerminalLineDraft[]): TerminalSession {
  const idRef = useRef(0);
  const historyRef = useRef<string[]>([]);
  const historyCursorRef = useRef(-1);

  const [{ lines, revealedCount }, dispatch] = useReducer(bufferReducer, bootLines, (boot) => ({
    lines: boot.map((line, index) => ({ id: `boot-${index}`, kind: "output" as const, text: line.text, tone: line.tone ?? "default" })),
    revealedCount: 0,
  }));
  const [input, setInput] = useState("");

  const toLines = useCallback(
    (drafts: readonly TerminalLineDraft[], kind: TerminalLine["kind"]): TerminalLine[] =>
      drafts.map((draft) => {
        idRef.current += 1;
        return { id: `line-${idRef.current}`, kind, text: draft.text, tone: draft.tone ?? "default" };
      }),
    [],
  );

  const run = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      historyRef.current = [...historyRef.current.filter((entry) => entry !== trimmed), trimmed].slice(-50);
      historyCursorRef.current = -1;

      const result = executeInput(trimmed, registry);
      const echo = toLines([{ text: trimmed, tone: "pink" }], "input");
      const output = toLines(result.lines, "output");

      if (result.clearScreen) {
        dispatch({ type: "replace", lines: output });
        return;
      }

      dispatch({ type: "append", lines: [...echo, ...output] });
    },
    [registry, toLines],
  );

  const markLineRevealed = useCallback(() => dispatch({ type: "reveal" }), []);

  const commandNames = useMemo(() => registry.describe().map((command) => command.name), [registry]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const history = historyRef.current;

      if (event.key === "Enter") {
        event.preventDefault();
        run(input);
        setInput("");
        return;
      }

      if (event.key === "ArrowUp" && history.length > 0) {
        event.preventDefault();
        const cursor = historyCursorRef.current === -1 ? history.length - 1 : Math.max(0, historyCursorRef.current - 1);
        historyCursorRef.current = cursor;
        setInput(history[cursor]);
        return;
      }

      if (event.key === "ArrowDown" && historyCursorRef.current !== -1) {
        event.preventDefault();
        const cursor = historyCursorRef.current + 1;
        if (cursor >= history.length) {
          historyCursorRef.current = -1;
          setInput("");
        } else {
          historyCursorRef.current = cursor;
          setInput(history[cursor]);
        }
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        const prefix = input.trim().toLowerCase().replace(/^\/?/, "/");
        const match = commandNames.find((name) => name.startsWith(prefix));
        if (match) setInput(match);
        return;
      }

      if (event.key === "l" && event.ctrlKey) {
        event.preventDefault();
        run("/clear");
      }
    },
    [commandNames, input, run],
  );

  return {
    lines,
    revealedCount,
    busy: revealedCount < lines.length,
    input,
    setInput,
    run,
    markLineRevealed,
    handleKeyDown,
  };
}

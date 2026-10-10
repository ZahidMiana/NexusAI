export interface ParsedInput {
  name: string;
  args: string[];
}

/** Normalises raw terminal input into a command name and argument list. */
export function parseInput(raw: string): ParsedInput | null {
  const tokens = raw.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;
  const [head, ...args] = tokens;
  const name = head.toLowerCase().replace(/^\/?/, "/");
  return { name, args };
}

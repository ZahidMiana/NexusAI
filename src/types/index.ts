import type { LucideIcon } from "lucide-react";

/** Neon accent channels available throughout the design system. */
export type Accent = "cyan" | "pink" | "lime";

/* ─────────────────────────── Team ─────────────────────────── */

export type MemberSpecialty = "full-stack" | "product" | "mobile";

export interface TeamMember {
  id: string;
  handle: string;
  name: string;
  role: string;
  specialty: MemberSpecialty;
  accent: Accent;
  status: string;
  bio: string;
  focus: readonly string[];
}

/* ─────────────────────────── Tech stack ─────────────────────────── */

export interface TechItem {
  id: string;
  name: string;
  icon: LucideIcon;
  accent: Accent;
  proficiency: number;
  yearsInProduction: number;
  summary: string;
  highlights: readonly string[];
}

export interface TechCategory {
  id: string;
  label: string;
  accent: Accent;
  items: readonly TechItem[];
}

/* ─────────────────────────── Terminal ─────────────────────────── */

export type TerminalTone = "default" | "muted" | "cyan" | "pink" | "lime" | "error";

export type TerminalLineKind = "input" | "output";

export interface TerminalLine {
  id: string;
  kind: TerminalLineKind;
  text: string;
  tone: TerminalTone;
}

/** A line as authored by a command, before the terminal assigns identity. */
export type TerminalLineDraft = Pick<TerminalLine, "text"> & Partial<Pick<TerminalLine, "tone">>;

export interface CommandResult {
  lines: readonly TerminalLineDraft[];
  /** When true the terminal wipes its scrollback before printing `lines`. */
  clearScreen?: boolean;
}

export interface CommandDescriptor {
  name: string;
  description: string;
}

export interface CommandContext {
  args: readonly string[];
  availableCommands: readonly CommandDescriptor[];
  now: Date;
}

/**
 * Contract every terminal command fulfils. New commands are added by
 * implementing this interface and registering them — the terminal engine
 * itself never changes (Open/Closed Principle).
 */
export interface TerminalCommand extends CommandDescriptor {
  aliases?: readonly string[];
  execute(context: CommandContext): CommandResult;
}

/* ─────────────────────────── Workflow simulator ─────────────────────────── */

export interface WorkflowNode {
  id: string;
  label: string;
  x: number;
  y: number;
  accent: Accent;
  /** Agent nodes are clickable entry points that trigger a routing demo. */
  routable: boolean;
  task?: string;
}

export interface WorkflowEdge {
  from: string;
  to: string;
}

/* ─────────────────────────── Neural topology ─────────────────────────── */

export interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  energy: number;
  hue: Accent;
}

export interface NeuralSignal {
  from: number;
  to: number;
  progress: number;
  speed: number;
  hue: Accent;
}

export interface PointerState {
  x: number;
  y: number;
  active: boolean;
}

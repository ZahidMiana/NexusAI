import type { LucideIcon } from "lucide-react";
import type { DesignStyleId, EffectsMode } from "@/lib/preferences/styles";

/** Neon accent channels available throughout the design system. */
export type Accent = "cyan" | "pink" | "lime";

/* ─────────────────────────── Team ─────────────────────────── */

export type MemberSpecialty = "full-stack" | "security" | "product" | "mobile";

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
  /** Project type pre-selected when a visitor clicks "Hire for this". */
  hireAs: ProjectTypeId;
  /** Optional portrait (path under /public). Rendered with a neon duotone filter. */
  photo?: string;
  socials?: { github?: string; linkedin?: string; website?: string };
}

/* ─────────────────────────── Tech stack ─────────────────────────── */

export interface TechItem {
  id: string;
  name: string;
  icon: LucideIcon;
  accent: Accent;
  proficiency: number;
  /** Real projects where the team used this technology. */
  usedIn: readonly string[];
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

/** Side effects a command can request; the host UI decides how to fulfil them. */
export type TerminalEffect =
  | { type: "open-contact"; prefill?: ContactPrefill }
  | { type: "set-style"; style: DesignStyleId }
  | { type: "set-effects"; effects: EffectsMode };

export interface CommandResult {
  lines: readonly TerminalLineDraft[];
  /** When true the terminal wipes its scrollback before printing `lines`. */
  clearScreen?: boolean;
  effect?: TerminalEffect;
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

/* ─────────────────────────── Contact / lead capture ─────────────────────────── */

export type ProjectTypeId = "llm-platform" | "agentic-product" | "security" | "on-device" | "audit" | "other";

export type EngagementId = "audit" | "sprint" | "squad";

export interface ContactPrefill {
  projectType?: ProjectTypeId;
  engagement?: EngagementId;
}

/* ─────────────────────────── Case studies ─────────────────────────── */

export interface CaseMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  accent: Accent;
  summary: string;
  problem: string;
  solution: readonly string[];
  results: readonly CaseMetric[];
  stack: readonly string[];
  /** Team member id (see data/team.ts) who built it. */
  owner: string;
  duration?: string;
  quote?: string;
  /** Pre-selected in the contact form from "Start a similar project". */
  projectType: ProjectTypeId;
}

/* ─────────────────────────── Process / services / proof / FAQ ─────────────────────────── */

export interface ProcessStep {
  id: string;
  code: string;
  title: string;
  duration: string;
  accent: Accent;
  description: string;
  deliverables: readonly string[];
}

export interface ServicePlan {
  id: EngagementId;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  timeline: string;
  accent: Accent;
  featured: boolean;
  features: readonly string[];
  projectType: ProjectTypeId;
}

export type CredentialKind = "Certification" | "Role" | "Leadership";

export interface Credential {
  id: string;
  kind: CredentialKind;
  title: string;
  org: string;
  period: string;
  /** Team member id (see data/team.ts). */
  memberId: string;
  accent: Accent;
  detail: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

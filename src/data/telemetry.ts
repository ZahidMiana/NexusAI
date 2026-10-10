import type { Accent } from "@/types";

export interface HeroStat {
  label: string;
  value: string;
  accent: Accent;
}

/** Real numbers from the team's projects. */
export const HERO_STATS: readonly HeroStat[] = [
  { label: "PROJECTS_SHIPPED", value: "8", accent: "cyan" },
  { label: "RECORDS_INDEXED", value: "40k+", accent: "lime" },
  { label: "ATS_ACCURACY", value: "92%", accent: "pink" },
  { label: "HALLUCINATION_CUT", value: "-30%", accent: "cyan" },
];

export interface ProductLaunch {
  id: string;
  name: string;
  client: string;
  metric: string;
  status: "LIVE" | "DEPLOYING" | "CANARY";
}

export const PRODUCT_LAUNCHES: readonly ProductLaunch[] = [
  { id: "l1", name: "ClaimPilot Agent", client: "Insurtech", metric: "-72% handling time", status: "LIVE" },
  { id: "l2", name: "SupportSwarm v3", client: "SaaS Unicorn", metric: "81% auto-resolution", status: "CANARY" },
  { id: "l3", name: "DealScout RAG", client: "PE Fund", metric: "3.4x analyst output", status: "DEPLOYING" },
  { id: "l4", name: "CodeMedic Bot", client: "Fintech", metric: "1.2k PRs / month", status: "LIVE" },
];

export interface ArchitectureLayer {
  id: string;
  label: string;
  detail: string;
  accent: Accent;
}

/** Reference RAG + agent architecture the team ships. */
export const INFERENCE_ARCHITECTURE: readonly ArchitectureLayer[] = [
  { id: "client", label: "WEB_CLIENT", detail: "Next.js · streaming UI", accent: "cyan" },
  { id: "gateway", label: "API_LAYER", detail: "FastAPI · JWT · RBAC", accent: "pink" },
  { id: "orchestrator", label: "AGENT_GRAPH", detail: "LangGraph · tools · memory", accent: "lime" },
  { id: "inference", label: "HYBRID_RETRIEVAL", detail: "ChromaDB + BM25 · rerank", accent: "cyan" },
  { id: "memory", label: "LLM + CACHE", detail: "Gemini / GPT · Redis", accent: "pink" },
];

export interface CoordinationNode {
  id: string;
  city: string;
  timeZone: string;
  role: string;
  accent: Accent;
}

/** Team base plus the client time zones we cover. */
export const COORDINATION_NODES: readonly CoordinationNode[] = [
  { id: "lhr", city: "LAHORE", timeZone: "Asia/Karachi", role: "Team HQ", accent: "lime" },
  { id: "lon", city: "LONDON", timeZone: "Europe/London", role: "Client hours", accent: "pink" },
  { id: "nyc", city: "NEW_YORK", timeZone: "America/New_York", role: "Client hours", accent: "cyan" },
  { id: "dxb", city: "DUBAI", timeZone: "Asia/Dubai", role: "Client hours", accent: "cyan" },
];

export interface OnDeviceModel {
  id: string;
  label: string;
  quantization: string;
  sizeGb: number;
  tokensPerSecond: number;
  ramGb: number;
}

export const ON_DEVICE_MODELS: readonly OnDeviceModel[] = [
  { id: "q4", label: "Llama 3.2 3B", quantization: "Q4_K_M", sizeGb: 1.9, tokensPerSecond: 28, ramGb: 2.4 },
  { id: "q8", label: "Llama 3.2 3B", quantization: "Q8_0", sizeGb: 3.4, tokensPerSecond: 17, ramGb: 3.9 },
  { id: "q2", label: "Llama 3.2 1B", quantization: "Q2_K", sizeGb: 0.6, tokensPerSecond: 54, ramGb: 0.9 },
];

export const ON_DEVICE_PROMPT = "Summarise my meeting notes offline.";

export const ON_DEVICE_RESPONSE =
  "Three decisions locked: ship the beta Friday, move vector search on-device, and cut cloud inference spend by 40%. Action items assigned to design, mobile and infra. No data left this phone.";

export interface DetectionTemplate {
  id: string;
  label: string;
  accent: "cyan" | "pink" | "lime";
  baseX: number;
  baseY: number;
  width: number;
  height: number;
}

/** Percent-based boxes laid over the mock camera viewport. */
export const DETECTION_TEMPLATES: readonly DetectionTemplate[] = [
  { id: "d1", label: "person", accent: "lime", baseX: 10, baseY: 30, width: 32, height: 52 },
  { id: "d2", label: "laptop", accent: "cyan", baseX: 52, baseY: 56, width: 36, height: 22 },
  { id: "d3", label: "coffee_cup", accent: "pink", baseX: 62, baseY: 26, width: 16, height: 18 },
];

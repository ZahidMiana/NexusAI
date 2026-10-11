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

/** Zero-shot vs fine-tuned runs from Zubair's Vision to Markdown project. */
export interface OcrModel {
  id: string;
  label: string;
  rougeL: number;
  output: string;
}

export const OCR_MODELS: readonly OcrModel[] = [
  {
    id: "qlora",
    label: "QLoRA",
    rougeL: 0.68,
    output: "## Linear system\n\n$$\\begin{cases} x_1 + x_2 - 3x_3 = -10 \\\\ 6x_2 - 2x_3 + x_4 = 7 \\\\ 2x_3 - 3x_4 = 13 \\end{cases}$$",
  },
  {
    id: "zero-shot",
    label: "Zero-shot",
    rougeL: 0.41,
    output: "Linear system\n\nx1 + x2 - 3x3 = -10\n6x2 - 2x3 + x4 = 7\n2x3 - 3x4 = 13",
  },
];

/** Shared settings of the fine-tuned Qwen2-VL-2B model. */
export const OCR_MODEL_INFO = { base: "Qwen2-VL-2B", quantization: "NF4", loraRank: 16 } as const;

export interface DetectionTemplate {
  id: string;
  label: string;
  accent: "cyan" | "pink" | "lime";
  baseX: number;
  baseY: number;
  width: number;
  height: number;
}

export type DetectorId = "objects" | "faces";

/** Percent-based boxes laid over the mock camera viewport, per ML Kit detector. */
export const DETECTION_TEMPLATES: Record<DetectorId, readonly DetectionTemplate[]> = {
  objects: [
    { id: "d1", label: "person", accent: "lime", baseX: 10, baseY: 30, width: 32, height: 52 },
    { id: "d2", label: "laptop", accent: "cyan", baseX: 52, baseY: 56, width: 36, height: 22 },
    { id: "d3", label: "cup", accent: "pink", baseX: 62, baseY: 26, width: 16, height: 18 },
  ],
  faces: [{ id: "f1", label: "face", accent: "lime", baseX: 15, baseY: 31, width: 22, height: 14 }],
};

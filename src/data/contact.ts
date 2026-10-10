import type { EngagementId, ProjectTypeId } from "@/types";

export interface Option<T extends string> {
  value: T;
  label: string;
}

export const PROJECT_TYPES: readonly Option<ProjectTypeId>[] = [
  { value: "llm-platform", label: "LLM platform / RAG" },
  { value: "agentic-product", label: "AI agent product" },
  { value: "security", label: "AI / LLM security audit" },
  { value: "on-device", label: "On device / mobile AI" },
  { value: "audit", label: "Architecture audit" },
  { value: "other", label: "Something else" },
];

export const ENGAGEMENTS: readonly Option<EngagementId>[] = [
  { value: "audit", label: "Architecture Audit" },
  { value: "sprint", label: "Fixed Scope Sprint" },
  { value: "squad", label: "Embedded Squad" },
];

export const BUDGET_RANGES: readonly Option<string>[] = [
  { value: "under-15k", label: "Under $15k" },
  { value: "15k-50k", label: "$15k to $50k" },
  { value: "50k-150k", label: "$50k to $150k" },
  { value: "150k-plus", label: "$150k+" },
  { value: "not-sure", label: "Not sure yet" },
];

export function labelFor<T extends string>(options: readonly Option<T>[], value: string | undefined): string {
  return options.find((option) => option.value === value)?.label ?? "Not specified";
}

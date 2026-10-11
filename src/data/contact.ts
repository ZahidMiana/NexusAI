import type { ProjectTypeId } from "@/types";

export interface Option<T extends string> {
  value: T;
  label: string;
}

export const PROJECT_TYPES: readonly Option<ProjectTypeId>[] = [
  { value: "llm-platform", label: "LLM platform / RAG" },
  { value: "agentic-product", label: "AI Agent" },
  { value: "full-stack", label: "Full Stack app" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend / API" },
  { value: "on-device", label: "On device / mobile AI" },
  { value: "security", label: "AI / LLM security audit" },
  { value: "audit", label: "Architecture audit" },
  { value: "other", label: "Something else" },
];

export function labelFor<T extends string>(options: readonly Option<T>[], value: string | undefined): string {
  return options.find((option) => option.value === value)?.label ?? "Not specified";
}

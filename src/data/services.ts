import type { ServicePlan } from "@/types";

/** Starting prices are examples. Adjust to your real rates. */
export const SERVICE_PLANS: readonly ServicePlan[] = [
  {
    id: "audit",
    name: "Architecture Audit",
    tagline: "A clear plan before you spend on building.",
    price: "$12k",
    priceNote: "fixed price",
    timeline: "2 weeks",
    accent: "cyan",
    featured: false,
    projectType: "audit",
    features: [
      "Review of your AI roadmap, data and current stack",
      "Model, cost and latency recommendations",
      "Security and compliance risk check",
      "Prioritised build plan with estimates",
    ],
  },
  {
    id: "sprint",
    name: "Fixed Scope Sprint",
    tagline: "One AI product, designed and shipped to production.",
    price: "$45k",
    priceNote: "starting at",
    timeline: "6 to 8 weeks",
    accent: "pink",
    featured: true,
    projectType: "agentic-product",
    features: [
      "Full build of one LLM, agent or on device feature",
      "Evaluation suite and quality gates",
      "Production deployment and monitoring",
      "30 days of post launch support",
    ],
  },
  {
    id: "squad",
    name: "Embedded Squad",
    tagline: "Our operators working as part of your team.",
    price: "$38k",
    priceNote: "per month",
    timeline: "3 month minimum",
    accent: "lime",
    featured: false,
    projectType: "llm-platform",
    features: [
      "Full stack AI and AI security engineers",
      "Joins your standups, repos and roadmap",
      "Ongoing feature delivery and platform work",
      "Knowledge transfer to your engineers",
    ],
  },
];

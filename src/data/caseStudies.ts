import type { CaseStudy } from "@/types";

/** Sample case studies. Replace with real client work (anonymised if needed) before launch. */
export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "claimpilot",
    projectType: "agentic-product",
    title: "ClaimPilot Agent",
    client: "Series C Insurtech",
    industry: "Insurance",
    accent: "pink",
    summary: "An agentic claims assistant that reads documents, checks policy rules and drafts decisions for adjusters.",
    problem:
      "Adjusters spent 40 minutes per claim reading PDFs, cross checking policy clauses and writing summaries. Backlogs grew every storm season and customer satisfaction dropped.",
    solution: [
      "Multi agent LangGraph workflow: document intake, policy retrieval, fraud signals and decision drafting",
      "Hybrid retrieval over 60k policy documents with clause level citations",
      "Human in the loop review screen with one click approve or edit",
      "Evaluation harness with 900 labelled claims gating every release",
    ],
    results: [
      { label: "Handling time", value: "-72%" },
      { label: "Claims / adjuster / day", value: "3.1x" },
      { label: "Decision accuracy", value: "97.4%" },
    ],
    stack: ["LangGraph", "GPT class LLMs", "Qdrant", "Next.js", "Python"],
    duration: "10 weeks",
    quote: "It feels like every adjuster got a senior analyst sitting next to them.",
  },
  {
    id: "dealscout",
    projectType: "llm-platform",
    title: "DealScout RAG",
    client: "Private Equity Fund",
    industry: "Finance",
    accent: "cyan",
    summary: "A private research copilot that answers questions across thousands of data room documents with sources.",
    problem:
      "Analysts lost days digging through data rooms during due diligence. Sensitive files could not leave the fund's cloud, ruling out off the shelf tools.",
    solution: [
      "Self hosted open weight LLM on vLLM inside the fund's VPC",
      "Document pipeline for PDFs, spreadsheets and slide decks with table extraction",
      "Answer engine with inline citations and confidence scores",
      "Role based access so every answer respects data room permissions",
    ],
    results: [
      { label: "Analyst output", value: "3.4x" },
      { label: "Answer latency", value: "1.9s" },
      { label: "Data leaving VPC", value: "0 bytes" },
    ],
    stack: ["vLLM", "Llama 3", "PyTorch", "pgvector", "Kubernetes"],
    duration: "8 weeks",
  },
  {
    id: "fieldlens",
    projectType: "on-device",
    title: "FieldLens Mobile",
    client: "Industrial Services Co.",
    industry: "Manufacturing",
    accent: "lime",
    summary: "An offline mobile app that detects equipment faults from the camera and guides technicians step by step.",
    problem:
      "Technicians worked in plants with no signal. Cloud based AI was useless on site, and junior staff needed expert guidance to diagnose faults safely.",
    solution: [
      "Custom object detector for 42 equipment parts running at 50 FPS on device",
      "Quantized 3B LLM generating repair steps fully offline",
      "Sync engine that uploads findings once the device is back online",
      "React Native app with native camera frame processors",
    ],
    results: [
      { label: "First time fix rate", value: "+38%" },
      { label: "Detection speed", value: "50 FPS" },
      { label: "Works offline", value: "100%" },
    ],
    stack: ["React Native", "Core ML", "TFLite", "llama.cpp", "MediaPipe"],
    duration: "12 weeks",
    quote: "Our newest techs now fix things our veterans used to get called in for.",
  },
  {
    id: "supportswarm",
    projectType: "agentic-product",
    title: "SupportSwarm v3",
    client: "B2B SaaS Unicorn",
    industry: "Software",
    accent: "pink",
    summary: "A support agent swarm that resolves tickets end to end across billing, technical and account questions.",
    problem: "Ticket volume tripled after a product launch. Hiring could not keep up and first response times passed 30 hours.",
    solution: [
      "Router agent classifying intent and handing off to specialist agents",
      "Tool calling into billing, CRM and product APIs with strict guardrails",
      "Automatic escalation to humans with a full context summary",
      "Weekly evaluation reports tracking quality, cost and deflection",
    ],
    results: [
      { label: "Auto resolution", value: "81%" },
      { label: "First response", value: "28s" },
      { label: "Support cost", value: "-54%" },
    ],
    stack: ["LangChain", "Claude class LLMs", "Next.js", "PostgreSQL", "AWS"],
    duration: "9 weeks",
  },
];

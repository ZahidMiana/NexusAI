import { Coins, FileText, ScanEye, Server, ShieldAlert, Users } from "lucide-react";
import type { CaseStudy } from "@/types";

/**
 * Real projects from the team. `owner` links to a member in data/team.ts.
 * Add `cover: "/work/<file>.png"` (in /public) for a screenshot and
 * `links: { github, demo }` to show buttons in the case study dialog.
 */
export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "perp-dex",
    icon: Coins,
    title: "Perp Exchange + AI Agent",
    client: "Final Year Project",
    industry: "DeFi / Web3",
    owner: "zahid",
    projectType: "agentic-product",
    accent: "cyan",
    summary: "A decentralized perpetuals exchange on Solana with a LangGraph AI agent that gives real-time market insight and executes trades.",
    problem:
      "On-chain perpetual trading needs high throughput and low fees, while traders still have to watch markets and react manually. The goal was a fast exchange plus an agent that can reason about positions and act on them.",
    solution: [
      "Smart contracts in Rust (Anchor) on Solana for token swaps and perpetual trading with up to 20x leverage",
      "LangGraph-powered AI agent that manages complex state and gives real-time financial insights",
      "Automated trade execution driven by the agent alongside manual trading",
      "Contract optimisation for high-frequency queries with low latency and minimal fees",
    ],
    results: [
      { label: "Max leverage", value: "20x" },
      { label: "Chain", value: "Solana" },
      { label: "Agent", value: "LangGraph" },
    ],
    stack: ["Rust (Anchor)", "Solana", "LangGraph", "FastAPI"],
  },
  {
    id: "documind",
    icon: FileText,
    title: "DocuMind AI",
    client: "RAG Chatbot",
    industry: "Document AI",
    owner: "zahid",
    projectType: "llm-platform",
    accent: "pink",
    summary: "A production RAG chatbot that lets users chat with complex PDF and Word files and get answers with source-backed citations.",
    problem:
      "Teams need answers buried inside long documents, but plain LLM chat hallucinates and cannot show where an answer came from. Multi-user access also needed real authentication and isolated chat history.",
    solution: [
      "RAG pipeline with LangChain and FastAPI over PDF and Doc files, with full source citations",
      "Advanced chunking strategies and ChromaDB vector indexing for better retrieval accuracy",
      "JWT authentication and role-based access control",
      "Redis-backed chat history for smooth multi-user sessions",
    ],
    results: [
      { label: "Hallucinations", value: "-30%" },
      { label: "Auth", value: "JWT + RBAC" },
      { label: "Answers", value: "Cited" },
    ],
    stack: ["LangChain", "ChromaDB", "Gemini", "FastAPI", "Streamlit", "Redis"],
  },
  {
    id: "ats",
    icon: Users,
    title: "AI Resume Screening",
    client: "ATS System",
    industry: "HR Tech",
    owner: "zahid",
    projectType: "llm-platform",
    accent: "lime",
    summary: "An applicant tracking system that ranks candidates by semantic fit to a job description using BERT embeddings.",
    problem: "Manual screening is slow and keyword matching misses good candidates. Rankings also had to avoid gender and age bias.",
    solution: [
      "Semantic ranking with BERT embeddings and Transformers",
      "Custom NLP preprocessing for multi-domain skills",
      "Bias reduction by removing gender and age signals",
      "Automated scoring and candidate ranking for HR teams",
    ],
    results: [
      { label: "Matching accuracy", value: "92%" },
      { label: "Manual screening", value: "-60%" },
    ],
    stack: ["Python", "BERT", "Transformers", "NLP"],
  },
  {
    id: "multimodal-retrieval",
    icon: ScanEye,
    title: "Multimodal Retrieval",
    client: "Product Search",
    industry: "Search / AI",
    owner: "zeeshan",
    projectType: "llm-platform",
    accent: "cyan",
    summary: "An end-to-end OpenCLIP retrieval pipeline that searches 40k+ products by image and text, with hardened API endpoints.",
    problem: "Product search needed to match by meaning across images and text, and the inference API had to resist malicious queries and denial of service.",
    solution: [
      "Multimodal OpenCLIP embeddings with PyTorch",
      "HNSW vector indexing across 40k+ records",
      "Evaluation of embedding distance metrics",
      "Backend REST endpoints protected against malicious payloads and model DoS",
    ],
    results: [
      { label: "Records indexed", value: "40k+" },
      { label: "Index", value: "HNSW" },
    ],
    stack: ["OpenCLIP", "PyTorch", "HNSW", "REST API"],
  },
  {
    id: "llm-security-framework",
    icon: ShieldAlert,
    title: "LLM & API Security Framework",
    client: "Security Tooling",
    industry: "AI Security",
    owner: "zeeshan",
    projectType: "security",
    accent: "pink",
    summary: "A Python CLI fuzzer that audits API endpoints and LLM integration layers against the OWASP Top 10 for LLMs and APIs.",
    problem: "LLM features add new attack surface: prompt injection, unvalidated tool calls and unsafe downstream prompts, on top of classic API flaws.",
    solution: [
      "Custom Python CLI fuzzing tool for APIs and LLM integrations",
      "Tests mapped to the OWASP Top 10 for LLMs and APIs",
      "Detects broken object-level authorization (BOLA) and unvalidated tool invocations",
      "Finds input sanitisation gaps on downstream prompts",
    ],
    results: [
      { label: "Standard", value: "OWASP LLM" },
      { label: "Detects", value: "BOLA" },
    ],
    stack: ["Python", "OWASP LLM Top 10", "API Security", "Fuzzing"],
  },
  {
    id: "security-homelab",
    icon: Server,
    title: "Security Homelab & CTF",
    client: "Attack-Defense Lab",
    industry: "Offensive Security",
    owner: "zeeshan",
    projectType: "security",
    accent: "lime",
    summary: "Docker-based attack-defense labs that replicate real web and infrastructure vulnerabilities, with IDS telemetry.",
    problem: "Detection rules are only as good as the attacks used to test them, so a realistic, repeatable lab was needed.",
    solution: [
      "Modular Docker homelabs replicating SSRF, SQLi, IDOR and XSS",
      "Network monitoring and IDS telemetry integrated",
      "Detection heuristics evaluated against bypass strategies",
      "Containerised infrastructure reused for CTF competitions",
    ],
    results: [
      { label: "Vulnerability classes", value: "4" },
      { label: "Infra", value: "Docker" },
    ],
    stack: ["Docker", "IDS", "Linux", "Web Security"],
  },
];

import type { FaqItem } from "@/types";

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "timeline",
    question: "How fast can you start?",
    answer: "Usually within two weeks of our first call. An architecture audit can often start the following Monday.",
  },
  {
    id: "models",
    question: "Which AI models do you work with?",
    answer:
      "Whatever fits the job: leading commercial APIs like Gemini and GPT, or open weight models self hosted in your cloud, wired together with LangChain and LangGraph.",
  },
  {
    id: "data",
    question: "Is our data safe with you?",
    answer:
      "Yes. We sign an NDA before seeing anything, and security is built in: every system we ship is tested against the OWASP Top 10 for LLMs by our own security engineer.",
  },
  {
    id: "ownership",
    question: "Who owns the code?",
    answer: "You do. All code, models, prompts and documentation are yours from the first commit.",
  },
  {
    id: "after",
    question: "What happens after launch?",
    answer:
      "Every sprint includes 30 days of support. After that you can keep us on a monthly plan or take over fully with the runbooks and training we hand over.",
  },
  {
    id: "small",
    question: "Do you work with early stage startups?",
    answer: "Yes. The architecture audit is designed for teams that want a solid plan before committing a larger budget.",
  },
];

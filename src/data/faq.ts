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
      "Whatever fits the job. We use leading commercial APIs, open weight models like Llama and Mistral self hosted in your cloud, and small quantized models that run on phones.",
  },
  {
    id: "data",
    question: "Is our data safe with you?",
    answer:
      "Yes. We sign an NDA before seeing anything, work inside your cloud accounts when needed, and can build systems where no data ever leaves your infrastructure.",
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

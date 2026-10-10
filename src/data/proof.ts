import type { Testimonial } from "@/types";

/** Placeholder client wordmarks. Replace with real logos you have permission to show. */
export const CLIENT_LOGOS: readonly string[] = [
  "HELIX BANK",
  "NORTHWIND HEALTH",
  "ORBITAL LABS",
  "VANTA LOGISTICS",
  "QUANTA RETAIL",
  "ARCLIGHT ENERGY",
  "NIMBUS SAAS",
  "KESTREL INSURANCE",
];

/** Placeholder testimonials. Replace with real quotes approved by your clients. */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "t1",
    quote: "NexusAI shipped in eight weeks what our internal team had been scoping for a year. The evaluation suite alone changed how we build.",
    role: "VP of Engineering",
    company: "Series C Insurtech",
    accent: "pink",
    metric: "-72% handling time",
  },
  {
    id: "t2",
    quote: "They kept every byte inside our cloud and still delivered answers faster than the commercial tools we tested.",
    role: "Head of Data",
    company: "Private Equity Fund",
    accent: "cyan",
    metric: "3.4x analyst output",
  },
  {
    id: "t3",
    quote: "The offline app works in places where we never get signal. Our technicians actually ask for it now.",
    role: "Director of Field Operations",
    company: "Industrial Services Co.",
    accent: "lime",
    metric: "+38% first time fixes",
  },
];

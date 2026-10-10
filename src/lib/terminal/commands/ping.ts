import { randomBetween } from "@/lib/math";
import type { TerminalCommand } from "@/types";

const REGIONS = ["us-west-2", "eu-central-1", "me-central-1", "ap-northeast-1"] as const;

export const pingCommand: TerminalCommand = {
  name: "/ping",
  description: "Probe latency across inference regions",
  execute: ({ args }) => {
    const target = args[0] ?? "nexus-core.ai";
    const samples = REGIONS.map((region) => ({ region, latency: randomBetween(6, 92) }));
    const average = samples.reduce((sum, sample) => sum + sample.latency, 0) / samples.length;

    return {
      lines: [
        { text: `PING ${target} (10.13.37.1): 56 data bytes`, tone: "muted" },
        ...samples.map(({ region, latency }, index) => ({
          text: `64 bytes from ${region.padEnd(15)} icmp_seq=${index} ttl=58 time=${latency.toFixed(2)} ms`,
          tone: latency < 40 ? ("lime" as const) : ("cyan" as const),
        })),
        { text: `--- ${target} ping statistics ---`, tone: "muted" },
        { text: `${samples.length} packets transmitted, ${samples.length} received, 0% packet loss`, tone: "default" },
        { text: `round-trip avg = ${average.toFixed(2)} ms · MESH STATUS: OPTIMAL`, tone: "lime" },
      ],
    };
  },
};

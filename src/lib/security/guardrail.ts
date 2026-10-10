/**
 * A small, transparent prompt guardrail used by the AI Security Lab demo.
 * Pure functions only: rules are data, so new detectors are added by
 * appending to GUARDRAIL_RULES (Open/Closed). This is a teaching demo of
 * how layered input filtering works, not a production security control.
 */

export type Severity = "low" | "medium" | "high" | "critical";

export interface GuardrailRule {
  id: string;
  label: string;
  /** OWASP Top 10 for LLM Applications (2025) category. */
  owasp: string;
  severity: Severity;
  weight: number;
  pattern: RegExp;
}

export interface GuardrailFinding {
  ruleId: string;
  label: string;
  owasp: string;
  severity: Severity;
  match: string;
}

export type Verdict = "allowed" | "flagged" | "blocked";

export interface GuardrailResult {
  verdict: Verdict;
  risk: number;
  findings: GuardrailFinding[];
}

export const GUARDRAIL_RULES: readonly GuardrailRule[] = [
  {
    id: "instruction-override",
    label: "Instruction override attempt",
    owasp: "LLM01 Prompt Injection",
    severity: "high",
    weight: 45,
    pattern: /\b(ignore|disregard|forget|override)\b.{0,40}\b(previous|prior|above|all|earlier|system)\b.{0,25}\b(instructions?|rules|prompts?|guidelines)\b/i,
  },
  {
    id: "system-prompt-leak",
    label: "System prompt extraction",
    owasp: "LLM07 System Prompt Leakage",
    severity: "high",
    weight: 40,
    pattern: /\b(reveal|print|show|repeat|output|tell me)\b.{0,40}\b(system prompt|hidden (instructions|prompt)|initial prompt|your instructions)\b/i,
  },
  {
    id: "role-hijack",
    label: "Role hijack / jailbreak persona",
    owasp: "LLM01 Prompt Injection",
    severity: "high",
    weight: 40,
    pattern: /\b(you are now|act as|pretend (to be|you are)|from now on,? you)\b.{0,50}\b(DAN|unrestricted|jailbroken|developer mode|no (rules|limits|filters))\b/i,
  },
  {
    id: "jailbreak-keywords",
    label: "Known jailbreak keywords",
    owasp: "LLM01 Prompt Injection",
    severity: "medium",
    weight: 20,
    pattern: /\b(DAN|developer mode|jailbreak|do anything now)\b/i,
  },
  {
    id: "tool-abuse",
    label: "Dangerous tool or command execution",
    owasp: "LLM06 Excessive Agency",
    severity: "critical",
    weight: 50,
    pattern: /(rm\s+-rf|curl\s+https?:|wget\s+|chmod\s+\+x|\b(run|execute|call)\b.{0,30}\b(shell|bash|terminal|system command|os\.system)\b)/i,
  },
  {
    id: "data-exfiltration",
    label: "Data exfiltration to external target",
    owasp: "LLM02 Sensitive Information Disclosure",
    severity: "critical",
    weight: 50,
    pattern: /\b(send|post|upload|forward|exfiltrat\w*|leak)\b.{0,60}(https?:\/\/|webhook|attacker|external server|\b\S+@\S+\.\w+)/i,
  },
  {
    id: "secret-request",
    label: "Request for secrets or credentials",
    owasp: "LLM02 Sensitive Information Disclosure",
    severity: "medium",
    weight: 25,
    pattern: /\b(api[_ -]?keys?|passwords?|secrets?|credentials|access tokens?|private keys?)\b/i,
  },
  {
    id: "indirect-markers",
    label: "Hidden instructions in content (indirect injection)",
    owasp: "LLM01 Prompt Injection",
    severity: "medium",
    weight: 25,
    pattern: /(<!--[\s\S]*?-->|<\/?system>|\[\[.*?\]\]|BEGIN (HIDDEN )?INSTRUCTIONS|assistant:\s)/i,
  },
  {
    id: "obfuscation",
    label: "Encoded or obfuscated payload",
    owasp: "LLM01 Prompt Injection",
    severity: "low",
    weight: 15,
    pattern: /(\b(base64|rot13|hex)\b.{0,25}\b(decode|decoded|encoded)\b|[A-Za-z0-9+/]{40,}={0,2})/i,
  },
];

const SEVERITY_ORDER: Record<Severity, number> = { low: 0, medium: 1, high: 2, critical: 3 };

export function analyzePrompt(input: string, rules: readonly GuardrailRule[] = GUARDRAIL_RULES): GuardrailResult {
  const text = input.slice(0, 4000);
  const findings = rules
    .map((rule) => {
      const match = text.match(rule.pattern);
      return match ? { ruleId: rule.id, label: rule.label, owasp: rule.owasp, severity: rule.severity, match: match[0].slice(0, 60) } : null;
    })
    .filter((finding): finding is GuardrailFinding => finding !== null)
    .sort((a, b) => SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity]);

  const risk = Math.min(
    100,
    findings.reduce((sum, finding) => sum + (rules.find((rule) => rule.id === finding.ruleId)?.weight ?? 0), 0),
  );
  const hasCritical = findings.some((finding) => finding.severity === "critical");
  const verdict: Verdict = hasCritical || risk >= 50 ? "blocked" : risk >= 20 ? "flagged" : "allowed";

  return { verdict, risk, findings };
}

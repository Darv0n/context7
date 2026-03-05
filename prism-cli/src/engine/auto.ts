import type { Mode } from "../types.js";
import { MODES } from "../data/modes.js";

interface ModeScore {
  mode: Mode;
  score: number;
  matchedKeywords: string[];
}

const MODE_KEYWORDS: Record<string, string[]> = {
  DIG: [
    "pain", "problem", "frustrat", "complain", "bug", "broken",
    "workaround", "struggle", "drop off", "abandon", "churn",
    "support ticket", "rage", "angry", "confused", "stuck",
    "why do users", "root cause", "investigate", "research",
    "discover", "excavat", "signal", "symptom",
  ],
  SHAPE: [
    "design", "build", "architect", "feature", "flow",
    "prototype", "wireframe", "layout", "interaction", "ui",
    "ux", "interface", "component", "navigation", "structure",
    "create", "implement", "develop", "construct", "new feature",
    "information architecture", "decompose",
  ],
  SCOPE: [
    "scope", "priorit", "mvp", "mlp", "must have", "should have",
    "could have", "tradeoff", "trade-off", "cut", "defer",
    "backlog", "rice", "effort", "reach", "impact",
    "deadline", "constraint", "budget", "resource", "timeline",
    "negotiate", "cost of delay",
  ],
  MAP: [
    "user", "persona", "segment", "journey", "funnel",
    "adoption", "onboard", "retention", "cohort", "touchpoint",
    "awareness", "activation", "engagement", "referral",
    "power user", "casual user", "who are", "target audience",
    "customer", "user mapping", "churn predict",
  ],
  VFC: [
    "review", "audit", "validate", "comprehensive", "full review",
    "check", "assess", "evaluate", "ready to ship", "sign off",
    "quality", "complete", "launch review", "pre-launch",
    "feature review", "design review",
  ],
};

export function detectMode(task: string): ModeScore[] {
  const lower = task.toLowerCase();
  const scores: ModeScore[] = [];

  for (const [code, keywords] of Object.entries(MODE_KEYWORDS)) {
    const matched: string[] = [];
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        matched.push(kw);
      }
    }
    scores.push({
      mode: MODES[code]!,
      score: matched.length,
      matchedKeywords: matched,
    });
  }

  return scores.sort((a, b) => b.score - a.score);
}

export function autoSelectMode(task: string): Mode | null {
  const scores = detectMode(task);
  if (scores.length === 0 || scores[0]!.score === 0) {
    return null;
  }
  return scores[0]!.mode;
}

export function explainDetection(task: string): string {
  const scores = detectMode(task);
  const lines: string[] = [`Auto-detection for: "${task}"`, ""];

  for (const { mode, score, matchedKeywords } of scores) {
    if (score > 0) {
      lines.push(
        `  ${mode.icon} ${mode.code} (score: ${score}) — matched: ${matchedKeywords.join(", ")}`,
      );
    }
  }

  const selected = scores[0];
  if (selected && selected.score > 0) {
    lines.push("");
    lines.push(`  → Selected: ${selected.mode.code} ${selected.mode.name}`);
  } else {
    lines.push("  No strong match detected. Use a specific mode (VFC, DIG, SHAPE, SCOPE, MAP).");
  }

  return lines.join("\n");
}

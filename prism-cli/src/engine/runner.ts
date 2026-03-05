import type { Mode, ModeResult, ModeStepResult } from "../types.js";
import { createInterface, askMultiple, close } from "./prompt.js";
import { LENSES } from "../data/lenses.js";
import { REVIEWS } from "../data/reviews.js";

function buildPrismOutput(template: string, inputs: Record<string, string>): string {
  // Build contextual PRISM notation by weaving user inputs into the template
  let output = template;

  // Extract key themes from all answers combined
  const allInput = Object.values(inputs).join(" ");
  const words = allInput.split(/\s+/).filter((w) => w.length > 3);
  const themes = [...new Set(words.slice(0, 10))]; // top unique words as themes

  // Replace placeholder tokens with actual content summaries
  const placeholders = output.match(/[A-Z_]+(?=}|⊕|\)|\∧)/g) || [];
  for (const placeholder of placeholders) {
    // Find the most relevant answer for this placeholder based on the prompt context
    const promptEntries = Object.entries(inputs);
    if (promptEntries.length > 0) {
      const relevantAnswer = promptEntries[0]?.[1] || "";
      const summary =
        relevantAnswer.length > 60
          ? relevantAnswer.slice(0, 57) + "..."
          : relevantAnswer;
      if (summary) {
        output = output.replace(placeholder, placeholder + `[${summary}]`);
        break; // only replace first to keep notation readable
      }
    }
  }

  return output;
}

export async function runMode(mode: Mode, nonInteractive?: boolean): Promise<ModeResult> {
  const stepResults: ModeStepResult[] = [];

  if (nonInteractive) {
    // Non-interactive: return empty inputs with template output
    for (const step of mode.steps) {
      stepResults.push({
        step,
        inputs: {},
        prismOutput: step.outputTemplate,
      });
    }
    return {
      mode,
      stepResults,
      timestamp: new Date().toISOString(),
    };
  }

  const rl = createInterface();

  try {
    for (const step of mode.steps) {
      const lens = LENSES[step.lens];
      const icon = lens?.icon || "";
      const lensName = lens?.name || step.lens;

      // Print step header to stderr (so it's visible but doesn't pollute stdout)
      process.stderr.write(
        `\n${"═".repeat(60)}\n` +
          `  Step ${step.order}: ${step.title}\n` +
          `  ${icon} ${lensName} agent active\n` +
          `  Notation: ${step.notation}\n` +
          `${"─".repeat(60)}\n` +
          `  ${step.description}\n` +
          `${"─".repeat(60)}\n`,
      );

      const inputs = await askMultiple(rl, step.prompts);
      const prismOutput = buildPrismOutput(step.outputTemplate, inputs);

      stepResults.push({ step, inputs, prismOutput });

      process.stderr.write(`\n  PRISM Output:\n  ${prismOutput}\n`);
    }

    // If VFC mode, also display review checklist
    if (mode.code === "VFC") {
      process.stderr.write(
        `\n${"═".repeat(60)}\n  REVIEW CHECKLIST (3.01 ∥ 3.02 ∥ 3.03)\n${"═".repeat(60)}\n`,
      );
      for (const review of REVIEWS) {
        const lens = LENSES[review.lens];
        process.stderr.write(`\n  ${review.icon} ${review.id} ${review.name}:\n`);
        for (const check of review.checks) {
          process.stderr.write(`    ▸ ${check.name}: ${check.description}\n`);
          for (const criterion of check.criteria) {
            process.stderr.write(`      ☐ ${criterion}\n`);
          }
        }
      }
    }
  } finally {
    close(rl);
  }

  return {
    mode,
    stepResults,
    timestamp: new Date().toISOString(),
  };
}

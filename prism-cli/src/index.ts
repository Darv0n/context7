#!/usr/bin/env node
import { Command } from "commander";
import { renderOverview } from "./formatters/terminal.js";
import { handleSchema } from "./commands/schema.js";
import { handleLenses } from "./commands/lenses.js";
import { handleWorkflow } from "./commands/workflow.js";
import { handleModeInfo, handleModeRun, handleAutoRun, handleModesList } from "./commands/run.js";

const program = new Command()
  .name("prism")
  .version("1.0.0")
  .description("PRISM 1.0 — Product Research & Interaction Strategy Model")
  .option("--json", "Output in JSON format", false);

// Default: show overview
program.action((opts) => {
  console.log(renderOverview());
});

// ─── Reference Commands ───

program
  .command("schema [category]")
  .description("Show PRISM notation reference. Optionally specify a category code (e.g., PS, FA, UM)")
  .action((category: string | undefined, _opts, cmd) => {
    handleSchema(category, cmd.optsWithGlobals());
  });

program
  .command("lenses")
  .description("Show the 3 PRISM agent-lenses (Vexis, Formax, Cartex)")
  .action((_opts, cmd) => {
    handleLenses(cmd.optsWithGlobals());
  });

program
  .command("workflow")
  .description("Show the PRISM cognitive workflow cycle")
  .action((_opts, cmd) => {
    handleWorkflow(cmd.optsWithGlobals());
  });

program
  .command("modes")
  .description("List all operational modes")
  .action((_opts, cmd) => {
    handleModesList(cmd.optsWithGlobals());
  });

program
  .command("reviews")
  .description("Show the 3 PRISM review processes (3.01, 3.02, 3.03)")
  .action((_opts, cmd) => {
    const opts = cmd.optsWithGlobals();
    // Inline: render reviews
    import("./data/reviews.js").then(({ REVIEWS }) => {
      if (opts.json) {
        import("./formatters/json.js").then(({ reviewsToJson }) => {
          console.log(reviewsToJson(REVIEWS));
        });
      } else {
        import("./formatters/terminal.js").then(({ renderAllReviews }) => {
          console.log(renderAllReviews(REVIEWS));
        });
      }
    });
  });

// ─── Auto Mode ───

program
  .command("auto <task>")
  .description("Auto-detect the best mode from a task description and run it interactively")
  .action(async (task: string, _opts, cmd) => {
    await handleAutoRun(task, cmd.optsWithGlobals());
  });

// ─── Operational Modes ───
// Register each mode as both an info command and a runnable command

const MODE_CODES = ["VFC", "DIG", "SHAPE", "SCOPE", "MAP"];
const MODE_DESCRIPTIONS: Record<string, string> = {
  VFC: "Full Feature Design Review — all 3 lenses + review process",
  DIG: "Deep Pain Point Excavation — Vexis-led pain analysis",
  SHAPE: "Feature Architecture & Flow Design — all 3 lenses collaborate",
  SCOPE: "Scope Negotiation & Prioritization — Formax + Cartex",
  MAP: "User Mapping & Journey Analysis — Cartex + Vexis",
};

for (const code of MODE_CODES) {
  const modeCmd = program
    .command(code)
    .description(MODE_DESCRIPTIONS[code] || code)
    .option("--info", "Show mode details without running interactively", false);

  // Also register lowercase alias
  modeCmd.alias(code.toLowerCase());

  modeCmd.action(async (opts, cmd) => {
    const globalOpts = cmd.optsWithGlobals();
    if (opts.info) {
      handleModeInfo(code, globalOpts);
    } else {
      await handleModeRun(code, globalOpts);
    }
  });
}

// Parse with case-insensitive preprocessing
const argv = process.argv.map((arg, i) => {
  if (i === 2 && MODE_CODES.includes(arg.toUpperCase()) && !MODE_CODES.includes(arg)) {
    return arg.toUpperCase();
  }
  return arg;
});

program.parse(argv);

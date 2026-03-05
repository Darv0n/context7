import chalk from "chalk";
import type { Lens, SymbolCategory, Mode, ReviewProcess, WorkflowPhase, ModeResult } from "../types.js";
import { LENSES } from "../data/lenses.js";

// Lens colors
const LENS_COLORS: Record<string, (text: string) => string> = {
  vexis: chalk.hex("#FF6B6B"),
  formax: chalk.hex("#4ECDC4"),
  cartex: chalk.hex("#45B7D1"),
};

function lensColor(lensId: string): (text: string) => string {
  return LENS_COLORS[lensId] || chalk.white;
}

function lensTag(lensId: string): string {
  const lens = LENSES[lensId];
  if (!lens) return lensId;
  return lensColor(lensId)(`${lens.icon} ${lens.name}`);
}

function header(text: string): string {
  return chalk.bold.underline(text);
}

function sectionBar(): string {
  return chalk.dim("─".repeat(60));
}

function doubleBar(): string {
  return chalk.dim("═".repeat(60));
}

// ─── Overview ──────────────────────────────────

export function renderOverview(): string {
  const lines: string[] = [
    "",
    doubleBar(),
    chalk.bold("  PRISM 1.0 — Product Research & Interaction Strategy Model"),
    doubleBar(),
    "",
    "  Three agent-lenses collaborate to design features grounded in real pain:",
    "",
    `    ${lensTag("vexis")}  Research & Pain Discovery`,
    `    ${lensTag("formax")}  Feature Architecture & Building`,
    `    ${lensTag("cartex")}  User Mapping & Strategy`,
    "",
    chalk.bold("  Operational Modes:"),
    "",
    `    ${chalk.yellow("VFC")}    Full Feature Design Review (all lenses)`,
    `    ${chalk.yellow("DIG")}    Deep Pain Point Excavation (Vexis-led)`,
    `    ${chalk.yellow("SHAPE")}  Feature Architecture & Flow Design (all lenses)`,
    `    ${chalk.yellow("SCOPE")}  Scope Negotiation & Prioritization (Formax + Cartex)`,
    `    ${chalk.yellow("MAP")}    User Mapping & Journey Analysis (Cartex + Vexis)`,
    "",
    chalk.bold("  Reference Commands:"),
    "",
    `    ${chalk.cyan("prism schema")}       Show all 17 PRISM notation categories`,
    `    ${chalk.cyan("prism schema PS")}    Show a specific category in detail`,
    `    ${chalk.cyan("prism lenses")}       Show agent-lens details`,
    `    ${chalk.cyan("prism workflow")}     Show the cognitive workflow cycle`,
    "",
    chalk.bold("  Run a Mode:"),
    "",
    `    ${chalk.cyan('prism auto "task"')}  Auto-detect mode from task description`,
    `    ${chalk.cyan("prism VFC")}          Run a specific mode interactively`,
    `    ${chalk.cyan("prism DIG --json")}   Run mode with JSON output`,
    "",
    `  ${chalk.dim("PRISM notation chain: <H{Lens:Category(Symbol Operator Symbol)}>")}`  ,
    `  ${chalk.dim("Constructed on-the-fly for each unique product problem.")}`,
    "",
    doubleBar(),
    "",
  ];
  return lines.join("\n");
}

// ─── Lenses ────────────────────────────────────

export function renderLens(lens: Lens): string {
  const color = lensColor(lens.id);
  const lines: string[] = [
    "",
    color(`  ${lens.icon} ${lens.name}`),
    sectionBar(),
    `  ${lens.description}`,
    "",
    `  ${chalk.dim("Categories:")} ${lens.categories.map((c) => chalk.yellow(c)).join(", ")}`,
    "",
  ];
  return lines.join("\n");
}

export function renderAllLenses(lenses: Lens[]): string {
  const lines: string[] = [
    "",
    doubleBar(),
    chalk.bold("  PRISM Agent-Lenses"),
    doubleBar(),
  ];
  for (const lens of lenses) {
    lines.push(renderLens(lens));
  }
  lines.push(
    chalk.dim("  Lenses activate as sub-agents within each operational mode."),
    chalk.dim("  Each lens owns specific notation categories and review processes."),
    "",
  );
  return lines.join("\n");
}

// ─── Schema ────────────────────────────────────

export function renderCategorySummary(categories: SymbolCategory[]): string {
  const lines: string[] = [
    "",
    doubleBar(),
    chalk.bold("  PRISM 1.0 Schema — 17 Symbol Categories"),
    doubleBar(),
    "",
  ];

  for (const cat of categories) {
    const lensIcons = cat.lenses
      .map((l) => {
        const lens = LENSES[l];
        return lens ? lensColor(l)(lens.icon) : l;
      })
      .join("");
    lines.push(
      `  ${chalk.yellow.bold(cat.code.padEnd(4))} ${cat.name.padEnd(24)} ${lensIcons}  ${chalk.dim(`${cat.symbols.length} symbols`)}`,
    );
  }

  lines.push(
    "",
    chalk.dim("  Use `prism schema <CODE>` for full detail on any category."),
    "",
  );
  return lines.join("\n");
}

export function renderCategoryDetail(cat: SymbolCategory): string {
  const lensIcons = cat.lenses
    .map((l) => lensTag(l))
    .join(" ");

  const lines: string[] = [
    "",
    doubleBar(),
    `  ${chalk.yellow.bold(cat.code)} — ${chalk.bold(cat.name)}`,
    `  Lenses: ${lensIcons}`,
    doubleBar(),
    "",
  ];

  for (const sym of cat.symbols) {
    lines.push(
      `  ${chalk.cyan.bold(sym.notation.padEnd(4))} ${chalk.bold(sym.name)}`,
      `       ${sym.description}`,
      "",
    );
  }

  return lines.join("\n");
}

// ─── Modes ─────────────────────────────────────

export function renderMode(mode: Mode): string {
  const lensIcons = mode.lenses.map((l) => lensTag(l)).join(" + ");

  const lines: string[] = [
    "",
    doubleBar(),
    `  ${chalk.yellow.bold(mode.code)} — ${chalk.bold(mode.name)}  ${mode.icon}`,
    doubleBar(),
    "",
    `  ${mode.description}`,
    "",
    `  ${chalk.dim("Lenses:")} ${lensIcons}`,
    "",
    header("  Steps:"),
    "",
  ];

  for (const step of mode.steps) {
    const stepLens = LENSES[step.lens];
    const color = lensColor(step.lens);
    const icon = stepLens?.icon || "";

    lines.push(
      `  ${chalk.bold(`${step.order}.`)} ${color(`${icon} ${step.title}`)}`,
      `     ${chalk.dim("Notation:")} ${chalk.cyan(step.notation)}`,
      `     ${step.description}`,
      "",
      `     ${chalk.dim("Prompts:")}`,
    );
    for (const prompt of step.prompts) {
      lines.push(`       • ${prompt}`);
    }
    lines.push(
      "",
      `     ${chalk.dim("Output:")} ${chalk.cyan(step.outputTemplate)}`,
      "",
    );
  }

  return lines.join("\n");
}

export function renderModeList(modes: Mode[]): string {
  const lines: string[] = [
    "",
    doubleBar(),
    chalk.bold("  PRISM Operational Modes"),
    doubleBar(),
    "",
  ];

  for (const mode of modes) {
    const lensIcons = mode.lenses
      .map((l) => {
        const lens = LENSES[l];
        return lens ? lensColor(l)(lens.icon) : l;
      })
      .join("");
    lines.push(
      `  ${chalk.yellow.bold(mode.code.padEnd(6))} ${mode.name.padEnd(42)} ${lensIcons}`,
    );
  }

  lines.push(
    "",
    chalk.dim("  Use `prism <MODE>` to view details or run interactively."),
    "",
  );
  return lines.join("\n");
}

// ─── Reviews ───────────────────────────────────

export function renderReview(review: ReviewProcess): string {
  const color = lensColor(review.lens);
  const lines: string[] = [
    "",
    `  ${color(`${review.icon} ${review.id} ${review.name}`)}`,
    sectionBar(),
  ];

  for (const check of review.checks) {
    lines.push(
      `    ${chalk.bold(`▸ ${check.name}`)} — ${check.description}`,
    );
    for (const criterion of check.criteria) {
      lines.push(`      ${chalk.dim("☐")} ${criterion}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function renderAllReviews(reviews: ReviewProcess[]): string {
  const lines: string[] = [
    "",
    doubleBar(),
    chalk.bold("  PRISM Review Process (3.01 ∥ 3.02 ∥ 3.03)"),
    doubleBar(),
  ];

  for (const review of reviews) {
    lines.push(renderReview(review));
  }

  return lines.join("\n");
}

// ─── Workflow ──────────────────────────────────

export function renderWorkflow(phases: WorkflowPhase[]): string {
  const lines: string[] = [
    "",
    doubleBar(),
    chalk.bold("  PRISM Cognitive Workflow Cycle"),
    doubleBar(),
    "",
    chalk.dim("  🔬(PainDiscovery) → 🏗️(FeatureShaping) → 🧭(UserMapping)"),
    chalk.dim("  → 🔬🏗️(Validation) → 🏗️🧭(Scoping) → 🔬🏗️🧭(Ship&Learn) ↻"),
    "",
    sectionBar(),
    "",
  ];

  for (let i = 0; i < phases.length; i++) {
    const phase = phases[i]!;
    const lensIcons = phase.lenses.map((l) => lensTag(l)).join(" ");
    const arrow = i < phases.length - 1 ? "  │" : "  ↻ (loop back to Task)";

    lines.push(
      `  ${chalk.bold(`${phase.order}.`)} ${chalk.bold(phase.name)}  ${lensIcons}`,
      `     ${chalk.dim("Categories:")} ${phase.categories.map((c) => chalk.yellow(c)).join(", ")}`,
      `     ${phase.description}`,
      "",
      chalk.dim(arrow),
      "",
    );
  }

  return lines.join("\n");
}

// ─── Mode Result ───────────────────────────────

export function renderModeResult(result: ModeResult): string {
  const lines: string[] = [
    "",
    doubleBar(),
    chalk.bold(`  ${result.mode.code} — ${result.mode.name} — RESULTS`),
    chalk.dim(`  ${result.timestamp}`),
    doubleBar(),
    "",
  ];

  for (const stepResult of result.stepResults) {
    const color = lensColor(stepResult.step.lens);
    lines.push(
      color(`  Step ${stepResult.step.order}: ${stepResult.step.title}`),
      sectionBar(),
    );

    if (Object.keys(stepResult.inputs).length > 0) {
      for (const [prompt, answer] of Object.entries(stepResult.inputs)) {
        lines.push(
          `  ${chalk.dim("Q:")} ${prompt}`,
          `  ${chalk.white("A:")} ${answer}`,
          "",
        );
      }
    }

    lines.push(
      `  ${chalk.cyan("PRISM:")} ${stepResult.prismOutput}`,
      "",
    );
  }

  lines.push(doubleBar(), "");
  return lines.join("\n");
}

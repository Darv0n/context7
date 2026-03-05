import type { OutputOptions } from "../types.js";
import { getMode, getAllModes } from "../data/modes.js";
import { REVIEWS } from "../data/reviews.js";
import { autoSelectMode, explainDetection } from "../engine/auto.js";
import { runMode } from "../engine/runner.js";
import { renderMode, renderModeList, renderModeResult, renderAllReviews } from "../formatters/terminal.js";
import { modeToJson, modesToJson, resultToJson, reviewsToJson } from "../formatters/json.js";

export function handleModeInfo(code: string, opts: OutputOptions): void {
  const mode = getMode(code);
  if (!mode) {
    console.error(`Unknown mode: "${code}". Valid modes: VFC, DIG, SHAPE, SCOPE, MAP`);
    process.exit(1);
  }

  if (opts.json) {
    const data: Record<string, unknown> = { mode };
    if (mode.code === "VFC") {
      data.reviews = REVIEWS;
    }
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.log(renderMode(mode));
    if (mode.code === "VFC") {
      console.log(renderAllReviews(REVIEWS));
    }
  }
}

export async function handleModeRun(code: string, opts: OutputOptions): Promise<void> {
  const mode = getMode(code);
  if (!mode) {
    console.error(`Unknown mode: "${code}". Valid modes: VFC, DIG, SHAPE, SCOPE, MAP`);
    process.exit(1);
  }

  const result = await runMode(mode);

  if (opts.json) {
    console.log(resultToJson(result));
  } else {
    console.log(renderModeResult(result));
  }
}

export async function handleAutoRun(task: string, opts: OutputOptions): Promise<void> {
  if (!opts.json) {
    console.log("\n" + explainDetection(task));
  }

  const mode = autoSelectMode(task);
  if (!mode) {
    if (opts.json) {
      console.log(JSON.stringify({ error: "No mode detected", task }, null, 2));
    } else {
      console.log("\n  No strong match. Specify a mode directly: prism run <VFC|DIG|SHAPE|SCOPE|MAP>");
    }
    process.exit(1);
  }

  const result = await runMode(mode);

  if (opts.json) {
    console.log(resultToJson(result));
  } else {
    console.log(renderModeResult(result));
  }
}

export function handleModesList(opts: OutputOptions): void {
  const modes = getAllModes();
  if (opts.json) {
    console.log(modesToJson(modes));
  } else {
    console.log(renderModeList(modes));
  }
}

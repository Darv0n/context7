import type { OutputOptions } from "../types.js";
import { getAllLenses } from "../data/lenses.js";
import { renderAllLenses } from "../formatters/terminal.js";
import { lensesToJson } from "../formatters/json.js";

export function handleLenses(opts: OutputOptions): void {
  const lenses = getAllLenses();
  if (opts.json) {
    console.log(lensesToJson(lenses));
  } else {
    console.log(renderAllLenses(lenses));
  }
}

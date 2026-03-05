import type { OutputOptions } from "../types.js";
import { WORKFLOW } from "../data/workflow.js";
import { renderWorkflow } from "../formatters/terminal.js";
import { workflowToJson } from "../formatters/json.js";

export function handleWorkflow(opts: OutputOptions): void {
  if (opts.json) {
    console.log(workflowToJson(WORKFLOW));
  } else {
    console.log(renderWorkflow(WORKFLOW));
  }
}

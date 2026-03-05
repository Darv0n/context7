// PRISM 1.0 Type Definitions

export type LensId = "vexis" | "formax" | "cartex";

export interface Lens {
  id: LensId;
  name: string;
  icon: string;
  description: string;
  color: string; // hex color for chalk
  categories: string[]; // associated schema category codes
}

export interface Symbol {
  notation: string;
  name: string;
  description: string;
}

export interface SymbolCategory {
  code: string;
  name: string;
  lenses: LensId[]; // which lenses use this category
  symbols: Symbol[];
}

export interface ModeStep {
  order: number;
  title: string;
  lens: LensId;
  notation: string; // PRISM notation for this step
  description: string;
  prompts: string[]; // questions to ask the user
  outputTemplate: string; // PRISM notation template for output
}

export interface Mode {
  code: string;
  name: string;
  icon: string;
  description: string;
  lenses: LensId[];
  steps: ModeStep[];
}

export interface ReviewCheck {
  name: string;
  description: string;
  criteria: string[];
}

export interface ReviewProcess {
  id: string;
  name: string;
  lens: LensId;
  icon: string;
  checks: ReviewCheck[];
}

export interface WorkflowPhase {
  order: number;
  name: string;
  lenses: LensId[];
  categories: string[];
  description: string;
}

export interface OutputOptions {
  json: boolean;
}

export interface ModeStepResult {
  step: ModeStep;
  inputs: Record<string, string>;
  prismOutput: string;
}

export interface ModeResult {
  mode: Mode;
  stepResults: ModeStepResult[];
  timestamp: string;
}

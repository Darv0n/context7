import type { Lens, SymbolCategory, Mode, ReviewProcess, WorkflowPhase, ModeResult } from "../types.js";

export function toJson(data: unknown): string {
  return JSON.stringify(data, null, 2);
}

export function lensToJson(lens: Lens): string {
  return toJson(lens);
}

export function lensesToJson(lenses: Lens[]): string {
  return toJson(lenses);
}

export function categoryToJson(cat: SymbolCategory): string {
  return toJson(cat);
}

export function categoriesToJson(cats: SymbolCategory[]): string {
  return toJson(cats);
}

export function modeToJson(mode: Mode): string {
  return toJson(mode);
}

export function modesToJson(modes: Mode[]): string {
  return toJson(modes);
}

export function reviewsToJson(reviews: ReviewProcess[]): string {
  return toJson(reviews);
}

export function workflowToJson(phases: WorkflowPhase[]): string {
  return toJson(phases);
}

export function resultToJson(result: ModeResult): string {
  return toJson(result);
}

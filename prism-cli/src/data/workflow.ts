import type { WorkflowPhase } from "../types.js";

export const WORKFLOW: WorkflowPhase[] = [
  {
    order: 1,
    name: "Task",
    lenses: ["vexis"],
    categories: ["PS", "UR", "JF"],
    description:
      "🔬 Pain Discovery — Signal ⇉ Research ⇉ Synthesize. Capture pain signals (PS), conduct user research (UR), uncover jobs-to-be-done (JF). This is where everything begins: with real user pain.",
  },
  {
    order: 2,
    name: "Shape",
    lenses: ["vexis", "formax", "cartex"],
    categories: ["JF", "FA", "UM", "JM"],
    description:
      "🔬🏗️🧭 Feature Shaping — Define(Ĵ) ⇉ Architect(◆) ⇉ Map(◎⇉JM). Define jobs, architect features, and map users to journeys. All three lenses collaborate to shape the solution.",
  },
  {
    order: 3,
    name: "Validate",
    lenses: ["formax", "vexis"],
    categories: ["VF", "BH", "CL"],
    description:
      "🏗️🔬 Validation — Prototype(◁) ⇉ Test(⊞) ⇉ Iterate. Build prototypes, test with users, apply heuristic analysis and cognitive load checks. Iterate until validated.",
  },
  {
    order: 4,
    name: "Scope",
    lenses: ["formax", "cartex"],
    categories: ["PX", "SM"],
    description:
      "🏗️🧭 Scoping — Prioritize(PX) ⇉ Negotiate(SM) ⇉ Specify(FA). RICE scoring, MoSCoW framework, MVP/MLP boundaries. Cut ruthlessly to what matters.",
  },
  {
    order: 5,
    name: "Review",
    lenses: ["vexis", "formax", "cartex"],
    categories: ["PS", "FA", "IF", "UM", "AM", "IX"],
    description:
      "🔬🏗️🧭 Review — 3.01 Vexis ∥ 3.02 Formax ∥ 3.03 Cartex. All three review processes run in parallel. Pain validation, feature integrity, and user coverage must all pass.",
  },
  {
    order: 6,
    name: "Ship & Learn",
    lenses: ["formax", "vexis", "cartex"],
    categories: ["FL"],
    description:
      "🏗️🔬🧭 Ship & Learn — Build ⇉ Measure(FL(↻)) ⇉ Learn(FL(↺)) ↻ Task. Ship the feature, measure with quant signals (↻ metrics/dashboard/alert), learn from qual signals (↺ support/interviews/reviews), then loop back to Task with new signals.",
  },
];

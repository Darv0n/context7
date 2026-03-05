import type { Lens } from "../types.js";

export const LENSES: Record<string, Lens> = {
  vexis: {
    id: "vexis",
    name: "Vexis",
    icon: "🔬",
    description:
      "Research & Pain Discovery agent. Captures pain signals, validates root causes, conducts user research, uncovers jobs-to-be-done, and checks for cognitive biases. Vexis ensures every feature is grounded in real, validated user pain.",
    color: "#FF6B6B",
    categories: ["PS", "UR", "JF", "VF", "BH", "CL"],
  },
  formax: {
    id: "formax",
    name: "Formax",
    icon: "🏗️",
    description:
      "Feature Architecture & Building agent. Decomposes features into atomic primitives, architects interaction flows, designs information architecture, manages scope boundaries, and applies design heuristics. Formax builds what Vexis validates.",
    color: "#4ECDC4",
    categories: ["FA", "IF", "IA", "SM", "BH", "CL"],
  },
  cartex: {
    id: "cartex",
    name: "Cartex",
    icon: "🧭",
    description:
      "User Mapping & Strategy agent. Segments users, forges personas, maps journeys, models adoption funnels, assesses impact matrices, prioritizes with RICE/CoD, and monitors feedback loops. Cartex ensures the right users get the right value.",
    color: "#45B7D1",
    categories: ["UM", "JM", "AM", "IX", "PX", "FL"],
  },
};

export function getLens(id: string): Lens | undefined {
  return LENSES[id.toLowerCase()];
}

export function getAllLenses(): Lens[] {
  return Object.values(LENSES);
}

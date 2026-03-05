import type { ReviewProcess } from "../types.js";

export const REVIEWS: ReviewProcess[] = [
  {
    id: "3.01",
    name: "Vexis Review",
    lens: "vexis",
    icon: "🔬",
    checks: [
      {
        name: "PainValidation",
        description: "Signal quality and root cause depth",
        criteria: [
          "PS(Ψ) ⊢ Authentic ∩ ¬Anecdotal — signals are real, not cherry-picked",
          "ℜ Structural → Systemic fix; ℜ Surface → Reexamine deeper",
          "UR(Method) ⊢ Appropriate — qual (⊘⊙⊝) ∩ quant (⊛⊜) both represented",
          "Sample size ⊢ Confidence level justified",
        ],
      },
      {
        name: "JobsAudit",
        description: "Jobs alignment and competitive opportunity",
        criteria: [
          "JF(Ĵ) — every feature maps to ≥1 validated job-to-be-done",
          "∀feature: JobAligned? Proceed : Challenge",
          "Ĵ(Underserved) ⊢ Opportunity(PX(O)) — underserved jobs = opportunity",
        ],
      },
      {
        name: "BiasCheck",
        description: "Cognitive bias mitigation and assumption surfacing",
        criteria: [
          "BH(⊶) — check for confirmation, survivorship, selection bias in all research",
          "∀decision: Assumption made explicit and testable via VF",
          "Counter-evidence actively sought, not just confirming data",
        ],
      },
    ],
  },
  {
    id: "3.02",
    name: "Formax Review",
    lens: "formax",
    icon: "🏗️",
    checks: [
      {
        name: "FeatureIntegrity",
        description: "Decomposition completeness and IA coherence",
        criteria: [
          "FA(◆⊃◇⊃◈) ⊢ Atomic ∩ Complete ∧ ¬Bloat",
          "IF(⟿) — all paths covered: ⥤ happy, ⥢ error, ⥥ edge",
          "∀state: Handled ∧ ∀transition: Animated(CL(θ))",
          "IA(⋆ ⊢ High ∧ ⋄ ⊢ Aligned) — findable and matches mental model",
          "CL(η ⊢ Minimal ∧ κ ∧ λ) — extraneous load eliminated",
        ],
      },
      {
        name: "InteractionQuality",
        description: "Affordance clarity, error recovery, accessibility",
        criteria: [
          "BH(⊸) — every primitive has clear, consistent affordance",
          "IF(⥢⇉⟲) — every error is preventable, recoverable, or explainable",
          "CL(ι) WCAG(AA) ⊢ Minimum — perceivable, operable, understandable, robust",
        ],
      },
      {
        name: "ScopeAssessment",
        description: "Scope justification and MVP viability",
        criteria: [
          "SM(▣) Justified ∧ ¬Creep — no unjustified scope additions",
          "SM(▪) MVP — all core jobs addressed, functional",
          "FA(◊) — all constraints acknowledged and managed",
        ],
      },
    ],
  },
  {
    id: "3.03",
    name: "Cartex Review",
    lens: "cartex",
    icon: "🧭",
    checks: [
      {
        name: "UserCoverage",
        description: "Segment analysis and persona alignment",
        criteria: [
          "UM(◉) — all primary segments served, secondary segments not harmed",
          "UM(◎) — every persona has journey mapped and pain addressed",
          "UM(● ⊕ ○) — power users not overwhelmed, casual users not underwhelmed",
        ],
      },
      {
        name: "AdoptionForecast",
        description: "Funnel viability and retention mechanisms",
        criteria: [
          "AM(α⇉β⇉γ⇉δ) — no excessive drop-off at any stage",
          "AM(β) — aha moment reachable in ≤3 steps",
          "AM(δ) — habit loop sustainable and not manipulative",
        ],
      },
      {
        name: "ImpactAssessment",
        description: "Blast radius, cannibalization, and second-order effects",
        criteria: [
          "IX(⊕ ∧ ⊖) Net ⊢ Positive — benefits outweigh harm",
          "IX(⊗) — cannibalization of existing features is acceptable or intentional",
          "IX(⊚) — second-order effects predicted and monitored via FL(↻)",
        ],
      },
    ],
  },
];

export function getReview(id: string): ReviewProcess | undefined {
  return REVIEWS.find((r) => r.id === id);
}

export function getReviewByLens(lens: string): ReviewProcess | undefined {
  return REVIEWS.find((r) => r.lens === lens);
}

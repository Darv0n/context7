import type { Mode } from "../types.js";

export const MODES: Record<string, Mode> = {
  VFC: {
    code: "VFC",
    name: "Full Feature Design Review",
    icon: "🔬🏗️🧭",
    description:
      "Comprehensive review activating all three lenses in parallel. Vexis audits pain validation, jobs alignment, and bias. Formax audits feature integrity, interaction quality, and scope. Cartex audits user coverage, adoption forecast, and impact.",
    lenses: ["vexis", "formax", "cartex"],
    steps: [
      {
        order: 1,
        title: "Vexis🔬 Review & Pain Audit",
        lens: "vexis",
        notation: "PainValidation ∪ JobsAudit ∪ BiasCheck",
        description:
          "Validate signal quality (PS(Ψ) ⊢ Authentic ∩ ¬Anecdotal), root cause depth (ℜ structural vs surface), research rigor (UR method appropriateness), jobs alignment (JF(Ĵ) ⊢ feature aligned), and bias check (BH(⊶) mitigate confirmation/survivorship/selection).",
        prompts: [
          "What pain signals (complaints, behaviors, workarounds) led to this feature?",
          "What research methods validated these pain points? (interviews, analytics, surveys)",
          "What job-to-be-done does this feature address? (When ___, I want to ___, so that ___)",
          "What assumptions are you making that haven't been tested?",
        ],
        outputTemplate:
          "<H{🔬:PS(Ψ{SIGNALS}⇉℘{VALIDATED});UR({METHODS}⊢Confidence);JF(Ĵ{JTBD});BH(⊶{BIASES}⊢Mitigated)}>",
      },
      {
        order: 2,
        title: "Formax🏗️ Review & Feature Audit",
        lens: "formax",
        notation: "FeatureIntegrity ∪ InteractionQuality ∪ ScopeAssessment",
        description:
          "Audit decomposition (FA(◆⊃◇⊃◈) atomic and complete), flow completeness (IF(⟿) all paths covered), IA coherence, affordance clarity (BH(⊸)), error recovery (IF(⥢⇉⟲)), accessibility (CL(ι) WCAG AA), scope justified (SM(▣) ¬Creep), MVP viability (SM(▪)).",
        prompts: [
          "List the feature and its sub-features/primitives",
          "What are the happy path, error states, and edge cases?",
          "What scope boundaries have been set? (must/should/could/won't)",
          "What constraints exist? (technical, business, time)",
        ],
        outputTemplate:
          "<H{🏗️:FA(◆{FEATURE}⊃◇{SUBS}⊃◈{PRIMITIVES});IF(⟿{FLOW}∧⥢{ERRORS}∧⥥{EDGES});SM(▣{SCOPE}∧▪{MVP});CL(ι{A11Y})}>",
      },
      {
        order: 3,
        title: "Cartex🧭 Review & Impact Audit",
        lens: "cartex",
        notation: "UserCoverage ∪ AdoptionForecast ∪ ImpactAssessment",
        description:
          "Assess segment coverage (UM(◉) primary served, secondary not harmed), persona alignment (UM(◎) journeys mapped, pain addressed), edge users (●¬Overwhelm ∧ ○¬Underwhelm), funnel viability (AM(α⇉δ) no excessive drop-off), activation path (AM(β) aha ≤3 steps), blast radius (IX(⊕∧⊖) net positive), cannibalization (IX(⊗)), second-order effects (IX(⊚)).",
        prompts: [
          "Which user segments are affected? Who benefits, who might be harmed?",
          "What does the adoption funnel look like? (awareness → activation → engagement → retention)",
          "How will power users vs casual users experience this differently?",
          "What second-order effects or cannibalization risks exist?",
        ],
        outputTemplate:
          "<H{🧭:UM(◉{SEGMENTS}⊃◎{PERSONAS});AM(α{AWARE}⇉β{ACTIVATE}⇉γ{ENGAGE}⇉δ{RETAIN});IX(⊕{POSITIVE}∧⊖{NEGATIVE}∧⊚{RIPPLE})}>",
      },
    ],
  },

  DIG: {
    code: "DIG",
    name: "Deep Pain Point Excavation",
    icon: "🔬",
    description:
      "Vexis-primary mode for deep excavation of user pain. Captures raw signals, validates through research, traces root causes, uncovers jobs, scores opportunities, then hands off to Cartex for segment quantification.",
    lenses: ["vexis", "cartex"],
    steps: [
      {
        order: 1,
        title: "Vexis🔬 Signal & RootCause",
        lens: "vexis",
        notation: "PS(Ψ⇉℘⇉ℜ) ∪ UR(⊙⊕⊘⊕⊜)",
        description:
          "Capture pain signals (Ψ explicit + implicit), validate into pain points (℘ repeatable ∩ impactful), trace root causes (ℜ via 5Whys/Fishbone/SystemsMap — structural vs situational vs perceptual), and map workarounds (Ω compensatory behaviors, fragility assessment).",
        prompts: [
          "What pain signals have you observed? (complaints, abandonment, rage clicks, workarounds)",
          "Which signals are explicit (tickets, requests) vs implicit (behavior anomalies)?",
          "What workarounds do users currently employ? How fragile are they?",
          "What research has been done? (observation, interviews, analytics)",
        ],
        outputTemplate:
          "<H{🔬:PS(Ψ{SIGNALS}⇉℘{VALIDATED(⊢Repeatable∩Impactful)});PS(ℜ{ROOTCAUSE(5Whys)});PS(Ω{WORKAROUNDS⊢Fragile?});UR({METHODS})}>",
      },
      {
        order: 2,
        title: "Vexis🔬 Jobs & Opportunity",
        lens: "vexis",
        notation: "JF(Ĵ{Discover}) ∪ PX(O{Score})",
        description:
          "Discover jobs-to-be-done (Ĵ When/Want/SoThat), decompose into functional (F), emotional (E), and social (S) jobs, map hiring criteria (H pull forces) vs firing criteria (R push-back), and score opportunity (importance − current satisfaction).",
        prompts: [
          "What job is the user trying to get done? (When ___, I want ___, so that ___)",
          "What are the functional, emotional, and social dimensions?",
          "What pulls users toward a solution? What pushes them back? (anxiety, habits, switching cost)",
          "How important is this job vs how satisfied are users currently?",
        ],
        outputTemplate:
          "<H{🔬:JF(Ĵ{JTBD}⊃F{FUNCTIONAL}⊕E{EMOTIONAL}⊕S{SOCIAL});JF(H{PULL}⇄R{PUSHBACK});PX(O{Importance−Satisfaction=SCORE})}>",
      },
      {
        order: 3,
        title: "Cartex🧭 Segment & Quantify",
        lens: "cartex",
        notation: "UM(◉{Affected}) ∪ PS(ℑ{Quantify})",
        description:
          "Identify affected segments (◉ behavioral/demographic/psychographic), quantify impact magnitude (ℑ severity × frequency × reach), map the pain across the user spectrum (● power users vs ○ casual users), and produce a PainScore.",
        prompts: [
          "Which user segments experience this pain? (by behavior, role, industry, plan tier)",
          "Rate the severity (1-10), frequency (daily/weekly/monthly), and reach (% of users)",
          "Do power users and casual users experience this differently?",
          "What's the business impact? (churn risk, support cost, revenue)",
        ],
        outputTemplate:
          "<H{🧭:UM(◉{SEGMENTS}∧●{POWER}∧○{CASUAL});PS(ℑ{Severity(S)×Frequency(F)×Reach(R)=PAINSCORE})}>",
      },
    ],
  },

  SHAPE: {
    code: "SHAPE",
    name: "Feature Architecture and Flow Design",
    icon: "🏗️🔬🧭",
    description:
      "All three lenses collaborate. Formax leads with decomposition and flow architecture, Vexis validates with heuristics and cognitive load analysis, Cartex maps users and forecasts adoption and impact.",
    lenses: ["formax", "vexis", "cartex"],
    steps: [
      {
        order: 1,
        title: "Formax🏗️ Decompose & Flow",
        lens: "formax",
        notation: "FA(◆⊃◇⊃◈) ∪ IF(⟿{AllPaths}) ∪ IA(⊞∧⋆)",
        description:
          "Decompose feature (◆) into sub-features (◇) and interaction primitives (◈). Architect full flow path (⟿ entry→steps→exit) with happy path (⥤), error states (⥢), edge cases (⥥), and recovery (⟲). Design information architecture (⊞ hierarchy, ⊡ hub-spoke, ⋆ findability).",
        prompts: [
          "What is the core feature? Break it into sub-features and interaction primitives",
          "Describe the flow: entry point → steps → exit. What triggers it?",
          "What are the error states and how should recovery work?",
          "What edge cases exist? (empty state, overload, offline, first-use, concurrent)",
        ],
        outputTemplate:
          "<H{🏗️:FA(◆{FEATURE}⊃◇{SUBS}⊃◈{PRIMITIVES});IF(⟿{FLOW}∧⥤{HAPPY}∧⥢{ERROR}∧⥥{EDGE}∧⟲{RECOVER});IA(⊞{STRUCTURE}∧⋆{FINDABILITY})}>",
      },
      {
        order: 2,
        title: "Vexis🔬 Validate & Heuristic",
        lens: "vexis",
        notation: "BH(⊷{NielsenAudit}) ∪ CL(ω∧η∧κ∧λ)",
        description:
          "Apply Nielsen's heuristics audit (⊷ visibility, match, control, consistency, prevention, recognition, flexibility, aesthetic, recovery, help). Analyze cognitive load (ω intrinsic — manage, η extraneous — eliminate, κ Hick's law — reduce options, λ Miller's law — chunk info).",
        prompts: [
          "Walk through Nielsen's 10 heuristics against this design — any violations?",
          "What's the intrinsic complexity that can't be reduced?",
          "What extraneous complexity can be eliminated? (unnecessary steps, confusing UI)",
          "How many choices does the user face at each step? Can we chunk or reduce?",
        ],
        outputTemplate:
          "<H{🔬:BH(⊷{HEURISTIC_AUDIT});CL(ω{INTRINSIC}∧η{EXTRANEOUS⊢Eliminate}∧κ{Choices}∧λ{Chunks})}>",
      },
      {
        order: 3,
        title: "Cartex🧭 Map & Forecast",
        lens: "cartex",
        notation: "UM(◎⇉JM(τ)) ∪ AM(α⇉ζ{Predict}) ∪ IX(⊕∧⊖∧⊚)",
        description:
          "Map personas to journey touchpoints (◎→JM(τ)), identify moments of truth (μ), friction (φ), and delight (δ). Model the adoption funnel (α awareness → ζ expansion). Assess impact matrix (⊕ positive, ⊖ negative, ⊚ ripple effects).",
        prompts: [
          "Map each persona's journey through this feature — touchpoints, feelings, decisions",
          "Where are the moments of truth? Where might users drop off?",
          "Model the adoption funnel: how do users discover → activate → engage → retain → refer?",
          "What's the net impact? Any cannibalization of existing features? Second-order effects?",
        ],
        outputTemplate:
          "<H{🧭:UM(◎{PERSONAS}⇉JM(τ{TOUCHPOINTS}∧μ{MOT}∧φ{FRICTION}));AM(α⇉β⇉γ⇉δ⇉ε⇉ζ{FUNNEL});IX(⊕{POS}∧⊖{NEG}∧⊚{RIPPLE})}>",
      },
    ],
  },

  SCOPE: {
    code: "SCOPE",
    name: "Scope Negotiation and Prioritization",
    icon: "🏗️🧭",
    description:
      "Formax and Cartex collaborate. Formax sets scope boundaries and MVP/MLP definitions. Cartex prioritizes with RICE scoring, cost of delay, and impact analysis. Formax guards against scope creep and produces final spec.",
    lenses: ["formax", "cartex"],
    steps: [
      {
        order: 1,
        title: "Formax🏗️ Boundary & MVP",
        lens: "formax",
        notation: "SM(◻⊕◼⊕◽⊕◾) ∪ SM(▪{MVP}∧▫{MLP})",
        description:
          "Apply MoSCoW framework: ◻ must-have (¬ship⟹failure), ◼ should-have (¬ship⟹degraded), ◽ could-have (¬ship⟹acceptable), ◾ won't-have (deferred). Define MVP boundary (▪ minimum viable — all core jobs addressed) and MLP boundary (▫ minimum lovable — MVP + delight + zero extraneous CL).",
        prompts: [
          "List all proposed features/items for this release",
          "Categorize each: must-have, should-have, could-have, won't-have — and justify",
          "What is the minimum set needed to test the core hypothesis? (MVP)",
          "What additional items make it lovable? (MLP = MVP + delight)",
        ],
        outputTemplate:
          "<H{🏗️:SM(◻{MUST}⊕◼{SHOULD}⊕◽{COULD}⊕◾{WONT});SM(▪{MVP({ITEMS})}∧▫{MLP({ITEMS})})}>",
      },
      {
        order: 2,
        title: "Cartex🧭 Prioritize & Impact",
        lens: "cartex",
        notation: "PX(R×I×C÷E) ∪ IX(Net) ∪ PX(D{CostOfDelay})",
        description:
          "RICE score each item (R reach × I impact × C confidence ÷ E effort). Calculate cost of delay (D revenue lost, churn risk, competitive gap, compliance deadline). Assess net impact (IX ⊕ positive − ⊖ negative ⊢ ship or not).",
        prompts: [
          "For each must/should item: estimate reach (users/quarter), impact (1-3), confidence (0.5-1), effort (person-weeks)",
          "What's the cost of NOT shipping each item? (revenue, churn, competitive, compliance)",
          "What's the net impact? Who benefits, who's harmed?",
          "Are there items where delay is acceptable vs items with hard deadlines?",
        ],
        outputTemplate:
          "<H{🧭:PX(R{REACH}×I{IMPACT}×C{CONF}÷E{EFFORT}⊢Score{ITEMS});PX(D{DELAY_COSTS});IX(⊕{POS}−⊖{NEG}⊢Net{VERDICT})}>",
      },
      {
        order: 3,
        title: "Formax🏗️ Guard & Specify",
        lens: "formax",
        notation: "SM(CreepGuard) ∪ FA(◆{FinalSpec})",
        description:
          "Apply scope creep guard: every proposed addition must map to a validated job (∀◆(Proposed): ◆⊢Ĵ(Validated) → Evaluate(PX), else Reject∨Backlog). Produce final feature spec (◆ who/what/why/when/how/measure).",
        prompts: [
          "Review: does every item in scope map to a validated job-to-be-done?",
          "Are there any items that crept in without validation? (flag for removal/backlog)",
          "Produce the final spec: for each feature — who, what, why, when, how, success metric",
          "What constraints (technical, business, time) bound the final scope?",
        ],
        outputTemplate:
          "<H{🏗️:SM(CreepGuard{∀◆⊢Ĵ?{PASS}:{REJECT}});FA(◆{SPEC(Who⊕What⊕Why⊕When⊕How⊕Measure)});FA(◊{CONSTRAINTS})}>",
      },
    ],
  },

  MAP: {
    code: "MAP",
    name: "User Mapping and Journey Analysis",
    icon: "🧭🔬",
    description:
      "Cartex leads with user segmentation, persona forging, and adoption modeling. Vexis contributes journey friction analysis and pain mapping. Together they produce a complete picture of who the users are, how they move through the product, and where value is created or lost.",
    lenses: ["cartex", "vexis"],
    steps: [
      {
        order: 1,
        title: "Cartex🧭 Segment & Persona",
        lens: "cartex",
        notation: "UM(◉{Cluster}⇉◎{Forge}) ∪ UM(●∧○{Spectrum})",
        description:
          "Discover segments (◉ behavioral/demographic/psychographic, cluster analysis). Forge personas (◎ archetype with name, goal, pain, context, behavior, quote — ≤5 personas, each mapping to primary jobs). Map the power user (●) to casual user (○) spectrum.",
        prompts: [
          "Who are your users? Describe by behavior, demographics, and motivations",
          "Identify 3-5 key personas — for each: name, primary goal, main pain, context, typical behavior",
          "How do power users differ from casual users in your product?",
          "What cohorts matter? (signup date, plan tier, tenure, geography)",
        ],
        outputTemplate:
          "<H{🧭:UM(◉{SEGMENTS(Behavioral⊕Demographic⊕Psychographic)}⇉◎{PERSONAS});UM(●{POWER}∧○{CASUAL}∧⊛{COHORTS})}>",
      },
      {
        order: 2,
        title: "Vexis🔬 Journey & Friction",
        lens: "vexis",
        notation: "JM(τ⇉μ⇉φ) ∪ PS(℘{JourneyPain})",
        description:
          "Map journeys per persona: touchpoints (τ channel×action×thought×feeling), moments of truth (μ first impression, aha, commit, renew, recover), friction points (φ wait/confusion/effort/anxiety/repetition ⊢ PS(℘)), delight moments (δ), and channel switch points (σ seamless vs friction).",
        prompts: [
          "For your primary persona, walk through their journey — every touchpoint from discovery to daily use",
          "Where are the moments of truth? (first impression, aha moment, commit, renewal)",
          "Where is there friction? (waiting, confusion, extra effort, anxiety, repetition)",
          "Where are there delightful moments? Where do channel switches happen?",
        ],
        outputTemplate:
          "<H{🔬:JM(τ{TOUCHPOINTS}⇉μ{MOMENTS_OF_TRUTH}⇉φ{FRICTION});PS(℘{JOURNEY_PAIN});JM(δ{DELIGHT}∧σ{SWITCHES})}>",
      },
      {
        order: 3,
        title: "Cartex🧭 Adopt & Churn",
        lens: "cartex",
        notation: "AM(α⇉ζ{FunnelModel}) ∪ FL(⇊{ChurnPredict}∧⇈{GrowthSignal})",
        description:
          "Model the full adoption funnel (α aware → β activate → γ engage → δ retain → ε refer → ζ expand). Track cohorts through the funnel. Predict churn signals (⇊ usage decline, NPS detractor, support spike, competitor mention) and growth signals (⇈ usage surge, referral, expansion).",
        prompts: [
          "How do users become aware of your product/feature?",
          "What's the activation moment? How quickly do users reach first value?",
          "What drives ongoing engagement? What's the habit loop (trigger → action → reward)?",
          "What churn signals have you observed? What growth signals?",
        ],
        outputTemplate:
          "<H{🧭:AM(α{AWARE}⇉β{ACTIVATE}⇉γ{ENGAGE}⇉δ{RETAIN}⇉ε{REFER}⇉ζ{EXPAND});FL(⇊{CHURN_SIGNALS}∧⇈{GROWTH_SIGNALS})}>",
      },
    ],
  },
};

export function getMode(code: string): Mode | undefined {
  return MODES[code.toUpperCase()];
}

export function getAllModes(): Mode[] {
  return Object.values(MODES);
}

export function getModeCodes(): string[] {
  return Object.keys(MODES);
}

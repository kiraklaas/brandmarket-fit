export type Dimension =
  | "Clarity"
  | "Differentiation"
  | "Resonance"
  | "Consistency"
  | "Governance";

export const DIMENSIONS: Dimension[] = [
  "Clarity",
  "Differentiation",
  "Resonance",
  "Consistency",
  "Governance",
];

export interface Brand {
  name: string;
  domain: string;
  scores: Record<Dimension, number>;
  rationale: Partial<Record<Dimension, string>>;
}

export interface BrandCategory {
  id: string;
  label: string;
  brands: Brand[];
}

export const BRAND_CATEGORIES: BrandCategory[] = [
  {
    id: "productivity",
    label: "Productivity & Collaboration",
    brands: [
      {
        name: "Notion",
        domain: "notion.so",
        scores: {
          Clarity: 4,
          Differentiation: 5,
          Resonance: 5,
          Consistency: 4,
          Governance: 3,
        },
        rationale: {
          Clarity: "Customers know what Notion is and who it's for — 'connected workspace' has stuck.",
          Differentiation:
            "Owns 'creativity and self-expression' in a category that talks only about productivity. No direct emotional competitor.",
          Resonance:
            "Identity language is everywhere — 'I'm a Notion person' is a real thing people say.",
          Consistency:
            "Marketing, product, and community all speak the same language, but occasional enterprise drift.",
          Governance:
            "Brand has scaled widely but internal governance varies — inconsistency creeps in with growth.",
        },
      },
      {
        name: "Linear",
        domain: "linear.app",
        scores: {
          Clarity: 5,
          Differentiation: 5,
          Resonance: 4,
          Consistency: 5,
          Governance: 4,
        },
        rationale: {
          Clarity:
            "Extraordinarily clear — built for teams that care about craft. No ambiguity about the ICP.",
          Differentiation:
            "Owns 'craft and taste' in a project management category full of feature bloat. Entirely distinct positioning.",
          Resonance:
            "Strong community affinity — developers and designers actively evangelize. Not yet mass-market emotional pull.",
          Consistency:
            "Every touchpoint — docs, changelog, social, product UI — speaks in the same opinionated, craft-obsessed voice.",
          Governance:
            "Small, focused team means brand governance is tighter than most. Clear decision-making.",
        },
      },
      {
        name: "ClickUp",
        domain: "clickup.com",
        scores: {
          Clarity: 3,
          Differentiation: 2,
          Resonance: 2,
          Consistency: 3,
          Governance: 3,
        },
        rationale: {
          Clarity:
            "'One app to replace them all' is clear but generic — feature positioning, not brand positioning.",
          Differentiation:
            "Positions on feature breadth, not identity. Messaging is interchangeable with Monday.com.",
          Resonance:
            "Functional and utilitarian. Users choose it for features, not for who ClickUp is.",
          Consistency:
            "Consistent in tone (energetic, feature-forward) but tone itself isn't differentiated.",
          Governance:
            "Systems exist but brand is defined by product roadmap, not narrative.",
        },
      },
      {
        name: "Asana",
        domain: "asana.com",
        scores: {
          Clarity: 4,
          Differentiation: 3,
          Resonance: 3,
          Consistency: 4,
          Governance: 4,
        },
        rationale: {
          Clarity: "Clear category positioning — work management for teams. The mission-driven angle adds dimension.",
          Differentiation:
            "Mission-driven brand is distinct, but in practice messaging often sounds like other enterprise tools.",
          Resonance:
            "Clear and professional, but doesn't create strong emotional connection or identity for its users.",
          Consistency:
            "Disciplined brand execution — consistent visual system and tone across marketing.",
          Governance:
            "Enterprise brand processes in place. Strong guidelines and reasonable adherence.",
        },
      },
      {
        name: "Monday.com",
        domain: "monday.com",
        scores: {
          Clarity: 3,
          Differentiation: 2,
          Resonance: 2,
          Consistency: 3,
          Governance: 4,
        },
        rationale: {
          Clarity:
            "Work OS positioning is broad — works for enterprise sales, but doesn't carve clear emotional territory.",
          Differentiation:
            "Heavily feature-driven. Nearly indistinguishable from ClickUp at the brand level.",
          Resonance:
            "TV-scale advertising creates awareness but not affinity. Users are customers, not advocates.",
          Consistency:
            "Marketing is consistent in visual execution but emotionally generic.",
          Governance:
            "Large brand team with strong systems — governance is mature even if the brand itself isn't distinctive.",
        },
      },
    ],
  },
  {
    id: "ai-notetakers",
    label: "AI Notetakers",
    brands: [
      {
        name: "Granola",
        domain: "granola.ai",
        scores: {
          Clarity: 5,
          Differentiation: 5,
          Resonance: 4,
          Consistency: 4,
          Governance: 3,
        },
        rationale: {
          Clarity:
            "Immediately legible — beautiful, taste-forward AI notes for professionals. No confusion about what it is.",
          Differentiation:
            "Built a distinct design-forward identity in a category that looks like enterprise software. Feels like a consumer product used by taste-forward professionals.",
          Resonance:
            "Strong advocacy from users who identify with the aesthetic. 'I'm a Granola person' is emerging.",
          Consistency:
            "Product, marketing, and community feel like the same brand. Small team, tight execution.",
          Governance:
            "Early-stage — brand is strong but systems are still maturing with scale.",
        },
      },
      {
        name: "Fathom",
        domain: "fathom.video",
        scores: {
          Clarity: 4,
          Differentiation: 3,
          Resonance: 3,
          Consistency: 4,
          Governance: 3,
        },
        rationale: {
          Clarity:
            "'The meeting recorder people actually love' is sharp — but the emotional territory beyond that is underdeveloped.",
          Differentiation:
            "Warm, human positioning stands out in a cold category, but competitors are catching up on tone.",
          Resonance:
            "Users do say they love it — but brand identity hasn't been built around that love yet.",
          Consistency:
            "Consistent warmth across product and marketing. Voice is recognizable.",
          Governance: "Small team, good instincts, but informal brand governance.",
        },
      },
      {
        name: "Otter.ai",
        domain: "otter.ai",
        scores: {
          Clarity: 3,
          Differentiation: 2,
          Resonance: 2,
          Consistency: 3,
          Governance: 3,
        },
        rationale: {
          Clarity:
            "Category-clear but not brand-clear. You know what it does, not what it stands for.",
          Differentiation:
            "Functional and utilitarian. Users choose it; they don't advocate for it.",
          Resonance:
            "No emotional vocabulary. The product is the product — the brand has no persona.",
          Consistency:
            "Consistent in a generic enterprise software way. Nothing distinctive.",
          Governance: "Brand processes exist but serve compliance, not differentiation.",
        },
      },
      {
        name: "Fireflies",
        domain: "fireflies.ai",
        scores: {
          Clarity: 3,
          Differentiation: 2,
          Resonance: 2,
          Consistency: 3,
          Governance: 2,
        },
        rationale: {
          Clarity: "The name is memorable but the brand promise isn't. Hard to say what Fireflies stands for.",
          Differentiation:
            "Effectively identical to Otter at the brand level. Feature-driven differentiation only.",
          Resonance:
            "Utility product. No emotional connection built into the brand narrative.",
          Consistency: "Inconsistent across touchpoints — product, marketing, and support don't feel unified.",
          Governance:
            "Weak brand governance — different voices across channels, no clear brand owner.",
        },
      },
      {
        name: "Krisp",
        domain: "krisp.ai",
        scores: {
          Clarity: 4,
          Differentiation: 3,
          Resonance: 3,
          Consistency: 3,
          Governance: 3,
        },
        rationale: {
          Clarity: "'Noise cancellation' is a clear, ownable job-to-be-done. Clean positioning.",
          Differentiation:
            "Owns noise cancellation but expanding into meetings makes positioning murkier.",
          Resonance:
            "Clear functional value — not yet building emotional connection or identity.",
          Consistency:
            "Consistent in product marketing but drifts when scope expands beyond core use case.",
          Governance: "Mid-market brand governance. Functional but not strategic.",
        },
      },
    ],
  },
  {
    id: "fintech",
    label: "Fintech / Business Finance",
    brands: [
      {
        name: "Brex",
        domain: "brex.com",
        scores: {
          Clarity: 5,
          Differentiation: 5,
          Resonance: 4,
          Consistency: 4,
          Governance: 4,
        },
        rationale: {
          Clarity:
            "Built for ambitious companies — clear, specific ICP. You know exactly who Brex is for.",
          Differentiation:
            "Owns 'ambition' — positioning around the type of company that uses Brex, not just the product. The aspiration is the brand.",
          Resonance:
            "Founders and CFOs identify with the 'ambitious company' framing. Creates real in-group affiliation.",
          Consistency:
            "Brand is consistent in marketing but enterprise expansion has created some dilution.",
          Governance:
            "Strong brand governance — design system and voice are mature and enforced.",
        },
      },
      {
        name: "Ramp",
        domain: "ramp.com",
        scores: {
          Clarity: 5,
          Differentiation: 4,
          Resonance: 3,
          Consistency: 5,
          Governance: 5,
        },
        rationale: {
          Clarity:
            "Spend less, do more — extraordinarily clear. The brand promise is the product promise.",
          Differentiation:
            "Efficiency-first positioning is distinct in a category that talks about empowerment. But efficiency is a functional, not emotional, differentiator.",
          Resonance:
            "Clear and credible, but deliberately emotionally flat — the brand says 'efficiency,' not 'identity.' Works for the ICP, but limits evangelism.",
          Consistency:
            "Exceptionally disciplined — every touchpoint (product, comms, GTM) reinforces the same efficiency-first narrative.",
          Governance:
            "Best-in-class brand governance for a company at this stage. Clear ownership, strong systems.",
        },
      },
      {
        name: "Mercury",
        domain: "mercury.com",
        scores: {
          Clarity: 4,
          Differentiation: 4,
          Resonance: 4,
          Consistency: 4,
          Governance: 3,
        },
        rationale: {
          Clarity: "Banking built for startups — clear ICP, clear promise. The design reinforces the message.",
          Differentiation:
            "Taste and design quality as brand differentiators in a category of boring banks. Genuinely distinct.",
          Resonance:
            "Design quality and taste signal create strong affinity with founder/startup audience.",
          Consistency:
            "Strong consistency in product and marketing. Voice and aesthetic hold up across touchpoints.",
          Governance:
            "Good instincts but governance is still maturing — inconsistency at the edges.",
        },
      },
      {
        name: "Rippling",
        domain: "rippling.com",
        scores: {
          Clarity: 4,
          Differentiation: 3,
          Resonance: 3,
          Consistency: 4,
          Governance: 4,
        },
        rationale: {
          Clarity:
            "HR and IT unified — a clear compound promise. Parker Conrad's narrative has become the brand narrative.",
          Differentiation:
            "Compound product strategy is genuinely unique, but the brand expression is more conventional than the product.",
          Resonance:
            "Strong with ops-minded buyers — not a brand users identify with emotionally.",
          Consistency:
            "Disciplined execution across a large surface area — consistent brand despite product complexity.",
          Governance:
            "Mature brand governance commensurate with company size.",
        },
      },
      {
        name: "Stripe",
        domain: "stripe.com",
        scores: {
          Clarity: 5,
          Differentiation: 4,
          Resonance: 4,
          Consistency: 5,
          Governance: 5,
        },
        rationale: {
          Clarity:
            "The best writing in B2B software. Everything Stripe publishes is so clear it has been studied as a brand case study.",
          Differentiation:
            "'Increase the GDP of the internet' is distinctive — but at Stripe's scale, others have started to emulate the voice.",
          Resonance:
            "Developer identity is deeply tied to Stripe — a brand engineers actively choose and recommend.",
          Consistency:
            "Benchmark-setting consistency across a massive global surface area. Product, docs, marketing — all unmistakably Stripe.",
          Governance:
            "Gold standard brand governance. Brand has held for 15 years of hypergrowth.",
        },
      },
    ],
  },
];

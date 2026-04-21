export interface DimensionInfo {
  key: string;
  name: string;
  definition: string;
  strongSignal: string;
  icon: string; // emoji placeholder; swap for SVG icons later
  interpretations: Record<number, string>;
}

export const DIMENSIONS_INFO: DimensionInfo[] = [
  {
    key: "clarity",
    name: "Clarity",
    definition: "Does your market immediately understand what you stand for?",
    strongSignal: "Customers describe your brand in consistent terms without prompting",
    icon: "◎",
    interpretations: {
      1: "Your team and your market are talking about you in different languages. Fix this before any execution work. Start: have your 5 most senior people independently write a one-sentence description of the company, then reconcile.",
      2: "Rough shape of a story exists, but words aren't shared. Get leadership aligned on one sentence before investing in creative.",
      3: "You have a message, but it's not yet sticky enough to be repeated back to you. Watch your next 10 sales calls for how prospects describe you — if they paraphrase instead of echo, you have a phrasing problem, not a strategy one.",
      4: "Your positioning is doing work. Next move: monitor branded search growth in Google Search Console and your direct traffic % in GA4 to confirm clarity is translating into pull.",
      5: "Your market has internalized your language. Protect this by treating your positioning doc as version-controlled — don't let it drift with every new hire.",
    },
  },
  {
    key: "differentiation",
    name: "Differentiation",
    definition: "Do you occupy emotional territory your competitors don't?",
    strongSignal: "Your brand narrative couldn't be attributed to a competitor",
    icon: "◇",
    interpretations: {
      1: "You're currently indistinguishable from your closest competitors. This is the highest-leverage problem on the list — nothing else compounds until it's solved.",
      2: "You have an answer to 'what makes us different' but not one everyone agrees on. Run a 1-hour session with leadership; don't leave without a sentence everyone accepts.",
      3: "You're differentiated in your head but not yet in your marketing. Audit your last 10 pieces of content: how many could have been written by a competitor?",
      4: "You own a distinct position and it's showing up in wins. Run win/loss interviews to pressure-test whether customers are buying what you think you're selling.",
      5: "You've claimed defensible territory. The risk now is that a well-funded competitor crowds in. Monitor share of voice and be ready to re-differentiate before the category catches up.",
    },
  },
  {
    key: "resonance",
    name: "Resonance",
    definition: "Does your brand create an emotional connection with your audience?",
    strongSignal: 'Customers use identity language: "I\'m a Notion person"',
    icon: "◉",
    interpretations: {
      1: "Your brand is functional, not felt. That limits word-of-mouth and keeps CAC dependent on paid. Start with the question: 'What emotional state do we want customers in after every interaction with us?'",
      2: "Customers like you but don't identify with you. Watch for the one moment in the customer journey where you could create a feeling — an onboarding welcome, a first win celebration, a community ritual.",
      3: "You're occasionally landing emotionally. Audit unprompted customer language in reviews and socials — which words repeat? Lean into those.",
      4: "Your brand is creating real pull. Customers are referring you because of who you are, not just what you do. Invest in the rituals that reinforce it (community, templates, shared language).",
      5: "Customers identify with your brand. This is the Notion / Figma / Canva zone. Your job now is to protect the emotional equity — don't sanitize it as you scale.",
    },
  },
  {
    key: "consistency",
    name: "Consistency",
    definition: "Does every touchpoint reinforce the same brand story?",
    strongSignal:
      "Sales, marketing, product, and support all sound like the same brand",
    icon: "▣",
    interpretations: {
      1: "Your brand reads differently on every surface. New hires can't tell what you sound like, and AI tools can't either. Start with a one-page voice doc and a canonical set of proof points.",
      2: "Some surfaces are on-brand, most aren't. Pick your top 3 touchpoints by traffic (homepage, sales deck, onboarding email) and fix those first before worrying about the long tail.",
      3: "Consistency across marketing, drift in sales, product, and people. Most B2B companies live here. Fixing the sales deck and onboarding emails usually gets you to a 4.",
      4: "You sound like one company across almost every surface. The remaining drift is usually in people content — job posts, LinkedIn profiles, out-of-office replies.",
      5: "A stranger could reconstruct your brand from any 5 touchpoints. This level requires active governance (see next dimension).",
    },
  },
  {
    key: "governance",
    name: "Governance",
    definition:
      "Do internal teams know and apply the brand consistently?",
    strongSignal: "New hires understand the brand within their first 30 days",
    icon: "⬡",
    interpretations: {
      1: "You have no brand infrastructure. Every new hire is rebuilding from scratch, and every AI prompt is generating generic copy with your logo on it. This is the #1 risk for scaling companies right now.",
      2: "Something exists but isn't being used. A brand guide in a Notion page that nobody opens is a 2, not a 4. The test is whether new hires reference it in week one.",
      3: "You have the basics — a guide and an owner. Next additions: an AI prompt library, and a recurring review cadence.",
      4: "You have real systems and they're maintained. Next: measure brand drift over time (compare content from 12 months ago to today) to catch regression early.",
      5: "Your brand can survive AI, scale, and turnover. This is rare — roughly the top 5–10% of B2B companies at your stage.",
    },
  },
];

export type QuestionType = "likert" | "mc" | "multiselect";
export type DimensionKey =
  | "clarity"
  | "differentiation"
  | "resonance"
  | "consistency"
  | "governance";

export interface AnswerOption {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  number: number; // 1–10 for core, 11 for bonus
  isBonus: boolean;
  dimension: DimensionKey | null; // null for Q11
  subtype: "internal" | "external" | "signal";
  type: QuestionType;
  text: string;
  options: AnswerOption[];
  note?: string; // extra instruction for implementation (e.g. mutual exclusion)
}

export const QUESTIONS: Question[] = [
  // ─── CLARITY ───────────────────────────────────────────────────────────────
  {
    id: "q1",
    number: 1,
    isBonus: false,
    dimension: "clarity",
    subtype: "internal",
    type: "likert",
    text: "If the five most senior people in your company each wrote one sentence describing what the company does and who it's for, how aligned would their answers be?",
    options: [
      { label: "I haven't tested this, or I'd expect five different answers", value: 1 },
      { label: "Roughly the same topic, but different words and framing", value: 2 },
      { label: "Similar ideas, different emphasis", value: 3 },
      { label: "Very close — same core message, small variations", value: 4 },
      { label: "Nearly identical — we use shared language by default", value: 5 },
    ],
  },
  {
    id: "q2",
    number: 2,
    isBonus: false,
    dimension: "clarity",
    subtype: "external",
    type: "likert",
    text: "When prospects or new customers describe your company back to you — on sales calls, in intro emails, or in their own words — how close is their language to how you describe yourselves?",
    options: [
      { label: "They describe us using their own (often inaccurate) words", value: 1 },
      { label: "They get the category right, but not what makes us us", value: 2 },
      { label: "They use some of our language, some of their own", value: 3 },
      { label: "They echo our positioning back pretty accurately", value: 4 },
      { label: "They use our exact phrases unprompted, including the distinctive ones", value: 5 },
    ],
  },

  // ─── DIFFERENTIATION ────────────────────────────────────────────────────────
  {
    id: "q3",
    number: 3,
    isBonus: false,
    dimension: "differentiation",
    subtype: "internal",
    type: "mc",
    text: '"What is the one thing our brand stands for that no close competitor does?" — which best describes your leadership team\'s answer to this question?',
    options: [
      { label: "We don't have an answer", value: 1 },
      { label: "We have an answer, but different leaders would give different versions of it", value: 2 },
      { label: "We have an answer, but it's really about features or pricing, not brand", value: 3 },
      { label: "We have a clear answer but it isn't consistently reflected in what we publish", value: 4 },
      { label: "We have a clear, shared answer that shows up in our brand and marketing", value: 5 },
    ],
  },
  {
    id: "q4",
    number: 4,
    isBonus: false,
    dimension: "differentiation",
    subtype: "external",
    type: "mc",
    text: "Think about your last five won deals, renewals, or major customer wins. How often did who you are as a company (not features, price, or timing) come up as a reason they chose you?",
    options: [
      { label: "Never, or I haven't tracked this", value: 1 },
      { label: "Once", value: 2 },
      { label: "In about half of them", value: 3 },
      { label: "In most of them", value: 4 },
      { label: "In all of them — it's a recurring theme in win reasons", value: 5 },
    ],
  },

  // ─── RESONANCE ──────────────────────────────────────────────────────────────
  {
    id: "q5",
    number: 5,
    isBonus: false,
    dimension: "resonance",
    subtype: "internal",
    type: "likert",
    text: "When customers recommend you to peers, what kind of language do they typically use?",
    options: [
      { label: 'Purely functional — "it works," "it\'s reliable," "it does X"', value: 1 },
      { label: 'Functional plus a positive adjective — "it\'s great," "we like it"', value: 2 },
      { label: "Mix of functional and emotional — some mention the team or the feel", value: 3 },
      { label: 'Often emotional or identity-driven — "I\'m a [brand] person," "love it"', value: 4 },
      { label: "Strong identity language — they describe belonging to something, not just using it", value: 5 },
    ],
  },
  {
    id: "q6",
    number: 6,
    isBonus: false,
    dimension: "resonance",
    subtype: "external",
    type: "mc",
    text: 'In the last 90 days, how often have customers used unprompted emotional language about your brand — in reviews, social posts, support tickets, or messages to your team? (Think "obsessed," "love," "can\'t imagine working without," "made my week," etc.)',
    options: [
      { label: "Never, or I haven't noticed", value: 1 },
      { label: "Once or twice", value: 2 },
      { label: "A handful of times", value: 3 },
      { label: "Regularly — a few times a month", value: 4 },
      { label: "Constantly — it's part of how customers talk about us", value: 5 },
    ],
  },

  // ─── CONSISTENCY ────────────────────────────────────────────────────────────
  {
    id: "q7",
    number: 7,
    isBonus: false,
    dimension: "consistency",
    subtype: "internal",
    type: "likert",
    text: "Picture five touchpoints side by side: your homepage, your most-used sales deck, a recent customer email, a job posting, and three random employee LinkedIn profiles. If a stranger saw only those five things, how consistent would the story feel?",
    options: [
      { label: "Completely inconsistent — would read like different companies", value: 1 },
      { label: "Mostly inconsistent, with occasional overlap", value: 2 },
      { label: "Same topic area, but meaningfully different tone and framing", value: 3 },
      { label: "Mostly consistent, with minor drift in a few places", value: 4 },
      { label: "Fully consistent — same story, same voice, same vibe", value: 5 },
    ],
  },
  {
    id: "q8",
    number: 8,
    isBonus: false,
    dimension: "consistency",
    subtype: "external",
    type: "mc",
    text: "Open Claude or ChatGPT right now. Type your company name and ask it to describe your brand. How accurate is the answer likely to be?",
    options: [
      { label: "I haven't tried, and I'm not sure what it would say", value: 1 },
      { label: "Generic — could describe any company in our space", value: 2 },
      { label: "Mostly wrong, outdated, or confused", value: 2 },
      { label: "Roughly accurate but missing what makes us distinct", value: 3 },
      { label: "Accurate and recognizable — it sounds like us", value: 4 },
      { label: "Sharply accurate, including the specific phrases and positioning we use", value: 5 },
    ],
    note: "Two options map to 2 — 'generic' and 'wrong/outdated' are different failure modes of the same signal.",
  },

  // ─── GOVERNANCE ─────────────────────────────────────────────────────────────
  {
    id: "q9",
    number: 9,
    isBonus: false,
    dimension: "governance",
    subtype: "internal",
    type: "multiselect",
    text: "Which of these brand systems do you have in place today? (Select all that apply.)",
    options: [
      { label: "A documented brand guide that teams actually use (not just PDF-filed)", value: 1 },
      { label: "A clear owner or escalation path for brand decisions", value: 2 },
      { label: "An AI prompt library or custom GPT/Claude project that reflects your brand voice", value: 3 },
      { label: "A recurring brand audit or review cadence (quarterly, twice a year, etc.)", value: 4 },
      { label: "None of the above", value: 0 },
    ],
    note: "Score by count of positive options selected: 0→1, 1→2, 2→3, 3→4, 4→5. 'None of the above' must be mutually exclusive.",
  },
  {
    id: "q10",
    number: 10,
    isBonus: false,
    dimension: "governance",
    subtype: "external",
    type: "mc",
    text: "If you grabbed five employees outside your marketing team and asked each to explain what your brand stands for, how many could do it accurately, in their own words?",
    options: [
      { label: "0 or 1 of them", value: 1 },
      { label: "2 of them", value: 2 },
      { label: "3 of them", value: 3 },
      { label: "4 of them", value: 4 },
      { label: "All 5", value: 5 },
    ],
  },

  // ─── BONUS — BMF SIGNAL QUESTION ────────────────────────────────────────────
  {
    id: "q11",
    number: 11,
    isBonus: true,
    dimension: null,
    subtype: "signal",
    type: "mc",
    text: "Imagine your company completely overhauled its brand tomorrow — new name, new visual identity, new messaging. How do you think your best customers would react?",
    options: [
      { label: "Most would be very upset — the brand is a meaningful part of why they work with us", value: 5 },
      { label: "Most would be somewhat upset — they'd adjust", value: 4 },
      { label: "Most wouldn't care much — the product is what matters", value: 3 },
      { label: "Many would see it as an improvement — our current brand works against us", value: 2 },
      { label: "I genuinely don't know", value: 1 },
    ],
  },
];

export const CORE_QUESTIONS = QUESTIONS.filter((q) => !q.isBonus);
export const BONUS_QUESTION = QUESTIONS.find((q) => q.isBonus)!;

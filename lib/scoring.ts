import type { DimensionKey } from "@/data/questions";

export type Band = "pre-bmf" | "developing" | "approaching" | "strong";
export type SignalVerdict =
  | "strong"
  | "developing"
  | "pre"
  | "liability"
  | "unknown";

export interface DimensionScores {
  clarity: number;
  differentiation: number;
  resonance: number;
  consistency: number;
  governance: number;
}

export interface AssessmentResult {
  dimensionScores: DimensionScores;
  total: number;
  band: Band;
  signal: SignalVerdict;
}

// Q9 multi-select: count positive selections → score 1–5
export function scoreQ9(selectedValues: number[]): number {
  const positiveCount = selectedValues.filter((v) => v !== 0).length;
  if (positiveCount === 0) return 1;
  if (positiveCount === 1) return 2;
  if (positiveCount === 2) return 3;
  if (positiveCount === 3) return 4;
  return 5;
}

// Average two question scores for a dimension, rounded to nearest integer
export function scoreDimension(qInternal: number, qExternal: number): number {
  return Math.round((qInternal + qExternal) / 2);
}

export function scoreTotal(scores: DimensionScores): number {
  return (
    scores.clarity +
    scores.differentiation +
    scores.resonance +
    scores.consistency +
    scores.governance
  );
}

export function getBand(total: number): Band {
  if (total >= 23) return "strong";
  if (total >= 18) return "approaching";
  if (total >= 11) return "developing";
  return "pre-bmf";
}

export const BAND_LABELS: Record<Band, string> = {
  "pre-bmf": "Pre-BMF",
  developing: "Developing",
  approaching: "Approaching BMF",
  strong: "Strong BMF",
};

export const BAND_DESCRIPTIONS: Record<Band, string> = {
  "pre-bmf": "Foundational work needed",
  developing: "Strategy exists, execution gaps",
  approaching: "Strong foundation — optimize and scale",
  strong: "Protect, evolve, compound",
};

// Q11 verdict — maps q11 option value to signal type
export function getSignalVerdict(q11Value: number): SignalVerdict {
  if (q11Value === 5) return "strong";
  if (q11Value === 4) return "developing";
  if (q11Value === 3) return "pre";
  if (q11Value === 2) return "liability";
  return "unknown";
}

export const SIGNAL_VERDICT_COPY: Record<
  SignalVerdict,
  { headline: string; body: string }
> = {
  strong: {
    headline: "Strong BMF signal",
    body: "Your brand is a meaningful part of the relationship. Validate this by running the full Sean Ellis BMF survey on 30+ customers.",
  },
  developing: {
    headline: "Developing BMF",
    body: "Your brand matters, but it's not yet load-bearing. The 25-point score above will tell you where to focus.",
  },
  pre: {
    headline: "Pre-BMF",
    body: "Customers are buying the product, not the brand. That's not a crisis, but it means your acquisition stays paid-heavy and word-of-mouth stays quiet until the brand starts carrying weight.",
  },
  liability: {
    headline: "Brand is a liability",
    body: "The brand is actively working against you. A rebrand conversation is on the table.",
  },
  unknown: {
    headline: "Worth finding out",
    body: "Run the Sean Ellis BMF question on 30+ customers — link to the survey template.",
  },
};

// Compute full result from raw answer map
// answers: { q1: 4, q2: 3, ..., q9: [1,2], q10: 4, q11: 5 }
export function computeResult(
  answers: Record<string, number | number[]>
): AssessmentResult {
  const get = (id: string): number => {
    const v = answers[id];
    return typeof v === "number" ? v : 0;
  };

  const q9Raw = answers["q9"];
  const q9Score = Array.isArray(q9Raw) ? scoreQ9(q9Raw) : get("q9");

  const dimensionScores: DimensionScores = {
    clarity: scoreDimension(get("q1"), get("q2")),
    differentiation: scoreDimension(get("q3"), get("q4")),
    resonance: scoreDimension(get("q5"), get("q6")),
    consistency: scoreDimension(get("q7"), get("q8")),
    governance: scoreDimension(q9Score, get("q10")),
  };

  const total = scoreTotal(dimensionScores);
  const band = getBand(total);
  const signal = getSignalVerdict(get("q11"));

  return { dimensionScores, total, band, signal };
}

// Serialize answers to URL query string
export function answersToParams(
  answers: Record<string, number | number[]>
): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(answers)) {
    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      params.set(key, String(value));
    }
  }
  return params.toString();
}

// Parse URL query string back to answers
export function paramsToAnswers(
  search: string
): Record<string, number | number[]> {
  const params = new URLSearchParams(search);
  const answers: Record<string, number | number[]> = {};
  for (const [key, value] of params.entries()) {
    if (key.startsWith("q")) {
      if (value.includes(",")) {
        answers[key] = value.split(",").map(Number);
      } else {
        answers[key] = Number(value);
      }
    }
  }
  return answers;
}

// Heat map color scale — warm amber/cognac palette
// Used for the legend bar (solid colors)
export function matrixBg(score: number): string {
  const colors: Record<number, string> = {
    1: "#F2E6C4",
    2: "#DDB754",
    3: "#C07A28",
    4: "#7A3F10",
    5: "#200E04",
  };
  return colors[score] ?? "#F2E6C4";
}

// Radial gradient version — lighter center gives optical glow, adjacent
// similar-score cells bleed into each other creating a spectrum feel
export function matrixGradient(score: number): string {
  const gradients: Record<number, string> = {
    1: "radial-gradient(ellipse at 40% 30%, #FFF9EA, #E8D498)",
    2: "radial-gradient(ellipse at 40% 30%, #F0D07A, #C09030)",
    3: "radial-gradient(ellipse at 40% 30%, #D89040, #9A5818)",
    4: "radial-gradient(ellipse at 40% 30%, #9A5020, #5A2808)",
    5: "radial-gradient(ellipse at 40% 30%, #3C1C08, #100602)",
  };
  return gradients[score] ?? gradients[1];
}

export function matrixFg(score: number): string {
  return score >= 4 ? "#F8E8C0" : "#2A1508";
}

export const DIMENSION_KEYS: DimensionKey[] = [
  "clarity",
  "differentiation",
  "resonance",
  "consistency",
  "governance",
];

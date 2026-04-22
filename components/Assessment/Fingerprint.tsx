"use client";

import type { DimensionScores } from "@/lib/scoring";
import { DIMENSIONS_INFO } from "@/data/dimensions";

interface FingerprintProps {
  scores: DimensionScores;
  size?: number;
}

// Generate smooth organic blob path from 5 dimension scores (ported from bmf-viz-concepts.jsx)
function getBlobPath(
  scoreValues: number[],
  cx: number,
  cy: number,
  maxR: number
): string {
  const n = scoreValues.length;
  const pts = scoreValues.map((score, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const r = (score / 5) * maxR;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as [
      number,
      number
    ];
  });

  let path = "";
  for (let i = 0; i < n; i++) {
    const curr = pts[i];
    const next = pts[(i + 1) % n];
    const nn = pts[(i + 2) % n];
    const mid: [number, number] = [
      (curr[0] + next[0]) / 2,
      (curr[1] + next[1]) / 2,
    ];
    const nextMid: [number, number] = [
      (next[0] + nn[0]) / 2,
      (next[1] + nn[1]) / 2,
    ];
    if (i === 0) path += `M ${mid[0].toFixed(1)} ${mid[1].toFixed(1)} `;
    path += `Q ${next[0].toFixed(1)} ${next[1].toFixed(1)} ${nextMid[0].toFixed(1)} ${nextMid[1].toFixed(1)} `;
  }
  return path + "Z";
}

function getAxisLabelPos(
  index: number,
  n: number,
  cx: number,
  cy: number,
  r: number
): [number, number] {
  const angle = (index / n) * 2 * Math.PI - Math.PI / 2;
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

export default function Fingerprint({ scores, size = 300 }: FingerprintProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const labelR = size * 0.47;

  const scoreValues = DIMENSIONS_INFO.map(
    (d) => scores[d.key as keyof DimensionScores]
  );
  const maxScoreValues = DIMENSIONS_INFO.map(() => 5);

  const blobPath = getBlobPath(scoreValues, cx, cy, maxR);
  const ghostPath = getBlobPath(maxScoreValues, cx, cy, maxR);

  const n = DIMENSIONS_INFO.length;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label="Brand market fit fingerprint visualization"
      >
        {/* Ghost (max possible) */}
        <path d={ghostPath} fill="#F0EDE8" />
        {/* Actual scores blob */}
        <path d={blobPath} fill="#1A1A1A" opacity={0.9} />
        {/* Center dot */}
        <circle cx={cx} cy={cy} r={3} fill="#FDFBF5" />

        {/* Axis labels */}
        {DIMENSIONS_INFO.map((dim, i) => {
          const [lx, ly] = getAxisLabelPos(i, n, cx, cy, labelR);
          const anchor =
            lx < cx - 10 ? "end" : lx > cx + 10 ? "start" : "middle";
          return (
            <text
              key={dim.key}
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={size * 0.038}
              fill="#A09890"
              fontFamily="var(--font-graphik), system-ui"
            >
              {dim.name}
            </text>
          );
        })}
      </svg>

      <p className="text-[10px] text-[#1A1A1A] mt-2 text-center">
        Gray = maximum possible. Black = your scores.
        <br />
        Shape matters — balanced is better than one strong spike.
      </p>
    </div>
  );
}

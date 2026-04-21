"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DimensionScores } from "@/lib/scoring";
import { DIMENSIONS_INFO } from "@/data/dimensions";

interface SignalBarsProps {
  scores: DimensionScores;
  total: number;
}

export default function SignalBars({ scores, total }: SignalBarsProps) {
  const [expandedDim, setExpandedDim] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {DIMENSIONS_INFO.map((dim) => {
        const score = scores[dim.key as keyof DimensionScores];
        const pct = (score / 5) * 100;
        const barColor =
          score >= 4 ? "#1A1A1A" : score === 3 ? "#8A8278" : "#C8BFB5";
        const isExpanded = expandedDim === dim.key;

        return (
          <div key={dim.key}>
            <button
              className="w-full text-left"
              onClick={() =>
                setExpandedDim(isExpanded ? null : dim.key)
              }
              aria-expanded={isExpanded}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-2">
                  {dim.name}
                  <span className="text-[10px] text-[#A09890] normal-case font-normal">
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </span>
                <span className="text-sm text-[#A09890]">{score}/5</span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: "#F0EDE8" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: barColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                />
              </div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-sm text-[#555] leading-relaxed pl-0 border-l-2 border-[#E2DED6] pl-4">
                    {dim.interpretations[score]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

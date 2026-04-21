"use client";

import { motion } from "framer-motion";
import { DIMENSIONS_INFO } from "@/data/dimensions";

const SCORE_BANDS = [
  { range: "0–10", label: "Pre-BMF", desc: "Foundational work needed" },
  { range: "11–17", label: "Developing", desc: "Strategy exists, execution gaps" },
  { range: "18–22", label: "Approaching BMF", desc: "Strong foundation — optimize and scale" },
  { range: "23–25", label: "Strong BMF", desc: "Protect, evolve, compound" },
];

export default function FiveDimensions() {
  return (
    <section className="bg-[#1A1A1A] py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#888] mb-4">
            How BMF is measured
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#FDFBF5] leading-tight"
            style={{ fontFamily: "var(--font-stack), 'Arial Black', sans-serif" }}
          >
            The 5 Dimensions
          </h2>
        </motion.div>

        {/* Dimension rows */}
        <div className="space-y-0 divide-y divide-[#2A2A2A]">
          {DIMENSIONS_INFO.map((dim, i) => (
            <motion.div
              key={dim.key}
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr] gap-6 py-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              {/* Name */}
              <div className="flex items-start gap-3">
                <span className="text-xl text-[#E5D62F] mt-0.5 leading-none font-light">
                  {dim.icon}
                </span>
                <div>
                  <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#666] mb-1">
                    Dimension {i + 1}
                  </p>
                  <h3 className="text-lg font-bold text-[#FDFBF5]">{dim.name}</h3>
                </div>
              </div>

              {/* Definition */}
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#666] mb-2">
                  What it measures
                </p>
                <p className="text-[#C0B8B0] text-sm leading-relaxed">
                  {dim.definition}
                </p>
              </div>

              {/* Strong signal */}
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#666] mb-2">
                  Strong signal
                </p>
                <p className="text-[#FDFBF5] text-sm leading-relaxed">
                  {dim.strongSignal}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Score bands */}
        <motion.div
          className="mt-16 pt-12 border-t border-[#2A2A2A]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#666] mb-6">
            Score Bands — out of 25
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SCORE_BANDS.map((band) => (
              <div
                key={band.label}
                className="border border-[#2A2A2A] rounded-xl p-5"
              >
                <p className="text-xs text-[#666] mb-1">{band.range}</p>
                <p className="text-sm font-semibold text-[#FDFBF5]">{band.label}</p>
                <p className="text-xs text-[#888] mt-1 leading-snug">{band.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

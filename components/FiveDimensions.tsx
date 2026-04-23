"use client";

import { motion } from "framer-motion";
import { DIMENSIONS_INFO } from "@/data/dimensions";

const SCORE_BANDS = [
  { range: "0–10", label: "Pre-BMF", desc: "Foundational work needed" },
  { range: "11–17", label: "Developing", desc: "Strategy exists, execution gaps" },
  { range: "18–22", label: "Approaching BMF", desc: "Strong foundation — optimize and scale" },
  { range: "23–25", label: "Strong BMF", desc: "Protect, evolve, compound" },
];

// Grouped as shown in the Figma mock
const DIMENSION_GROUPS = [
  {
    label: "Strategic foundation",
    sublabel: "do you know what your brand should be?",
    dims: ["clarity", "differentiation"],
  },
  {
    label: "Market reception",
    sublabel: "does the outside world see what you intend?",
    dims: ["resonance", "consistency"],
  },
  {
    label: "Operational execution",
    sublabel: "can your org actually deliver on the brand?",
    dims: ["governance"],
  },
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
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#666] mb-6">
            How BMF is measured
          </p>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#FAFAF8] leading-[0.92]"
            style={{ fontFamily: "var(--font-graphik), system-ui, sans-serif" }}
          >
            How do you measure{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "#E5D62F",
                textDecorationThickness: "4px",
                textUnderlineOffset: "8px",
              }}
            >
              BMF
            </span>
            ?
          </h2>
        </motion.div>

        {/* Dimension groups */}
        <div className="space-y-0 divide-y divide-[#2A2A2A] mb-16">
          {DIMENSION_GROUPS.map((group, gi) => {
            const groupDims = DIMENSIONS_INFO.filter((d) =>
              group.dims.includes(d.key)
            );
            return (
              <motion.div
                key={group.label}
                className="py-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
              >
                {/* Group label */}
                <div className="mb-5">
                  <span className="text-[10px] font-medium text-[#666] mr-1.5">
                    {gi + 1}.
                  </span>
                  <span className="text-sm text-[#666]">{group.sublabel}</span>
                  <h3
                    className="text-xl font-bold text-[#FAFAF8] mt-1"
                    style={{ fontFamily: "var(--font-graphik), system-ui, sans-serif" }}
                  >
                    {groupDims.map((d) => d.name).join(" + ")}
                  </h3>
                </div>

                {/* Expanded dimension rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0">
                  {groupDims.map((dim) => (
                    <div key={dim.key} className="flex items-start gap-3">
                      <span className="text-lg text-[#E5D62F] mt-0.5 leading-none font-light flex-shrink-0">
                        {dim.icon}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#FAFAF8] mb-1">{dim.name}</p>
                        <p
                          className="text-[1rem] leading-relaxed"
                          style={{
                            fontFamily: '"Instrument Serif", Georgia, serif',
                            color: "#A09890",
                          }}
                        >
                          {dim.definition}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Score bands */}
        <motion.div
          className="pt-12 border-t border-[#2A2A2A]"
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
                <p className="text-sm font-semibold text-[#FAFAF8]">{band.label}</p>
                <p className="text-xs text-[#888] mt-1 leading-snug">{band.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

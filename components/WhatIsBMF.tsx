"use client";

import { motion } from "framer-motion";

const PANELS = [
  {
    heading: "What it is",
    body: "The degree to which a company's identity, values, and overall customer experience resonate with and meet the emotional and aspirational needs of its target market.",
  },
  {
    heading: "What it's not",
    body: "A logo. A rebrand. A tagline. BMF is the fit between who you say you are and what your market actually feels about you.",
  },
  {
    heading: "Why it matters",
    body: "Companies with both PMF and BMF see higher LTV, lower CAC, stronger word-of-mouth, and pricing power. Those with only PMF are constantly fighting uphill battles for attention and loyalty.",
  },
];

export default function WhatIsBMF() {
  return (
    <section className="bg-[#FDFBF5] py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.p
          className="text-xs font-medium tracking-[0.12em] uppercase text-[#1A1A1A] mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          The Framework
        </motion.p>

        {/* 3 definition panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2DED6]">
          {PANELS.map((panel, i) => (
            <motion.div
              key={panel.heading}
              className="bg-[#FDFBF5] p-8 md:p-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-xs font-medium tracking-[0.1em] uppercase text-[#1A1A1A] mb-4">
                {panel.heading}
              </h3>
              <p className="text-[1.05rem] leading-relaxed text-[#1A1A1A]">
                {panel.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

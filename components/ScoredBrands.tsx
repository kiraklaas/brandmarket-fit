"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_CATEGORIES } from "@/data/brands";
import BrandMatrix from "./BrandMatrix";

export default function ScoredBrands() {
  const [activeTab, setActiveTab] = useState(BRAND_CATEGORIES[0].id);

  const activeCategory = BRAND_CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section className="bg-[#FDFBF5] py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">

        {/* Header + tabs on same row at md+ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-3"
              style={{ fontFamily: "var(--font-stack), 'Arial Black', sans-serif" }}
            >
              Who has BMF?
            </h2>
            <p className="text-sm text-[#1A1A1A] leading-relaxed">
              You can see strong and weak brand-market fit in the brands you already know. Here&apos;s how three competitive categories score across the 5 dimensions of BMF.
            </p>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            className="flex gap-1 p-1 rounded-full flex-shrink-0"
            style={{ background: "#EDEAE4" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {BRAND_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className="relative px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200"
                  style={{
                    background: isActive ? "#1A1A1A" : "transparent",
                    color: isActive ? "#FDFBF5" : "#6B6560",
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Matrix */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <BrandMatrix brands={activeCategory.brands} />
          </motion.div>
        </AnimatePresence>

        {/* Footnote */}
        <motion.p
          className="mt-5 text-xs text-[#1A1A1A] leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Scores reflect publicly available brand signals — messaging, visual identity, customer language, and market differentiation.
        </motion.p>
      </div>
    </section>
  );
}

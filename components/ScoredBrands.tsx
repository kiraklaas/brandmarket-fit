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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#888] mb-4">
            Brands, scored
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
            style={{ fontFamily: "var(--font-stack), 'Arial Black', sans-serif" }}
          >
            BMF isn&apos;t abstract.
          </h2>
          <p className="text-base md:text-lg text-[#888] max-w-2xl leading-relaxed">
            You can see it in the brands you already know. Here&apos;s how three competitive categories score across the 5 dimensions of brand-market fit.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-0 mt-10 mb-8 border-b border-[#E2DED6] overflow-x-auto">
          {BRAND_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="relative px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors"
              style={{
                color: activeTab === cat.id ? "#1A1A1A" : "#A09890",
              }}
            >
              {cat.label}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1A1A1A]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Matrix */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <BrandMatrix brands={activeCategory.brands} />
          </motion.div>
        </AnimatePresence>

        {/* Footnote */}
        <motion.p
          className="mt-8 text-xs text-[#A09890] leading-relaxed max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          These scores are based on publicly available brand signals — messaging, visual identity, customer language, and market differentiation. Hover any cell for the rationale.
        </motion.p>
      </div>
    </section>
  );
}

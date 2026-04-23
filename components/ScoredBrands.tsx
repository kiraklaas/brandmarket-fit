"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_CATEGORIES } from "@/data/brands";
import BrandMatrix from "./BrandMatrix";
import { BmfUnderline } from "./BmfUnderline";

// Transparent PNG brand items — no background, consistent height, label beside
const BRAND_ROW = [
  { src: "/images/poppi.png", label: "POPPI", w: 70, h: 84 },
  { src: "/images/sweetgreen.png", label: "SWEETGREEN", w: 88, h: 80 },
  { src: "/images/claude.png", label: "CLAUDE", w: 110, h: 89 },
  { src: "/images/oura.png", label: "OURA", w: 82, h: 75 },
  { src: "/images/away.png", label: "AWAY", w: 72, h: 90 },
];

export default function ScoredBrands() {
  const [activeTab, setActiveTab] = useState(BRAND_CATEGORIES[0].id);
  const activeCategory = BRAND_CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section className="bg-[#FAFAF8] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DED6]">
      <div className="max-w-5xl mx-auto">

        {/* Brand image row — ABOVE the heading */}
        <motion.div
          className="flex flex-wrap gap-8 items-end mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {BRAND_ROW.map((brand, i) => (
            <motion.div
              key={brand.label}
              className="relative inline-block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.05 * i }}
            >
              {/* Upper-right brand label */}
              <span
                className="absolute whitespace-nowrap text-[9px] font-medium tracking-[0.12em] uppercase text-[#1A1A1A]"
                style={{ fontFamily: "var(--font-graphik), system-ui", top: -18, right: 0 }}
              >
                {brand.label}
              </span>
              <Image
                src={brand.src}
                alt={brand.label}
                width={brand.w}
                height={brand.h}
                className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                draggable={false}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Heading row: heading left, tabs right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] leading-[0.92] mb-4"
              style={{ fontFamily: "var(--font-graphik), system-ui, sans-serif" }}
            >
              Who has <BmfUnderline>BMF</BmfUnderline>?
            </h2>
            <p
              className="text-[1.2rem] text-[#1A1A1A] leading-relaxed"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
              Companies with strong BMF see higher LTV, lower CAC, stronger word-of-mouth, and pricing power. If you only have PMF, you&apos;re fighting an uphill battle for attention and loyalty.
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
                    color: isActive ? "#FAFAF8" : "#6B6560",
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

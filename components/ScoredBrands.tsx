"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_CATEGORIES } from "@/data/brands";
import BrandMatrix from "./BrandMatrix";

function BmfUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        textDecoration: "underline",
        textDecorationColor: "#E5D62F",
        textDecorationThickness: "4px",
        textUnderlineOffset: "8px",
      }}
    >
      {children}
    </span>
  );
}

// Brand images to display in the visual row above the matrix
const BRAND_ROW = [
  { src: "/images/poppi.png", label: "Poppi", bg: "#F5EDE0" },
  { src: "/images/sweetgreen.png", label: "Sweetgreen", bg: "#D4E8D0" },
  { src: "/images/ramp.png", label: "Ramp", bg: "#1A1A1A" },
  { src: "/images/claude.png", label: "Claude", bg: "#E8E0F0" },
  { src: "/images/oura.png", label: "Oura", bg: "#E8E4DC" },
  { src: "/images/away.png", label: "Away", bg: "#D8E0E8" },
];

export default function ScoredBrands() {
  const [activeTab, setActiveTab] = useState(BRAND_CATEGORIES[0].id);
  const activeCategory = BRAND_CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section className="bg-[#FAFAF8] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DED6]">
      <div className="max-w-5xl mx-auto">

        {/* Header row: heading left, tabs right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
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
              className="text-[1.1rem] text-[#1A1A1A] leading-relaxed"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
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
                    color: isActive ? "#FAFAF8" : "#6B6560",
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Brand image card row */}
        <motion.div
          className="flex gap-3 mb-12 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {BRAND_ROW.map((brand, i) => (
            <motion.div
              key={brand.label}
              className="flex-shrink-0 flex items-center justify-center overflow-hidden"
              style={{
                width: 152,
                height: 112,
                borderRadius: 16,
                background: brand.bg,
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <Image
                src={brand.src}
                alt={brand.label}
                width={110}
                height={90}
                className="object-contain"
                style={{ maxWidth: "80%", maxHeight: "80%" }}
                draggable={false}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Body copy below images */}
        <motion.p
          className="text-[1.1rem] text-[#1A1A1A] leading-relaxed mb-10 max-w-2xl"
          style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Companies with strong BMF see higher LTV, lower CAC, stronger word-of-mouth, and pricing power. If you only have PMF, you&apos;re fighting an uphill battle for attention and loyalty.
        </motion.p>

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

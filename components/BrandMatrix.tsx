"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DIMENSIONS, type Brand, type Dimension } from "@/data/brands";
import { matrixBg, matrixFg } from "@/lib/scoring";

interface TooltipState {
  brand: string;
  dimension: Dimension;
  text: string;
  x: number;
  y: number;
}

export default function BrandMatrix({ brands }: { brands: Brand[] }) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  function handleCellEnter(
    e: React.MouseEvent,
    brand: Brand,
    dim: Dimension
  ) {
    const rationale = brand.rationale[dim];
    if (!rationale) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      brand: brand.name,
      dimension: dim,
      text: rationale,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }

  function handleCellLeave() {
    setTooltip(null);
  }

  const totals = brands.map((b) =>
    DIMENSIONS.reduce((sum, d) => sum + b.scores[d], 0)
  );

  return (
    <div className="relative overflow-x-auto">
      <table
        className="w-full border-separate"
        style={{ borderSpacing: "5px" }}
      >
        <thead>
          <tr>
            {/* Brand column header */}
            <th className="text-left pb-3 pl-1 min-w-[120px]" />
            {/* Dimension headers */}
            {DIMENSIONS.map((d) => (
              <th
                key={d}
                className="text-center pb-3 min-w-[80px]"
              >
                <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[#1A1A1A]">
                  {d}
                </span>
              </th>
            ))}
            {/* Score header */}
            <th className="text-center pb-3 min-w-[70px]">
              <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-[#1A1A1A]">
                Score
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, bi) => {
            const total = totals[bi];
            const avgScore = Math.round(total / DIMENSIONS.length);
            return (
              <tr key={brand.name}>
                {/* Brand name + logo */}
                <td className="pr-4 pl-1 py-0.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 relative flex-shrink-0">
                      <Image
                        src={`https://logo.clearbit.com/${brand.domain}`}
                        alt={brand.name}
                        fill
                        className="object-contain rounded-sm"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                        unoptimized
                      />
                    </div>
                    <span className="text-sm font-semibold text-[#1A1A1A] whitespace-nowrap">
                      {brand.name}
                    </span>
                  </div>
                </td>

                {/* Score cells */}
                {DIMENSIONS.map((dim) => {
                  const score = brand.scores[dim];
                  const hasRationale = !!brand.rationale[dim];
                  return (
                    <td key={dim} className="p-[3px]">
                      <div
                        className="rounded-[9px] h-[52px] flex items-center justify-center text-base font-extrabold cursor-default transition-transform duration-100 hover:scale-105"
                        style={{
                          background: matrixBg(score),
                          color: matrixFg(score),
                          cursor: hasRationale ? "pointer" : "default",
                        }}
                        onMouseEnter={(e) =>
                          handleCellEnter(e, brand, dim)
                        }
                        onMouseLeave={handleCellLeave}
                      >
                        {score}
                      </div>
                    </td>
                  );
                })}

                {/* Total score cell */}
                <td className="p-[3px]">
                  <div
                    className="rounded-[9px] h-[52px] flex flex-col items-center justify-center gap-0.5"
                    style={{
                      background: matrixBg(avgScore),
                    }}
                  >
                    <span
                      className="text-[15px] font-extrabold leading-none"
                      style={{ color: matrixFg(avgScore) }}
                    >
                      {total}
                    </span>
                    <span
                      className="text-[9px] leading-none opacity-60"
                      style={{ color: matrixFg(avgScore) }}
                    >
                      / 25
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-5 pl-1">
        <span className="text-[10px] text-[#1A1A1A]">Weak</span>
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className="w-8 h-[18px] rounded-[5px] border border-[#f0ece6]"
            style={{ background: matrixBg(s) }}
          />
        ))}
        <span className="text-[10px] text-[#1A1A1A]">Strong</span>
      </div>

      {/* Tooltip — fixed position */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key={`${tooltip.brand}-${tooltip.dimension}`}
            className="fixed z-50 max-w-xs bg-[#1A1A1A] text-[#FDFBF5] text-xs leading-relaxed rounded-xl px-4 py-3 pointer-events-none shadow-xl"
            style={{
              left: tooltip.x,
              top: tooltip.y - 12,
              transform: "translateX(-50%) translateY(-100%)",
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            <span className="font-semibold text-[#E5D62F]">
              {tooltip.brand} / {tooltip.dimension}
            </span>
            <br />
            {tooltip.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

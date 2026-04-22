"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DIMENSIONS, type Brand, type Dimension } from "@/data/brands";
import { matrixBg, matrixFg, getBand, BAND_LABELS } from "@/lib/scoring";

interface TooltipState {
  brand: string;
  dimension: Dimension;
  text: string;
  x: number;
  y: number;
}

// Score → dot color for the score row indicator
function scoreDotColor(total: number) {
  const band = getBand(total);
  if (band === "strong") return "#1A1A1A";
  if (band === "approaching") return "#5C5650";
  if (band === "developing") return "#A39A90";
  return "#D3CCC4";
}

export default function BrandMatrix({ brands }: { brands: Brand[] }) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const totals = brands.map((b) =>
    DIMENSIONS.reduce((sum, d) => sum + b.scores[d], 0)
  );

  function handleCellEnter(e: React.MouseEvent, brand: Brand, dim: Dimension) {
    const rationale = brand.rationale[dim];
    if (!rationale) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
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

  return (
    <div className="relative">
      {/* Card container */}
      <div
        className="overflow-x-auto rounded-2xl"
        style={{ border: "1px solid #E2DED6" }}
      >
        <table
          className="w-full border-collapse"
          style={{ minWidth: `${160 + brands.length * 128}px` }}
        >
          {/* ── Brand logo headers ───────────────────────────────── */}
          <thead>
            <tr>
              {/* Empty corner */}
              <th
                className="text-left"
                style={{ width: 160, minWidth: 160, padding: "24px 20px 16px" }}
              />
              {brands.map((brand) => (
                <th
                  key={brand.name}
                  className="text-center"
                  style={{ padding: "24px 12px 16px", minWidth: 120 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* Logo */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <Image
                        src={`https://logo.clearbit.com/${brand.domain}`}
                        alt={brand.name}
                        width={40}
                        height={40}
                        className="object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                        unoptimized
                      />
                    </div>
                    {/* Brand name */}
                    <span
                      className="text-xs font-medium text-[#1A1A1A] leading-tight"
                      style={{ letterSpacing: "0.01em" }}
                    >
                      {brand.name}
                    </span>
                  </div>
                </th>
              ))}
            </tr>

            {/* Thin separator */}
            <tr>
              <td
                colSpan={brands.length + 1}
                style={{ padding: 0, height: 1, background: "#E2DED6" }}
              />
            </tr>
          </thead>

          <tbody>
            {/* ── Dimension rows ──────────────────────────────────── */}
            {DIMENSIONS.map((dim, di) => (
              <tr
                key={dim}
                style={{
                  borderTop: di > 0 ? "1px solid #F0EDE8" : undefined,
                }}
              >
                {/* Dimension label */}
                <td style={{ padding: "10px 20px" }}>
                  <span
                    className="text-[10px] font-semibold text-[#1A1A1A] uppercase tracking-widest"
                  >
                    {dim}
                  </span>
                </td>

                {/* Score cells */}
                {brands.map((brand) => {
                  const score = brand.scores[dim];
                  const hasRationale = !!brand.rationale[dim];
                  return (
                    <td key={brand.name} style={{ padding: "6px 8px" }}>
                      <div
                        className="relative mx-auto flex items-center justify-center transition-all duration-150"
                        style={{
                          background: matrixBg(score),
                          borderRadius: 10,
                          height: 48,
                          cursor: hasRationale ? "pointer" : "default",
                        }}
                        onMouseEnter={(e) => handleCellEnter(e, brand, dim)}
                        onMouseLeave={handleCellLeave}
                      >
                        <span
                          className="font-medium tabular-nums"
                          style={{
                            color: matrixFg(score),
                            fontSize: 15,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {score}
                        </span>
                        {/* Hover overlay */}
                        {hasRationale && (
                          <div
                            className="absolute inset-0 rounded-[10px] opacity-0 hover:opacity-100 transition-opacity duration-100"
                            style={{ background: "rgba(0,0,0,0.06)" }}
                          />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* ── Separator before score row ───────────────────────── */}
            <tr>
              <td
                colSpan={brands.length + 1}
                style={{ padding: 0, height: 1, background: "#E2DED6" }}
              />
            </tr>

            {/* ── Score row ─────────────────────────────────────────── */}
            <tr style={{ background: "#F8F6F1" }}>
              <td style={{ padding: "16px 20px" }}>
                <span className="text-[10px] font-semibold text-[#1A1A1A] uppercase tracking-widest">
                  Score
                </span>
              </td>
              {brands.map((brand, i) => {
                const total = totals[i];
                const band = getBand(total);
                const dotColor = scoreDotColor(total);
                return (
                  <td key={brand.name} style={{ padding: "16px 8px" }}>
                    <div className="flex flex-col items-center gap-1.5">
                      {/* Score */}
                      <div className="flex items-baseline gap-0.5">
                        <span
                          className="font-bold text-[#1A1A1A] tabular-nums"
                          style={{
                            fontSize: 22,
                            letterSpacing: "-0.02em",
                            fontFamily: "var(--font-stack), sans-serif",
                          }}
                        >
                          {total}
                        </span>
                        <span className="text-[11px] text-[#A09890] font-normal">
                          /25
                        </span>
                      </div>
                      {/* Band label */}
                      <span
                        className="inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-wider"
                        style={{ color: dotColor }}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: dotColor }}
                        />
                        {BAND_LABELS[band]}
                      </span>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Legend ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mt-4 pl-1">
        <span className="text-[10px] text-[#1A1A1A]">Weak</span>
        <div
          className="h-2 rounded-full flex-1 max-w-[120px]"
          style={{
            background:
              "linear-gradient(to right, #F0EDE8, #D3CCC4, #A39A90, #5C5650, #1E1B18)",
          }}
        />
        <span className="text-[10px] text-[#1A1A1A]">Strong</span>
        <span className="text-[10px] text-[#A09890] ml-2">
          Hover any cell for rationale
        </span>
      </div>

      {/* ── Tooltip ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key={`${tooltip.brand}-${tooltip.dimension}`}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y - 12,
              transform: "translateX(-50%) translateY(-100%)",
            }}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="max-w-[260px] rounded-2xl px-4 py-3 shadow-2xl"
              style={{ background: "#1A1A1A" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: "#E5D62F" }}>
                {tooltip.brand} · {tooltip.dimension}
              </p>
              <p className="text-xs text-[#FDFBF5] leading-relaxed">
                {tooltip.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

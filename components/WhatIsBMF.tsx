"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BmfUnderline } from "./BmfUnderline";

// Transparent PNG brand items used here get the all-caps label treatment
function BrandFloat({
  src,
  alt,
  label,
  width,
  height,
  bg,
}: {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  bg?: string;
}) {
  return (
    <div
      className="w-full overflow-hidden flex items-center justify-center relative"
      style={{ borderRadius: 20, background: bg ?? "transparent", aspectRatio: "4/3" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-contain w-full h-full p-6"
        draggable={false}
      />
      {/* Upper-right brand label */}
      <span
        className="absolute text-[8px] font-medium tracking-[0.12em] uppercase text-[#1A1A1A]"
        style={{ fontFamily: "var(--font-graphik), system-ui", top: 10, right: 12 }}
      >
        {label}
      </span>
    </div>
  );
}

export default function WhatIsBMF() {
  return (
    <section className="bg-[#FAFAF8] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DED6]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 md:gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] leading-[0.92] mb-10"
              style={{ fontFamily: "var(--font-graphik), system-ui, sans-serif" }}
            >
              What is <BmfUnderline>BMF</BmfUnderline>?
            </h2>

            <div className="space-y-6">
              <p
                className="text-[1.4rem] md:text-[1.5rem] leading-relaxed text-[#1A1A1A]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                Brand-market fit is the state in which a company&apos;s brand — its positioning, messaging, visual identity, and market presence — resonates so clearly and durably with its target audience that it creates a sustainable competitive advantage.
              </p>
              <p
                className="text-[1.4rem] md:text-[1.5rem] leading-relaxed text-[#1A1A1A]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                Like product-market fit, BMF is not a one-time achievement; it requires ongoing calibration as markets, competitors, and audiences evolve.
              </p>
            </div>

            {/* Three quick stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-[#E2DED6]">
              {[
                { label: "What it is", body: "Fit between who you say you are and what your market actually feels about you." },
                { label: "What it's not", body: "A logo. A rebrand. A tagline. Those are outputs, not outcomes." },
                { label: "Why it matters", body: "Higher LTV, lower CAC, pricing power, and word-of-mouth that compounds." },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#1A1A1A] mb-2">
                    {item.label}
                  </p>
                  <p
                    className="text-[1rem] text-[#1A1A1A] leading-relaxed"
                    style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: stacked brand image cards */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <BrandFloat
              src="/images/claude.png"
              alt="Claude brand campaign"
              label="CLAUDE"
              width={320}
              height={258}
              bg="#EBE6DC"
            />
            <BrandFloat
              src="/images/ramp.png"
              alt="Ramp brand campaign"
              label="RAMP"
              width={320}
              height={258}
              bg="#1A1A1A"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

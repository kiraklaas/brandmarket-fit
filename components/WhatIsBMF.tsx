"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

export default function WhatIsBMF() {
  return (
    <section className="bg-[#FAFAF8] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DED6]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-12 md:gap-16 items-start">

          {/* Left: heading + body */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#1A1A1A] mb-6">
              The Framework
            </p>
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] leading-[0.92] mb-10"
              style={{ fontFamily: "var(--font-graphik), system-ui, sans-serif" }}
            >
              What is <BmfUnderline>BMF</BmfUnderline>?
            </h2>

            <div className="space-y-6">
              <p
                className="text-[1.25rem] md:text-[1.35rem] leading-relaxed text-[#1A1A1A]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                Brand-market fit is the state in which a company&apos;s brand — its positioning, messaging, visual identity, and market presence — resonates so clearly and durably with its target audience that it creates a sustainable competitive advantage.
              </p>
              <p
                className="text-[1.25rem] md:text-[1.35rem] leading-relaxed text-[#1A1A1A]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                Like product-market fit, BMF is not a one-time achievement; it requires ongoing calibration as markets, competitors, and audiences evolve.
              </p>
            </div>

            {/* Three quick stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-[#E2DED6]">
              {[
                { label: "What it is", body: "Fit between who you say you are and what your market feels about you." },
                { label: "What it's not", body: "A logo. A rebrand. A tagline. Those are outputs, not outcomes." },
                { label: "Why it matters", body: "Higher LTV, lower CAC, pricing power, and word-of-mouth that scales." },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#1A1A1A] mb-2">
                    {item.label}
                  </p>
                  <p
                    className="text-sm text-[#1A1A1A] leading-relaxed"
                    style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: "0.95rem" }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: stacked rounded-rect brand images */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            {/* Image card 1 */}
            <div
              className="w-full overflow-hidden flex items-center justify-center"
              style={{
                borderRadius: 20,
                background: "#EBE6DC",
                aspectRatio: "4/3",
              }}
            >
              <Image
                src="/images/claude.png"
                alt="Claude brand campaign"
                width={320}
                height={258}
                className="object-contain w-full h-full p-6"
                draggable={false}
              />
            </div>
            {/* Image card 2 */}
            <div
              className="w-full overflow-hidden flex items-center justify-center"
              style={{
                borderRadius: 20,
                background: "#1A1A1A",
                aspectRatio: "4/3",
              }}
            >
              <Image
                src="/images/ramp.png"
                alt="Ramp brand campaign"
                width={320}
                height={258}
                className="object-contain w-full h-full p-6"
                draggable={false}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

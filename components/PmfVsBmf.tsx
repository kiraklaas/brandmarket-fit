"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BmfUnderline } from "./BmfUnderline";

export default function PmfVsBmf() {
  return (
    <section className="bg-[#FAFAF8] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DED6]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left: copy */}
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
              <span
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontWeight: 400,
                  textDecoration: "underline",
                  textDecorationColor: "#1A1A1A",
                  textDecorationThickness: "3px",
                  textUnderlineOffset: "8px",
                }}
              >
                PMF
              </span>{" "}
              or{" "}
              <BmfUnderline>BMF</BmfUnderline>?
            </h2>

            <div className="space-y-5">
              <p
                className="text-[1.4rem] md:text-[1.5rem] leading-relaxed text-[#1A1A1A]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                Brand-market fit complements product-market fit: PMF ensures the product solves the right problem. BMF ensures the brand creates a meaningful connection with customers around how that problem is solved and who solves it.
              </p>
              <p
                className="text-[1.4rem] md:text-[1.5rem] leading-relaxed text-[#1A1A1A]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                PMF gets you in the game. BMF helps you win it.
              </p>
            </div>
          </motion.div>

          {/* Right: transparent PNG with label */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="relative inline-block">
              {/* Upper-right brand label */}
              <span
                className="absolute text-[9px] font-medium tracking-[0.12em] uppercase text-[#1A1A1A] whitespace-nowrap"
                style={{ fontFamily: "var(--font-graphik), system-ui", top: -18, right: 0 }}
              >
                OURA
              </span>
              <Image
                src="/images/oura.png"
                alt="Oura ring"
                width={260}
                height={240}
                className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
                draggable={false}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

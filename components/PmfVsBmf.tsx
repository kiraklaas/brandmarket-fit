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
                }}
              >
                PMF
              </span>{" "}
              or{" "}
              <BmfUnderline>BMF</BmfUnderline>?
            </h2>

            <div className="space-y-5">
              <p
                className="text-[1.25rem] md:text-[1.35rem] leading-relaxed text-[#1A1A1A]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                Brand-market fit complements product-market fit: PMF ensures the product solves the <em style={{ fontStyle: "italic" }}>right problem</em>. BMF ensures the brand creates a meaningful connection with customers around <em style={{ fontStyle: "italic" }}>how</em> that problem is solved and who solves it.
              </p>
              <p
                className="text-[1.25rem] md:text-[1.35rem] leading-relaxed text-[#1A1A1A]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                PMF gets you in the game. BMF helps you win it.
              </p>
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div
              className="w-full overflow-hidden flex items-center justify-center"
              style={{
                borderRadius: 20,
                background: "#EBE6DC",
                aspectRatio: "3/4",
              }}
            >
              <Image
                src="/images/oura.png"
                alt="Oura brand"
                width={340}
                height={453}
                className="object-contain w-full h-full p-10"
                draggable={false}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

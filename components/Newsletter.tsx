"use client";

import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="bg-[#1A1A1A] py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-3xl md:text-5xl leading-tight mb-5"
            style={{
              fontFamily: "var(--font-editorial), Georgia, serif",
              fontStyle: "normal",
              color: "#FDFBF5",
            }}
          >
            Want more like this?
          </h2>
          <p className="text-[#A09890] text-sm leading-relaxed">
            Weekly frameworks, examples, and takes on brand building — from
            someone who&apos;s done it at Notion, Brex, and beyond.
          </p>
        </motion.div>

        {/* Right: Substack embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <iframe
            src="https://kiraklaas.substack.com/embed"
            width="100%"
            height="150"
            style={{
              border: "1px solid #2A2A2A",
              background: "#1A1A1A",
              borderRadius: "16px",
              colorScheme: "dark",
            }}
            frameBorder="0"
            scrolling="no"
            title="On Brand newsletter by Kira Klaas"
          />
        </motion.div>
      </div>
    </section>
  );
}

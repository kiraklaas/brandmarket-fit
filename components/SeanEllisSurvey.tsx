"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SeanEllisSurvey() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="survey"
      className="bg-[#FDFBF5] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DED6]"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#1A1A1A] mb-4">
            Want to go deeper? Run the survey.
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-6"
            style={{
              fontFamily: "var(--font-stack), 'Arial Black', sans-serif",
            }}
          >
            The Sean Ellis test for brand.
          </h2>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-4">
            Sean Ellis&apos;s PMF survey asks users:{" "}
            &ldquo;How would you feel if you could no longer use this product?&rdquo;
            {" "}— with 40%+ answering &ldquo;Very disappointed&rdquo; as the benchmark for PMF.
          </p>
          <p className="text-sm text-[#1A1A1A] leading-relaxed mb-6">
            The Brand Market Fit survey asks:{" "}
            &ldquo;If this company completely overhauled their brand tomorrow — new name, new visual identity, new messaging — how would you feel?&rdquo;
          </p>
          <p className="text-sm font-semibold text-[#1A1A1A]">
            40%+ responding &ldquo;Very upset&rdquo; is the signal for strong BMF.
          </p>
        </motion.div>

        {/* Right: email gate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="border border-[#E2DED6] rounded-2xl p-8">
            <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#1A1A1A] mb-5">
              Free Download
            </p>
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-4 leading-snug">
              The 4-Question BMF Survey Instrument
            </h3>
            <ul className="space-y-2 mb-8">
              {[
                "Complete survey (4 questions, finalized word list)",
                "Recommended delivery channels",
                "How to interpret results by company stage",
                "Scoring guide",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-[#1A1A1A]"
                >
                  <span className="text-[#E5D62F] mt-0.5 flex-shrink-0 text-base leading-none">
                    ✦
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {submitted ? (
              <div className="text-sm text-[#1A1A1A]">
                <p className="font-semibold mb-1">✓ You&apos;re on the list.</p>
                <p>The survey instrument will be in your inbox shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-full text-sm border border-[#E2DED6] bg-white focus:outline-none focus:border-[#1A1A1A] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full bg-[#1A1A1A] text-[#FDFBF5] text-sm font-medium hover:bg-[#333] transition-colors"
                >
                  Get the survey →
                </button>
                <p className="text-[10px] text-[#1A1A1A] text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

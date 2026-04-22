"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { AssessmentResult } from "@/lib/scoring";
import {
  BAND_LABELS,
  BAND_DESCRIPTIONS,
  SIGNAL_VERDICT_COPY,
} from "@/lib/scoring";
import SignalBars from "./SignalBars";
import Fingerprint from "./Fingerprint";

type VizTab = "bars" | "fingerprint";

interface ResultsProps {
  result: AssessmentResult;
  onRetake: () => void;
}

export default function Results({ result, onRetake }: ResultsProps) {
  const [vizTab, setVizTab] = useState<VizTab>("bars");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { dimensionScores, total, band, signal } = result;
  const bandLabel = BAND_LABELS[band];
  const bandDesc = BAND_DESCRIPTIONS[band];
  const signalVerdict = SIGNAL_VERDICT_COPY[signal];

  const bandColor =
    band === "strong"
      ? "#1A1A1A"
      : band === "approaching"
      ? "#5C5650"
      : band === "developing"
      ? "#A39A90"
      : "#C8BFB5";

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For MVP — could hook up to Substack API or similar later
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      {/* Score header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#1A1A1A] mb-2">
            Your BMF Score
          </p>
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-7xl font-black leading-none text-[#1A1A1A]"
              style={{ fontFamily: "var(--font-stack), sans-serif", letterSpacing: "-0.03em" }}
            >
              {total}
            </span>
            <span className="text-2xl text-[#1A1A1A] font-normal">/25</span>
          </div>
        </div>
        <div className="text-right">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-bold"
            style={{
              background: bandColor,
              color: band === "pre-bmf" ? "#1A1A1A" : "#FDFBF5",
            }}
          >
            {bandLabel}
          </span>
          <p className="text-xs text-[#1A1A1A] mt-2 max-w-[160px] text-right leading-snug">
            {bandDesc}
          </p>
        </div>
      </div>

      {/* Viz toggle */}
      <div className="flex gap-1 mb-6 bg-[#F0EDE8] rounded-full p-1 w-fit">
        {(["bars", "fingerprint"] as VizTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setVizTab(tab)}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              background: vizTab === tab ? "#1A1A1A" : "transparent",
              color: vizTab === tab ? "#FDFBF5" : "#1A1A1A",
            }}
          >
            {tab === "bars" ? "Signal Bars" : "Fingerprint"}
          </button>
        ))}
        <button
          className="px-4 py-1.5 rounded-full text-xs font-medium text-[#1A1A1A] cursor-not-allowed"
          disabled
          title="Coming soon — need more submissions to build benchmark data"
        >
          Matrix →
        </button>
      </div>

      {/* Visualization */}
      <div className="mb-10">
        {vizTab === "bars" && (
          <SignalBars scores={dimensionScores} total={total} />
        )}
        {vizTab === "fingerprint" && (
          <div className="flex justify-center py-4">
            <Fingerprint scores={dimensionScores} size={280} />
          </div>
        )}
      </div>

      {/* Q11 BMF signal verdict */}
      <div className="border border-[#E2DED6] rounded-2xl p-6 mb-8">
        <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#1A1A1A] mb-3">
          Bonus — BMF Signal Question
        </p>
        <p className="text-sm font-bold text-[#1A1A1A] mb-1.5">
          {signalVerdict.headline}
        </p>
        <p className="text-sm text-[#1A1A1A] leading-relaxed mb-4">
          {signalVerdict.body}
        </p>
        <a
          href="#survey"
          className="text-xs font-medium text-[#1A1A1A] underline underline-offset-2"
        >
          Run this question on 30+ real customers →
        </a>
      </div>

      {/* Email capture */}
      <div className="bg-[#F5F2EE] rounded-2xl p-6 mb-6">
        <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
          Get the full scoring guide
        </p>
        <p className="text-xs text-[#1A1A1A] mb-4 leading-relaxed">
          Benchmark data from 100+ assessed brands, plus detailed next steps for each dimension.
        </p>
        {submitted ? (
          <p className="text-sm text-[#1A1A1A] font-medium">
            ✓ Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleEmailSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-full text-sm border border-[#E2DED6] bg-white focus:outline-none focus:border-[#1A1A1A] transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#1A1A1A] text-[#FDFBF5] text-sm font-medium hover:bg-[#333] transition-colors whitespace-nowrap"
            >
              Send it →
            </button>
          </form>
        )}
      </div>

      {/* Retake */}
      <button
        onClick={onRetake}
        className="text-xs text-[#1A1A1A] underline underline-offset-2 hover:text-[#1A1A1A] transition-colors"
      >
        Retake assessment
      </button>
    </motion.div>
  );
}

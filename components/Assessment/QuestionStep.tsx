"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Question } from "@/data/questions";

interface QuestionStepProps {
  question: Question;
  currentNumber: number;
  totalCore: number;
  value: number | number[] | undefined;
  onChange: (value: number | number[]) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
}

export default function QuestionStep({
  question,
  currentNumber,
  totalCore,
  value,
  onChange,
  onNext,
  onBack,
  isFirst,
}: QuestionStepProps) {
  const [localMulti, setLocalMulti] = useState<number[]>(
    Array.isArray(value) ? value : []
  );

  // Sync localMulti when question changes
  useEffect(() => {
    setLocalMulti(Array.isArray(value) ? value : []);
  }, [question.id, value]);

  const progressLabel = question.isBonus
    ? "Bonus"
    : `${currentNumber} / ${totalCore}`;

  const progressPct = question.isBonus
    ? 100
    : (currentNumber / totalCore) * 100;

  function handleMultiToggle(optionValue: number) {
    let next: number[];
    if (optionValue === 0) {
      // "None of the above" — mutually exclusive
      next = localMulti.includes(0) ? [] : [0];
    } else {
      // Deselect "None" if any positive option is selected
      const without0 = localMulti.filter((v) => v !== 0);
      if (without0.includes(optionValue)) {
        next = without0.filter((v) => v !== optionValue);
      } else {
        next = [...without0, optionValue];
      }
    }
    setLocalMulti(next);
    onChange(next);
  }

  const hasValue =
    question.type === "multiselect"
      ? localMulti.length > 0
      : value !== undefined;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto"
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#888]">
            {question.isBonus ? "Bonus Question" : `Question ${progressLabel}`}
          </span>
          <span className="text-[10px] text-[#C8BFB5]">
            {question.isBonus ? "Not scored" : `${Math.round(progressPct)}%`}
          </span>
        </div>
        <div className="h-1 bg-[#F0EDE8] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#1A1A1A] rounded-full"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        {question.isBonus && (
          <p className="text-[10px] text-[#A09890] mt-2">
            This question mirrors the customer survey you can run externally. Reported separately from your score.
          </p>
        )}
      </div>

      {/* Question text */}
      <h3 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] leading-snug mb-8">
        {question.text}
      </h3>

      {/* Options */}
      <div className="space-y-2.5 mb-10">
        {question.type === "multiselect" ? (
          <>
            {question.options.map((opt) => {
              const isChecked = localMulti.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all"
                  style={{
                    border: isChecked
                      ? "1.5px solid #1A1A1A"
                      : "1.5px solid #E2DED6",
                    background: isChecked ? "#F5F2EE" : "white",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleMultiToggle(opt.value)}
                    className="mt-0.5 w-4 h-4 accent-[#1A1A1A] flex-shrink-0"
                  />
                  <span className="text-sm text-[#1A1A1A] leading-snug">
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </>
        ) : (
          <>
            {/* Deduplicate options with same value (Q8 has two value=2 options) */}
            {question.options
              .filter(
                (opt, idx, arr) =>
                  arr.findIndex((o) => o.label === opt.label) === idx
              )
              .map((opt) => {
                const isSelected = value === opt.value;
                return (
                  <button
                    key={opt.label}
                    onClick={() => onChange(opt.value)}
                    className="w-full text-left p-4 rounded-xl border transition-all"
                    style={{
                      border: isSelected
                        ? "1.5px solid #1A1A1A"
                        : "1.5px solid #E2DED6",
                      background: isSelected ? "#F5F2EE" : "white",
                    }}
                  >
                    <span className="text-sm text-[#1A1A1A] leading-snug">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {!isFirst && (
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-full border border-[#E2DED6] text-sm font-medium text-[#888] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
          >
            ← Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!hasValue}
          className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
          style={{
            background: hasValue ? "#1A1A1A" : "#E2DED6",
            color: hasValue ? "#FDFBF5" : "#A09890",
            cursor: hasValue ? "pointer" : "not-allowed",
          }}
        >
          {question.isBonus ? "See results →" : "Continue →"}
        </button>
      </div>
    </motion.div>
  );
}

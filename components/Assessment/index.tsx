"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS } from "@/data/questions";
import {
  computeResult,
  answersToParams,
  paramsToAnswers,
} from "@/lib/scoring";
import QuestionStep from "./QuestionStep";
import Results from "./Results";

type Step = "intro" | "question" | "results";

export default function Assessment() {
  const [step, setStep] = useState<Step>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | number[]>>({});

  // On mount: check for URL params (for shareable/refresh-safe results)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = paramsToAnswers(window.location.search);
    const answerCount = Object.keys(params).length;
    if (answerCount === QUESTIONS.length) {
      setAnswers(params);
      setStep("results");
    } else if (answerCount > 0) {
      // Partial answers — resume where they left off
      setAnswers(params);
      const lastAnswered = Math.max(
        ...Object.keys(params)
          .map((k) => parseInt(k.replace("q", "")) - 1)
          .filter((n) => !isNaN(n))
      );
      setCurrentQ(Math.min(lastAnswered + 1, QUESTIONS.length - 1));
      setStep("question");
    }
  }, []);

  // Sync answers to URL params
  const syncToUrl = useCallback(
    (newAnswers: Record<string, number | number[]>) => {
      if (typeof window === "undefined") return;
      const params = answersToParams(newAnswers);
      const url = params
        ? `${window.location.pathname}?${params}${window.location.hash}`
        : window.location.pathname + window.location.hash;
      window.history.replaceState(null, "", url);
    },
    []
  );

  function handleAnswer(value: number | number[]) {
    const question = QUESTIONS[currentQ];
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    syncToUrl(newAnswers);
  }

  function handleNext() {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("results");
    }
  }

  function handleBack() {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  }

  function handleRetake() {
    setAnswers({});
    setCurrentQ(0);
    setStep("intro");
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname + "#assessment");
    }
  }

  const coreQuestions = QUESTIONS.filter((q) => !q.isBonus);
  const question = QUESTIONS[currentQ];

  const result =
    step === "results" && Object.keys(answers).length > 0
      ? computeResult(answers)
      : null;

  return (
    <section
      id="assessment"
      className="bg-[#FAFAF8] py-24 md:py-32 px-6 md:px-10 border-t border-[#E2DED6]"
    >
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#1A1A1A] mb-4">
                Self-Assessment
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
                style={{
                  fontFamily: "var(--font-graphik), system-ui, sans-serif",
                }}
              >
                How strong is your BMF?
              </h2>
              <p
                className="text-[1.35rem] text-[#1A1A1A] mb-2 leading-relaxed"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                Answer 10 questions + one bonus. Takes ~4 minutes.
                No login required.
              </p>
              <p
                className="text-[1.2rem] text-[#1A1A1A] mb-10 leading-relaxed"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
              >
                2 questions per dimension (internal signal + external signal).
                Results show your score out of 25, broken down by dimension,
                with specific next steps.
              </p>
              <button
                onClick={() => setStep("question")}
                className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#FAFAF8] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
              >
                Start the assessment →
              </button>
            </motion.div>
          )}

          {step === "question" && question && (
            <motion.div
              key={`question-${currentQ}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <QuestionStep
                question={question}
                currentNumber={
                  question.isBonus
                    ? coreQuestions.length
                    : question.number
                }
                totalCore={coreQuestions.length}
                value={answers[question.id]}
                onChange={handleAnswer}
                onNext={handleNext}
                onBack={handleBack}
                isFirst={currentQ === 0}
              />
            </motion.div>
          )}

          {step === "results" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#1A1A1A] mb-6">
                Your Results
              </p>
              <Results result={result} onRetake={handleRetake} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";

interface BrandImage {
  src: string;
  label: string;
  alt: string;
  width: number;
  height: number;
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  mouseX: number;
  mouseY: number;
  scrollY: number;
}

const BRAND_IMAGES: BrandImage[] = [
  {
    src: "/images/poppi.png",
    label: "POPPI",
    alt: "Poppi soda can",
    width: 90,
    height: 108,
    top: "8%",
    left: "36%",
    rotate: -7,
    mouseX: 0.5,
    mouseY: 0.3,
    scrollY: 0.28,
  },
  {
    src: "/images/sweetgreen.png",
    label: "SWEETGREEN",
    alt: "Sweetgreen fries",
    width: 100,
    height: 90,
    top: "7%",
    right: "4%",
    rotate: 5,
    mouseX: -0.4,
    mouseY: 0.5,
    scrollY: 0.45,
  },
  {
    src: "/images/claude.png",
    label: "CLAUDE",
    alt: "Claude billboard",
    width: 140,
    height: 113,
    top: "40%",
    left: "17%",
    rotate: -3,
    mouseX: 0.3,
    mouseY: -0.4,
    scrollY: 0.38,
  },
  {
    src: "/images/ramp.png",
    label: "RAMP",
    alt: "Ramp OOH ad",
    width: 125,
    height: 106,
    top: "28%",
    right: "8%",
    rotate: 6,
    mouseX: -0.3,
    mouseY: 0.4,
    scrollY: 0.42,
  },
  {
    src: "/images/oura.png",
    label: "OURA",
    alt: "Oura ring",
    width: 88,
    height: 80,
    top: "65%",
    left: "40%",
    rotate: -4,
    mouseX: 0.4,
    mouseY: 0.2,
    scrollY: 0.32,
  },
  {
    src: "/images/away.png",
    label: "AWAY",
    alt: "Away suitcase",
    width: 110,
    height: 136,
    top: "52%",
    right: "3%",
    rotate: 4,
    mouseX: -0.5,
    mouseY: -0.3,
    scrollY: 0.55,
  },
];

// Words that get Instrument Serif treatment (regular, not italic)
const SERIF_WORDS = new Set(["PRODUCT", "ISN'T", "GOOD", "BRAND"]);

function Word({ text }: { text: string }) {
  const clean = text.replace(/[^A-Z']/g, "");
  const isSerif = SERIF_WORDS.has(clean);

  return (
    <span
      style={{
        fontFamily: isSerif
          ? '"Instrument Serif", Georgia, serif'
          : "var(--font-graphik), system-ui, sans-serif",
        fontWeight: isSerif ? 400 : 600,
        fontStyle: "normal",
        letterSpacing: isSerif ? "-0.01em" : "-0.03em",
      }}
    >
      {text}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollY } = useScroll();

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const line1Words = ["YOUR", "PRODUCT", "MARKET", "FIT", "ISN'T", "ENOUGH."];
  const line2Words = ["HOW", "GOOD", "IS", "YOUR", "BRAND", "MARKET", "FIT?"];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#FAFAF8]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <span className="text-sm font-medium tracking-tight text-[#1A1A1A]">
          brandmarket.fit
        </span>
        <a
          href="#assessment"
          className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#FAFAF8] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#333] transition-colors"
        >
          Take the assessment →
        </a>
      </nav>

      {/* Floating brand images — z-index above text */}
      {BRAND_IMAGES.map((img) => (
        <FloatingImage
          key={img.label}
          img={img}
          smoothX={smoothX}
          smoothY={smoothY}
          scrollY={scrollY}
        />
      ))}

      {/* Headline */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 pb-20 pt-4">
        {/* Lead-in line */}
        <motion.p
          className="text-base md:text-lg text-[#1A1A1A] mb-4 leading-snug"
          style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          So you found product market fit.
        </motion.p>

        <h1
          className="uppercase text-[#1A1A1A] select-none leading-[0.88]"
          style={{
            fontSize: "clamp(3rem, 7.5vw, 8.5rem)",
          }}
        >
          {/* Line 1 */}
          <span className="block">
            {line1Words.map((w, i) => (
              <span key={i}>
                <Word text={w} />
                {i < line1Words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
          {/* Line 2 */}
          <span className="block">
            {line2Words.map((w, i) => (
              <span key={i}>
                <Word text={w} />
                {i < line2Words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        </h1>
      </div>
    </section>
  );
}

function FloatingImage({
  img,
  smoothX,
  smoothY,
  scrollY,
}: {
  img: BrandImage;
  smoothX: ReturnType<typeof useSpring>;
  smoothY: ReturnType<typeof useSpring>;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
}) {
  const x = useTransform(smoothX, (v) => v * img.mouseX * 0.04);
  const y = useTransform(smoothY, (v) => v * img.mouseY * 0.04);
  const scrollOffset = useTransform(
    scrollY,
    [0, 800],
    [0, img.scrollY * 100]
  );
  const combinedY = useTransform(
    [y, scrollOffset],
    ([mouseYVal, scrollVal]: number[]) => mouseYVal + scrollVal
  );

  return (
    <motion.div
      className="absolute z-20 pointer-events-none select-none"
      style={{
        top: img.top,
        left: img.left,
        right: img.right,
        x,
        y: combinedY,
        rotate: img.rotate,
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.16)]"
          draggable={false}
        />
        <span
          className="text-[9px] font-medium tracking-[0.1em] text-[#1A1A1A] uppercase"
          style={{ fontFamily: "var(--font-graphik), system-ui" }}
        >
          {img.label}
        </span>
      </div>
    </motion.div>
  );
}

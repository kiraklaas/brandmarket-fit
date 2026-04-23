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
  mouseX: number;
  mouseY: number;
  scrollY: number;
}

// No Ramp. No rotation. Claude ~40% bigger, Away ~100% bigger.
const BRAND_IMAGES: BrandImage[] = [
  {
    src: "/images/poppi.png",
    label: "POPPI",
    alt: "Poppi soda can",
    width: 78,
    height: 94,
    top: "10%",
    left: "46%",
    mouseX: 0.5,
    mouseY: 0.3,
    scrollY: 0.28,
  },
  {
    src: "/images/sweetgreen.png",
    label: "SWEETGREEN",
    alt: "Sweetgreen fries",
    width: 105,
    height: 94,
    top: "6%",
    right: "5%",
    mouseX: -0.4,
    mouseY: 0.5,
    scrollY: 0.45,
  },
  {
    src: "/images/claude.png",
    label: "CLAUDE",
    alt: "Claude billboard",
    width: 196,
    height: 158,
    top: "32%",
    left: "8%",
    mouseX: 0.3,
    mouseY: -0.4,
    scrollY: 0.38,
  },
  {
    src: "/images/oura.png",
    label: "OURA",
    alt: "Oura ring",
    width: 90,
    height: 82,
    top: "58%",
    left: "34%",
    mouseX: 0.4,
    mouseY: 0.2,
    scrollY: 0.32,
  },
  {
    src: "/images/away.png",
    label: "AWAY",
    alt: "Away suitcase",
    width: 220,
    height: 272,
    top: "38%",
    right: "2%",
    mouseX: -0.5,
    mouseY: -0.3,
    scrollY: 0.55,
  },
];

// Words that get Instrument Serif treatment
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

      {/* Floating brand images */}
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
        {/* Lead-in */}
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
          style={{ fontSize: "clamp(3rem, 7.5vw, 8.5rem)" }}
        >
          <span className="block">
            {line1Words.map((w, i) => (
              <span key={i}>
                <Word text={w} />
                {i < line1Words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
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
  const scrollOffset = useTransform(scrollY, [0, 800], [0, img.scrollY * 100]);
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
        // No rotation
      }}
    >
      {/* Image with label at upper-right, 16px above, right-aligned */}
      <div className="relative inline-block">
        <span
          className="absolute whitespace-nowrap text-[9px] font-medium tracking-[0.12em] text-[#1A1A1A] uppercase"
          style={{
            fontFamily: "var(--font-graphik), system-ui",
            top: -18,
            right: 0,
          }}
        >
          {img.label}
        </span>
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";

interface BrandImage {
  src: string;
  label: string;
  alt: string;
  width: number;
  height: number;
  // Position within the hero grid
  top: string;
  left?: string;
  right?: string;
  rotate: number;
  // Parallax factors (how much the image moves relative to mouse/scroll)
  mouseX: number;
  mouseY: number;
  scrollY: number;
}

const BRAND_IMAGES: BrandImage[] = [
  {
    src: "/images/poppi.png",
    label: "POPPI",
    alt: "Poppi soda can",
    width: 110,
    height: 130,
    top: "12%",
    left: "38%",
    rotate: -8,
    mouseX: 0.6,
    mouseY: 0.4,
    scrollY: 0.3,
  },
  {
    src: "/images/sweetgreen.png",
    label: "SWEETGREEN",
    alt: "Sweetgreen fries",
    width: 120,
    height: 110,
    top: "10%",
    right: "6%",
    rotate: 6,
    mouseX: -0.4,
    mouseY: 0.6,
    scrollY: 0.5,
  },
  {
    src: "/images/claude.png",
    label: "CLAUDE",
    alt: "Claude billboard",
    width: 160,
    height: 130,
    top: "42%",
    left: "20%",
    rotate: -4,
    mouseX: 0.3,
    mouseY: -0.5,
    scrollY: 0.4,
  },
  {
    src: "/images/away.png",
    label: "AWAY",
    alt: "Away suitcase",
    width: 130,
    height: 160,
    top: "55%",
    right: "5%",
    rotate: 5,
    mouseX: -0.5,
    mouseY: -0.3,
    scrollY: 0.6,
  },
  {
    src: "/images/oura.png",
    label: "OURA",
    alt: "Oura ring",
    width: 100,
    height: 90,
    top: "68%",
    left: "42%",
    rotate: -3,
    mouseX: 0.5,
    mouseY: 0.3,
    scrollY: 0.35,
  },
  {
    src: "/images/ramp.png",
    label: "RAMP",
    alt: "Ramp OOH ad",
    width: 140,
    height: 120,
    top: "30%",
    right: "12%",
    rotate: 7,
    mouseX: -0.3,
    mouseY: 0.5,
    scrollY: 0.45,
  },
];

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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#FDFBF5]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <span
          className="text-sm font-medium tracking-tight text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-graphik), system-ui" }}
        >
          brandmarket.fit
        </span>
        <a
          href="#assessment"
          className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#FDFBF5] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#333] transition-colors"
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
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 pb-24 pt-8">
        <h1
          className="font-hero uppercase leading-[0.88] text-[#1A1A1A] select-none"
          style={{
            fontFamily: "var(--font-stack), 'Arial Black', Impact, sans-serif",
            fontSize: "clamp(3.5rem, 10vw, 10rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span className="block">Your product market fit</span>
          <span className="block">isn&apos;t enough.</span>
          <span className="block mt-2">How good is your</span>
          <span className="block">brand market fit?</span>
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
  const scrollOffset = useTransform(scrollY, [0, 800], [0, img.scrollY * 120]);
  const combinedY = useTransform(
    [y, scrollOffset],
    ([mouseYVal, scrollVal]: number[]) => mouseYVal + scrollVal
  );

  return (
    <motion.div
      className="absolute z-10 pointer-events-none select-none"
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
          className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
          draggable={false}
        />
        <span
          className="text-[10px] font-medium tracking-[0.12em] text-[#888] uppercase"
          style={{ fontFamily: "var(--font-graphik), system-ui" }}
        >
          {img.label}
        </span>
      </div>
    </motion.div>
  );
}

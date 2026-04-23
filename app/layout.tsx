import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Body font — Graphik
const graphik = localFont({
  src: [
    { path: "../public/fonts/GraphikRegular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/GraphikRegularItalic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/GraphikMedium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/GraphikMediumItalic.otf", weight: "500", style: "italic" },
    { path: "../public/fonts/GraphikSemibold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/GraphikSemiboldItalic.otf", weight: "600", style: "italic" },
  ],
  variable: "--font-graphik",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// Editorial font — Instrument Serif (wired via @font-face in globals.css)

export const metadata: Metadata = {
  title: "Brand Market Fit — How good is yours?",
  description:
    "PMF gets you in the game. Brand-market fit helps you win it. Assess your BMF across 5 dimensions: Clarity, Differentiation, Resonance, Consistency, and Governance.",
  openGraph: {
    title: "Brand Market Fit — How good is yours?",
    description: "PMF gets you in the game. Brand-market fit helps you win it.",
    url: "https://brandmarket.fit",
    siteName: "brandmarket.fit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Market Fit — How good is yours?",
    description: "PMF gets you in the game. Brand-market fit helps you win it.",
  },
  metadataBase: new URL("https://brandmarket.fit"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${graphik.variable}`}>
      <body className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}

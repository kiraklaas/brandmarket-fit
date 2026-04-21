import Hero from "@/components/Hero";
import WhatIsBMF from "@/components/WhatIsBMF";
import ScoredBrands from "@/components/ScoredBrands";
import FiveDimensions from "@/components/FiveDimensions";
import Assessment from "@/components/Assessment";
import SeanEllisSurvey from "@/components/SeanEllisSurvey";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIsBMF />
      <ScoredBrands />
      <FiveDimensions />
      <Assessment />
      <SeanEllisSurvey />
      <Newsletter />
      <Footer />
    </main>
  );
}

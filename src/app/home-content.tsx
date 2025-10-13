"use client";

import { useEffect, useRef } from "react";
import Hero from "@/app/components/hero";
import FaultyTerminal from "@/app/components/bg";
import Footer from "@/app/components/footer";
import About from "@/app/components/about";

type Props = {
  heroBackgroundEnabled: boolean;
};

export default function HomeContent({ heroBackgroundEnabled }: Props) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroBackgroundEnabled) return; // no-op when background is disabled

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const blurAmount = Math.min(scrollY / 60, 10);

          if (bgRef.current) {
            bgRef.current.style.filter = `blur(${blurAmount}px)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroBackgroundEnabled]);

  return (
    <div className="relative min-h-screen">
      {heroBackgroundEnabled && (
        <div
          ref={bgRef}
          className="fixed top-0 left-0 w-full h-screen pointer-events-none will-change-[filter]"
          style={{ zIndex: 0 }}
        >
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={1}
            dither={0}
            curvature={0}
            tint="#FF0000"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={true}
            brightness={0.3}
          />
        </div>
      )}

      <div className="relative" style={{ zIndex: 1 }}>
        <div className="h-screen flex items-center justify-center p-8 sm:p-20">
          <div className="w-full max-w-6xl">
            <Hero />
          </div>
        </div>

        <div className="relative bg-background rounded-t-[3rem] pt-20 pb-20 shadow-2xl min-h-screen">
          <About />
        </div>
        <Footer />
      </div>
    </div>
  );
}


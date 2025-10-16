"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Hero from "@/app/components/hero";
import Footer from "@/app/components/footer";
import About from "@/app/components/about";
import GradualBlur from "@/components/ui/gradual-blur";
import { BlurFade } from "@/components/ui/blur-fade";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bgRef.current) {
            bgRef.current.style.filter = 'blur(5px)';
        }
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* Fixed background (code-split, client-only) */}
            <Background ref={bgRef} />

            {/* Fixed hero layer under header, above background */}
            <div className="fixed inset-0 z-10 flex items-center justify-center px-8 sm:px-20 pointer-events-auto" data-testid="fixed-hero-layer">
                <div className="w-full max-w-6xl">
                    <Hero />
                </div>
            </div>

            {/* Content (scrolls over hero) */}
            <div className="relative z-20 overflow-x-clip">
                {/* Spacer to reveal fixed hero before content overlays */}
                <div className="h-screen" aria-hidden />

                {/* About section that overlaps */}
                <div className="relative bg-background rounded-t-[3rem] pt-20 pb-20 shadow-2xl min-h-screen" data-testid="about-section">
                    <About />
                </div>
                <Footer />
            </div>
        </div>
    );
}

// Lazy background container
const FaultyTerminal = dynamic(() => import("@/app/components/bg"), { ssr: false, loading: () => null });

const Background = React.forwardRef<HTMLDivElement, {}>(function Background(_, ref) {
    return (
        <div ref={ref} className="fixed top-0 left-0 w-full h-screen pointer-events-none will-change-[filter]" style={{ zIndex: 0 }} data-testid="bg-layer">
            <FaultyTerminal scale={1.5} gridMul={[2, 1]} digitSize={1.2} timeScale={1} pause={false} scanlineIntensity={1} glitchAmount={1} flickerAmount={1} noiseAmp={1} chromaticAberration={1} dither={0} curvature={0} tint="#FF0000" mouseReact={true} mouseStrength={0.5} pageLoadAnimation={true} brightness={0.3} />
        </div>
    );
});

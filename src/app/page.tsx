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
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* Fixed background (code-split, client-only) */}
            <Background ref={bgRef} />

            {/* Content */}
            <div className="relative overflow-x-clip" style={{ zIndex: 1 }}>
                {/* Hero section */}
                <div className="h-screen flex items-center justify-center p-8 sm:p-20 backdrop-blur supports-[backdrop-filter]:bg-background/5">
                    <div className="w-full max-w-6xl">
                        <Hero />
                    </div>
                </div>

                {/* About section that overlaps */}
                <div className="relative bg-background rounded-t-[3rem] pt-20 pb-20 shadow-2xl min-h-screen">
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
        <div ref={ref} className="fixed top-0 left-0 w-full h-screen pointer-events-none will-change-[filter]" style={{ zIndex: 0 }}>
            <FaultyTerminal scale={1.5} gridMul={[2, 1]} digitSize={1.2} timeScale={1} pause={false} scanlineIntensity={1} glitchAmount={1} flickerAmount={1} noiseAmp={1} chromaticAberration={1} dither={0} curvature={0} tint="#FF0000" mouseReact={true} mouseStrength={0.5} pageLoadAnimation={true} brightness={0.3} />
        </div>
    );
});

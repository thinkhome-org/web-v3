"use client";

import { useEffect, useRef } from "react";
import Hero from "@/app/components/hero";
import FaultyTerminal from "@/app/components/bg";
import Footer from "@/app/components/footer";
import About from "@/app/components/about";
import GradualBlur from "@/components/ui/gradual-blur";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Home() {
    const bgRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

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

                    // Parallax effect: hero moves slower than scroll (0.4x speed)
                    if (heroRef.current) {
                        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
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
            {/* Fixed background */}
            <div ref={bgRef} className="fixed top-0 left-0 w-full h-screen pointer-events-none will-change-[filter]" style={{ zIndex: 0 }}>
                {/* <FaultyTerminal scale={1.5} gridMul={[2, 1]} digitSize={1.2} timeScale={1} pause={false} scanlineIntensity={1} glitchAmount={1} flickerAmount={1} noiseAmp={1} chromaticAberration={1} dither={0} curvature={0} tint="#FF0000" mouseReact={true} mouseStrength={0.5} pageLoadAnimation={true} brightness={0.3} /> */}
            </div>

            {/* Content */}
            <div className="relative" style={{ zIndex: 1 }}>
                {/* Hero section */}
                <div className="h-screen flex items-center justify-center p-8 sm:p-20">
                    <div ref={heroRef} className="w-full max-w-6xl will-change-transform">
                        <Hero />
                    </div>
                </div>

                {/* About section that overlaps */}
                <section>
                    <div className="relative bg-background rounded-t-[3rem] pt-20 pb-20 shadow-2xl min-h-screen">
                        <About />
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
                    </div>
                    <GradualBlur target="parent" position="bottom" height="6rem" strength={2} divCount={5} curve="bezier" exponential={true} opacity={1} />
                </section>
            </div>
        </div>
    );
}

import React from "react";
import TerminalBackground from "@/app/components/terminal-background";
import Hero from "@/app/components/hero";
import Footer from "@/app/components/footer";
import About from "@/app/components/about";

export default function Home() {
    return (
        <div className="relative min-h-screen">
            {/* Fixed visual background rendered on a canvas (client-only) */}
            <Background />

            {/* Fixed hero layer under header, above background */}
            <div className="fixed inset-0 z-10 flex items-center justify-center px-8 sm:px-20 pointer-events-auto" data-testid="fixed-hero-layer">
                <div className="w-full max-w-6xl">
                    <Hero />
                </div>
            </div>

            {/* Content (scrolls over the fixed hero) */}
            <div className="relative z-20 overflow-x-clip pointer-events-none">
                {/* Spacer to reveal fixed hero before content overlays (does not block clicks) */}
                <div className="h-screen pointer-events-none" aria-hidden />

                {/* About section that overlaps */}
                <div className="relative bg-background rounded-t-[3rem] pt-20 pb-20 shadow-2xl min-h-screen pointer-events-auto" data-testid="about-section">
                    <About />
                </div>
                <Footer />
            </div>
        </div>
    );
}

function Background() {
    return (
        <div
            className="fixed top-0 left-0 w-full h-screen pointer-events-none will-change-[filter] filter blur-[5px]"
            style={{ zIndex: 0 }}
            data-testid="bg-layer"
        >
            {/* GPU shader background; tweak props to adjust the effect */}
            <TerminalBackground
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
    );
}

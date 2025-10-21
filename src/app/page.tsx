import React from "react"
import Hero from "@/app/components/hero"
import Footer from "@/app/components/footer"
import About from "@/app/components/about"
import Background from "@/app/components/background"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed visual background rendered on a canvas (client-only) */}
      <Background />

      {/* Fixed hero layer under header, above background */}
      <div
        className="fixed inset-0 z-10 flex items-center justify-center px-8 sm:px-20 pointer-events-auto backdrop-blur-sm supports-[backdrop-filter]:bg-background/10 bg-background/0"
        data-testid="fixed-hero-layer"
      >
        <div className="w-full max-w-6xl">
          <Hero />
        </div>
      </div>

      {/* Content (scrolls over the fixed hero) */}
      <div className="relative z-20 overflow-x-clip pointer-events-none">
        {/* Spacer to reveal fixed hero before content overlays (does not block clicks) */}
        <div id="hero-spacer" className="h-screen pointer-events-none" aria-hidden />

        {/* About section that overlaps */}
        <div
          className="relative bg-background rounded-t-[3rem] pt-20 pb-20 shadow-2xl min-h-screen pointer-events-auto"
          data-testid="about-section"
          style={{ contentVisibility: "auto", containIntrinsicSize: "1000px 1200px" }}
        >
          <About />
        </div>
        <Footer />
      </div>
    </div>
  )
}

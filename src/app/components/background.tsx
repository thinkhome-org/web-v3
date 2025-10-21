"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import Parallax from "@/components/parallax"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

const TerminalBackground = dynamic(() => import("@/app/components/terminal-background"), {
  ssr: false,
})

export default function Background() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [show, setShow] = useState(true)

  useEffect(() => {
    const spacer = document.getElementById("hero-spacer")
    if (!spacer) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setShow(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: [0, 0.01, 1],
      },
    )

    observer.observe(spacer)
    return () => observer.disconnect()
  }, [])

  if (prefersReducedMotion) return null
  if (!show) return null

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen pointer-events-none will-change-[filter] filter blur-[5px]"
      style={{ zIndex: 0 }}
      data-testid="bg-layer"
    >
      <Parallax strength={-0.2} className="w-full h-full">
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
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.3}
        />
      </Parallax>
    </div>
  )
}

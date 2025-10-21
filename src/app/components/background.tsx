"use client"

import dynamic from "next/dynamic"
import { useEffect, useState, useRef } from "react"
import Parallax from "@/components/parallax"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

const TerminalBackground = dynamic(() => import("@/app/components/terminal-background"), {
  ssr: false,
})

export default function Background() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [show, setShow] = useState(true)
  const [paused, setPaused] = useState(false)
  const idleTimer = useRef<number | null>(null)

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

  // Idle/visibility pause to save GPU
  useEffect(() => {
    if (!show) return

    const IDLE_MS = 20000

    const resetIdle = () => {
      setPaused(false)
      if (idleTimer.current) window.clearTimeout(idleTimer.current)
      idleTimer.current = window.setTimeout(() => setPaused(true), IDLE_MS)
    }

    const onVisibility = () => setPaused(document.hidden)

    resetIdle()
    window.addEventListener("mousemove", resetIdle, { passive: true })
    window.addEventListener("scroll", resetIdle, { passive: true })
    window.addEventListener("touchstart", resetIdle, { passive: true })
    window.addEventListener("keydown", resetIdle)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current)
      window.removeEventListener("mousemove", resetIdle)
      window.removeEventListener("scroll", resetIdle)
      window.removeEventListener("touchstart", resetIdle)
      window.removeEventListener("keydown", resetIdle)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [show])

  if (prefersReducedMotion) return null
  if (!show) return null

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen pointer-events-none"
      style={{ zIndex: 0, contain: "layout paint size", contentVisibility: "auto" }}
      data-testid="bg-layer"
    >
      <Parallax strength={-0.2} className="w-full h-full">
        <TerminalBackground
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.8}
          pause={paused}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0.5}
          dither={0}
          curvature={0}
          tint="#FF0000"
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.3}
          dpr={1.2}
        />
      </Parallax>
    </div>
  )
}

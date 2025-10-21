"use client"

import React, { useEffect, useRef } from "react"

interface ParallaxProps {
  children: React.ReactNode
  strength?: number // positive moves with scroll, negative moves against
  disabled?: boolean
  className?: string
}

export default function Parallax({ children, strength = -0.15, disabled = false, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (disabled) return

    const apply = () => {
      const y = window.scrollY || 0
      if (ref.current) {
        const ty = Math.round(y * strength)
        ref.current.style.transform = `translate3d(0, ${ty}px, 0)`
      }
      rafRef.current = null
    }

    const onScroll = () => {
      if (rafRef.current != null) return
      rafRef.current = requestAnimationFrame(apply)
    }

    // initial position
    apply()

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [strength, disabled])

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  )
}

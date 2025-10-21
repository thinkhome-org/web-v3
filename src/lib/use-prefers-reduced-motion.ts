"use client"

import { useEffect, useState } from "react"

export function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefers(mql.matches)

    const onChange = (e: MediaQueryListEvent) => setPrefers(e.matches)
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    } else {
      // Safari
      // @ts-ignore deprecated
      mql.addListener(onChange)
      return () => {
        // @ts-ignore deprecated
        mql.removeListener(onChange)
      }
    }
  }, [])

  return prefers
}

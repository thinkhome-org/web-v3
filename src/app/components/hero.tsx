"use client"

/**
 * Hero
 * - Centered headline and CTAs with subtle parallax.
 * - Sliding pill under links is decorative and handled by PillTabs.
 */

import type { MouseEvent } from "react"
import Parallax from "@/components/parallax"
import { BlurFade } from "@/components/ui/blur-fade"
import PillTabs from "@/components/ui/pill-tabs"
import { cn } from "@/lib/utils"
import { HERO_CTAS } from "@/config/nav"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()

  function scrollToId(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      history.replaceState(null, "", `#${id}`)
    }
  }

  const activeIndex = 0

  return (
    <Parallax strength={-0.28} disabled={prefersReducedMotion}>
      <div className="h-full flex flex-col items-center text-center justify-center">
        <div className="space-y-4">
          <BlurFade>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-balance break-words">
              Moderní IT bez starostí
            </h1>
          </BlurFade>
          <BlurFade>
            <h2 className="text-lg sm:text-xl md:text-2xl max-w-3xl text-pretty">
              IT, které prostě funguje. Zrychlíme práci, snížíme náklady a dáme technologiím jasný
              řád – přehledně, klidně a bez zbytečných složitostí.
            </h2>
          </BlurFade>
        </div>
        <div className="pt-8">
          <PillTabs
            items={HERO_CTAS}
            activeIndex={activeIndex}
            pillClassName="top-1.5 bottom-1.5"
            renderItem={({ item, ref, onMouseEnter, onFocus, isActive, className }) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                ref={ref}
                onMouseEnter={onMouseEnter}
                onFocus={onFocus}
                onClick={(e) => scrollToId(e, item.id)}
                className={cn(
                  className,
                  "px-6 py-3 text-base",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            )}
          />
        </div>
      </div>
    </Parallax>
  )
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DecryptedText from "@/components/DecryptedText";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Hero() {
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [indicator, setIndicator] = useState<{ width: number; left: number }>({ width: 0, left: 0 });

    const activeIndex = 0;

    function updateIndicatorFrom(index: number) {
        const el = itemRefs.current[index];
        const container = containerRef.current;
        if (!el || !container) return;
        const linkRect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setIndicator({ width: linkRect.width, left: linkRect.left - containerRect.left });
    }

    useEffect(() => {
        updateIndicatorFrom(activeIndex);
        const onResize = () => updateIndicatorFrom(activeIndex);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-full flex flex-col items-center text-center justify-center">
            <div className="space-y-4">
                <BlurFade><h1 className="text-6xl font-bold">Moderní IT bez starostí</h1></BlurFade>
                <BlurFade><h2 className="text-2xl max-w-3xl">
                    IT, které prostě funguje. Zrychlíme práci, snížíme náklady a dáme technologiím jasný řád – přehledně, klidně a bez zbytečných složitostí.
                </h2></BlurFade>
            </div>
            <div className="pt-8">
                <div ref={containerRef} className="group relative inline-flex items-center whitespace-nowrap rounded-full border p-1.5 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/30" onMouseLeave={() => updateIndicatorFrom(activeIndex)}>
                    <span className="pointer-events-none absolute left-0 top-1.5 bottom-1.5 rounded-full bg-foreground/10 shadow transition-[transform,width,background-color] duration-300 ease-out group-hover:bg-foreground/20" style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }} />
                    <Link
                        href="/sluzby"
                        ref={(el) => {
                            itemRefs.current[0] = el;
                        }}
                        onMouseEnter={() => updateIndicatorFrom(0)}
                        onFocus={() => updateIndicatorFrom(0)}
                        className="relative z-10 rounded-full px-6 py-3 text-base transition-colors text-muted-foreground hover:text-foreground"
                    >
                        Kontaktujte nás
                    </Link>
                    <Link
                        href="/contact"
                        ref={(el) => {
                            itemRefs.current[1] = el;
                        }}
                        onMouseEnter={() => updateIndicatorFrom(1)}
                        onFocus={() => updateIndicatorFrom(1)}
                        className="relative z-10 rounded-full px-6 py-3 text-base transition-colors text-muted-foreground hover:text-foreground"
                    >
                        Naše služby
                    </Link>
                </div>
            </div>
        </div>
    );
}

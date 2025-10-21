"use client";

import React, { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type MarginType = string | undefined;

type Direction = "up" | "down" | "left" | "right";

interface BlurFadeProps {
    children: React.ReactNode;
    className?: string;
    // kept for API compatibility (ignored)
    variant?: unknown;
    duration?: number;
    delay?: number;
    offset?: number;
    direction?: Direction;
    inView?: boolean;
    inViewMargin?: MarginType;
    blur?: string;
}

export function BlurFade({ children, className, variant, duration = 0.4, delay = 0, offset = 6, direction = "down", inView = true, inViewMargin = "-50px", blur = "6px", ...props }: BlurFadeProps) {
    const prefersReducedMotion = usePrefersReducedMotion();
    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(!inView);

    useEffect(() => {
        if (!inView) return;
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { root: null, rootMargin: inViewMargin, threshold: [0, 0.01, 1] },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [inView, inViewMargin]);

    const axis = direction === "left" || direction === "right" ? "X" : "Y";
    const sign = direction === "right" || direction === "down" ? -1 : 1;

    const style: CSSProperties = useMemo(() => {
        return {
            transitionProperty: "transform, opacity, filter",
            transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            transitionDuration: `${duration}s`,
            transitionDelay: `${Math.max(0, delay)}s`,
            transform: visible ? `translate${axis}(0px)` : `translate${axis}(${sign * offset}px)`,
            opacity: visible ? 1 : 0,
            filter: visible ? "blur(0px)" : `blur(${blur})`,
            willChange: "transform, opacity, filter",
        };
    }, [axis, sign, visible, duration, delay, offset, blur]);

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
}

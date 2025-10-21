"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = false,
    className,
}: {
    items: {
        quote: string;
        name: string;
        title: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    const [start, setStart] = useState(false);
    const [inView, setInView] = useState(false);
    const didClone = React.useRef(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || prefersReducedMotion) return;
        const io = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting);
        }, { threshold: 0.1 });
        io.observe(el);
        return () => io.disconnect();
    }, [prefersReducedMotion]);

    useEffect(() => {
        if (prefersReducedMotion) return;
        if (inView && !didClone.current) {
            addAnimation();
            didClone.current = true;
            setStart(true);
        } else if (!inView) {
            setStart(false);
        }
    }, [inView, prefersReducedMotion]);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards");
            } else {
                containerRef.current.style.setProperty("--animation-direction", "reverse");
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    if (prefersReducedMotion) {
        return (
            <div className={cn("relative z-20 max-w-7xl", className)}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                    {items.map((item, idx) => (
                        <li className="w-full relative rounded-2xl border border-border p-6 bg-card" key={idx}>
                            <blockquote>
                                <span className="text-sm leading-[1.6] text-foreground font-normal">{item.quote}</span>
                                <div className="mt-4 flex flex-col">
                                    <span className="text-sm leading-[1.6] text-foreground font-semibold">{item.name}</span>
                                    <span className="text-sm leading-[1.6] text-muted-foreground font-normal">{item.title}</span>
                                </div>
                            </blockquote>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={cn("scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]", className)}>
            <ul ref={scrollerRef} className={cn("flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap", start && "animate-scroll", pauseOnHover && "hover:[animation-play-state:paused]")}>
                {items.map((item, idx) => (
                    <li className="w-[350px] max-w-full relative rounded-2xl border border-border flex-shrink-0 p-8 bg-card transition-transform hover:-translate-y-1 duration-300" key={idx}>
                        <blockquote>
                            <div aria-hidden="true" className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"></div>
                            <span className="relative z-20 text-sm leading-[1.6] text-foreground font-normal">{item.quote}</span>
                            <div className="relative z-20 mt-6 flex flex-row items-center">
                                <span className="flex flex-col gap-1">
                                    <span className="text-sm leading-[1.6] text-foreground font-semibold">{item.name}</span>
                                    <span className="text-sm leading-[1.6] text-muted-foreground font-normal">{item.title}</span>
                                </span>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};

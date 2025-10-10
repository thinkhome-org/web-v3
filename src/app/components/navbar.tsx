"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type NavbarProps = {
    className?: string;
};

const links: Array<{ href: string; label: string }> = [
    { href: "/", label: "Domů" },
    { href: "/o-nas", label: "O nás" },
    { href: "/nas-tym", label: "Náš tým" },
    { href: "/sluzby", label: "Služby" },
];

export default function Navbar({ className }: NavbarProps) {
    const pathname = usePathname();
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [indicator, setIndicator] = useState<{ width: number; left: number }>({ width: 0, left: 0 });

    const activeIndex = (() => {
        const nonRootMatch = links.findIndex((l) => l.href !== "/" && pathname.startsWith(l.href));
        if (nonRootMatch !== -1) return nonRootMatch;
        return links.findIndex((l) => l.href === pathname) !== -1 ? links.findIndex((l) => l.href === pathname) : 0;
    })();

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
        // Recompute on resize to keep pill aligned
        const onResize = () => updateIndicatorFrom(activeIndex);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    return (
        <header className={cn("fixed top-4 z-50 w-full", className)}>
            <div className="mx-auto grid h-14 max-w-6xl grid-cols-3 items-center px-4">
                <div className="flex items-center gap-3">
                    <Link href="/" className="rounded-full border bg-background/40 backdrop-blur px-3 py-1.5 font-semibold tracking-tight shadow supports-[backdrop-filter]:bg-background/30">
                        ThinkHome
                    </Link>
                </div>

                <nav className="relative hidden justify-center md:flex">
                    <div ref={containerRef} className="group relative flex items-center whitespace-nowrap rounded-full border p-1 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/30" onMouseLeave={() => updateIndicatorFrom(activeIndex)}>
                        <span className="pointer-events-none absolute left-0 top-1 bottom-1 rounded-full bg-foreground/10 shadow transition-[transform,width,background-color] duration-300 ease-out group-hover:bg-foreground/20" style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }} />
                        {links.map((link, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    ref={(el) => {
                                        itemRefs.current[i] = el;
                                    }}
                                    onMouseEnter={() => updateIndicatorFrom(i)}
                                    onFocus={() => updateIndicatorFrom(i)}
                                    className={cn("relative z-10 rounded-full px-3 py-1.5 text-sm transition-colors", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <div className="flex items-center justify-end">
                    <Link href="/contact" className="group hidden md:inline-flex items-center rounded-full border p-1 shadow-lg backdrop-blur transition-colors supports-[backdrop-filter]:bg-background/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                        <span className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-[background-color,color] duration-300 group-hover:bg-foreground/10 group-hover:text-foreground">Kontakt</span>
                    </Link>
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open menu">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-72 p-0">
                                <div className="px-4 py-4">
                                    <Link href="/" className="font-semibold tracking-tight">
                                        ThinkHome
                                    </Link>
                                </div>
                                <div className="space-y-1 px-2 pb-4">
                                    {links.map((link) => (
                                        <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-foreground">
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}

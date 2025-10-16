"use client";

/**
 * Navbar
 * - Sticky, translucent header with a sliding "pill" indicator.
 * - Uses Next App Router; active link determined from pathname.
 */

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import PillTabs from "@/components/ui/pill-tabs";
import { MAIN_NAV_LINKS } from "@/config/nav";

type NavbarProps = {
    className?: string;
};

const links = MAIN_NAV_LINKS;

export default function Navbar({ className }: NavbarProps) {
    const pathname = usePathname() || "/";

    // Resolve which link is "active" based on the current path
    function getActiveIndex(path: string): number {
        const nonRootMatch = links.findIndex((l) => l.href !== "/" && path.startsWith(l.href))
        if (nonRootMatch !== -1) return nonRootMatch
        const exact = links.findIndex((l) => l.href === path)
        return exact !== -1 ? exact : 0
    }
    const activeIndex = getActiveIndex(pathname)

    // (Pill animation handled by PillTabs)

    return (
        <header className={cn("fixed top-4 z-50 w-full", className)}>
            <div className="mx-auto grid h-14 max-w-6xl grid-cols-3 items-center px-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="rounded-full border bg-background/40 backdrop-blur px-3 py-1.5 shadow supports-[backdrop-filter]:bg-background/30"
                        aria-label="ThinkHome domů"
                    >
                        <Image src="/logo-small.svg" alt="ThinkHome" width={155} height={30} className="h-6 w-auto" priority />
                    </Link>
                </div>

                <nav className="relative hidden justify-center md:flex" aria-label="Hlavní navigace">
                    <PillTabs
                        items={links}
                        activeIndex={activeIndex}
                        renderItem={({ item, index, ref, onMouseEnter, onFocus, isActive, className }) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                ref={ref}
                                onMouseEnter={onMouseEnter}
                                onFocus={onFocus}
                                className={cn(className, isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
                            >
                                {item.label}
                            </Link>
                        )}
                    />
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
                                {/* Accessible title/description for the dialog (hidden visually) */}
                                <SheetTitle className="sr-only">Navigace</SheetTitle>
                                <SheetDescription className="sr-only">Hlavní menu</SheetDescription>
                                <div className="px-4 py-4">
                                    <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
                                        <Image src="/logo-small.svg" alt="ThinkHome" width={155} height={30} className="h-6 w-auto" />
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

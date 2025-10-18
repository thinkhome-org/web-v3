"use client";
/**
 * PillTabs
 * - Reusable tab-like list with a sliding "pill" indicator under hovered/active item.
 * - Keeps DOM markup flexible via a renderItem() prop.
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type PillTabsRenderArgs<T> = {
  item: T;
  index: number;
  ref: (el: HTMLAnchorElement | null) => void;
  onMouseEnter: () => void;
  onFocus: () => void;
  isActive: boolean;
  className: string;
};

type Indicator = { width: number; left: number };

export interface PillTabsProps<T> {
  items: T[];
  activeIndex: number;
  ariaLabel?: string;
  className?: string;
  itemClassName?: string;
  pillClassName?: string;
  renderItem: (args: PillTabsRenderArgs<T>) => React.ReactNode;
}

export function PillTabs<T>({
  items,
  activeIndex,
  ariaLabel,
  className,
  itemClassName,
  pillClassName,
  renderItem,
}: PillTabsProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState<Indicator>({ width: 0, left: 0 });

  const safeActiveIndex = useMemo(() => {
    if (activeIndex < 0 || activeIndex >= items.length) return 0;
    return activeIndex;
  }, [activeIndex, items.length]);

  function updateIndicatorFrom(index: number) {
    const el = itemRefs.current[index];
    const container = containerRef.current;
    if (!el || !container) return;
    const linkRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setIndicator({ width: linkRect.width, left: linkRect.left - containerRect.left });
  }

  useEffect(() => {
    updateIndicatorFrom(safeActiveIndex);
    const onResize = () => updateIndicatorFrom(safeActiveIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeActiveIndex, items.length]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex items-center whitespace-nowrap rounded-full border p-1 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/30",
        className,
      )}
      aria-label={ariaLabel}
      onMouseLeave={() => updateIndicatorFrom(safeActiveIndex)}
    >
      <span
        className={cn(
          "pointer-events-none absolute left-0 top-1 bottom-1 rounded-full bg-foreground/10 shadow transition-[transform,width,background-color] duration-300 ease-out group-hover:bg-foreground/20",
          pillClassName,
        )}
        style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
      />

      {items.map((item, i) =>
        renderItem({
          item,
          index: i,
          ref: (el) => (itemRefs.current[i] = el),
          onMouseEnter: () => updateIndicatorFrom(i),
          onFocus: () => updateIndicatorFrom(i),
          isActive: i === safeActiveIndex,
          className: cn("relative z-10 rounded-full px-3 py-1.5 text-sm transition-colors", itemClassName),
        }),
      )}
    </div>
  );
}

export default PillTabs;


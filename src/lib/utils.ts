import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind class names safely.
 * Usage: cn("p-2", condition && "bg-red-500") → de-duped class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from "slugify"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const createSlug = (input: string): string =>
    slugify(input, { lower: true }).replace(/\\/g, "");
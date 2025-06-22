"use client"

import { useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
    const [tocItems, setTocItems] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string>("")

    const scrollToHeading = useCallback((id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const yOffset = -100
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
            window.scrollTo({ top: y, behavior: "smooth" })

            // update URL hash without triggering scroll
            history.replaceState(null, "", `#${id}`)
        }
    }, [])

    useEffect(() => {
        const generateId = (text: string): string => {
            return text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")
        }

        const headings = Array.from(
            document.querySelectorAll("article h1, article h2, article h3, article h4, article h5, article h6"),
        )

        headings.forEach((heading) => {
            if (!heading.id) {
                const id = generateId(heading.textContent || "")
                heading.id = id
            }
            (heading as HTMLElement).style.scrollMarginTop = "120px"
        })

        const items: TocItem[] = headings.map((heading) => ({
            id: heading.id,
            text: heading.textContent || "",
            level: Number.parseInt(heading.tagName.charAt(1)),
        }))

        setTocItems(items)

        const observerOptions = {
            rootMargin: "-20% 0% -35% 0%",
            threshold: [0, 0.25, 0.5, 0.75, 1],
        }

        const observer = new IntersectionObserver((entries) => {
            const visibleEntries = entries.filter((entry) => entry.isIntersecting)

            if (visibleEntries.length > 0) {
                const sortedEntries = visibleEntries.sort((a, b) => {
                    return a.boundingClientRect.top - b.boundingClientRect.top
                })

                const topEntry = sortedEntries[0]
                if (topEntry && topEntry.target.id !== activeId) {
                    setActiveId(topEntry.target.id)
                }
            }
        }, observerOptions)

        headings.forEach((heading) => observer.observe(heading))

        const hash = window.location.hash.slice(1)
        if (hash && items.some((item) => item.id === hash)) {
            setActiveId(hash)
            setTimeout(() => scrollToHeading(hash), 100)
        }

        return () => {
            headings.forEach((heading) => observer.unobserve(heading))
        }
    }, [scrollToHeading, activeId])

    if (tocItems.length === 0) return null

    return (
        <nav className={cn("space-y-1", className)}>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wide mb-4">
                Table of Contents
            </h3>

            <ul className="space-y-1 text-sm">
                {tocItems.map((item) => {
                    const isActive = activeId === item.id
                    const paddingLeft = (item.level - 1) * 12 + 8

                    return (
                        <li key={item.id} style={{ paddingLeft: `${paddingLeft}px` }}>
                            <button
                                onClick={() => scrollToHeading(item.id)}
                                className={cn(
                                    "text-left transition-all duration-200 block w-full py-2 px-3 rounded-md text-sm leading-5 hover:bg-gray-100 dark:hover:bg-gray-800",
                                    isActive
                                        ? "text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20"
                                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
                                )}
                                aria-current={isActive ? "location" : undefined}
                            >
                                {item.text}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

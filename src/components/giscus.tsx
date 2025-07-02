"use client"

import Giscus from "@giscus/react"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

export function GiscusComments() {
    const { theme } = useTheme()
    const [loadGiscus, setLoadGiscus] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoadGiscus(true)
                    observer.disconnect()
                }
            },
            {
                rootMargin: "1000px", // Load 1000px before it enters the viewport
            }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [])

    return (
        <div ref={ref} className="mt-12">
            {loadGiscus && (
                <Giscus
                    repo="bhaveyx/bhaveshchaudhari.com"
                    repoId="R_kgDONrCQLg"
                    category="General"
                    categoryId="DIC_kwDONrCQLs4CsVN6"
                    theme={theme}
                    mapping="title"
                    term="Welcome !"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    lang="en"
                />
            )}
        </div>
    )
}
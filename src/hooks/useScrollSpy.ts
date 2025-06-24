"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollSpy(selectors: string[], options?: IntersectionObserverInit) {
    const [activeId, setActiveId] = useState<string | undefined>();
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const elements = selectors.map(
            selector => document.getElementById(selector.slice(1)), // Remove the '#' prefix
        );

        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { ...options, threshold: 1, rootMargin: "0% 0% -50% 0%" },
        ); // Set threshold to 0.5 (50%)

        elements.forEach((el) => {
            if (el) { observer.current?.observe(el); }
        });

        return () => observer.current?.disconnect();
    }, [selectors, options]);

    return activeId;
}

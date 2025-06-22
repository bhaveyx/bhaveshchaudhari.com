"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useTerminalStore } from "@/stores/terminal-store"
import { useGlobalKeyboard } from "@/hooks/useGlobalKeyboard"
import { DraggableTerminal } from "./draggable-terminal"
import { MinimizedTerminal } from "./minimized-terminal"
import { TerminalClient } from "../terminal-client"
import { BlogPost } from "@/lib/blog"
import { initializeBlogStore } from "@/stores/blog-store"

export function GlobalTerminal({ posts }: { posts: BlogPost[] }) {
    const { isOpen, isMinimized, theme, size } = useTerminalStore()

    useGlobalKeyboard()

    useEffect(() => {
        initializeBlogStore(posts)
    }, [posts])

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    if (isOpen && isMinimized) {
        return createPortal(<MinimizedTerminal />, document.body)
    }

    console.log("xyz size", size)
    
    if (isOpen && !isMinimized) {
        return createPortal(
            <DraggableTerminal>
                <div className="flex-1 overflow-hidden rounded-lg min-h-0">
                    <TerminalClient
                        posts={posts}
                        height={size.height - 44}
                        showBootSequence={false}
                        theme={theme}
                        className="border-0 rounded-none h-full flex flex-col"
                        isGlobal={true}
                    />
                </div>
            </DraggableTerminal>,
            document.body,
        )
    }

    return null
}

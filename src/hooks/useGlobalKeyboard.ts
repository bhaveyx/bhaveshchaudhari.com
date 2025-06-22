"use client"

import { useEffect, useMemo } from "react"
import { useTerminalStore } from "@/stores/terminal-store"

interface KeyboardShortcut {
    key: string
    ctrlKey?: boolean
    metaKey?: boolean
    shiftKey?: boolean
    altKey?: boolean
    action: () => void
    description: string
}

export function useGlobalKeyboard() {
    const toggleTerminal = useTerminalStore((state) => state.toggleTerminal)
    const closeTerminal = useTerminalStore((state) => state.closeTerminal)
    const isOpen = useTerminalStore((state) => state.isOpen)

    const shortcuts: KeyboardShortcut[] = useMemo(() => {
        return [
            {
                key: "`",
                ctrlKey: true,
                action: toggleTerminal,
                description: "Toggle terminal (Ctrl + `)",
            },
            {
                key: "t",
                ctrlKey: true,
                shiftKey: true,
                action: toggleTerminal,
                description: "Toggle terminal (Ctrl + Shift + T)",
            },
            {
                key: "Escape",
                action: () => {
                    if (isOpen) closeTerminal()
                },
                description: "Close terminal (Escape)",
            },
        ]
    }, [])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // don't trigger shortcuts when typing in inputs
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement ||
                event.target instanceof HTMLSelectElement ||
                (event.target as HTMLElement)?.contentEditable === "true"
            ) {
                // exception: allow escape to close terminal even when in input
                if (event.key === "Escape" && isOpen) {
                    event.preventDefault()
                    closeTerminal()
                }
                return
            }

            for (const shortcut of shortcuts) {
                const ctrlMatch = shortcut.ctrlKey ? event.ctrlKey : !event.ctrlKey
                const metaMatch = shortcut.metaKey ? event.metaKey : !event.metaKey
                const shiftMatch = shortcut.shiftKey ? event.shiftKey : !event.shiftKey
                const altMatch = shortcut.altKey ? event.altKey : !event.altKey

                if (event.key === shortcut.key && ctrlMatch && metaMatch && shiftMatch && altMatch) {
                    event.preventDefault()
                    shortcut.action()
                    break
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, closeTerminal, toggleTerminal, shortcuts])

    return { shortcuts }
}

"use client"

import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTerminalStore } from "@/stores/terminal-store"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"

interface TerminalTriggerProps {
    variant?: "button" | "badge" | "icon"
    showShortcut?: boolean
    className?: string
}

export function TerminalTrigger({ variant = "button", showShortcut = true, className = "" }: TerminalTriggerProps) {
    const openTerminal = useTerminalStore((state) => state.openTerminal)
    const pathname = usePathname()

    if (pathname === "/") {
        return null
    }

    if (variant === "badge") {
        return (
            <Badge
                variant="outline"
                className={`cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors ${className}`}
                onClick={openTerminal}
            >
                <Terminal className="h-3 w-3 mr-1" />
                Terminal
                {showShortcut && <span className="ml-1 text-xs opacity-70">Ctrl+`</span>}
            </Badge>
        )
    }

    if (variant === "icon") {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={openTerminal}
                className={`h-8 w-8 p-0 ${className}`}
                title={showShortcut ? "Open Terminal (Ctrl + `)" : "Open Terminal"}
            >
                <Terminal className="h-4 w-4" />
            </Button>
        )
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={openTerminal}
            className={`border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${className}`}
        >
            <Terminal className="h-4 w-4 mr-2" />
            Terminal
            {showShortcut && <span className="ml-2 text-xs opacity-70">Ctrl+`</span>}
        </Button>
    )
}

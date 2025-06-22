"use client"

import { memo } from "react"
import { TerminalControls } from "./global/terminal-controls"
import { useTerminalStore } from "@/stores/terminal-store"

interface TerminalHeaderProps {
    currentDirectory: string
    className?: string
    isGlobal?: boolean
}

export const TerminalHeader = memo(function TerminalHeader({ currentDirectory, className = "", isGlobal }: TerminalHeaderProps) {
    const theme = useTerminalStore((state) => state.theme)

    return (
        isGlobal ? <div
            className="flex items-center justify-between px-4 py-2 border-b rounded-t-lg h-full"
            style={{
                backgroundColor: theme === "retro" ? "#3F3B3E" : "#374151",
                borderBottomColor: theme === "retro" ? "#333333" : "#6b7280",
            }}
        >
            <div className="flex items-center gap-2">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span
                    className="ml-4 text-sm"
                    style={{
                        color: theme === "retro" ? "#00ff00" : "#d1d5db",
                    }}
                >
                    bhaveshchaudhari.com: ~ (Global Terminal)
                </span>
            </div>
            <TerminalControls />
        </div> :
            <div className={`flex items-center gap-2 px-4 py-2 border-b border-gray-600 bg-[#3F3B3E] ${className}`}>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-4 text-sm opacity-70 text-gray-300">bhaveshchaudhari.com: {currentDirectory}</span>
            </div>

    )
})

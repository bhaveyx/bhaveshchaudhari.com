"use client"

import { memo } from "react"
import { TerminalLineComponent } from "./terminal-line"

interface TerminalLine {
    id: string
    type: "command" | "output" | "system"
    content: string
    timestamp: Date
}

interface TerminalLinesProps {
    lines: TerminalLine[]
    promptColor: string
    currentDirectory: string
}

export const TerminalLines = memo(function TerminalLines({ lines, promptColor, currentDirectory }: TerminalLinesProps) {
    return (
        <>
            {lines.map((line) => (
                <TerminalLineComponent
                    key={line.id}
                    line={line}
                    promptColor={promptColor}
                    currentDirectory={currentDirectory}
                />
            ))}
        </>
    )
})

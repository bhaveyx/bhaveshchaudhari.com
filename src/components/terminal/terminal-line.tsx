"use client"

import { memo } from "react"

interface TerminalLine {
  id: string
  type: "command" | "output" | "system"
  content: string
  timestamp: Date
}

interface TerminalLineProps {
  line: TerminalLine
  promptColor: string
  currentDirectory: string
}

export const TerminalLineComponent = memo(function TerminalLineComponent({
  line,
  promptColor,
  currentDirectory,
}: TerminalLineProps) {
  if (line.type === "command") {
    return (
      <div className={`${promptColor} mb-1`}>
        <span className="opacity-70">bhaveshchaudhari.com</span>
        <span className="mx-1">:</span>
        <span className="opacity-70">{currentDirectory}</span>
        <span className="ml-1">{line.content}</span>
      </div>
    )
  }

  if (line.type === "output") {
    return <div className="ml-0 whitespace-pre-wrap mb-1">{line.content}</div>
  }

  if (line.type === "system") {
    return <div className="opacity-80 mb-1">{line.content}</div>
  }

  return null
})

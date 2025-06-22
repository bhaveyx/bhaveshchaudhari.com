"use client"

import { useState, useEffect, memo } from "react"

interface TerminalCursorProps {
  isVisible: boolean
  className?: string
}

export const TerminalCursor = memo(function TerminalCursor({ isVisible, className = "" }: TerminalCursorProps) {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!isVisible) return

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [isVisible])

  if (!isVisible || !showCursor) return null

  return <span className={`animate-pulse ${className}`}>▋</span>
})

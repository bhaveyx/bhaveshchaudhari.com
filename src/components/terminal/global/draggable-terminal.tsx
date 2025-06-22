"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { useTerminalStore } from "@/stores/terminal-store"

interface DraggableTerminalProps {
  children: React.ReactNode
  className?: string
}

export function DraggableTerminal({ children, className = "" }: DraggableTerminalProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const terminalRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const position = useTerminalStore((state) => state.position)
  const size = useTerminalStore((state) => state.size)
  const opacity = useTerminalStore((state) => state.opacity)
  const theme = useTerminalStore((state) => state.theme)
  const setPosition = useTerminalStore((state) => state.setPosition)
  const setSize = useTerminalStore((state) => state.setSize)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // only allow dragging from the header area, not from controls
    const target = e.target as HTMLElement
    const isControlButton = target.closest("button") || target.tagName === "BUTTON"
    const isDropdownContent = target.closest("[data-radix-dropdown-menu-content]")

    if (isControlButton || isDropdownContent) {
      return
    }

    if (e.target !== headerRef.current && !headerRef.current?.contains(e.target as Node)) {
      return
    }

    setIsDragging(true)
    const rect = terminalRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y

        // keep terminal within viewport bounds
        const maxX = window.innerWidth - size.width
        const maxY = window.innerHeight - size.height

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        })
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y

        const newWidth = Math.max(400, resizeStart.width + deltaX)
        const newHeight = Math.max(300, resizeStart.height + deltaY)

        // keep within viewport bounds
        const maxWidth = window.innerWidth - position.x
        const maxHeight = window.innerHeight - position.y

        setSize({
          width: Math.min(newWidth, maxWidth),
          height: Math.min(newHeight, maxHeight),
        })
      }
    },
    [isDragging, isResizing, dragOffset, resizeStart, position, size, setPosition, setSize],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      setIsResizing(true)
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      })
    },
    [size],
  )

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = "none"
      document.body.style.cursor = isDragging ? "grabbing" : "nw-resize"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.userSelect = ""
        document.body.style.cursor = ""
      }
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp])

  const getTerminalStyles = () => {
    if (theme === "retro") {
      return {
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        color: "#00ff00",
        borderColor: "#333333",
      }
    } else {
      return {
        backgroundColor: "rgba(31, 41, 55, 0.95)",
        color: "#f3f4f6",
        borderColor: "#6b7280",
      }
    }
  }

  const terminalStyles = getTerminalStyles()

  return (
    <div
      ref={terminalRef}
      className={`fixed z-[9999] backdrop-blur-sm border rounded-lg shadow-2xl flex flex-col ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        opacity,
        backgroundColor: terminalStyles.backgroundColor,
        borderColor: terminalStyles.borderColor,
        color: terminalStyles.color,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={headerRef}
        className="cursor-grab active:cursor-grabbing flex-shrink-0"
        style={{ height: "40px" }}
      >
        {children}
      </div>

      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize transition-colors z-10"
        onMouseDown={handleResizeStart}
        style={{
          clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
        //   backgroundColor: theme === "retro" ? "#333333" : "#6b7280",
        }}
      />
    </div>
  )
}

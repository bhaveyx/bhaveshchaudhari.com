"use client"

import type React from "react"

import { memo, forwardRef } from "react"
import { TerminalLines } from "./terminal-lines"
import { TerminalInput } from "./terminal-input"

interface TerminalLine {
    id: string
    type: "command" | "output" | "system"
    content: string
    timestamp: Date
}

interface TerminalContentProps {
    lines: TerminalLine[]
    currentInput: string
    onInputChange: (value: string) => void
    onSubmit: (e: React.FormEvent) => void
    onKeyDown: (e: React.KeyboardEvent) => void
    promptColor: string
    currentDirectory: string
    height: number
    isBooting: boolean
    isTyping: boolean
    showCursor: boolean
    inputRef: React.RefObject<HTMLInputElement>
}

export const TerminalContent = memo(
    forwardRef<HTMLDivElement, TerminalContentProps>(function TerminalContent(
        {
            lines,
            currentInput,
            onInputChange,
            onSubmit,
            onKeyDown,
            promptColor,
            currentDirectory,
            height,
            isBooting,
            isTyping,
            showCursor,
            inputRef,
        },
        ref,
    ) {
        const handleContentClick = (e: React.MouseEvent) => {
            // Focus input when clicking anywhere in terminal content
            if (!isBooting && !isTyping) {
                // Don't focus if clicking on text that might be selected
                const selection = window.getSelection()
                if (!selection || selection.toString().length === 0) {
                    e.preventDefault()
                    inputRef.current?.focus()
                }
            }
        }

        return (
            <div
                ref={ref}
                className={`overflow-y-auto bg-[#1E1E1E] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent p-4 cursor-text`}
                style={{
                    height: height
                }}
                onClick={handleContentClick}
            >
                <TerminalLines lines={lines} promptColor={promptColor} currentDirectory={currentDirectory} />

                {!isBooting && (
                    <TerminalInput
                        ref={inputRef}
                        currentInput={currentInput}
                        onInputChange={onInputChange}
                        onSubmit={onSubmit}
                        onKeyDown={onKeyDown}
                        promptColor={promptColor}
                        currentDirectory={currentDirectory}
                        disabled={isTyping || isBooting}
                        showCursor={showCursor && !isTyping}
                    />
                )}
            </div>
        )
    }),
)

"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useTerminalCommands } from "@/hooks/useTerminalCommands"
import { TerminalHeader } from "./terminal-header"
import { TerminalContent } from "./terminal-content"
import { initializeBlogStore } from "@/stores/blog-store"
import { BlogPost } from "@/lib/blog"

interface TerminalLine {
    id: string
    type: "command" | "output" | "system"
    content: string
    timestamp: Date
}

interface TerminalProps {
    className?: string
    height?: number
    showBootSequence?: boolean
    theme?: "retro" | "modern" | "auto"
    posts: BlogPost[]
    isGlobal?: boolean
}

export function TerminalClient({
    className = "",
    height = 384,
    showBootSequence = true,
    theme: initialTheme = "retro",
    posts = [],
    isGlobal = false,
}: TerminalProps) {
    const [lines, setLines] = useState<TerminalLine[]>([])
    const [currentInput, setCurrentInput] = useState("")
    const [isBooting, setIsBooting] = useState(showBootSequence)
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [isTyping, setIsTyping] = useState(false)
    const [terminalTheme, setTerminalTheme] = useState<"retro" | "modern">(
        initialTheme === "auto" ? "retro" : initialTheme,
    )
    const [isUserScrolling, setIsUserScrolling] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)

    const { commands, currentDirectory, setTheme, theme } = useTerminalCommands()

    const addLine = useCallback((type: TerminalLine["type"], content: string) => {
        setLines((prev) => [
            ...prev,
            {
                id: Math.random().toString(36).substr(2, 9),
                type,
                content,
                timestamp: new Date(),
            },
        ])
    }, [])

    useEffect(() => {
        initializeBlogStore(posts)
    }, [posts])

    useEffect(() => {
        if (!showBootSequence) {
            setIsBooting(false)
            return
        }

        const bootSequence = [
            "Initializing BhaveshOS Terminal v1.0.0...",
            "",
            "Welcome! Type 'help' to see available commands.",
            "",
        ]

        let index = 0
        const bootInterval = setInterval(() => {
            if (index < bootSequence.length) {
                addLine("system", bootSequence[index])
                index++
            } else {
                clearInterval(bootInterval)
                setIsBooting(false)
                setTimeout(() => inputRef.current?.focus(), 100)
            }
        }, 200)

        return () => clearInterval(bootInterval)
    }, [showBootSequence, addLine])

    useEffect(() => {
        if (!isTyping && !isBooting) {
            const focusTimeout = setTimeout(() => {
                // auto-focus input after typing completes
                inputRef.current?.focus()
            }, 50)

            return () => clearTimeout(focusTimeout)
        }
    }, [isTyping, isBooting])

    useEffect(() => {
        const handleClick = () => {
            if (!isBooting && !isTyping) {
                // auto-focus input on terminal click
                inputRef.current?.focus()
            }
        }

        const handleScroll = () => {
            const terminal = terminalRef.current
            if (!terminal) return

            const { scrollTop, scrollHeight, clientHeight } = terminal
            const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5

            if (isAtBottom) {
                setIsUserScrolling(false)
            } else {
                setIsUserScrolling(true)
            }
        }

        const terminalElement = terminalRef.current
        if (terminalElement) {
            terminalElement.addEventListener("click", handleClick)
            terminalElement.addEventListener("scroll", handleScroll)
            return () => {
                terminalElement.removeEventListener("click", handleClick)
                terminalElement.removeEventListener("scroll", handleScroll)
            }
        }
    }, [isBooting, isTyping])

    useEffect(() => {
        if (terminalRef.current && !isUserScrolling) {
            // Only auto-scroll to bottom when user is not manually scrolling
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [lines, isUserScrolling])

    const typeText = useCallback(
        async (text: string | string[]) => {
            setIsTyping(true)
            const textArray = Array.isArray(text) ? text : [text]

            for (const line of textArray) {
                if (line.startsWith("rick:")) {
                    addLine("output", line)
                    continue
                }

                if (line === "") {
                    addLine("output", "")
                    await new Promise((resolve) => setTimeout(resolve, 30))
                } else {
                    let currentText = ""
                    for (let i = 0; i <= line.length; i++) {
                        currentText = line.slice(0, i)
                        addLine("output", currentText)
                        await new Promise((resolve) => setTimeout(resolve, 15))
                        if (i < line.length) {
                            setLines((prev) => prev.slice(0, -1))
                        }
                    }
                }
            }
            setIsTyping(false)
        },
        [addLine],
    )

    const executeCommand = useCallback(
        async (input: string) => {
            const trimmedInput = input.trim()
            const isRickRoll = trimmedInput === "rm -rf /"
            const parts = isRickRoll ? [trimmedInput] : trimmedInput.split(" ")
            const command = parts[0].toLowerCase()
            const args = parts.slice(1)

            // add command to history
            if (trimmedInput && !commandHistory.includes(trimmedInput)) {
                setCommandHistory((prev) => [...prev, trimmedInput])
            }
            setHistoryIndex(-1)

            addLine("command", `$ ${input}`)

            if (!trimmedInput) return

            const cmd = commands[command]
            if (cmd) {
                try {
                    const output = await cmd.action(args)

                    if (output === "CLEAR_TERMINAL") {
                        setLines([])
                        return
                    }

                    if (output === "TOGGLE_THEME") {
                        const newTheme = terminalTheme === "retro" ? "modern" : "retro"
                        setTerminalTheme(newTheme)
                        if (newTheme === "modern") {
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                        await typeText(`Theme switched to: ${newTheme}`)
                        return
                    }

                    if (output) {
                        await typeText(output)
                    }
                } catch (error) {
                    await typeText(`Error executing command: ${error}`)
                }
            } else {
                await typeText(`Command not found: ${command}. Type 'help' for available commands.`)
            }
        },
        [commandHistory, addLine, typeText, commands, terminalTheme, setTheme, theme],
    )

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (isTyping || isBooting) return

            executeCommand(currentInput)
            setCurrentInput("")
        },
        [currentInput, isTyping, isBooting, executeCommand],
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (isTyping || isBooting) return

            switch (e.key) {
                case "ArrowUp":
                    e.preventDefault()
                    if (commandHistory.length > 0) {
                        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
                        setHistoryIndex(newIndex)
                        setCurrentInput(commandHistory[newIndex])
                    }
                    break

                case "ArrowDown":
                    e.preventDefault()
                    if (historyIndex !== -1) {
                        const newIndex = historyIndex + 1
                        if (newIndex >= commandHistory.length) {
                            setHistoryIndex(-1)
                            setCurrentInput("")
                        } else {
                            setHistoryIndex(newIndex)
                            setCurrentInput(commandHistory[newIndex])
                        }
                    }
                    break

                case "Tab":
                    e.preventDefault()
                    const input = currentInput.toLowerCase()
                    const matches = Object.keys(commands).filter((cmd) => cmd.startsWith(input))
                    if (matches.length === 1) {
                        setCurrentInput(matches[0])
                    }
                    break

                case "l":
                    if (e.ctrlKey) {
                        e.preventDefault()
                        setLines([])
                    }
                    break
            }
        },
        [currentInput, commandHistory, historyIndex, isTyping, isBooting, commands],
    )

    const handleInputChange = useCallback((value: string) => {
        setCurrentInput(value)
    }, [])

    const terminalClasses = useMemo(() => {
        if (terminalTheme === "retro") {
            return "bg-black text-green-400 font-mono"
        } else {
            return theme === "dark" ? "bg-gray-900 text-gray-100 font-mono" : "bg-white text-gray-900 font-mono"
        }
    }, [terminalTheme, theme])

    const promptColor = useMemo(() => {
        if (terminalTheme === "retro") {
            return "text-green-400"
        } else {
            return theme === "dark" ? "text-blue-400" : "text-blue-600"
        }
    }, [terminalTheme, theme])

    return (
        <div className={`${terminalClasses} bterminal rounded-lg border border-[#4B4A4B] ${className} h-full overflow-hidden`}>
            <TerminalHeader isGlobal={isGlobal} currentDirectory={currentDirectory} />

            <TerminalContent
                ref={terminalRef}
                lines={lines}
                currentInput={currentInput}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
                promptColor={promptColor}
                currentDirectory={currentDirectory}
                height={height}
                isBooting={isBooting}
                isTyping={isTyping}
                showCursor={true}
                inputRef={inputRef as React.RefObject<HTMLInputElement>}
            />
        </div>
    )
}

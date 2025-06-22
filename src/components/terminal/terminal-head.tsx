"use client"

import type React from "react"

import { memo, forwardRef, useCallback } from "react"
import { TerminalCursor } from "./terminal-cursor"

interface TerminalInputProps {
  currentInput: string
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  promptColor: string
  currentDirectory: string
  disabled: boolean
  showCursor: boolean
}

export const TerminalInput = memo(
  forwardRef<HTMLInputElement, TerminalInputProps>(function TerminalInput(
    { currentInput, onInputChange, onSubmit, onKeyDown, promptColor, currentDirectory, disabled, showCursor },
    ref,
  ) {
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(e.target.value)
      },
      [onInputChange],
    )

    return (
      <form onSubmit={onSubmit} className="flex items-center">
        <span className={`${promptColor} mr-1`}>
          <span className="opacity-70">bhaveshchaudhari.com</span>
          <span className="mx-1">:</span>
          <span className="opacity-70">{currentDirectory}</span>
          <span className="ml-1">$</span>
        </span>
        <input
          ref={ref}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none ml-2"
          disabled={disabled}
          autoComplete="off"
          spellCheck="false"
        />
        <TerminalCursor isVisible={showCursor && !disabled} />
      </form>
    )
  }),
)

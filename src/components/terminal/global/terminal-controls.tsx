"use client"

import { Minimize2, Maximize2, X, Settings, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTerminalStore } from "@/stores/terminal-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"

export function TerminalControls() {
  const {
    isMinimized,
    theme,
    opacity,
    minimizeTerminal,
    maximizeTerminal,
    closeTerminal,
    setTheme,
    setOpacity,
    resetTerminal,
  } = useTerminalStore()

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700">
            <Settings className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl z-[10000]"
          style={{ opacity: 1 }} 
        >
          <DropdownMenuLabel className="text-gray-900 dark:text-gray-100">Terminal Settings</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

          <DropdownMenuItem
            onClick={() => setTheme(theme === "retro" ? "modern" : "retro")}
            className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            Theme: {theme === "retro" ? "Retro" : "Modern"}
          </DropdownMenuItem>

          <div className="px-2 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-900 dark:text-gray-100">Opacity</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">{Math.round(opacity * 100)}%</span>
            </div>
            <Slider
              value={[opacity]}
              onValueChange={([value]) => setOpacity(value)}
              min={0.3}
              max={1}
              step={0.05}
              className="w-full"
            />
          </div>

          <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

          <DropdownMenuItem
            onClick={resetTerminal}
            className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Position & Size
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="sm"
        onClick={isMinimized ? maximizeTerminal : minimizeTerminal}
        className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
      >
        {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={closeTerminal}
        className="h-6 w-6 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}

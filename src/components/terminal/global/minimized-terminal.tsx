"use client"

import { Terminal, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTerminalStore } from "@/stores/terminal-store"

export function MinimizedTerminal() {
  const maximizeTerminal = useTerminalStore((state) => state.maximizeTerminal)
  const opacity = useTerminalStore((state) => state.opacity)

  return (
    <div className="fixed bottom-4 right-4 z-[9999]" style={{ opacity }}>
      <Button
        onClick={maximizeTerminal}
        className="bg-black/90 backdrop-blur-sm border border-gray-600 text-green-400 hover:bg-gray-800/90 hover:text-green-300 shadow-2xl"
        size="lg"
      >
        <Terminal className="h-5 w-5 mr-2" />
        Terminal
        <Maximize2 className="h-4 w-4 ml-2" />
      </Button>
    </div>
  )
}

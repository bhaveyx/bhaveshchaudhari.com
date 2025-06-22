import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface TerminalState {
  isOpen: boolean
  isMinimized: boolean

  position: { x: number; y: number }
  size: { width: number; height: number }

  theme: "retro" | "modern"
  opacity: number

  openTerminal: () => void
  closeTerminal: () => void
  toggleTerminal: () => void
  minimizeTerminal: () => void
  maximizeTerminal: () => void

  setPosition: (position: { x: number; y: number }) => void
  setSize: (size: { width: number; height: number }) => void
  setTheme: (theme: "retro" | "modern") => void
  setOpacity: (opacity: number) => void

  resetTerminal: () => void
}

const DEFAULT_POSITION = { x: 100, y: 100 }
const DEFAULT_SIZE = { width: 800, height: 500 }

export const useTerminalStore = create<TerminalState>()(
  devtools(
    (set, get) => ({
      isOpen: false,
      isMinimized: false,
      position: DEFAULT_POSITION,
      size: DEFAULT_SIZE,
      theme: "retro",
      opacity: 0.95,

      openTerminal: () => set({ isOpen: true, isMinimized: false }, false, "openTerminal"),

      closeTerminal: () => set({ isOpen: false, isMinimized: false }, false, "closeTerminal"),

      toggleTerminal: () => {
        const { isOpen } = get()
        set({ isOpen: !isOpen, isMinimized: false }, false, "toggleTerminal")
      },

      minimizeTerminal: () => set({ isMinimized: true }, false, "minimizeTerminal"),

      maximizeTerminal: () => set({ isMinimized: false }, false, "maximizeTerminal"),

      setPosition: (position) => set({ position }, false, "setPosition"),

      setSize: (size) => set({ size }, false, "setSize"),

      setTheme: (theme) => set({ theme }, false, "setTheme"),

      setOpacity: (opacity) => set({ opacity }, false, "setOpacity"),

      resetTerminal: () =>
        set(
          {
            position: DEFAULT_POSITION,
            size: DEFAULT_SIZE,
            theme: "retro",
            opacity: 0.95,
            isMinimized: false,
          },
          false,
          "resetTerminal",
        ),
    }),
    {
      name: "terminal-store",
    },
  ),
)

export const useTerminalOpen = () => useTerminalStore((state) => state.isOpen)
export const useTerminalMinimized = () => useTerminalStore((state) => state.isMinimized)
export const useTerminalPosition = () => useTerminalStore((state) => state.position)
export const useTerminalSize = () => useTerminalStore((state) => state.size)
export const useTerminalTheme = () => useTerminalStore((state) => state.theme)
export const useTerminalOpacity = () => useTerminalStore((state) => state.opacity)

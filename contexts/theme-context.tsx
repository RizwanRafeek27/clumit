"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ThemeContextType {
  darkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("campus-connect-theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    }
    setMounted(true)
  }, [])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      localStorage.setItem("campus-connect-theme", darkMode ? "dark" : "light")
    }
  }, [darkMode, mounted])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

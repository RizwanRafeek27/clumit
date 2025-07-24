"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { User } from "@/types/club"

interface AuthContextType {
  user: User | null
  signIn: (user: User) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const signIn = (userData: User) => {
    setUser(userData)
  }

  const signOut = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

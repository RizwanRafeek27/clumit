"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Moon, Sun, Shield, Users, Menu, X } from "lucide-react"
import { SignInDialog } from "./sign-in-dialog"
import type { User } from "@/types/club"
import Link from "next/link"

interface NavigationProps {
  darkMode: boolean
  toggleDarkMode: () => void
  user?: User | null
  onSignIn?: (user: User) => void
  onLogout?: () => void
  title?: string
  showAuth?: boolean
}

export function Navigation({
  darkMode,
  toggleDarkMode,
  user,
  onSignIn,
  onLogout,
  title = "Campus Connect",
  showAuth = false,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-black/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          {user?.type === "superadmin" ? (
            <button
              onClick={() => (window.location.href = "/admin")}
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200 cursor-pointer"
            >
              {title}
            </button>
          ) : (
            <Link
              href="/"
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200 cursor-pointer"
            >
              {title}
            </Link>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {showAuth && !user && onSignIn && (
              <SignInDialog onSignIn={onSignIn}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm lg:text-base px-4 lg:px-6">
                  <Users className="h-4 w-4 mr-2" />
                  Club Sign In
                </Button>
              </SignInDialog>
            )}

            {user && onLogout && (
              <>
                <div className="flex items-center space-x-2">
                  {user.type === "superadmin" && (
                    <div className="flex items-center px-2 lg:px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs lg:text-sm font-semibold">
                      <Shield className="h-3 w-3 mr-1" />
                      Super Admin
                    </div>
                  )}
                  {user.type === "club" && (
                    <div className="flex items-center px-2 lg:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs lg:text-sm font-semibold">
                      <Users className="h-3 w-3 mr-1" />
                      Club Admin
                    </div>
                  )}
                  <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium hidden lg:inline">
                    {user.email}
                  </span>
                </div>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 dark:border-gray-700 rounded-xl font-semibold bg-transparent text-sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 lg:p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex flex-col space-y-3">
              {showAuth && !user && onSignIn && (
                <SignInDialog onSignIn={onSignIn}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold">
                    <Users className="h-4 w-4 mr-2" />
                    Club Sign In
                  </Button>
                </SignInDialog>
              )}

              {user && onLogout && (
                <>
                  <div className="flex flex-col space-y-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="flex items-center justify-center">
                      {user.type === "superadmin" && (
                        <div className="flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold">
                          <Shield className="h-3 w-3 mr-1" />
                          Super Admin
                        </div>
                      )}
                      {user.type === "club" && (
                        <div className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                          <Users className="h-3 w-3 mr-1" />
                          Club Admin
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium text-center">
                      {user.email}
                    </span>
                  </div>
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-700 rounded-xl font-semibold bg-transparent"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Sparkles, Search, Users, TrendingUp } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import { mockClubs } from "@/data/clubs"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { darkMode, toggleDarkMode } = useTheme()
  const { user } = useAuth()
  const router = useRouter()

  // Redirect authenticated users to their respective dashboards
  useEffect(() => {
    if (user) {
      if (user.type === "superadmin") {
        router.push("/admin")
      } else if (user.type === "club") {
        router.push("/dashboard")
      }
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Discover Your Perfect Community
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 tracking-tight leading-none">
            Find Your
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tribe
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light px-4">
            Connect with like-minded students, explore new opportunities, and build lasting relationships in our vibrant
            university ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <Link href="/discover" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Explore Clubs
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>

            <Link href="/about" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg h-auto font-semibold rounded-xl transition-all duration-200 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto mb-16 sm:mb-20 px-4">
            <div className="text-center p-4 sm:p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {mockClubs.length}+
              </div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Active Clubs</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Active Members</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50">
              <div className="text-2xl sm:text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">50+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">Events Monthly</div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
          <div className="text-center p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200">
              <Search className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Smart Discovery</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Advanced filtering by interests, technical focus, and activities to find your perfect match
            </p>
          </div>

          <div className="text-center p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Connect & Grow</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Join communities that align with your passions and accelerate your personal growth
            </p>
          </div>

          <div className="text-center p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Build Your Future</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Develop skills, build networks, and create opportunities for your career advancement
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

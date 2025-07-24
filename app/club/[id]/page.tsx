"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ExternalLink, Mail, Globe, Instagram, Linkedin, Users, Calendar, Award } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { mockClubs } from "@/data/clubs"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"

interface ClubDetailPageProps {
  params: {
    id: string
  }
}

export default function ClubDetailPage({ params }: ClubDetailPageProps) {
  const { darkMode, toggleDarkMode } = useTheme()
  const router = useRouter()

  const club = mockClubs.find((c) => c.id === Number.parseInt(params.id))

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!club) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Discover
          </button>

          {/* Club Header */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-12 mb-12 shadow-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 mb-8">
              <Avatar className="h-32 w-32 border-4 border-gray-200 dark:border-gray-700 shadow-lg">
                <AvatarImage src={club.logo || "/placeholder.svg"} alt={club.name} />
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {club.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">{club.name}</h1>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                  <Badge
                    className={`text-sm font-semibold px-4 py-2 rounded-full ${
                      club.category === "technical"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                    }`}
                  >
                    {club.category === "technical" ? "Technical" : "Non-Technical"}
                  </Badge>
                  {club.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-8 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                    <Users className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{club.members} members</span>
                  </div>
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Est. {club.established}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Now Button */}
            <div className="text-center">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl h-auto font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                onClick={() => window.open(club.applyLink, "_blank")}
              >
                Apply Now
                <ExternalLink className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* About Us */}
            <div className="lg:col-span-2">
              <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Award className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                    About Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{club.fullDescription}</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Us */}
            <div>
              <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Get In Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <a
                      href={`mailto:${club.contact}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {club.contact}
                    </a>
                  </div>

                  {club.socialMedia && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-700 dark:text-gray-300">Follow Us</h4>

                      {club.socialMedia.website && (
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <a
                            href={club.socialMedia.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 dark:text-green-400 hover:underline font-medium"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}

                      {club.socialMedia.instagram && (
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                          <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                            <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {club.socialMedia.instagram}
                          </span>
                        </div>
                      )}

                      {club.socialMedia.linkedin && (
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {club.socialMedia.linkedin}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

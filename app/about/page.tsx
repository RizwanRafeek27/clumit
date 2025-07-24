"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Users,
  Search,
  TrendingUp,
  Shield,
  Globe,
  Heart,
  Zap,
  Star,
  Award,
  Target,
  Lightbulb,
  BookOpen,
  Calendar,
  MessageCircle,
} from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { mockClubs } from "@/data/clubs"
import Link from "next/link"

export default function AboutPage() {
  const { darkMode, toggleDarkMode } = useTheme()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const features = [
    {
      icon: Search,
      title: "Smart Discovery",
      description: "Advanced filtering system to find clubs that match your interests, skills, and goals.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Connect with like-minded students and build lasting friendships through shared interests.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrendingUp,
      title: "Skill Development",
      description: "Enhance your abilities through workshops, projects, and collaborative learning experiences.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Shield,
      title: "Verified Clubs",
      description: "All clubs are verified and approved by university administration for quality assurance.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Globe,
      title: "Diverse Communities",
      description: "From technical programming clubs to creative arts societies - find your perfect match.",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Heart,
      title: "Inclusive Environment",
      description: "Welcoming spaces for students of all backgrounds, skill levels, and interests.",
      color: "from-pink-500 to-pink-600",
    },
  ]

  const benefits = [
    {
      icon: Target,
      title: "Career Advancement",
      description:
        "Build your resume with leadership roles, project experience, and professional networking opportunities.",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Creativity",
      description: "Participate in hackathons, competitions, and creative projects that push boundaries.",
    },
    {
      icon: BookOpen,
      title: "Learning Beyond Classroom",
      description: "Gain practical experience and learn new skills outside traditional academic settings.",
    },
    {
      icon: MessageCircle,
      title: "Networking",
      description: "Connect with industry professionals, alumni, and peers who share your passions.",
    },
  ]

  const stats = [
    { number: mockClubs.length, label: "Active Clubs", icon: Users },
    { number: "500+", label: "Active Members", icon: Heart },
    { number: "50+", label: "Monthly Events", icon: Calendar },
    { number: "95%", label: "Satisfaction Rate", icon: Star },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8">
            <Award className="h-4 w-4 mr-2" />
            About Campus Connect
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
            Connecting Students,
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Building Communities
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12 font-light">
            Campus Connect is your gateway to discovering meaningful connections, developing new skills, and creating
            unforgettable experiences during your university journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/discover">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/register">
              <Button
                variant="outline"
                className="border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-lg h-auto font-semibold rounded-xl transition-all duration-200 bg-transparent"
              >
                Register Your Club
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg text-center"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Why Choose Campus Connect?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform is designed to make club discovery and community building as seamless and enjoyable as
              possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">What You'll Gain</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Joining clubs through Campus Connect opens doors to countless opportunities for personal and professional
              growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Getting started with Campus Connect is simple and straightforward.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Explore & Discover</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Browse through our extensive catalog of clubs using smart filters to find communities that match your
                  interests.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Connect & Apply</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Learn more about clubs, contact organizers, and submit applications through our streamlined process.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Engage & Grow</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Participate in events, collaborate on projects, and build meaningful relationships within your chosen
                  communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Club Categories Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Club Categories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover clubs across diverse categories, each offering unique opportunities for growth and connection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                  <Zap className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                  Technical Clubs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Perfect for students passionate about technology, programming, and innovation.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Programming", "AI/ML", "Robotics", "Cybersecurity", "Web Development", "Data Science"].map(
                    (tag) => (
                      <Badge
                        key={tag}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                      >
                        {tag}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                  <Heart className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400" />
                  Non-Technical Clubs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Ideal for creative minds and those interested in arts, business, and social activities.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Arts & Design", "Music", "Business", "Sports", "Photography", "Debate"].map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have already found their communities through Campus Connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/discover">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg h-auto font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Discover Clubs Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg h-auto font-semibold rounded-xl transition-all duration-200 bg-transparent"
              >
                Register Your Club
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

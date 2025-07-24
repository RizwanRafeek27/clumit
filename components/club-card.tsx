"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Calendar, Users, UserCheck, UserX } from "lucide-react"
import type { Club } from "@/types/club"

interface ClubCardProps {
  club: Club
  onViewDetails: (club: Club) => void
}

export function ClubCard({ club, onViewDetails }: ClubCardProps) {
  const [expandedTags, setExpandedTags] = useState(false)

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105 transform">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 border-gray-200 dark:border-gray-700 shadow-md flex-shrink-0">
            <AvatarImage src={club.logo || "/placeholder.svg"} alt={club.name} />
            <AvatarFallback className="text-sm sm:text-lg font-bold bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              {club.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-2 sm:mb-3 leading-tight line-clamp-2">
              {club.name}
            </h3>
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
              <Badge
                className={`text-xs font-semibold px-2 sm:px-3 py-1 rounded-full ${
                  club.category === "technical"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                }`}
              >
                {club.category === "technical" ? "Technical" : "Non-Technical"}
              </Badge>
              <Badge
                className={`text-xs font-semibold px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 ${
                  club.recruiting
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                }`}
              >
                {club.recruiting ? (
                  <>
                    <UserCheck className="h-2 w-2 sm:h-3 sm:w-3" />
                    Recruiting
                  </>
                ) : (
                  <>
                    <UserX className="h-2 w-2 sm:h-3 sm:w-3" />
                    Not Recruiting
                  </>
                )}
              </Badge>
              {club.tags.slice(0, expandedTags ? club.tags.length : 1).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </Badge>
              ))}
              {club.tags.length > 1 && (
                <button
                  onClick={() => setExpandedTags(!expandedTags)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline px-1 sm:px-2 py-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  {expandedTags ? "less" : `+${club.tags.length - 1} more`}
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 sm:mb-6">
          {club.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              <Users className="h-3 w-3 mr-1" />
              {club.members}
            </span>
            <span className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              <Calendar className="h-3 w-3 mr-1" />
              Est. {club.established}
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm px-3 sm:px-4"
            onClick={() => onViewDetails(club)}
          >
            Learn More
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

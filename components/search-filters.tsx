"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search, Filter, Code, Palette, X, UserCheck, UserX } from "lucide-react"
import { allTags } from "@/constants/tags"
import { useState } from "react"

interface SearchFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  recruitingFilter: string
  setRecruitingFilter: (recruiting: string) => void
}

export function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedTags,
  setSelectedTags,
  categoryFilter,
  setCategoryFilter,
  recruitingFilter,
  setRecruitingFilter,
}: SearchFiltersProps) {
  // Add state for expanded tags
  const [showAllTags, setShowAllTags] = useState(false)

  const handleTagToggle = (tag: string) => {
    setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag])
  }

  // Show first 5 most popular tags
  const popularTags = ["Technology", "Programming", "Arts", "Music", "Business"]
  const remainingTags = allTags.filter((tag) => !popularTags.includes(tag))

  return (
    <div className="mb-8 sm:mb-12 space-y-6 sm:space-y-8 px-4">
      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
          <Input
            placeholder="Search clubs by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row items-center p-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm w-full sm:w-auto">
          <Button
            variant={categoryFilter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCategoryFilter("all")}
            className={`w-full sm:w-auto rounded-xl font-semibold px-4 sm:px-6 py-2 mb-1 sm:mb-0 text-sm sm:text-base ${
              categoryFilter === "all"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            All Clubs
          </Button>
          <Button
            variant={categoryFilter === "technical" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCategoryFilter("technical")}
            className={`w-full sm:w-auto rounded-xl font-semibold px-4 sm:px-6 py-2 mb-1 sm:mb-0 text-sm sm:text-base ${
              categoryFilter === "technical"
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Technical
          </Button>
          <Button
            variant={categoryFilter === "non-technical" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCategoryFilter("non-technical")}
            className={`w-full sm:w-auto rounded-xl font-semibold px-4 sm:px-6 py-2 text-sm sm:text-base ${
              categoryFilter === "non-technical"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Palette className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Non-Technical
          </Button>
        </div>
      </div>

      {/* Recruiting Status Filter */}
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row items-center p-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm w-full sm:w-auto">
          <Button
            variant={recruitingFilter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setRecruitingFilter("all")}
            className={`w-full sm:w-auto rounded-xl font-semibold px-4 sm:px-6 py-2 mb-1 sm:mb-0 text-sm sm:text-base ${
              recruitingFilter === "all"
                ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            All Status
          </Button>
          <Button
            variant={recruitingFilter === "recruiting" ? "default" : "ghost"}
            size="sm"
            onClick={() => setRecruitingFilter("recruiting")}
            className={`w-full sm:w-auto rounded-xl font-semibold px-4 sm:px-6 py-2 mb-1 sm:mb-0 text-sm sm:text-base ${
              recruitingFilter === "recruiting"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <UserCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Recruiting
          </Button>
          <Button
            variant={recruitingFilter === "not-recruiting" ? "default" : "ghost"}
            size="sm"
            onClick={() => setRecruitingFilter("not-recruiting")}
            className={`w-full sm:w-auto rounded-xl font-semibold px-4 sm:px-6 py-2 text-sm sm:text-base ${
              recruitingFilter === "not-recruiting"
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <UserX className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Not Recruiting
          </Button>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="max-w-6xl mx-auto">
        <Label className="text-gray-700 dark:text-gray-300 mb-4 block text-center font-semibold text-sm sm:text-base">
          Filter by interests:
        </Label>
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center">
          {/* Show popular tags first, then remaining tags if expanded */}
          {(showAllTags ? allTags : popularTags).map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border-2 transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-md transform scale-105"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-sm"
              }`}
            >
              {tag}
              {selectedTags.includes(tag) && <X className="inline ml-1 sm:ml-2 h-2 w-2 sm:h-3 sm:w-3" />}
            </button>
          ))}

          {/* Show/Hide More Tags Button */}
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-sm transition-all duration-200"
          >
            {showAllTags ? "Show Less" : "..."}
            {!showAllTags && selectedTags.filter((tag) => !popularTags.includes(tag)).length > 0 && (
              <span className="ml-1 sm:ml-2 bg-blue-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold min-w-[1.25rem] h-5 flex items-center justify-center">
                {selectedTags.filter((tag) => !popularTags.includes(tag)).length}
              </span>
            )}
          </button>
        </div>

        {/* Selected Tags Summary & Clear Button */}
        {selectedTags.length > 0 && (
          <div className="text-center mt-4 space-y-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""} selected
              {!showAllTags && selectedTags.filter((tag) => !popularTags.includes(tag)).length > 0 && (
                <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">
                  ({selectedTags.filter((tag) => !popularTags.includes(tag)).length} from additional tags)
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedTags([])}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm sm:text-base"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

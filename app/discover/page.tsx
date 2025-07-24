"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { ClubCard } from "@/components/club-card";
import { SearchFilters } from "@/components/search-filters";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/auth-context";
import { mockClubs } from "@/data/clubs";
import type { Club } from "@/types/club";
import { useRouter } from "next/navigation";

export default function DiscoverPage() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, signIn, signOut } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [recruitingFilter, setRecruitingFilter] = useState("all");

  // Redirect based on user type after sign in
  useEffect(() => {
    if (user) {
      if (user.type === "superadmin") {
        router.push("/admin");
      } else if (user.type === "club") {
        router.push("/dashboard");
      }
    }
  }, [user, router]);

  const filteredClubs = mockClubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => club.tags.includes(tag));
    const matchesCategory =
      categoryFilter === "all" || club.category === categoryFilter;
    const matchesRecruiting =
      recruitingFilter === "all" ||
      (recruitingFilter === "recruiting" && club.recruiting) ||
      (recruitingFilter === "not-recruiting" && !club.recruiting);
    return matchesSearch && matchesTags && matchesCategory && matchesRecruiting;
  });

  const handleViewDetails = (club: Club) => {
    router.push(`/club/${club.id}`);
  };

  const recruitingCount = mockClubs.filter((club) => club.recruiting).length;
  const notRecruitingCount = mockClubs.filter(
    (club) => !club.recruiting
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        title="Campus Connect"
        showAuth={true}
        user={user}
        onSignIn={signIn}
        onLogout={signOut}
      />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
            Discover Clubs
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-4">
            Find your community among {mockClubs.length} active clubs
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400"></div>
        </div>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          recruitingFilter={recruitingFilter}
          setRecruitingFilter={setRecruitingFilter}
        />

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {filteredClubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-16 sm:py-20 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Search className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
              No clubs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Try adjusting your search criteria or filters
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedTags([]);
                setCategoryFilter("all");
                setRecruitingFilter("all");
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-sm sm:text-base px-4 sm:px-6"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

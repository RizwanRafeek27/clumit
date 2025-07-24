"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { PendingClubDialog } from "@/components/pending-club-dialog"
import { RejectionDialog } from "@/components/rejection-dialog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Settings, Code } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import { mockClubs, mockPendingClubs } from "@/data/clubs"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const { darkMode, toggleDarkMode } = useTheme()
  const { user, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.type !== "superadmin") {
      router.push("/discover")
    }
  }, [user, router])

  const handleApproval = (id: number) => {
    alert(`Club approved successfully! The club organizers will be notified via email.`)
  }

  const handleRejection = (id: number, reason: string) => {
    alert(
      `Club rejected successfully! Rejection reason: "${reason}"\n\nThe club organizers will be notified via email with the rejection reason.`,
    )
  }

  if (!user || user.type !== "superadmin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        title="Campus Connect - Super Admin"
        user={user}
        onLogout={signOut}
      />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12 text-center px-4">
          <h1 className="text-3xl sm:text-4xl font-black mb-3 sm:mb-4">Super Admin Panel</h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Manage club submissions and platform settings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 max-w-6xl mx-auto">
          <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{mockClubs.length}</p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">Active Clubs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                    {mockPendingClubs.filter((c) => c.status === "pending").length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">Pending Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Code className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                    {mockClubs.filter((c) => c.category === "technical").length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">Technical Clubs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg max-w-7xl mx-auto">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Pending Club Submissions
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
              Review and approve new club applications
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-full">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-gray-800">
                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                      Club Name
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base hidden sm:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                      Category
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base hidden md:table-cell">
                      Submitted
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                      Status
                    </TableHead>
                    <TableHead className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPendingClubs.map((club) => (
                    <TableRow key={club.id} className="border-gray-200 dark:border-gray-800">
                      <TableCell className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        <div className="max-w-32 sm:max-w-none truncate">{club.name}</div>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400 text-sm sm:text-base hidden sm:table-cell">
                        <div className="max-w-40 truncate">{club.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            club.category === "technical"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                              : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                          } rounded-full font-semibold text-xs sm:text-sm`}
                        >
                          {club.category === "technical" ? "Tech" : "Non-Tech"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400 text-sm sm:text-base hidden md:table-cell">
                        {club.submittedAt}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-full font-semibold text-xs sm:text-sm ${
                            club.status === "pending"
                              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                              : club.status === "approved"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {club.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                          <PendingClubDialog club={club} onApprove={handleApproval} onReject={handleRejection}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-300 dark:border-gray-700 rounded-xl font-semibold bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-xs sm:text-sm w-full sm:w-auto"
                            >
                              View
                            </Button>
                          </PendingClubDialog>
                          {club.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApproval(club.id)}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold text-xs sm:text-sm w-full sm:w-auto"
                              >
                                Approve
                              </Button>
                              <RejectionDialog club={club} onReject={handleRejection}>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-semibold text-xs sm:text-sm w-full sm:w-auto"
                                >
                                  Reject
                                </Button>
                              </RejectionDialog>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

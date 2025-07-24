"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Calendar,
  Tag,
  FileText,
  ExternalLink,
  Globe,
  Instagram,
  Linkedin,
  Code,
  Palette,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import type { PendingClub } from "@/types/club"

interface PendingClubDialogProps {
  club: PendingClub
  onApprove: (id: number) => void
  onReject: (id: number, reason: string) => void
  children: React.ReactNode
}

// Mock detailed data for pending clubs (in a real app, this would come from your API)
const getPendingClubDetails = (club: PendingClub) => {
  const mockDetails = {
    1: {
      description:
        "Exploring the world of data science through hands-on projects, workshops, and industry collaborations.",
      fullDescription:
        "Data Science Club is dedicated to fostering a community of data enthusiasts who are passionate about extracting insights from complex datasets. We organize weekly workshops on machine learning, statistical analysis, and data visualization. Our members work on real-world projects with local businesses and participate in national data science competitions. Whether you're a beginner or an expert, join us to explore the fascinating world of data science.",
      tags: ["Data Science", "Machine Learning", "Statistics", "Python", "R", "Analytics"],
      applyLink: "https://forms.google.com/datascience-application",
      website: "https://datascience.university.edu",
      instagram: "@datascience_uni",
      linkedin: "Data Science Club University",
      members: 0,
      established: "2024",
    },
    2: {
      description: "Capturing moments and telling stories through the art of photography.",
      fullDescription:
        "Photography Society brings together photography enthusiasts of all skill levels. We organize photo walks, workshops on different photography techniques, exhibitions showcasing member work, and guest lectures from professional photographers. From portrait to landscape, street to macro photography - we explore all genres. Join us to improve your skills, share your passion, and connect with fellow photographers.",
      tags: ["Photography", "Visual Arts", "Creative", "Digital Art", "Portraits", "Landscapes"],
      applyLink: "https://forms.google.com/photography-application",
      website: "",
      instagram: "@photo_society_uni",
      linkedin: "",
      members: 0,
      established: "2024",
    },
    3: {
      description: "Developing critical thinking and public speaking skills through competitive debate.",
      fullDescription:
        "Debate Team focuses on developing strong argumentation skills, critical thinking, and public speaking abilities. We participate in inter-university debate competitions, organize internal tournaments, and host public speaking workshops. Our members learn to research complex topics, construct logical arguments, and present their ideas confidently. Join us to sharpen your mind and voice.",
      tags: ["Debate", "Public Speaking", "Critical Thinking", "Communication", "Competition"],
      applyLink: "https://forms.google.com/debate-application",
      website: "",
      instagram: "",
      linkedin: "",
      members: 0,
      established: "2024",
    },
  }

  return (
    mockDetails[club.id as keyof typeof mockDetails] || {
      description: "Club description not available.",
      fullDescription: "Detailed description not available.",
      tags: [],
      applyLink: "",
      website: "",
      instagram: "",
      linkedin: "",
      members: 0,
      established: "2024",
    }
  )
}

export function PendingClubDialog({ club, onApprove, onReject, children }: PendingClubDialogProps) {
  const [rejectionReason, setRejectionReason] = useState("")
  const details = getPendingClubDetails(club)

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(club.id, rejectionReason)
      setRejectionReason("")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
      case "approved":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
      case "rejected":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-gray-900 dark:text-white text-2xl font-bold flex items-center">
                {club.category === "technical" ? (
                  <Code className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Palette className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400" />
                )}
                {club.name}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                Club submission details and review
              </DialogDescription>
            </div>
            <Badge className={`${getStatusColor(club.status)} rounded-full font-semibold flex items-center gap-2`}>
              {getStatusIcon(club.status)}
              {club.status.charAt(0).toUpperCase() + club.status.slice(1)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="border-gray-200/50 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-800/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Club Name</label>
                  <p className="text-gray-900 dark:text-white font-medium">{club.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
                  <div className="mt-1">
                    <Badge
                      className={`${
                        club.category === "technical"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      } rounded-full font-semibold`}
                    >
                      {club.category === "technical" ? "Technical" : "Non-Technical"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Email</label>
                  <div className="flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <p className="text-gray-900 dark:text-white">{club.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Submitted Date</label>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <p className="text-gray-900 dark:text-white">{club.submittedAt}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-gray-200/50 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-800/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Club Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Short Description</label>
                <p className="text-gray-900 dark:text-white leading-relaxed mt-2">{details.description}</p>
              </div>
              <Separator className="bg-gray-200 dark:bg-gray-700" />
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Description</label>
                <p className="text-gray-900 dark:text-white leading-relaxed mt-2">{details.fullDescription}</p>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-gray-200/50 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-800/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <Tag className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                Tags & Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {details.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Links & Social Media */}
          <Card className="border-gray-200/50 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-800/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Links & Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Application Form</label>
                <div className="flex items-center mt-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <ExternalLink className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <a
                    href={details.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {details.applyLink}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Website</label>
                  <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    {details.website ? (
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                        <a
                          href={details.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 dark:text-green-400 hover:underline font-medium text-sm"
                        >
                          Visit Website
                        </a>
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Not provided</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Instagram</label>
                  <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    {details.instagram ? (
                      <div className="flex items-center">
                        <Instagram className="h-4 w-4 mr-2 text-pink-600 dark:text-pink-400" />
                        <span className="text-gray-900 dark:text-white font-medium text-sm">{details.instagram}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Not provided</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">LinkedIn</label>
                  <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    {details.linkedin ? (
                      <div className="flex items-center">
                        <Linkedin className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-900 dark:text-white font-medium text-sm">{details.linkedin}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Not provided</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {club.status === "pending" && (
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-semibold px-6">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Application
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-gray-900 dark:text-white text-xl font-bold flex items-center">
                      <XCircle className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                      Reject Club Application
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                      Please provide a reason for rejecting this club application. This will help the club organizers
                      understand what needs to be improved.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="rejection-reason" className="text-gray-700 dark:text-gray-300 font-semibold">
                        Rejection Reason
                      </Label>
                      <Textarea
                        id="rejection-reason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        rows={4}
                        className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
                        placeholder="Please explain why this application is being rejected..."
                        required
                      />
                    </div>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className="border-gray-300 dark:border-gray-700 rounded-xl font-semibold bg-transparent"
                      onClick={() => setRejectionReason("")}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleReject}
                      disabled={!rejectionReason.trim()}
                      className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Reject Application
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                onClick={() => onApprove(club.id)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold px-6"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Application
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

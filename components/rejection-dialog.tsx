"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
import { XCircle } from "lucide-react"
import type { PendingClub } from "@/types/club"

interface RejectionDialogProps {
  club: PendingClub
  onReject: (id: number, reason: string) => void
  children: React.ReactNode
}

export function RejectionDialog({ club, onReject, children }: RejectionDialogProps) {
  const [rejectionReason, setRejectionReason] = useState("")
  const [open, setOpen] = useState(false)

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(club.id, rejectionReason)
      setRejectionReason("")
      setOpen(false)
    }
  }

  const handleCancel = () => {
    setRejectionReason("")
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900 dark:text-white text-xl font-bold flex items-center">
            <XCircle className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
            Reject Club Application
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
            You are about to reject the application for <strong>"{club.name}"</strong>. Please provide a detailed reason
            for rejection to help the club organizers understand what needs to be improved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="rejection-reason" className="text-gray-700 dark:text-gray-300 font-semibold">
              Rejection Reason <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="rejection-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
              placeholder="Please explain why this application is being rejected. Be specific about what needs to be improved..."
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              This message will be sent to the club organizers via email.
            </p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="border-gray-300 dark:border-gray-700 rounded-xl font-semibold bg-transparent"
            onClick={handleCancel}
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
  )
}

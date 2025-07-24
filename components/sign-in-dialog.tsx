"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users } from "lucide-react"
import type { User } from "@/types/club"
import { mockClubs } from "@/data/clubs"

interface SignInDialogProps {
  onSignIn: (user: User) => void
  children: React.ReactNode
}

export function SignInDialog({ onSignIn, children }: SignInDialogProps) {
  const [open, setOpen] = useState(false)
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  })

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if it's super admin credentials
    if (signInForm.email === "superadmin@university.edu" && signInForm.password === "hamza") {
      onSignIn({
        name: "Super Admin",
        type: "superadmin",
        email: signInForm.email,
      })
      setOpen(false)
      setSignInForm({ email: "", password: "" })
      return
    }

    // Check if it's the robot club credentials
    if (signInForm.email === "robot@manipal.edu" && signInForm.password === "hamza") {
      // Find the robotics club from mock data
      const roboticsClub = mockClubs.find((c) => c.id === 3) // Robotics Club has id 3
      if (roboticsClub) {
        onSignIn({
          name: "Club Admin",
          type: "club",
          email: signInForm.email,
          clubData: roboticsClub,
        })
        setOpen(false)
        setSignInForm({ email: "", password: "" })
        return
      }
    }

    // Check if it's a club login (existing logic for other clubs)
    const club = mockClubs.find((c) => c.contact === signInForm.email)

    if (club) {
      onSignIn({
        name: "Club Admin",
        type: "club",
        email: signInForm.email,
        clubData: club,
      })
      setOpen(false)
      setSignInForm({ email: "", password: "" })
    } else {
      alert("Invalid credentials! Please check your email address and password.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white text-xl font-bold flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Club Sign In
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Sign in to manage your club profile or access admin features
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={signInForm.email}
              onChange={(e) => setSignInForm((prev) => ({ ...prev, email: e.target.value }))}
              className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              placeholder="your-club@university.edu"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Use your club email or admin credentials</p>
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={signInForm.password}
              onChange={(e) => setSignInForm((prev) => ({ ...prev, password: e.target.value }))}
              className="mt-2 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              required
            />
          </div>
          <div className="flex space-x-3">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold"
            >
              Sign In
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-300 dark:border-gray-700 rounded-xl font-semibold bg-transparent text-gray-900 dark:text-white hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => {
                setOpen(false)
                // Navigate to register page
                window.location.href = "/register"
              }}
            >
              Register Club
            </Button>
          </div>
        </form>

        {/* Help text */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Club Admins:</strong> Use your registered club email address
            <br />
            <strong>Super Admin:</strong> Use your admin credentials to access the admin panel
            <br />
            <strong>Demo Club:</strong> robot@manipal.edu / hamza (Robotics Club)
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, Code, Palette, Upload, X, ImageIcon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { allTags } from "@/constants/tags"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const { darkMode, toggleDarkMode } = useTheme()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    description: "",
    fullDescription: "",
    tags: [] as string[],
    contact: "",
    password: "",
    applyLink: "",
    website: "",
    instagram: "",
    linkedin: "",
    category: "technical" as "technical" | "non-technical",
    logo: null as File | null,
    logoPreview: "" as string,
  })

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file")
        return
      }

      setSignUpForm((prev) => ({ ...prev, logo: file }))

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setSignUpForm((prev) => ({ ...prev, logoPreview: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setSignUpForm((prev) => ({ ...prev, logo: null, logoPreview: "" }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Club profile submitted for approval! You'll receive an email once it's reviewed.")
    router.push("/discover")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Join the Community
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">Register Your Club</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join the Campus Connect community and reach more students than ever before
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Club Profile Form */}
          <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <CardHeader className="pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Club Information</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">
                Fill out all required fields to submit your club for approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-8">
                <div>
                  <Label htmlFor="clubName" className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                    Club Name
                  </Label>
                  <Input
                    id="clubName"
                    value={signUpForm.name}
                    onChange={(e) => setSignUpForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl text-lg py-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="Enter your club name"
                    required
                  />
                </div>

                {/* Logo Upload Section */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-4 block">
                    Club Logo (Optional)
                  </Label>
                  <div className="flex items-start space-x-6">
                    {/* Logo Preview */}
                    <div className="flex-shrink-0">
                      <Avatar className="h-24 w-24 border-2 border-gray-300 dark:border-gray-700 shadow-md">
                        {signUpForm.logoPreview ? (
                          <AvatarImage src={signUpForm.logoPreview || "/placeholder.svg"} alt="Club logo preview" />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
                            {signUpForm.name ? (
                              signUpForm.name.charAt(0).toUpperCase()
                            ) : (
                              <ImageIcon className="h-8 w-8" />
                            )}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 space-y-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />

                      {!signUpForm.logo ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="border-gray-300 dark:border-gray-700 rounded-xl font-semibold bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="border-gray-300 dark:border-gray-700 rounded-xl font-semibold bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Change Logo
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={removeLogo}
                            className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-xl font-semibold bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      )}

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upload a square image (recommended: 200x200px or larger). Max file size: 5MB.
                        <br />
                        Supported formats: JPG, PNG, GIF, WebP
                      </p>

                      {signUpForm.logo && (
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                          ✓ {signUpForm.logo.name} ({(signUpForm.logo.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-4 block">
                    Club Category
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSignUpForm((prev) => ({ ...prev, category: "technical" }))}
                      className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                        signUpForm.category === "technical"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-lg"
                          : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
                      }`}
                    >
                      <Code className="h-8 w-8 mx-auto mb-3" />
                      <div className="font-bold text-lg">Technical</div>
                      <div className="text-sm opacity-75 mt-1">Programming, Engineering, Tech</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignUpForm((prev) => ({ ...prev, category: "non-technical" }))}
                      className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                        signUpForm.category === "non-technical"
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 shadow-lg"
                          : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
                      }`}
                    >
                      <Palette className="h-8 w-8 mx-auto mb-3" />
                      <div className="font-bold text-lg">Non-Technical</div>
                      <div className="text-sm opacity-75 mt-1">Arts, Business, Sports</div>
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                    Short Description
                  </Label>
                  <Textarea
                    id="description"
                    value={signUpForm.description}
                    onChange={(e) => setSignUpForm((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="Brief description for the club cards (max 150 characters)"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="fullDescription" className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                    Full Description
                  </Label>
                  <Textarea
                    id="fullDescription"
                    value={signUpForm.fullDescription}
                    onChange={(e) => setSignUpForm((prev) => ({ ...prev, fullDescription: e.target.value }))}
                    rows={6}
                    className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="Detailed description for the club's dedicated page"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-4 block">
                    Tags (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto border-2 border-gray-300 dark:border-gray-700 rounded-2xl p-4 bg-gray-50 dark:bg-gray-800/50">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-3">
                        <Checkbox
                          id={`signup-${tag}`}
                          checked={signUpForm.tags.includes(tag)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSignUpForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }))
                            } else {
                              setSignUpForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
                            }
                          }}
                          className="border-gray-400 dark:border-gray-600"
                        />
                        <Label
                          htmlFor={`signup-${tag}`}
                          className="text-sm text-gray-700 dark:text-gray-300 font-medium"
                        >
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact" className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                    Club Email
                  </Label>
                  <Input
                    id="contact"
                    type="email"
                    value={signUpForm.contact}
                    onChange={(e) => setSignUpForm((prev) => ({ ...prev, contact: e.target.value }))}
                    className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl text-lg py-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="clubname@learner.manipal.edu"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="applyLink" className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                    Google Forms Application Link
                  </Label>
                  <Input
                    id="applyLink"
                    type="url"
                    value={signUpForm.applyLink}
                    onChange={(e) => setSignUpForm((prev) => ({ ...prev, applyLink: e.target.value }))}
                    className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl text-lg py-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="https://forms.google.com/your-application-form"
                    required
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Students will be redirected to this form when they click "Apply Now"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="website" className="text-gray-700 dark:text-gray-300 font-semibold">
                      Website (Optional)
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={signUpForm.website}
                      onChange={(e) => setSignUpForm((prev) => ({ ...prev, website: e.target.value }))}
                      className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      placeholder="https://your-club-website.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="instagram" className="text-gray-700 dark:text-gray-300 font-semibold">
                      Instagram Handle (Optional)
                    </Label>
                    <Input
                      id="instagram"
                      value={signUpForm.instagram}
                      onChange={(e) => setSignUpForm((prev) => ({ ...prev, instagram: e.target.value }))}
                      className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      placeholder="@your_club_handle"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signupPassword" className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                    Password
                  </Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="mt-3 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl text-lg py-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="Create a password for future sign-ins"
                    required
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    You'll use this password to sign in and manage your club profile
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Submit for Approval
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <CardHeader className="pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Submission Process</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">
                What happens after you submit your club
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-lg font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Submit Application</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Fill out the comprehensive form with your club's information and submit for review by our admin
                      team.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-lg font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Admin Review</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Our admin team will carefully review your submission within 2-3 business days to ensure quality
                      standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-lg font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Go Live</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Once approved, your club will appear on the discover page for students to find and join your
                      community.
                    </p>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 text-lg mb-3">Logo Guidelines</h4>
                  <ul className="text-blue-700 dark:text-blue-300 leading-relaxed space-y-2 text-sm">
                    <li>• Use a square aspect ratio (1:1) for best results</li>
                    <li>• Minimum resolution: 200x200 pixels</li>
                    <li>• Maximum file size: 5MB</li>
                    <li>• Supported formats: JPG, PNG, GIF, WebP</li>
                    <li>• Avoid text-heavy logos (they may be hard to read when small)</li>
                    <li>• Use high contrast colors for better visibility</li>
                  </ul>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 text-lg mb-3">Need Help?</h4>
                  <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                    If you have questions about the submission process or need assistance, don't hesitate to contact us
                    at{" "}
                    <a href="mailto:admin@university.edu" className="underline font-semibold">
                      admin@university.edu
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

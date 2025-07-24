"use client";

import { AlertDialogTrigger } from "@/components/ui/alert-dialog";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ExternalLink,
  Mail,
  Globe,
  Instagram,
  Linkedin,
  Users,
  Calendar,
  Award,
  Edit,
  Save,
  Upload,
  X,
  ImageIcon,
  Trash2,
} from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/auth-context";
import { allTags } from "@/constants/tags";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    fullDescription: "",
    contact: "",
    applyLink: "",
    website: "",
    instagram: "",
    linkedin: "",
    members: 0,
    established: "",
    tags: [] as string[],
    logo: null as File | null,
    logoPreview: "" as string,
  });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClub = () => {
    // In a real app, this would make an API call to delete the club
    alert(
      "Your club profile has been permanently deleted from Campus Connect. You will be redirected to the homepage."
    );
    signOut(); // Sign out the user
    router.push("/"); // Redirect to homepage
    setShowDeleteDialog(false);
  };

  useEffect(() => {
    if (!user || user.type !== "club" || !user.clubData) {
      router.push("/discover");
    }
  }, [user, router]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      setEditForm((prev) => ({ ...prev, logo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm((prev) => ({
          ...prev,
          logoPreview: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setEditForm((prev) => ({ ...prev, logo: null, logoPreview: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEditSave = () => {
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const startEdit = () => {
    if (user?.clubData) {
      setEditForm({
        fullDescription: user.clubData.fullDescription || "",
        contact: user.clubData.contact || "",
        applyLink: user.clubData.applyLink || "",
        website: user.clubData.socialMedia?.website || "",
        instagram: user.clubData.socialMedia?.instagram || "",
        linkedin: user.clubData.socialMedia?.linkedin || "",
        members: user.clubData.members || 0,
        established: user.clubData.established || "",
        tags: [...(user.clubData.tags ?? [])],
        logo: null,
        logoPreview: user.clubData.logo || "",
      });
    }
    setEditMode(true);
  };

  if (!user || user.type !== "club" || !user.clubData) {
    return null;
  }

  const club = user.clubData;
  const currentLogo = editMode ? editForm.logoPreview || club.logo : club.logo;
  const currentMembers = editMode ? editForm.members : club.members;
  const currentEstablished = editMode ? editForm.established : club.established;
  const currentTags = editMode ? editForm.tags : club.tags;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        title="Campus Connect - Club Dashboard"
        user={user}
        onLogout={signOut}
      />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Club Header */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12 shadow-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 w-full lg:w-auto">
                <div className="relative mx-auto sm:mx-0">
                  <Avatar className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 border-4 border-gray-200 dark:border-gray-700 shadow-lg">
                    <AvatarImage
                      src={currentLogo || "/placeholder.svg"}
                      alt={club.name}
                    />
                    <AvatarFallback className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {club.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  {editMode && (
                    <div className="absolute -bottom-2 -right-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload-dashboard"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg"
                      >
                        <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="text-center sm:text-left w-full sm:w-auto">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4">
                    {club.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 justify-center sm:justify-start">
                    <Badge
                      className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-full ${
                        club.category === "technical"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      }`}
                    >
                      {club.category === "technical"
                        ? "Technical"
                        : "Non-Technical"}
                    </Badge>
                    {currentTags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {currentTags.length > 3 && (
                      <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm">
                        +{currentTags.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="font-semibold text-xs sm:text-sm">
                        {currentMembers} members
                      </span>
                    </div>
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="font-semibold text-xs sm:text-sm">
                        Est. {currentEstablished}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                <Button
                  onClick={editMode ? handleEditSave : startEdit}
                  className={`w-full sm:w-auto ${
                    editMode
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  } text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base`}
                >
                  {editMode ? (
                    <Save className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  ) : (
                    <Edit className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  )}
                  {editMode ? "Save Changes" : "Edit Profile"}
                </Button>

                {editMode && (
                  <AlertDialog
                    open={showDeleteDialog}
                    onOpenChange={setShowDeleteDialog}
                  >
                    <AlertDialogTrigger asChild>
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base">
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Delete Club
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-2xl max-w-md mx-4">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-gray-900 dark:text-white text-lg sm:text-xl font-bold flex items-center">
                          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600 dark:text-red-400" />
                          Delete Club Profile
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                          Are you sure you want to permanently delete{" "}
                          <strong>"{club.name}"</strong> from Campus Connect?
                          <br />
                          <br />
                          This action cannot be undone and will:
                          <br />• Remove your club from the discovery page
                          <br />• Delete all club information and settings
                          <br />• Prevent students from finding or applying to
                          your club
                          <br />
                          <br />
                          <span className="text-red-600 dark:text-red-400 font-semibold">
                            This action is permanent and irreversible.
                          </span>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-3 flex-col sm:flex-row">
                        <AlertDialogCancel className="w-full sm:w-auto border-gray-300 dark:border-gray-700 rounded-xl font-semibold bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteClub}
                          className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-semibold"
                        >
                          Yes, Delete Club
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>

            {/* Apply Now Button */}
            <div className="text-center">
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl h-auto font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => window.open(club.applyLink, "_blank")}
              >
                View Application Form
                <ExternalLink className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* About Us */}
            <div className="lg:col-span-2">
              <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" />
                    About Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {editMode ? (
                    <Textarea
                      value={editForm.fullDescription}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          fullDescription: e.target.value,
                        }))
                      }
                      rows={8}
                      className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl text-base sm:text-lg leading-relaxed focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      placeholder="Describe your club in detail..."
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                      {club.fullDescription}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Tags Section - Only show in edit mode */}
              {editMode && (
                <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg mt-6 sm:mt-8">
                  <CardHeader className="pb-4 sm:pb-6">
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      Edit Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-h-48 sm:max-h-64 overflow-y-auto border-2 border-gray-300 dark:border-gray-700 rounded-2xl p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50">
                      {allTags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center space-x-2 sm:space-x-3"
                        >
                          <Checkbox
                            id={`edit-${tag}`}
                            checked={editForm.tags.includes(tag)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setEditForm((prev) => ({
                                  ...prev,
                                  tags: [...prev.tags, tag],
                                }));
                              } else {
                                setEditForm((prev) => ({
                                  ...prev,
                                  tags: prev.tags.filter((t) => t !== tag),
                                }));
                              }
                            }}
                            className="border-gray-400 dark:border-gray-600"
                          />
                          <Label
                            htmlFor={`edit-${tag}`}
                            className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium"
                          >
                            {tag}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact & Settings */}
            <div>
              <Card className="border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Contact & Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Members Count */}
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                      Number of Members
                    </Label>
                    {editMode ? (
                      <Input
                        type="number"
                        min="0"
                        value={editForm.members}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            members: Number.parseInt(e.target.value) || 0,
                          }))
                        }
                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm sm:text-base"
                        placeholder="Enter number of members"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium text-sm sm:text-base">
                          {club.members} members
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Establishment Date */}
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                      Year Established
                    </Label>
                    {editMode ? (
                      <Input
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={editForm.established}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            established: e.target.value,
                          }))
                        }
                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm sm:text-base"
                        placeholder="Enter establishment year"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium text-sm sm:text-base">
                          Established {club.established}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Logo Upload in Edit Mode */}
                  {editMode && editForm.logo && (
                    <div className="space-y-2 sm:space-y-3">
                      <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                        New Logo
                      </Label>
                      <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                              {editForm.logo.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(editForm.logo.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={removeLogo}
                          className="border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                      Email
                    </Label>
                    {editMode ? (
                      <Input
                        value={editForm.contact}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            contact: e.target.value,
                          }))
                        }
                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm sm:text-base"
                        placeholder="club@university.edu"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base">
                          {club.contact}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base">
                      Application Form URL
                    </Label>
                    {editMode ? (
                      <Input
                        value={editForm.applyLink}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            applyLink: e.target.value,
                          }))
                        }
                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm sm:text-base"
                        placeholder="https://forms.google.com/..."
                      />
                    ) : (
                      <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <a
                          href={club.applyLink}
                          target="_blank"
                          className="text-green-600 dark:text-green-400 hover:underline font-medium text-sm sm:text-base"
                          rel="noreferrer"
                        >
                          Application Form
                        </a>
                      </div>
                    )}
                  </div>

                  {club.socialMedia && (
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="font-bold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        Social Media
                      </h4>

                      <div className="space-y-2 sm:space-y-3">
                        <Label className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                          Website
                        </Label>
                        {editMode ? (
                          <Input
                            value={editForm.website}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                website: e.target.value,
                              }))
                            }
                            className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm sm:text-base"
                            placeholder="https://your-website.com"
                          />
                        ) : club.socialMedia.website ? (
                          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <a
                              href={club.socialMedia.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm sm:text-base"
                            >
                              Visit Website
                            </a>
                          </div>
                        ) : (
                          <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                            No website added
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                          Instagram
                        </Label>
                        {editMode ? (
                          <Input
                            value={editForm.instagram}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                instagram: e.target.value,
                              }))
                            }
                            className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm sm:text-base"
                            placeholder="@your_handle"
                          />
                        ) : club.socialMedia.instagram ? (
                          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                              <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600 dark:text-pink-400" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                              {club.socialMedia.instagram}
                            </span>
                          </div>
                        ) : (
                          <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                            No Instagram added
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                          LinkedIn
                        </Label>
                        {editMode ? (
                          <Input
                            value={editForm.linkedin}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                linkedin: e.target.value,
                              }))
                            }
                            className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm sm:text-base"
                            placeholder="Your Company Name"
                          />
                        ) : club.socialMedia.linkedin ? (
                          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                              {club.socialMedia.linkedin}
                            </span>
                          </div>
                        ) : (
                          <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                            No LinkedIn added
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

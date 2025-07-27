"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Edit,
  Save,
  Shield,
  Star,
  TrendingUp,
  LogOut,
} from "lucide-react"

interface UserData {
  userType: string
  name: string
  email: string
  phone: string
  businessName: string
  address: string
  city: string
  pincode: string
  category: string
  description: string
  registrationDate: string
  verified: boolean
  id: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<UserData | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      window.location.href = "/auth/login"
      return
    }

    // Get user data
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserData(user)
      setEditedData(user)
    }
  }, [])

  const handleSave = () => {
    if (editedData) {
      localStorage.setItem("currentUser", JSON.stringify(editedData))
      setUserData(editedData)
      setIsEditing(false)
      alert("Profile updated successfully!")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (editedData) {
      setEditedData({ ...editedData, [field]: value })
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent">
              Sanchari
            </span>
          </Link>
          <Link href={userData.userType === "vendor" ? "/vendor" : "/supplier"}>
            <Button variant="ghost" className="font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-white to-slate-50">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600">
                  <AvatarFallback className="text-white text-2xl font-bold">
                    {getInitials(userData.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-3xl font-bold text-slate-900">{userData.name}</h1>
                    {userData.verified && (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200 capitalize">
                      {userData.userType}
                    </Badge>
                  </div>
                  <p className="text-xl text-slate-600 mb-2">{userData.businessName}</p>
                  <p className="text-slate-500">{userData.description}</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className={isEditing ? "bg-emerald-500 hover:bg-emerald-600" : "bg-orange-500 hover:bg-orange-600"}
                  >
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (confirm("Are you sure you want to logout?")) {
                        localStorage.removeItem("currentUser")
                        localStorage.removeItem("isLoggedIn")
                        localStorage.removeItem("userSettings")
                        localStorage.removeItem("rememberVendor")
                        localStorage.removeItem("rememberSupplier")
                        alert("You have been logged out successfully.")
                        window.location.href = "/"
                      }
                    }}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="personal" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="personal" className="text-lg">
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="business" className="text-lg">
              Business Details
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-lg">
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedData?.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                        <User className="w-4 h-4 text-slate-500" />
                        <span>{userData.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedData?.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span>{userData.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedData?.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                        <Phone className="w-4 h-4 text-slate-500" />
                        <span>{userData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registration">Member Since</Label>
                    <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>{new Date(userData.registrationDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600">
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Business Information
                </CardTitle>
                <CardDescription>Details about your business and location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    {isEditing ? (
                      <Input
                        id="businessName"
                        value={editedData?.businessName || ""}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                        <Building className="w-4 h-4 text-slate-500" />
                        <span>{userData.businessName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                      <Badge className="bg-orange-100 text-orange-800 capitalize">
                        {userData.category.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Textarea
                        id="address"
                        value={editedData?.address || ""}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                    ) : (
                      <div className="flex items-start space-x-2 p-3 bg-slate-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-slate-500 mt-1" />
                        <span>{userData.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={editedData?.city || ""}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>{userData.city}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    {isEditing ? (
                      <Input
                        id="pincode"
                        value={editedData?.pincode || ""}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span>{userData.pincode}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={editedData?.description || ""}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                      />
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span>{userData.description}</span>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600">
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">
                    {userData.userType === "vendor" ? "₹12,450" : "₹45,000"}
                  </div>
                  <div className="text-sm opacity-90">
                    {userData.userType === "vendor" ? "Total Spent" : "Total Revenue"}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">4.8</div>
                  <div className="text-sm opacity-90">Average Rating</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6 text-center">
                  <Building className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2">{userData.userType === "vendor" ? "23" : "156"}</div>
                  <div className="text-sm opacity-90">
                    {userData.userType === "vendor" ? "Orders Placed" : "Connected Vendors"}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>Your account verification and status information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-emerald-500" />
                      <span className="font-medium">Account Verified</span>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800">✓ Verified</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Profile Completion</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">100%</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <span className="font-medium">Member Since</span>
                    </div>
                    <span className="text-slate-600">{new Date(userData.registrationDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

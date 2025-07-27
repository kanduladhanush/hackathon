"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Mail, CheckCircle, RefreshCw, ArrowLeft, Loader2, AlertCircle, Copy, Eye, Info } from "lucide-react"

export default function RegisterPage() {
  const [userType, setUserType] = useState("vendor")
  const [currentStep, setCurrentStep] = useState("registration") // "registration" | "verification" | "success"
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [error, setError] = useState("")
  const [debugCode, setDebugCode] = useState("") // For development debugging
  const [emailMethod, setEmailMethod] = useState<"resend" | "simulation" | "">("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    address: "",
    city: "",
    pincode: "",
    category: "",
    description: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("") // Clear error when user starts typing
  }

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const sendVerificationEmail = async (email: string, name: string, code: string) => {
    try {
      console.log("🚀 Sending verification email request...")

      const response = await fetch("/api/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          verificationCode: code,
          userType,
        }),
      })

      const result = await response.json()
      console.log("📧 Email API response:", result)

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP ${response.status}: ${result.error || "Failed to send verification email"}`,
        )
      }

      // Store debug code and method for development
      if (result.debugCode) {
        setDebugCode(result.debugCode)
      }
      if (result.method) {
        setEmailMethod(result.method)
      }

      return result
    } catch (error) {
      console.error("❌ Email sending error:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }

    // Validate required fields
    if (!formData.name.trim() || !formData.businessName.trim() || !formData.phone.trim()) {
      setError("Please fill in all required fields")
      return
    }

    setIsSendingEmail(true)

    try {
      const verificationCode = generateVerificationCode()
      console.log("🔐 Generated verification code:", verificationCode)

      // Send verification email via API
      const result = await sendVerificationEmail(formData.email, formData.name, verificationCode)
      console.log("✅ Email sent successfully:", result)

      // Store temporary user data (not verified yet)
      const tempUserData = {
        userType,
        ...formData,
        registrationDate: new Date().toISOString(),
        verified: false,
        id: Date.now().toString(),
        verificationCode,
      }

      // Store in localStorage temporarily
      localStorage.setItem("tempUser", JSON.stringify(tempUserData))

      // Move to verification step
      setCurrentStep("verification")
    } catch (error: any) {
      console.error("💥 Registration error:", error)
      setError(error.message || "Failed to send verification email. Please try again.")
    } finally {
      setIsSendingEmail(false)
    }
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError("")

    try {
      // Get temporary user data
      const tempUserData = JSON.parse(localStorage.getItem("tempUser") || "{}")

      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Verify the code
      if (verificationCode === tempUserData.verificationCode) {
        // Mark user as verified and save permanently
        const verifiedUserData = {
          ...tempUserData,
          verified: true,
          verificationDate: new Date().toISOString(),
        }

        // Save verified user data
        localStorage.setItem("currentUser", JSON.stringify(verifiedUserData))
        localStorage.setItem("isLoggedIn", "true")
        localStorage.removeItem("tempUser")

        setCurrentStep("success")
      } else {
        setError("Invalid verification code. Please check your email and try again.")
      }
    } catch (error) {
      console.error("Verification error:", error)
      setError("Verification failed. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    setError("")

    try {
      const tempUserData = JSON.parse(localStorage.getItem("tempUser") || "{}")
      const newVerificationCode = generateVerificationCode()
      console.log("🔄 Generating new verification code:", newVerificationCode)

      // Send new verification email
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          verificationCode: newVerificationCode,
          userType,
        }),
      })

      const result = await response.json()
      console.log("🔄 Resend API response:", result)

      if (!response.ok) {
        throw new Error(result.message || "Failed to resend verification code")
      }

      // Update stored data with new code
      const updatedTempData = {
        ...tempUserData,
        verificationCode: newVerificationCode,
      }
      localStorage.setItem("tempUser", JSON.stringify(updatedTempData))

      // Store debug code and method for development
      if (result.debugCode) {
        setDebugCode(result.debugCode)
      }
      if (result.method) {
        setEmailMethod(result.method)
      }

      // Clear the input field
      setVerificationCode("")
    } catch (error: any) {
      console.error("❌ Resend error:", error)
      setError(error.message || "Failed to resend verification code. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  const handleSuccessRedirect = () => {
    // Redirect to appropriate dashboard
    if (userType === "vendor") {
      window.location.href = "/vendor"
    } else {
      window.location.href = "/supplier"
    }
  }

  const copyDebugCode = () => {
    navigator.clipboard.writeText(debugCode)
    alert("Debug code copied to clipboard!")
  }

  // Registration Form
  if (currentStep === "registration") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Sanchari</span>
            </Link>
            <p className="text-gray-600 mt-2">Join the marketplace and start growing your business</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Choose your account type and fill in your details</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={userType} onValueChange={setUserType} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="vendor">I'm a Vendor</TabsTrigger>
                  <TabsTrigger value="supplier">I'm a Supplier</TabsTrigger>
                </TabsList>
              </Tabs>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName">
                        {userType === "vendor" ? "Stall/Business Name *" : "Company Name *"}
                      </Label>
                      <Input
                        id="businessName"
                        placeholder={userType === "vendor" ? "Enter your stall name" : "Enter your company name"}
                        value={formData.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Business Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input
                        id="pincode"
                        placeholder="Enter PIN code"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">{userType === "vendor" ? "Food Category" : "Supply Category"}</Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={userType === "vendor" ? "Select your food category" : "Select what you supply"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {userType === "vendor" ? (
                          <>
                            <SelectItem value="street-food">Street Food</SelectItem>
                            <SelectItem value="snacks">Snacks & Chaat</SelectItem>
                            <SelectItem value="beverages">Beverages</SelectItem>
                            <SelectItem value="sweets">Sweets & Desserts</SelectItem>
                            <SelectItem value="fast-food">Fast Food</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="vegetables">Vegetables & Fruits</SelectItem>
                            <SelectItem value="spices">Spices & Seasonings</SelectItem>
                            <SelectItem value="oil">Oil & Cooking Essentials</SelectItem>
                            <SelectItem value="packaging">Packaging Materials</SelectItem>
                            <SelectItem value="dairy">Dairy Products</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder={
                        userType === "vendor"
                          ? "Tell us about your food business..."
                          : "Describe your supply business..."
                      }
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-orange-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-orange-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isSendingEmail}>
                  {isSendingEmail ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending verification email...
                    </>
                  ) : (
                    `Create ${userType === "vendor" ? "Vendor" : "Supplier"} Account`
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <div className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-orange-600 hover:underline">
                    Sign in
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Email Verification Step
  if (currentStep === "verification") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Sanchari</span>
            </Link>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
            <p className="text-gray-600">
              We've sent a 6-digit verification code to
              <br />
              <strong>{formData.email}</strong>
            </p>
            {emailMethod && (
              <p className="text-sm text-gray-500 mt-2">
                Sent via: <Badge variant="outline">{emailMethod === "simulation" ? "Console Log" : "Email"}</Badge>
              </p>
            )}
          </div>

          <Card>
            <CardContent className="pt-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {/* Development Debug Panel */}
              {debugCode && process.env.NODE_ENV === "development" && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">Development Mode</p>
                      <p className="text-sm text-blue-700">
                        Your verification code: <strong>{debugCode}</strong>
                      </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={copyDebugCode}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Email Method Info */}
              {emailMethod === "simulation" && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Demo Mode Active</p>
                      <p>Check your browser console for the verification code, or use the code shown above.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleVerification} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest font-mono"
                    required
                  />
                  <p className="text-sm text-gray-500 text-center">Enter the 6-digit code from your email</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={isVerifying || verificationCode.length !== 6}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify Email
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center space-y-4">
                <p className="text-sm text-gray-600">Didn't receive the code?</p>
                <Button
                  variant="outline"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="w-full bg-transparent"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Code
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep("registration")}
                  className="text-sm text-gray-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Registration
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Eye className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">
                  {emailMethod === "simulation" ? "Check your browser console" : "Check your email"}
                </p>
                <p>
                  {emailMethod === "simulation"
                    ? "The verification code has been logged to your browser console. Open Developer Tools (F12) to see it."
                    : "The verification code has been sent to your email. If you don't see it, check your spam folder."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Success Step
  if (currentStep === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Sanchari</span>
            </Link>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Sanchari! 🎉</h1>
            <p className="text-gray-600">Your account has been verified and is ready to use.</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-emerald-900">Email Verified</p>
                      <p className="text-sm text-emerald-700">{formData.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-orange-500">{userType === "vendor" ? "Vendor" : "Supplier"}</Badge>
                    <div>
                      <p className="font-medium text-orange-900">{formData.businessName}</p>
                      <p className="text-sm text-orange-700">{formData.name}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">What's next?</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Complete your profile setup</li>
                    <li>
                      • {userType === "vendor" ? "Find suppliers for your business" : "Connect with local vendors"}
                    </li>
                    <li>• Start using group ordering features</li>
                    <li>• Explore AI-powered recommendations</li>
                  </ul>
                </div>

                <Button onClick={handleSuccessRedirect} className="w-full bg-orange-500 hover:bg-orange-600">
                  Go to Dashboard
                </Button>

                <div className="text-center">
                  <Link href="/" className="text-sm text-gray-600 hover:underline">
                    Back to Home
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}

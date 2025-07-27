"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, EyeOff, Lock, Mail, User, Building, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("vendor")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check demo credentials first
    const demoCredentials = {
      vendor: { email: "vendor@demo.com", password: "password123" },
      supplier: { email: "supplier@demo.com", password: "password123" },
    }

    // Check if it's demo login
    if (
      email === demoCredentials[userType as keyof typeof demoCredentials].email &&
      password === demoCredentials[userType as keyof typeof demoCredentials].password
    ) {
      const demoUser = {
        userType,
        name: userType === "vendor" ? "Demo Vendor" : "Demo Supplier",
        email,
        businessName: userType === "vendor" ? "Demo Street Food" : "Demo Supplies",
        verified: true,
        id: "demo",
        phone: "+91 9876543210",
        address: userType === "vendor" ? "123 Food Street, Market Area" : "456 Supply Lane, Business District",
        city: userType === "vendor" ? "Delhi" : "Mumbai",
        pincode: userType === "vendor" ? "110001" : "400001",
        category: userType === "vendor" ? "street-food" : "vegetables",
        description: userType === "vendor" ? "Delicious street food vendor" : "Premium quality supplier",
        registrationDate: new Date().toISOString(),
      }

      localStorage.setItem("currentUser", JSON.stringify(demoUser))
      localStorage.setItem("isLoggedIn", "true")

      if (rememberMe) {
        localStorage.setItem(`remember${userType.charAt(0).toUpperCase() + userType.slice(1)}`, "true")
      }

      alert(`Welcome back, ${demoUser.name}! 🎉`)

      if (userType === "vendor") {
        window.location.href = "/vendor"
      } else {
        window.location.href = "/supplier"
      }
      return
    }

    // Check stored user data
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.email === email && userData.password === password && userData.userType === userType) {
        localStorage.setItem("isLoggedIn", "true")

        if (rememberMe) {
          localStorage.setItem(`remember${userType.charAt(0).toUpperCase() + userType.slice(1)}`, "true")
        }

        alert(`Welcome back, ${userData.name}! 🎉`)

        if (userType === "vendor") {
          window.location.href = "/vendor"
        } else {
          window.location.href = "/supplier"
        }
        return
      }
    }

    setIsLoading(false)
    alert("Invalid credentials! Please check your email and password or use demo credentials.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent">
              Sanchari
            </span>
          </Link>
          <p className="text-slate-600 mt-3 text-lg">Welcome back to your marketplace</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-900">Sign In</CardTitle>
            <CardDescription className="text-slate-600 text-base">
              Choose your account type and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={setUserType} className="mb-6">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="vendor" className="text-base">
                  <User className="w-4 h-4 mr-2" />
                  Vendor
                </TabsTrigger>
                <TabsTrigger value="supplier" className="text-base">
                  <Building className="w-4 h-4 mr-2" />
                  Supplier
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 border-2 border-slate-200 focus:border-orange-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 border-2 border-slate-200 focus:border-orange-500 transition-colors"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-600">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  `Sign In as ${userType === "vendor" ? "Vendor" : "Supplier"}`
                )}
              </Button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">New to Sanchari?</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Link href="/auth/register">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 bg-transparent"
                  >
                    Create Vendor Account
                  </Button>
                </Link>
                <Link href="/auth/supplier-register">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 bg-transparent"
                  >
                    Create Supplier Account
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                <Link href="/guide" className="hover:text-orange-600 transition-colors">
                  Help Center
                </Link>
                <span>•</span>
                <Link href="/chatbot" className="hover:text-orange-600 transition-colors">
                  Support Bot
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-6 bg-gradient-to-r from-orange-50 to-emerald-50 border-orange-200 shadow-lg">
          <CardContent className="pt-4">
            <div className="text-center">
              <Badge className="mb-3 bg-orange-100 text-orange-800 border-orange-300">
                <Shield className="w-3 h-3 mr-1" />
                Demo Access
              </Badge>
              <div className="text-sm text-orange-800 space-y-3">
                <div>
                  <div className="font-medium mb-2">Try Sanchari Platform:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="font-medium text-orange-700 mb-1">Vendor Demo</div>
                      <div className="text-xs space-y-1">
                        <div>
                          <strong>Email:</strong> vendor@demo.com
                        </div>
                        <div>
                          <strong>Password:</strong> password123
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="font-medium text-emerald-700 mb-1">Supplier Demo</div>
                      <div className="text-xs space-y-1">
                        <div>
                          <strong>Email:</strong> supplier@demo.com
                        </div>
                        <div>
                          <strong>Password:</strong> password123
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-700">Full access to all features with sample data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="mt-4 bg-slate-50 border-slate-200">
          <CardContent className="pt-4">
            <div className="text-center text-xs text-slate-600 space-y-2">
              <div className="flex items-center justify-center space-x-1">
                <Shield className="w-3 h-3" />
                <span className="font-medium">Your Privacy is Protected</span>
              </div>
              <p>We use industry-standard encryption and never share your data with third parties.</p>
              <div className="flex items-center justify-center space-x-4 mt-3">
                <Link href="/privacy" className="hover:text-orange-600 transition-colors">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-orange-600 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/">
            <Button variant="ghost" className="text-slate-600 hover:text-orange-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

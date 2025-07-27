"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, EyeOff, Lock, Mail, Building, ArrowLeft } from "lucide-react"

export default function SupplierLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
      email: "supplier@demo.com",
      password: "password123",
    }

    // Check if it's demo login
    if (email === demoCredentials.email && password === demoCredentials.password) {
      const demoUser = {
        userType: "supplier",
        name: "Demo Supplier",
        email,
        businessName: "Demo Supplies Co.",
        verified: true,
        id: "demo-supplier",
        phone: "+91 9876543210",
        address: "123 Supply Street, Business District",
        city: "Mumbai",
        pincode: "400001",
        category: "vegetables",
        description: "Premium quality supplier for street food vendors",
        registrationDate: new Date().toISOString(),
      }

      localStorage.setItem("currentUser", JSON.stringify(demoUser))
      localStorage.setItem("isLoggedIn", "true")

      if (rememberMe) {
        localStorage.setItem("rememberSupplier", "true")
      }

      alert(`Welcome back, ${demoUser.name}! 🎉`)
      window.location.href = "/supplier"
      return
    }

    // Check stored user data
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.email === email && userData.password === password && userData.userType === "supplier") {
        localStorage.setItem("isLoggedIn", "true")

        if (rememberMe) {
          localStorage.setItem("rememberSupplier", "true")
        }

        alert(`Welcome back, ${userData.name}! 🎉`)
        window.location.href = "/supplier"
        return
      }
    }

    setIsLoading(false)
    alert("Invalid credentials! Please check your email and password or use demo credentials.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
              Sanchari
            </span>
          </Link>
          <p className="text-slate-600 mt-3 text-lg">Supplier Portal</p>
          <Badge className="mt-2 bg-emerald-100 text-emerald-800 border-emerald-200">
            <Building className="w-3 h-3 mr-1" />
            Business Dashboard
          </Badge>
        </div>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back, Supplier!</CardTitle>
            <CardDescription className="text-slate-600 text-base">
              Sign in to manage your products and connect with vendors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Business Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 border-2 border-slate-200 focus:border-emerald-500 transition-colors"
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
                    className="pl-12 pr-12 h-12 border-2 border-slate-200 focus:border-emerald-500 transition-colors"
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
                  className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In to Dashboard"
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

              <Link href="/auth/supplier-register">
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 bg-transparent"
                >
                  Create Supplier Account
                </Button>
              </Link>

              <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                <Link href="/auth/login" className="hover:text-emerald-600 transition-colors">
                  Vendor Login
                </Link>
                <span>•</span>
                <Link href="/guide" className="hover:text-emerald-600 transition-colors">
                  Help Center
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-6 bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200 shadow-lg">
          <CardContent className="pt-4">
            <div className="text-center">
              <Badge className="mb-3 bg-emerald-100 text-emerald-800 border-emerald-300">
                <Shield className="w-3 h-3 mr-1" />
                Demo Access
              </Badge>
              <div className="text-sm text-emerald-800 space-y-2">
                <div className="font-medium">Try Sanchari Supplier Dashboard:</div>
                <div className="bg-white/60 rounded-lg p-3 space-y-1">
                  <div>
                    <strong>Email:</strong> supplier@demo.com
                  </div>
                  <div>
                    <strong>Password:</strong> password123
                  </div>
                </div>
                <p className="text-xs text-emerald-700 mt-2">Full access to all supplier features with sample data</p>
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
              <p>We use industry-standard encryption and never share your business data with third parties.</p>
              <div className="flex items-center justify-center space-x-4 mt-3">
                <Link href="/privacy" className="hover:text-emerald-600 transition-colors">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-emerald-600 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/">
            <Button variant="ghost" className="text-slate-600 hover:text-emerald-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

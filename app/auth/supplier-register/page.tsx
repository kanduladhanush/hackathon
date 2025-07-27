"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Truck, Package, Users, ArrowRight, CheckCircle } from "lucide-react"

export default function SupplierRegisterPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    businessType: "",
    suppliesCategory: "",
    description: "",
    minimumOrder: "",
    deliveryAreas: "",
    certifications: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to main registration page with supplier pre-selected
    window.location.href = "/auth/register?type=supplier"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">Sanchari</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join as a Supplier</h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with local vendors and grow your supply business across India
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Wide Network</h3>
              <p className="text-sm text-gray-600">Connect with thousands of vendors across multiple cities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Bulk Orders</h3>
              <p className="text-sm text-gray-600">Receive consistent bulk orders from verified vendors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Logistics</h3>
              <p className="text-sm text-gray-600">Streamlined delivery and payment management</p>
            </div>
          </div>
        </div>

        {/* Registration Preview Card */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Building2 className="w-5 h-5 text-green-500" />
              Supplier Registration Preview
            </CardTitle>
            <CardDescription>
              Get a preview of what information you'll need to provide during registration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Badge className="bg-green-500">1</Badge>
                  Company Information
                </h3>
                <div className="space-y-3 pl-8">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Company/Business Name
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Contact Person Details
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Business Address & Location
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Phone & Email Verification
                  </div>
                </div>
              </div>

              {/* Supply Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Badge className="bg-green-500">2</Badge>
                  Supply Information
                </h3>
                <div className="space-y-3 pl-8">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Supply Categories (Vegetables, Spices, etc.)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Minimum Order Quantities
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Delivery Areas & Logistics
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Business Certifications (Optional)
                  </div>
                </div>
              </div>
            </div>

            {/* Supply Categories */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Supply Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "Vegetables & Fruits",
                  "Spices & Seasonings",
                  "Oil & Cooking Essentials",
                  "Packaging Materials",
                  "Dairy Products",
                  "Grains & Pulses",
                  "Kitchen Equipment",
                  "Cleaning Supplies",
                ].map((category) => (
                  <Badge key={category} variant="outline" className="justify-center py-2">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Button onClick={handleSubmit} size="lg" className="bg-green-500 hover:bg-green-600">
                Start Supplier Registration
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-sm text-gray-600 mt-2">Registration takes about 5-10 minutes to complete</p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why Choose Sanchari?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Direct connection with verified vendors
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Secure payment processing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Real-time order tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  24/7 customer support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  AI-powered demand forecasting
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-500 text-xs">1</Badge>
                  <div>
                    <p className="font-medium text-sm">Complete Registration</p>
                    <p className="text-xs text-gray-600">Fill in your company and supply details</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-500 text-xs">2</Badge>
                  <div>
                    <p className="font-medium text-sm">Verify Your Account</p>
                    <p className="text-xs text-gray-600">Confirm your email and phone number</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-500 text-xs">3</Badge>
                  <div>
                    <p className="font-medium text-sm">Set Up Your Catalog</p>
                    <p className="text-xs text-gray-600">Add your products and pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-500 text-xs">4</Badge>
                  <div>
                    <p className="font-medium text-sm">Start Receiving Orders</p>
                    <p className="text-xs text-gray-600">Connect with vendors and grow your business</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-green-600 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
          <p className="text-xs text-gray-500">
            By registering, you agree to our{" "}
            <Link href="/terms" className="text-green-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-green-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

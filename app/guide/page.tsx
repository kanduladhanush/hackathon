"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  Play,
  CheckCircle,
  MapPin,
  ShoppingCart,
  Users,
  Truck,
  Star,
  Package,
  TrendingUp,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react"

export default function GuidePage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

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
          <Link href="/">
            <Button variant="ghost" className="font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-orange-100 to-emerald-100 text-orange-800 border-0 px-6 py-2">
            Complete Guide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How to Use{" "}
            <span className="bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">
              Sanchari
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to know to get started and make the most of our marketplace platform
          </p>
        </div>

        <Tabs defaultValue="vendor" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="vendor" className="text-lg py-3">
              For Vendors
            </TabsTrigger>
            <TabsTrigger value="supplier" className="text-lg py-3">
              For Suppliers
            </TabsTrigger>
          </TabsList>

          {/* Vendor Guide */}
          <TabsContent value="vendor" className="space-y-12">
            {/* Quick Start */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Vendor Quick Start Guide</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-orange-50">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Getting Started Video</CardTitle>
                    <CardDescription>Watch our 3-minute tutorial to understand the basics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center mb-4 cursor-pointer hover:bg-slate-300 transition-colors"
                      onClick={() => setActiveVideo("vendor-intro")}
                    >
                      <Play className="w-12 h-12 text-slate-600" />
                    </div>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Watch Tutorial</Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Quick Setup Checklist</CardTitle>
                    <CardDescription>Complete these steps to get started immediately</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Create your vendor account</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Verify your business details</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Set your location</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Browse nearby suppliers</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Place your first order</span>
                      </div>
                    </div>
                    <Link href="/auth/register">
                      <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600">Start Registration</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Step by Step Guide */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Find Suppliers</CardTitle>
                    <CardDescription>Discover verified suppliers near your location</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Compare Prices</CardTitle>
                    <CardDescription>Compare prices and read reviews from other vendors</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Place Orders</CardTitle>
                    <CardDescription>Add items to cart and place your order</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Track Delivery</CardTitle>
                    <CardDescription>Monitor your order status in real-time</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>

            {/* Features Deep Dive */}
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Features for Vendors</h3>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="location-search" className="border border-slate-200 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                      Location-Based Supplier Search
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pt-4">
                    <p className="mb-4">Find suppliers within your delivery radius:</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Set your location using GPS or PIN code</li>
                      <li>View suppliers sorted by distance</li>
                      <li>Check delivery time estimates</li>
                      <li>Filter by product categories</li>
                      <li>See real-time availability</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="group-buying" className="border border-slate-200 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-3 text-emerald-500" />
                      Group Buying & Bulk Discounts
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pt-4">
                    <p className="mb-4">Save money by joining group orders:</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Join existing group orders in your area</li>
                      <li>Create new group orders for popular items</li>
                      <li>Get discounts up to 25% on bulk purchases</li>
                      <li>Share delivery costs with other vendors</li>
                      <li>Track group order progress in real-time</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price-comparison" className="border border-slate-200 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-3 text-blue-500" />
                      Real-Time Price Comparison
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pt-4">
                    <p className="mb-4">Make informed purchasing decisions:</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Compare prices across multiple suppliers</li>
                      <li>View price history and trends</li>
                      <li>Get alerts for price drops</li>
                      <li>See total cost including delivery</li>
                      <li>Calculate potential savings</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="order-tracking" className="border border-slate-200 rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 mr-3 text-purple-500" />
                      Order Tracking & Management
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pt-4">
                    <p className="mb-4">Stay updated on your orders:</p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Real-time order status updates</li>
                      <li>SMS notifications for key milestones</li>
                      <li>Estimated delivery time</li>
                      <li>Contact delivery person directly</li>
                      <li>Rate and review after delivery</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </TabsContent>

          {/* Supplier Guide */}
          <TabsContent value="supplier" className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Supplier Quick Start Guide</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Supplier Onboarding</CardTitle>
                    <CardDescription>Learn how to set up your supplier profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center mb-4 cursor-pointer hover:bg-slate-300 transition-colors"
                      onClick={() => setActiveVideo("supplier-intro")}
                    >
                      <Play className="w-12 h-12 text-slate-600" />
                    </div>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Watch Tutorial</Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-orange-50">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>How to list and manage your products effectively</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Add product listings with photos</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Set competitive pricing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Manage inventory levels</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Set delivery radius</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span>Handle orders efficiently</span>
                      </div>
                    </div>
                    <Link href="/supplier">
                      <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">Go to Dashboard</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Supplier Features */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">List Products</CardTitle>
                    <CardDescription>Add your products with detailed information</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Manage Orders</CardTitle>
                    <CardDescription>Accept, process, and fulfill vendor orders</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Connect Vendors</CardTitle>
                    <CardDescription>Build relationships with local vendors</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Build Reputation</CardTitle>
                    <CardDescription>Earn ratings and grow your business</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="faq-1" className="border border-slate-200 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  How do I get verified as a vendor or supplier?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pt-4">
                  <p>Our verification process is simple and quick:</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Submit your business registration documents</li>
                    <li>Provide a valid phone number and address</li>
                    <li>Complete a brief phone verification call</li>
                    <li>Wait 24-48 hours for approval</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="border border-slate-200 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  What are the fees for using Sanchari?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pt-4">
                  <p>
                    Sanchari is free for vendors to use. Suppliers pay a small commission (3-5%) only on successful
                    orders. There are no monthly fees or hidden charges.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="border border-slate-200 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">How does group buying work?</AccordionTrigger>
                <AccordionContent className="text-slate-600 pt-4">
                  <p>Group buying allows vendors to combine orders for bulk discounts:</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Join existing group orders or create new ones</li>
                    <li>Minimum quantity requirements unlock discounts</li>
                    <li>Orders are delivered to a central location or individual addresses</li>
                    <li>Payment is processed individually for each vendor</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="border border-slate-200 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  What if I have issues with my order?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pt-4">
                  <p>We have a comprehensive support system:</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>24/7 customer support via chat and phone</li>
                    <li>Order dispute resolution process</li>
                    <li>Quality guarantee on all products</li>
                    <li>Easy returns and refunds policy</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="border border-slate-200 rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold">
                  How do I contact customer support?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-emerald-500" />
                      <span>Call us: +91 9876543210</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-orange-500" />
                      <span>Email: support@sanchari.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span>Live chat available 24/7 on the platform</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-500 to-emerald-500 text-white">
            <CardContent className="py-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-xl mb-8 opacity-90">Join thousands of vendors and suppliers already using Sanchari</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3">
                    Create Account
                  </Button>
                </Link>
                <Link href="/vendor">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 bg-transparent"
                  >
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

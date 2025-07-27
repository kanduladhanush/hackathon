import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, TrendingDown, Truck, Star, ArrowRight, Play, Shield, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent">
              Sanchari
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              How it Works
            </Link>
            <Link href="/guide" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              Guide
            </Link>
            <Link href="/tutorial" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              Tutorials
            </Link>
            <Link href="/chatbot" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              Help Bot
            </Link>
            <Link href="#testimonials" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              Reviews
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" className="font-medium">
                  Vendor Login
                </Button>
              </Link>
              <Link href="/auth/supplier-login">
                <Button variant="ghost" className="font-medium text-emerald-600">
                  Supplier Login
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Link href="/auth/login">
                <Button variant="ghost" className="font-medium">
                  Login
                </Button>
              </Link>
            </div>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-emerald-100/20"></div>
        <div className="container mx-auto text-center relative">
          <Badge className="mb-6 bg-gradient-to-r from-orange-100 to-emerald-100 text-orange-800 hover:from-orange-200 hover:to-emerald-200 border-0 px-6 py-2 text-sm font-medium animate-fade-in">
            🚀 India's First Street Food Vendor Marketplace
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 animate-fade-in">
            Raw Materials Made
            <span className="block bg-gradient-to-r from-orange-500 via-orange-600 to-emerald-500 bg-clip-text text-transparent">
              Simple & Profitable
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Connect with verified suppliers, compare prices in real-time, and save up to 30% on raw materials. Join 500+
            street food vendors already growing their business with Sanchari.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-fade-in">
            <Link href="/vendor">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                I'm a Vendor
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/supplier">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                I'm a Supplier
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <Link href="/guide">
            <Button variant="ghost" className="text-orange-600 hover:text-orange-700 font-medium group">
              <Play className="mr-2 w-4 h-4" />
              Watch How It Works
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white shadow-inner">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-3">
                500+
              </div>
              <div className="text-slate-600 font-medium">Active Vendors</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-3">
                200+
              </div>
              <div className="text-slate-600 font-medium">Verified Suppliers</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent mb-3">
                ₹2L+
              </div>
              <div className="text-slate-600 font-medium">Monthly Savings</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-orange-500 bg-clip-text text-transparent mb-3">
                50+
              </div>
              <div className="text-slate-600 font-medium">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-orange-100 text-orange-800 border-0">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Everything You Need to Source Raw Materials
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From location-based supplier discovery to bulk ordering and group discounts - we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50 group hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Location-Based Sourcing</CardTitle>
                <CardDescription className="text-slate-600">
                  Find verified suppliers near your location with real-time availability and instant delivery estimates
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-emerald-50 group hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Live Price Comparison</CardTitle>
                <CardDescription className="text-slate-600">
                  Compare prices from multiple suppliers in real-time and choose the best deals for your business
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50 group hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Group Buying Power</CardTitle>
                <CardDescription className="text-slate-600">
                  Join with nearby vendors for bulk discounts up to 25% and shared delivery costs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50 group hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">One-Click Ordering</CardTitle>
                <CardDescription className="text-slate-600">
                  Add multiple items to cart and place grouped orders effortlessly with our smart ordering system
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50 group hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Real-Time Tracking</CardTitle>
                <CardDescription className="text-slate-600">
                  Track your orders from dispatch to delivery with SMS notifications and live updates
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-yellow-50 group hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Quality Assurance</CardTitle>
                <CardDescription className="text-slate-600">
                  All suppliers are verified with ratings, reviews, and quality certifications from vendors
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-0">Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">How Sanchari Works</h2>
            <p className="text-xl text-slate-600">Simple steps to start saving on raw materials</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Register & Verify</h3>
              <p className="text-slate-600 leading-relaxed">
                Sign up as a vendor or supplier and complete our quick verification process to ensure trust and quality
              </p>
              <div className="mt-6">
                <Link href="/auth/register">
                  <Button
                    variant="outline"
                    className="group-hover:bg-orange-50 group-hover:border-orange-500 transition-colors bg-transparent"
                  >
                    Start Registration
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Browse & Compare</h3>
              <p className="text-slate-600 leading-relaxed">
                Find suppliers near you, compare prices in real-time, and read authentic reviews from other vendors
              </p>
              <div className="mt-6">
                <Link href="/vendor">
                  <Button
                    variant="outline"
                    className="group-hover:bg-emerald-50 group-hover:border-emerald-500 transition-colors bg-transparent"
                  >
                    Explore Suppliers
                  </Button>
                </Link>
              </div>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Order & Save</h3>
              <p className="text-slate-600 leading-relaxed">
                Place orders, join group buying for extra discounts, and get materials delivered to your location
              </p>
              <div className="mt-6">
                <Link href="/guide">
                  <Button
                    variant="outline"
                    className="group-hover:bg-blue-50 group-hover:border-blue-500 transition-colors bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-0">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">What Our Users Say</h2>
            <p className="text-xl text-slate-600">Real stories from vendors and suppliers using Sanchari</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    R
                  </div>
                  <div>
                    <div className="font-bold">Rajesh Kumar</div>
                    <div className="text-sm text-slate-600">Street Food Vendor, Delhi</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600">
                  "Sanchari helped me save ₹5000 per month on raw materials. The group buying feature is amazing!"
                </p>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl bg-white">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    P
                  </div>
                  <div>
                    <div className="font-bold">Priya Sharma</div>
                    <div className="text-sm text-slate-600">Supplier, Mumbai</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600">
                  "As a supplier, Sanchari connected me with 50+ vendors. My business has grown 3x in 6 months!"
                </p>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-xl bg-white">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    A
                  </div>
                  <div>
                    <div className="font-bold">Amit Singh</div>
                    <div className="text-sm text-slate-600">Chaat Vendor, Bangalore</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600">
                  "The quality of suppliers is excellent. Real-time price comparison saves me so much time!"
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 via-orange-600 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl text-orange-100 mb-12 max-w-3xl mx-auto">
            Join thousands of street food vendors and suppliers who are already saving money and growing their business
            with Sanchari
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/vendor">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                Start as Vendor
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/supplier">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                Join as Supplier
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/tutorial">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 text-lg px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-transparent"
              >
                Watch Tutorials
                <Play className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-2xl font-bold">Sanchari</span>
              </Link>
              <p className="text-slate-400 leading-relaxed">
                Connecting street food vendors with trusted suppliers across India. Building the future of food
                commerce.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">For Vendors</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/vendor" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/vendor" className="hover:text-white transition-colors">
                    Find Suppliers
                  </Link>
                </li>
                <li>
                  <Link href="/vendor" className="hover:text-white transition-colors">
                    Group Orders
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="hover:text-white transition-colors">
                    How to Use
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">For Suppliers</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/supplier" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/supplier" className="hover:text-white transition-colors">
                    Manage Products
                  </Link>
                </li>
                <li>
                  <Link href="/supplier" className="hover:text-white transition-colors">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className="hover:text-white transition-colors">
                    Supplier Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <Link href="/guide" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Sanchari. All rights reserved. Made with ❤️ for Indian street food vendors.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

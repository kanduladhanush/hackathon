"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  CheckCircle,
  Clock,
  Download,
  Play,
  Bookmark,
  BookmarkCheck,
  Award,
  X,
  ChevronRight,
  Home,
  UserPlus,
  Building2,
  Sparkles,
} from "lucide-react"

interface TutorialStep {
  id: string
  title: string
  description: string
  duration: string
  videoUrl?: string
  screenshot: string
  content: string
  completed: boolean
  bookmarked: boolean
}

interface TutorialSection {
  id: string
  title: string
  description: string
  icon: any
  color: string
  steps: TutorialStep[]
  completed: boolean
}

export default function TutorialPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [selectedStep, setSelectedStep] = useState<TutorialStep | null>(null)
  const [bookmarkedSteps, setBookmarkedSteps] = useState<string[]>([])
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [showCertificate, setShowCertificate] = useState(false)
  const [filterCompleted, setFilterCompleted] = useState(false)
  const [filterBookmarked, setFilterBookmarked] = useState(false)

  // Tutorial data
  const [tutorialSections, setTutorialSections] = useState<TutorialSection[]>([
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of navigating the Sanchari platform",
      icon: Home,
      color: "bg-blue-500",
      completed: false,
      steps: [
        {
          id: "gs-1",
          title: "Platform Overview",
          description: "Get familiar with the main dashboard and navigation",
          duration: "3 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Dashboard+Overview",
          content:
            "Welcome to Sanchari! This tutorial will guide you through the main features of our marketplace platform. The dashboard is your central hub where you can access all features, view notifications, and manage your business activities.",
          completed: false,
          bookmarked: false,
        },
        {
          id: "gs-2",
          title: "Navigation Menu",
          description: "Understanding the sidebar and main navigation options",
          duration: "2 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Navigation+Menu",
          content:
            "The sidebar contains all major sections: Dashboard, Orders, Chat, Suppliers/Vendors, Settings, and more. Each section has specific tools to help you manage your business effectively.",
          completed: false,
          bookmarked: false,
        },
        {
          id: "gs-3",
          title: "Profile Setup",
          description: "Complete your profile for better visibility",
          duration: "5 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Profile+Setup",
          content:
            "A complete profile helps build trust with other users. Add your business details, contact information, and upload a professional photo to get started.",
          completed: false,
          bookmarked: false,
        },
      ],
    },
    {
      id: "vendor-registration",
      title: "Vendor Registration",
      description: "Step-by-step guide for vendors joining the platform",
      icon: UserPlus,
      color: "bg-orange-500",
      completed: false,
      steps: [
        {
          id: "vr-1",
          title: "Account Creation",
          description: "Creating your vendor account with business details",
          duration: "4 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Vendor+Registration",
          content:
            "Start by selecting 'Vendor' during registration. Fill in your business name, contact details, and food category. Make sure all information is accurate as it will be visible to potential suppliers.",
          completed: false,
          bookmarked: false,
        },
        {
          id: "vr-2",
          title: "Business Verification",
          description: "Verify your email and complete business documentation",
          duration: "6 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Email+Verification",
          content:
            "Check your email for the verification code. This step ensures the security of your account and helps build trust in the marketplace community.",
          completed: false,
          bookmarked: false,
        },
        {
          id: "vr-3",
          title: "Menu Setup",
          description: "Add your food items and pricing information",
          duration: "8 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Menu+Setup",
          content:
            "Create your digital menu by adding food items, descriptions, prices, and photos. A well-organized menu attracts more customers and suppliers.",
          completed: false,
          bookmarked: false,
        },
        {
          id: "vr-4",
          title: "Location Settings",
          description: "Set up your stall location and delivery preferences",
          duration: "3 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Location+Setup",
          content:
            "Add your exact location to help suppliers find you easily. Set your delivery preferences and operating hours for better coordination.",
          completed: false,
          bookmarked: false,
        },
      ],
    },
    {
      id: "supplier-registration",
      title: "Supplier Registration",
      description: "Complete guide for suppliers to join and start supplying",
      icon: Building2,
      color: "bg-green-500",
      completed: false,
      steps: [
        {
          id: "sr-1",
          title: "Supplier Account Setup",
          description: "Register as a supplier with company information",
          duration: "5 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Supplier+Registration",
          content:
            "Choose 'Supplier' during registration and provide your company details, supply categories, and contact information. This helps vendors find the right suppliers for their needs.",
          completed: false,
          bookmarked: false,
        },
        {
          id: "sr-2",
          title: "Product Catalog",
          description: "Create your product catalog with pricing and availability",
          duration: "10 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Product+Catalog",
          content:
            "Build a comprehensive catalog of your products including vegetables, spices, packaging materials, and other supplies. Include high-quality photos and detailed descriptions.",
          completed: false,
          bookmarked: false,
        },
        {
          id: "sr-3",
          title: "Delivery Network",
          description: "Set up your delivery areas and logistics preferences",
          duration: "4 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Delivery+Network",
          content:
            "Define your delivery zones, minimum order quantities, and delivery schedules. This helps vendors understand your service capabilities.",
          completed: false,
          bookmarked: false,
        },
      ],
    },
    {
      id: "platform-features",
      title: "Platform Features",
      description: "Explore advanced features like chat, orders, and AI recommendations",
      icon: Sparkles,
      color: "bg-purple-500",
      completed: false,
      steps: [
        {
          id: "pf-1",
          title: "Dashboard Analytics",
          description: "Understanding your business metrics and performance",
          duration: "6 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Dashboard+Analytics",
          content:
            "Your dashboard shows key metrics like orders, revenue, popular items, and customer feedback. Use these insights to grow your business effectively.",
          completed: false,
          bookmarked: false,
        },
        {
          id: "pf-2",
          title: "Search & Discovery",
          description: "Find vendors, suppliers, and products efficiently",
          duration: "4 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Search+Features",
          content:
            "Use the powerful search feature to find exactly what you need. Filter by location, category, price range, and ratings to discover the best matches.",
          completed: false,
          bookmarked: false,
        },
        {
          id: "pf-3",
          title: "Order Management",
          description: "Place, track, and manage your orders seamlessly",
          duration: "7 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Order+Management",
          content:
            "Learn how to place orders, track deliveries, manage inventory, and handle order modifications. The system provides real-time updates on all your transactions.",
          completed: false,
          bookmarked: false,
        },
        {
          id: "pf-4",
          title: "Settings & Preferences",
          description: "Customize your account settings and notifications",
          duration: "5 min",
          screenshot: "/placeholder.svg?height=300&width=500&text=Settings+Page",
          content:
            "Personalize your experience by adjusting notification preferences, privacy settings, payment methods, and business information. Keep your profile updated for better visibility.",
          completed: false,
          bookmarked: false,
        },
      ],
    },
  ])

  // Load saved progress from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("tutorial-bookmarks")
    const savedCompleted = localStorage.getItem("tutorial-completed")

    if (savedBookmarks) {
      setBookmarkedSteps(JSON.parse(savedBookmarks))
    }
    if (savedCompleted) {
      setCompletedSteps(JSON.parse(savedCompleted))
    }
  }, [])

  // Update tutorial sections with saved progress
  useEffect(() => {
    setTutorialSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        steps: section.steps.map((step) => ({
          ...step,
          bookmarked: bookmarkedSteps.includes(step.id),
          completed: completedSteps.includes(step.id),
        })),
        completed: section.steps.every((step) => completedSteps.includes(step.id)),
      })),
    )
  }, [bookmarkedSteps, completedSteps])

  // Save progress to localStorage
  const saveProgress = () => {
    localStorage.setItem("tutorial-bookmarks", JSON.stringify(bookmarkedSteps))
    localStorage.setItem("tutorial-completed", JSON.stringify(completedSteps))
  }

  // Toggle bookmark
  const toggleBookmark = (stepId: string) => {
    setBookmarkedSteps((prev) => {
      const updated = prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
      localStorage.setItem("tutorial-bookmarks", JSON.stringify(updated))
      return updated
    })
  }

  // Mark step as completed
  const markCompleted = (stepId: string) => {
    setCompletedSteps((prev) => {
      if (prev.includes(stepId)) return prev
      const updated = [...prev, stepId]
      localStorage.setItem("tutorial-completed", JSON.stringify(updated))
      return updated
    })
  }

  // Filter steps based on search and filters
  const getFilteredSteps = () => {
    let allSteps: (TutorialStep & { sectionTitle: string; sectionColor: string })[] = []

    tutorialSections.forEach((section) => {
      section.steps.forEach((step) => {
        allSteps.push({
          ...step,
          sectionTitle: section.title,
          sectionColor: section.color,
        })
      })
    })

    // Apply search filter
    if (searchQuery) {
      allSteps = allSteps.filter(
        (step) =>
          step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          step.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          step.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply completion filter
    if (filterCompleted) {
      allSteps = allSteps.filter((step) => completedSteps.includes(step.id))
    }

    // Apply bookmark filter
    if (filterBookmarked) {
      allSteps = allSteps.filter((step) => bookmarkedSteps.includes(step.id))
    }

    return allSteps
  }

  // Calculate overall progress
  const totalSteps = tutorialSections.reduce((acc, section) => acc + section.steps.length, 0)
  const completedCount = completedSteps.length
  const overallProgress = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0

  // Generate certificate
  const generateCertificate = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    // Background
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, 800, 600)

    // Border
    ctx.strokeStyle = "#f97316"
    ctx.lineWidth = 8
    ctx.strokeRect(20, 20, 760, 560)

    // Title
    ctx.fillStyle = "#1e293b"
    ctx.font = "bold 36px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Certificate of Completion", 400, 120)

    // Subtitle
    ctx.fillStyle = "#64748b"
    ctx.font = "24px Arial"
    ctx.fillText("Sanchari Marketplace Tutorial", 400, 160)

    // User achievement
    ctx.fillStyle = "#1e293b"
    ctx.font = "20px Arial"
    ctx.fillText("This certifies that", 400, 220)

    ctx.font = "bold 28px Arial"
    ctx.fillStyle = "#f97316"
    ctx.fillText("Tutorial Participant", 400, 260)

    ctx.fillStyle = "#1e293b"
    ctx.font = "20px Arial"
    ctx.fillText("has successfully completed", 400, 300)

    ctx.font = "bold 24px Arial"
    ctx.fillText(`${completedCount} of ${totalSteps} tutorial steps`, 400, 340)

    // Date
    ctx.fillStyle = "#64748b"
    ctx.font = "16px Arial"
    ctx.fillText(`Completed on ${new Date().toLocaleDateString()}`, 400, 420)

    // Logo area
    ctx.fillStyle = "#f97316"
    ctx.fillRect(350, 460, 100, 60)
    ctx.fillStyle = "white"
    ctx.font = "bold 24px Arial"
    ctx.fillText("S", 400, 495)

    // Download
    const link = document.createElement("a")
    link.download = "sanchari-tutorial-certificate.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📚 Sanchari Tutorial Center</h1>
          <p className="text-xl text-gray-600 mb-6">Master the platform with our comprehensive step-by-step guides</p>

          {/* Progress Overview */}
          <Card className="max-w-2xl mx-auto mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <p className="text-sm text-gray-600">Overall Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedCount}/{totalSteps} Steps
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-orange-500">{Math.round(overallProgress)}%</p>
                </div>
              </div>
              <Progress value={overallProgress} className="mb-4" />
              <div className="flex gap-2 justify-center">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Bookmark className="w-3 h-3" />
                  {bookmarkedSteps.length} Bookmarked
                </Badge>
                {overallProgress === 100 && (
                  <Badge className="bg-green-500 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    All Complete!
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tutorials, steps, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterCompleted ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCompleted(!filterCompleted)}
                  className="flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </Button>
                <Button
                  variant={filterBookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterBookmarked(!filterBookmarked)}
                  className="flex items-center gap-1"
                >
                  <Bookmark className="w-4 h-4" />
                  Bookmarked
                </Button>
                {(filterCompleted || filterBookmarked || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFilterCompleted(false)
                      setFilterBookmarked(false)
                      setSearchQuery("")
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results or Section View */}
        {searchQuery || filterCompleted || filterBookmarked ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Search Results ({getFilteredSteps().length} steps found)
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {getFilteredSteps().map((step) => (
                <Card key={step.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={`${step.sectionColor} text-white text-xs`}>{step.sectionTitle}</Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(step.id)
                          }}
                          className="h-6 w-6 p-0"
                        >
                          {bookmarkedSteps.includes(step.id) ? (
                            <BookmarkCheck className="w-3 h-3 text-orange-500" />
                          ) : (
                            <Bookmark className="w-3 h-3" />
                          )}
                        </Button>
                        {completedSteps.includes(step.id) && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setSelectedStep(step)}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Tutorial Sections */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {tutorialSections.map((section) => {
              const sectionProgress =
                section.steps.length > 0
                  ? (section.steps.filter((step) => completedSteps.includes(step.id)).length / section.steps.length) *
                    100
                  : 0

              return (
                <Card key={section.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${section.color}`}>
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {section.title}
                          {section.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(sectionProgress)}%</span>
                        </div>
                        <Progress value={sectionProgress} />
                      </div>

                      <div className="space-y-2">
                        {section.steps.map((step, index) => (
                          <div
                            key={step.id}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedStep(step)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {completedSteps.includes(step.id) ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                )}
                                <span className="text-sm font-medium">{step.title}</span>
                              </div>
                              {bookmarkedSteps.includes(step.id) && (
                                <BookmarkCheck className="w-3 h-3 text-orange-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{step.duration}</span>
                              <ChevronRight className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="w-full"
                        variant={sectionProgress === 100 ? "outline" : "default"}
                        onClick={() => setSelectedSection(section.id)}
                      >
                        {sectionProgress === 100 ? "Review Section" : "Start Learning"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Certificate Section */}
        {overallProgress === 100 && (
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-6 text-center">
              <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations! 🎉</h3>
              <p className="text-green-700 mb-4">
                You've completed all tutorial steps! Download your certificate to celebrate your achievement.
              </p>
              <Button onClick={generateCertificate} className="bg-green-500 hover:bg-green-600">
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step Detail Modal */}
        <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedStep?.title}</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => selectedStep && toggleBookmark(selectedStep.id)}>
                    {selectedStep && bookmarkedSteps.includes(selectedStep.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </Button>
                  {selectedStep && completedSteps.includes(selectedStep.id) && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6">
                {selectedStep && (
                  <>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedStep.duration}
                      </div>
                      {selectedStep.videoUrl && (
                        <div className="flex items-center gap-1">
                          <Play className="w-4 h-4" />
                          Video Available
                        </div>
                      )}
                    </div>

                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={selectedStep.screenshot || "/placeholder.svg"}
                        alt={selectedStep.title}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => window.open(selectedStep.screenshot, "_blank")}
                      />
                    </div>

                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{selectedStep.content}</p>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">{selectedStep.description}</div>
                      <div className="flex gap-2">
                        {!completedSteps.includes(selectedStep.id) && (
                          <Button
                            onClick={() => {
                              markCompleted(selectedStep.id)
                              setSelectedStep(null)
                            }}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark Complete
                          </Button>
                        )}
                        <Button variant="outline" onClick={() => setSelectedStep(null)}>
                          Close
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

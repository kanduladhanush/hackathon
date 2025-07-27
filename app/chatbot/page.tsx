"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, Bot, User, HelpCircle, ShoppingCart, Users, Truck } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  quickReplies?: string[]
}

const quickQuestions = [
  {
    category: "Getting Started",
    icon: HelpCircle,
    questions: [
      "How do I register as a vendor?",
      "How do I find suppliers near me?",
      "What documents do I need for verification?",
      "How do I set up my profile?",
    ],
  },
  {
    category: "Ordering",
    icon: ShoppingCart,
    questions: [
      "How do I add items to cart?",
      "How do I specify quantities?",
      "What payment methods are accepted?",
      "How do I track my orders?",
    ],
  },
  {
    category: "Group Orders",
    icon: Users,
    questions: [
      "What are group orders?",
      "How do I join a group order?",
      "How much can I save with group buying?",
      "How do group order deliveries work?",
    ],
  },
  {
    category: "Delivery & Support",
    icon: Truck,
    questions: [
      "What are the delivery charges?",
      "How long does delivery take?",
      "What if my order is delayed?",
      "How do I contact customer support?",
    ],
  },
]

const botResponses: { [key: string]: { text: string; quickReplies?: string[] } } = {
  "how do i register as a vendor?": {
    text: "To register as a vendor:\n1. Click 'Get Started' on the homepage\n2. Select 'I'm a Vendor'\n3. Fill in your personal and business details\n4. Upload required documents\n5. Wait for verification (24-48 hours)\n\nYou can start browsing suppliers immediately after registration!",
    quickReplies: ["What documents do I need?", "How long does verification take?"],
  },
  "how do i find suppliers near me?": {
    text: "Finding suppliers is easy:\n1. Go to your vendor dashboard\n2. Use the search bar to find specific products\n3. Suppliers are automatically sorted by distance\n4. Use filters to narrow down by category, rating, or delivery time\n\nYou can see each supplier's distance, delivery time, and ratings!",
    quickReplies: ["How do I compare prices?", "What if no suppliers are nearby?"],
  },
  "what documents do i need for verification?": {
    text: "For vendor verification, you need:\n• Business registration certificate\n• Valid ID proof (Aadhar/PAN)\n• Address proof\n• Phone number for OTP verification\n• Bank account details\n\nAll documents are securely stored and used only for verification purposes.",
    quickReplies: ["How long does verification take?", "Is my data secure?"],
  },
  "how do i add items to cart?": {
    text: "Adding items to cart:\n1. Browse suppliers on your dashboard\n2. Find the product you want\n3. Use +/- buttons to set quantity\n4. Click 'Add to Cart'\n5. View cart by clicking the cart icon\n\nYou can add items from multiple suppliers in one cart!",
    quickReplies: ["How do I change quantities?", "Can I order from multiple suppliers?"],
  },
  "what are group orders?": {
    text: "Group orders help you save money:\n• Join with other vendors to buy in bulk\n• Get discounts up to 25%\n• Share delivery costs\n• Minimum quantity requirements apply\n\nYou can join existing group orders or create new ones in your area!",
    quickReplies: ["How do I join a group order?", "How much can I save?"],
  },
  "how do i join a group order?": {
    text: "To join a group order:\n1. Go to 'Group Orders' tab\n2. Browse active group orders in your area\n3. Check the discount and progress\n4. Click 'Join Group Order'\n5. You'll be notified when the order is ready\n\nGroup orders have time limits, so join quickly!",
    quickReplies: ["What happens after I join?", "Can I leave a group order?"],
  },
  "how do i track my orders?": {
    text: "Track your orders easily:\n1. Go to 'My Orders' tab\n2. Click 'Track Order' on any order\n3. Get real-time SMS updates\n4. See delivery status and estimated time\n5. Contact delivery person if needed\n\nYou'll get notifications at every step!",
    quickReplies: ["What if my order is delayed?", "How do I contact the supplier?"],
  },
  "what are the delivery charges?": {
    text: "Delivery charges vary by:\n• Distance from supplier\n• Order value (free delivery above ₹500)\n• Group orders have shared delivery costs\n• Express delivery available for urgent orders\n\nMost deliveries within 5km are ₹30-50. Check exact charges at checkout!",
    quickReplies: ["How can I get free delivery?", "What about group order delivery?"],
  },
  default: {
    text: "I'm here to help! You can ask me about:\n• Registration and verification\n• Finding and ordering from suppliers\n• Group orders and savings\n• Delivery and tracking\n• Account management\n\nWhat would you like to know?",
    quickReplies: ["How do I get started?", "Tell me about group orders", "How do I find suppliers?"],
  },
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Sanchari Assistant 🤖\n\nI'm here to help you with any questions about using our marketplace. You can ask me about registration, finding suppliers, placing orders, group buying, and more!\n\nWhat would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      quickReplies: ["How do I get started?", "Tell me about group orders", "How do I find suppliers?"],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = (text: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const normalizedText = text.toLowerCase().trim()
      const response = botResponses[normalizedText] || botResponses.default

      const botMessage: Message = {
        id: messages.length + 2,
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        quickReplies: response.quickReplies,
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputMessage("")
  }

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      sendMessage(inputMessage)
    }
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
          <Link href="/vendor">
            <Button variant="ghost" className="font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Quick Questions
                </CardTitle>
                <CardDescription>Click on any question to get instant answers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickQuestions.map((category) => (
                  <div key={category.category}>
                    <div className="flex items-center gap-2 mb-2">
                      <category.icon className="w-4 h-4 text-orange-500" />
                      <h4 className="font-medium text-sm">{category.category}</h4>
                    </div>
                    <div className="space-y-1">
                      {category.questions.map((question) => (
                        <Button
                          key={question}
                          variant="ghost"
                          size="sm"
                          className="w-full text-left justify-start h-auto p-2 text-xs hover:bg-orange-50 bg-transparent"
                          onClick={() => sendMessage(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-xl h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div>Sanchari Assistant</div>
                    <div className="text-sm font-normal text-slate-600">Always here to help</div>
                  </div>
                  <Badge className="ml-auto bg-emerald-100 text-emerald-800">Online</Badge>
                </CardTitle>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%]`}>
                        {message.sender === "bot" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "user" ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-900"
                          }`}
                        >
                          <div className="whitespace-pre-line">{message.text}</div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                        {message.sender === "user" && (
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Quick Replies */}
                  {messages.length > 0 && messages[messages.length - 1].quickReplies && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {messages[messages.length - 1].quickReplies!.map((reply) => (
                        <Button
                          key={reply}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply)}
                          className="bg-transparent hover:bg-orange-50 hover:border-orange-500"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your question here..."
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

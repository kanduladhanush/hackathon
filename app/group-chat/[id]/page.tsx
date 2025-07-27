"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, Users, Clock, Package, MapPin, Phone, Info } from "lucide-react"

interface ChatMessage {
  id: number
  sender: string
  message: string
  timestamp: Date
  type: "message" | "system" | "order_update"
}

interface GroupOrderDetails {
  id: string
  title: string
  product: string
  targetQuantity: string
  currentQuantity: string
  discount: string
  timeLeft: string
  participants: number
  progress: number
  coordinator: string
  deliveryLocation: string
  estimatedDelivery: string
}

export default function GroupChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "System",
      message: "Welcome to the Bulk Onion Order group! 🧅",
      timestamp: new Date(Date.now() - 3600000),
      type: "system",
    },
    {
      id: 2,
      sender: "Rajesh Kumar",
      message: "Hi everyone! I need about 20kg of onions. What's the current rate?",
      timestamp: new Date(Date.now() - 3000000),
      type: "message",
    },
    {
      id: 3,
      sender: "Priya Sharma",
      message: "The supplier quoted ₹22/kg for bulk order. Much better than market rate of ₹28!",
      timestamp: new Date(Date.now() - 2700000),
      type: "message",
    },
    {
      id: 4,
      sender: "System",
      message: "Order progress updated: 320kg / 500kg (64% complete)",
      timestamp: new Date(Date.now() - 2400000),
      type: "order_update",
    },
    {
      id: 5,
      sender: "Amit Singh",
      message: "I just joined! Adding 30kg to the order. When is the delivery?",
      timestamp: new Date(Date.now() - 1800000),
      type: "message",
    },
    {
      id: 6,
      sender: "Sunita Devi",
      message: "Delivery is scheduled for tomorrow 2-4 PM at the community center",
      timestamp: new Date(Date.now() - 1200000),
      type: "message",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)

  const groupOrder: GroupOrderDetails = {
    id: params.id,
    title: "Bulk Onion Order - Sector 15",
    product: "Fresh Onions",
    targetQuantity: "500 kg",
    currentQuantity: "320 kg",
    discount: "15%",
    timeLeft: "2 days",
    participants: 8,
    progress: 64,
    coordinator: "Rajesh Kumar",
    deliveryLocation: "Sector 15 Community Center",
    estimatedDelivery: "Tomorrow 2-4 PM",
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: messages.length + 1,
        sender: currentUser?.name || "You",
        message: newMessage,
        timestamp: new Date(),
        type: "message",
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getMessageColor = (sender: string) => {
    const colors = ["bg-orange-500", "bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500"]
    let hash = 0
    for (let i = 0; i < sender.length; i++) {
      hash = sender.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
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
          {/* Group Order Details Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">{groupOrder.title}</h4>
                  <Badge className="bg-orange-100 text-orange-800">{groupOrder.discount} OFF</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-slate-500" />
                    <span>{groupOrder.product}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span>{groupOrder.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>{groupOrder.timeLeft} left</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>{groupOrder.deliveryLocation}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>
                      {groupOrder.currentQuantity} / {groupOrder.targetQuantity}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: `${groupOrder.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{groupOrder.progress}% complete</p>
                </div>

                <div className="pt-4 border-t">
                  <h5 className="font-medium text-sm mb-2">Coordinator</h5>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 bg-orange-500">
                      <AvatarFallback className="text-white text-xs">
                        {getInitials(groupOrder.coordinator)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{groupOrder.coordinator}</div>
                      <div className="text-xs text-slate-600">Group Leader</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                    <Phone className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-xl h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div>{groupOrder.title}</div>
                        <div className="text-sm font-normal text-slate-600">
                          {groupOrder.participants} members • {groupOrder.timeLeft} left
                        </div>
                      </div>
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                    <Button variant="ghost" size="sm">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id}>
                      {message.type === "system" || message.type === "order_update" ? (
                        <div className="flex justify-center">
                          <div className="bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full">
                            {message.message}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start space-x-3">
                          <Avatar className={`w-8 h-8 ${getMessageColor(message.sender)}`}>
                            <AvatarFallback className="text-white text-xs">
                              {getInitials(message.sender)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{message.sender}</span>
                              <span className="text-xs text-slate-500">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="bg-white border rounded-lg p-3 shadow-sm">{message.message}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4">
                <form onSubmit={sendMessage} className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message to the group..."
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-xs text-slate-500 mt-2">
                  💡 Tip: Use this chat to coordinate delivery details and ask questions about the order
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

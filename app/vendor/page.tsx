"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MapPin,
  Search,
  ShoppingCart,
  Users,
  Star,
  Truck,
  Filter,
  Plus,
  Minus,
  Bell,
  Settings,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

// Mock data with more realistic information
const suppliers = [
  {
    id: 1,
    name: "Fresh Veggie Hub",
    rating: 4.8,
    distance: "0.5 km",
    deliveryTime: "30 mins",
    specialties: ["Vegetables", "Fruits"],
    verified: true,
    products: [
      { name: "Onions", price: 25, unit: "kg", stock: 500, discount: 10 },
      { name: "Tomatoes", price: 35, unit: "kg", stock: 200, discount: 0 },
      { name: "Potatoes", price: 20, unit: "kg", stock: 300, discount: 15 },
    ],
  },
  {
    id: 2,
    name: "Spice Master",
    rating: 4.6,
    distance: "1.2 km",
    deliveryTime: "45 mins",
    specialties: ["Spices", "Oil"],
    verified: true,
    products: [
      { name: "Turmeric Powder", price: 180, unit: "kg", stock: 50, discount: 5 },
      { name: "Red Chili Powder", price: 220, unit: "kg", stock: 30, discount: 0 },
      { name: "Cooking Oil", price: 120, unit: "liter", stock: 100, discount: 8 },
    ],
  },
  {
    id: 3,
    name: "Packaging Pro",
    rating: 4.7,
    distance: "2.1 km",
    deliveryTime: "60 mins",
    specialties: ["Packaging", "Disposables"],
    verified: true,
    products: [
      { name: "Paper Plates", price: 3, unit: "piece", stock: 1000, discount: 20 },
      { name: "Food Containers", price: 5, unit: "piece", stock: 500, discount: 12 },
      { name: "Plastic Bags", price: 2, unit: "piece", stock: 2000, discount: 0 },
    ],
  },
]

const groupOrders = [
  {
    id: 1,
    title: "Bulk Onion Order - Sector 15",
    participants: 8,
    targetQuantity: "500 kg",
    currentQuantity: "320 kg",
    discount: "15%",
    timeLeft: "2 days",
    status: "active",
    progress: 64,
  },
  {
    id: 2,
    title: "Spice Mix Bundle - Market Area",
    participants: 12,
    targetQuantity: "100 kg",
    currentQuantity: "85 kg",
    discount: "20%",
    timeLeft: "5 hours",
    status: "almost_full",
    progress: 85,
  },
  {
    id: 3,
    title: "Packaging Combo - Food Court",
    participants: 6,
    targetQuantity: "1000 pieces",
    currentQuantity: "450 pieces",
    discount: "18%",
    timeLeft: "1 day",
    status: "active",
    progress: 45,
  },
]

const myOrders = [
  {
    id: "ORD001",
    supplier: "Fresh Veggie Hub",
    items: "Onions (10kg), Tomatoes (5kg)",
    amount: 425,
    status: "delivered",
    date: "2024-01-15",
    rating: 5,
  },
  {
    id: "ORD002",
    supplier: "Spice Master",
    items: "Turmeric (2kg), Oil (5L)",
    amount: 960,
    status: "in_transit",
    date: "2024-01-16",
    rating: null,
  },
  {
    id: "ORD003",
    supplier: "Packaging Pro",
    items: "Paper Plates (100pcs)",
    amount: 300,
    status: "confirmed",
    date: "2024-01-16",
    rating: null,
  },
]

export default function VendorDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Group Order Available",
      message: "Join the bulk onion order in your area - 15% discount!",
      time: "2 mins ago",
      type: "group_order",
      read: false,
    },
    {
      id: 2,
      title: "Order Delivered",
      message: "Your order #ORD001 has been delivered successfully",
      time: "1 hour ago",
      type: "order_update",
      read: false,
    },
    {
      id: 3,
      title: "Price Drop Alert",
      message: "Tomato prices dropped by 20% at Fresh Veggie Hub",
      time: "3 hours ago",
      type: "price_alert",
      read: true,
    },
  ])
  const [showCart, setShowCart] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      window.location.href = "/auth/login"
      return
    }

    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const addToCart = (supplier: any, product: any, quantity?: number) => {
    const productKey = `${supplier.id}-${product.name}`
    const qty = quantity || productQuantities[productKey] || 1

    const existingItem = cartItems.find((item) => item.supplier === supplier.name && item.name === product.name)

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.supplier === supplier.name && item.name === product.name
            ? { ...item, quantity: item.quantity + qty }
            : item,
        ),
      )
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          supplier: supplier.name,
          ...product,
          quantity: qty,
          supplierId: supplier.id,
        },
      ])
    }

    // Reset quantity input
    setProductQuantities((prev) => ({ ...prev, [productKey]: 1 }))
  }

  const removeFromCart = (supplierName: string, productName: string) => {
    setCartItems((prev) => prev.filter((item) => !(item.supplier === supplierName && item.name === productName)))
  }

  const updateCartQuantity = (supplierName: string, productName: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(supplierName, productName)
      return
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.supplier === supplierName && item.name === productName ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const handleQuantityChange = (supplierId: number, productName: string, quantity: number) => {
    const productKey = `${supplierId}-${productName}`
    setProductQuantities((prev) => ({ ...prev, [productKey]: Math.max(1, quantity) }))
  }

  const getTotalCartValue = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const joinGroupOrder = (orderId: number) => {
    alert(`Successfully joined group order #${orderId}! You'll be notified when the order is ready.`)
  }

  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!")
      return
    }
    alert(`Order placed successfully! Total: ₹${getTotalCartValue()}. You'll receive a confirmation SMS shortly.`)
    setCartItems([])
    setShowCart(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-100 text-emerald-800"
      case "in_transit":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-orange-100 text-orange-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleFilterClick = () => {
    alert("Filter options: Category, Price Range, Distance, Rating")
  }

  const handleViewDetails = (supplier: any) => {
    alert(
      `Viewing details for ${supplier.name}\nRating: ${supplier.rating}\nDistance: ${supplier.distance}\nDelivery: ${supplier.deliveryTime}`,
    )
  }

  const handleTrackOrder = (orderId: string) => {
    alert(
      `Tracking Order ${orderId}:\n• Order Confirmed\n• Being Prepared\n• Out for Delivery\n• Estimated Time: 30 mins`,
    )
  }

  const handleRateOrder = (orderId: string) => {
    const rating = prompt("Rate this order (1-5 stars):")
    if (rating && Number.parseInt(rating) >= 1 && Number.parseInt(rating) <= 5) {
      alert(`Thank you for rating order ${orderId} with ${rating} stars!`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent">
              Sanchari
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-600">
              <MapPin className="w-4 h-4 mr-2" />
              Sector 15, Noida
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {notifications.filter((n) => !n.read).length}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Notifications</DialogTitle>
                  <DialogDescription>Stay updated with your latest activities</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">No notifications</p>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          notification.read ? "bg-slate-50" : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <span className="text-xs text-slate-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-slate-600">{notification.message}</p>
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="mt-2 h-6 px-2 text-xs"
                            onClick={() => {
                              setNotifications((prev) =>
                                prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
                              )
                            }}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showCart} onOpenChange={setShowCart}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="relative bg-transparent">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({cartItems.length})
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-orange-500 text-white text-xs">
                      {cartItems.length}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Shopping Cart</DialogTitle>
                  <DialogDescription>Review your items before placing the order</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">Your cart is empty</p>
                  ) : (
                    cartItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-slate-600">{item.supplier}</div>
                          <div className="text-sm font-medium">
                            ₹{item.price}/{item.unit}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.supplier, item.name, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartQuantity(item.supplier, item.name, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {cartItems.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-lg">Total: ₹{getTotalCartValue()}</span>
                    </div>
                    <Button onClick={placeOrder} className="w-full bg-orange-500 hover:bg-orange-600">
                      Place Order
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
            Welcome back, {currentUser?.name || "Vendor"}! 👋
          </h1>
          <p className="text-slate-600 text-lg">
            Find the best suppliers and raw materials for your street food business
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">₹12,450</div>
              <div className="text-sm opacity-90">This Month Spent</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">₹2,340</div>
              <div className="text-sm opacity-90">Money Saved</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm opacity-90">Orders Placed</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm opacity-90">Suppliers Used</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search for suppliers or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg border-2 border-slate-200 focus:border-orange-500"
            />
          </div>
        </div>

        <Tabs defaultValue="suppliers" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="suppliers" className="text-lg">
              Nearby Suppliers
            </TabsTrigger>
            <TabsTrigger value="group-orders" className="text-lg">
              Group Orders
            </TabsTrigger>
            <TabsTrigger value="my-orders" className="text-lg">
              My Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suppliers" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">Suppliers Near You</h2>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" onClick={handleFilterClick}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Link href="/guide">
                  <Button variant="ghost" size="sm" className="text-orange-600">
                    Need Help?
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-8">
              {filteredSuppliers.map((supplier) => (
                <Card
                  key={supplier.id}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-white to-slate-50"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3 text-xl">
                          {supplier.name}
                          {supplier.verified && (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">✓ Verified</Badge>
                          )}
                          <Badge variant="secondary" className="text-sm">
                            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {supplier.rating}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-6 mt-3 text-base">
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            {supplier.distance}
                          </span>
                          <span className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-emerald-500" />
                            {supplier.deliveryTime}
                          </span>
                        </CardDescription>
                        <div className="flex gap-2 mt-3">
                          {supplier.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="outline"
                              className="text-sm border-orange-200 text-orange-700"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleViewDetails(supplier)}
                        className="bg-transparent hover:bg-orange-50 hover:border-orange-500"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-700 text-lg">Available Products:</h4>
                      {supplier.products.map((product, idx) => {
                        const productKey = `${supplier.id}-${product.name}`
                        const currentQuantity = productQuantities[productKey] || 1

                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-orange-200 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div className="font-semibold text-lg">{product.name}</div>
                                {product.discount > 0 && (
                                  <Badge className="bg-red-100 text-red-800 text-xs">{product.discount}% OFF</Badge>
                                )}
                              </div>
                              <div className="text-slate-600 mt-1">
                                <span className="font-medium text-lg">
                                  ₹{product.price}/{product.unit}
                                </span>
                                {product.discount > 0 && (
                                  <span className="ml-2 text-sm line-through text-slate-400">
                                    ₹{Math.round(product.price / (1 - product.discount / 100))}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-slate-500 mt-1">
                                Stock: {product.stock} {product.unit}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2 bg-slate-50 rounded-lg p-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleQuantityChange(supplier.id, product.name, currentQuantity - 1)}
                                  disabled={currentQuantity <= 1}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <Input
                                  type="number"
                                  min="1"
                                  value={currentQuantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      supplier.id,
                                      product.name,
                                      Number.parseInt(e.target.value) || 1,
                                    )
                                  }
                                  className="w-16 h-8 text-center border-0 bg-transparent"
                                />
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleQuantityChange(supplier.id, product.name, currentQuantity + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <span className="text-sm text-slate-600 min-w-[3rem]">{product.unit}</span>
                              <Button
                                size="sm"
                                onClick={() => addToCart(supplier, product)}
                                className="bg-orange-500 hover:bg-orange-600 px-6"
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="group-orders" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">Active Group Orders</h2>
              <Button className="bg-orange-500 hover:bg-orange-600 px-6">
                <Users className="w-4 h-4 mr-2" />
                Create Group Order
              </Button>
            </div>

            <div className="grid gap-6">
              {groupOrders.map((order) => (
                <Card
                  key={order.id}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-white to-slate-50"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{order.title}</CardTitle>
                        <CardDescription className="text-base">
                          {order.participants} vendors joined • {order.timeLeft} left
                        </CardDescription>
                      </div>
                      <Badge
                        className={`text-lg px-4 py-2 ${
                          order.status === "almost_full"
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                      >
                        {order.discount} OFF
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-base mb-3">
                          <span className="font-medium">Progress</span>
                          <span className="font-semibold">
                            {order.currentQuantity} / {order.targetQuantity}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${order.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-slate-600 mt-2">{order.progress}% complete</div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => joinGroupOrder(order.id)}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-emerald-500 hover:from-orange-600 hover:to-emerald-600 text-lg py-3"
                        >
                          Join Group Order
                        </Button>
                        <Link href={`/group-chat/${order.id}`}>
                          <Button
                            variant="outline"
                            className="px-4 py-3 bg-transparent hover:bg-emerald-50 hover:border-emerald-500"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-orders" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">My Orders</h2>
              <Link href="/guide">
                <Button variant="outline">Need Help with Orders?</Button>
              </Link>
            </div>

            {myOrders.length === 0 ? (
              <Card className="border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <Truck className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">No orders yet</h3>
                  <p className="text-slate-600 mb-6 text-lg">
                    Start by adding items to your cart from nearby suppliers
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 text-lg">Browse Suppliers</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {myOrders.map((order) => (
                  <Card key={order.id} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-slate-600 mb-1">
                            <strong>Supplier:</strong> {order.supplier}
                          </p>
                          <p className="text-slate-600 mb-1">
                            <strong>Items:</strong> {order.items}
                          </p>
                          <p className="text-slate-600 mb-1">
                            <strong>Date:</strong> {order.date}
                          </p>
                          <p className="text-lg font-semibold text-slate-900">Total: ₹{order.amount}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order.id)}>
                            Track Order
                          </Button>
                          {order.status === "delivered" && !order.rating && (
                            <Button
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600"
                              onClick={() => handleRateOrder(order.id)}
                            >
                              Rate Order
                            </Button>
                          )}
                          {order.rating && (
                            <div className="flex items-center">
                              <span className="text-sm mr-1">Rated:</span>
                              {[...Array(order.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

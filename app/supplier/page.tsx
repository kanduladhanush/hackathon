"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, TrendingUp, Users, ShoppingCart, Plus, Edit, Eye, Bell, Settings, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data
const dashboardStats = {
  totalProducts: 24,
  activeOrders: 12,
  monthlyRevenue: 45000,
  totalVendors: 156,
}

const initialProducts = [
  { id: 1, name: "Fresh Onions", category: "Vegetables", price: 25, stock: 500, unit: "kg", status: "active" },
  { id: 2, name: "Tomatoes", category: "Vegetables", price: 35, stock: 200, unit: "kg", status: "active" },
  { id: 3, name: "Turmeric Powder", category: "Spices", price: 180, stock: 50, unit: "kg", status: "low_stock" },
  { id: 4, name: "Cooking Oil", category: "Oil", price: 120, stock: 100, unit: "liter", status: "active" },
  { id: 5, name: "Paper Plates", category: "Packaging", price: 3, stock: 1000, unit: "piece", status: "active" },
]

const initialOrders = [
  {
    id: "ORD001",
    vendor: "Rajesh Kumar",
    items: "Onions (10kg), Tomatoes (5kg)",
    amount: 425,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "ORD002",
    vendor: "Priya Sharma",
    items: "Turmeric (2kg), Oil (5L)",
    amount: 960,
    status: "confirmed",
    date: "2024-01-15",
  },
  {
    id: "ORD003",
    vendor: "Amit Singh",
    items: "Paper Plates (100pcs)",
    amount: 300,
    status: "delivered",
    date: "2024-01-14",
  },
  {
    id: "ORD004",
    vendor: "Sunita Devi",
    items: "Onions (20kg), Potatoes (15kg)",
    amount: 800,
    status: "in_transit",
    date: "2024-01-14",
  },
]

export default function SupplierDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [products, setProducts] = useState(initialProducts)
  const [orders, setOrders] = useState(initialOrders)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [viewingOrder, setViewingOrder] = useState<any>(null)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order Received",
      message: "You have a new order from Rajesh Kumar",
      time: "5 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "Turmeric Powder is running low (50kg remaining)",
      time: "1 hour ago",
      read: false,
    },
  ])
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    unit: "kg",
    status: "active",
  })

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "low_stock":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in_transit":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
      const product = {
        id: products.length + 1,
        ...newProduct,
        price: Number.parseFloat(newProduct.price),
        stock: Number.parseInt(newProduct.stock),
      }
      setProducts([...products, product])
      setNewProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        unit: "kg",
        status: "active",
      })
      setShowAddProduct(false)
      alert("Product added successfully!")
    } else {
      alert("Please fill in all required fields")
    }
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      unit: product.unit,
      status: product.status,
    })
  }

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...newProduct,
                price: Number.parseFloat(newProduct.price),
                stock: Number.parseInt(newProduct.stock),
              }
            : p,
        ),
      )
      setEditingProduct(null)
      setNewProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        unit: "kg",
        status: "active",
      })
      alert("Product updated successfully!")
    }
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId))
      alert("Product deleted successfully!")
    }
  }

  const handleAcceptOrder = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "confirmed" } : order)))
    alert(`Order ${orderId} has been accepted and confirmed!`)
  }

  const handleViewOrder = (order: any) => {
    setViewingOrder(order)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            <Badge variant="outline" className="text-green-600 border-green-600">
              Verified Supplier
            </Badge>
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
                  {notifications.map((notification) => (
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
                  ))}
                </div>
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
            Welcome, {currentUser?.businessName || "Supplier"}! 👋
          </h1>
          <p className="text-slate-600 text-lg">Manage your products, orders, and connect with street food vendors</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-white/80">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((o) => o.status !== "delivered").length}</div>
              <p className="text-xs text-white/80">+4 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{dashboardStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-white/80">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Vendors</CardTitle>
              <Users className="h-4 w-4 text-white/80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalVendors}</div>
              <p className="text-xs text-white/80">+8 new this week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="products" className="text-lg">
              My Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-lg">
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-lg">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">Product Inventory</h2>
              <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                    <DialogDescription>
                      {editingProduct ? "Update product details" : "Add a new product to your inventory"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vegetables">Vegetables</SelectItem>
                          <SelectItem value="Spices">Spices</SelectItem>
                          <SelectItem value="Oil">Oil</SelectItem>
                          <SelectItem value="Packaging">Packaging</SelectItem>
                          <SelectItem value="Dairy">Dairy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unit</Label>
                        <Select
                          value={newProduct.unit}
                          onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="liter">liter</SelectItem>
                            <SelectItem value="piece">piece</SelectItem>
                            <SelectItem value="packet">packet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAddProduct(false)
                          setEditingProduct(null)
                          setNewProduct({
                            name: "",
                            category: "",
                            price: "",
                            stock: "",
                            unit: "kg",
                            status: "active",
                          })
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        {editingProduct ? "Update" : "Add"} Product
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Card className="border-0 shadow-xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        ₹{product.price}/{product.unit}
                      </TableCell>
                      <TableCell>
                        {product.stock} {product.unit}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(product.status)}>{product.status.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => alert(`Viewing details for ${product.name}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              handleEditProduct(product)
                              setShowAddProduct(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">Recent Orders</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => alert("Filter functionality coming soon!")}>
                  Filter
                </Button>
                <Button variant="outline" size="sm" onClick={() => alert("Export functionality coming soon!")}>
                  Export
                </Button>
              </div>
            </div>

            <Card className="border-0 shadow-xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.vendor}</TableCell>
                      <TableCell className="max-w-xs truncate">{order.items}</TableCell>
                      <TableCell>₹{order.amount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Order Details - {order.id}</DialogTitle>
                                <DialogDescription>Complete order information</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <strong>Vendor:</strong> {order.vendor}
                                </div>
                                <div>
                                  <strong>Items:</strong> {order.items}
                                </div>
                                <div>
                                  <strong>Amount:</strong> ₹{order.amount}
                                </div>
                                <div>
                                  <strong>Status:</strong>{" "}
                                  <Badge className={getStatusColor(order.status)}>
                                    {order.status.replace("_", " ")}
                                  </Badge>
                                </div>
                                <div>
                                  <strong>Date:</strong> {order.date}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {order.status === "pending" && (
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600"
                              onClick={() => handleAcceptOrder(order.id)}
                            >
                              Accept
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Most popular items this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product, idx) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-600">{product.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{(product.price * 50).toLocaleString()}</div>
                          <div className="text-sm text-gray-600">50 orders</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Vendor Insights</CardTitle>
                  <CardDescription>Your top customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Rajesh Kumar</div>
                        <div className="text-sm text-gray-600">Regular Customer</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹12,500</div>
                        <div className="text-sm text-gray-600">15 orders</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Priya Sharma</div>
                        <div className="text-sm text-gray-600">New Customer</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹8,200</div>
                        <div className="text-sm text-gray-600">8 orders</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Amit Singh</div>
                        <div className="text-sm text-gray-600">VIP Customer</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">₹15,800</div>
                        <div className="text-sm text-gray-600">22 orders</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

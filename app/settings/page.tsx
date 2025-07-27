"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bell, Shield, Globe, LogOut, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: true,
      push: false,
      orderUpdates: true,
      priceAlerts: true,
      groupOrders: true,
    },
    privacy: {
      profileVisible: true,
      showLocation: true,
      allowMessages: true,
    },
    preferences: {
      darkMode: false,
      language: "en",
      currency: "INR",
    },
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

    // Load saved settings
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const updateSetting = (category: string, key: string, value: any) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [key]: value,
      },
    }
    setSettings(newSettings)
    localStorage.setItem("userSettings", JSON.stringify(newSettings))
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser")
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("userSettings")
      localStorage.removeItem("rememberVendor")
      localStorage.removeItem("rememberSupplier")
      alert("You have been logged out successfully.")
      window.location.href = "/"
    }
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.removeItem("currentUser")
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("userSettings")
      localStorage.removeItem("rememberVendor")
      localStorage.removeItem("rememberSupplier")
      alert("Account deleted successfully.")
      window.location.href = "/"
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    )
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
          <Link href={currentUser.userType === "vendor" ? "/vendor" : "/supplier"}>
            <Button variant="ghost" className="font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">Manage your account preferences and privacy settings</p>
        </div>

        <div className="grid gap-8 max-w-4xl">
          {/* Notifications */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
              <CardDescription>Choose how you want to be notified about updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-slate-600">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => updateSetting("notifications", "email", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-slate-600">Receive notifications via SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={settings.notifications.sms}
                  onCheckedChange={(checked) => updateSetting("notifications", "sms", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-slate-600">Receive push notifications on your device</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => updateSetting("notifications", "push", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="order-updates">Order Updates</Label>
                  <p className="text-sm text-slate-600">Get notified about order status changes</p>
                </div>
                <Switch
                  id="order-updates"
                  checked={settings.notifications.orderUpdates}
                  onCheckedChange={(checked) => updateSetting("notifications", "orderUpdates", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="price-alerts">Price Alerts</Label>
                  <p className="text-sm text-slate-600">Get notified about price changes and deals</p>
                </div>
                <Switch
                  id="price-alerts"
                  checked={settings.notifications.priceAlerts}
                  onCheckedChange={(checked) => updateSetting("notifications", "priceAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="group-orders">Group Order Notifications</Label>
                  <p className="text-sm text-slate-600">Get notified about group buying opportunities</p>
                </div>
                <Switch
                  id="group-orders"
                  checked={settings.notifications.groupOrders}
                  onCheckedChange={(checked) => updateSetting("notifications", "groupOrders", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Control your privacy and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profile-visible">Profile Visibility</Label>
                  <p className="text-sm text-slate-600">Make your profile visible to other users</p>
                </div>
                <Switch
                  id="profile-visible"
                  checked={settings.privacy.profileVisible}
                  onCheckedChange={(checked) => updateSetting("privacy", "profileVisible", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-location">Show Location</Label>
                  <p className="text-sm text-slate-600">Allow others to see your approximate location</p>
                </div>
                <Switch
                  id="show-location"
                  checked={settings.privacy.showLocation}
                  onCheckedChange={(checked) => updateSetting("privacy", "showLocation", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allow-messages">Allow Messages</Label>
                  <p className="text-sm text-slate-600">Allow other users to send you messages</p>
                </div>
                <Switch
                  id="allow-messages"
                  checked={settings.privacy.allowMessages}
                  onCheckedChange={(checked) => updateSetting("privacy", "allowMessages", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Preferences
              </CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-slate-600">Use dark theme for the interface</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={settings.preferences.darkMode}
                  onCheckedChange={(checked) => updateSetting("preferences", "darkMode", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-red-600">Account Actions</CardTitle>
              <CardDescription>Manage your account and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <h4 className="font-medium text-red-900">Logout</h4>
                  <p className="text-sm text-red-700">Sign out of your account</p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <h4 className="font-medium text-red-900">Delete Account</h4>
                  <p className="text-sm text-red-700">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

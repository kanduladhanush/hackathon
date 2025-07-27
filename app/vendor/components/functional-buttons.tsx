"use client"

import { Button } from "@/components/ui/button"
import { Star, Filter, Truck, ShoppingCart } from "lucide-react"

export const FunctionalButtons = {
  FilterButton: ({ onClick }: { onClick?: () => void }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick || (() => alert("Filter options: Category, Price Range, Distance, Rating"))}
    >
      <Filter className="w-4 h-4 mr-2" />
      Filters
    </Button>
  ),

  TrackOrderButton: ({ orderId }: { orderId: string }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        alert(
          `Tracking Order ${orderId}:\n• Order Confirmed\n• Being Prepared\n• Out for Delivery\n• Estimated Time: 30 mins`,
        )
      }
    >
      <Truck className="w-4 h-4 mr-2" />
      Track Order
    </Button>
  ),

  RateOrderButton: ({ orderId }: { orderId: string }) => (
    <Button
      size="sm"
      className="bg-orange-500 hover:bg-orange-600"
      onClick={() => {
        const rating = prompt("Rate this order (1-5 stars):")
        if (rating && Number.parseInt(rating) >= 1 && Number.parseInt(rating) <= 5) {
          alert(`Thank you for rating order ${orderId} with ${rating} stars!`)
        }
      }}
    >
      <Star className="w-4 h-4 mr-2" />
      Rate Order
    </Button>
  ),

  ViewDetailsButton: ({ supplier }: { supplier: any }) => (
    <Button
      variant="outline"
      onClick={() =>
        alert(
          `Viewing details for ${supplier.name}\nRating: ${supplier.rating}\nDistance: ${supplier.distance}\nDelivery: ${supplier.deliveryTime}`,
        )
      }
      className="bg-transparent hover:bg-orange-50 hover:border-orange-500"
    >
      View Details
    </Button>
  ),

  BrowseSuppliersButton: () => (
    <Button
      className="bg-orange-500 hover:bg-orange-600 px-8 py-3 text-lg"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      Browse Suppliers
    </Button>
  ),
}

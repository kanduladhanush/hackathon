interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(
      () => {
        this.cleanup()
      },
      5 * 60 * 1000,
    )
  }

  isRateLimited(key: string, windowMs: number, maxRequests = 1): boolean {
    const now = Date.now()
    const entry = this.requests.get(key)

    if (!entry) {
      // First request for this key
      this.requests.set(key, {
        count: 1,
        resetTime: now + windowMs,
      })
      return false
    }

    if (now > entry.resetTime) {
      // Window has expired, reset
      this.requests.set(key, {
        count: 1,
        resetTime: now + windowMs,
      })
      return false
    }

    if (entry.count >= maxRequests) {
      // Rate limit exceeded
      return true
    }

    // Increment count
    entry.count++
    return false
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key)
      }
    }
  }

  // Get remaining time until rate limit resets
  getRemainingTime(key: string): number {
    const entry = this.requests.get(key)
    if (!entry) return 0

    const now = Date.now()
    return Math.max(0, entry.resetTime - now)
  }

  // Clear rate limit for a specific key (useful for testing)
  clearRateLimit(key: string): void {
    this.requests.delete(key)
  }

  // Get current request count for a key
  getRequestCount(key: string): number {
    const entry = this.requests.get(key)
    return entry ? entry.count : 0
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
    this.requests.clear()
  }
}

export const rateLimiter = new RateLimiter()

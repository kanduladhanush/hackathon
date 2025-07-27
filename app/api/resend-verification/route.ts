import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"
import { rateLimiter } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, verificationCode, userType } = body

    console.log("🔄 Email verification resend request received:", { email, name, userType })

    // Validate required fields
    if (!email || !name || !verificationCode || !userType) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Validate user type
    if (!["vendor", "supplier"].includes(userType)) {
      return NextResponse.json({ success: false, message: "Invalid user type" }, { status: 400 })
    }

    // Rate limiting check for resend (more restrictive)
    const rateLimitKey = `resend_${email}`
    if (rateLimiter.isRateLimited(rateLimitKey, 60000)) {
      // 1 minute for resend
      return NextResponse.json(
        { success: false, message: "Please wait 1 minute before requesting another verification email" },
        { status: 429 },
      )
    }

    console.log("📤 Attempting to resend verification email...")

    // Resend verification email
    const result = await emailService.resendVerificationEmail({
      email,
      name,
      verificationCode,
      userType,
    })

    if (result.success) {
      console.log(`✅ Verification email resent successfully to ${email} via ${result.method}`)
      console.log(`🔐 New verification code: ${verificationCode}`)

      return NextResponse.json({
        success: true,
        message: result.message,
        messageId: result.messageId,
        method: result.method,
        // Include code in response for development
        debugCode: process.env.NODE_ENV === "development" ? verificationCode : undefined,
      })
    } else {
      console.error(`❌ Failed to resend email to ${email}:`, result.message)
      return NextResponse.json({ success: false, message: result.message }, { status: 500 })
    }
  } catch (error) {
    console.error("💥 Resend API Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: errorMessage,
      },
      { status: 500 },
    )
  }
}

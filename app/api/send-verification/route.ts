import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"
import { rateLimiter } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, verificationCode, userType } = body

    console.log("📧 Email verification request received:", {
      email,
      name,
      userType,
      codeLength: verificationCode?.length,
    })

    // Validate required fields
    if (!email || !name || !verificationCode || !userType) {
      console.error("❌ Missing required fields:", {
        email: !!email,
        name: !!name,
        verificationCode: !!verificationCode,
        userType: !!userType,
      })
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error("❌ Invalid email format:", email)
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Validate user type
    if (!["vendor", "supplier"].includes(userType)) {
      console.error("❌ Invalid user type:", userType)
      return NextResponse.json({ success: false, message: "Invalid user type" }, { status: 400 })
    }

    // Validate verification code format
    if (!/^\d{6}$/.test(verificationCode)) {
      console.error("❌ Invalid verification code format:", verificationCode)
      return NextResponse.json({ success: false, message: "Verification code must be 6 digits" }, { status: 400 })
    }

    // Rate limiting check
    const rateLimitKey = `send_${email}`
    if (rateLimiter.isRateLimited(rateLimitKey, 30000)) {
      console.warn("⚠️ Rate limit exceeded for:", email)
      return NextResponse.json(
        { success: false, message: "Please wait before requesting another verification email" },
        { status: 429 },
      )
    }

    console.log("📤 Attempting to send verification email...")

    // Send verification email
    const result = await emailService.sendVerificationEmail({
      email,
      name,
      verificationCode,
      userType,
    })

    if (result.success) {
      console.log(`✅ Verification email sent successfully to ${email} via ${result.method}`)
      console.log(`🔐 Verification code: ${verificationCode}`)

      return NextResponse.json({
        success: true,
        message: result.message,
        messageId: result.messageId,
        method: result.method,
        // Include code in response for development (remove in production)
        debugCode: process.env.NODE_ENV === "development" ? verificationCode : undefined,
      })
    } else {
      console.error(`❌ Failed to send email to ${email}:`, result.message)
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Failed to send verification email",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("💥 API Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 },
    )
  }
}

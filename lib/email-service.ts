interface EmailVerificationData {
  email: string
  name: string
  verificationCode: string
  userType: "vendor" | "supplier"
}

interface EmailResponse {
  success: boolean
  message: string
  messageId?: string
  method?: "resend" | "simulation"
}

export class EmailService {
  private static instance: EmailService
  private apiKey: string = process.env.RESEND_API_KEY || ""

  private constructor() {}

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendVerificationEmail(data: EmailVerificationData): Promise<EmailResponse> {
    try {
      const emailTemplate = this.generateVerificationEmailTemplate(data)

      // Check if we have a valid API key and it's not a demo/placeholder key
      const hasValidApiKey =
        this.apiKey &&
        this.apiKey !== "demo-key" &&
        this.apiKey !== "your-resend-api-key" &&
        this.apiKey.startsWith("re_") &&
        this.apiKey.length > 10

      if (hasValidApiKey) {
        try {
          return await this.sendWithResend(data.email, emailTemplate, data.verificationCode)
        } catch (resendError) {
          console.warn("Resend API failed, falling back to simulation:", resendError)
          // Fall back to simulation if Resend fails
          return await this.simulateEmailSending(data.email, emailTemplate, data.verificationCode)
        }
      } else {
        console.log("No valid Resend API key found, using simulation mode")
        return await this.simulateEmailSending(data.email, emailTemplate, data.verificationCode)
      }
    } catch (error) {
      console.error("Email sending failed:", error)
      return {
        success: false,
        message: "Failed to send verification email",
        method: "error",
      }
    }
  }

  private async sendWithResend(email: string, template: any, verificationCode: string): Promise<EmailResponse> {
    try {
      const requestBody = {
        from: "Sanchari <onboarding@resend.dev>", // Use resend.dev domain for testing
        to: [email],
        subject: template.subject,
        html: template.html,
        text: template.text,
      }

      console.log("Sending email via Resend API to:", email)
      console.log("Using API key:", this.apiKey.substring(0, 10) + "...")

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const responseText = await response.text()
      console.log("Resend API response status:", response.status)
      console.log("Resend API response:", responseText)

      if (!response.ok) {
        let errorMessage = "Unknown error"
        try {
          const errorData = JSON.parse(responseText)
          errorMessage = errorData.message || errorData.error || "API request failed"
        } catch {
          errorMessage = responseText || `HTTP ${response.status}`
        }

        throw new Error(`Resend API error: ${response.status} - ${errorMessage}`)
      }

      const result = JSON.parse(responseText)
      return {
        success: true,
        message: "Verification email sent successfully via Resend",
        messageId: result.id,
        method: "resend",
      }
    } catch (error) {
      console.error("Resend API error details:", error)
      throw error
    }
  }

  private async simulateEmailSending(email: string, template: any, verificationCode: string): Promise<EmailResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Log the email content for demo purposes
    console.log("📧 ===== SIMULATED EMAIL SENT =====")
    console.log("📧 TO:", email)
    console.log("🔐 VERIFICATION CODE:", verificationCode)
    console.log("📄 SUBJECT:", template.subject)
    console.log("📧 ===================================")

    // Display in browser console for easy access during development
    if (typeof window !== "undefined") {
      console.log(`%c📧 VERIFICATION EMAIL FOR ${email}`, "color: #f97316; font-size: 16px; font-weight: bold")
      console.log(
        `%c🔐 Your verification code is: ${verificationCode}`,
        "color: #059669; font-size: 14px; font-weight: bold",
      )
      console.log(
        `%cCopy this code: ${verificationCode}`,
        "background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-weight: bold",
      )
    }

    return {
      success: true,
      message: "Verification email sent successfully (simulated - check console for code)",
      messageId: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      method: "simulation",
    }
  }

  private generateVerificationEmailTemplate(data: EmailVerificationData): {
    html: string
    text: string
    subject: string
    verificationCode: string
  } {
    const { name, verificationCode, userType, email } = data

    const subject = `Verify your Sanchari ${userType} account - Code: ${verificationCode}`

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - Sanchari</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #f97316, #ea580c);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 16px;
          }
          .title {
            color: #1e293b;
            font-size: 24px;
            font-weight: bold;
            margin: 0;
          }
          .subtitle {
            color: #64748b;
            font-size: 16px;
            margin: 8px 0 0 0;
          }
          .verification-code {
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: white;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
          }
          .code {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            margin-bottom: 8px;
          }
          .code-label {
            font-size: 14px;
            opacity: 0.9;
          }
          .instructions {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
          }
          .instructions h3 {
            color: #92400e;
            margin: 0 0 12px 0;
            font-size: 16px;
          }
          .instructions ol {
            color: #a16207;
            margin: 0;
            padding-left: 20px;
          }
          .instructions li {
            margin-bottom: 4px;
          }
          .security-note {
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
          }
          .security-note h4 {
            color: #0369a1;
            margin: 0 0 8px 0;
            font-size: 14px;
          }
          .security-note p {
            color: #0284c7;
            margin: 0;
            font-size: 13px;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
          }
          .highlight {
            background: #fef2f2;
            border: 2px solid #fecaca;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
            text-align: center;
          }
          .highlight .big-code {
            font-size: 28px;
            font-weight: bold;
            color: #dc2626;
            font-family: 'Courier New', monospace;
            letter-spacing: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">S</div>
            <h1 class="title">Welcome to Sanchari!</h1>
            <p class="subtitle">Verify your email to complete your ${userType} registration</p>
          </div>
          
          <p>Hi <strong>${name}</strong>,</p>
          
          <p>Thank you for joining Sanchari as a ${userType}! To complete your registration and secure your account, please verify your email address using the code below:</p>
          
          <div class="verification-code">
            <div class="code">${verificationCode}</div>
            <div class="code-label">Your 6-digit verification code</div>
          </div>
          
          <div class="highlight">
            <p><strong>Quick Copy:</strong></p>
            <div class="big-code">${verificationCode}</div>
          </div>
          
          <div class="instructions">
            <h3>📱 How to verify your account:</h3>
            <ol>
              <li>Return to the Sanchari registration page in your browser</li>
              <li>Enter the 6-digit code: <strong>${verificationCode}</strong></li>
              <li>Click "Verify Email" to activate your account</li>
            </ol>
          </div>
          
          <div class="security-note">
            <h4>🔒 Security Notice</h4>
            <p>This verification code will expire in 15 minutes for your security. If you didn't request this verification, please ignore this email. Never share this code with anyone.</p>
          </div>
          
          <p>Once verified, you'll have access to:</p>
          <ul>
            <li>🏪 Your personalized ${userType} dashboard</li>
            <li>💬 Real-time chat with ${userType === "vendor" ? "suppliers" : "vendors"}</li>
            <li>📦 Group ordering system</li>
            <li>🎯 AI-powered recommendations</li>
            <li>📍 GPS location services</li>
          </ul>
          
          <p>Need help? Our support team is here to assist you at <a href="mailto:support@sanchari.com" style="color: #f97316;">support@sanchari.com</a></p>
          
          <div class="footer">
            <p><strong>Sanchari Marketplace</strong><br>
            Connecting vendors and suppliers across India<br>
            <a href="https://sanchari.com" style="color: #f97316;">www.sanchari.com</a></p>
            
            <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
              This email was sent to ${email}. If you didn't create an account with Sanchari, you can safely ignore this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
      Welcome to Sanchari!
      
      Hi ${name},
      
      Thank you for joining Sanchari as a ${userType}! To complete your registration, please verify your email address using this code:
      
      Verification Code: ${verificationCode}
      
      How to verify:
      1. Return to the Sanchari registration page
      2. Enter the 6-digit code: ${verificationCode}
      3. Click "Verify Email" to activate your account
      
      This code will expire in 15 minutes for your security.
      
      Need help? Contact us at support@sanchari.com
      
      Best regards,
      The Sanchari Team
    `

    return { html, text, subject, verificationCode }
  }

  async resendVerificationEmail(data: EmailVerificationData): Promise<EmailResponse> {
    // Add a small delay to prevent spam
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return this.sendVerificationEmail(data)
  }
}

export const emailService = EmailService.getInstance()

import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, phone, location, avatar } = await request.json()

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Validate avatar for sellers
    if (role === UserRole.SELLER && !avatar) {
      return NextResponse.json(
        { error: 'Profile picture is required for sellers' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with avatar and auto-verify email
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || UserRole.BUYER,
        phone,
        location,
        avatar: avatar || null,
        emailVerified: new Date(), // Auto-verify for immediate login
        isActive: true
      }
    })

    // Create seller profile if role is SELLER
    if (role === UserRole.SELLER) {
      await prisma.sellerProfile.create({
        data: {
          userId: user.id,
          verificationStatus: 'PENDING'
        }
      })
    }

    // Send registration confirmation email
    try {
      const appUrl = process.env.NEXTAUTH_URL || 'https://eburutumart.com'
      const appName = 'Eburutu Mart'
      
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
          <div style="background: linear-gradient(135deg, #16a34a 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Eburutu Mart! 🎉</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Hello <strong>${name}</strong>,</p>
            <p style="color: #555; line-height: 1.6;">
              Thank you for joining the Eburutu Mart community! Your account has been successfully created.
            </p>
            <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #166534;"><strong>Account Details:</strong></p>
              <p style="margin: 10px 0 0 0; color: #555;">Email: ${email}</p>
              <p style="margin: 5px 0 0 0; color: #555;">Account Type: ${role === 'SELLER' ? 'Seller' : 'Buyer'}</p>
            </div>
            ${role === 'SELLER' ? `
            <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #92400e;"><strong>Seller Account:</strong></p>
              <p style="margin: 10px 0 0 0; color: #555;">You can start listing products immediately. Complete your business verification for enhanced features.</p>
            </div>
            ` : ''}
            <div style="text-align: center; margin: 30px 0;">
              <a href="${appUrl}/auth/login" style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #059669 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Log In to Your Account</a>
            </div>
            <p style="color: #555; line-height: 1.6;">
              Explore authentic African products, connect with sellers, and celebrate African culture worldwide.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
            <p style="color: #888; font-size: 12px; text-align: center;">
              If you didn't create this account, please ignore this email or contact us at info@eburutumart.com
            </p>
          </div>
        </div>
      `

   const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({
  from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  to: email,
  subject: `Welcome to Eburutu Mart, ${name}! 🎉`,
  html: htmlBody,
})
    } catch (emailError) {
      // Log error but don't fail registration if email fails
      console.error('Failed to send registration email:', emailError)
    }

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

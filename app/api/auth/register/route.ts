import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, phone, location, avatar } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (role === UserRole.SELLER && !avatar) {
      return NextResponse.json(
        { error: 'Profile picture is required for sellers' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user WITHOUT emailVerified — must verify before logging in
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || UserRole.BUYER,
        phone,
        location,
        avatar: avatar || null,
        emailVerified: null,
        isActive: false,
      }
    })

    if (role === UserRole.SELLER) {
      await prisma.sellerProfile.create({
        data: {
          userId: user.id,
          verificationStatus: 'PENDING'
        }
      })
    }

    // Generate verification token (valid 24 hours)
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await prisma.verificationToken.create({
      data: { identifier: email, token, expires }
    })

    // Send verification email
    try {
      const appUrl = process.env.NEXTAUTH_URL || 'https://eburutumart.com'
      const verificationUrl = `${appUrl}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
          <div style="background: linear-gradient(135deg, #16a34a 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email ✉️</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Hello <strong>${name}</strong>,</p>
            <p style="color: #555; line-height: 1.6;">
              Thank you for joining Eburutu Mart! Please verify your email address to activate your account.
            </p>
            <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #166534;"><strong>Account Details:</strong></p>
              <p style="margin: 10px 0 0; color: #555;">Email: ${email}</p>
              <p style="margin: 5px 0 0; color: #555;">Account Type: ${role === 'SELLER' ? 'Seller' : 'Buyer'}</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #059669 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Verify My Email Address
              </a>
            </div>
            <p style="color: #555; line-height: 1.6; font-size: 14px;">
              This link expires in <strong>24 hours</strong>. If you did not create this account, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
            <p style="color: #888; font-size: 12px; text-align: center;">
              If the button does not work, copy and paste this link into your browser:<br>
              <span style="color: #059669; word-break: break-all;">${verificationUrl}</span>
            </p>
          </div>
        </div>
      `

      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: email,
        subject: 'Verify your Eburutu Mart email address',
        html: htmlBody,
      })
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // Registration still succeeds — user can request resend
    }

    return NextResponse.json(
      { message: 'Account created. Please check your email to verify your account.', userId: user.id },
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

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Resend } from 'resend'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      // Don't reveal whether user exists
      return NextResponse.json({ message: 'If an account exists, a verification email has been sent.' })
    }

    if (user.emailVerified) {
      return NextResponse.json({ error: 'Email is already verified' }, { status: 400 })
    }

    // Delete existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email }
    })

    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await prisma.verificationToken.create({
      data: { identifier: email, token, expires }
    })

    const appUrl = process.env.NEXTAUTH_URL || 'https://eburutumart.com'
    const verificationUrl = `${appUrl}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
        <div style="background: linear-gradient(135deg, #16a34a 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">New Verification Link ✉️</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Hello <strong>${user.name}</strong>,</p>
          <p style="color: #555; line-height: 1.6;">Here is your new verification link. It expires in 24 hours.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #059669 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Verify My Email Address
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
          <p style="color: #888; font-size: 12px; text-align: center;">
            If the button does not work:<br>
            <span style="color: #059669; word-break: break-all;">${verificationUrl}</span>
          </p>
        </div>
      </div>
    `

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'New verification link — Eburutu Mart',
      html: htmlBody,
    })

    return NextResponse.json({ message: 'Verification email sent successfully.' })
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 })
  }
}

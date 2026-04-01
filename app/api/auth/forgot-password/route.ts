import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Resend } from 'resend'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: { email: email.toLowerCase().trim() }
    })

    if (!user) {
      return NextResponse.json({ message: 'If account exists, reset link sent' })
    }

    const token = crypto.randomBytes(32).toString('hex')

    // Use raw SQL to bypass Prisma type restrictions
    await prisma.$executeRaw`
      UPDATE users 
      SET recovery_token = ${token}, recovery_sent_at = NOW()
      WHERE id = ${user.id}
    `

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`

    await resend.emails.send({
      from: 'Eburutu Mart <onboarding@resend.dev>',
      to: email,
      subject: 'Reset your Eburutu Mart password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #16a34a; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Reset Your Password</h1>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb;">
            <p style="font-size: 16px; color: #374151;">Hello ${user.name || 'there'},</p>
            <p style="color: #6b7280;">We received a request to reset your password for your Eburutu Mart account.</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="background: #16a34a; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                Reset Password
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">Or copy this link: ${resetUrl}</p>
          </div>
          <div style="background: #f9fafb; padding: 16px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2025 Eburutu Mart. Connecting the African diaspora.</p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ message: 'Reset link sent successfully' })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

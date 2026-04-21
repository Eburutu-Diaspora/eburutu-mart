import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    // Notify admin of new subscriber
    await transporter.sendMail({
      from: `"EburutuMart" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New Newsletter Subscriber: ${email}`,
      html: `<p>New newsletter signup: <strong>${email}</strong></p>`,
    })

    // Send welcome email to subscriber
    await transporter.sendMail({
      from: `"EburutuMart" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Welcome to the EburutuMart Newsletter!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #16a34a, #059669); padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">Welcome to EburutuMart!</h2>
          </div>
          <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll be the first to hear about new products, community news, and updates from the African diaspora marketplace.</p>
            <p style="color: #6b7280; font-size: 12px;">The EburutuMart Team · Connect | Shop | Celebrate</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

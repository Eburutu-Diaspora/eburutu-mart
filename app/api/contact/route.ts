
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
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
    const session = await getServerSession(authOptions)
    const { name, email, subject, message, type } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Save to database
    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        subject,
        message,
       type: ['GENERAL', 'SELLER_INQUIRY', 'TECHNICAL_SUPPORT', 'REPORT_ISSUE'].includes(type) ? type : 'GENERAL',
        userId: session?.user?.id || null
      }
    })

    // Send email notification to admin
    await transporter.sendMail({
      from: `"EburutuMart Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #16a34a, #059669); padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Type:</strong> ${type || 'GENERAL'}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb;">${message}</p>
            <p style="color: #6b7280; font-size: 12px; margin-top: 16px;">Submitted via EburutuMart contact form</p>
          </div>
        </div>
      `,
    })

    // Send confirmation to the person who contacted
    await transporter.sendMail({
      from: `"EburutuMart" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We received your message — EburutuMart`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #16a34a, #059669); padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">Thank you, ${name}!</h2>
          </div>
          <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p><strong>Your message:</strong></p>
            <p style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb;">${message}</p>
            <p style="color: #6b7280; font-size: 12px;">The EburutuMart Team</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Message sent successfully', id: contactForm.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

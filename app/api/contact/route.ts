
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { name, email, subject, message, type } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create contact form entry
    const contactForm = await prisma.contactForm.create({
      data: {
        name,
        email,
        subject,
        message,
        type: type || 'GENERAL',
        userId: session?.user?.id || null
      }
    })

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: contactForm.id },
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

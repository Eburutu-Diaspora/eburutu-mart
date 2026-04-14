
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, type } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Log to Hostinger runtime logs — visible in your Hostinger dashboard
    console.log('=== CONTACT FORM SUBMISSION ===')
    console.log(`From: ${name} <${email}>`)
    console.log(`Type: ${type || 'General'}`)
    console.log(`Subject: ${subject}`)
    console.log(`Message: ${message}`)
    console.log('================================')

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
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

import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    // Logged to Hostinger runtime logs until email provider is connected
    console.log(`=== NEWSLETTER SIGNUP: ${email} ===`)

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

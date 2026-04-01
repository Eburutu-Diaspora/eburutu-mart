import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set')
    return NextResponse.json(
      { message: 'Chat is temporarily unavailable. Please contact support.' },
      { status: 200 }
    )
  }

  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
    }

    const recentMessages = messages.slice(-10)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `You are a friendly and knowledgeable assistant for Eburutu Mart, a free African diaspora marketplace connecting buyers and sellers directly with no payment processing.

Your role:
- Help buyers find products and navigate the site
- Guide sellers on how to list products and manage their shop
- Answer questions about categories, registration, and how the marketplace works
- Provide warm, culturally aware responses that reflect African diaspora values

Key facts about Eburutu Mart:
- Free to use for both buyers and sellers
- No payment processing — buyers and sellers connect directly
- Categories include food, beauty, fashion, crafts, and more
- Sellers need to register and create a profile before listing
- Available in GBP currency

Keep responses concise (2-4 sentences max). Be warm, helpful, and professional.
If you don't know something specific about the site, say so honestly and suggest they contact support.`,
        messages: recentMessages,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Anthropic API error:', errorData)
      return NextResponse.json(
        { message: "I'm having trouble right now. Please try again in a moment." },
        { status: 200 }
      )
    }

    const data = await response.json()
    const text = data.content?.[0]?.text ?? "I'm not sure how to respond to that. Can you rephrase?"

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { message: 'Something went wrong on my end. Please try again.' },
      { status: 200 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `You are a helpful assistant for Eburutu Mart, a free African diaspora marketplace where buyers and sellers connect directly. Help users with: finding products, understanding how to list items, navigating the site, and general marketplace questions. Keep responses concise and friendly.`,
        messages,
      }),
    })

    const data = await response.json()
    const text = data.content?.[0]?.text ?? 'Sorry, I could not get a response.'

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}

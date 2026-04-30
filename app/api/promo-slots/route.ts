import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
  try {
    const slots = await prisma.promoSlot.findMany({
      orderBy: { slotKey: 'asc' },
    })
    return NextResponse.json(slots)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const body = await req.json()
    const { slotKey, imageUrl, redirectUrl, altText, isActive } = body

    if (!slotKey) {
      return NextResponse.json({ error: 'slotKey is required' }, { status: 400 })
    }

    const slot = await prisma.promoSlot.upsert({
      where: { slotKey },
      update: {
        ...(imageUrl   !== undefined && { imageUrl }),
        ...(redirectUrl !== undefined && { redirectUrl }),
        ...(altText    !== undefined && { altText }),
        ...(isActive   !== undefined && { isActive }),
        updatedAt: new Date(),
      },
      create: {
        slotKey,
        imageUrl:    imageUrl    ?? null,
        redirectUrl: redirectUrl ?? null,
        altText:     altText     ?? 'Promotional content',
        isActive:    isActive    ?? false,
      },
    })

    return NextResponse.json(slot)
  } catch (err) {
    console.error('[promo-slots PATCH]', err)
    return NextResponse.json({ error: 'Failed to update slot' }, { status: 500 })
  }
}

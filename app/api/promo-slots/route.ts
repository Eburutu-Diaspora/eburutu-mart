
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    if (key) {
      const slot = await prisma.promoSlot.findUnique({ where: { slotKey: key } })
      return NextResponse.json(slot)
    }
    const slots = await prisma.promoSlot.findMany({ orderBy: { createdAt: 'asc' } })
    return NextResponse.json(slots)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const slot = await prisma.promoSlot.upsert({
      where: { slotKey: body.slotKey },
      update: {
        imageUrl: body.imageUrl,
        redirectUrl: body.redirectUrl,
        altText: body.altText,
        isActive: body.isActive,
      },
      create: {
        slotKey: body.slotKey,
        imageUrl: body.imageUrl,
        redirectUrl: body.redirectUrl,
        altText: body.altText ?? 'Promotional content',
        isActive: body.isActive ?? false,
      },
    })
    return NextResponse.json(slot, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    await prisma.promoSlot.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}

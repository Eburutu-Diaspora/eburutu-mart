
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const slots = await prisma.promoSlot.findMany({
      where: { isActive: true },
      orderBy: { position: 'asc' },
    })
    return NextResponse.json(slots)
  } catch (error) {
    console.error('Error fetching promo slots:', error)
    return NextResponse.json({ error: 'Failed to fetch promo slots' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const slot = await prisma.promoSlot.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        linkUrl: body.linkUrl,
        position: body.position,
        isActive: body.isActive ?? true,
        advertiserName: body.advertiserName,
        advertiserEmail: body.advertiserEmail,
      },
    })
    return NextResponse.json(slot, { status: 201 })
  } catch (error) {
    console.error('Error creating promo slot:', error)
    return NextResponse.json({ error: 'Failed to create promo slot' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    const slot = await prisma.promoSlot.update({
      where: { id },
      data,
    })
    return NextResponse.json(slot)
  } catch (error) {
    console.error('Error updating promo slot:', error)
    return NextResponse.json({ error: 'Failed to update promo slot' }, { status: 500 })
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
    console.error('Error deleting promo slot:', error)
    return NextResponse.json({ error: 'Failed to delete promo slot' }, { status: 500 })
  }
}

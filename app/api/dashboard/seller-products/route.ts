import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const session = await getAuthSession()

    if (!session?.user || session.user.role !== 'SELLER') {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const products = await prisma.product.findMany({
      where: { sellerId: session.user.id },
      include: {
        images: { take: 1 },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Seller products error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const products = await prisma.product.findMany({
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          select: {
            name: true
          }
        },
        images: {
          select: {
            imageUrl: true
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform products to include images array and status
    const transformedProducts = products.map(p => ({
      id: p.id,
      title: p.title,
      price: Number(p.price),
      currency: p.currency,
      status: p.isActive ? 'ACTIVE' : 'PENDING',
      images: p.images.map(img => img.imageUrl),
      createdAt: p.createdAt,
      seller: p.seller,
      category: p.category
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

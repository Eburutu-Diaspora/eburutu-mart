import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        images: true,
        category: true,
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            sellerProfile: {
              select: {
                verificationStatus: true,
                businessName: true,
              },
            },
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    prisma.product.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } },
    }).catch(() => {})

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

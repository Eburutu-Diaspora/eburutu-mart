
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category  = searchParams.get('category')  || undefined
    const search    = searchParams.get('search')    || undefined
    const location  = searchParams.get('location')  || undefined
    const minPrice  = searchParams.get('minPrice')  || undefined
    const maxPrice  = searchParams.get('maxPrice')  || undefined
    const page      = parseInt(searchParams.get('page')  || '1')
    const limit     = parseInt(searchParams.get('limit') || '12')

    const where: any = {}

    if (category) {
      where.category = { slug: category }
    }

    if (search) {
      where.OR = [
        { name:        { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (location) {
      where.seller = {
        location: { contains: location, mode: 'insensitive' }
      }
    }

    if (minPrice) {
      where.price = { ...where.price, gte: parseFloat(minPrice) }
    }

    if (maxPrice) {
      where.price = { ...where.price, lte: parseFloat(maxPrice) }
    }

    const [rawProducts, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
         seller: true,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    // Flatten images to a plain string array so every component
    // can safely do product.images[0] and get a URL string
    const products = rawProducts.map((p) => ({
      ...p,
      images: p.images.map((img: any) =>
        typeof img === 'string' ? img : img.url ?? img.imageUrl ?? ''
      ),
    }))

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({
      products: [],
      total: 0,
      page: 1,
      totalPages: 0,
    })
  }
}

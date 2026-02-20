
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const location = searchParams.get('location')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const verified = searchParams.get('verified')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = (page - 1) * limit

    const where: any = {
      isActive: true
    }

    if (category) {
      where.category = {
        slug: category
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' }
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (verified === 'true') {
      where.seller = {
        sellerProfile: {
          verificationStatus: 'VERIFIED'
        }
      }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          seller: {
            include: {
              sellerProfile: true
            }
          },
          category: true,
          images: {
            orderBy: { sortOrder: 'asc' }
          },
          _count: {
            select: { conversations: true }
          }
        },
        orderBy: [
          { isPromoted: 'desc' },
          { createdAt: 'desc' }
        ],
        skip: offset,
        take: limit
      }),
      prisma.product.count({ where })
    ])

    const formattedProducts = products.map(product => ({
      ...product,
      price: Number(product.price),
      conversationCount: product._count?.conversations || 0
    }))

    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is a verified seller
    const sellerProfile = await prisma.sellerProfile.findUnique({
      where: { userId: session.user.id }
    })

    // Allow sellers with pending or verified status to create products
    if (!sellerProfile) {
      return NextResponse.json(
        { error: 'Seller profile required to create products' },
        { status: 403 }
      )
    }

    const data = await request.json()
    const {
      title,
      description,
      price,
      currency = 'GBP',
      condition,
      location,
      categoryId,
      brand,
      model,
      color,
      size,
      weight,
      dimensions,
      images = []
    } = data

    // Process images - can be base64 strings or {url, alt} objects
    const imageData = images.map((image: string | { url: string; alt?: string }, index: number) => {
      if (typeof image === 'string') {
        // Base64 image - store directly as data URL
        return {
          imageUrl: image,
          alt: title,
          sortOrder: index
        }
      } else {
        // Already formatted {url, alt} object
        return {
          imageUrl: image.url,
          alt: image.alt || title,
          sortOrder: index
        }
      }
    })

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        currency,
        condition,
        location,
        sellerId: session.user.id,
        categoryId,
        brand,
        model,
        color,
        size,
        weight,
        dimensions,
        images: {
          create: imageData
        }
      },
      include: {
        seller: true,
        category: true,
        images: true
      }
    })

    const formattedProduct = {
      ...product,
      price: Number(product.price)
    }

    return NextResponse.json(formattedProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

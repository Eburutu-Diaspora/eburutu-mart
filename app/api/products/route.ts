
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ─── GET: fetch products (public) ───────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const search = searchParams.get('search') || undefined
    const location = searchParams.get('location') || undefined
    const minPrice = searchParams.get('minPrice') || undefined
    const maxPrice = searchParams.get('maxPrice') || undefined
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const where: any = {}
    if (category) {
      where.category = { slug: category }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' }
    }

    if (minPrice) {
      where.price = { ...where.price, gte: parseFloat(minPrice) }
    }

    if (maxPrice) {
      where.price = { ...where.price, lte: parseFloat(maxPrice) }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          seller: true,
          images: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    // Flatten images for compatibility
    const flatProducts = products.map((p) => ({
      ...p,
      images: p.images.map((img: any) => img.imageUrl),
    }))

    return NextResponse.json({
      products: flatProducts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ products: [], total: 0, page: 1, totalPages: 0 })
  }
}

// ─── POST: create product (sellers only) ────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    if (session.user.role !== 'SELLER') {
      return NextResponse.json({ error: 'Only sellers can list products' }, { status: 403 })
    }

    const body = await request.json()
    const { title, description, price, categoryId, condition, location, brand, color, size, images } = body

    if (!title || !description || !price || !categoryId || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Upload images to Supabase Storage
    const imageUrls: string[] = []

    for (let i = 0; i < (images || []).length; i++) {
      const base64 = images[i]
      const matches = base64.match(/^data:(.+);base64,(.+)$/)
      if (!matches) continue

      const mimeType = matches[1]
      const data = matches[2]
      const buffer = Buffer.from(data, 'base64')
      const ext = mimeType.split('/')[1] || 'jpg'
      const filename = `products/${session.user.id}/${Date.now()}-${i}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filename, buffer, { contentType: mimeType, upsert: true })

      if (uploadError) {
        console.error('Image upload error:', uploadError)
        continue
      }

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filename)
      imageUrls.push(urlData.publicUrl)
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        categoryId,
        condition,
        location,
        brand: brand || null,
        color: color || null,
        size: size || null,
        sellerId: session.user.id,
       
        images: {
          create: imageUrls.map((url) => ({ imageUrl: url })),
        },
      },
      include: { images: true },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

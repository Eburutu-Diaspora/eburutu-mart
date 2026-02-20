
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const product = await prisma.product.findUnique({
      where: { 
        id: params.id,
        isActive: true 
      },
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
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.product.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } }
    })

    const formattedProduct = {
      ...product,
      price: Number(product.price),
      conversationCount: product._count?.conversations || 0
    }

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user owns the product
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (existingProduct.sellerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const data = await request.json()
    const {
      title,
      description,
      price,
      condition,
      location,
      categoryId,
      brand,
      model,
      color,
      size,
      weight,
      dimensions,
      images = [],
      imagesToDelete = [],
      newImages = []
    } = data

    // Update product
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        title,
        description,
        price: price ? Number(price) : undefined,
        condition,
        location,
        categoryId,
        brand,
        model,
        color,
        size,
        weight,
        dimensions
      },
      include: {
        seller: true,
        category: true,
        images: true
      }
    })

    // Handle image deletions
    if (imagesToDelete.length > 0) {
      await prisma.productImage.deleteMany({
        where: { 
          id: { in: imagesToDelete },
          productId: params.id
        }
      })
    }

    // Handle new images (base64)
    if (newImages.length > 0) {
      // Get current max sort order
      const existingImagesCount = await prisma.productImage.count({
        where: { productId: params.id }
      })

      await prisma.productImage.createMany({
        data: newImages.map((imageUrl: string, index: number) => ({
          productId: params.id,
          imageUrl: imageUrl,
          alt: title || 'Product image',
          sortOrder: existingImagesCount + index
        }))
      })
    }

    // Legacy support: Update images if provided in old format
    if (images.length > 0 && !newImages.length && !imagesToDelete.length) {
      // Delete existing images
      await prisma.productImage.deleteMany({
        where: { productId: params.id }
      })

      // Create new images
      await prisma.productImage.createMany({
        data: images.map((image: any, index: number) => ({
          productId: params.id,
          imageUrl: image.url || image,
          alt: image.alt || title,
          sortOrder: index
        }))
      })
    }

    const formattedProduct = {
      ...product,
      price: Number(product.price)
    }

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user owns the product
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    if (existingProduct.sellerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Soft delete by setting isActive to false
    await prisma.product.update({
      where: { id: params.id },
      data: { isActive: false }
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

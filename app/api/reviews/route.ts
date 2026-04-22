import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import db from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sellerId = searchParams.get('sellerId')

  if (!sellerId) {
    return NextResponse.json({ error: 'sellerId is required' }, { status: 400 })
  }

  try {
    const reviews = await db.review.findMany({
      where: { sellerId },
      include: {
        buyer: {
          select: { id: true, name: true, avatar: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0

    return NextResponse.json({ reviews, avgRating, total: reviews.length })
  } catch (error) {
    console.error('GET /api/reviews error:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Sign in to leave a review' }, { status: 401 })
  }

  const body = await request.json()
  const { sellerId, rating, comment } = body

  if (!sellerId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'sellerId and a rating (1–5) are required' }, { status: 400 })
  }

  // Prevent sellers from reviewing themselves
  if (session.user.id === sellerId) {
    return NextResponse.json({ error: 'You cannot review yourself' }, { status: 400 })
  }

  try {
    const review = await db.review.upsert({
      where: {
        buyerId_sellerId: {
          buyerId: session.user.id,
          sellerId
        }
      },
      update: { rating, comment: comment || null, updatedAt: new Date() },
      create: {
        buyerId: session.user.id,
        sellerId,
        rating,
        comment: comment || null
      }
    })

    return NextResponse.json({ review })
  } catch (error) {
    console.error('POST /api/reviews error:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}

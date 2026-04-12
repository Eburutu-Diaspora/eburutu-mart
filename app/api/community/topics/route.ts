import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categorySlug = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 20

    const where: any = { status: 'APPROVED' }
    if (categorySlug && categorySlug !== 'all') {
      where.category = { slug: categorySlug }
    }

    const [topics, total] = await Promise.all([
      prisma.discussionTopic.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          category: true,
          _count: { select: { replies: { where: { status: 'APPROVED' } }, votes: true } }
        },
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.discussionTopic.count({ where })
    ])

    return NextResponse.json({ topics, total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    console.error('Error fetching topics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You must be signed in to post' }, { status: 401 })
    }

    const { title, content, categoryId } = await request.json()
    if (!title?.trim() || !content?.trim() || !categoryId) {
      return NextResponse.json({ error: 'Title, content and category are required' }, { status: 400 })
    }

    const topic = await prisma.discussionTopic.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        categoryId,
        authorId: session.user.id,
        status: 'PENDING'
      }
    })

    return NextResponse.json(topic, { status: 201 })
  } catch (error) {
    console.error('Error creating topic:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

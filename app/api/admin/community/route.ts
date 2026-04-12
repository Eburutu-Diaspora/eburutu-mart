import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 403 })
    }

    const [pendingTopics, pendingReplies] = await Promise.all([
      prisma.discussionTopic.findMany({
        where: { status: 'PENDING' },
        include: {
          author: { select: { id: true, name: true, email: true } },
          category: true,
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.discussionReply.findMany({
        where: { status: 'PENDING' },
        include: {
          author: { select: { id: true, name: true, email: true } },
          topic: { select: { id: true, title: true } }
        },
        orderBy: { createdAt: 'desc' }
      })
    ])

    return NextResponse.json({ pendingTopics, pendingReplies })
  } catch (error) {
    console.error('Error fetching community moderation data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 403 })
    }

    const { type, id, action } = await request.json()
    const status = action === 'approve' ? 'APPROVED' : 'REJECTED'

    if (type === 'topic') {
      await prisma.discussionTopic.update({ where: { id }, data: { status } })
    } else if (type === 'reply') {
      await prisma.discussionReply.update({ where: { id }, data: { status } })
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json({ success: true, status })
  } catch (error) {
    console.error('Error moderating community content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

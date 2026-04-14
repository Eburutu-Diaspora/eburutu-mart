import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const topic = await prisma.discussionTopic.findUnique({
      where: { id: params.id },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        category: true,
        replies: {
          where: { status: 'APPROVED' },
          include: {
            author: { select: { id: true, name: true, avatar: true } },
            _count: { select: { votes: true } }
          },
          orderBy: { createdAt: 'asc' }
        },
        _count: { select: { votes: true } }
      }
    })

    if (!topic || topic.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
    }

    await prisma.discussionTopic.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } }
    }).catch(() => {})

    return NextResponse.json(topic)
  } catch (error) {
    console.error('Error fetching topic:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    if ((session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    await prisma.discussionReply.deleteMany({ where: { topicId: params.id } })
    await prisma.discussionVote.deleteMany({ where: { topicId: params.id } })
    await prisma.discussionTopic.delete({ where: { id: params.id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting topic:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

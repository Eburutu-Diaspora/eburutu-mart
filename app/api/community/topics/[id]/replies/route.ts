import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You must be signed in to reply' }, { status: 401 })
    }

    const { content } = await request.json()
    if (!content?.trim()) {
      return NextResponse.json({ error: 'Reply content is required' }, { status: 400 })
    }

    const topic = await prisma.discussionTopic.findUnique({
      where: { id: params.id }
    })

    if (!topic || topic.status !== 'APPROVED') {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
    }

    const reply = await prisma.discussionReply.create({
      data: {
        content: content.trim(),
        topicId: params.id,
        authorId: session.user.id,
        status: 'PENDING'
      }
    })

    return NextResponse.json(reply, { status: 201 })
  } catch (error) {
    console.error('Error creating reply:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

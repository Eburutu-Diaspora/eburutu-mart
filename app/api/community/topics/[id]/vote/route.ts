import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You must be signed in to vote' }, { status: 401 })
    }

    const existing = await prisma.discussionVote.findFirst({
      where: { userId: session.user.id, topicId: params.id }
    })

    if (existing) {
      await prisma.discussionVote.delete({ where: { id: existing.id } })
      return NextResponse.json({ voted: false })
    }

    await prisma.discussionVote.create({
      data: { userId: session.user.id, topicId: params.id }
    })

    return NextResponse.json({ voted: true })
  } catch (error) {
    console.error('Error voting:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

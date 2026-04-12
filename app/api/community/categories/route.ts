import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const categories = await prisma.discussionCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: { select: { topics: { where: { status: 'APPROVED' } } } }
      }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching discussion categories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

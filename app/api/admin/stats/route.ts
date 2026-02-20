
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const [
      totalUsers,
      totalSellers,
      totalProducts,
      pendingVerifications,
      totalMessages
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'SELLER' } }),
      prisma.product.count({ where: { isActive: true } }),
      prisma.sellerProfile.count({ where: { verificationStatus: 'PENDING' } }),
      prisma.message.count()
    ])

    return NextResponse.json({
      totalUsers,
      totalSellers,
      totalProducts,
      pendingVerifications,
      totalMessages
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

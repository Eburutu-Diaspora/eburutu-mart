export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { status, notes } = await request.json()
    const { id } = params

    // Map status to verificationStatus enum
    const verificationStatus = status === 'VERIFIED' ? 'VERIFIED' : 
                               status === 'REJECTED' ? 'REJECTED' :
                               status === 'IN_REVIEW' ? 'IN_REVIEW' : 'PENDING'

    // Update verification status
    const verification = await prisma.sellerProfile.update({
      where: { id },
      data: {
        verificationStatus: verificationStatus as any,
        verificationNotes: notes,
        adminApproved: status === 'VERIFIED',
        updatedAt: new Date()
      },
      include: {
        user: true
      }
    })

    // If approved, update user role to SELLER
    if (status === 'VERIFIED') {
      await prisma.user.update({
        where: { id: verification.userId },
        data: { role: 'SELLER' }
      })
    }

    return NextResponse.json(verification)
  } catch (error) {
    console.error('Error updating verification:', error)
    return NextResponse.json(
      { error: 'Failed to update verification' },
      { status: 500 }
    )
  }
}

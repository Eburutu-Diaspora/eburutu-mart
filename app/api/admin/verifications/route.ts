export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const verifications = await prisma.sellerProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            location: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform to expected format
    const transformedVerifications = verifications.map(v => ({
      id: v.id,
      status: v.verificationStatus,
      businessName: v.businessName,
      businessType: v.businessType,
      businessAddress: null,
      idDocumentUrl: v.idDocumentUrl,
      businessDocumentUrl: v.businessLicenseUrl,
      notes: v.verificationNotes,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
      user: v.user
    }))

    return NextResponse.json(transformedVerifications)
  } catch (error) {
    console.error('Error fetching verifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch verifications' },
      { status: 500 }
    )
  }
}

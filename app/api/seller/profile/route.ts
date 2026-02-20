
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const sellerProfile = await prisma.sellerProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            location: true
          }
        }
      }
    })

    if (!sellerProfile) {
      return NextResponse.json(
        { error: 'Seller profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(sellerProfile)
  } catch (error) {
    console.error('Error fetching seller profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { businessName, businessDescription, businessType } = data

    const sellerProfile = await prisma.sellerProfile.upsert({
      where: { userId: session.user.id },
      update: {
        businessName,
        businessDescription,
        businessType
      },
      create: {
        userId: session.user.id,
        businessName,
        businessDescription,
        businessType,
        verificationStatus: 'PENDING'
      }
    })

    return NextResponse.json(sellerProfile)
  } catch (error) {
    console.error('Error updating seller profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

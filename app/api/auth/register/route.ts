
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, phone, location, avatar } = await request.json()

    // Validate required fields
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Validate avatar for sellers
    if (role === UserRole.SELLER && !avatar) {
      return NextResponse.json(
        { error: 'Profile picture is required for sellers' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with avatar and auto-verify email
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || UserRole.BUYER,
        phone,
        location,
        avatar: avatar || null,
        emailVerified: new Date(), // Auto-verify for immediate login
        isActive: true
      }
    })

    // Create seller profile if role is SELLER
    if (role === UserRole.SELLER) {
      await prisma.sellerProfile.create({
        data: {
          userId: user.id,
          verificationStatus: 'PENDING'
        }
      })
    }

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

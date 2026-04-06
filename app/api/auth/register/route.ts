import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, phone, location, avatar } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (role === UserRole.SELLER && !avatar) {
      return NextResponse.json(
        { error: 'Profile picture is required for sellers' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || UserRole.BUYER,
        phone,
        location,
        avatar: avatar || null,
        emailVerified: null,
        isActive: false,
      }
    })

    if (role === UserRole.SELLER) {
      await prisma.sellerProfile.create({
        data: {
          userId: user.id,
          verificationStatus: 'PENDING'
        }
      })
    }

    // Send verification email via Supabase Auth
    const appUrl = process.env.NEXTAUTH_URL || 'https://eburutumart.com'

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${appUrl}/api/auth/verify-email`,
        data: { name }
      }
    })

    if (supabaseError) {
      console.error('Supabase email error:', supabaseError.message)
    }

    return NextResponse.json(
      { message: 'Account created. Please check your email to verify your account.', userId: user.id },
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

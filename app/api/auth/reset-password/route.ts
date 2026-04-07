import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Supabase has already verified the token and updated its own auth.
    // We just need to sync the new password hash into the Prisma users table
    // so that NextAuth email/password login still works.
    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.$executeRaw`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE email = ${email.toLowerCase().trim()}
    `

    return NextResponse.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Reset password sync error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { token, email, password } = await request.json()

    if (!token || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Use raw SQL to read recovery fields not in Prisma schema
    const users = await prisma.$queryRaw<Array<{
      id: string;
      recovery_token: string | null;
      recovery_sent_at: Date | null;
    }>>`
      SELECT id, recovery_token, recovery_sent_at 
      FROM users 
      WHERE email = ${email.toLowerCase().trim()}
      LIMIT 1
    `

    if (!users.length || users[0].recovery_token !== token) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }

    const user = users[0]

    if (user.recovery_sent_at) {
      const tokenAge = Date.now() - new Date(user.recovery_sent_at).getTime()
      if (tokenAge > 60 * 60 * 1000) {
        return NextResponse.json({ error: 'Reset link has expired. Please request a new one.' }, { status: 400 })
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.$executeRaw`
      UPDATE users 
      SET password = ${hashedPassword}, recovery_token = NULL, recovery_sent_at = NULL
      WHERE id = ${user.id}
    `

    return NextResponse.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

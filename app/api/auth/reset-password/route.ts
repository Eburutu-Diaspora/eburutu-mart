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

    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase().trim(),
        recovery_token: token,
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }

    // Check token is not older than 1 hour
    if (user.recovery_sent_at) {
      const tokenAge = Date.now() - new Date(user.recovery_sent_at).getTime()
      if (tokenAge > 60 * 60 * 1000) {
        return NextResponse.json({ error: 'Reset link has expired. Please request a new one.' }, { status: 400 })
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        recovery_token: null,
        recovery_sent_at: null,
      }
    })

    return NextResponse.json({ message: 'Password reset successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

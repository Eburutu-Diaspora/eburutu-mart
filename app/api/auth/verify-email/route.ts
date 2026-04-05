import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    if (!token || !email) {
      return NextResponse.redirect(
        new URL('/auth/verify-email?error=invalid', request.url)
      )
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    })

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL('/auth/verify-email?error=invalid', request.url)
      )
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } })
      return NextResponse.redirect(
        new URL(`/auth/verify-email?error=expired&email=${encodeURIComponent(email)}`, request.url)
      )
    }

    if (verificationToken.identifier !== email) {
      return NextResponse.redirect(
        new URL('/auth/verify-email?error=invalid', request.url)
      )
    }

    // Activate the account
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
        isActive: true,
      }
    })

    await prisma.verificationToken.delete({ where: { token } })

    return NextResponse.redirect(
      new URL('/auth/verify-email?success=true', request.url)
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.redirect(
      new URL('/auth/verify-email?error=server', request.url)
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const appUrl = process.env.NEXTAUTH_URL || 'https://eburutumart.com'

  if (!token_hash || type !== 'signup') {
    return NextResponse.redirect(
      new URL('/auth/login?error=InvalidToken', appUrl)
    )
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase.auth.verifyOtp({
    token_hash,
    type: 'signup'
  })

  if (error || !data.user?.email) {
    console.error('Supabase verification error:', error?.message)
    return NextResponse.redirect(
      new URL('/auth/login?error=VerificationFailed', appUrl)
    )
  }

  // Mark user as verified in Prisma
  try {
    await prisma.user.update({
      where: { email: data.user.email },
      data: {
        emailVerified: new Date(),
        isActive: true,
      }
    })
  } catch (dbError) {
    console.error('Failed to update user verification in database:', dbError)
    return NextResponse.redirect(
      new URL('/auth/login?error=VerificationFailed', appUrl)
    )
  }

  // Success — redirect to login with verified flag
  return NextResponse.redirect(
    new URL('/auth/login?verified=true', appUrl)
  )
}

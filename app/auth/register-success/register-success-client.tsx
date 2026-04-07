'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, Loader2, CheckCircle, ShoppingBag, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function RegisterSuccessClient() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const role = searchParams.get('role') || 'BUYER'

  const [isSending, setIsSending] = useState(false)
  const [resendDone, setResendDone] = useState(false)
  const [resendError, setResendError] = useState('')

  const handleResend = async () => {
    setIsSending(true)
    setResendError('')
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResendDone(true)
    } catch (e: any) {
      setResendError(e.message || 'Failed to resend. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-white p-2 rounded-lg">
            <ShoppingBag className="h-8 w-8 text-green-700" />
          </div>
          <span className="text-2xl font-bold text-white">Eburutu Mart</span>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-green-600" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Check Your Email
          </h1>
          <p className="text-center text-gray-600 mb-4">
            We sent a verification link to
          </p>

          {/* Email display */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 mb-6">
            <Mail className="h-5 w-5 text-green-600 flex-shrink-0" />
            <span className="font-semibold text-gray-900 break-all">{email}</span>
          </div>

          {/* Steps */}
          <div className="space-y-3 mb-6 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">1.</span>
              <span>Open your inbox and find the email from Eburutu Mart</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">2.</span>
              <span>Click <strong>&ldquo;Verify My Email Address&rdquo;</strong> in the email</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-green-600 mt-0.5">3.</span>
              <span>Sign in to access your {role === 'SELLER' ? 'seller ' : ''}account</span>
            </div>
          </div>

          {/* Seller note */}
          {role === 'SELLER' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
              <p className="text-amber-800 text-sm">
                <strong>Seller Account:</strong> After verifying your email, you can
                start listing products. Complete business verification for enhanced seller features.
              </p>
            </div>
          )}

          {/* Important notice — replaces misleading "Go to Sign In" button */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-blue-800 text-sm">
              Please verify your email before signing in. The link in your email expires in 24 hours.
            </p>
          </div>

          {/* Resend section */}
          <div className="border-t pt-4">
            <p className="text-sm text-center text-gray-500 mb-3">
              Didn&apos;t receive it? Check your spam folder or
            </p>
            {resendDone ? (
              <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>New verification email sent!</span>
              </div>
            ) : (
              <>
                {resendError && (
                  <p className="text-red-500 text-xs text-center mb-2">{resendError}</p>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleResend}
                  disabled={isSending || !email}
                >
                  {isSending
                    ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending...</>
                    : 'Resend Verification Email'
                  }
                </Button>
              </>
            )}
          </div>

          {/* Secondary sign-in link — demoted, not a primary CTA */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Already verified?{' '}
            <Link href="/auth/login" className="text-green-600 hover:underline">
              Sign in here
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-2">
            Need help?{' '}
            <Link href="/contact" className="text-green-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

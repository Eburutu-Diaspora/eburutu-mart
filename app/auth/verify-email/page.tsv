'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, Clock, Mail, Loader2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const error = searchParams.get('error')
  const email = searchParams.get('email') || ''

  const [resendEmail, setResendEmail] = useState(email)
  const [isSending, setIsSending] = useState(false)
  const [resendDone, setResendDone] = useState(false)
  const [resendError, setResendError] = useState('')

  const handleResend = async () => {
    if (!resendEmail) return
    setIsSending(true)
    setResendError('')
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resendEmail })
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

  if (success) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
        <p className="text-gray-600 mb-8">Your account is now active. You can sign in to start exploring Eburutu Mart.</p>
        <Link href="/auth/login">
          <Button className="w-full" size="lg">Continue to Sign In →</Button>
        </Link>
      </div>
    )
  }

  if (error === 'expired') {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-amber-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Expired</h1>
        <p className="text-gray-600 mb-6">Your verification link has expired. Request a new one below.</p>
        {resendDone ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 text-sm font-medium">New verification email sent! Check your inbox.</p>
          </div>
        ) : (
          <>
            <input
              type="email"
              value={resendEmail}
              onChange={e => setResendEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2.5 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {resendError && <p className="text-red-500 text-sm mb-3">{resendError}</p>}
            <Button onClick={handleResend} disabled={isSending} className="w-full">
              {isSending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending...</> : 'Send New Verification Email'}
            </Button>
          </>
        )}
        <Link href="/auth/login" className="block mt-4 text-sm text-gray-500 hover:text-gray-700">
          Back to Sign In
        </Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
        <p className="text-gray-600 mb-6">This link is invalid or has already been used. Request a new one below.</p>
        {resendDone ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 text-sm font-medium">New verification email sent!</p>
          </div>
        ) : (
          <>
            <input
              type="email"
              value={resendEmail}
              onChange={e => setResendEmail(e.target.value)}
              placeholder="Enter your email to get a new link"
              className="w-full border rounded-lg px-4 py-2.5 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {resendError && <p className="text-red-500 text-sm mb-3">{resendError}</p>}
            <Button onClick={handleResend} disabled={isSending} className="w-full">
              {isSending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending...</> : 'Send New Verification Email'}
            </Button>
          </>
        )}
        <Link href="/auth/login" className="block mt-4 text-sm text-gray-500 hover:text-gray-700">
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <Mail className="w-10 h-10 text-blue-600" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
      <p className="text-gray-600 mb-8">We sent a verification link to your email address. Click the link to activate your account.</p>
      <Link href="/auth/login">
        <Button variant="outline" className="w-full">Back to Sign In</Button>
      </Link>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-white p-2 rounded-lg">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
          <span className="text-2xl font-bold text-white">Eburutu Mart</span>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <Suspense fallback={<div className="text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600" /></div>}>
            <VerifyEmailContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

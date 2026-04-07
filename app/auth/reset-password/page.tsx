'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock, ArrowLeft, ShoppingBag, Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

function ResetPasswordForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isValidLink, setIsValidLink] = useState(false)
  const [checking, setChecking] = useState(true)
  const [showInfo, setShowInfo] = useState(true)
  const [userEmail, setUserEmail] = useState('')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Auto-dismiss info box after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowInfo(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.replace('#', ''))
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    const type = params.get('type')

    if (access_token && refresh_token && type === 'recovery') {
      supabase.auth.setSession({ access_token, refresh_token }).then(({ data, error }) => {
        if (error) {
          setError('Invalid or expired reset link. Please request a new one.')
        } else {
          setIsValidLink(true)
          setUserEmail(data.user?.email || '')
        }
        setChecking(false)
      })
    } else {
      setError('Invalid reset link. Please request a new one.')
      setChecking(false)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      setIsLoading(false)
      return
    }

    try {
      // Step 1: Update password in Supabase Auth
      const { error: supabaseError } = await supabase.auth.updateUser({ password })
      if (supabaseError) {
        setError(supabaseError.message || 'Failed to reset password.')
        setIsLoading(false)
        return
      }

      // Step 2: Sync new password hash to Prisma/NextAuth users table
      // so login with email/password still works
      await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password }),
      })

      setSuccess(true)
      setTimeout(() => router.push('/auth/login'), 3000)
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-white/90 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-white p-2 rounded-lg">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
          <span className="text-2xl font-bold text-white">Eburutu Mart</span>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {success ? 'Password Reset!' : 'Set New Password'}
            </CardTitle>
            <CardDescription>
              {success ? 'Redirecting to login...' : 'Enter your new password below'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {checking ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                <p className="text-sm text-muted-foreground mt-2">Verifying reset link...</p>
              </div>
            ) : success ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Your password has been reset successfully. Redirecting to login shortly.
                </p>
                <Link href="/auth/login">
                  <Button className="w-full">Sign In Now</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Min. 8 characters"
                      className="pl-10"
                      required
                      disabled={isLoading || !isValidLink}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Repeat your password"
                      className="pl-10"
                      required
                      disabled={isLoading || !isValidLink}
                    />
                  </div>
                </div>

                {/* Auto-dismissing info box — fades after 4 seconds */}
                <div
                  className={`bg-blue-50 border border-blue-200 rounded-lg p-3 transition-all duration-700 overflow-hidden ${
                    showInfo ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 border-0 p-0'
                  }`}
                >
                  <p className="text-blue-800 text-xs">
                    Choose a strong password with uppercase, lowercase, numbers and symbols.
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !isValidLink}
                >
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Resetting...</>
                  ) : (
                    'Reset Password'
                  )}
                </Button>

                <div className="text-center">
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    Request a new reset link
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}

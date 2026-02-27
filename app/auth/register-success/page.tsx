'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react'

export default function RegisterSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const role = searchParams.get('role') || 'BUYER'
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/auth/login')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-white p-2 rounded-lg">
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-white">Eburutu Mart</span>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 bg-green-100 p-4 rounded-full w-fit">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">
              Registration Successful!
            </CardTitle>
            <CardDescription className="text-base">
              Welcome to the Eburutu Mart community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <Mail className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-green-800">
                Your account has been created with:
              </p>
              <p className="font-semibold text-green-900 mt-1">{email}</p>
            </div>

            {role === 'SELLER' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Seller Account:</strong> After logging in, you can start listing products immediately. 
                  Business verification may be required for enhanced seller features.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <Link href="/auth/login" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <span>Continue to Login</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting to login in {countdown} seconds...
              </div>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              <p>
                Need help? <Link href="/contact" className="text-green-600 hover:underline">Contact Support</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

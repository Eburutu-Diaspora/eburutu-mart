import { Suspense } from 'react'
import RegisterSuccessClient from './register-success-client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      }>
        <RegisterSuccessClient />
      </Suspense>
    </div>
  )
}

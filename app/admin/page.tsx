
import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/auth'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { AdminDashboard } from '@/components/dashboard/admin-dashboard'

export default async function AdminPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect('/auth/login')
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  )
}

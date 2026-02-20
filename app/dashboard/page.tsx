
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAuthSession } from '@/lib/auth'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { DashboardOverview } from '@/components/dashboard/dashboard-overview'
import { SellerDashboard } from '@/components/dashboard/seller-dashboard'
import { AdminDashboard } from '@/components/dashboard/admin-dashboard'

export default async function DashboardPage() {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect('/auth/login')
  }

  const renderDashboard = () => {
    switch (session.user.role) {
      case 'ADMIN':
        return <AdminDashboard />
      case 'SELLER':
        return <SellerDashboard />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        {renderDashboard()}
      </main>
      <Footer />
    </div>
  )
}

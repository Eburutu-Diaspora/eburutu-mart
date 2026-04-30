import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/auth'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { PromoSlotsManager } from '@/components/admin/promo-slots-manager'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function PromoSlotsPage() {
  const session = await getAuthSession()
  if (!session?.user) redirect('/auth/login')
  if (session.user.role !== 'ADMIN') redirect('/dashboard')

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Promo Slots</h1>
          <p className="text-muted-foreground mt-1">
            Manage the 2 circular ads and 4 banner boxes on the homepage.
            Upload an image, set a link, then toggle Active to make it live instantly.
          </p>
        </div>
        <PromoSlotsManager />
      </main>
      <Footer />
    </div>
  )
}

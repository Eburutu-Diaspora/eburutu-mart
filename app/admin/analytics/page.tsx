'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Store, Package, MessageCircle, ArrowLeft, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  totalUsers: number
  totalSellers: number
  totalProducts: number
  totalMessages: number
}

export default function AdminAnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [session, status, router])

  const metrics = [
    { label: 'Total Users', value: stats?.totalUsers ?? 0, icon: Users, color: 'from-blue-500 to-purple-500', description: 'Registered accounts across all roles' },
    { label: 'Active Sellers', value: stats?.totalSellers ?? 0, icon: Store, color: 'from-green-500 to-teal-500', description: 'Sellers with active profiles' },
    { label: 'Total Listings', value: stats?.totalProducts ?? 0, icon: Package, color: 'from-orange-500 to-red-500', description: 'Products listed on the platform' },
    { label: 'Messages Sent', value: stats?.totalMessages ?? 0, icon: MessageCircle, color: 'from-yellow-500 to-amber-500', description: 'Buyer-seller messages exchanged' },
  ]

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-muted rounded"></div>)}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">

        <Link href="/admin">
          <button className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-r from-gray-500 to-slate-500">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Platform Analytics</h1>
            <p className="text-muted-foreground">EburutuMart marketplace statistics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.label} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${metric.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-4xl font-bold mb-1">{metric.value}</p>
                  <p className="text-sm font-medium">{metric.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/admin/users" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Users className="w-4 h-4" /> Manage Users
                </Link>
                <Link href="/community" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <MessageCircle className="w-4 h-4" /> Community Board
                </Link>
                <Link href="/products" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Package className="w-4 h-4" /> View All Listings
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Platform status</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Marketplace</span>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Live
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Community board</span>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Active
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chatbot</span>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Online
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Listings ratio</h3>
              {stats && stats.totalSellers > 0 ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg listings per seller</span>
                    <span className="font-medium">
                      {(stats.totalProducts / stats.totalSellers).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Buyers to sellers ratio</span>
                    <span className="font-medium">
                      {stats.totalSellers > 0 ? ((stats.totalUsers - stats.totalSellers) / stats.totalSellers).toFixed(1) : '0'}x
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No seller data yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

      </main>
      <Footer />
    </div>
  )
}

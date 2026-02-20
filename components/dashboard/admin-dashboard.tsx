
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Store, 
  Package, 
  MessageCircle, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react'
import Link from 'next/link'

interface AdminStats {
  totalUsers: number
  totalSellers: number
  totalProducts: number
  pendingVerifications: number
  totalMessages: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAdminStats()
  }, [])

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const adminStats = [
    {
      title: 'Total Users',
      value: stats?.totalUsers?.toString() || '0',
      change: '+12% this month',
      icon: Users,
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Active Sellers',
      value: stats?.totalSellers?.toString() || '0',
      change: '+8% this month',
      icon: Store,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts?.toString() || '0',
      change: '+25% this month',
      icon: Package,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Pending Verifications',
      value: stats?.pendingVerifications?.toString() || '0',
      change: 'Require review',
      icon: AlertCircle,
      color: 'from-yellow-500 to-amber-500'
    }
  ]

  const adminActions = [
    {
      title: 'Review Verifications',
      description: 'Review pending seller verifications',
      icon: CheckCircle,
      href: '/admin/verifications',
      color: 'from-green-500 to-emerald-500',
      urgent: (stats?.pendingVerifications || 0) > 0
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: Users,
      href: '/admin/users',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Product Moderation',
      description: 'Review and moderate products',
      icon: Package,
      href: '/admin/products',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Platform Settings',
      description: 'Configure marketplace settings',
      icon: Shield,
      href: '/admin/settings',
      color: 'from-gray-500 to-slate-500'
    }
  ]

  const recentActivity = [
    {
      type: 'verification',
      title: 'New seller verification submitted',
      time: '2 hours ago',
      icon: AlertCircle,
      color: 'text-yellow-500'
    },
    {
      type: 'user',
      title: '5 new users registered',
      time: '4 hours ago',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      type: 'product',
      title: '12 new products listed',
      time: '6 hours ago',
      icon: Package,
      color: 'text-green-500'
    },
    {
      type: 'verification',
      title: 'Seller verification approved',
      time: '1 day ago',
      icon: CheckCircle,
      color: 'text-green-500'
    }
  ]

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Admin Dashboard 🛡️
            </h1>
            <p className="text-white/90 text-lg">
              Manage and monitor the Eburutu Mart
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 p-4 rounded-full">
              <Shield className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.title === 'Pending Verifications' && (stats?.pendingVerifications || 0) > 0 && (
                  <Badge variant="destructive" className="animate-pulse">
                    Urgent
                  </Badge>
                )}
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium mb-1">{stat.title}</div>
              <div className="text-xs text-muted-foreground">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Admin Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className={`group hover:shadow-lg transition-all duration-300 cursor-pointer h-full ${action.urgent ? 'ring-2 ring-yellow-500 ring-opacity-50' : ''}`}>
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${action.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                  {action.urgent && (
                    <Badge variant="destructive" className="mt-2">
                      Needs Attention
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`p-2 bg-muted rounded-full ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Platform Health</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="verified">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Services</span>
                  <Badge variant="verified">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Image Storage</span>
                  <Badge variant="verified">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Registrations</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Products Listed</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Messages Sent</span>
                  <span className="font-medium">42</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

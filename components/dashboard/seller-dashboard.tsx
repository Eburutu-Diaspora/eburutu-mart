
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Store, 
  Package, 
  Eye, 
  MessageCircle, 
  TrendingUp,
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'
import Link from 'next/link'

interface SellerProfile {
  verificationStatus: string
  businessName?: string
  businessDescription?: string
}

export function SellerDashboard() {
  const { data: session } = useSession()
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSellerProfile()
  }, [])

  const fetchSellerProfile = async () => {
    try {
      const response = await fetch('/api/seller/profile')
      if (response.ok) {
        const data = await response.json()
        setSellerProfile(data)
      }
    } catch (error) {
      console.error('Error fetching seller profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getVerificationStatusIcon = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'IN_REVIEW':
        return <AlertCircle className="w-5 h-5 text-blue-500" />
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getVerificationStatusBadge = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return <Badge variant="verified">Verified</Badge>
      case 'PENDING':
        return <Badge variant="pending">Pending</Badge>
      case 'IN_REVIEW':
        return <Badge className="bg-blue-500">In Review</Badge>
      case 'REJECTED':
        return <Badge variant="rejected">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const sellerStats = [
    {
      title: 'Total Products',
      value: '12',
      change: '+2 this month',
      icon: Package,
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Total Views',
      value: '1,234',
      change: '+15% this month',
      icon: Eye,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Messages',
      value: '28',
      change: '5 unread',
      icon: MessageCircle,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Performance',
      value: '94%',
      change: 'Response rate',
      icon: TrendingUp,
      color: 'from-pink-500 to-rose-500'
    }
  ]

  const recentProducts = [
    {
      id: '1',
      title: 'Authentic Ankara Fabric',
      price: '£45.99',
      views: 234,
      status: 'Active',
      image: '/placeholder-product.jpg'
    },
    {
      id: '2',
      title: 'Traditional Kente Cloth',
      price: '£199.99',
      views: 156,
      status: 'Active',
      image: '/placeholder-product.jpg'
    },
    {
      id: '3',
      title: 'Hand-woven Basket',
      price: '£35.00',
      views: 89,
      status: 'Draft',
      image: '/placeholder-product.jpg'
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
              Welcome back, {session?.user?.name?.split(' ')[0]}! 🛍️
            </h1>
            <p className="text-white/90 text-lg">
              {sellerProfile?.businessName ? (
                <>Manage your <strong>{sellerProfile.businessName}</strong> business</>
              ) : (
                'Manage your seller dashboard'
              )}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 p-4 rounded-full">
              <Store className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      {sellerProfile && sellerProfile.verificationStatus !== 'VERIFIED' && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getVerificationStatusIcon(sellerProfile.verificationStatus)}
              <span>
                Your seller verification is {sellerProfile.verificationStatus.toLowerCase()}.
                {sellerProfile.verificationStatus === 'PENDING' && ' Complete your verification to start selling.'}
                {sellerProfile.verificationStatus === 'IN_REVIEW' && ' Our team is reviewing your application.'}
                {sellerProfile.verificationStatus === 'REJECTED' && ' Please review and resubmit your verification.'}
              </span>
            </div>
            {sellerProfile.verificationStatus === 'PENDING' && (
              <Link href="/verification">
                <Button size="sm">Complete Verification</Button>
              </Link>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Verification Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Seller Verification Status
            {getVerificationStatusBadge(sellerProfile?.verificationStatus || 'PENDING')}
          </CardTitle>
          <CardDescription>
            Your current verification status and business information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Business Name</h4>
              <p className="text-muted-foreground">
                {sellerProfile?.businessName || 'Not provided'}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Verification Status</h4>
              <div className="flex items-center gap-2">
                {getVerificationStatusIcon(sellerProfile?.verificationStatus || 'PENDING')}
                <span className="capitalize">
                  {sellerProfile?.verificationStatus?.toLowerCase() || 'Pending'}
                </span>
              </div>
            </div>
          </div>
          {sellerProfile?.businessDescription && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Business Description</h4>
              <p className="text-muted-foreground">{sellerProfile.businessDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {sellerStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm font-medium mb-1">{stat.title}</div>
              <div className="text-xs text-muted-foreground">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/products/new">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Add New Product</h3>
              <p className="text-sm text-muted-foreground">
                List a new product for sale
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/products">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Manage Products</h3>
              <p className="text-sm text-muted-foreground">
                Edit and manage your listings
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/messages">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Messages</h3>
              <p className="text-sm text-muted-foreground">
                Chat with potential buyers
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Products</h2>
          <Link href="/dashboard/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{product.title}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <Badge variant={product.status === 'Active' ? 'verified' : 'outline'}>
                    {product.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <Eye className="w-4 h-4" />
                  <span>{product.views} views</span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/products/${product.id}/edit`} className="flex-1">
                    <Button size="sm" className="w-full">Edit</Button>
                  </Link>
                  <Link href={`/products/${product.id}`}>
                    <Button size="sm" variant="outline">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

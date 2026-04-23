
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Store,
  Package,
  Eye,
  MessageCircle,
  Plus,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  title: string
  price: number
  status: string
  images: { imageUrl: string }[]
  _count?: { views: number }
}

export function SellerDashboard() {
  const { data: session } = useSession()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSellerProducts()
  }, [])

  const fetchSellerProducts = async () => {
    try {
      const response = await fetch('/api/dashboard/seller-products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error('Error fetching seller products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const totalViews = products.reduce((sum, p) => sum + (p._count?.views || 0), 0)
  const activeProducts = products.filter(p => p.status === 'ACTIVE').length

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
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
            <p className="text-white/90 text-lg">Manage your seller dashboard</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 p-4 rounded-full">
              <Store className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">{products.length}</div>
            <div className="text-sm font-medium mb-1">Total Listings</div>
            <div className="text-xs text-muted-foreground">{activeProducts} active</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">{totalViews.toLocaleString()}</div>
            <div className="text-sm font-medium mb-1">Total Views</div>
            <div className="text-xs text-muted-foreground">Across all listings</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">—</div>
            <div className="text-sm font-medium mb-1">Messages</div>
            <div className="text-xs text-muted-foreground">Coming soon</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/products/new">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Add New Listing</h3>
              <p className="text-sm text-muted-foreground">List a new product for sale</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/products">
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Manage Listings</h3>
              <p className="text-sm text-muted-foreground">Edit and manage your listings</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Listings</h2>
          <Link href="/dashboard/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No listings yet</h3>
              <p className="text-muted-foreground mb-4">Start selling by adding your first product</p>
              <Link href="/dashboard/products/new">
                <Button>Add Your First Listing</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                    {product.images?.[0]?.imageUrl ? (
                      <Image
                        src={product.images[0].imageUrl}
                        alt={product.title}
                        width={300}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Package className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-1">{product.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-primary">£{product.price.toFixed(2)}</span>
                    <Badge variant={product.status === 'ACTIVE' ? 'default' : 'outline'}>
                      {product.status === 'ACTIVE' ? 'Active' : 'Draft'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <Eye className="w-4 h-4" />
                    <span>{product._count?.views || 0} views</span>
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
        )}
      </div>

    </div>
  )
}

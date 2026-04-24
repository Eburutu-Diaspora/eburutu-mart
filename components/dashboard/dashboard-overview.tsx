
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingBag, User, Store, MapPin, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const FALLBACK = 'https://placehold.co/400x300/d4edda/2d6a4f?text=EburutuMart'

interface Product {
  id: string
  title: string
  price: number
  location: string
  viewCount: number
  images: { imageUrl: string }[]
  category?: { name: string }
}

export function DashboardOverview() {
  const { data: session } = useSession()
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    fetch('/api/products?recommended=true')
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data?.products) ? data.products : []
        setProducts(list.slice(0, 3))
      })
      .catch(() => setProducts([]))
      .finally(() => setLoadingProducts(false))
  }, [])

  const quickActions = [
    {
      title: 'Browse Products',
      description: 'Discover authentic African products',
      icon: ShoppingBag,
      href: '/products',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Become a Seller',
      description: 'Start sharing your products',
      icon: Store,
      href: '/auth/register',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Profile Settings',
      description: 'Update your information',
      icon: User,
      href: '/dashboard/profile',
      color: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-white/90 text-lg">
              Ready to explore authentic African culture and products?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 p-4 rounded-full">
              <User className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
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
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <Link href="/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        {loadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No recommended products yet. Check back soon!
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full overflow-hidden">
                  <div className="relative aspect-video overflow-hidden bg-gray-50">
                    <img
                      src={product.images?.[0]?.imageUrl || FALLBACK}
                      alt={product.title}
                      onError={(e) => { e.currentTarget.src = FALLBACK }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    {product.category?.name && (
                      <span className="text-xs text-emerald-600 font-medium uppercase tracking-wide">
                        {product.category.name}
                      </span>
                    )}
                    <h3 className="font-semibold mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        £{Number(product.price).toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        {product.viewCount || 0}
                      </div>
                    </div>
                    {product.location && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {product.location}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

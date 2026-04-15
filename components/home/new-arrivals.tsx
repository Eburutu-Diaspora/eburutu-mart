'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Eye, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  title: string
  price: number
  images: { url: string }[]
  location: string
  views: number
  category?: { name: string }
}

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products?limit=6&sort=newest')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data?.products) ? data.products : Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false))
  }, [])

  if (!isLoading && products.length === 0) return null

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50/40">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">Just In</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            <p className="text-gray-500 mt-1">The latest products from our community</p>
          </div>
          <Link href="/products?sort=newest">
            <Button variant="outline" className="hidden sm:flex">View All New →</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl mb-3" />
                <div className="h-3 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                    {product.images?.[0]?.url ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 16vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                        <span className="text-3xl">🛍️</span>
                      </div>
                    )}
                    <Badge className="absolute top-2 left-2 bg-amber-500 text-white text-xs border-0">New</Badge>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                      <Eye className="h-3 w-3" />
                      {product.views || 0}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate group-hover:text-emerald-700 transition-colors">
                    {product.title}
                  </p>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">
                    £{Number(product.price).toFixed(2)}
                  </p>
                  {product.location && (
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400 truncate">{product.location}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link href="/products?sort=newest">
            <Button variant="outline" size="sm">View All New Arrivals →</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

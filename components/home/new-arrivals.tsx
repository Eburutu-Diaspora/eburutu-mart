'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Eye, Clock, ShoppingBag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  title: string
  price: number
  images: { imageUrl: string }[]
  location: string
  viewCount: number
  category?: { name: string }
}

function ProductImage({ src, alt }: { src?: string; alt: string }) {
  const [error, setError] = useState(false)
  if (!src || error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <ShoppingBag className="h-8 w-8 text-amber-400" />
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      onError={() => setError(true)}
    />
  )
}

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products?newArrival=true')
      .then(res => res.json())
      .then(async data => {
        const allocated = Array.isArray(data?.products) ? data.products : []
        if (allocated.length > 0) {
          setProducts(allocated.slice(0, 6))
        } else {
          // Fallback: page 2 — products 7–12 (different from Featured)
          const fallbackRes = await fetch('/api/products?limit=6&page=2')
          const fallbackData = await fallbackRes.json()
          const all = Array.isArray(fallbackData?.products) ? fallbackData.products : []
          setProducts(all.slice(0, 6))
        }
        setIsLoading(false)
      })
      .catch(() => { setProducts([]); setIsLoading(false) })
  }, [])

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
          <Link href="/products">
            <Button variant="outline" className="hidden sm:flex">View All →</Button>
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
                    <ProductImage src={product.images?.[0]?.imageUrl} alt={product.title} />
                    <Badge className="absolute top-2 left-2 bg-amber-500 text-white text-xs border-0">New</Badge>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                      <Eye className="h-3 w-3" />
                      {product.viewCount || 0}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate group-hover:text-emerald-700 transition-colors">{product.title}</p>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">£{Number(product.price).toFixed(2)}</p>
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
          <Link href="/products">
            <Button variant="outline" size="sm">View All New Arrivals →</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

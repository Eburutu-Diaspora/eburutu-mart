'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Eye, ThumbsUp } from 'lucide-react'
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

export function RecommendedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products?limit=4&sort=popular')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data?.products) ? data.products : Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false))
  }, [])

  if (!isLoading && products.length === 0) return null

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Picked For You</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Recommended Products</h2>
            <p className="text-gray-500 mt-1">Popular items loved by our community</p>
          </div>
          <Link href="/products?sort=popular">
            <Button variant="outline" className="hidden sm:flex">Browse All →</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="group cursor-pointer bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                    {product.images?.[0]?.url ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
                        <span className="text-4xl">🌍</span>
                      </div>
                    )}
                    {index === 0 && (
                      <Badge className="absolute top-3 left-3 bg-emerald-600 text-white border-0 text-xs">
                        Most Popular
                      </Badge>
                    )}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      <Eye className="h-3 w-3" />
                      {product.views || 0}
                    </div>
                  </div>
                  <div className="p-4">
                    {product.category?.name && (
                      <span className="text-xs text-emerald-600 font-medium uppercase tracking-wide">
                        {product.category.name}
                      </span>
                    )}
                    <h3 className="font-semibold text-gray-900 mt-1 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-700">
                        £{Number(product.price).toFixed(2)}
                      </span>
                      {product.location && (
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[80px]">{product.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link href="/products?sort=popular">
            <Button variant="outline" size="sm">Browse All Recommended →</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

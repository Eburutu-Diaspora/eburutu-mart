
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Star,
  MapPin,
  Eye,
  MessageCircle,
  Heart,
  ShoppingCart
} from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
 images: { imageUrl: string }[]
  seller: {
    id: string
    businessName?: string
    user?: { name: string }
    location?: string
  }
  category: {
    id: string
    name: string
  }
  views?: number
  isPromoted?: boolean
  discount?: number
}

export function FeaturedProducts() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products?limit=6')
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products ?? []
        setProducts(list)
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  if (loading) {
    return (
      <section className="py-20 bg-muted/20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Listings
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked products from our trusted sellers, showcasing the finest
              African craftsmanship and culture
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 bg-muted rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Listings
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Handpicked products from our trusted sellers, showcasing the finest
            African craftsmanship and culture
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="relative aspect-video">
                 <img
  src={
    (Array.isArray(product.images) && product.images.length > 0
     ? product.images[0]?.imageUrl
      : '') ||
    'https://placehold.co/400x300/e2e8f0/94a3b8?text=No+Image'
  }
  alt={product.title}
  onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/94a3b8?text=No+Image' }}
  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isPromoted && (
                      <Badge className="bg-accent text-white">Featured</Badge>
                    )}
                    {product.discount && (
                      <Badge variant="destructive">-{product.discount}%</Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-white/90 hover:bg-white"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(product.id)
                            ? 'fill-red-500 text-red-500'
                            : ''
                        }`}
                      />
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-4">
                    {product.views !== undefined && (
                      <div className="flex items-center gap-1 text-white text-sm bg-black/50 px-2 py-1 rounded">
                        <Eye className="h-3 w-3" />
                        <span>{product.views}</span>
                      </div>
                    )}
                    {product.seller && (
                      <div className="flex items-center gap-1 text-white text-sm bg-black/50 px-2 py-1 rounded">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>
                          {typeof product.seller === 'object' &&
                          'rating' in product.seller
                            ? (product.seller as { rating?: number }).rating
                            : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category?.name ?? 'Uncategorised'}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary">
                      £{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        £{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {(
                          product.seller?.businessName ??
                          product.seller?.user?.name ??
                          '?'
                        ).charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {product.seller?.businessName ??
                            product.seller?.user?.name ??
                            'Seller'}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>
                            {product.seller?.location ?? 'Location TBC'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="flex-1"
                    >
                      <Button className="w-full" variant="outline">
                        View Details
                      </Button>
                    </Link>
                    <Button size="icon" className="shrink-0">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/products">
            <Button variant="african" size="lg" className="group">
              Browse the Shop
              <ShoppingCart className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

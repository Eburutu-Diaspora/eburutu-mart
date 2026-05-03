'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Eye, MessageCircle, Heart } from 'lucide-react'
import PromoSlotBanners from './promo-slot-banners'

interface Product {
  id: string
  title: string
  description: string
  price: number
  images: { imageUrl: string }[]
  seller: {
    id: string
    name?: string
    businessName?: string
    location?: string
  }
  category: { id: string; name: string }
  viewCount?: number
  isFeatured?: boolean
}

export function FeaturedProducts() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [products, setProducts]   = useState<Product[]>([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(async data => {
        const featured = Array.isArray(data?.products) ? data.products : []
        if (featured.length > 0) {
          setProducts(featured.slice(0, 6))
        } else {
          // Fallback: page 1 — products 1–6
          const fallbackRes  = await fetch('/api/products?limit=6&page=1')
          const fallbackData = await fallbackRes.json()
          const all = Array.isArray(fallbackData?.products) ? fallbackData.products : []
          setProducts(all.slice(0, 6))
        }
        setLoading(false)
      })
      .catch(() => { setProducts([]); setLoading(false) })
  }, [])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const getImageSrc = (product: Product) => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      const img = product.images[0]
      return typeof img === 'string' ? img : img.imageUrl
    }
    return '/placeholder-product.jpg'
  }

  return (
    <section className="py-16 bg-muted/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
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
                    <Image
                      src={getImageSrc(product)}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = '/placeholder-product.jpg' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {product.isFeatured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-accent text-white">Featured</Badge>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>
                    {product.viewCount !== undefined && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white text-sm bg-black/50 px-2 py-1 rounded">
                        <Eye className="h-3 w-3" />
                        <span>{product.viewCount}</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="text-xs mb-2">
                      {product.category?.name ?? 'Uncategorised'}
                    </Badge>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary">
                        £{Number(product.price).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {(product.seller?.businessName ?? product.seller?.name ?? '?').charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {product.seller?.businessName ?? product.seller?.name ?? 'Seller'}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{product.seller?.location ?? 'Location TBC'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/products/${product.id}`} className="flex-1">
                        <Button className="w-full" variant="outline">View Details</Button>
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
        )}
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PromoSlotBanners />
      </div>
    </section>
  )
}

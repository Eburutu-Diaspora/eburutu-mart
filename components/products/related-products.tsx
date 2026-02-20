
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Eye } from 'lucide-react'
import { ProductWithDetails } from '@/lib/types'

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<ProductWithDetails[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRelatedProducts()
  }, [categoryId, currentProductId])

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`/api/products?limit=4`)
      if (response.ok) {
        const data = await response.json()
        // Filter out current product and limit to 4
        const filtered = data.products
          ?.filter((p: ProductWithDetails) => p.id !== currentProductId)
          ?.slice(0, 4) || []
        setProducts(filtered)
      }
    } catch (error) {
      console.error('Error fetching related products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="animate-pulse">
                <div className="aspect-video bg-muted"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!products.length) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={product.images?.[0]?.imageUrl || '/placeholder-product.jpg'}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.isPromoted && (
                <Badge className="absolute top-2 left-2 bg-accent text-white">
                  Featured
                </Badge>
              )}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs bg-black/50 px-2 py-1 rounded">
                <Eye className="h-3 w-3" />
                <span>{product.viewCount}</span>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              <div className="text-lg font-bold text-primary mb-2">
                £{Number(product.price || 0).toFixed(2)}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <MapPin className="h-3 w-3" />
                {product.location}
              </div>
              <Link href={`/products/${product.id}`}>
                <Button size="sm" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

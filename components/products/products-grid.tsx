
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  MapPin, 
  Eye, 
  MessageCircle, 
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { ProductWithDetails } from '@/lib/types'

interface ProductsGridProps {
  searchParams: {
    category?: string
    search?: string
    location?: string
    minPrice?: string
    maxPrice?: string
    verified?: string
    page?: string
    sort?: string
  }
}

interface ProductsResponse {
  products: ProductWithDetails[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export function ProductsGrid({ searchParams }: ProductsGridProps) {
  const [productsData, setProductsData] = useState<ProductsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    fetchProducts()
  }, [searchParams])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) params.set(key, value)
      })

      const response = await fetch(`/api/products?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setProductsData(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const currentPage = parseInt(searchParams.page || '1')

  const generatePageUrl = (page: number) => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') params.set(key, value)
    })
    if (page > 1) params.set('page', page.toString())
    return `/products?${params.toString()}`
  }

  if (isLoading) {
    return <ProductsGridSkeleton />
  }

  if (!productsData?.products?.length) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search criteria or browse our categories
        </p>
        <Link href="/products">
          <Button>View All Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {((currentPage - 1) * productsData.pagination.limit) + 1} - {Math.min(currentPage * productsData.pagination.limit, productsData.pagination.total)} of {productsData.pagination.total} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsData.products.map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
            <div className="relative aspect-video">
              <Image
                src={product.images?.[0]?.imageUrl || '/placeholder-product.jpg'}
                alt={product.images?.[0]?.alt || product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isPromoted && (
                  <Badge className="bg-accent text-white">Featured</Badge>
                )}
                {product.seller?.sellerProfile?.verificationStatus === 'VERIFIED' && (
                  <Badge variant="verified">Verified Seller</Badge>
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
                  <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>

              {/* Stats */}
              <div className="absolute bottom-4 left-4 flex items-center gap-4">
                <div className="flex items-center gap-1 text-white text-sm bg-black/50 px-2 py-1 rounded">
                  <Eye className="h-3 w-3" />
                  <span>{product.viewCount}</span>
                </div>
                {product.seller?.sellerProfile?.verificationStatus === 'VERIFIED' && (
                  <div className="flex items-center gap-1 text-white text-sm bg-black/50 px-2 py-1 rounded">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>4.8</span>
                  </div>
                )}
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.category?.name}
                </Badge>
              </div>
              
              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h3>
              </Link>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-primary">
                  £{Number(product.price || 0).toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {product.currency}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {product.seller?.name?.charAt(0) || 'S'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{product.seller?.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {product.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/products/${product.id}`} className="flex-1">
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
        ))}
      </div>

      {/* Pagination */}
      {productsData.pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Link 
            href={generatePageUrl(currentPage - 1)}
            className={currentPage <= 1 ? 'pointer-events-none' : ''}
          >
            <Button 
              variant="outline" 
              size="icon"
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, productsData.pagination.pages) }, (_, i) => {
              const page = i + 1
              return (
                <Link key={page} href={generatePageUrl(page)}>
                  <Button 
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                  >
                    {page}
                  </Button>
                </Link>
              )
            })}
          </div>

          <Link 
            href={generatePageUrl(currentPage + 1)}
            className={currentPage >= productsData.pagination.pages ? 'pointer-events-none' : ''}
          >
            <Button 
              variant="outline" 
              size="icon"
              disabled={currentPage >= productsData.pagination.pages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="animate-pulse">
            <div className="aspect-video bg-muted"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-6 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
              <div className="flex gap-2">
                <div className="h-10 bg-muted rounded flex-1"></div>
                <div className="h-10 w-10 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

const featuredProducts = [
  {
    id: '1',
    title: 'Authentic Ankara Fabric Set',
    description: 'Beautiful hand-woven Ankara fabric perfect for traditional wear',
    price: 45.99,
    originalPrice: 59.99,
    image: 'https://i.pinimg.com/originals/b0/62/d0/b062d0635031924683bf1b729a64eb55.jpg',
    seller: {
      name: 'Amara Textiles',
      rating: 4.8,
      location: 'London, UK'
    },
    category: 'Fashion & Textiles',
    views: 234,
    isPromoted: true,
    discount: 23
  },
  {
    id: '2',
    title: 'Premium Shea Butter Collection',
    description: 'Pure, unrefined shea butter imported directly from Ghana',
    price: 28.50,
    image: 'https://i.ytimg.com/vi/zhTpGwOfhP8/hqdefault.jpg',
    seller: {
      name: 'Natural Roots',
      rating: 4.9,
      location: 'Birmingham, UK'
    },
    category: 'Beauty & Wellness',
    views: 189,
    isPromoted: false
  },
  {
    id: '3',
    title: 'Hand-Carved Wooden Sculpture',
    description: 'Intricate wooden sculpture depicting African heritage',
    price: 125.00,
    image: 'https://i.pinimg.com/originals/f2/24/46/f22446deb79b0ac8dca99799bdae39e3.jpg',
    seller: {
      name: 'Heritage Crafts',
      rating: 4.7,
      location: 'Manchester, UK'
    },
    category: 'Artisan Crafts',
    views: 156,
    isPromoted: true
  },
  {
    id: '4',
    title: 'Jollof Rice Spice Kit',
    description: 'Complete spice kit for authentic West African jollof rice',
    price: 18.99,
    image: 'https://www.seriouseats.com/thmb/7sKUAr-eiORqD8wNRxPTgZkQmVU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/20220908-nigerianjollofricemaureen-celestine-33_1-ac2e8f95cc9d49bea95539997e45c97e.JPG',
    seller: {
      name: 'Mama\'s Kitchen',
      rating: 4.6,
      location: 'Leeds, UK'
    },
    category: 'Food & Groceries',
    views: 298,
    isPromoted: false
  },
  {
    id: '5',
    title: 'African Literature Collection',
    description: 'Curated selection of contemporary African literature',
    price: 89.99,
    image: 'https://blogs.lib.unc.edu/rbc/wp-content/uploads/sites/4/2017/03/africanlit1000.jpg',
    seller: {
      name: 'Cultural Pages',
      rating: 4.8,
      location: 'Bristol, UK'
    },
    category: 'Media & Culture',
    views: 142,
    isPromoted: false
  },
  {
    id: '6',
    title: 'Traditional Kente Cloth',
    description: 'Handwoven Kente cloth with traditional patterns and colors',
    price: 199.99,
    image: 'https://prod.wp.cdn.aws.wfu.edu/sites/417/2023/02/Kente-Strips-web-500.jpg',
    seller: {
      name: 'Royal Weavers',
      rating: 4.9,
      location: 'London, UK'
    },
    category: 'Fashion & Textiles',
    views: 267,
    isPromoted: true
  }
]

export function FeaturedProducts() {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
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
            Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Products</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Handpicked products from our trusted sellers, showcasing the finest African craftsmanship and culture
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="relative aspect-video">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                      <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-4">
                    <div className="flex items-center gap-1 text-white text-sm bg-black/50 px-2 py-1 rounded">
                      <Eye className="h-3 w-3" />
                      <span>{product.views}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white text-sm bg-black/50 px-2 py-1 rounded">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.seller.rating}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
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
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {product.seller.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{product.seller.name}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {product.seller.location}
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
              View All Products
              <ShoppingCart className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

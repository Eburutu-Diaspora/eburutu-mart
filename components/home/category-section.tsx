'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Palette, UtensilsCrossed, Hammer, BookOpen, Briefcase,
  Heart, ArrowRight, Smartphone, Home, Leaf,
} from 'lucide-react'
import  PromoSlotCircle  from './promo-slot-circle'

const iconMap: Record<string, React.ElementType> = {
  'fashion-clothing':  Palette,
  'food-groceries':    UtensilsCrossed,
  'beauty-haircare':   Heart,
  'art-crafts':        Hammer,
  'electronics':       Smartphone,
  'home-living':       Home,
  'health-wellness':   Leaf,
  'books-media':       BookOpen,
  'services':          Briefcase,
}

const colorMap: Record<string, string> = {
  'fashion-clothing':  'from-pink-500 to-rose-500',
  'food-groceries':    'from-orange-500 to-amber-500',
  'beauty-haircare':   'from-red-500 to-pink-500',
  'art-crafts':        'from-purple-500 to-indigo-500',
  'electronics':       'from-blue-500 to-cyan-500',
  'home-living':       'from-green-500 to-teal-500',
  'health-wellness':   'from-emerald-500 to-green-500',
  'books-media':       'from-blue-500 to-cyan-500',
  'services':          'from-green-500 to-emerald-500',
}

const imageMap: Record<string, string> = {
  'fashion-clothing':  'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800',
  'food-groceries':    'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800',
  'beauty-haircare':   'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800',
  'art-crafts':        'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800',
  'electronics':       'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
  'home-living':       'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
  'health-wellness':   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
  'books-media':       'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
  'services':          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
}

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  _count?: { products: number }
}

export function CategorySection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [categories, setCategories]           = useState<Category[]>([])
  const [promoSlots, setPromoSlots]           = useState<PromoSlot[]>([])

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    fetch('/api/promo-slots')
      .then(res => res.json())
      .then(data => setPromoSlots(Array.isArray(data) ? data : []))
      .catch(() => setPromoSlots([]))
  }, [])

  const circleLeft  = promoSlots.find(s => s.slotKey === 'circle_left')
  const circleRight = promoSlots.find(s => s.slotKey === 'circle_right')

  return (
    <section
      className="py-20"
      style={{ background: 'linear-gradient(to bottom, #fef9f0, #fff8ee, #ffffff)' }}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Our{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Categories
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover authentic African products across diverse categories, carefully curated for the diaspora community
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon         = iconMap[category.slug]  || Briefcase
            const color        = colorMap[category.slug] || 'from-gray-500 to-slate-500'
            const image        = imageMap[category.slug] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
            const productCount = category._count?.products ?? 0

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <Link href={`/categories/${category.slug}`}>
                  <Card className="group h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-primary">
                          {productCount} items
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${color} text-white`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">{category.description}</p>
                      <div className="flex items-center text-primary font-medium">
                        <span>Explore Collection</span>
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* ── View All Categories flanked by promo circles ── */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-8 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <PromoSlotCircle slot={circleLeft} />

          <Link href="/categories">
            <Card className="inline-block p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-lg font-medium">View All Categories</span>
              </div>
            </Card>
          </Link>

          <PromoSlotCircle slot={circleRight} />
        </motion.div>
      </div>
    </section>
  )
}

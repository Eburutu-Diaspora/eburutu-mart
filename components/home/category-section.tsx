
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Palette, 
  UtensilsCrossed, 
  Hammer, 
  BookOpen, 
  Briefcase, 
  Heart,
  ArrowRight 
} from 'lucide-react'

const categories = [
  {
    id: 'fashion-textiles',
    name: 'Fashion & Textiles',
    description: 'Authentic African clothing, fabrics, and accessories',
    image: 'https://i.pinimg.com/originals/f1/d1/ec/f1d1ecf7c069082a69a6fdac50377e1f.jpg',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    productCount: 1200
  },
  {
    id: 'food-groceries',
    name: 'Food & Groceries',
    description: 'Traditional African spices, ingredients, and delicacies',
    image: 'https://c8.alamy.com/comp/2G2CE0X/traditional-spices-market-in-morocco-africa-2G2CE0X.jpg',
    icon: UtensilsCrossed,
    color: 'from-orange-500 to-amber-500',
    productCount: 890
  },
  {
    id: 'artisan-crafts',
    name: 'Artisan Crafts',
    description: 'Handmade pottery, jewelry, sculptures, and artwork',
    image: 'https://i.pinimg.com/originals/a8/74/97/a874971f88cf808b4d85bb5411533bf1.jpg',
    icon: Hammer,
    color: 'from-purple-500 to-indigo-500',
    productCount: 650
  },
  {
    id: 'media-culture',
    name: 'Media & Culture',
    description: 'African books, music, films, and cultural content',
    image: 'https://eagle.co.ug/wp-content/uploads/2022/08/Best-Africa-Books-Feature-Image-1-1-1068x801.png',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    productCount: 420
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Cultural consulting, tutoring, and event planning',
    image: 'https://africanstakeholdersinc.org/wp-content/uploads/2024/07/ASI-LOGO.png',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    productCount: 280
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    description: 'Natural skincare, hair care, and wellness products',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisfr4dZ73h_FrbESM4elQCHxeLRfavWM0RQqbVMf4XtiJbEImYVJ_-gBqzSE3LDTs0Bq8QugP9hYun7o8iDrIIc9TRlkjoWQAxoMvRKkZI96crrCWtBLttBFI5OZ8aGjGUKM9Fx60KKGM/s1600/image6.jpeg',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    productCount: 550
  }
]

export function CategorySection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Categories</span>
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
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredCategory(category.id)}
              onHoverEnd={() => setHoveredCategory(null)}
            >
              <Link href={`/categories/${category.id}`}>
                <Card className="group h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-primary">
                        {category.productCount} items
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${category.color} text-white`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      <span>Explore Collection</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
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
        </motion.div>
      </div>
    </section>
  )
}

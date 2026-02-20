
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, ShoppingBag, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "Authentic African Products",
      subtitle: "Discover the richness of African culture",
      image: "https://cdn.abacus.ai/images/97a64b3c-8801-4bcf-982f-6d1e2d4c0027.png",
      cta: "Shop Now"
    },
    {
      title: "Taste of Africa",
      subtitle: "Explore authentic African cuisine & ingredients",
      image: "https://www.trailblazertravelz.com/wp-content/uploads/2022/06/african-cuisine.jpg",
      cta: "Explore Food"
    },
    {
      title: "Vibrant Marketplace",
      subtitle: "Connect with sellers from across Africa",
      image: "https://media.cntraveler.com/photos/5b742b149718bc562f0ff4a6/16:9/w_2560,c_limit/Greenmarket-Square_GettyImages-940753486.jpg",
      cta: "Start Selling"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent">
      <div className="absolute inset-0 bg-black/20" />
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between py-20 lg:py-28">
          {/* Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left mb-12 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-yellow-400 to-[#00c853] bg-clip-text text-transparent">
                EBURUTU MART
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Connect with your heritage, shop authentic African products, and celebrate African culture. 
              Join thousands of diaspora community members worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link href="/products">
                <Button variant="secondary" size="lg" className="group">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" size="lg" className="border-2 border-yellow-400 bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 hover:border-yellow-300">
                  Become a Seller
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">5000+</div>
                <div className="text-sm text-white/80">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">1200+</div>
                <div className="text-sm text-white/80">Sellers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">10K+</div>
                <div className="text-sm text-white/80">Members</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-white/90 text-sm">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
            </div>
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

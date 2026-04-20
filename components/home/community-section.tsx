'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  Shield,
  Heart,
  MessageCircle,
  Star,
  ShoppingBag,
  Package,
  UserPlus,
  ArrowRight,
  Globe,
  Zap,
} from 'lucide-react'

const communityStats = [
  {
    icon: Users,
    label: 'Active Members',
    value: 'Growing',
    growth: 'Join today',
    color: 'from-blue-500 to-purple-500'
  },
  {
    icon: Globe,
    label: 'Community Reach',
    value: 'Diaspora',
    growth: 'Everywhere',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Shield,
    label: 'Listing Fees',
    value: 'Free',
    growth: 'No fees, ever',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Heart,
    label: 'How It Works',
    value: 'Direct',
    growth: 'Buyer contacts seller',
    color: 'from-pink-500 to-rose-500'
  }
]

const testimonials = [
  {
    name: 'Adaora Okafor',
    role: 'Fashion Designer',
    location: 'London, UK',
    content: 'This marketplace has been a game-changer for my business. I\'ve connected with customers who truly appreciate authentic African fashion.',
    rating: 5,
    image: 'https://i.pinimg.com/originals/d8/7a/74/d87a74db04bf027492d0214a283a3760.jpg'
  },
  {
    name: 'Kwame Asante',
    role: 'Artisan Craftsman',
    location: 'Manchester, UK',
    content: 'Listing my handcrafted items was simple and free. The community here genuinely values tradition and quality craftsmanship.',
    rating: 5,
    image: 'https://i.pinimg.com/originals/33/ef/ef/33efefcf27c8d729b234046f384fb786.jpg'
  },
  {
    name: 'Fatima Al-Hassan',
    role: 'Food Entrepreneur',
    location: 'Birmingham, UK',
    content: 'Finding authentic African ingredients was always difficult until I discovered this marketplace. Now I can share my culture through food.',
    rating: 5,
    image: 'https://i.pinimg.com/originals/bd/06/e3/bd06e3b4de358b7c5700150e987b2850.jpg'
  }
]

const whyUs = [
  {
    icon: ShoppingBag,
    title: 'For Buyers',
    description: 'Find authentic African products from sellers in the diaspora everywhere.',
    color: 'bg-emerald-500',
    link: '/products'
  },
  {
    icon: Package,
    title: 'For Sellers',
    description: 'List your products free. No fees, no barriers. Start in minutes.',
    color: 'bg-purple-500',
    link: '/auth/register'
  },
  {
    icon: Users,
    title: 'For Everyone',
    description: 'A community built by and for the African diaspora. Browse, connect, celebrate.',
    color: 'bg-blue-500',
    link: '/community'
  }
]

export function CommunitySection() {
  return (
  <section className="py-20" style={{ background: 'linear-gradient(to bottom, #f0faf4, #e8f5ee, #ffffff)' }}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Why EburutuMart */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2 border-primary/20">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {whyUs.map((item, index) => (
                  <Link key={index} href={item.link} className="group">
                    <div className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className={`${item.color} p-3 rounded-lg text-white flex-shrink-0`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-base group-hover:text-primary transition-colors">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="border-t border-border p-3 bg-muted/20">
                <div className="flex items-center justify-center gap-8 text-center">
                  <Link href="/products" className="group">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Package className="w-4 h-4" />
                      <span>Browse Shop</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                  <Link href="/categories" className="group">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Globe className="w-4 h-4" />
                      <span>Explore Categories</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                 <Link href="/community" className="group">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <UserPlus className="w-4 h-4" />
                    <span>Join Community</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} text-white mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm font-medium mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.growth}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16 bg-gradient-to-br from-emerald-50/60 to-amber-50/40 rounded-3xl p-8">
  <motion.h3
    className="text-2xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What Our Community Says
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-muted-foreground italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="inline-block p-8 bg-gradient-to-r from-primary to-accent text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Ready to Join?</h3>
            </div>
            <p className="text-white/90 mb-6 max-w-md">
              Become part of our growing community and start your journey with authentic African culture
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button variant="secondary" size="lg">
                  Join as Buyer
                </Button>
              </Link>
              <Link href="/auth/register">
              <Button variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">
  Start Selling
</Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

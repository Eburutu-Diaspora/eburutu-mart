
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Globe, 
  Shield, 
  Heart,
  MessageCircle,
  Star,
  TrendingUp,
  ShoppingBag,
  Package,
  UserPlus,
  Sparkles,
  ArrowRight
} from 'lucide-react'

const communityStats = [
  {
    icon: Users,
    label: 'Active Members',
    value: '12,000+',
    growth: '+15% this month',
    color: 'from-blue-500 to-purple-500'
  },
  {
    icon: Globe,
    label: 'Countries Represented',
    value: '54',
    growth: 'All African nations',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Shield,
    label: 'Verified Sellers',
    value: '1,200+',
    growth: '99.8% satisfaction',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Heart,
    label: 'Community Reviews',
    value: '50K+',
    growth: '4.9 avg rating',
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
    content: 'The verification process gave me credibility, and the community support has been incredible. My handcrafted items now reach people who value tradition.',
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

// Community activity feed
const communityActivities = [
  {
    type: 'new_seller',
    icon: UserPlus,
    title: 'New Seller Joined',
    description: 'Amaka Crafts from Lagos joined our community',
    time: '2 hours ago',
    color: 'bg-emerald-500',
    link: '/products'
  },
  {
    type: 'new_listing',
    icon: Package,
    title: 'New Product Listed',
    description: 'Handwoven Kente Cloth now available',
    time: '3 hours ago',
    color: 'bg-purple-500',
    link: '/products'
  },
  {
    type: 'purchase',
    icon: ShoppingBag,
    title: 'Recent Purchase',
    description: 'Authentic Shea Butter sold to Manchester',
    time: '4 hours ago',
    color: 'bg-blue-500',
    link: '/products'
  },
  {
    type: 'review',
    icon: Star,
    title: '5-Star Review',
    description: '"Amazing quality!" - Customer from Birmingham',
    time: '5 hours ago',
    color: 'bg-amber-500',
    link: '/products'
  },
  {
    type: 'milestone',
    icon: Sparkles,
    title: 'Milestone Reached',
    description: 'Over 5,000 products now listed!',
    time: '1 day ago',
    color: 'bg-pink-500',
    link: '/categories'
  },
  {
    type: 'new_seller',
    icon: UserPlus,
    title: 'New Seller Joined',
    description: 'Kofi Textiles from Accra joined us',
    time: '1 day ago',
    color: 'bg-emerald-500',
    link: '/products'
  }
]

export function CommunitySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Thriving Community</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Connect with fellow members of the African diaspora, share culture, and build meaningful relationships
          </motion.p>
        </div>

        {/* Live Community Activity Feed */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
            <div className="bg-gradient-to-r from-primary to-accent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-lg font-bold text-white">Live Community Activity</h3>
                </div>
                <Link href="/products">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors">
                    View All <ArrowRight className="ml-1 h-3 w-3" />
                  </Badge>
                </Link>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {communityActivities.slice(0, 3).map((activity, index) => (
                  <Link key={index} href={activity.link}>
                    <div className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="flex items-start gap-3">
                        <div className={`${activity.color} p-2 rounded-lg text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm group-hover:text-primary transition-colors">{activity.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                          <p className="text-xs text-muted-foreground/70 mt-1">{activity.time}</p>
                        </div>
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
                      <span>Browse Products</span>
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
                  <Link href="/auth/register" className="group">
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
        <div className="mb-16">
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
                      "{testimonial.content}"
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
                <Button variant="secondary" size="lg" className="group">
                  Join as Buyer
                  <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" size="lg" className="border-2 border-yellow-400 bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 hover:border-yellow-300">
                  Start Selling
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

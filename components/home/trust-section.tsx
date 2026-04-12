
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  MessageCircle,
  Lock,
  Heart,
} from 'lucide-react'

const trustFeatures = [
  {
    icon: Shield,
    title: 'Open to All',
    description: 'No ID verification, no document uploads. Register with your email and start buying or selling immediately.',
    features: ['Email Confirmation Only', 'Instant Access', 'No Barriers', 'Free to Join']
  },
  {
    icon: MessageCircle,
    title: 'Direct Contact',
    description: 'Buyers and sellers communicate directly. No middlemen — just genuine community connections.',
    features: ['Direct Messaging', 'Seller Email Revealed', 'Privacy Protected', 'No Spam']
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your personal details are protected. Contact information is only shared when you choose to connect.',
    features: ['Contact Protection', 'Selective Sharing', 'Privacy Controls', 'Safe Browsing']
  },
  {
    icon: Heart,
    title: 'Community Driven',
    description: 'Built by and for the African diaspora. Our community guidelines ensure a respectful, positive experience.',
    features: ['Community Guidelines', 'Respectful Trading', 'Dispute Support', 'Feedback System']
  }
]

export function TrustSection() {
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
            Built on <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Trust & Community</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            EburutuMart is an open, free marketplace — no fees, just genuine community trading
          </motion.p>
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.features.map((item, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

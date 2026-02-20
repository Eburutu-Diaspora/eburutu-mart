
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  UserCheck, 
  Lock, 
  MessageCircle, 
  Star,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react'

const trustFeatures = [
  {
    icon: Shield,
    title: 'Verified Sellers Only',
    description: 'All sellers undergo a comprehensive verification process including identity, business, and document checks.',
    features: ['ID Verification', 'Business License Check', 'Address Confirmation', 'Admin Approval']
  },
  {
    icon: UserCheck,
    title: 'Secure Messaging',
    description: 'Built-in messaging system ensures safe communication between buyers and sellers.',
    features: ['In-App Messaging', 'Privacy Protection', 'Message History', 'Spam Prevention']
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Phone numbers and personal details are protected until both parties are verified members.',
    features: ['Contact Protection', 'Selective Sharing', 'Privacy Controls', 'Safe Transactions']
  },
  {
    icon: MessageCircle,
    title: 'Community Support',
    description: 'Our dedicated support team and active community ensure a positive experience for all.',
    features: ['24/7 Support', 'Community Guidelines', 'Dispute Resolution', 'Feedback System']
  }
]

const verificationSteps = [
  {
    step: 1,
    title: 'Email Verification',
    description: 'Confirm your email address to start the verification process',
    icon: Mail,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    step: 2,
    title: 'Phone Verification',
    description: 'Verify your phone number with a secure SMS code',
    icon: Phone,
    color: 'from-green-500 to-emerald-500'
  },
  {
    step: 3,
    title: 'Document Upload',
    description: 'Upload valid ID and business documents for verification',
    icon: CheckCircle,
    color: 'from-purple-500 to-pink-500'
  },
  {
    step: 4,
    title: 'Admin Approval',
    description: 'Our team reviews and approves your seller application',
    icon: UserCheck,
    color: 'from-orange-500 to-red-500'
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
            Built on <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Trust & Security</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our comprehensive verification system ensures a safe and trustworthy marketplace for the African diaspora community
          </motion.p>
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

        {/* Verification Process */}
        <div className="bg-muted/20 rounded-3xl p-8 md:p-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Seller Verification Process
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our multi-step verification ensures that only legitimate sellers can list products on our marketplace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {verificationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${step.color} text-white mb-4`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-sm text-primary font-bold mb-2">Step {step.step}</div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < verificationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">99.8% Seller Satisfaction Rate</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

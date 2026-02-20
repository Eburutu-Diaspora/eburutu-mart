'use client'

import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MessageCircle,
  Eye,
  Users,
  FileText,
  ThumbsUp,
  ThumbsDown,
  HelpCircle
} from 'lucide-react'

export default function SafetyGuidePage() {
  const dosList = [
    {
      title: 'Review Seller Profile',
      description: "Check seller profiles, reviews, and history before engaging. Note: Verified badges help but don't guarantee safety."
    },
    {
      title: 'Communicate Through Platform',
      description: 'Keep initial communications within the platform for your records and safety.'
    },
    {
      title: 'Ask Questions',
      description: 'Request additional photos, product details, or clarification before committing to a purchase.'
    },
    {
      title: 'Research Market Prices',
      description: 'Compare prices with similar products to ensure you\'re getting a fair deal.'
    },
    {
      title: 'Meet in Safe Locations',
      description: 'If meeting in person, choose public places and bring someone with you if possible.'
    },
    {
      title: 'Inspect Before Payment',
      description: 'When possible, inspect products before completing payment, especially for high-value items.'
    },
    {
      title: 'Keep Records',
      description: 'Save all communications, receipts, and transaction details for your records.'
    },
    {
      title: 'Use Secure Payment Methods',
      description: 'Choose payment methods that offer some level of buyer protection when available.'
    }
  ]

  const dontsList = [
    {
      title: 'Don\'t Pay Full Amount Upfront',
      description: 'Avoid sending full payment before receiving goods. Even verified sellers can pose risks - our verification helps but is not 100% foolproof.'
    },
    {
      title: 'Don\'t Share Personal Financial Information',
      description: 'Never share bank PINs, passwords, or sensitive financial details with sellers.'
    },
    {
      title: 'Don\'t Rush Into Transactions',
      description: 'Be wary of sellers who pressure you to make quick decisions or payments.'
    },
    {
      title: 'Don\'t Ignore Red Flags',
      description: 'If a deal seems too good to be true, it probably is. Trust your instincts.'
    },
    {
      title: 'Don\'t Meet Alone in Isolated Places',
      description: 'Avoid meeting sellers in private or secluded locations for your safety.'
    },
    {
      title: 'Don\'t Send Money via Untraceable Methods',
      description: 'Avoid payment methods that cannot be traced or disputed if something goes wrong.'
    }
  ]

  const redFlags = [
    'Prices significantly below market value',
    'Seller refuses to provide additional photos or information',
    'Pressure to complete transaction quickly',
    'Requests for unusual payment methods',
    'Seller avoids answering direct questions',
    'Inconsistent product descriptions',
    'New account with no reviews or history',
    'Poor communication or unprofessional responses'
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Link */}
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Safety Guide for <span className="text-primary">Buyers</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Eburutu Mart connects buyers with sellers. We do not process payments or handle transactions. 
            Please read this guide to protect yourself when dealing with sellers.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-400 mb-2">
                  Important Disclaimer
                </h3>
                <p className="text-amber-700 dark:text-amber-300">
                  Eburutu Mart is a free listing platform that connects buyers and sellers. 
                  <strong> We do not process payments, guarantee transactions, or hold funds.</strong> All 
                  payment arrangements are made directly between buyers and sellers. You are responsible 
                  for exercising due diligence when transacting with any seller on our platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Do's and Don'ts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Do's */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50 dark:bg-green-950/20">
              <CardTitle className="flex items-center gap-3 text-green-700 dark:text-green-400">
                <ThumbsUp className="w-6 h-6" />
                Do\'s - Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {dosList.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-400">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Don'ts */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50 dark:bg-red-950/20">
              <CardTitle className="flex items-center gap-3 text-red-700 dark:text-red-400">
                <ThumbsDown className="w-6 h-6" />
                Don\'ts - Avoid These
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {dontsList.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-400">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Red Flags Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Red Flags to Watch Out For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {redFlags.map((flag, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
                >
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-red-700 dark:text-red-400">{flag}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips for Safe Transactions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Research First</h3>
              <p className="text-sm text-muted-foreground">
                Always research products, compare prices, and check seller profiles before making any commitments.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Communicate Clearly</h3>
              <p className="text-sm text-muted-foreground">
                Establish clear terms, delivery expectations, and payment methods before proceeding with any transaction.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Document Everything</h3>
              <p className="text-sm text-muted-foreground">
                Keep records of all communications, agreements, and payment confirmations for your protection.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Verified Sellers Section */}
        <Card className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">About Verified Sellers</h3>
                <p className="text-muted-foreground mb-4">
                  Verified sellers have submitted documents for review. However, <strong>verification is not a guarantee 
                  of trustworthiness</strong> and does not make transactions risk-free. Our verification process helps 
                  but is not 100% foolproof. Always exercise caution and use your own judgement with all sellers.
                </p>
                <Badge className="bg-amber-500 text-white">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Verification ≠ Guarantee
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Need Help Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8 text-center">
            <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Need Help or Have Concerns?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              If you encounter any suspicious activity, fraudulent sellers, or have concerns about a listing, 
              please contact our support team immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Contact Support
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" size="lg">
                  Visit Help Center
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

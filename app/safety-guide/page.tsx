'use client'

import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  HelpCircle,
} from 'lucide-react'

export default function SafetyGuidePage() {
  const dosList = [
    {
      title: 'Review Seller Profiles',
      description:
        'Check seller profiles, community reviews, and transaction history before engaging. A strong, consistent history is a good indicator of a trustworthy seller.',
    },
    {
      title: 'Communicate by Email',
      description:
        'When you contact a seller, their email address is provided to you directly. Keep all communications in writing so you have a clear record of what was agreed.',
    },
    {
      title: 'Ask Questions First',
      description:
        'Request additional photos, specific measurements, condition details, or any other information you need before committing to a purchase. A reputable seller will be happy to help.',
    },
    {
      title: 'Research Market Prices',
      description:
        'Compare prices with similar products to ensure you are getting a fair deal. Prices significantly below market value should prompt further scrutiny.',
    },
    {
      title: 'Meet in Safe Locations',
      description:
        'If meeting in person, choose a well-lit, busy public location such as a shopping centre or café. Bring someone with you where possible.',
    },
    {
      title: 'Inspect Before Payment',
      description:
        'Wherever possible, inspect products thoroughly before making any payment, particularly for higher-value items. Never pay solely on the basis of photos.',
    },
    {
      title: 'Keep Records',
      description:
        'Save all email communications, agreed terms, and any payment confirmations. A clear written record protects both parties if a dispute arises.',
    },
    {
      title: 'Use Traceable Payment Methods',
      description:
        'Wherever possible, choose payment methods that can be traced or disputed if something goes wrong. Avoid untraceable cash transfers for high-value transactions.',
    },
  ]

  const dontsList = [
    {
      title: "Don't Pay the Full Amount Upfront",
      description:
        'Avoid sending full payment before receiving and inspecting goods, particularly for higher-value items. Exercise caution and agree on a payment approach that protects both parties.',
    },
    {
      title: "Don't Share Personal Financial Information",
      description:
        'Never share bank PINs, passwords, or sensitive financial details with anyone on the platform under any circumstances.',
    },
    {
      title: "Don't Rush Into Transactions",
      description:
        'Be cautious of anyone who pressures you to make quick decisions or payments. Legitimate sellers will allow you the time you need to make an informed decision.',
    },
    {
      title: "Don't Ignore Red Flags",
      description:
        'If a deal seems too good to be true, or something feels off, trust your instincts. Walk away and report the listing to our support team.',
    },
    {
      title: "Don't Meet Alone in Isolated Places",
      description:
        'Always meet sellers in public, visible locations. Avoid private residences or secluded areas, particularly for a first meeting.',
    },
    {
      title: "Don't Use Untraceable Payment Methods",
      description:
        'Avoid payment methods that cannot be traced or disputed if something goes wrong. Always choose methods that give you a record of the transaction.',
    },
  ]

  const redFlags = [
    'Prices significantly below market value',
    'Seller refuses to provide additional photos or information',
    'Pressure to complete the transaction quickly',
    'Requests for unusual or untraceable payment methods',
    'Seller avoids answering direct questions',
    'Inconsistent or vague product descriptions',
    'New account with no reviews or transaction history',
    'Poor communication or unprofessional responses',
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
            EburutuMart connects buyers with sellers directly. We do not process payments or handle
            transactions. Please read this guide carefully to help protect yourself when dealing
            with sellers on our platform.
          </p>
        </div>

        {/* Important Disclaimer */}
        <Card className="mb-8 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-400 mb-2">
                  Important Disclaimer
                </h3>
                <p className="text-amber-700 dark:text-amber-300">
                  EburutuMart is a free listing platform that connects buyers and sellers.{' '}
                  <strong>
                    We do not process payments, guarantee transactions, or hold funds.
                  </strong>{' '}
                  All payment arrangements are made directly between buyers and sellers. You are
                  responsible for exercising due diligence when transacting with any seller on our
                  platform.
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
                Do&apos;s — Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {dosList.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-400">
                      {item.title}
                    </h4>
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
                Don&apos;ts — Avoid These
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
                Always research products, compare prices, and review seller profiles before making
                any commitments.
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
                Establish clear terms, delivery expectations, and payment methods in writing by
                email before proceeding with any transaction.
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
                Keep records of all communications, agreements, and payment confirmations for your
                protection throughout the process.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Community Trust Section — replaces "About Verified Sellers" */}
        <Card className="mb-12 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Built on Community Trust</h3>
                <p className="text-muted-foreground">
                  Every member of EburutuMart has confirmed their email address, ensuring all
                  accounts belong to real, contactable people. Seller profiles display honest
                  community reviews and transaction histories so you can make well-informed
                  decisions. Trust on our platform is earned through genuine interactions, not
                  assigned by us. We encourage you to read reviews carefully, ask questions, and
                  take the time you need before committing to any transaction.
                </p>
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
              If you encounter any suspicious activity, have concerns about a listing, or need
              assistance with a transaction, please contact our support team immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Contact Support</Button>
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

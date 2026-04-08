

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import {
  Shield,
  Users,
  Star,
  MessageCircle,
  Flag,
  CheckCircle,
  ArrowLeft,
  ShoppingBag,
  Heart,
} from 'lucide-react'

export default function TrustSafetyPage() {
  const trustFeatures = [
    {
      icon: CheckCircle,
      title: 'Email Verified Members',
      description:
        'Every member on EburutuMart has verified their email address. This ensures all buyers and sellers are real people in our community.',
    },
    {
      icon: Star,
      title: 'Community Reviews',
      description:
        'After every transaction, buyers and sellers can leave honest reviews. Reputation is earned through real community interactions.',
    },
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description:
        'Buyers and sellers communicate directly through our messaging system before any deal is made. Ask questions, verify details, build confidence.',
    },
    {
      icon: Flag,
      title: 'Report & Flag System',
      description:
        'See something suspicious? Every listing and profile has a report button. Our team reviews all reports promptly.',
    },
    {
      icon: Users,
      title: 'Community Accountability',
      description:
        'Like Facebook Marketplace and Gumtree, trust is built through community transparency — visible profiles, photos, and review histories.',
    },
    {
      icon: Shield,
      title: 'Safe Trading Tips',
      description:
        'We provide guidance on how to trade safely — meet in public places, verify items before payment, trust your instincts.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Trust &amp; Safety</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            EburutuMart is an open marketplace — anyone can buy or sell. Trust is built through
            community, transparency, and accountability, not paperwork.
          </p>
        </div>

        {/* Open marketplace statement */}
        <Card className="mb-10 border-primary/20 bg-primary/5">
          <CardContent className="p-6 flex items-start gap-4">
            <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-semibold text-lg mb-1">Open to Everyone</h2>
              <p className="text-muted-foreground">
                Like Facebook Marketplace and Gumtree, EburutuMart is free and open. No ID
                required, no documents, no approval process. Just verify your email and start
                buying or selling immediately. We believe in low friction and high community trust.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {trustFeatures.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safe trading tips */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Safe Trading Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Meet in a public place for local collections',
                'Inspect items thoroughly before completing any deal',
                'Use our messaging system — keep communication on platform',
                'Never pay in advance for items you have not seen',
                'Trust your instincts — if something feels wrong, walk away',
                'Report suspicious listings or behaviour immediately',
                'Check the seller\'s profile, reviews and listing history',
                'For high-value items, bring someone with you',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary/5 via-accent/5 to-emerald-500/5 rounded-2xl p-8 border border-primary/10">
          <ShoppingBag className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Ready to Join?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Register in minutes — no documents, no waiting, no fees. Just verify your email and
            start connecting with the African diaspora community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Create Account
            </Link>
            <Link
              href="/products"
              className="border border-border px-6 py-3 rounded-lg hover:bg-muted transition-colors font-semibold"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

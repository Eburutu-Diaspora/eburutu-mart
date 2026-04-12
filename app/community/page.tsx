'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import {
  Users,
  Globe,
  Heart,
  MessageCircle,
  ShoppingBag,
  Package,
  Zap,
  Send,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Music,
  Utensils,
  Shirt,
  ExternalLink,
} from 'lucide-react'

const reasons = [
  {
    icon: ShoppingBag,
    title: 'Find Authentic Products',
    description: 'Discover genuine African goods from sellers in the diaspora — food, fashion, crafts, beauty and more.',
    color: 'bg-emerald-500',
    light: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
  {
    icon: Package,
    title: 'Sell for Free',
    description: 'List your products with zero fees, zero barriers. No ID checks. Start selling in minutes after email confirmation.',
    color: 'bg-purple-500',
    light: 'bg-purple-50',
    text: 'text-purple-700',
  },
  {
    icon: Globe,
    title: 'Diaspora Everywhere',
    description: 'Connect with African diaspora members across the UK and beyond. Culture has no borders.',
    color: 'bg-blue-500',
    light: 'bg-blue-50',
    text: 'text-blue-700',
  },
  {
    icon: Heart,
    title: 'Built With Love',
    description: 'EburutuMart is built by and for the African diaspora community — not a corporation, a community.',
    color: 'bg-rose-500',
    light: 'bg-rose-50',
    text: 'text-rose-700',
  },
  {
    icon: MessageCircle,
    title: 'Direct Connections',
    description: 'No middlemen. Buyers contact sellers directly. Real relationships, real trust.',
    color: 'bg-amber-500',
    light: 'bg-amber-50',
    text: 'text-amber-700',
  },
  {
    icon: Zap,
    title: 'Instant Access',
    description: 'Register, confirm your email and you are in. Browse, list, and connect immediately.',
    color: 'bg-teal-500',
    light: 'bg-teal-50',
    text: 'text-teal-700',
  },
]

const browseCategories = [
  { icon: Shirt, label: 'Fashion & Clothing', color: 'text-pink-500' },
  { icon: Utensils, label: 'Food & Groceries', color: 'text-orange-500' },
  { icon: Sparkles, label: 'Beauty & Haircare', color: 'text-rose-500' },
  { icon: Music, label: 'Books & Media', color: 'text-blue-500' },
  { icon: Package, label: 'Art & Crafts', color: 'text-purple-500' },
  { icon: Heart, label: 'Health & Wellness', color: 'text-emerald-500' },
]

const socialChannels = [
  {
    name: 'X (Twitter)',
    handle: '@eburutumart',
    href: 'https://x.com/eburutumart',
    bg: 'bg-slate-700',
    hover: 'hover:bg-slate-800',
  },
  {
    name: 'TikTok',
    handle: '@eburutu_diaspora',
    href: 'https://www.tiktok.com/@eburutu_diaspora',
    bg: 'bg-gray-900',
    hover: 'hover:bg-black',
  },
  {
    name: 'YouTube',
    handle: '@eburutumart',
    href: 'https://www.youtube.com/@eburutumart',
    bg: 'bg-red-500',
    hover: 'hover:bg-red-600',
  },
]

export default function CommunityPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('success')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-amber-600 text-white py-24 px-4">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full" />
            <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-white/5 rounded-full" />
          </div>
          <div className="relative container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              Open to Everyone — Free, Always
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The African Diaspora
              <br />
              <span className="text-yellow-300">Marketplace Community</span>
            </h1>
            <p className="text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
              Buy, sell, and connect with fellow diaspora members across the UK and beyond.
              No fees. No barriers. Just community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg inline-flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Join the Community
                </button>
              </Link>
              <Link href="/products">
                <button className="bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 inline-flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Browse the Shop
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Join */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join EburutuMart?</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Everything you need to buy, sell, and connect — built for the African diaspora.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((reason) => {
                const ReasonIcon = reason.icon
                return (
                  <div key={reason.title} className={`${reason.light} rounded-2xl p-6 hover:shadow-md transition-all duration-200`}>
                    <div className={`${reason.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <ReasonIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`font-bold text-lg mb-2 ${reason.text}`}>{reason.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Categories strip */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
              What you can find here
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {browseCategories.map((cat) => {
                const CatIcon = cat.icon
                return (
                  <Link key={cat.label} href="/categories">
                    <div className="flex items-center gap-2 bg-background border rounded-full px-4 py-2 text-sm font-medium hover:shadow-md transition-all duration-200 hover:scale-105">
                      <CatIcon className={`w-4 h-4 ${cat.color}`} />
                      {cat.label}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Follow the Community</h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
              Stay connected on social media for new listings, seller spotlights, and diaspora stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {socialChannels.map((s) => (
                
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.bg} ${s.hover} text-white flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-md`}
                >
                  <ExternalLink className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-xs opacity-75">{s.name}</div>
                    <div className="font-semibold">{s.handle}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-70" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="container max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Send className="w-4 h-4 text-emerald-400" />
              Community Newsletter
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-white/70 mb-10 text-lg leading-relaxed">
              New listings, seller spotlights, and diaspora stories — straight to your inbox.
              No spam. Unsubscribe any time.
            </p>
            {status === 'success' ? (
              <div className="flex items-center justify-center gap-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl px-6 py-5 text-emerald-300 font-medium text-lg">
                <CheckCircle className="w-6 h-6" />
                You are in! Welcome to the community.
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setStatus('idle')
                  }}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400 transition"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === 'loading'}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 justify-center"
                >
                  {status === 'loading' ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Subscribe
                </button>
              </div>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-3">Please enter a valid email address.</p>
            )}
            <p className="text-white/40 text-xs mt-4">
              By subscribing you agree to our Privacy Policy. Free, always.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="container max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Join as a buyer, a seller, or just browse. EburutuMart is open to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <button className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg inline-flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Create Free Account
                </button>
              </Link>
              <Link href="/products">
                <button className="border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold px-8 py-4 rounded-xl transition-all duration-200 inline-flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Browse Without Signing Up
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

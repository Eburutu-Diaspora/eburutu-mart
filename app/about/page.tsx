
'use client'

import Link from 'next/link'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import {
  Users,
  Globe,
  Lightbulb,
  Heart,
  Shield,
  Target,
  ShoppingBag,
} from 'lucide-react'

// ─── Stats ───────────────────────────────────────────────────────────────────
// CHANGED: "Free / Verified Sellers" → "Open / Active Listings"
const stats = [
  {
    icon: <Users className="w-8 h-8" />,
    value: 'Growing',
    label: 'Active Members',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    value: '54',
    label: 'Countries Represented',
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    value: '£0',
    label: 'Always Free',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    value: 'Open',
    label: 'To Everyone',
  },
]

// ─── Values ──────────────────────────────────────────────────────────────────
// CHANGED: Trust & Safety description — removed "seller verification" language
const values = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Cultural Heritage',
    description:
      'Preserving and celebrating authentic African culture and traditions through commerce and community connection.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Trust & Safety',
    description:
      'A secure platform built on community accountability, transparent profiles, honest reviews, and mutual respect for all members.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community First',
    description:
      'Building meaningful connections within the African diaspora through shared cultural experiences and values.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Quality Focus',
    description:
      'Curating authentic, high-quality products that represent the finest of African craftsmanship and culture.',
  },
]

export default function AboutPage() {
  return (
   <div className="min-h-screen bg-white">
        <Header />
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-10">
          ← Back to Home
        </Link>

        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-emerald-700">Eburutu</span>{' '}
            <span className="text-amber-600">Mart</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We&apos;re building the premier destination for authentic African products and cultural
            connections, empowering the diaspora community across the UK to celebrate heritage
            through commerce.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-emerald-700 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-emerald-900 to-amber-700 rounded-3xl p-10 text-white text-center mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-5">
            <Lightbulb className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-white/85 text-lg max-w-2xl mx-auto leading-relaxed">
            To create a thriving digital marketplace that connects the African diaspora community in
            the UK with authentic products, services, and cultural experiences from across Africa. We
            believe in preserving heritage, supporting artisans, and building bridges that span
            continents.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mb-3">
                  {value.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Eburutu Mart was born from a simple yet powerful observation: members of the African
                diaspora in the UK struggled to find authentic products that connected them to their
                cultural roots.
              </p>
              <p>
                Founded in 2024, we started as a community initiative to help African entrepreneurs
                showcase their products to a wider audience. We are building the go-to platform for
                authentic African commerce in the UK.
              </p>
              <p>
                Our platform goes beyond transactions — we&apos;re building a community that celebrates
                African heritage, supports emerging businesses, and creates meaningful connections
                across the diaspora.
              </p>
            </div>
          </div>
          <div className="border border-gray-100 rounded-2xl p-8 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Join Us</h3>
            <p className="text-gray-500 mb-6">Be part of the community we&apos;re building together</p>
            <Link
             href="/auth/register"
              className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-800 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>

   </div>
        <Footer />
  </div>
)
}

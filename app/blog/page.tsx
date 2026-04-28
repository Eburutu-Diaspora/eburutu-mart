'use client'

import { useState } from 'react'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowRight, BookOpen, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const categoryColors: Record<string, string> = {
  'Culture & Heritage':        'bg-amber-100 text-amber-800 border-amber-200',
  'Business & Entrepreneurship': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Lifestyle & Identity':      'bg-purple-100 text-purple-800 border-purple-200',
  'Food & Recipes':            'bg-orange-100 text-orange-800 border-orange-200',
  'Diaspora Life UK':          'bg-blue-100 text-blue-800 border-blue-200',
}

const blogPosts = [
  {
    id: '1',
    slug: 'preserving-african-heritage-in-the-diaspora',
    title: 'Preserving African Heritage: A Practical Guide for Diaspora Families in the UK',
    excerpt: 'Discover proven ways to keep your African roots alive while raising children in Britain. From language preservation to cultural celebrations and traditional food — here is how diaspora families pass on their heritage.',
    author: 'Adaeze Okonkwo',
    date: '2026-02-05',
    readTime: '8 min read',
    category: 'Culture & Heritage',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop',
    featured: true
  },
  {
    id: '2',
    slug: 'building-successful-diaspora-business',
    title: 'From Side Hustle to Empire: How to Build a Thriving African Diaspora Business in the UK',
    excerpt: 'Learn from African entrepreneurs who turned their cultural knowledge into thriving UK businesses. Practical tips on starting, registering, scaling and sustaining a business that bridges Africa and Britain.',
    author: 'Kwame Mensah',
    date: '2026-02-01',
    readTime: '12 min read',
    category: 'Business & Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop',
    featured: true
  },
  {
    id: '3',
    slug: 'navigating-dual-identity',
    title: 'Navigating Dual Identity: How to Thrive as an African in the UK Without Losing Yourself',
    excerpt: 'Balancing African and British identity is one of the most common struggles in the diaspora. Expert advice on embracing your dual identity — for yourself and your children — with pride and confidence.',
    author: 'Fatima Ibrahim',
    date: '2026-01-28',
    readTime: '10 min read',
    category: 'Lifestyle & Identity',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: '4',
    slug: 'african-cuisine-diaspora-kitchen',
    title: 'The Diaspora Kitchen: Authentic African Ingredients and Traditional Recipes in the UK',
    excerpt: 'Missing the taste of home? We show you exactly where to source palm oil, stockfish, egusi and crayfish in the UK — and how to cook jollof rice, egusi soup and suya in a British kitchen.',
    author: 'Chef Amara Diallo',
    date: '2026-01-20',
    readTime: '7 min read',
    category: 'Food & Recipes',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: '5',
    slug: 'moving-to-uk-from-africa-guide',
    title: 'Moving to the UK from Africa: Everything Nobody Tells You Before You Arrive',
    excerpt: 'From opening a UK bank account with no credit history to registering with the NHS and finding community — the practical guide every African migrant to Britain needs but rarely finds in one place.',
    author: 'Blessing Eze',
    date: '2026-01-15',
    readTime: '11 min read',
    category: 'Diaspora Life UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: '6',
    slug: 'sell-african-products-uk',
    title: 'How to Legally Sell African Food and Products in the UK: Licences, Labelling and Where to Start',
    excerpt: 'Thousands of diaspora entrepreneurs want to sell authentic African groceries and products in the UK. This step-by-step guide covers food safety, HMRC registration, product labelling and where to begin.',
    author: 'Kofi Asante',
    date: '2026-01-10',
    readTime: '9 min read',
    category: 'Business & Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop',
    featured: false
  }
]

function AuthorInitial({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0">
      {name.charAt(0)}
    </span>
  )
}

export default function BlogPage() {
  const [subEmail, setSubEmail] = useState('')
  const [subDone, setSubDone] = useState(false)

  const handleSubscribe = async () => {
    if (!subEmail || !subEmail.includes('@')) return
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: subEmail }),
    })
    setSubDone(true)
    setSubEmail('')
  }

  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts  = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent">
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <BookOpen className="w-4 h-4" />
              Diaspora Stories &amp; Guides
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              The EburutuMart<br />
              <span className="text-white/80">Community Blog</span>
            </h1>
            <p className="text-lg text-white/80 max-w-xl leading-relaxed">
              Real stories, practical guides and expert insights for Africans thriving in
              the UK diaspora — culture, business, food, identity and life in Britain.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Featured Posts */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-8 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold">Featured Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                <div className="h-full rounded-2xl overflow-hidden border border-border bg-card hover:shadow-2xl hover:border-primary/30 transition-all duration-300">
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AuthorInitial name={post.author} />
                        <span className="font-medium text-foreground">{post.author}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Latest</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Regular Posts */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-8 bg-accent rounded-full" />
            <h2 className="text-2xl font-bold">Latest Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="flex gap-4 p-4 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
                      {post.category}
                    </span>
                    <h3 className="font-bold text-sm mt-2 mb-1.5 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <AuthorInitial name={post.author} />
                      <span>{post.author}</span>
                      <span>·</span>
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-8 md:p-14 text-center text-white">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-14 -left-14 w-60 h-60 rounded-full bg-white/10 pointer-events-none" />
          <div className="relative">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Newsletter
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Connected to Your Roots</h2>
            <p className="text-white/80 mb-2 max-w-lg mx-auto">
              Join thousands of Africans in the UK diaspora who get our weekly articles,
              marketplace updates and community news delivered to their inbox.
            </p>
            <p className="text-white/60 text-xs mb-8">No spam. Unsubscribe any time.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              {subDone ? (
                <p className="text-white font-semibold py-3">✓ You&apos;re subscribed! Welcome to the community.</p>
              ) : (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                  />
                  <Button
                    onClick={handleSubscribe}
                    className="bg-white text-primary hover:bg-white/90 px-6 rounded-xl font-semibold"
                  >
                    Subscribe Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

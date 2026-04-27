'use client'

import { useState } from 'react'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowRight, BookOpen, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const blogPosts = [
  {
    id: '1',
    slug: 'preserving-african-heritage-in-the-diaspora',
    title: 'Preserving African Heritage: A Practical Guide for Diaspora Families in the UK',
    excerpt: 'Discover proven ways to keep your African roots alive while raising children in Britain. From Yoruba and Igbo language preservation to cultural celebrations and traditional food — here is how diaspora families are passing on their heritage to the next generation.',
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
    excerpt: 'Learn from African entrepreneurs who turned their cultural knowledge into thriving UK businesses. Practical tips on starting, registering, scaling and sustaining a business that bridges Africa and Britain — from food and fashion to services and e-commerce.',
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
    excerpt: 'Balancing African and British identity is one of the most common struggles in the diaspora. Personal stories and expert advice on embracing your dual identity — for yourself and your children — with pride, confidence and self-awareness.',
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
    title: 'The Diaspora Kitchen: How to Source Authentic African Ingredients and Cook Traditional Recipes in the UK',
    excerpt: 'Missing the taste of home? We show you exactly where to source palm oil, stockfish, egusi, crayfish and fresh African vegetables in the UK — and how to adapt traditional recipes like jollof rice, egusi soup and suya for a British kitchen.',
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
    excerpt: 'From opening a UK bank account without a credit history to registering with the NHS, navigating council tax and finding African community groups — the practical guide every African migrant to Britain needs but rarely finds in one place.',
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
    excerpt: 'Thousands of diaspora entrepreneurs want to sell authentic African groceries, skincare and crafts in the UK but don\'t know where to start with food safety regulations, HMRC registration and product labelling. This guide covers everything step by step.',
    author: 'Kofi Asante',
    date: '2026-01-10',
    readTime: '9 min read',
    category: 'Business & Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop',
    featured: false
  }
]

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
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <BookOpen className="w-4 h-4 mr-2" />
            Diaspora Stories & Guides
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The <span className="text-primary">EburutuMart</span> Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real stories, practical guides and expert insights for Africans thriving in the UK diaspora.
            From preserving your culture and building a business to navigating British life —
            everything the African community in Britain needs in one place.
          </p>
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-accent-foreground">{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Regular Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-2 h-8 bg-accent rounded-full"></span>
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/30">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <Badge variant="outline" className="mb-2">{post.category}</Badge>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Connected to Your Roots
          </h2>
          <p className="text-white/90 mb-2 max-w-xl mx-auto">
            Join thousands of Africans in the UK diaspora who get our weekly articles,
            marketplace updates and community news delivered straight to their inbox.
          </p>
          <p className="text-white/70 text-sm mb-6 max-w-xl mx-auto">
            No spam. Unsubscribe any time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            {subDone ? (
              <p className="text-white font-semibold py-3">
                ✓ You&apos;re subscribed! Welcome to the community.
              </p>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button
                  onClick={handleSubscribe}
                  className="bg-white text-primary hover:bg-white/90 px-6"
                >
                  Subscribe Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

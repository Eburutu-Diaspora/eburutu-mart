'use client'

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
    title: 'Preserving African Heritage: A Guide for Diaspora Families',
    excerpt: 'Discover practical ways to keep your African roots alive while building a life abroad. From language preservation to cultural celebrations, here\'s how to pass on your heritage to the next generation.',
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
    title: 'From Side Hustle to Empire: Building a Successful Diaspora Business',
    excerpt: 'Learn from African entrepreneurs who turned their cultural knowledge into thriving businesses. Tips on starting, scaling, and sustaining a business that bridges continents.',
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
    title: 'Navigating Dual Identity: Thriving as an African in the UK',
    excerpt: 'Balancing two cultures can be challenging but also incredibly rewarding. Personal stories and expert advice on embracing your dual identity with pride and confidence.',
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
    title: 'The Diaspora Kitchen: Bringing African Flavours to Your Table',
    excerpt: 'Missing the taste of home? Explore how to source authentic ingredients, adapt traditional recipes, and create a thriving food culture in your new home.',
    author: 'Chef Amara Diallo',
    date: '2026-01-20',
    readTime: '7 min read',
    category: 'Food & Recipes',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&auto=format&fit=crop',
    featured: false
  }
]

export default function BlogPage() {
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
            Diaspora Stories
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Blog</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories, insights, and guides for Africans thriving in the diaspora. 
            Connect with your heritage while building your future.
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
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Get the latest articles, marketplace updates, and community news delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button className="bg-white text-primary hover:bg-white/90 px-6">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

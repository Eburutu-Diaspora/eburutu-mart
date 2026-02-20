
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, MapPin, Heart, ShoppingBag, Users, Sparkles, Send, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

// Social Media Icons as SVG components
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
)

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

// Social media links configuration
const socialLinks = [
  { name: 'Facebook', icon: FacebookIcon, href: '#', color: 'hover:text-blue-500' },
  { name: 'Instagram', icon: InstagramIcon, href: '#', color: 'hover:text-pink-500' },
  { name: 'Twitter', icon: TwitterIcon, href: '#', color: 'hover:text-slate-300' },
  { name: 'TikTok', icon: TikTokIcon, href: '#', color: 'hover:text-white' },
  { name: 'YouTube', icon: YouTubeIcon, href: '#', color: 'hover:text-red-500' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubscribing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribing(false)
    setIsSubscribed(true)
    setEmail('')
    toast.success('Welcome to the Eburutu Mart community!')
    
    // Reset subscribed state after 5 seconds
    setTimeout(() => setIsSubscribed(false), 5000)
  }
  
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Top Border */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
      
      {/* Main Footer Content */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Brand - Takes 4 columns */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-4 group">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-orange-300 transition-all">
                    EBURUTU MART
                  </span>
                  <span className="text-xs font-semibold tracking-[0.2em] bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mt-1">
                    CONNECT | SHOP | CELEBRATE
                  </span>
                </div>
              </Link>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                Connecting the African diaspora through authentic products, services, and cultural exchange.
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-pink-400" />
                  <span className="text-slate-300">United Kingdom</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-purple-400" />
                  <span className="text-slate-300">info@eburutumart.com</span>
                </div>
              </div>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center space-x-1 text-xs bg-purple-500/20 px-2 py-1 rounded-full border border-purple-500/30">
                  <ShoppingBag className="h-3 w-3 text-purple-400" />
                  <span className="text-purple-300">Authentic Products</span>
                </div>
                <div className="flex items-center space-x-1 text-xs bg-pink-500/20 px-2 py-1 rounded-full border border-pink-500/30">
                  <Users className="h-3 w-3 text-pink-400" />
                  <span className="text-pink-300">Verified Sellers</span>
                </div>
                <div className="flex items-center space-x-1 text-xs bg-orange-500/20 px-2 py-1 rounded-full border border-orange-500/30">
                  <Sparkles className="h-3 w-3 text-orange-400" />
                  <span className="text-orange-300">Cultural Heritage</span>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div>
                <p className="text-xs text-slate-500 mb-2">Follow us on social media</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 bg-slate-800/60 rounded-full border border-slate-700/50 text-slate-400 transition-all duration-300 hover:scale-110 hover:border-slate-600 ${social.color}`}
                      aria-label={social.name}
                    >
                      <social.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links - Takes 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-white mb-4 flex items-center text-sm">
                <span className="w-6 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mr-2"></span>
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-slate-400 hover:text-purple-400 transition-colors flex items-center group text-sm">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    Browse Products
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-slate-400 hover:text-pink-400 transition-colors flex items-center group text-sm">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-pink-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-orange-400 transition-colors flex items-center group text-sm">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center group text-sm">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Sellers - Takes 2 columns */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-white mb-4 flex items-center text-sm">
                <span className="w-6 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 mr-2"></span>
                For Sellers
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/auth/register" className="text-slate-400 hover:text-amber-400 transition-colors flex items-center group text-sm">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    Start Selling
                  </Link>
                </li>
                <li>
                  <Link href="/verification" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center group text-sm">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    Seller Verification
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center group text-sm">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup - Takes 4 columns */}
            <div className="lg:col-span-4">
              <h3 className="font-bold text-white mb-4 flex items-center text-sm">
                <span className="w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 mr-2"></span>
                Newsletter
              </h3>
              <p className="text-slate-400 text-sm mb-3">
                Join our community for exclusive updates and African diaspora stories.
              </p>
              
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-lg border border-emerald-500/30">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">You&apos;re subscribed!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                      disabled={isSubscribing}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium py-2.5 px-4 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Subscribe
                      </>
                    )}
                  </button>
                </form>
              )}
              
              <p className="text-xs text-slate-500 mt-3">
                Join 10,000+ African diaspora members worldwide
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700/50 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-slate-500 flex items-center">
              © {currentYear} Eburutu Mart. Made with 
              <Heart className="h-3 w-3 mx-1 text-pink-500 fill-pink-500" />
              for the African Diaspora
            </p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <Link href="/privacy" className="text-xs text-slate-500 hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-slate-500 hover:text-pink-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

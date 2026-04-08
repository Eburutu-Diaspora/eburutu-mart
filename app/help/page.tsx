"use client";

import Link from 'next/link'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import {
  HelpCircle,
  MessageSquare,
  Book,
  Search,
  Users,
  Package,
  CreditCard,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Shield,
  Eye,
  CheckCircle,
  AlertCircle,
  Lock,
  UserCheck,
  Flag,
  Lightbulb,
} from 'lucide-react'

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

interface FAQItem {
  question: string
  answer: string
}

interface FAQSection {
  title: string
  icon: React.ReactNode
  color: string
  items: FAQItem[]
}

const faqSections: FAQSection[] = [
  {
    title: 'Getting Started',
    icon: <Users className="w-5 h-5" />,
    color: 'text-emerald-600',
    items: [
      {
        question: 'How do I create an account?',
        answer:
          'Click "Join Now" in the top right corner and choose whether you want to register as a buyer or seller. Fill in your name, email address, and password. You will receive a confirmation email — click the link inside to activate your account and you are ready to go. The whole process takes under two minutes.',
      },
      {
        question: "What's the difference between a buyer and seller account?",
        answer:
          'Buyer accounts let you browse the marketplace, search for products, save favourites to a wishlist, and contact sellers directly. Seller accounts include everything a buyer can do, plus a personal dashboard where you can create and manage your own listings, upload product photos, set prices, and receive enquiries from interested buyers. You can register as both if you want to buy and sell.',
      },
      {
        question: 'Is registration free?',
        answer:
          'Yes — completely free, for everyone, forever. There are no listing fees, no subscription charges, no commission taken from your sales, and no hidden costs of any kind. EburutuMart exists to serve the African diaspora community, not to profit from it.',
      },
      {
        question: 'Can I use EburutuMart if I am outside the UK?',
        answer:
          'Absolutely. While EburutuMart is based in the UK and primarily serves the African diaspora community here, anyone from anywhere in the world can register, browse, and list products. Delivery and collection arrangements are agreed directly between buyers and sellers, so international transactions are entirely possible.',
      },
      {
        question: 'Do I need to be of African heritage to join?',
        answer:
          'Not at all. EburutuMart is open to everyone who appreciates authentic African products and culture. Whether you are a member of the diaspora, a friend of the community, or simply someone who loves African goods, you are warmly welcome.',
      },
      {
        question: "I registered but haven't received a confirmation email. What should I do?",
        answer:
          'First, check your spam or junk folder — confirmation emails sometimes land there. If you still cannot find it, return to the login page and use the "Resend confirmation email" option. If the problem continues, contact us at info@eburutumart.com and we will sort it out promptly.',
      },
    ],
  },
  {
    title: 'Buying Products',
    icon: <Package className="w-5 h-5" />,
    color: 'text-blue-600',
    items: [
      {
        question: 'How do I search for products?',
        answer:
          'Use the search bar at the top of any page to search by keyword, product name, or category. You can also browse by category using the Categories menu in the navigation. Filter results by price range, location, and condition to narrow down exactly what you are looking for.',
      },
      {
        question: 'How do I contact a seller?',
        answer:
          'Open any product listing and click the "Contact Seller" button. This opens a direct message thread between you and the seller within our platform. You can ask questions, negotiate, arrange viewing or collection, and agree on payment — all in one place.',
      },
      {
        question: 'How do payments work?',
        answer:
          'EburutuMart is a free listing and connection platform — we do not process, hold, or handle any payments. Once a buyer and seller agree on a deal, they arrange payment entirely between themselves using whichever method they are both comfortable with, such as bank transfer, cash on collection, PayPal, or any other agreed method.',
      },
      {
        question: 'Can I negotiate the price with a seller?',
        answer:
          'Yes, absolutely. Many sellers are open to offers. Simply message the seller through the listing and discuss the price directly. EburutuMart encourages open, community-spirited trading, and negotiation is a normal part of that.',
      },
      {
        question: 'What if a product is not as described?',
        answer:
          'We encourage all buyers to ask detailed questions before agreeing to a purchase, request additional photos if needed, and where possible arrange to view items in person before paying. If something goes wrong, contact the seller first. If you cannot resolve it, report the listing to us and our support team will investigate.',
      },
      {
        question: 'Is there a wishlist or save feature?',
        answer:
          'Yes. When you are browsing, you can tap the heart icon on any listing to save it to your personal wishlist. Saved items are accessible from your account dashboard so you can return to them later.',
      },
      {
        question: 'How do I know a listing is genuine?',
        answer:
          'Every member of EburutuMart has a verified email address, meaning all accounts belong to real people. Listings also display seller ratings and reviews left by previous buyers. We encourage you to read reviews, check profile history, and message the seller with any questions before committing to a purchase.',
      },
    ],
  },
  {
    title: 'Selling on EburutuMart',
    icon: <Star className="w-5 h-5" />,
    color: 'text-amber-600',
    items: [
      {
        question: 'How do I list my first product?',
        answer:
          'Once you have a seller account, go to your dashboard and click "Add New Product". Fill in the product title, description, price, category, and location. Upload clear photos from multiple angles — good photos make a huge difference. Hit publish and your listing goes live immediately.',
      },
      {
        question: 'What can I sell on EburutuMart?',
        answer:
          'EburutuMart is designed for authentic African and African-inspired products. This includes clothing and fashion, food and ingredients, art and crafts, furniture, jewellery, homeware, music, books, beauty products, cultural artefacts, and services. If it connects to African culture and heritage, it belongs here. Items that are illegal, counterfeit, or violate our community guidelines are not permitted.',
      },
      {
        question: 'Are there any fees for listing or selling?',
        answer:
          'None whatsoever. Listing a product is free. There is no commission on sales, no monthly fee, and no charges of any kind. Every penny from your sale goes directly to you.',
      },
      {
        question: 'How many products can I list?',
        answer:
          'There is no fixed limit. You can list as many products as you like. Whether you are selling one handmade item or running a full catalogue of hundreds of products, EburutuMart supports you.',
      },
      {
        question: 'Can I edit or delete a listing after publishing?',
        answer:
          'Yes, at any time. Go to your seller dashboard, find the listing you want to change, and click Edit. You can update the title, description, price, photos, and availability. You can also mark a listing as sold or remove it completely.',
      },
      {
        question: 'How will buyers contact me?',
        answer:
          'Interested buyers will message you directly through the EburutuMart messaging system. You will receive a notification when a new message arrives. All communication is kept within the platform to keep things organised and safe for both parties.',
      },
      {
        question: 'What happens if I have a problem with a buyer?',
        answer:
          'Contact our support team at info@eburutumart.com and explain the situation. We take community safety seriously and will investigate any reports of fraudulent or abusive behaviour. Accounts that violate our community standards are removed.',
      },
    ],
  },
  {
    title: 'Payments & Safety',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'text-purple-600',
    items: [
      {
        question: 'How do I arrange payment with a seller?',
        answer:
          'EburutuMart does not process or handle payments. Buyers and sellers agree on a payment method directly between themselves. Common methods used in our community include bank transfer, cash on collection, and PayPal. Always confirm the method before completing a transaction.',
      },
      {
        question: "Is it safe to buy from someone I don't know?",
        answer:
          'We have several measures in place to protect you. Every account holder has a verified email address. Seller profiles show ratings and reviews from past buyers. You can message sellers to ask questions before committing. For high-value items, we strongly recommend meeting in a public place to view the item before paying.',
      },
      {
        question: 'What safe trading tips do you recommend?',
        answer:
          'For physical goods: meet in a public place, inspect the item before paying, and never transfer large sums before seeing the item. For services: agree terms clearly in writing via the message system and check reviews. Trust your instincts — if something feels off, walk away and report it.',
      },
      {
        question: 'Is my personal information secure?',
        answer:
          'Yes. Your account information is protected with industry-standard encryption. We do not share your personal details with third parties without your consent. Since EburutuMart does not handle payments, no financial data is ever stored on our platform.',
      },
      {
        question: 'How do I report a suspicious listing or user?',
        answer:
          'Every listing and seller profile has a "Report" button. Click it, choose the reason, and add any relevant details. Our moderation team reviews all reports promptly. You can also email us directly at info@eburutumart.com if you have an urgent concern.',
      },
      {
        question: 'What if I have a dispute with the other party?',
        answer:
          'Start by messaging the other party to try to resolve it directly — most disputes are misunderstandings that can be cleared up quickly. If that does not work, contact our support team with the details of the transaction and the issue. We will do our best to mediate a fair resolution.',
      },
    ],
  },
  {
    title: 'Community & Trust',
    icon: <Heart className="w-5 h-5" />,
    color: 'text-rose-600',
    items: [
      {
        question: 'What makes EburutuMart different from other marketplaces?',
        answer:
          'EburutuMart is built specifically for the African diaspora community. It is not a generic marketplace — every product, seller, and buyer is connected by a shared heritage and cultural identity. There are no fees, no gatekeeping, and no corporate barriers. It is a community-first platform where cultural commerce and human connection come before profit.',
      },
      {
        question: 'How do reviews and ratings work?',
        answer:
          'After a transaction is completed, both buyers and sellers can leave a review for each other. Reviews are visible on seller profiles and help the whole community make informed decisions. We encourage honest, constructive feedback. Reviews cannot be deleted by the person being reviewed, only by our moderation team if they violate our guidelines.',
      },
      {
        question: 'How does EburutuMart support African artisans and small businesses?',
        answer:
          'By providing a completely free platform with no listing fees or commissions, we ensure that every penny from a sale goes directly to the seller. We also promote community members through our blog, social media channels, and featured listings. Our mission is to help African entrepreneurs reach a wider audience without financial barriers.',
      },
      {
        question: 'What are the community guidelines?',
        answer:
          'EburutuMart is a respectful, inclusive, and positive space. We do not tolerate discrimination, harassment, fraudulent listings, counterfeit goods, or anything that harms community members. All users agree to our community standards on registration. Violations can result in listings being removed and accounts being suspended or permanently banned.',
      },
    ],
  },
  {
    title: 'Technical Support',
    icon: <HelpCircle className="w-5 h-5" />,
    color: 'text-slate-600',
    items: [
      {
        question: "I can't log into my account. What should I do?",
        answer:
          'First, try the "Forgot Password" link on the login page — this will send a reset link to your registered email address. Check your spam folder if the email does not arrive within a few minutes. If you are still having trouble, contact us at info@eburutumart.com.',
      },
      {
        question: 'How do I reset my password?',
        answer:
          'Click "Forgot Password" on the login page, enter your registered email address, and we will send you a secure reset link. The link is valid for 24 hours. If you do not receive the email, check your spam folder or contact support.',
      },
      {
        question: 'The website is running slowly. What can I do?',
        answer:
          'Try clearing your browser cache and cookies, then reload the page. If that does not help, try a different browser or disable any browser extensions that might be interfering. If the problem persists, please let us know at info@eburutumart.com.',
      },
      {
        question: 'I found a bug or error. How do I report it?',
        answer:
          'We genuinely appreciate bug reports — they help us improve the platform for everyone. Please email info@eburutumart.com with as much detail as possible: what you were doing when the error occurred, which page it happened on, any error message you saw, and the device and browser you were using. Screenshots are very helpful.',
      },
      {
        question: 'Does EburutuMart have a mobile app?',
        answer:
          'Not yet, but EburutuMart is fully optimised for mobile browsers, so it works beautifully on any smartphone or tablet without needing an app. A dedicated mobile app is on our roadmap for a future release.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'You can request account deletion by emailing info@eburutumart.com from your registered email address. We will process your request within 7 days and permanently delete your data in accordance with UK GDPR.',
      },
    ],
  },
]

// ─── Accordion Item ───────────────────────────────────────────────────────────

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full text-left py-4 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm md:text-base">
          {item.question}
        </span>
        <span className="mt-0.5 flex-shrink-0 text-gray-400 group-hover:text-emerald-600 transition-colors">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>
      {open && (
        <div className="pb-4 text-gray-600 text-sm md:text-base leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSections = faqSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          searchQuery === '' ||
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0)

  const totalResults = filteredSections.reduce((acc, s) => acc + s.items.length, 0)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
          ← Back to Home
        </Link>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Help Center</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Find answers to common questions and get support for your Eburutu Mart experience.
          </p>
        </div>

        {/* Top 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Contact Support */}
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                <MessageSquare className="w-8 h-8 text-emerald-700" />
              </div>
              <CardTitle className="text-lg">Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/contact"
                className="inline-block bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-800 transition-colors"
              >
                Contact Us
              </Link>
            </CardContent>
          </Card>

          {/* User Guide */}
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                <Book className="w-8 h-8 text-emerald-700" />
              </div>
              <CardTitle className="text-lg">User Guide</CardTitle>
              <CardDescription>Learn how to use the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <button
                disabled
                className="inline-block border border-gray-200 text-gray-500 px-5 py-2 rounded-lg text-sm font-semibold cursor-not-allowed"
              >
                Coming Soon
              </button>
            </CardContent>
          </Card>

          {/* Search FAQs */}
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="flex justify-center mb-2">
                <Search className="w-8 h-8 text-emerald-700" />
              </div>
              <CardTitle className="text-lg">Search FAQs</CardTitle>
              <CardDescription>Find answers quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ heading */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Frequently Asked Questions
        </h2>
        {searchQuery && (
          <p className="text-center text-gray-500 text-sm mb-6">
            {totalResults} result{totalResults !== 1 ? 's' : ''} for &quot;{searchQuery}&quot; —{' '}
            <button onClick={() => setSearchQuery('')} className="text-emerald-600 underline">
              clear
            </button>
          </p>
        )}

        {/* FAQ Sections */}
        <div className="mt-6 space-y-6">
          {filteredSections.length === 0 ? (
            <div className="text-center py-16 border border-gray-100 rounded-2xl">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-400 text-sm">
                Try different keywords or{' '}
                <button onClick={() => setSearchQuery('')} className="text-emerald-600 underline">
                  browse all questions
                </button>
              </p>
            </div>
          ) : (
            filteredSections.map((section, idx) => (
              <div
                key={idx}
                className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
                  <span className={section.color}>{section.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                </div>
                <div className="px-6">
                  {section.items.map((item, i) => (
                    <FAQAccordionItem key={i} item={item} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Still need help */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still Need Help?</h3>
          <p className="text-gray-500 text-sm mb-6">
            Our support team is here for you. We typically respond within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-800 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </Link>
            <a
              href="mailto:info@eburutumart.com"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              Email Us
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

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
} from 'lucide-react'

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
          'Click "Join Now" in the top right corner and choose whether you want to register as a buyer or seller. Complete the registration form with your details. You will receive a confirmation email — click the link to activate your account and you are ready to go.',
      },
      {
        question: "What's the difference between a buyer and seller account?",
        answer:
          'Buyer accounts allow you to browse the marketplace, search products, and access seller contact details to reach out directly. Seller accounts include a personal dashboard where you can create and manage listings, upload photos, and set prices. You can register as both if you wish to buy and sell.',
      },
      {
        question: 'Is registration free?',
        answer:
          'Yes — completely free for both buyers and sellers. There are no listing fees, no subscription charges, no commission on sales, and no hidden costs. EburutuMart is built to empower the African diaspora community, not to profit from it.',
      },
      {
        question: 'Can I use EburutuMart if I am outside the UK?',
        answer:
          'Yes. While EburutuMart is based in the UK and primarily serves the African diaspora community here, anyone from anywhere in the world can register, browse, and list products. Delivery and collection arrangements are agreed directly between buyers and sellers.',
      },
      {
        question: 'Do I need to be of African heritage to join?',
        answer:
          'Not at all. EburutuMart is open to everyone who appreciates authentic African products and culture. Whether you are a member of the diaspora, a friend of the community, or simply someone who loves African goods, you are warmly welcome.',
      },
      {
        question: "I registered but haven't received a confirmation email. What should I do?",
        answer:
          'Check your spam or junk folder first. If you still cannot find it, return to the login page and use the "Resend confirmation email" option. If the problem continues, contact us at info@eburutumart.com and we will resolve it promptly.',
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
          'Use the search bar at the top of any page to search by keyword, product name, or category. You can also browse using the Categories menu in the navigation. Filter results by price range, location, and condition to find exactly what you are looking for.',
      },
      {
        question: 'How do I contact a seller?',
        answer:
          'Open any product listing and click "Contact Seller". As a registered buyer, you will be provided with the seller\'s email address so you can reach out to them directly. All enquiries, negotiations, and arrangements are conducted between you and the seller.',
      },
      {
        question: 'How do payments work?',
        answer:
          'EburutuMart is a listing and connection platform — we do not process, hold, or facilitate any payments. Once a buyer and seller have agreed on a deal, payment is arranged entirely between themselves through whichever method both parties are comfortable with. EburutuMart bears no responsibility for any transaction conducted outside our platform.',
      },
      {
        question: 'Can I negotiate the price with a seller?',
        answer:
          'Yes. Many sellers are open to reasonable offers. Contact the seller directly using the email address provided on the listing and discuss terms between yourselves. EburutuMart encourages fair, community-spirited trading.',
      },
      {
        question: 'What precautions should I take before buying?',
        answer:
          'Buyers are strongly encouraged to exercise due diligence before committing to any purchase. Ask the seller for detailed photos, condition information, and any relevant background on the item. Where possible, arrange to view the item in person before making payment. EburutuMart connects buyers and sellers — responsibility for verifying the suitability of any transaction rests with both parties.',
      },
      {
        question: 'What if a product is not as described?',
        answer:
          'We strongly recommend clarifying all details with the seller before agreeing to a purchase. If a concern arises after a transaction, contact the seller in the first instance. You may also report the listing to us and our support team will review the matter. Please note that since EburutuMart does not handle payments, any financial dispute must be resolved through the payment method used by both parties.',
      },
      {
        question: 'Is there a wishlist or save feature?',
        answer:
          'Yes. Tap the heart icon on any listing to save it to your personal wishlist. Saved items are accessible from your account dashboard whenever you are ready to return to them.',
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
          'Once you have a seller account, go to your dashboard and click "Add New Product". Fill in the product title, description, price, category, and location. Upload clear photos from multiple angles and publish. Your listing goes live immediately.',
      },
      {
        question: 'What can I sell on EburutuMart?',
        answer:
          'EburutuMart is designed for authentic African and African-inspired products — clothing, food, art, crafts, jewellery, homeware, books, beauty products, cultural artefacts, and services. If it connects to African culture and heritage, it belongs here. Listings that are illegal, counterfeit, or in violation of our community guidelines will be removed.',
      },
      {
        question: 'Are there any fees for listing or selling?',
        answer:
          'None at all. Listing is free, there is no commission on sales, and there are no monthly charges. Every penny from your sale goes directly to you.',
      },
      {
        question: 'How many products can I list?',
        answer:
          'There is no fixed limit. You can list as many products as you like, from a single handmade item to a full catalogue.',
      },
      {
        question: 'How will buyers contact me?',
        answer:
          'Registered buyers who express interest in your listing will contact you directly via email. Your contact details are shared only with verified, registered buyers — they are not displayed publicly on your listing.',
      },
      {
        question: 'Can I edit or remove a listing after publishing?',
        answer:
          'Yes, at any time. Go to your seller dashboard, find the listing, and click Edit to update any details. You can also mark it as sold or remove it entirely once it is no longer available.',
      },
      {
        question: 'What are my responsibilities as a seller?',
        answer:
          'Sellers are expected to represent their products honestly, respond to buyer enquiries promptly, and honour any commitments made during the sales process. EburutuMart facilitates the connection between buyers and sellers — the responsibility for completing transactions fairly and safely rests with both parties.',
      },
    ],
  },
  {
    title: 'Payments & Safety',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'text-purple-600',
    items: [
      {
        question: 'How do payments work between buyers and sellers?',
        answer:
          'EburutuMart does not process or handle payments of any kind. All financial arrangements are made directly between buyers and sellers, through whatever method both parties agree upon. We strongly encourage the use of traceable, secure payment methods — particularly for higher-value transactions.',
      },
      {
        question: 'Is my personal information secure?',
        answer:
          'Yes. Your account information is protected with industry-standard encryption. Since we do not process payments, no financial data is ever stored on our platform. Your email address is only made available to other registered members in the context of an active listing — it is never displayed publicly.',
      },
      {
        question: 'What safe trading practices do you recommend?',
        answer:
          'For physical goods, we recommend meeting in a well-lit, public location and inspecting items thoroughly before making any payment. For services, agree all terms clearly in writing by email before any work begins. Both buyers and sellers should ask questions, verify details, and never feel pressured into completing a transaction hastily. Safe trading is the shared responsibility of all parties.',
      },
      {
        question: 'What if I have a dispute with the other party?',
        answer:
          'Attempt to resolve the matter directly with the other party first — many issues are misunderstandings that can be cleared up quickly. If you are unable to reach a resolution, contact our support team at info@eburutumart.com with the relevant details. We will do our best to assist, though please note that financial disputes must ultimately be handled through the payment method used, as EburutuMart is not a party to any transaction.',
      },
      {
        question: 'How do I report a suspicious listing or user?',
        answer:
          'Every listing and profile includes a Report button. Click it, select the reason, and provide any relevant details. Our moderation team reviews all reports and takes appropriate action. For urgent concerns, email us directly at info@eburutumart.com.',
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
          'EburutuMart is built specifically for the African diaspora community. It is not a generic marketplace — every product, seller, and buyer is connected by a shared heritage and cultural identity. There are no fees, no barriers to entry, and no corporate middlemen. It is a community-first platform where cultural commerce and genuine human connection take priority.',
      },
      {
        question: 'How do reviews and ratings work?',
        answer:
          'After a transaction, both buyers and sellers are encouraged to leave honest reviews. These are visible on profiles and help the community make well-informed decisions. Reviews cannot be removed by the person being reviewed — only by our moderation team where community guidelines have been breached.',
      },
      {
        question: 'How does EburutuMart support African artisans and small businesses?',
        answer:
          'By offering a completely free platform with no fees or commissions, every penny from a sale goes directly to the seller. We also promote community members through our blog, social media, and featured listings, helping African entrepreneurs reach a wider audience without financial barriers.',
      },
      {
        question: 'What are the community guidelines?',
        answer:
          'EburutuMart is a respectful, inclusive space. We do not tolerate discrimination, harassment, fraudulent listings, or counterfeit goods. All users agree to our community standards at the point of registration. Violations may result in listings being removed and accounts being suspended or permanently banned.',
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
          'Use the "Forgot Password" link on the login page to receive a reset link to your registered email address. Check your spam folder if it does not arrive promptly. If you are still unable to access your account, contact us at info@eburutumart.com.',
      },
      {
        question: 'How do I reset my password?',
        answer:
          'Click "Forgot Password" on the login page, enter your registered email address, and we will send you a secure reset link valid for 24 hours. If the email does not arrive, check your spam folder or contact our support team.',
      },
      {
        question: 'The website is running slowly. What can I do?',
        answer:
          'Try clearing your browser cache and cookies, then reload the page. If the issue persists across different browsers or devices, it may be a temporary problem on our end — please let us know at info@eburutumart.com so we can investigate.',
      },
      {
        question: 'I found a bug or error. How do I report it?',
        answer:
          'Please email info@eburutumart.com with as much detail as possible — what you were doing when the error occurred, which page it was on, any error message displayed, and your device and browser. Screenshots are particularly helpful.',
      },
      {
        question: 'Does EburutuMart have a mobile app?',
        answer:
          'Not yet, but EburutuMart is fully optimised for mobile browsers and works well on any smartphone or tablet. A dedicated mobile app is planned for a future release.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'Send a deletion request to info@eburutumart.com from your registered email address. We will process it within 7 days and permanently remove your data in line with UK GDPR. Any active listings will be taken down as part of this process.',
      },
    ],
  },
]

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

        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
          ← Back to Home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Help Center</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Find answers to common questions and get support for your Eburutu Mart experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
              <div key={idx} className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
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



import Link from 'next/link'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  HelpCircle, 
  MessageSquare, 
  Book, 
  Shield, 
  CreditCard,
  Package,
  Users,
  Search,
  ArrowLeft
} from 'lucide-react'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and get support for your Eburutu Mart experience.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageSquare className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="/contact"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Book className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">User Guide</CardTitle>
              <CardDescription>Learn how to use the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <button className="border border-border px-4 py-2 rounded-lg hover:bg-muted transition-colors">
                Coming Soon
              </button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Search className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-lg">Search FAQs</CardTitle>
              <CardDescription>Find answers quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search help topics..."
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          {/* Getting Started */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Getting Started</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">How do I create an account?</h3>
                <p className="text-muted-foreground">
                  Click "Join Now" in the top right corner, choose whether you want to be a buyer or seller, 
                  and fill out the registration form with your details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What's the difference between buyer and seller accounts?</h3>
                <p className="text-muted-foreground">
                  Buyer accounts can browse and purchase products. Seller accounts can list products for sale 
                  but require verification before products go live.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is registration free?</h3>
                <p className="text-muted-foreground">
                  Yes, registration is completely free for both buyers and sellers. The platform is entirely free to use with no transaction fees.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Buying */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-primary" />
                <CardTitle>Buying Products</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">How do I search for products?</h3>
                <p className="text-muted-foreground">
                  Use the search bar at the top of the page or browse by categories. You can filter results 
                  by price, location, and other criteria.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I contact sellers?</h3>
                <p className="text-muted-foreground">
                  Currently, you can contact sellers through our contact form. We're working on a direct 
                  messaging system for better communication.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do payments work?</h3>
                <p className="text-muted-foreground">
                  Eburutu Mart is a free listing platform. We do not process payments. Buyers and sellers arrange 
                  payment methods directly between themselves through their preferred channels.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Selling */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Selling Products</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">How do I become a verified seller?</h3>
                <p className="text-muted-foreground">
                  Complete our verification process which includes email verification, phone verification, 
                  and identity verification. Visit our verification page for detailed steps.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What fees do you charge sellers?</h3>
                <p className="text-muted-foreground">
                  Eburutu Mart is completely free to use. There are no fees for listing products, completing transactions, or any other platform activities. We believe in empowering the African diaspora community without financial barriers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I list my first product?</h3>
                <p className="text-muted-foreground">
                  After completing verification, go to your dashboard and click "Add Product." Fill out the 
                  product details, upload photos, and set your price.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-primary" />
                <CardTitle>Payments & Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Is my information secure?</h3>
                <p className="text-muted-foreground">
                  Yes, we take security seriously. Your account information is protected with industry-standard 
                  encryption. Since we don't process payments, no financial data is stored on our platform.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I arrange payment with sellers?</h3>
                <p className="text-muted-foreground">
                  Eburutu Mart connects buyers and sellers. All payment arrangements are made directly between 
                  buyers and sellers outside of our platform through their preferred methods.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What if I have a dispute?</h3>
                <p className="text-muted-foreground">
                  Contact our support team immediately if you have any issues. We have a dispute resolution 
                  process to help resolve problems fairly.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Support */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-primary" />
                <CardTitle>Technical Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">I can't log into my account</h3>
                <p className="text-muted-foreground">
                  Try resetting your password using the "Forgot Password" link on the login page. If that 
                  doesn't work, contact our support team.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">The website is running slowly</h3>
                <p className="text-muted-foreground">
                  Try clearing your browser cache or using a different browser. If problems persist, 
                  the issue might be on our end - please let us know.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">I found a bug or error</h3>
                <p className="text-muted-foreground">
                  Please report any bugs or errors through our contact form. Include as much detail as 
                  possible about what you were doing when the error occurred.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Still Need Help */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help you with any questions or issues you may have.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:support@eburutumart.com"
                  className="border border-border px-6 py-3 rounded-lg hover:bg-muted transition-colors"
                >
                  Email Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

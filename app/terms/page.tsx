

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Shield, Users, Scale, AlertTriangle, ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          {/* Agreement */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-primary" />
                <CardTitle>Agreement to Terms</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing and using the Eburutu Mart platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
              <p className="text-muted-foreground">
                If you do not agree with any part of these terms, then you may not access the service.
              </p>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>User Accounts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Creation</h3>
                <p className="text-muted-foreground">
                  You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Account Types</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Buyer accounts for purchasing products and services</li>
                  <li>Seller accounts for listing products and services (subject to verification)</li>
                  <li>Admin accounts for platform management</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Marketplace Rules */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Marketplace Rules</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">For Sellers</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>All products must be authentic and accurately described</li>
                  <li>Sellers must complete verification process before listing</li>
                  <li>Prohibited items include counterfeit goods, illegal items, and hazardous materials</li>
                  <li>Sellers are responsible for order fulfillment and customer service</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">For Buyers</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Make purchases in good faith</li>
                  <li>Provide accurate shipping information</li>
                  <li>Leave honest reviews and ratings</li>
                  <li>Report any issues through proper channels</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Conduct */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <CardTitle>Prohibited Conduct</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The following activities are strictly prohibited:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Fraudulent activities or misrepresentation</li>
                <li>Harassment or discrimination against other users</li>
                <li>Listing prohibited or illegal items</li>
                <li>Attempting to circumvent platform fees</li>
                <li>Creating multiple accounts to manipulate reviews</li>
                <li>Spamming or unsolicited communications</li>
                <li>Violating intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payments and Fees */}
          <Card>
            <CardHeader>
              <CardTitle>Payments and Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Transaction Fees</h3>
                <p className="text-muted-foreground">
                  The platform is completely free to use. There are no fees charged for listing products, completing transactions, or any other platform activities.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payment Arrangements</h3>
                <p className="text-muted-foreground">
                  Eburutu Mart does not process payments. Buyers and sellers are responsible for arranging payment directly between themselves through their preferred methods.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The Eburutu Mart platform and its content are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground">
                Users retain rights to their original content but grant us license to use it for platform operations.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The platform acts as a marketplace connecting buyers and sellers. We are not responsible for the quality, safety, or legality of products listed, the accuracy of listings, or the ability of sellers to complete transactions.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate accounts that violate these terms. Users may also terminate their accounts at any time by contacting support.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update these terms from time to time. Users will be notified of significant changes via email or platform notifications.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us through our contact form or email support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

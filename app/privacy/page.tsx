

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Shield, Eye, Database, Mail, Cookie, Users, ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Your Privacy Matters</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                At Eburutu Mart, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
              </p>
              <p className="text-muted-foreground">
                We believe in transparency and your right to control your personal information.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Database className="h-6 w-6 text-primary" />
                <CardTitle>Information We Collect</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Location information (city, country)</li>
                  <li>Account credentials (encrypted passwords)</li>
                  <li>Profile information and preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Transaction Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Purchase and sales history</li>
                  <li>Payment information (processed by third-party providers)</li>
                  <li>Shipping addresses</li>
                  <li>Communication with other users</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technical Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Device information and IP addresses</li>
                  <li>Browser type and version</li>
                  <li>Usage patterns and preferences</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                <CardTitle>How We Use Your Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Platform Operations</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Create and manage your account</li>
                  <li>Process transactions and payments</li>
                  <li>Facilitate communication between users</li>
                  <li>Provide customer support</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Improvement and Security</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Improve platform features and user experience</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Analyze usage patterns and preferences</li>
                  <li>Maintain system performance</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Communication</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Send transaction-related notifications</li>
                  <li>Provide important service updates</li>
                  <li>Send marketing communications (with consent)</li>
                  <li>Respond to inquiries and support requests</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>Information Sharing</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>With your explicit consent</li>
                <li>To facilitate transactions (sharing contact info between buyers and sellers)</li>
                <li>With service providers who assist in platform operations</li>
                <li>To comply with legal requirements or protect our rights</li>
                <li>In case of business transfer or acquisition</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Data Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Encrypted data transmission using SSL/TLS</li>
                <li>Secure password storage with bcrypt hashing</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure database storage with backup systems</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary" />
                <CardTitle>Cookies and Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Remember your preferences and login status</li>
                <li>Analyze site usage and performance</li>
                <li>Provide personalized experiences</li>
                <li>Ensure platform security</li>
              </ul>
              <p className="text-muted-foreground">
                You can control cookie preferences through your browser settings.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Delete your account and associated data</li>
                <li>Restrict processing of your information</li>
                <li>Port your data to another service</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform may integrate with third-party services for payments, analytics, and other features. These services have their own privacy policies, and we encourage you to review them.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <CardTitle>Contact Us</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our data practices, please contact us through our contact form or email our privacy team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

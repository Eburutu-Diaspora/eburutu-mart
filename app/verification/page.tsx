

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Shield, 
  Camera, 
  Mail,
  Phone,
  Building,
  ArrowLeft
} from 'lucide-react'

export default function VerificationPage() {
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
          <h1 className="text-4xl font-bold mb-4">Seller Verification</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build trust with buyers by completing our comprehensive verification process. 
            Verified sellers get priority visibility and increased credibility.
          </p>
        </div>

        {/* Benefits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Benefits of Verification
            </CardTitle>
            <CardDescription>
              Verified sellers enjoy enhanced features and increased trust from buyers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Verified Badge</h3>
                  <p className="text-sm text-muted-foreground">
                    Display the verified seller badge on your profile
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Priority Listings</h3>
                  <p className="text-sm text-muted-foreground">
                    Your products appear higher in search results
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Business Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Access to advanced seller tools and analytics
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Direct Communication</h3>
                  <p className="text-sm text-muted-foreground">
                    Enhanced messaging features with buyers
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Steps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">Verification Process</h2>
          
          {/* Step 1: Email Verification */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Verification
                    </CardTitle>
                    <CardDescription>Verify your email address</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  Instant
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Confirm your email address by clicking the verification link sent to your inbox.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Check your email for the verification link</li>
                <li>Click the link to verify your email address</li>
                <li>Return to your dashboard to continue</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 2: Phone Verification */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Phone Verification
                    </CardTitle>
                    <CardDescription>Verify your phone number</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  2-3 mins
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Verify your phone number via SMS code to enable secure communication.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Enter your phone number in the verification form</li>
                <li>Receive and enter the SMS verification code</li>
                <li>Your phone number will be verified instantly</li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 3: Identity Verification */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Identity Verification
                    </CardTitle>
                    <CardDescription>Upload government-issued ID</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  1-2 days
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Upload a clear photo of your government-issued ID for identity verification.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Accepted Documents</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Passport</li>
                    <li>Driving license</li>
                    <li>National ID card</li>
                    <li>Residence permit</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Clear, high-resolution photo</li>
                    <li>All corners visible</li>
                    <li>Text must be readable</li>
                    <li>No reflections or shadows</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Business Verification */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Business Verification
                    </CardTitle>
                    <CardDescription>Verify your business details (optional)</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  2-3 days
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For business sellers, provide business registration documents and tax information.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Required Documents</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Business registration certificate</li>
                    <li>Tax identification number</li>
                    <li>Business address proof</li>
                    <li>Bank account details</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Benefits</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Business seller badge</li>
                    <li>Enhanced credibility</li>
                    <li>Access to business tools</li>
                    <li>Priority customer support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Verified?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of verified sellers and start building trust with buyers today.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/auth/register"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Create Seller Account
                </a>
                <a
                  href="/dashboard"
                  className="border border-border px-6 py-3 rounded-lg hover:bg-muted transition-colors"
                >
                  Access Dashboard
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

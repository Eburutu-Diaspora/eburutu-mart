
import Link from 'next/link'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, Users, Clock, AlertCircle, ArrowLeft } from 'lucide-react'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'

export const dynamic = 'force-dynamic'

export default async function MessagesPage() {
  const session = await getAuthSession()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Stay connected with buyers and sellers in our marketplace
          </p>
        </div>

        {/* Coming Soon Notice */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Messaging System Coming Soon</CardTitle>
                <CardDescription>
                  We're working on a comprehensive messaging system to help you connect with other users
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Direct Communication</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat directly with buyers and sellers about products and services
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant notifications when you receive new messages
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Safe & Secure</h3>
                  <p className="text-sm text-muted-foreground">
                    All messages are encrypted and monitored for safety
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Contact Method */}
        <Card>
          <CardHeader>
            <CardTitle>Need to Contact Someone?</CardTitle>
            <CardDescription>
              In the meantime, you can reach out through our contact form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <a
                href="/contact"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/products"
                className="border border-border px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                Browse Products
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

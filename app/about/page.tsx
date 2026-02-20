
import Link from 'next/link'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { TrustSection } from '@/components/home/trust-section'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Globe, 
  Users, 
  ShieldCheck,
  Target,
  Star,
  Lightbulb,
  Award,
  ArrowLeft,
  ShoppingBag,
  Store
} from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { label: 'Active Members', value: '12,000+', icon: Users },
    { label: 'Countries', value: '54', icon: Globe },
    { label: 'Products Listed', value: '5,000+', icon: Star },
    { label: 'Verified Sellers', value: '1,200+', icon: ShieldCheck }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Cultural Heritage',
      description: 'Preserving and celebrating authentic African culture and traditions through commerce and community connection.'
    },
    {
      icon: ShieldCheck,
      title: 'Trust & Safety',
      description: 'Comprehensive seller verification and secure platform ensuring safe transactions for all community members.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building meaningful connections within the African diaspora through shared cultural experiences and values.'
    },
    {
      icon: Target,
      title: 'Quality Focus',
      description: 'Curating authentic, high-quality products that represent the finest of African craftsmanship and culture.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Eburutu Mart
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're building the premier destination for authentic African products and cultural connections, 
            empowering the diaspora community across the UK to celebrate heritage through commerce.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white text-center">
            <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              To create a thriving digital marketplace that connects the African diaspora community 
              in the UK with authentic products, services, and cultural experiences from across Africa. 
              We believe in preserving heritage, supporting artisans, and building bridges that span continents.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="inline-flex p-3 bg-primary/10 rounded-full mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Eburutu Mart was born from a simple yet powerful observation: 
                members of the African diaspora in the UK struggled to find authentic 
                products that connected them to their cultural roots.
              </p>
              <p>
                Founded in 2024, we started as a small community initiative to help 
                African entrepreneurs showcase their products to a broader audience. 
                Today, we've grown into the UK's leading platform for authentic African 
                commerce, serving thousands of community members.
              </p>
              <p>
                Our platform goes beyond transactions – we're building a community 
                that celebrates African heritage, supports emerging businesses, and 
                creates meaningful connections across the diaspora.
              </p>
            </div>
          </div>
          
          <div className="bg-muted/20 rounded-2xl p-8 flex items-center justify-center">
            <div className="text-center">
              <Award className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Recognition</h3>
              <p className="text-muted-foreground">
                Proud recipient of the 2024 UK Diversity in Tech Award for 
                Cultural Impact and Community Building
              </p>
            </div>
          </div>
        </div>

        </main>
      
      {/* Trust & Security Section */}
      <TrustSection />
      
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-primary/5 via-accent/5 to-emerald-500/5 rounded-2xl p-8 md:p-12 border border-primary/10">
          <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Register now to discover authentic African products or start selling 
            your own cultural treasures to our growing marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/products">
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-emerald-200 hover:border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 cursor-pointer group min-w-[250px]">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-emerald-700 dark:text-emerald-400">For Buyers</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse authentic African products and connect with your heritage
                </p>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Start Exploring →</Badge>
              </Card>
            </Link>
            <Link href="/auth/register">
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 border-amber-200 hover:border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 cursor-pointer group min-w-[250px]">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">For Sellers</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Register to list your products on our thriving marketplace
                </p>
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Register Now →</Badge>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

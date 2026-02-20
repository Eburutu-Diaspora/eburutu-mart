
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { 
  Palette, 
  Utensils, 
  Shirt, 
  Users, 
  Music, 
  Sparkles,
  Package,
  ArrowLeft,
  Wrench,
  Briefcase
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const categoryConfig: Record<string, { 
  icon: React.ComponentType<{ className?: string }>,
  bgColor: string,
  iconColor: string,
  hoverBg: string,
  borderColor: string,
  gradientFrom: string,
  gradientTo: string
}> = {
  'food-groceries': { 
    icon: Utensils, 
    bgColor: 'bg-orange-100', 
    iconColor: 'text-orange-600',
    hoverBg: 'hover:bg-orange-200',
    borderColor: 'border-orange-200',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-amber-500'
  },
  'fashion-textiles': { 
    icon: Shirt, 
    bgColor: 'bg-pink-100', 
    iconColor: 'text-pink-600',
    hoverBg: 'hover:bg-pink-200',
    borderColor: 'border-pink-200',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-500'
  },
  'artisan-crafts': { 
    icon: Palette, 
    bgColor: 'bg-purple-100', 
    iconColor: 'text-purple-600',
    hoverBg: 'hover:bg-purple-200',
    borderColor: 'border-purple-200',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-indigo-500'
  },
  'beauty-wellness': { 
    icon: Sparkles, 
    bgColor: 'bg-rose-100', 
    iconColor: 'text-rose-600',
    hoverBg: 'hover:bg-rose-200',
    borderColor: 'border-rose-200',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-pink-500'
  },
  'services': { 
    icon: Users, 
    bgColor: 'bg-cyan-100', 
    iconColor: 'text-cyan-600',
    hoverBg: 'hover:bg-cyan-200',
    borderColor: 'border-cyan-200',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-teal-500'
  },
  'media-culture': { 
    icon: Music, 
    bgColor: 'bg-blue-100', 
    iconColor: 'text-blue-600',
    hoverBg: 'hover:bg-blue-200',
    borderColor: 'border-blue-200',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-indigo-500'
  },
  'hardware-machinery': { 
    icon: Wrench, 
    bgColor: 'bg-slate-100', 
    iconColor: 'text-slate-600',
    hoverBg: 'hover:bg-slate-200',
    borderColor: 'border-slate-200',
    gradientFrom: 'from-slate-500',
    gradientTo: 'to-gray-500'
  },
  'business-opportunities': { 
    icon: Briefcase, 
    bgColor: 'bg-emerald-100', 
    iconColor: 'text-emerald-600',
    hoverBg: 'hover:bg-emerald-200',
    borderColor: 'border-emerald-200',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-green-500'
  },
  'default': { 
    icon: Package, 
    bgColor: 'bg-gray-100', 
    iconColor: 'text-gray-600',
    hoverBg: 'hover:bg-gray-200',
    borderColor: 'border-gray-200',
    gradientFrom: 'from-gray-500',
    gradientTo: 'to-slate-500'
  }
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        select: {
          id: true
        }
      }
    },
    orderBy: {
      sortOrder: 'asc'
    }
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          {/* Back Button & Header */}
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            
            {/* Colorful Header Section */}
            <div className="text-center py-8 px-4 rounded-3xl bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border border-purple-100/50">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  Shop by Category
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover authentic African products and services across our diverse categories. 
                Each category represents a piece of our rich cultural heritage.
              </p>
              
              {/* Decorative dots */}
              <div className="flex justify-center gap-2 mt-6">
                <span className="w-3 h-3 rounded-full bg-purple-400"></span>
                <span className="w-3 h-3 rounded-full bg-pink-400"></span>
                <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              </div>
            </div>
          </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const config = categoryConfig[category.slug as keyof typeof categoryConfig] || categoryConfig.default
            const IconComponent = config.icon
            const productCount = category.products.length

            return (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className={`h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border-2 ${config.borderColor} hover:border-transparent overflow-hidden relative`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <CardHeader className="text-center relative z-10">
                    <div className={`mx-auto mb-4 p-4 ${config.bgColor} rounded-2xl w-20 h-20 flex items-center justify-center ${config.hoverBg} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <IconComponent className={`h-10 w-10 ${config.iconColor}`} />
                    </div>
                    <CardTitle className={`text-xl font-bold group-hover:bg-gradient-to-r group-hover:${config.gradientFrom} group-hover:${config.gradientTo} group-hover:bg-clip-text transition-colors`}>
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10">
                    <div className="flex items-center justify-center">
                      <Badge className={`text-sm px-4 py-1 bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white border-0 shadow-md`}>
                        {productCount} {productCount === 1 ? 'Product' : 'Products'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/4 translate-y-1/4"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Can&apos;t find what you&apos;re looking for?</h2>
                <p className="text-white/90 mb-8 max-w-xl mx-auto">
                  Join our community of sellers and share your unique African products with the diaspora.
                </p>
                <Link href="/auth/register">
                  <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                    Start Selling Today ✨
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

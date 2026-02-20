
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { CategoryHeader } from '@/components/categories/category-header'
import { ProductsGrid } from '@/components/products/products-grid'

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    search?: string
    minPrice?: string
    maxPrice?: string
    verified?: string
    page?: string
    sort?: string
  }
}

async function getCategory(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    const categories = await response.json()
    return categories.find((cat: any) => cat.slug === slug)
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  // Add category to search params
  const categorySearchParams = {
    ...searchParams,
    category: params.slug
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/categories" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>
        <CategoryHeader category={category} />
        <div className="mt-8">
          <ProductsGrid searchParams={categorySearchParams} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

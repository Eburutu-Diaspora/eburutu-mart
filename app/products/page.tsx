
import { Suspense } from 'react'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { ProductsGrid } from '@/components/products/products-grid'
import { ProductsFilters } from '@/components/products/products-filters'
import { ProductsHeader } from '@/components/products/products-header'

interface SearchParams {
  category?: string
  search?: string
  location?: string
  minPrice?: string
  maxPrice?: string
  verified?: string
  page?: string
}

interface ProductsPageProps {
  searchParams: SearchParams
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductsHeader />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-24">
              <ProductsFilters />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-video bg-muted rounded-lg mb-4"></div>
          <div className="h-4 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
          <div className="h-6 bg-muted rounded w-1/3"></div>
        </div>
      ))}
    </div>
  )
}

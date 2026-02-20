
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { ProductDetail } from '@/components/products/product-detail'
import { RelatedProducts } from '@/components/products/related-products'
import { ArrowLeft } from 'lucide-react'

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <ProductDetail product={product} />
        <div className="mt-16">
          <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

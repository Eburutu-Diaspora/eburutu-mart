
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { HeroSection } from '@/components/home/hero-section'
import { CategorySection } from '@/components/home/category-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { NewArrivals } from '@/components/home/new-arrivals'
import { RecommendedProducts } from '@/components/home/recommended-products'
import { CommunitySection } from '@/components/home/community-section'
import dynamic from 'next/dynamic'

const CommoditiesTicker = dynamic(
  () => import('@/components/home/commodities-ticker').then(mod => ({ default: mod.CommoditiesTicker })),
  { ssr: false }
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CommoditiesTicker />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <NewArrivals />
        <RecommendedProducts />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}

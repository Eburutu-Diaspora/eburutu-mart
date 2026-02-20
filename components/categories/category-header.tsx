
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Package } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string
  productCount: number
}

interface CategoryHeaderProps {
  category: Category
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-primary to-accent rounded-2xl overflow-hidden">
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80" />
        <div className="relative z-10 h-full flex items-center justify-center text-center p-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xl text-white/90 max-w-2xl">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {category.productCount} products available
          </span>
        </div>
        <Badge variant="secondary" className="text-sm">
          {category.name}
        </Badge>
      </div>
    </div>
  )
}

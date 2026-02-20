
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { X, MapPin, PoundSterling } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  productCount: number
}

export function ProductsFilters() {
  const [categories, setCategories] = useState<Category[]>([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [location, setLocation] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchCategories()
    // Initialize filters from URL params
    setMinPrice(searchParams?.get('minPrice') || '')
    setMaxPrice(searchParams?.get('maxPrice') || '')
    setLocation(searchParams?.get('location') || '')
    setVerifiedOnly(searchParams?.get('verified') === 'true')
    
    const categoryParam = searchParams?.get('category')
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
  }, [searchParams])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const updateFilters = () => {
    const params = new URLSearchParams()
    
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories[0]) // For now, support single category
    }
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (location) params.set('location', location)
    if (verifiedOnly) params.set('verified', 'true')
    
    // Preserve search term
    const search = searchParams?.get('search')
    if (search) params.set('search', search)
    
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setMinPrice('')
    setMaxPrice('')
    setSelectedCategories([])
    setLocation('')
    setVerifiedOnly(false)
    
    const search = searchParams?.get('search')
    if (search) {
      router.push(`/products?search=${search}`)
    } else {
      router.push('/products')
    }
  }

  const toggleCategory = (categorySlug: string) => {
    setSelectedCategories(prev => 
      prev.includes(categorySlug) 
        ? prev.filter(c => c !== categorySlug)
        : [categorySlug] // For now, only allow single selection
    )
  }

  const activeFiltersCount = [
    selectedCategories.length > 0,
    minPrice,
    maxPrice,
    location,
    verifiedOnly
  ].filter(Boolean).length

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedCategories.map(categorySlug => {
              const category = categories.find(c => c.slug === categorySlug)
              return category ? (
                <Badge key={categorySlug} variant="secondary" className="mr-1">
                  {category.name}
                  <X 
                    className="ml-1 h-3 w-3 cursor-pointer" 
                    onClick={() => toggleCategory(categorySlug)}
                  />
                </Badge>
              ) : null
            })}
            {verifiedOnly && (
              <Badge variant="secondary" className="mr-1">
                Verified Only
                <X 
                  className="ml-1 h-3 w-3 cursor-pointer" 
                  onClick={() => setVerifiedOnly(false)}
                />
              </Badge>
            )}
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories?.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.slug}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => toggleCategory(category.slug)}
              />
              <Label 
                htmlFor={category.slug} 
                className="text-sm cursor-pointer flex-1 flex items-center justify-between"
              >
                <span>{category.name}</span>
                <span className="text-muted-foreground">({category.productCount})</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <PoundSterling className="h-4 w-4" />
            Price Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minPrice" className="text-xs">Min</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="text-sm"
              />
            </div>
            <div>
              <Label htmlFor="maxPrice" className="text-xs">Max</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="e.g., London, Manchester..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-sm"
          />
        </CardContent>
      </Card>

      {/* Seller Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Seller Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={verifiedOnly}
              onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
            />
            <Label htmlFor="verified" className="text-sm cursor-pointer">
              Verified sellers only
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Apply Filters Button */}
      <Button onClick={updateFilters} className="w-full">
        Apply Filters
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeFiltersCount}
          </Badge>
        )}
      </Button>
    </div>
  )
}

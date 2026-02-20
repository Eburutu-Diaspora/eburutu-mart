'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { ArrowLeft, Save, Loader2, Upload, X, ImageIcon } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Category {
  id: string
  name: string
  slug: string
}

interface ExistingImage {
  id: string
  imageUrl: string
  alt: string
}

interface NewImagePreview {
  file: File
  preview: string
}

interface Product {
  id: string
  title: string
  description: string
  price: number
  condition: string
  location: string
  categoryId: string
  brand?: string
  color?: string
  size?: string
  images?: ExistingImage[]
}

export default function EditProductPage() {
  const params = useParams()
  const productId = params.id as string
  const { data: session, status } = useSession()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [product, setProduct] = useState<Product | null>(null)
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([])
  const [newImages, setNewImages] = useState<NewImagePreview[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (status === 'authenticated' && productId) {
      fetchData()
    }
  }, [status, router, productId])

  const fetchData = async () => {
    try {
      const [productRes, categoriesRes] = await Promise.all([
        fetch(`/api/products/${productId}`),
        fetch('/api/categories')
      ])

      if (productRes.ok) {
        const productData = await productRes.json()
        setProduct(productData)
        // Set existing images
        if (productData.images && productData.images.length > 0) {
          setExistingImages(productData.images)
        }
      } else {
        toast({
          title: 'Error',
          description: 'Product not found',
          variant: 'destructive',
        })
        router.push('/dashboard/products')
      }

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const totalImages = existingImages.length - imagesToDelete.length + newImages.length
    const maxNewImages = 5 - totalImages

    const newImagePreviews: NewImagePreview[] = []
    for (let i = 0; i < Math.min(files.length, maxNewImages); i++) {
      const file = files[i]
      if (file.type.startsWith('image/')) {
        newImagePreviews.push({
          file,
          preview: URL.createObjectURL(file)
        })
      }
    }

    setNewImages([...newImages, ...newImagePreviews])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeExistingImage = (imageId: string) => {
    setImagesToDelete([...imagesToDelete, imageId])
  }

  const restoreExistingImage = (imageId: string) => {
    setImagesToDelete(imagesToDelete.filter(id => id !== imageId))
  }

  const removeNewImage = (index: number) => {
    const newImagesCopy = [...newImages]
    URL.revokeObjectURL(newImagesCopy[index].preview)
    newImagesCopy.splice(index, 1)
    setNewImages(newImagesCopy)
  }

  const getTotalImageCount = () => {
    return existingImages.length - imagesToDelete.length + newImages.length
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    setIsSaving(true)
    try {
      // Convert new images to base64
      const newImageUrls: string[] = []
      for (const img of newImages) {
        const reader = new FileReader()
        const base64 = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(img.file)
        })
        newImageUrls.push(base64)
      }

      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          imagesToDelete,
          newImages: newImageUrls,
        }),
      })

      if (response.ok) {
        // Clean up previews
        newImages.forEach(img => URL.revokeObjectURL(img.preview))
        toast({
          title: 'Success',
          description: 'Product updated successfully',
        })
        router.push('/dashboard/products')
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update product',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error updating product:', error)
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof Product, value: string | number) => {
    if (product) {
      setProduct({ ...product, [field]: value })
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href="/dashboard/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Products
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
            <CardDescription>Update your product information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  value={product.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter product title"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={product.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe your product"
                  rows={4}
                  required
                />
              </div>

              {/* Product Images */}
              <div className="space-y-2">
                <Label>Product Images (up to 5)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Current Images</p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {existingImages.map((img) => {
                          const isMarkedForDeletion = imagesToDelete.includes(img.id)
                          return (
                            <div 
                              key={img.id} 
                              className={`relative aspect-square rounded-lg overflow-hidden bg-muted ${isMarkedForDeletion ? 'opacity-40' : ''}`}
                            >
                              <Image
                                src={img.imageUrl}
                                alt={img.alt || 'Product image'}
                                fill
                                className="object-cover"
                              />
                              {isMarkedForDeletion ? (
                                <button
                                  type="button"
                                  onClick={() => restoreExistingImage(img.id)}
                                  className="absolute top-1 right-1 p-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-xs px-2"
                                >
                                  Restore
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => removeExistingImage(img.id)}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* New Images Preview */}
                  {newImages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">New Images to Add</p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {newImages.map((img, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={img.preview}
                              alt={`New image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Upload Button */}
                  {getTotalImageCount() < 5 && (
                    <div className="flex flex-col items-center justify-center py-4">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <div className="p-4 bg-primary/10 rounded-full mb-3">
                          <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Click to upload images</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          PNG, JPG up to 5MB each ({5 - getTotalImageCount()} remaining)
                        </span>
                      </label>
                    </div>
                  )}

                  {getTotalImageCount() === 0 && (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mt-2">
                      <ImageIcon className="h-4 w-4" />
                      <span>No images uploaded yet</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (£)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={product.price}
                    onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={product.categoryId}
                    onValueChange={(value) => handleChange('categoryId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Condition and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select
                    value={product.condition}
                    onValueChange={(value) => handleChange('condition', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={product.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="e.g., London, UK"
                  />
                </div>
              </div>

              {/* Brand, Color, Size */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand (Optional)</Label>
                  <Input
                    id="brand"
                    value={product.brand || ''}
                    onChange={(e) => handleChange('brand', e.target.value)}
                    placeholder="Brand name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color (Optional)</Label>
                  <Input
                    id="color"
                    value={product.color || ''}
                    onChange={(e) => handleChange('color', e.target.value)}
                    placeholder="Product color"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Size (Optional)</Label>
                  <Input
                    id="size"
                    value={product.size || ''}
                    onChange={(e) => handleChange('size', e.target.value)}
                    placeholder="Product size"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Link href="/dashboard/products">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

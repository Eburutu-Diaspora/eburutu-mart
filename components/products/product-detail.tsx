
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  Star, 
  MapPin, 
  Eye, 
  MessageCircle, 
  Heart,
  Share2,
  ShieldCheck,
  Calendar,
  Package,
  ArrowLeft,
  AlertTriangle,
  Mail,
  Copy,
  Check
} from 'lucide-react'
import { ProductWithDetails } from '@/lib/types'
import { toast } from 'sonner'

interface ProductDetailProps {
  product: ProductWithDetails
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { data: session } = useSession()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const handleContactSeller = () => {
    if (!session) {
      toast.error('Please sign in to contact the seller')
      return
    }
    setShowContactDialog(true)
  }

  const copyEmail = async () => {
    const email = product.seller?.email || ''
    try {
      await navigator.clipboard.writeText(email)
      setEmailCopied(true)
      toast.success('Email copied to clipboard!')
      setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      toast.error('Failed to copy email')
    }
  }

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    
    // Check if Web Share API is available
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: url
        })
        return
      } catch (error) {
        // User cancelled or share failed, fall through to clipboard
      }
    }
    
    // Fallback to copying URL to clipboard
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
      } catch (error) {
        // Clipboard API failed, use manual fallback
        const textArea = document.createElement('textarea')
        textArea.value = url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        toast.success('Link copied to clipboard!')
      }
    } else {
      toast.info('Copy this link: ' + url)
    }
  }

  const toggleFavorite = () => {
    if (!session) {
      toast.error('Please sign in to save favorites')
      return
    }
    setIsFavorite(!isFavorite)
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 inline mr-1" />
          Back to Products
        </Link>
        <span>/</span>
        <Link href={`/categories/${product.category?.slug}`} className="hover:text-primary transition-colors">
          {product.category?.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-muted rounded-2xl overflow-hidden">
            <Image
              src={product.images?.[currentImageIndex]?.imageUrl || '/placeholder-product.jpg'}
              alt={product.images?.[currentImageIndex]?.alt || product.title}
              fill
              className="object-cover"
              priority
            />
            
            {/* Image Navigation */}
            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square relative bg-muted rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.alt || product.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.category?.name}</Badge>
              {product.isPromoted && (
                <Badge className="bg-accent text-white">Featured</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-primary">
                £{Number(product.price || 0).toFixed(2)}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{product.viewCount} views</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Condition</span>
                  <div className="font-medium">{product.condition || 'Not specified'}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Location</span>
                  <div className="font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {product.location}
                  </div>
                </div>
                {product.brand && (
                  <div>
                    <span className="text-sm text-muted-foreground">Brand</span>
                    <div className="font-medium">{product.brand}</div>
                  </div>
                )}
                {product.size && (
                  <div>
                    <span className="text-sm text-muted-foreground">Size</span>
                    <div className="font-medium">{product.size}</div>
                  </div>
                )}
                {product.color && (
                  <div>
                    <span className="text-sm text-muted-foreground">Color</span>
                    <div className="font-medium">{product.color}</div>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-sm text-muted-foreground">Weight</span>
                    <div className="font-medium">{product.weight}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Seller Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="w-5 h-5" />
                Seller
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {product.seller?.name?.charAt(0) || 'S'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{product.seller?.name}</h3>
                    {product.seller?.sellerProfile?.verificationStatus === 'VERIFIED' && (
                      <Badge variant="verified" className="text-xs">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-3 h-3" />
                    Member since {new Date(product.seller?.createdAt || '').getFullYear()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click &quot;Contact Seller&quot; to get their email address
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <Button onClick={handleContactSeller} className="flex-1" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Seller
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={toggleFavorite}
                className={isFavorite ? 'text-red-500 border-red-500' : ''}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                Contact the seller to arrange purchase and delivery details
              </p>
              <Link 
                href="/safety-guide" 
                className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 hover:underline transition-colors"
              >
                <AlertTriangle className="w-3 h-3" />
                Read our Safety Guide before transacting
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Seller Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Contact Seller
            </DialogTitle>
            <DialogDescription>
              Use the email address below to contact the seller directly. All further communication and arrangements will be between you and the seller.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Email Display */}
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Seller&apos;s Email Address:</p>
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-lg break-all">{product.seller?.email}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyEmail}
                  className="flex-shrink-0"
                >
                  {emailCopied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Direct Email Link */}
            <Button 
              className="w-full" 
              asChild
            >
              <a href={`mailto:${product.seller?.email}?subject=Inquiry about: ${product.title}`}>
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </a>
            </Button>

            {/* Safety Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-amber-800">
                  <p className="font-medium mb-1">Important Notice</p>
                  <p>
                    Eburutu Mart is a free listing platform. We do not process payments or guarantee transactions. 
                    Please read our <Link href="/safety-guide" className="underline font-medium">Safety Guide</Link> before proceeding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

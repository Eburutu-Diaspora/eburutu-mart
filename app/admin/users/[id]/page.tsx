'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Mail, MapPin, Calendar, Package, Trash2, Store, Users, Phone } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import ReviewsList from '@/components/reviews/reviews-list'
interface UserDetail {
  id: string
  name: string
  email: string
  role: string
  location: string | null
  phone: string | null
  avatar: string | null
  createdAt: string
  products: {
    id: string
    title: string
    price: number
    currency: string
    isActive: boolean
    createdAt: string
    images: { imageUrl: string }[]
    category: { name: string } | null
  }[]
}

export default function AdminUserDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string

  const [user, setUser] = useState<UserDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [removingProduct, setRemovingProduct] = useState<string | null>(null)
  const [removingUser, setRemovingUser] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    fetchUser()
  }, [session, status, router, userId])

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setUser(data)
      } else {
        toast.error('User not found')
        router.push('/admin/users')
      }
    } catch {
      toast.error('Failed to load user')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveProduct = async (productId: string, productTitle: string) => {
    if (!confirm(`Remove listing "${productTitle}"? This cannot be undone.`)) return
    setRemovingProduct(productId)
    try {
      const response = await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success('Listing removed')
        setUser(prev => prev ? { ...prev, products: prev.products.filter(p => p.id !== productId) } : null)
      } else {
        toast.error('Failed to remove listing')
      }
    } catch {
      toast.error('An error occurred')
    } finally {
      setRemovingProduct(null)
    }
  }

  const handleRemoveUser = async () => {
    if (!user) return
    if (!confirm(`Remove ${user.name} completely? This deletes their account and all their listings.`)) return
    setRemovingUser(true)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success(`${user.name} has been removed`)
        router.push('/admin/users')
      } else {
        toast.error('Failed to remove user')
      }
    } catch {
      toast.error('An error occurred')
    } finally {
      setRemovingUser(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link href="/admin/users">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />Back to Users
          </Button>
        </Link>

        {/* User Profile */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
             <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-xl font-bold text-primary flex-shrink-0">
  {user.avatar
    ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
    : <span>{user.name?.charAt(0) || '?'}</span>
  }
</div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  {user.role === 'SELLER' && <Badge className="bg-green-500"><Store className="w-3 h-3 mr-1" />Seller</Badge>}
                  {user.role === 'BUYER' && <Badge variant="outline"><Users className="w-3 h-3 mr-1" />Buyer</Badge>}
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground ml-15">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" />{user.email}</p>
             {user.location && <p className="flex items-center gap-2"><MapPin className="w-4 h-4" />{user.location}</p>}
{user.phone && <p className="flex items-center gap-2"><Phone className="w-4 h-4" />{user.phone}</p>}
              <p className="flex items-center gap-2"><Calendar className="w-4 h-4" />Member since {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          {user.role !== 'ADMIN' && (
            <Button variant="destructive" onClick={handleRemoveUser} disabled={removingUser}>
              <Trash2 className="w-4 h-4 mr-2" />
              {removingUser ? 'Removing...' : 'Remove User'}
            </Button>
          )}
        </div>

        {/* Listings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Listings ({user.products.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.products.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No listings yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.products.map(product => (
                  <div key={product.id} className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      {product.images?.[0]?.imageUrl ? (
                        <img src={product.images[0].imageUrl} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      {product.isActive
                        ? <Badge className="absolute top-2 left-2 bg-green-500">Active</Badge>
                        : <Badge className="absolute top-2 left-2" variant="secondary">Inactive</Badge>}
                    </div>
                    <div className="p-3">
                      <p className="font-medium truncate">{product.title}</p>
                      <p className="text-sm text-muted-foreground">{product.category?.name}</p>
                      <p className="text-primary font-bold mt-1">£{Number(product.price).toFixed(2)}</p>
                      <div className="flex gap-2 mt-3">
                        <Link href={`/products/${product.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">View</Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={removingProduct === product.id}
                          onClick={() => handleRemoveProduct(product.id, product.title)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
       </Card>

        {/* Reviews */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⭐</span>
                Reviews Received
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewsList sellerId={user.id} />
            </CardContent>
          </Card>
        </div>

      </main>
      <Footer />
    </div>
  )
}

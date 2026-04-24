'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Search, Package, Eye, CheckCircle, XCircle, Star, Sparkles, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface Product {
  id: string
  title: string
  price: number
  currency: string
  status: string
  isFeatured: boolean
  isNewArrival: boolean
  isRecommended: boolean
  images: { imageUrl: string }[]
  createdAt: string
  seller: { id: string; name: string; email: string }
  category: { name: string } | null
}

export default function AdminProductsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    fetchProducts()
  }, [session, status, router])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (productId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (response.ok) {
        toast.success('Product status updated')
        fetchProducts()
      } else {
        toast.error('Failed to update product')
      }
    } catch {
      toast.error('An error occurred')
    }
  }

  const handlePlacementToggle = async (productId: string, field: 'isFeatured' | 'isNewArrival' | 'isRecommended', current: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !current })
      })
      if (response.ok) {
        toast.success(`Placement updated`)
        setProducts(prev => prev.map(p =>
          p.id === productId ? { ...p, [field]: !current } : p
        ))
      } else {
        toast.error('Failed to update placement')
      }
    } catch {
      toast.error('An error occurred')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':   return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>
      case 'PENDING':  return <Badge variant="outline" className="text-yellow-600 border-yellow-400">Pending</Badge>
      case 'REJECTED': return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
      case 'SOLD':     return <Badge variant="outline">Sold</Badge>
      default:         return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total:    products.length,
    active:   products.filter(p => p.status === 'ACTIVE').length,
    pending:  products.filter(p => p.status === 'PENDING').length,
    rejected: products.filter(p => p.status === 'REJECTED').length,
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Product Moderation</h1>
          <p className="text-muted-foreground">Review, moderate and allocate product placements on the homepage</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{stats.total}</div><div className="text-sm text-muted-foreground">Total</div></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-500">{stats.active}</div><div className="text-sm text-muted-foreground">Active</div></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-yellow-500">{stats.pending}</div><div className="text-sm text-muted-foreground">Pending</div></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-red-500">{stats.rejected}</div><div className="text-sm text-muted-foreground">Rejected</div></CardContent></Card>
        </div>

        {/* Placement legend */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-muted/40 rounded-lg text-sm">
          <span className="font-medium text-muted-foreground">Homepage placement:</span>
          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" /> Featured Listings</span>
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-blue-500" /> New Arrivals</span>
          <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3 text-emerald-500" /> Recommended</span>
          <span className="text-muted-foreground">— Click to toggle on/off per product</span>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or seller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="SOLD">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Homepage Placement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                            {product.images?.[0]?.imageUrl ? (
                              <Image src={product.images[0].imageUrl} alt={product.title} fill className="object-cover" />
                            ) : (
                              <Package className="w-6 h-6 absolute inset-0 m-auto text-muted-foreground" />
                            )}
                          </div>
                          <p className="font-medium truncate max-w-[160px]">{product.title}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.seller.name}</p>
                          <p className="text-xs text-muted-foreground">{product.seller.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{product.category?.name || <span className="text-muted-foreground">-</span>}</TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {product.currency === 'GBP' ? '£' : product.currency}{Number(product.price).toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>

                      {/* Placement toggles */}
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <button
                            onClick={() => handlePlacementToggle(product.id, 'isFeatured', product.isFeatured)}
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-colors ${
                              product.isFeatured
                                ? 'bg-amber-100 border-amber-400 text-amber-700 font-medium'
                                : 'bg-muted border-muted-foreground/20 text-muted-foreground hover:border-amber-400'
                            }`}
                          >
                            <Star className="w-3 h-3" /> Featured
                          </button>
                          <button
                            onClick={() => handlePlacementToggle(product.id, 'isNewArrival', product.isNewArrival)}
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-colors ${
                              product.isNewArrival
                                ? 'bg-blue-100 border-blue-400 text-blue-700 font-medium'
                                : 'bg-muted border-muted-foreground/20 text-muted-foreground hover:border-blue-400'
                            }`}
                          >
                            <Sparkles className="w-3 h-3" /> New
                          </button>
                          <button
                            onClick={() => handlePlacementToggle(product.id, 'isRecommended', product.isRecommended)}
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-colors ${
                              product.isRecommended
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-700 font-medium'
                                : 'bg-muted border-muted-foreground/20 text-muted-foreground hover:border-emerald-400'
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" /> Recommended
                          </button>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/products/${product.id}`}>
                            <Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button>
                          </Link>
                          {product.status === 'PENDING' && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange(product.id, 'ACTIVE')}>
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleStatusChange(product.id, 'REJECTED')}>
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

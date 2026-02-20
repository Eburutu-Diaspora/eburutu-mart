'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowLeft, CheckCircle, XCircle, Clock, Eye, Search, FileText, Mail, Phone, MapPin, Building } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Verification {
  id: string
  status: string
  businessName: string | null
  businessType: string | null
  businessAddress: string | null
  idDocumentUrl: string | null
  businessDocumentUrl: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
    phone: string | null
    location: string | null
  }
}

export default function AdminVerificationsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [verifications, setVerifications] = useState<Verification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null)
  const [reviewNotes, setReviewNotes] = useState('')
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
    fetchVerifications()
  }, [session, status, router])

  const fetchVerifications = async () => {
    try {
      const response = await fetch('/api/admin/verifications')
      if (response.ok) {
        const data = await response.json()
        setVerifications(data)
      }
    } catch (error) {
      console.error('Error fetching verifications:', error)
      toast.error('Failed to load verifications')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReview = (verification: Verification) => {
    setSelectedVerification(verification)
    setReviewNotes(verification.notes || '')
    setIsReviewDialogOpen(true)
  }

  const handleApprove = async () => {
    if (!selectedVerification) return
    setIsProcessing(true)
    try {
      const response = await fetch(`/api/admin/verifications/${selectedVerification.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'VERIFIED', notes: reviewNotes })
      })
      if (response.ok) {
        toast.success('Seller verified successfully!')
        setIsReviewDialogOpen(false)
        fetchVerifications()
      } else {
        toast.error('Failed to approve verification')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!selectedVerification) return
    if (!reviewNotes.trim()) {
      toast.error('Please provide a reason for rejection')
      return
    }
    setIsProcessing(true)
    try {
      const response = await fetch(`/api/admin/verifications/${selectedVerification.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'REJECTED', notes: reviewNotes })
      })
      if (response.ok) {
        toast.success('Verification rejected')
        setIsReviewDialogOpen(false)
        fetchVerifications()
      } else {
        toast.error('Failed to reject verification')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return <Badge variant="verified"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>
      case 'PENDING':
        return <Badge variant="pending"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'IN_REVIEW':
        return <Badge className="bg-blue-500"><Eye className="w-3 h-3 mr-1" />In Review</Badge>
      case 'REJECTED':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredVerifications = verifications.filter(v =>
    v.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.businessName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pendingCount = verifications.filter(v => v.status === 'PENDING' || v.status === 'IN_REVIEW').length

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
        {/* Back Button */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Seller Verifications</h1>
            <p className="text-muted-foreground">
              Review and manage seller verification requests
            </p>
          </div>
          {pendingCount > 0 && (
            <Badge variant="destructive" className="text-lg px-4 py-2 mt-4 md:mt-0">
              {pendingCount} Pending Review
            </Badge>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or business..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Verifications Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Seller</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVerifications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No verification requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVerifications.map((verification) => (
                    <TableRow key={verification.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{verification.user.name}</p>
                          <p className="text-sm text-muted-foreground">{verification.user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{verification.businessName || 'Not provided'}</p>
                          <p className="text-sm text-muted-foreground">{verification.businessType || '-'}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(verification.status)}</TableCell>
                      <TableCell>
                        {new Date(verification.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReview(verification)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Verification</DialogTitle>
            <DialogDescription>
              Review the seller's verification details and documents
            </DialogDescription>
          </DialogHeader>

          {selectedVerification && (
            <div className="space-y-6">
              {/* Seller Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Seller Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {selectedVerification.user.email}
                    </div>
                    {selectedVerification.user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {selectedVerification.user.phone}
                      </div>
                    )}
                    {selectedVerification.user.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {selectedVerification.user.location}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Business Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      {selectedVerification.businessName || 'Not provided'}
                    </div>
                    <div className="text-muted-foreground">
                      Type: {selectedVerification.businessType || 'Not specified'}
                    </div>
                    {selectedVerification.businessAddress && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {selectedVerification.businessAddress}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Documents */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm">ID Document</span>
                    </div>
                    {selectedVerification.idDocumentUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedVerification.idDocumentUrl} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not uploaded</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm">Business Document</span>
                    </div>
                    {selectedVerification.businessDocumentUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedVerification.businessDocumentUrl} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not uploaded</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Review Notes */}
              <div>
                <label className="text-sm font-medium mb-2 block">Review Notes</label>
                <Textarea
                  placeholder="Add notes about this verification (required for rejection)..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={isProcessing}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Reject
            </Button>
            <Button 
              onClick={handleApprove}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

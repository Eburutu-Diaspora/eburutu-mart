'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import StarRating from './star-rating'
import ReviewForm from './review-form'

interface Review {
  id: string
  rating: number
  comment: string | null
  createdAt: string
  buyer: { id: string; name: string | null; image: string | null }
}

interface ReviewsListProps {
  sellerId: string
}

export default function ReviewsList({ sellerId }: ReviewsListProps) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [avgRating, setAvgRating] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?sellerId=${sellerId}`)
      const data = await res.json()
      setReviews(data.reviews || [])
      setAvgRating(data.avgRating || 0)
      setTotal(data.total || 0)
    } catch {
      console.error('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }, [sellerId])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const alreadyReviewed = reviews.some((r) => r.buyer.id === session?.user?.id)
  const isSeller = session?.user?.id === sellerId
  const canReview = session?.user && !isSeller && !alreadyReviewed

  if (loading) {
    return <div className="text-sm text-gray-400 py-4">Loading reviews...</div>
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-3">
        <StarRating rating={Math.round(avgRating)} size="md" />
        <span className="text-gray-700 font-medium">
          {avgRating > 0 ? avgRating.toFixed(1) : 'No ratings yet'}
        </span>
        <span className="text-gray-400 text-sm">({total} review{total !== 1 ? 's' : ''})</span>
      </div>

      {/* Review form for eligible buyers */}
      {canReview && (
        <ReviewForm sellerId={sellerId} onSuccess={fetchReviews} />
      )}

      {/* Reviews */}
      {reviews.length === 0 ? (
        <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm">
                    {review.buyer.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {review.buyer.name || 'Anonymous'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </span>
              </div>
              <StarRating rating={review.rating} size="sm" />
              {review.comment && (
                <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

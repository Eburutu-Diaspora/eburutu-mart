'use client'

import { useState } from 'react'
import StarRating from './star-rating'

interface ReviewFormProps {
  sellerId: string
  onSuccess?: () => void
}

export default function ReviewForm({ sellerId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit() {
    if (rating === 0) {
      setError('Please select a star rating.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sellerId, rating, comment })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to submit review.')
      } else {
        setSuccess(true)
        setRating(0)
        setComment('')
        onSuccess?.()
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-700 text-sm">
        ✅ Thank you for your review!
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 p-5 space-y-4">
      <h3 className="font-semibold text-gray-800">Leave a Review</h3>

      <div>
        <p className="text-sm text-gray-600 mb-1">Your rating</p>
        <StarRating rating={rating} interactive onRate={setRating} size="lg" />
      </div>

      <div>
        <label className="text-sm text-gray-600 block mb-1">
          Comment <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this seller..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-2 rounded-md text-sm transition-colors"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </div>
  )
}

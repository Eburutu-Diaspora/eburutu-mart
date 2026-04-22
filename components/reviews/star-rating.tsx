'use client'

interface StarRatingProps {
  rating: number
  interactive?: boolean
  onRate?: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
}

export default function StarRating({
  rating,
  interactive = false,
  onRate,
  size = 'md'
}: StarRatingProps) {
  const sizes = { sm: 'text-sm', md: 'text-xl', lg: 'text-2xl' }

  return (
    <div className={`flex gap-0.5 ${sizes[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate?.(star)}
          className={`${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:text-yellow-400 transition-colors' : 'cursor-default'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

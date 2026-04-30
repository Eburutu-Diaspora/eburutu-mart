'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface PromoSlot {
  id: string
  slotKey: string
  imageUrl: string | null
  redirectUrl: string | null
  altText: string | null
  isActive: boolean
}

export default function PromoSlotCircle({ slotKey }: { slotKey: string }) {
  const [slot, setSlot] = useState<PromoSlot | null | undefined>(undefined)

  useEffect(() => {
    fetch(`/api/promo-slots?key=${slotKey}`)
      .then(r => r.json())
      .then(data => setSlot(data?.id ? data : null))
      .catch(() => setSlot(null))
  }, [slotKey])

  if (!slot || !slot.isActive || !slot.imageUrl) return null

  const circle = (
    <div style={{
      width: 120,
      height: 120,
      borderRadius: '50%',
      overflow: 'hidden',
      border: '3px solid #e5e7eb',
      flexShrink: 0,
    }}>
      <img
        src={slot.imageUrl}
        alt={slot.altText || 'Promotional content'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
    </div>
  )

  return slot.redirectUrl ? (
    <Link href={slot.redirectUrl} target="_blank" rel="noopener noreferrer">
      {circle}
    </Link>
  ) : circle
}

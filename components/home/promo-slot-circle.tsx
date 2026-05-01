

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
      width: 180,
      height: 180,
      borderRadius: '50%',
      overflow: 'hidden',
      border: '3px solid #f0f0f0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <img
        src={slot.imageUrl}
        alt={slot.altText || 'Promotional content'}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          padding: 10,
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

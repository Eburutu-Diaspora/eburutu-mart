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

const BANNER_SLOTS = ['banner-1', 'banner-2', 'banner-3', 'banner-4']

function BannerBox({ slot }: { slot: PromoSlot | null }) {
  const placeholder = (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px dashed #d1d5db',
      borderRadius: 8,
      color: '#9ca3af',
      fontSize: 12,
      gap: 4,
      padding: 8,
      textAlign: 'center',
    }}>
      <span style={{ fontSize: 20 }}>📢</span>
      <span>Ad Space</span>
      <span style={{ fontSize: 10 }}>Available</span>
    </div>
  )

  if (!slot || !slot.isActive || !slot.imageUrl) return placeholder

  const img = (
    <img
      src={slot.imageUrl}
      alt={slot.altText || 'Advertisement'}
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
    />
  )

  return slot.redirectUrl ? (
    <Link href={slot.redirectUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', height: '100%' }}>
      {img}
    </Link>
  ) : img
}

export default function PromoSlotBanners() {
  const [slots, setSlots] = useState<Record<string, PromoSlot | null>>({})

  useEffect(() => {
    fetch('/api/promo-slots')
      .then(r => r.json())
      .then((data: PromoSlot[]) => {
        if (!Array.isArray(data)) return
        const map: Record<string, PromoSlot | null> = {}
        BANNER_SLOTS.forEach(key => {
          map[key] = data.find(s => s.slotKey === key) || null
        })
        setSlots(map)
      })
      .catch(() => {})
  }, [])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      height: 100,
      margin: '16px 0',
    }}>
      {BANNER_SLOTS.map(key => (
        <div key={key} style={{ height: '100%' }}>
          <BannerBox slot={slots[key] ?? null} />
        </div>
      ))}
    </div>
  )
}


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

const cardStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: 16,
  background: '#ffffff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)',
  border: '1px solid #f3f4f6',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

function BannerBox({ slot }: { slot: PromoSlot | null }) {
  if (!slot || !slot.isActive || !slot.imageUrl) {
    return (
      <div style={cardStyle}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9ca3af',
          gap: 6,
          textAlign: 'center',
          padding: 16,
        }}>
          <span style={{ fontSize: 28 }}>📢</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#6b7280' }}>Ad Space</span>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>Available</span>
        </div>
      </div>
    )
  }

  const img = (
    <img
      src={slot.imageUrl}
      alt={slot.altText || 'Advertisement'}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
        padding: 12,
        display: 'block',
        boxSizing: 'border-box',
      }}
    />
  )

  return (
    <div style={cardStyle}>
      {slot.redirectUrl ? (
        <Link
          href={slot.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          {img}
        </Link>
      ) : img}
    </div>
  )
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
      gap: 16,
      margin: '24px 0 0 0',
    }}>
      {BANNER_SLOTS.map(key => (
        <div key={key} style={{ height: 180 }}>
          <BannerBox slot={slots[key] ?? null} />
        </div>
      ))}
    </div>
  )
}

'use client'

import Image from 'next/image'
import type { PromoSlot } from './promo-slot-circle'

interface Props {
  slots: PromoSlot[]
}

const BANNER_KEYS = ['banner_1', 'banner_2', 'banner_3', 'banner_4'] as const

export function PromoSlotBanners({ slots }: Props) {
  const banners = BANNER_KEYS.map(key => slots.find(s => s.slotKey === key))
  const anyActive = banners.some(s => s?.isActive && s.imageUrl)

  // Entire section hidden if no active banners — no gap on page
  if (!anyActive) return null

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {banners.map((slot, i) => {
          // Empty slot: muted placeholder so grid stays even
          if (!slot?.isActive || !slot.imageUrl) {
            return (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl bg-muted/20 border border-dashed border-muted-foreground/20"
                aria-hidden="true"
              />
            )
          }

          const box = (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md
              hover:shadow-xl hover:scale-[1.02]
              transition-all duration-300">
              <Image
                src={slot.imageUrl}
                alt={slot.altText ?? 'Promotion'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          )

          if (!slot.redirectUrl) {
            return <div key={i}>{box}</div>
          }

          return (
            <a
              key={i}
              href={slot.redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label={slot.altText ?? 'Sponsored link'}
            >
              {box}
            </a>
          )
        })}
      </div>
    </div>
  )
}

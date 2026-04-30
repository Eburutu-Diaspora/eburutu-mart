'use client'

import Image from 'next/image'

export interface PromoSlot {
  slotKey:     string
  imageUrl:    string | null
  redirectUrl: string | null
  altText:     string | null
  isActive:    boolean
}

interface Props {
  slot: PromoSlot | undefined
}

export function PromoSlotCircle({ slot }: Props) {
  // Invisible spacer — keeps layout symmetrical even when slot is empty
  if (!slot?.isActive || !slot.imageUrl) {
    return (
      <div
        className="flex-shrink-0 w-36 h-36 rounded-full"
        aria-hidden="true"
      />
    )
  }

  const circle = (
    <div className="relative w-36 h-36 flex-shrink-0 rounded-full overflow-hidden
      border-2 border-primary/20 shadow-md
      hover:border-primary/60 hover:shadow-xl hover:scale-105
      transition-all duration-300">
      <Image
        src={slot.imageUrl}
        alt={slot.altText ?? 'Sponsored'}
        fill
        className="object-cover"
        sizes="144px"
      />
    </div>
  )

  if (!slot.redirectUrl) {
    return <div className="flex-shrink-0">{circle}</div>
  }

  return (
    <a
      href={slot.redirectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 block"
      aria-label={slot.altText ?? 'Sponsored link'}
    >
      {circle}
    </a>
  )
}

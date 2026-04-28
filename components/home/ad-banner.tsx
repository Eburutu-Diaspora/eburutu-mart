'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

interface AdBannerProps {
  placement: 'A' | 'B'
}

// ═══════════════════════════════════════════════════════════════════
// AD CONFIGURATION — Edit this section only. No code knowledge needed.
//
// To ENABLE an ad:   set  enabled: true
// To DISABLE an ad:  set  enabled: false
//
// When disabled the slot is completely hidden — no gap on the page.
// ═══════════════════════════════════════════════════════════════════

const ads = {

  A: {
    enabled:     false,           // ← Change to true when Obong is ready
    type:        'image' as const,
    href:        'https://obong.co.uk',
    label:       'Sponsored',
    image:       '/obong-ad.png',   // Image path in your /public/ads/ folder
    alt:         'Obong — Royalty & Style',
    bgColor:     'bg-white',
    // Fallback text shown beside the image
    title:       'Obong — Royalty & Style',
    description: 'Premium African fashion and lifestyle brand. Discover the collection.',
    ctaText:     'Visit Obong',
  },

  B: {
    enabled:     true,            // ← Text ad — always on until a paid advertiser takes the slot
    type:        'text' as const,
    href:        '/contact',
    label:       'Advertise Here',
    bgFrom:      'from-amber-500',
    bgTo:        'to-orange-600',
    title:       'Promote Your Products to the Diaspora Community',
    description: 'Over 10,000 Africans in the UK visit EburutuMart every month. Your brand, right here.',
    ctaText:     'Enquire Now',
  },

}

// ═══════════════════════════════════════════════════════════════════

export function AdBanner({ placement }: AdBannerProps) {
  const ad = ads[placement]

  // Hidden when disabled — no layout gap
  if (!ad.enabled) return null

  // ── IMAGE AD (e.g. Obong) ────────────────────────────────────────
  if (ad.type === 'image') {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href={ad.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className={`relative overflow-hidden rounded-2xl ${ad.bgColor} border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300`}>
            {/* Sponsored label */}
            <span className="absolute top-3 right-4 z-10 text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
              {ad.label}
            </span>

            <div className="flex flex-col sm:flex-row items-center gap-6 px-8 py-6">
              {/* Logo */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={ad.image}
                  alt={ad.alt}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xl font-bold text-gray-900 mb-1">{ad.title}</p>
                <p className="text-gray-500 text-sm mb-4">{ad.description}</p>
                <span className="inline-flex items-center gap-2 bg-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl group-hover:bg-purple-700 transition-colors">
                  {ad.ctaText}
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // ── TEXT AD ──────────────────────────────────────────────────────
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${(ad as any).bgFrom} ${(ad as any).bgTo} px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4`}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />

        <span className="absolute top-3 right-4 text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/20 text-white">
          {ad.label}
        </span>

        <div className="relative text-white text-center sm:text-left">
          <p className="text-lg font-bold mb-1">{ad.title}</p>
          <p className="text-white/80 text-sm max-w-xl">{ad.description}</p>
        </div>

        <Link
          href={ad.href}
          className="relative flex-shrink-0 inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors"
        >
          {ad.ctaText}
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface PromoSlot {
  id: string
  slotKey: string
  imageUrl: string | null
  redirectUrl: string | null
  altText: string | null
  isActive: boolean
}

const ALL_SLOTS = [
  { key: 'circle-left',  label: 'Circle Left',  shape: 'circle' as const },
  { key: 'circle-right', label: 'Circle Right', shape: 'circle' as const },
  { key: 'banner-1',     label: 'Banner Box 1', shape: 'banner' as const },
  { key: 'banner-2',     label: 'Banner Box 2', shape: 'banner' as const },
  { key: 'banner-3',     label: 'Banner Box 3', shape: 'banner' as const },
  { key: 'banner-4',     label: 'Banner Box 4', shape: 'banner' as const },
]

export default function PromoSlotsAdmin() {
  const supabase = createClientComponentClient()
  const [slots, setSlots]     = useState<Record<string, PromoSlot | null>>({})
  const [redirectUrls, setRedirectUrls] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState<string | null>(null)
  const [saving, setSaving]   = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    fetch('/api/promo-slots')
      .then(r => r.json())
      .then((data: PromoSlot[]) => {
        if (!Array.isArray(data)) return
        const map: Record<string, PromoSlot | null> = {}
        const urls: Record<string, string> = {}
        ALL_SLOTS.forEach(({ key }) => {
          const found = data.find(s => s.slotKey === key) || null
          map[key] = found
          urls[key] = found?.redirectUrl || ''
        })
        setSlots(map)
        setRedirectUrls(urls)
      })
  }, [])

  const handleImageClick = (slotKey: string) => {
    fileInputRefs.current[slotKey]?.click()
  }

  const handleFileChange = async (slotKey: string, file: File) => {
    setUploading(slotKey)
    try {
      const ext  = file.name.split('.').pop()
      const path = `slots/${slotKey}-${Date.now()}.${ext}`
      const { data, error } = await supabase.storage
        .from('promo-slots')
        .upload(path, file, { upsert: true })
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage
        .from('promo-slots')
        .getPublicUrl(data.path)
      // Auto-save with the new image URL, keeping existing redirect
      await saveSlot(slotKey, publicUrl, redirectUrls[slotKey] || '', true)
    } catch (err) {
      setMessage('Upload failed. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setUploading(null)
    }
  }

  const saveSlot = async (
    slotKey: string,
    imageUrl: string,
    redirectUrl: string,
    isActive: boolean
  ) => {
    setSaving(slotKey)
    try {
      const res = await fetch('/api/promo-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotKey, imageUrl, redirectUrl, isActive }),
      })
      const updated = await res.json()
      setSlots(prev => ({ ...prev, [slotKey]: updated }))
      setRedirectUrls(prev => ({ ...prev, [slotKey]: redirectUrl }))
      setMessage(`"${slotKey}" saved.`)
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setSaving(null)
    }
  }

  const handleDeactivate = async (slotKey: string) => {
    const slot = slots[slotKey]
    if (!slot) return
    await saveSlot(slotKey, slot.imageUrl || '', redirectUrls[slotKey] || '', false)
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 6 }}>Promo Slots</h1>
      <p style={{ color: '#6b7280', marginBottom: 24, fontSize: 14 }}>
        Click any slot to upload an image. Add a redirect link then activate.
      </p>

      {message && (
        <div style={{ background: '#d1fae5', color: '#065f46', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {ALL_SLOTS.map(({ key, label, shape }) => {
          const slot     = slots[key]
          const isActive = slot?.isActive ?? false
          const imageUrl = slot?.imageUrl || null
          const isCircle = shape === 'circle'

          return (
            <div key={key} style={{
              border: `1px solid ${isActive ? '#6ee7b7' : '#e5e7eb'}`,
              borderRadius: 12,
              padding: '16px 20px',
              background: isActive ? '#f0fdf4' : '#fff',
              display: 'flex',
              gap: 20,
              alignItems: 'center',
            }}>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={el => { fileInputRefs.current[key] = el }}
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file) handleFileChange(key, file)
                  e.target.value = ''
                }}
              />

              {/* Clickable image area */}
              <div
                onClick={() => handleImageClick(key)}
                title="Click to upload image"
                style={{
                  width: isCircle ? 90 : 140,
                  height: isCircle ? 90 : 70,
                  borderRadius: isCircle ? '50%' : 8,
                  overflow: 'hidden',
                  border: '2px dashed #d1d5db',
                  cursor: 'pointer',
                  flexShrink: 0,
                  background: '#f9fafb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {uploading === key ? (
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>Uploading...</span>
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                    <div style={{ fontSize: 22 }}>📷</div>
                    <div style={{ fontSize: 10, marginTop: 2 }}>Click to upload</div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <span style={{ fontWeight: 500, fontSize: 14 }}>{label}</span>
                    <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 8, fontFamily: 'monospace' }}>{key}</span>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 500, padding: '2px 10px',
                    borderRadius: 20,
                    background: isActive ? '#d1fae5' : '#f3f4f6',
                    color: isActive ? '#065f46' : '#6b7280',
                  }}>
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <input
                  type="text"
                  placeholder="Redirect URL (optional)"
                  value={redirectUrls[key] || ''}
                  onChange={e => setRedirectUrls(prev => ({ ...prev, [key]: e.target.value }))}
                  style={{
                    width: '100%', padding: '7px 10px',
                    border: '1px solid #d1d5db', borderRadius: 6,
                    fontSize: 13, marginBottom: 10, boxSizing: 'border-box',
                  }}
                />

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => saveSlot(key, imageUrl || '', redirectUrls[key] || '', true)}
                    disabled={saving === key || !imageUrl}
                    style={{
                      padding: '7px 16px',
                      background: imageUrl ? '#059669' : '#d1d5db',
                      color: '#fff', border: 'none', borderRadius: 6,
                      fontSize: 13, cursor: imageUrl ? 'pointer' : 'not-allowed',
                      fontWeight: 500,
                    }}
                  >
                    {saving === key ? 'Saving...' : 'Activate'}
                  </button>
                  {isActive && (
                    <button
                      onClick={() => handleDeactivate(key)}
                      disabled={saving === key}
                      style={{
                        padding: '7px 16px', background: '#fff',
                        color: '#dc2626', border: '1px solid #dc2626',
                        borderRadius: 6, fontSize: 13, cursor: 'pointer',
                      }}
                    >
                      Deactivate
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

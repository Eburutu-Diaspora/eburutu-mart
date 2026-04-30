'use client'

import { useEffect, useState } from 'react'

interface PromoSlot {
  id: string
  slotKey: string
  imageUrl: string | null
  redirectUrl: string | null
  altText: string | null
  isActive: boolean
}

const ALL_SLOTS = [
  { key: 'circle-left', label: 'Circle Left (Homepage)' },
  { key: 'circle-right', label: 'Circle Right (Homepage)' },
  { key: 'banner-1', label: 'Banner Box 1' },
  { key: 'banner-2', label: 'Banner Box 2' },
  { key: 'banner-3', label: 'Banner Box 3' },
  { key: 'banner-4', label: 'Banner Box 4' },
]

export default function PromoSlotsAdmin() {
  const [slots, setSlots] = useState<Record<string, PromoSlot | null>>({})
  const [form, setForm] = useState<Record<string, { imageUrl: string; redirectUrl: string; altText: string }>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/promo-slots')
      .then(r => r.json())
      .then((data: PromoSlot[]) => {
        if (!Array.isArray(data)) return
        const map: Record<string, PromoSlot | null> = {}
        const formInit: typeof form = {}
        ALL_SLOTS.forEach(({ key }) => {
          const found = data.find(s => s.slotKey === key) || null
          map[key] = found
          formInit[key] = {
            imageUrl: found?.imageUrl || '',
            redirectUrl: found?.redirectUrl || '',
            altText: found?.altText || '',
          }
        })
        setSlots(map)
        setForm(formInit)
      })
  }, [])

  const handleSave = async (slotKey: string, isActive: boolean) => {
    setSaving(slotKey)
    try {
      const res = await fetch('/api/promo-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotKey,
          imageUrl: form[slotKey]?.imageUrl || null,
          redirectUrl: form[slotKey]?.redirectUrl || null,
          altText: form[slotKey]?.altText || 'Promotional content',
          isActive,
        }),
      })
      const updated = await res.json()
      setSlots(prev => ({ ...prev, [slotKey]: updated }))
      setMessage(`Saved "${slotKey}" successfully.`)
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Error saving slot.')
    } finally {
      setSaving(null)
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Promo Slots Manager</h1>
      <p style={{ color: '#6b7280', marginBottom: 24 }}>
        Manage the 6 promotional spaces on the homepage. Activate a slot by adding an image URL and clicking Activate.
      </p>

      {message && (
        <div style={{ background: '#d1fae5', color: '#065f46', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {ALL_SLOTS.map(({ key, label }) => {
          const slot = slots[key]
          const isActive = slot?.isActive ?? false
          const f = form[key] || { imageUrl: '', redirectUrl: '', altText: '' }

          return (
            <div key={key} style={{
              border: `1px solid ${isActive ? '#6ee7b7' : '#e5e7eb'}`,
              borderRadius: 12,
              padding: '16px 20px',
              background: isActive ? '#f0fdf4' : '#fff',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 15 }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' }}>{key}</div>
                </div>
                <span style={{
                  fontSize: 12,
                  fontWeight: 500,
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: isActive ? '#d1fae5' : '#f3f4f6',
                  color: isActive ? '#065f46' : '#6b7280',
                }}>
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                <input
                  type="text"
                  placeholder="Image URL (required to activate)"
                  value={f.imageUrl}
                  onChange={e => setForm(prev => ({ ...prev, [key]: { ...prev[key], imageUrl: e.target.value } }))}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Redirect URL (optional)"
                  value={f.redirectUrl}
                  onChange={e => setForm(prev => ({ ...prev, [key]: { ...prev[key], redirectUrl: e.target.value } }))}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Alt text (optional)"
                  value={f.altText}
                  onChange={e => setForm(prev => ({ ...prev, [key]: { ...prev[key], altText: e.target.value } }))}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => handleSave(key, true)}
                  disabled={saving === key || !f.imageUrl}
                  style={{
                    padding: '8px 18px',
                    background: f.imageUrl ? '#059669' : '#d1d5db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 13,
                    cursor: f.imageUrl ? 'pointer' : 'not-allowed',
                    fontWeight: 500,
                  }}
                >
                  {saving === key ? 'Saving...' : 'Activate'}
                </button>
                {isActive && (
                  <button
                    onClick={() => handleSave(key, false)}
                    disabled={saving === key}
                    style={{
                      padding: '8px 18px',
                      background: '#fff',
                      color: '#dc2626',
                      border: '1px solid #dc2626',
                      borderRadius: 6,
                      fontSize: 13,
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                  >
                    Deactivate
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Upload, CheckCircle, AlertCircle, Loader2, ImageIcon } from 'lucide-react'

interface PromoSlot {
  id: string
  slotKey: string
  imageUrl: string | null
  redirectUrl: string | null
  altText: string | null
  isActive: boolean
}

const SLOT_LABELS: Record<string, { label: string; description: string }> = {
  circle_left:  { label: 'Circle — Left',   description: 'Round advert left of "View All Categories"' },
  circle_right: { label: 'Circle — Right',  description: 'Round advert right of "View All Categories"' },
  banner_1:     { label: 'Banner Box 1',    description: 'First of 4 boxes below Featured Listings' },
  banner_2:     { label: 'Banner Box 2',    description: 'Second of 4 boxes below Featured Listings' },
  banner_3:     { label: 'Banner Box 3',    description: 'Third of 4 boxes below Featured Listings' },
  banner_4:     { label: 'Banner Box 4',    description: 'Fourth of 4 boxes below Featured Listings' },
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

export function PromoSlotsManager() {
  const [slots, setSlots]     = useState<PromoSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [saves, setSaves]     = useState<Record<string, SaveState>>({})
  const [uploads, setUploads] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch('/api/promo-slots')
      .then(res => res.json())
      .then(data => { setSlots(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const updateSlotField = (slotKey: string, field: keyof PromoSlot, value: any) => {
    setSlots(prev => prev.map(s => s.slotKey === slotKey ? { ...s, [field]: value } : s))
  }

  const handleUpload = async (slotKey: string, file: File) => {
    setUploads(prev => ({ ...prev, [slotKey]: true }))
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('slotKey', slotKey)
      const res  = await fetch('/api/promo-slots/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (data.url) {
        updateSlotField(slotKey, 'imageUrl', data.url)
      }
    } catch {
      // silent — user will see no preview
    } finally {
      setUploads(prev => ({ ...prev, [slotKey]: false }))
    }
  }

  const handleSave = async (slot: PromoSlot) => {
    setSaves(prev => ({ ...prev, [slot.slotKey]: 'saving' }))
    try {
      const res = await fetch('/api/promo-slots', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotKey:     slot.slotKey,
          imageUrl:    slot.imageUrl,
          redirectUrl: slot.redirectUrl,
          altText:     slot.altText,
          isActive:    slot.isActive,
        }),
      })
      if (!res.ok) throw new Error()
      setSaves(prev => ({ ...prev, [slot.slotKey]: 'saved' }))
      setTimeout(() => setSaves(prev => ({ ...prev, [slot.slotKey]: 'idle' })), 2500)
    } catch {
      setSaves(prev => ({ ...prev, [slot.slotKey]: 'error' }))
      setTimeout(() => setSaves(prev => ({ ...prev, [slot.slotKey]: 'idle' })), 3000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const circles = slots.filter(s => s.slotKey.startsWith('circle'))
  const banners = slots.filter(s => s.slotKey.startsWith('banner'))

  const renderSlotCard = (slot: PromoSlot) => {
    const meta    = SLOT_LABELS[slot.slotKey]
    const isCircle = slot.slotKey.startsWith('circle')
    const save    = saves[slot.slotKey] ?? 'idle'
    const uploading = uploads[slot.slotKey] ?? false

    return (
      <Card key={slot.slotKey} className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">{meta?.label ?? slot.slotKey}</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">{meta?.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {slot.isActive ? 'Live' : 'Hidden'}
              </span>
              <Switch
                checked={slot.isActive}
                onCheckedChange={val => updateSlotField(slot.slotKey, 'isActive', val)}
              />
              {slot.isActive
                ? <Badge className="bg-green-500/10 text-green-700 text-xs">Active</Badge>
                : <Badge variant="secondary" className="text-xs">Inactive</Badge>
              }
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Image preview + upload */}
          <div>
            <Label className="text-xs font-medium mb-2 block">Image</Label>
            <div className="flex gap-3 items-start">
              {/* Preview */}
              <div className={`flex-shrink-0 bg-muted border border-dashed border-muted-foreground/30 overflow-hidden flex items-center justify-center
                ${isCircle ? 'w-20 h-20 rounded-full' : 'w-28 h-20 rounded-xl'}`}>
                {slot.imageUrl ? (
                  <div className="relative w-full h-full">
                    <Image src={slot.imageUrl} alt="Preview" fill className="object-cover" />
                  </div>
                ) : (
                  <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
                )}
              </div>

              {/* Upload + URL */}
              <div className="flex-1 space-y-2">
                <label className="block">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-primary/40 hover:border-primary/70 hover:bg-primary/5 cursor-pointer transition-colors text-xs text-primary font-medium
                    ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {uploading
                      ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      : <Upload className="w-3.5 h-3.5" />
                    }
                    {uploading ? 'Uploading…' : 'Upload image'}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    disabled={uploading}
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) handleUpload(slot.slotKey, file)
                    }}
                  />
                </label>
                <Input
                  placeholder="or paste image URL"
                  value={slot.imageUrl ?? ''}
                  onChange={e => updateSlotField(slot.slotKey, 'imageUrl', e.target.value || null)}
                  className="text-xs h-8"
                />
              </div>
            </div>
          </div>

          {/* Redirect URL */}
          <div>
            <Label className="text-xs font-medium mb-1 block">Redirect URL</Label>
            <Input
              placeholder="https://example.com"
              value={slot.redirectUrl ?? ''}
              onChange={e => updateSlotField(slot.slotKey, 'redirectUrl', e.target.value || null)}
              className="text-xs h-8"
            />
          </div>

          {/* Alt text */}
          <div>
            <Label className="text-xs font-medium mb-1 block">Alt text</Label>
            <Input
              placeholder="Description of the image"
              value={slot.altText ?? ''}
              onChange={e => updateSlotField(slot.slotKey, 'altText', e.target.value || null)}
              className="text-xs h-8"
            />
          </div>

          {/* Save button */}
          <Button
            className="w-full h-8 text-xs"
            onClick={() => handleSave(slot)}
            disabled={save === 'saving'}
          >
            {save === 'saving' && <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />}
            {save === 'saved'  && <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-green-500" />}
            {save === 'error'  && <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-red-500" />}
            {save === 'saving' ? 'Saving…'
              : save === 'saved'  ? 'Saved!'
              : save === 'error'  ? 'Error — try again'
              : 'Save changes'}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-10">
      {/* Circles */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Category page circles</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Two round ads flanking the "View All Categories" button. Leave inactive to hide them.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {circles.map(renderSlotCard)}
        </div>
      </div>

      {/* Banners */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Featured listings banner boxes</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Four rounded boxes below the featured products grid. The whole row hides if all four are inactive.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {banners.map(renderSlotCard)}
        </div>
      </div>
    </div>
  )
}

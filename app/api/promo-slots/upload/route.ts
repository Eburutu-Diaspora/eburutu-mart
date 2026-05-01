
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const slotKey = formData.get('slotKey') as string
    if (!file || !slotKey) {
      return NextResponse.json({ error: 'Missing file or slotKey' }, { status: 400 })
    }
    const ext = file.name.split('.').pop()
    const path = `slots/${slotKey}-${Date.now()}.${ext}`
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const { data, error } = await supabase.storage
      .from('promo-slots')
      .upload(path, buffer, { contentType: file.type, upsert: true })
    if (error) throw error
    const { data: { publicUrl } } = supabase.storage
      .from('promo-slots')
      .getPublicUrl(data.path)
    return NextResponse.json({ publicUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

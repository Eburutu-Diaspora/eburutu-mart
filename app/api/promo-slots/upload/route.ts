import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAuthSession } from '@/lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const formData = await req.formData()
    const file    = formData.get('file')    as File   | null
    const slotKey = formData.get('slotKey') as string | null

    if (!file || !slotKey) {
      return NextResponse.json({ error: 'Missing file or slotKey' }, { status: 400 })
    }

    const ext      = file.name.split('.').pop() ?? 'jpg'
    const fileName = `${slotKey}-${Date.now()}.${ext}`
    const buffer   = await file.arrayBuffer()

    const { data, error } = await supabase.storage
      .from('promo-images')
      .upload(fileName, buffer, { contentType: file.type, upsert: true })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('promo-images')
      .getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl })
  } catch (err) {
    console.error('[promo-slots/upload]', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

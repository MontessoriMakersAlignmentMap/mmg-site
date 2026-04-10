import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)
  const residentId = searchParams.get('resident_id')
  const status = searchParams.get('status')

  let query = supabase
    .from('residency_album_entries')
    .select('*, lesson:residency_lessons(*), feedback:residency_feedback(*, mentor:residency_profiles(first_name, last_name))')
    .order('created_at', { ascending: false })

  if (residentId) query = query.eq('resident_id', residentId)
  if (status) query = query.eq('status', status)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const { data, error } = await supabase
    .from('residency_album_entries')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}

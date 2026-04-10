import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)
  const residentId = searchParams.get('resident_id')

  let query = supabase
    .from('residency_assignments')
    .select('*, lesson:residency_lessons(*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*))')
    .order('created_at', { ascending: false })

  if (residentId) query = query.eq('resident_id', residentId)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const { data, error } = await supabase
    .from('residency_assignments')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)

  let query = supabase
    .from('residency_lessons')
    .select('*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*)')
    .order('sort_order')

  const status = searchParams.get('status')
  if (status) query = query.eq('status', status)

  const strand = searchParams.get('strand')
  if (strand) query = query.eq('strand_id', strand)

  const level = searchParams.get('level')
  if (level) query = query.eq('level_id', level)

  const category = searchParams.get('category')
  if (category) query = query.eq('category_id', category)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const { data, error } = await supabase
    .from('residency_lessons')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const cohortId = new URL(req.url).searchParams.get('cohort_id')

  let query = supabase
    .from('residency_live_session_logs')
    .select('*, bundle:residency_bundles(id, weekly_theme, week_number)')
    .is('deleted_at', null)
    .order('session_date', { ascending: false })

  if (cohortId) query = query.eq('cohort_id', cohortId)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const { data, error } = await supabase
    .from('residency_live_session_logs')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

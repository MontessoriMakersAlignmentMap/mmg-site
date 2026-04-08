import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const sb = createServiceClient()

  // Get searches with pipeline count
  const { data: searches, error } = await sb
    .from('crm_searches')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Count pipeline entries per search
  const { data: counts } = await sb
    .from('crm_pipeline')
    .select('search_id')
  const countMap: Record<string, number> = {}
  for (const row of counts ?? []) {
    countMap[row.search_id] = (countMap[row.search_id] ?? 0) + 1
  }

  const enriched = (searches ?? []).map(s => ({ ...s, pipeline_count: countMap[s.id] ?? 0 }))
  return NextResponse.json(enriched)
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const sb = createServiceClient()
  const { data, error } = await sb.from('crm_searches').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, ...updates } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const sb = createServiceClient()
  const { data, error } = await sb.from('crm_searches').update(updates).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

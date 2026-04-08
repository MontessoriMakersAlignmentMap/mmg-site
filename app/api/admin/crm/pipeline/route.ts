import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const sb = createServiceClient()

  const { data: pipeline, error } = await sb
    .from('crm_pipeline')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Join candidate + search data
  const candidateIds = [...new Set((pipeline ?? []).map(p => p.candidate_id))]
  const searchIds = [...new Set((pipeline ?? []).map(p => p.search_id))]

  const [{ data: candidates }, { data: searches }] = await Promise.all([
    sb.from('crm_candidates').select('id, full_name, credential, levels_certified').in('id', candidateIds.length ? candidateIds : ['00000000-0000-0000-0000-000000000000']),
    sb.from('crm_searches').select('id, school_name, position_title, level').in('id', searchIds.length ? searchIds : ['00000000-0000-0000-0000-000000000000']),
  ])

  const candidateMap = Object.fromEntries((candidates ?? []).map(c => [c.id, c]))
  const searchMap = Object.fromEntries((searches ?? []).map(s => [s.id, s]))

  const enriched = (pipeline ?? []).map(p => ({
    ...p,
    candidate_name: candidateMap[p.candidate_id]?.full_name ?? 'Unknown',
    candidate_credential: candidateMap[p.candidate_id]?.credential ?? null,
    candidate_levels: candidateMap[p.candidate_id]?.levels_certified ?? [],
    search_school_name: searchMap[p.search_id]?.school_name ?? 'Unknown',
    search_position: searchMap[p.search_id]?.position_title ?? null,
    search_level: searchMap[p.search_id]?.level ?? null,
  }))

  return NextResponse.json(enriched)
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const sb = createServiceClient()
  const { data, error } = await sb.from('crm_pipeline').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, ...updates } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const sb = createServiceClient()
  const { data, error } = await sb.from('crm_pipeline').update(updates).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

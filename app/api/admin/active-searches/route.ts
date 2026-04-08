import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export type ActiveSearchOption = {
  role_id: string
  crm_search_id: string | null
  school_name: string
  role_title: string
  role_description: string | null
  location: string | null
  level: string | null
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServiceClient()

  // Fetch active search_roles joined with parent searches
  const { data: roles, error } = await supabase
    .from('search_roles')
    .select('id, title, description, searches!inner(school_name, active)')
    .eq('active', true)
    .eq('searches.active', true)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Fetch linked crm_searches keyed by source_role_id
  const roleIds = (roles ?? []).map(r => r.id)
  const { data: crmSearches } = roleIds.length
    ? await supabase
        .from('crm_searches')
        .select('id, source_role_id')
        .in('source_role_id', roleIds)
    : { data: [] }

  const crmMap: Record<string, string> = {}
  for (const cs of crmSearches ?? []) {
    if (cs.source_role_id) crmMap[cs.source_role_id] = cs.id
  }

  const options: ActiveSearchOption[] = (roles ?? []).map(r => {
    const search = r.searches as unknown as { school_name: string; active: boolean }
    return {
      role_id: r.id,
      crm_search_id: crmMap[r.id] ?? null,
      school_name: search.school_name,
      role_title: r.title,
      role_description: r.description,
      location: null,
      level: null,
    }
  })

  return NextResponse.json({ options })
}

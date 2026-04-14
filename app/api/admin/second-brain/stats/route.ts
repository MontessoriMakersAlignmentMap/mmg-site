import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/lib/second-brain/auth'

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()

  const [rawAll, rawCompiled, rawWeb, rawDrive, wikiAll, recentLog] = await Promise.all([
    supabase.from('sb_raw_sources').select('id', { count: 'exact', head: true }),
    supabase.from('sb_raw_sources').select('id', { count: 'exact', head: true }).not('compiled_at', 'is', null),
    supabase.from('sb_raw_sources').select('id', { count: 'exact', head: true }).eq('source_type', 'web'),
    supabase.from('sb_raw_sources').select('id', { count: 'exact', head: true }).eq('source_type', 'drive'),
    supabase.from('sb_wiki_pages').select('id', { count: 'exact', head: true }),
    supabase.from('sb_ingest_log').select('*').order('ts', { ascending: false }).limit(15),
  ])

  return NextResponse.json({
    raw_sources: {
      total: rawAll.count ?? 0,
      compiled: rawCompiled.count ?? 0,
      uncompiled: (rawAll.count ?? 0) - (rawCompiled.count ?? 0),
      by_type: {
        web: rawWeb.count ?? 0,
        drive: rawDrive.count ?? 0,
      },
    },
    wiki_pages: wikiAll.count ?? 0,
    recent_log: recentLog.data ?? [],
  })
}

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/lib/second-brain/auth'
import { getSiteUrls, scrapePage } from '@/lib/second-brain/web-scrape'
import { sha256 } from '@/lib/second-brain/hash'

export const maxDuration = 300

export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const urls = getSiteUrls()
  const stats = { total: urls.length, ingested: 0, updated: 0, skipped: 0, errors: 0 }
  const errors: Array<{ url: string; error: string }> = []

  for (const url of urls) {
    try {
      const page = await scrapePage(url)
      if (!page || !page.content || page.content.length < 80) {
        stats.skipped++
        continue
      }

      const hash = sha256(page.content)
      const { data: existing } = await supabase
        .from('sb_raw_sources')
        .select('id, content_hash')
        .eq('source_type', 'web')
        .eq('external_id', url)
        .maybeSingle()

      if (existing && existing.content_hash === hash) {
        stats.skipped++
        continue
      }

      const row = {
        source_type: 'web',
        external_id: url,
        url,
        title: page.title,
        mime_type: 'text/html',
        content: page.content,
        content_hash: hash,
        metadata: {},
        fetched_at: new Date().toISOString(),
        compiled_at: null,
      }

      if (existing) {
        await supabase.from('sb_raw_sources').update(row).eq('id', existing.id)
        stats.updated++
      } else {
        await supabase.from('sb_raw_sources').insert(row)
        stats.ingested++
      }
    } catch (e) {
      stats.errors++
      errors.push({ url, error: (e as Error).message })
    }
  }

  await supabase.from('sb_ingest_log').insert({
    action: 'ingest_web',
    status: stats.errors > 0 ? 'error' : 'ok',
    notes: `Total:${stats.total} Ingested:${stats.ingested} Updated:${stats.updated} Skipped:${stats.skipped} Errors:${stats.errors}`,
    metadata: { stats },
  })

  return NextResponse.json({ ok: true, stats, errors: errors.slice(0, 20) })
}

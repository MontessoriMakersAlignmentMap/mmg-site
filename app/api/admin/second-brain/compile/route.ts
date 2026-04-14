import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServiceClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/lib/second-brain/auth'

export const maxDuration = 300

/**
 * Compile a batch of uncompiled raw sources into the wiki.
 *
 * v1 strategy (Karpathy-pattern, simplified):
 *   For each raw source, ask Claude to produce a structured summary page:
 *     - title (human-readable)
 *     - one-line hook
 *     - key points
 *     - entities mentioned
 *     - topics / themes
 *   Store it as sb_wiki_pages kind='summary', slug='summary/<raw_source_id>'.
 *
 * Cross-entity synthesis happens at query time (the chat endpoint pulls
 * all summaries and lets Claude connect the dots). This keeps compilation
 * cheap and idempotent. We can layer proper entity/concept pages on top
 * of this foundation later.
 */

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const COMPILE_SYSTEM = `You are the compiler for the MMG Second Brain — a knowledge base for Hannah Richardson and Montessori Makers Group.

Given a single source document, produce a compact structured summary in markdown with these sections:

# {concise human title}

**Hook:** one sentence capturing the essence.

## Key points
- bullet
- bullet
- (5–10 bullets max, each self-contained)

## Entities
Comma-separated list of people, orgs, programs, products mentioned.

## Topics
Comma-separated list of themes / concepts (e.g. adult-culture, hiring, leadership-transition).

## Notable quotes
Up to 3 short direct quotes from the source, each under 25 words, in quotation marks. Omit section if none are compelling.

Write ONLY the markdown summary. No preamble, no trailing commentary.`

type CompileBody = { batchSize?: number }

// Rough character budget per source sent to Claude. 30k chars ≈ 7500 tokens.
const MAX_SOURCE_CHARS = 30000

export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as CompileBody
  const batchSize = Math.min(Math.max(body.batchSize ?? 10, 1), 25)

  const supabase = createServiceClient()

  const { data: sources, error: fetchErr } = await supabase
    .from('sb_raw_sources')
    .select('id, title, content, url, source_type, mime_type')
    .is('compiled_at', null)
    .order('fetched_at', { ascending: true })
    .limit(batchSize)

  if (fetchErr) {
    return NextResponse.json({ error: fetchErr.message }, { status: 500 })
  }

  if (!sources || sources.length === 0) {
    return NextResponse.json({ ok: true, compiled: 0, remaining: 0, message: 'Nothing to compile.' })
  }

  const stats = { compiled: 0, errors: 0 }
  const errors: Array<{ source: string; error: string }> = []

  for (const source of sources) {
    try {
      const content = (source.content ?? '').slice(0, MAX_SOURCE_CHARS)
      const userMsg = `Source type: ${source.source_type}
Source title: ${source.title}
Source URL: ${source.url ?? '(none)'}

---

${content}`

      const res = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1500,
        system: COMPILE_SYSTEM,
        messages: [{ role: 'user', content: userMsg }],
      })

      const textBlock = res.content.find((b) => b.type === 'text')
      const markdown = textBlock && 'text' in textBlock ? textBlock.text : ''
      if (!markdown) throw new Error('Empty compile response')

      // Extract title from first heading, fall back to source title.
      const titleMatch = markdown.match(/^#\s+(.+)$/m)
      const pageTitle = titleMatch?.[1]?.trim() || source.title

      const slug = `summary/${source.id}`

      // Upsert wiki page.
      const { data: existing } = await supabase
        .from('sb_wiki_pages')
        .select('id')
        .eq('slug', slug)
        .maybeSingle()

      const pageRow = {
        slug,
        title: pageTitle,
        kind: 'summary',
        body: markdown,
        source_refs: [source.id],
        updated_at: new Date().toISOString(),
      }

      if (existing) {
        await supabase.from('sb_wiki_pages').update(pageRow).eq('id', existing.id)
      } else {
        await supabase.from('sb_wiki_pages').insert(pageRow)
      }

      await supabase
        .from('sb_raw_sources')
        .update({ compiled_at: new Date().toISOString() })
        .eq('id', source.id)

      await supabase.from('sb_ingest_log').insert({
        action: 'compile',
        status: 'ok',
        ref_id: source.id,
        notes: `Compiled "${source.title}" → ${slug}`,
      })

      stats.compiled++
    } catch (e) {
      stats.errors++
      errors.push({ source: source.title, error: (e as Error).message })
      await supabase.from('sb_ingest_log').insert({
        action: 'compile',
        status: 'error',
        ref_id: source.id,
        notes: `Compile failed: ${(e as Error).message}`,
      })
    }
  }

  const { count: remaining } = await supabase
    .from('sb_raw_sources')
    .select('id', { count: 'exact', head: true })
    .is('compiled_at', null)

  return NextResponse.json({ ok: true, ...stats, remaining: remaining ?? 0, errors: errors.slice(0, 10) })
}

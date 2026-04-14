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

const COMPILE_SYSTEM_SINGLE = `You are the compiler for the MMG Second Brain — a knowledge base for Hannah Richardson and Montessori Makers Group.

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

const COMPILE_SYSTEM_SECTION = `You are the compiler for the MMG Second Brain. You are summarizing ONE SECTION of a larger document that has been split into parts.

Produce a compact section summary in markdown:

**Hook:** one sentence capturing the essence of this section.

Key points:
- bullet
- bullet
- (5–10 bullets from this section)

Entities: comma-separated list of people, orgs, programs, products mentioned in this section.
Topics: comma-separated themes.
Notable quotes: up to 2 short direct quotes under 25 words each, in quotation marks. Omit if none compelling.

Write ONLY the section summary. No title, no preamble, no trailing commentary.`

type CompileBody = { batchSize?: number }

// Per-chunk budget sent to Claude. 50k chars ≈ 12.5k tokens.
const CHUNK_CHARS = 50000
// Hard ceiling on how many chunks we'll compile per source (6 × 50k = 300k chars,
// ~60 pages). Anything past this gets dropped — flag in the log.
const MAX_CHUNKS = 6

export async function POST(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as CompileBody
  // Smaller default (5) + parallel execution. On Vercel's default function
  // limit (~60s on Hobby, 300s on Pro), sequential 10x was timing out. 5 in
  // parallel finishes in ~30–45s (one Claude round-trip, not five stacked).
  const batchSize = Math.min(Math.max(body.batchSize ?? 5, 1), 10)

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

  type SourceRow = (typeof sources)[number]

  /** Split text into chunks of ~CHUNK_CHARS, preferring paragraph boundaries. */
  function chunkText(text: string): string[] {
    if (text.length <= CHUNK_CHARS) return [text]
    const chunks: string[] = []
    let i = 0
    while (i < text.length && chunks.length < MAX_CHUNKS) {
      const end = Math.min(i + CHUNK_CHARS, text.length)
      let cut = end
      if (end < text.length) {
        // Prefer a paragraph break, then a sentence, then a newline.
        const windowStart = Math.max(i + CHUNK_CHARS * 0.6, i + 1)
        const slice = text.slice(windowStart, end)
        const paraIdx = slice.lastIndexOf('\n\n')
        const sentIdx = slice.lastIndexOf('. ')
        const nlIdx = slice.lastIndexOf('\n')
        const rel = paraIdx !== -1 ? paraIdx + 2 : sentIdx !== -1 ? sentIdx + 2 : nlIdx !== -1 ? nlIdx + 1 : -1
        if (rel !== -1) cut = Math.floor(windowStart) + rel
      }
      chunks.push(text.slice(i, cut))
      i = cut
    }
    return chunks
  }

  async function callClaude(system: string, userMsg: string, maxTokens: number): Promise<string> {
    const res = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userMsg }],
    })
    const textBlock = res.content.find((b) => b.type === 'text')
    const text = textBlock && 'text' in textBlock ? textBlock.text : ''
    if (!text) throw new Error('Empty compile response')
    return text
  }

  async function compileOne(source: SourceRow): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      const fullContent = source.content ?? ''
      const chunks = chunkText(fullContent)
      const wasTruncated = fullContent.length > chunks.reduce((s, c) => s + c.length, 0)

      let markdown: string
      if (chunks.length === 1) {
        // Short doc — single-pass compile (fast path).
        const userMsg = `Source type: ${source.source_type}
Source title: ${source.title}
Source URL: ${source.url ?? '(none)'}

---

${chunks[0]}`
        markdown = await callClaude(COMPILE_SYSTEM_SINGLE, userMsg, 1500)
      } else {
        // Long doc — compile each chunk, stitch into one wiki page body.
        // Chunks run sequentially per doc so multi-doc batches stay within
        // rate limits (5 docs in parallel × up to 6 chunks each is still
        // bounded by per-doc serialization).
        const sectionSummaries: string[] = []
        for (let i = 0; i < chunks.length; i++) {
          const userMsg = `Source title: ${source.title}
Source URL: ${source.url ?? '(none)'}
Section ${i + 1} of ${chunks.length}

---

${chunks[i]}`
          const sectionMd = await callClaude(COMPILE_SYSTEM_SECTION, userMsg, 1200)
          sectionSummaries.push(sectionMd.trim())
        }

        const truncNote = wasTruncated
          ? `\n\n> ⚠️ This document exceeds ${CHUNK_CHARS * MAX_CHUNKS} characters. Only the first ${chunks.length} sections were compiled.\n`
          : ''

        markdown = `# ${source.title}

**Hook:** Long document compiled in ${chunks.length} sections. See individual section summaries below.${truncNote}

${sectionSummaries.map((s, i) => `## Section ${i + 1}\n\n${s}`).join('\n\n')}`
      }

      if (!markdown) throw new Error('Empty compile response')

      const titleMatch = markdown.match(/^#\s+(.+)$/m)
      const pageTitle = titleMatch?.[1]?.trim() || source.title
      const slug = `summary/${source.id}`

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
        notes: `Compiled "${source.title}" → ${slug}${chunks.length > 1 ? ` (${chunks.length} sections${wasTruncated ? ', truncated' : ''})` : ''}`,
      })

      return { ok: true }
    } catch (e) {
      await supabase.from('sb_ingest_log').insert({
        action: 'compile',
        status: 'error',
        ref_id: source.id,
        notes: `Compile failed: ${(e as Error).message}`,
      })
      return { ok: false, error: (e as Error).message }
    }
  }

  const stats = { compiled: 0, errors: 0 }
  const errors: Array<{ source: string; error: string }> = []

  const results = await Promise.all(sources.map(compileOne))
  results.forEach((r, i) => {
    if (r.ok) {
      stats.compiled++
    } else {
      stats.errors++
      errors.push({ source: sources[i].title, error: r.error })
    }
  })

  const { count: remaining } = await supabase
    .from('sb_raw_sources')
    .select('id', { count: 'exact', head: true })
    .is('compiled_at', null)

  return NextResponse.json({ ok: true, ...stats, remaining: remaining ?? 0, errors: errors.slice(0, 10) })
}

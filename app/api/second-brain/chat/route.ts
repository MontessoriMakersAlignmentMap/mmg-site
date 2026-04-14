import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServiceClient } from '@/lib/supabase/server'
import { checkAdminAuth } from '@/lib/second-brain/auth'

export const maxDuration = 60

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const SYSTEM_TEMPLATE = (wiki: string) => `You are the MMG Second Brain — the knowledge assistant for Hannah Richardson and Montessori Makers Group.

You answer questions using the compiled wiki below. The wiki is a collection of summary pages, each generated from an underlying raw source (a Google Drive document or a page from montessorimakersgroup.org).

How to answer:
- Search the wiki for relevant pages. Synthesize across multiple pages when the question spans topics.
- Cite sources inline using the page titles, e.g. (see: "Adult Culture Framework"). If relevant, mention the source type (Drive doc, website page).
- If the answer isn't in the wiki, say so plainly. Don't invent facts. Suggest what source might need to be ingested to answer the question.
- Be concise and conversational. Use markdown structure only when it genuinely helps.
- Hannah's voice is direct, warm, field-expert. No corporate language. Match that tone.

---

COMPILED WIKI:

${wiki}`

// Keep total wiki payload under ~120k chars (~30k tokens) to stay well below
// model context and leave room for conversation history.
const MAX_WIKI_CHARS = 120_000

export async function POST(req: NextRequest) {
  // Gate the chat UI the same way as admin routes. Cheap v1; we can open
  // this up to a proper team auth layer later.
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { messages } = (await req.json().catch(() => ({}))) as { messages?: ChatMessage[] }
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'messages required' }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { data: pages, error } = await supabase
    .from('sb_wiki_pages')
    .select('slug, title, kind, body, updated_at')
    .order('updated_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Assemble the wiki payload. Newer pages first; stop when we hit the budget.
  let wiki = ''
  let truncated = 0
  for (const p of pages ?? []) {
    const block = `\n\n<page slug="${p.slug}" kind="${p.kind}">\n${p.body}\n</page>`
    if (wiki.length + block.length > MAX_WIKI_CHARS) {
      truncated++
      continue
    }
    wiki += block
  }

  if (!wiki.trim()) {
    return NextResponse.json({
      message:
        "The wiki is empty. Run an ingest + compile from the admin page, then come back and ask me something.",
    })
  }

  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1500,
    system: SYSTEM_TEMPLATE(wiki),
    messages,
  })

  const textBlock = res.content.find((b) => b.type === 'text')
  const text = textBlock && 'text' in textBlock ? textBlock.text : ''

  await supabase.from('sb_ingest_log').insert({
    action: 'query',
    status: 'ok',
    notes: `Pages used: ${(pages?.length ?? 0) - truncated} / ${pages?.length ?? 0}`,
  })

  return NextResponse.json({ message: text })
}

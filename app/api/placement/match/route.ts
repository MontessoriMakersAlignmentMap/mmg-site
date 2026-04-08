import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export type MatchResult = {
  candidate_id: string
  full_name: string
  score: number
  reason: string
  holds_role_type: boolean
  open_to_role_type: boolean
  credential: string | null
  location_city: string | null
  location_state: string | null
  actively_looking: boolean
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { search_id } = await req.json()
  if (!search_id) return NextResponse.json({ error: 'search_id required' }, { status: 400 })

  const sb = createServiceClient()

  // Load search details
  const { data: search, error: searchErr } = await sb
    .from('crm_searches')
    .select('*')
    .eq('id', search_id)
    .single()
  if (searchErr || !search) return NextResponse.json({ error: 'Search not found' }, { status: 404 })

  // Load already-placed candidate IDs for this search
  const { data: placedPipeline } = await sb
    .from('crm_pipeline')
    .select('candidate_id')
    .eq('search_id', search_id)
    .eq('placed', true)
  const placedIds = new Set((placedPipeline ?? []).map(p => p.candidate_id))

  // Load all unplaced candidates
  const { data: candidates, error: candErr } = await sb
    .from('crm_candidates')
    .select('*')
  if (candErr) return NextResponse.json({ error: candErr.message }, { status: 500 })

  const eligible = (candidates ?? []).filter(c => !placedIds.has(c.id))
  if (eligible.length === 0) return NextResponse.json({ matches: [] })

  const searchSummary = [
    `School: ${search.school_name}`,
    `Role: ${search.position_title}`,
    search.level ? `Level: ${search.level}` : null,
    search.location_city ? `Location: ${search.location_city}, ${search.location_state ?? ''}` : null,
    search.notes ? `Additional context: ${search.notes}` : null,
  ].filter(Boolean).join('\n')

  const candidateList = eligible.map(c => ({
    id: c.id,
    full_name: c.full_name,
    credential: c.credential,
    levels_certified: c.levels_certified ?? [],
    years_experience: c.years_experience,
    location_city: c.location_city,
    location_state: c.location_state,
    actively_looking: c.actively_looking,
    role_types: c.role_types ?? [],
    open_to_role_types: c.open_to_role_types ?? [],
    languages: c.languages ?? [],
    source: c.source,
    notes: c.notes,
  }))

  const prompt = `You are an expert Montessori educator placement specialist at Montessori Makers Group.

SEARCH DETAILS:
${searchSummary}

CANDIDATES (${eligible.length} total):
${JSON.stringify(candidateList, null, 2)}

Score each candidate from 0–10 for fit with this search. Consider:
- Credential match (AMI/AMS/MACTE for the required level)
- Level alignment (levels_certified vs search level)
- Role type fit: if the search role type matches role_types, they currently hold it; if it matches open_to_role_types, they want to grow into it
- Location proximity
- Years of experience
- Actively looking status

Return ONLY a valid JSON array (no markdown, no explanation) sorted by score descending:
[{
  "candidate_id": "...",
  "full_name": "...",
  "score": 8.5,
  "reason": "One sentence explaining fit. Explicitly note if they currently hold this role type or are open to growing into it.",
  "holds_role_type": true,
  "open_to_role_type": false,
  "credential": "AMI",
  "location_city": "...",
  "location_state": "...",
  "actively_looking": true
}]`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    return NextResponse.json({ error: `Anthropic error: ${err}` }, { status: 500 })
  }

  const aiData = await response.json()
  const text = aiData.content?.find((b: { type: string }) => b.type === 'text')?.text ?? ''

  try {
    const cleaned = text.trim().replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim()
    const matches: MatchResult[] = JSON.parse(cleaned)
    return NextResponse.json({ matches, search })
  } catch {
    return NextResponse.json({ error: 'Failed to parse AI response', raw: text.slice(0, 500) }, { status: 500 })
  }
}

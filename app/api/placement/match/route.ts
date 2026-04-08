import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export type MatchResult = {
  candidate_id: string
  full_name: string
  overall_score: number
  credential_score: number
  location_score: number
  level_score: number
  role_score: number
  match_summary: string
  contact_priority: 'Immediate' | 'This Week' | 'Pipeline'
  credential: string | null
  location_city: string | null
  location_state: string | null
  actively_looking: boolean
  levels_certified: string[]
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { search_id } = await req.json()
  if (!search_id) return NextResponse.json({ error: 'search_id required' }, { status: 400 })

  const sb = createServiceClient()

  // Load full search record including all matching fields
  const { data: search, error: searchErr } = await sb
    .from('crm_searches')
    .select('*')
    .eq('id', search_id)
    .single()
  if (searchErr || !search) return NextResponse.json({ error: 'Search not found' }, { status: 404 })

  // Load candidates already placed in this search (exclude them)
  const { data: placedPipeline } = await sb
    .from('crm_pipeline')
    .select('candidate_id')
    .eq('search_id', search_id)
    .eq('placed', true)
  const placedIds = new Set((placedPipeline ?? []).map(p => p.candidate_id))

  // Load all candidates — filter to those actively looking OR open to the required role type
  const { data: candidates, error: candErr } = await sb
    .from('crm_candidates')
    .select('*')
  if (candErr) return NextResponse.json({ error: candErr.message }, { status: 500 })

  const eligible = (candidates ?? []).filter(c => {
    if (placedIds.has(c.id)) return false
    if (c.actively_looking) return true
    if (search.role_type_required) {
      const openTo = c.open_to_role_types ?? []
      const holds  = c.role_types ?? []
      if (openTo.includes(search.role_type_required) || holds.includes(search.role_type_required)) return true
    }
    return false
  })

  if (eligible.length === 0) return NextResponse.json({ matches: [], search })

  const searchSummary = [
    `School: ${search.school_name}`,
    `Position: ${search.position_title}`,
    search.level               ? `Level: ${search.level}`                                       : null,
    search.role_type_required  ? `Role type required: ${search.role_type_required}`             : null,
    search.credential_required ? `Credential required: ${search.credential_required}`           : null,
    search.levels_required?.length ? `Levels required: ${search.levels_required.join(', ')}`   : null,
    search.location_city       ? `Location: ${search.location_city}, ${search.location_state ?? ''}` : null,
    search.location_flexible   ? 'Location is flexible / open to relocation'                   : null,
    search.languages_required?.length ? `Languages required: ${search.languages_required.join(', ')}` : null,
    search.years_experience_min ? `Minimum years experience: ${search.years_experience_min}`   : null,
    search.equity_focused      ? 'School is equity-focused — prioritize candidates with DEI background' : null,
    search.position_description ? `Position description: ${search.position_description}`       : null,
    search.notes               ? `Additional context: ${search.notes}`                         : null,
  ].filter(Boolean).join('\n')

  const candidateList = eligible.map(c => ({
    id:                 c.id,
    full_name:          c.full_name,
    credential:         c.credential,
    training_program:   c.training_program,
    levels_certified:   c.levels_certified ?? [],
    years_experience:   c.years_experience,
    location_city:      c.location_city,
    location_state:     c.location_state,
    actively_looking:   c.actively_looking,
    role_types:         c.role_types ?? [],
    open_to_role_types: c.open_to_role_types ?? [],
    languages:          c.languages ?? [],
    source:             c.source,
    notes:              c.notes,
  }))

  const prompt = `You are an expert Montessori educator placement specialist at Montessori Makers Group. Score each candidate for fit with this search across five dimensions.

SEARCH REQUIREMENTS:
${searchSummary}

CANDIDATES (${eligible.length} total):
${JSON.stringify(candidateList, null, 2)}

SCORING RULES — score each dimension 1–10:
- credential_score: Exact credential match = 10. Same tier (AMI/AMS) = 7. Adjacent or partial = 4. No credential when one required = 1.
- location_score: Same city = 10. Same state = 8. Neighboring state = 5. Remote but open to relocate = 4. Far with no flexibility = 2. (If location_flexible is noted, be generous.)
- level_score: Exact level overlap = 10. Adjacent levels (e.g. Lower + Upper El) = 6. No certified level match = 2.
- role_score: role_types includes required role = 10. open_to_role_types includes it = 6. Transferable background evident in notes = 4. No match = 2.
- overall_score: Holistic 1–10 considering all dimensions, years_experience vs minimum, actively_looking status, languages, equity background, and notes context.

RESIDENT GUIDE SPECIAL RULES (apply when role_type_required is "Resident Guide"):
- level_score: Boost by +2 (max 10) for candidates certified across 2+ program levels. Single-level certification scores max 6 for this role type. Certification across 3+ levels scores 10.
- overall_score: Add +1 for candidates who have worked in 3 or more Montessori schools (indicates adaptability). Add +1 for candidates whose notes mention field consulting, mentoring, coaching, or working across multiple classrooms. A candidate with multi-level certification AND multi-school experience should score 8+ overall even without being actively_looking.

CONTACT PRIORITY:
- "Immediate": overall_score >= 8 AND actively_looking
- "This Week": overall_score >= 6
- "Pipeline": overall_score >= 5

CRITICAL INSTRUCTIONS:
- Return ONLY a valid JSON array. Start directly with [. No markdown, no code fences, no explanation.
- Only include candidates with overall_score >= 5.
- Sort by overall_score descending.
- match_summary must be exactly two sentences: first explains the strongest fit signal, second notes any gap or caveat.

Required shape for each array element:
{
  "candidate_id": "uuid string",
  "full_name": "string",
  "overall_score": number,
  "credential_score": number,
  "location_score": number,
  "level_score": number,
  "role_score": number,
  "match_summary": "Two sentences.",
  "contact_priority": "Immediate" or "This Week" or "Pipeline",
  "credential": "string or null",
  "location_city": "string or null",
  "location_state": "string or null",
  "actively_looking": boolean,
  "levels_certified": ["array of strings"]
}`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':     'application/json',
      'x-api-key':        process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-20250514',
      max_tokens: 8096,
      messages:   [{ role: 'user', content: prompt }],
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

import { NextRequest, NextResponse } from 'next/server'

function checkAuth(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export type CandidateEmailRequest = {
  candidate: {
    name: string
    credential?: string | null
    levels?: string[] | null
    location_city?: string | null
    location_state?: string | null
    source?: string | null
    notes?: string | null
  }
  role: {
    title: string
    school_name: string
    description?: string | null
    location_city?: string | null
    location_state?: string | null
    level?: string | null
    credential_required?: string | null
  }
  match_rationale?: string
}

export type CandidateEmailResponse = {
  subject: string
  body: string
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body: CandidateEmailRequest = await req.json().catch(() => ({}))
  const { candidate, role, match_rationale } = body

  if (!candidate?.name || !role?.title || !role?.school_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const candidateDetail = [
    candidate.credential ? `${candidate.credential} credential` : null,
    candidate.levels?.length ? `experience with ${candidate.levels.join(' and ')}` : null,
    (candidate.location_city || candidate.location_state)
      ? `based in ${[candidate.location_city, candidate.location_state].filter(Boolean).join(', ')}`
      : null,
  ].filter(Boolean).join(', ')

  const roleDetail = [
    `${role.title} at ${role.school_name}`,
    (role.location_city || role.location_state)
      ? `located in ${[role.location_city, role.location_state].filter(Boolean).join(', ')}`
      : null,
    role.level ? `for ${role.level}` : null,
    role.credential_required ? `${role.credential_required} credential preferred` : null,
  ].filter(Boolean).join(', ')

  const system = `You are writing a personal outreach email on behalf of Hannah Richardson, founder of Montessori Makers Group (MMG). Hannah is a Montessori educator and is reaching out directly — this is not a recruiter blast, it is a warm, human message from one Montessori professional to another.

Voice rules:
- Warm, direct, field-expert. No corporate language.
- No exclamation points. No em dashes or en dashes. No "exciting opportunity" or "leverage" or "empower."
- First name only for the candidate greeting.
- Keep it short: 3–4 short paragraphs maximum.
- Lead with something specific about the candidate that makes this feel personal, not generic.
- Explain the role clearly but briefly — school name, title, location if relevant.
- Make it easy to say yes or no — low pressure, no hard sell.
- Sign off as Hannah, Montessori Makers Group.

Return only valid JSON with no markdown or backticks, with exactly two keys: subject (string) and body (string). The body should use plain text with line breaks (\\n) between paragraphs — no HTML.`

  const user = `Write a personal outreach email to ${candidate.name.split(' ')[0]} (full name: ${candidate.name}).

About this candidate: ${candidateDetail || 'Montessori educator'}.
${match_rationale ? `Why they're a strong fit: ${match_rationale}` : ''}

The role: ${roleDetail}.
${role.description ? `Role description context: ${role.description.slice(0, 400)}` : ''}

The goal: invite them to a low-key conversation about whether this role might be a fit for them.`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  })

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to generate email' }, { status: 500 })
  }

  const data = await response.json()
  const textBlock = data.content?.find((b: { type: string }) => b.type === 'text')
  if (!textBlock?.text) return NextResponse.json({ error: 'No response' }, { status: 500 })

  try {
    const cleaned = textBlock.text.trim().replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim()
    const result = JSON.parse(cleaned) as CandidateEmailResponse
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Failed to parse response', raw: textBlock.text }, { status: 500 })
  }
}

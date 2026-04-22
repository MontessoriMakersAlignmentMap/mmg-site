import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { candidate, search } = await req.json()

    const prompt = `You are helping Hannah Richardson, founder of Montessori Makers Group, draft a warm outreach email to a Montessori educator about a potential role opportunity.

Here is the candidate:
- Name: ${candidate.full_name}
- Location: ${candidate.location_city ? `${candidate.location_city}, ${candidate.location_state}` : candidate.location_state || 'Unknown'}
- Credential: ${candidate.credential || 'Not listed'}
- Levels certified: ${(candidate.levels_certified || []).join(', ') || 'Not listed'}
- Years of experience: ${candidate.years_experience ?? 'Unknown'}
- Role types they are open to: ${(candidate.open_to_role_types || []).join(', ') || 'Not listed'}
- Languages: ${(candidate.languages || []).join(', ') || 'Not listed'}
- Notes: ${candidate.notes || 'None'}

Here is the open role:
- School: ${search.school_name}
- Position: ${search.position_title}
- Location: ${search.location_city ? `${search.location_city}, ${search.location_state}` : 'Location TBD'}
- Credential required: ${search.credential_required || 'None required'}
- Levels: ${search.levels_required || 'Not specified'}
- Compensation: ${search.compensation_range || 'Not listed'}
- Description: ${search.position_description || 'Not provided'}

Write a short, warm, personal outreach email from Hannah to this candidate. The email should:
1. Open by referencing something specific about them (their credential, level, or experience)
2. Briefly introduce the opportunity in a way that feels aligned, not transactional
3. Mention why they seemed like a potential fit
4. Invite them to a brief conversation — no pressure, no hard sell
5. Close warmly and briefly

Tone: direct, human, and collegial — the way Hannah actually speaks. Not corporate. Not over-formatted. Plain prose, 3–4 short paragraphs. No bullet lists.

Output only the email body text (no subject line, no greeting header). Start with "Hi [Name]," and end with a simple sign-off.`

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    // Suggest a subject line separately
    const subjectMessage = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 60,
      messages: [
        {
          role: 'user',
          content: `Write a single short email subject line for this outreach from Hannah Richardson at Montessori Makers Group to ${candidate.full_name} about the ${search.position_title} role at ${search.school_name}. No quotes. Just the subject line text.`,
        },
      ],
    })

    const subject =
      subjectMessage.content[0].type === 'text' ? subjectMessage.content[0].text.trim() : ''

    return NextResponse.json({ draft: text, subject })
  } catch (err) {
    console.error('draft-email error:', err)
    return NextResponse.json({ error: 'Failed to generate draft' }, { status: 500 })
  }
}

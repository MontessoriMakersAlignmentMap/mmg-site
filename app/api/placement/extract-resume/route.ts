import { NextRequest, NextResponse } from 'next/server'

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { resumeText } = await req.json()
  if (!resumeText?.trim()) return NextResponse.json({ error: 'resumeText required' }, { status: 400 })

  const prompt = `You are an expert at parsing educator resumes and LinkedIn profiles for a Montessori placement CRM.

Extract structured data from the following text and return ONLY valid JSON (no markdown, no explanation):

{
  "full_name": "string or null",
  "email": "string or null",
  "phone": "string or null",
  "location_city": "string or null",
  "location_state": "string or null (2-letter abbreviation if possible)",
  "credential": "one of: AMI | AMS | MACTE | State Certified | In Training | None | null",
  "training_program": "string or null (e.g. 'AMI 3-6 Training, Washington Montessori Institute')",
  "levels_certified": ["array of: Infant/Toddler | Primary | Lower Elementary | Upper Elementary | Middle School"],
  "languages": ["array of languages spoken beyond English"],
  "years_experience": "integer or null",
  "actively_looking": "boolean — true only if explicitly stated they are seeking work",
  "source": "LinkedIn if LinkedIn profile, else Other",
  "linkedin_url": "string or null",
  "notes": "1-2 sentence summary of their background",
  "role_types": ["array of best-fit values from: Assistant | Lead Guide | Resident Guide | Specialist | School Leader | Operations | Marketing and Communications | Curriculum | Consultant | Trainer | Other — based on their actual experience. Use 'Resident Guide' if they have experience across multiple program levels, have done field consulting or mentoring, or have worked in 3+ Montessori schools suggesting strong adaptability."],
  "open_to_role_types": ["array of best-fit values from the same list — based on stated interests, career trajectory, or aspirations mentioned in the text. Include 'Resident Guide' if they express interest in variety, flexibility, or cross-classroom work."]
}

TEXT TO PARSE:
${resumeText}`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    return NextResponse.json({ error: `Anthropic error: ${err}` }, { status: 500 })
  }

  const data = await response.json()
  const text = data.content?.find((b: { type: string }) => b.type === 'text')?.text ?? ''

  try {
    const cleaned = text.trim().replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim()
    return NextResponse.json(JSON.parse(cleaned))
  } catch {
    return NextResponse.json({ error: 'Failed to parse AI response', raw: text.slice(0, 500) }, { status: 500 })
  }
}

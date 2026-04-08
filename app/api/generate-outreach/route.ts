import { NextRequest, NextResponse } from 'next/server'

function checkAuth(req: NextRequest): boolean {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const role = body.role ?? 'Montessori guide or leader'
  const region = body.region ?? 'anywhere in the US'
  const level = body.level ?? 'all experience levels'

  const systemPrompt = `You are writing outreach copy for Montessori Makers Group, founded by Hannah Richardson. MMG is a talent platform connecting Montessori educators with schools. MatchHub is always free for educators to use and join. Voice rules: direct, warm, field-expert tone. No corporate language. No exclamation points. No em dashes or en dashes. No "we're excited" or "leverage" or "empower." Lead with what the educator gets, not what MMG needs. Keep it short. Sound like a real Montessori educator wrote it.

Return only valid JSON with no markdown or backticks. The JSON must have exactly these four keys: facebook_post (string), newsletter (string), twitter_post (string, under 280 chars), training_email (string).`

  const userPrompt = `Write four outreach drafts to find ${role} candidates at ${level} open to positions in ${region}. Each draft should mention that MatchHub is free for educators, and that MMG connects Montessori educators with schools that share their values. Keep the Twitter post under 280 characters. The training email is for Montessori training programs to share with their graduates.`

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
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error('Anthropic API error:', err)
    return NextResponse.json({ error: 'Failed to generate drafts' }, { status: 500 })
  }

  const data = await response.json()
  const textBlock = data.content?.find((b: { type: string }) => b.type === 'text')
  if (!textBlock?.text) {
    return NextResponse.json({ error: 'No response from model' }, { status: 500 })
  }

  try {
    const cleaned = textBlock.text.trim().replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim()
    const drafts = JSON.parse(cleaned)
    return NextResponse.json(drafts)
  } catch {
    return NextResponse.json({ error: 'Failed to parse drafts', raw: textBlock.text }, { status: 500 })
  }
}

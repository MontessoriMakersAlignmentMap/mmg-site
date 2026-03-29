import { NextRequest, NextResponse } from 'next/server'
import { sendFieldIntelligenceEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      q1?: string
      q2?: string
      q3?: string
      source?: string
    }

    const { q1, q2, q3, source, hp } = body as typeof body & { hp?: string }

    // Honeypot — silently discard bot submissions
    if (hp) {
      return NextResponse.json({ ok: true })
    }

    if (!q1 && !q2 && !q3) {
      return NextResponse.json({ error: 'At least one response is required.' }, { status: 400 })
    }

    await sendFieldIntelligenceEmail({
      q1: q1 ?? '',
      q2: q2 ?? '',
      q3: q3 ?? '',
      source: source ?? 'field intelligence page',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('field-intelligence route error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

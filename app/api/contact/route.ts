import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name?: string
      email?: string
      organization?: string
      role?: string
      supportType?: string
      message?: string
      situation?: string
      goals?: string
      timeline?: string
      schoolSize?: string
      service?: string
      source?: string
      hp?: string
    }

    const { name, email, organization, role, supportType, message, situation, goals, timeline, schoolSize, service, source, hp } = body

    // Honeypot — silently discard bot submissions
    if (hp) {
      return NextResponse.json({ ok: true })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    await sendContactFormEmail({
      name,
      email,
      organization: organization ?? '',
      role: role ?? '',
      supportType: supportType ?? '',
      message,
      situation: situation ?? '',
      goals: goals ?? '',
      timeline: timeline ?? '',
      schoolSize: schoolSize ?? '',
      service: service ?? 'General',
      source: source ?? 'contact page',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('contact route error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

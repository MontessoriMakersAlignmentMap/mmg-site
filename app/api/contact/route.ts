import { NextRequest, NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email'
import { createServiceClient } from '@/lib/supabase/server'

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

    // Save to Supabase first — this is the source of truth regardless of email status
    const supabase = createServiceClient()
    const { data: saved, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        organization: organization ?? '',
        role: role ?? '',
        support_type: supportType ?? '',
        service: service ?? 'General',
        source: source ?? 'contact page',
        message,
        situation: situation ?? '',
        goals: goals ?? '',
        timeline: timeline ?? '',
        school_size: schoolSize ?? '',
        email_sent: false,
      })
      .select('id')
      .single()

    if (dbError) {
      console.error('contact db error:', dbError)
      // Still try email even if DB write fails
    }

    // Attempt email — update email_sent flag on success, but never block the response
    try {
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

      if (saved?.id) {
        await supabase
          .from('contact_submissions')
          .update({ email_sent: true })
          .eq('id', saved.id)
      }
    } catch (emailErr) {
      console.error('contact email error (submission saved to DB):', emailErr)
      // Do not rethrow — the submission is already saved
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('contact route error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

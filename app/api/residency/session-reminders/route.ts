import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// This endpoint is meant to be called by a cron job 48 hours before each session.
// It sends reminder emails to all active residents.

export async function POST() {
  const supabase = createServiceClient()

  // Find sessions happening in ~48 hours (between 47 and 49 hours from now)
  const now = new Date()
  const from = new Date(now.getTime() + 47 * 60 * 60 * 1000)
  const to = new Date(now.getTime() + 49 * 60 * 60 * 1000)

  const fromDate = from.toISOString().split('T')[0]
  const toDate = to.toISOString().split('T')[0]

  const { data: sessions } = await supabase
    .from('residency_seminars')
    .select('*')
    .gte('seminar_date', fromDate)
    .lte('seminar_date', toDate)

  if (!sessions || sessions.length === 0) {
    return NextResponse.json({ message: 'No upcoming sessions in 48h window', sent: 0 })
  }

  // Get active residents with email
  const { data: residents } = await supabase
    .from('residency_residents')
    .select('*, profile:residency_profiles(first_name, last_name, email)')
    .in('status', ['active', 'enrolled'])

  if (!residents || residents.length === 0) {
    return NextResponse.json({ message: 'No active residents', sent: 0 })
  }

  let sentCount = 0

  for (const session of sessions) {
    const sessionDate = new Date(session.seminar_date + 'T12:00:00')
    const dateStr = sessionDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    const isSessionA = session.session_type === 'curriculum_integration'
    const sessionLabel = isSessionA ? 'Session A — Curriculum Integration' : 'Session B — Practicum & Community'

    const discussionPrompt = isSessionA
      ? 'Please come prepared to share one observation from your classroom that connects to the current curriculum focus.'
      : 'Please come prepared to share one thing you are proud of and one thing you are struggling with from the past two weeks.'

    for (const resident of residents) {
      const email = (resident.profile as any)?.email
      const firstName = (resident.profile as any)?.first_name || 'Resident'
      if (!email) continue

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://montessorimakersgroup.org'}/api/email/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: `Reminder: ${sessionLabel} on ${dateStr}`,
            html: `
              <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #1a365d; color: white; padding: 2rem; border-radius: 8px 8px 0 0;">
                  <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7; margin-bottom: 0.5rem;">Montessori Makers Residency</p>
                  <h1 style="font-size: 1.5rem; margin: 0;">${sessionLabel}</h1>
                </div>
                <div style="padding: 2rem; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
                  <p>Hi ${firstName},</p>
                  <p>This is a reminder that <strong>${session.title}</strong> is coming up on <strong>${dateStr}</strong>.</p>
                  ${session.description ? `<p style="color: #666;">${session.description}</p>` : ''}
                  <div style="background: ${isSessionA ? '#e3f2fd' : '#f3e5f5'}; border-left: 4px solid ${isSessionA ? '#1565c0' : '#7b1fa2'}; padding: 1rem; border-radius: 0 8px 8px 0; margin: 1.5rem 0;">
                    <p style="font-weight: 600; margin-bottom: 0.5rem;">Preparation</p>
                    <p style="margin: 0;">${discussionPrompt}</p>
                  </div>
                  <p style="color: #666; font-size: 0.875rem;">MACTE requires 90% session attendance. Each month's pair (Session A + Session B) must both be attended for the month to count as complete.</p>
                  <p style="margin-top: 1.5rem;">See you there,<br>The MMR Team</p>
                </div>
              </div>
            `,
          }),
        })

        if (res.ok) sentCount++
      } catch {
        // Continue sending to other residents
      }
    }
  }

  return NextResponse.json({ message: `Sent ${sentCount} reminder emails`, sent: sentCount })
}

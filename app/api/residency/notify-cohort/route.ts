import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const { cohort_id, subject, body } = await req.json()

  if (!cohort_id || !subject || !body) {
    return NextResponse.json({ error: 'cohort_id, subject, and body required' }, { status: 400 })
  }

  // Get all residents in this cohort
  const { data: residents } = await supabase
    .from('residency_residents')
    .select('profile:residency_profiles(email, first_name)')
    .eq('cohort_id', cohort_id)
    .in('status', ['enrolled', 'active'])

  if (!residents || residents.length === 0) {
    return NextResponse.json({ sent: 0 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  let sent = 0

  for (const r of residents) {
    const email = (r.profile as any)?.email
    if (!email) continue

    try {
      await resend.emails.send({
        from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
        to: email,
        subject,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0E1A7A;">${subject}</h2>
            <div style="font-size: 15px; line-height: 1.7; color: #333; white-space: pre-wrap;">${body}</div>
            <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e0e0e0;" />
            <p style="font-size: 13px; color: #999;">
              <a href="https://montessorimakersgroup.org/residency/portal/board" style="color: #0E1A7A;">View in your portal</a>
            </p>
          </div>
        `,
      })
      sent++
    } catch { /* best-effort */ }
  }

  return NextResponse.json({ sent })
}

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const { cohort_id, session_id, absent_resident_ids, key_themes, recording_link } = await req.json()

  if (!cohort_id || !absent_resident_ids?.length) {
    return NextResponse.json({ sent: 0 })
  }

  // Get absent residents' emails
  const { data: residents } = await supabase
    .from('residency_residents')
    .select('profile:residency_profiles(email, first_name)')
    .in('id', absent_resident_ids)

  if (!residents || residents.length === 0) {
    return NextResponse.json({ sent: 0 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  let sent = 0

  for (const r of residents) {
    const email = (r.profile as any)?.email
    const name = (r.profile as any)?.first_name || 'there'
    if (!email) continue

    try {
      await resend.emails.send({
        from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
        to: email,
        subject: 'Live Session Summary Available',
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0E1A7A;">Hi ${name},</h2>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              You missed today's live session. Here's a summary of what was discussed:
            </p>
            ${key_themes ? `
              <div style="background: #f5f5f5; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
                <h3 style="font-size: 14px; color: #0E1A7A; margin-bottom: 0.5rem;">Key Themes</h3>
                <p style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${key_themes}</p>
              </div>
            ` : ''}
            ${recording_link ? `
              <p style="font-size: 15px;">
                <a href="${recording_link}" style="color: #0E1A7A; font-weight: 600;">Watch the recording</a>
              </p>
            ` : ''}
            <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e0e0e0;" />
            <p style="font-size: 13px; color: #999;">
              <a href="https://montessorimakersgroup.org/residency/portal/sessions" style="color: #0E1A7A;">View in your portal</a>
            </p>
          </div>
        `,
      })
      sent++
    } catch { /* best-effort */ }
  }

  return NextResponse.json({ sent })
}

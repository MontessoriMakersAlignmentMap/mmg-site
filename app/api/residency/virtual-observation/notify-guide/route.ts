import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { resident_id, observation_date, recording_link, context_note } = await req.json()

  const { data: resident } = await supabaseAdmin
    .from('residency_residents')
    .select('id, mentor_id, profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name)')
    .eq('id', resident_id)
    .single()

  if (!resident || !resident.mentor_id) {
    return NextResponse.json({ error: 'Resident or mentor not found' }, { status: 404 })
  }

  const { data: mentor } = await supabaseAdmin
    .from('residency_profiles')
    .select('first_name, last_name, email')
    .eq('id', resident.mentor_id)
    .single()

  if (!mentor?.email) {
    return NextResponse.json({ error: 'Mentor email not found' }, { status: 404 })
  }

  const residentName = `${(resident.profile as any)?.first_name} ${(resident.profile as any)?.last_name}`
  const formattedDate = new Date(observation_date + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  await resend.emails.send({
    from: 'MMR Residency <residency@montessorimakersgroup.org>',
    to: mentor.email,
    subject: `New virtual observation submitted by ${residentName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
        <p style="color: #333; font-size: 15px; line-height: 1.6;">Hey ${mentor.first_name},</p>
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
          ${residentName} just submitted a virtual observation for your review. The recording is from <strong>${formattedDate}</strong>.
        </p>
        <p style="color: #333; font-size: 15px; line-height: 1.6;">Here's what they wrote about the context:</p>
        <blockquote style="border-left: 3px solid #d6a758; padding-left: 1rem; margin: 1rem 0; color: #555; font-style: italic;">
          ${context_note.slice(0, 500)}${context_note.length > 500 ? '...' : ''}
        </blockquote>
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
          <a href="${recording_link}" style="color: #0e1a7a; font-weight: 600;">Watch the recording</a>, then head to the platform to complete your rubric and feedback.
        </p>
        <p style="margin-top: 2rem;">
          <a href="https://montessorimakersgroup.org/residency/mentor/virtual-observations" style="display: inline-block; background: #0e1a7a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: 500;">
            Review on Platform
          </a>
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 2rem;">— MMR Residency Platform</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}

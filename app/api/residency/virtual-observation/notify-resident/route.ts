import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { observation_id, overall_readiness } = await req.json()

  const { data: obs } = await supabaseAdmin
    .from('residency_virtual_observations')
    .select('id, observation_date, resident_id')
    .eq('id', observation_id)
    .single()

  if (!obs) return NextResponse.json({ error: 'Observation not found' }, { status: 404 })

  const { data: resident } = await supabaseAdmin
    .from('residency_residents')
    .select('profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name, email)')
    .eq('id', obs.resident_id)
    .single()

  if (!resident) return NextResponse.json({ error: 'Resident not found' }, { status: 404 })

  const profile = resident.profile as any
  if (!profile?.email) return NextResponse.json({ error: 'No email' }, { status: 404 })

  const formattedDate = new Date(obs.observation_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long' })
  const readinessLabel = overall_readiness === 'developing_as_expected' ? 'Developing as Expected'
    : overall_readiness === 'needs_additional_support' ? 'Needs Additional Support'
    : 'Exceeding Expectations'

  await resend.emails.send({
    from: 'MMR Residency <residency@montessorimakersgroup.org>',
    to: profile.email,
    subject: 'Your Cohort Guide has reviewed your virtual observation',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
        <p style="color: #333; font-size: 15px; line-height: 1.6;">Hey ${profile.first_name},</p>
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
          Your Cohort Guide has reviewed your ${formattedDate} observation. There's feedback waiting for you.
        </p>
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
          Overall readiness: <strong>${readinessLabel}</strong>
        </p>
        <p style="color: #333; font-size: 15px; line-height: 1.6;">
          Go read it and write your reflection before your next seminar.
        </p>
        <p style="margin-top: 2rem;">
          <a href="https://montessorimakersgroup.org/residency/portal/practicum/virtual-observation/${obs.id}" style="display: inline-block; background: #0e1a7a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: 500;">
            Read Feedback & Reflect
          </a>
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 2rem;">— MMR Residency Platform</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}

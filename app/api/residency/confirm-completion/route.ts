import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const { resident_id, confirmed_by, notes } = await req.json()

  if (!resident_id || !confirmed_by) {
    return NextResponse.json({ error: 'resident_id and confirmed_by required' }, { status: 400 })
  }

  // Load resident info
  const { data: resident } = await supabase
    .from('residency_residents')
    .select('*, cohort:residency_cohorts(id, name, track), profile:residency_profiles(first_name, last_name, email)')
    .eq('id', resident_id)
    .single()

  if (!resident) return NextResponse.json({ error: 'Resident not found' }, { status: 404 })

  const track = (resident.cohort as any)?.track || 'primary'
  const profileData = resident.profile as any

  // Generate certificate number: MMR-{TRACK}-{YEAR}-{SEQUENCE}
  const year = new Date().getFullYear()
  const prefix = `MMR-${track === 'primary' ? 'PRI' : 'ELE'}-${year}`

  const { count } = await supabase
    .from('residency_graduates')
    .select('*', { count: 'exact', head: true })
    .like('certificate_number', `${prefix}%`)

  const sequence = String((count || 0) + 1).padStart(3, '0')
  const certificateNumber = `${prefix}-${sequence}`

  // Create graduate record
  const { data: graduate, error } = await supabase.from('residency_graduates').insert({
    resident_id,
    profile_id: resident.profile_id,
    cohort_id: (resident.cohort as any)?.id || null,
    track,
    confirmed_by,
    certificate_number: certificateNumber,
    portfolio_locked: true,
    portfolio_locked_at: new Date().toISOString(),
    notes: notes || null,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Update resident status
  await supabase.from('residency_residents').update({
    status: 'completed',
  }).eq('id', resident_id)

  // Send congratulations email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
      to: profileData.email,
      subject: 'Congratulations, Graduate! — Montessori Makers Residency',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0E1A7A; padding: 2.5rem; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #d6a758; font-size: 24px; margin: 0 0 0.5rem;">Congratulations!</h1>
            <p style="color: rgba(255,255,255,0.8); font-size: 15px; margin: 0;">You have completed the Montessori Makers Residency</p>
          </div>
          <div style="padding: 2rem; border: 1px solid #e2ddd6; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0E1A7A; font-size: 18px;">Dear ${profileData.first_name},</h2>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              We are honored to confirm that you have successfully completed all requirements of the
              Montessori Makers Residency (${track === 'primary' ? 'Primary' : 'Elementary'} track).
            </p>
            <div style="background: #f5f5f5; border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0; text-align: center;">
              <p style="font-size: 13px; color: #666; margin: 0 0 0.5rem;">Certificate Number</p>
              <p style="font-size: 18px; font-weight: 700; color: #0E1A7A; margin: 0; letter-spacing: 0.05em;">${certificateNumber}</p>
            </div>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              Your portfolio has been locked as a permanent record of your work. You can access your
              certificate and portfolio through the resident portal at any time.
            </p>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              Welcome to the Montessori Makers community of graduates. We are so proud of your journey.
            </p>
            <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e2ddd6;" />
            <p style="font-size: 13px; color: #999; text-align: center;">
              Montessori Makers Institute<br />
              <a href="https://montessorimakersgroup.org/residency" style="color: #0E1A7A;">montessorimakersgroup.org/residency</a>
            </p>
          </div>
        </div>
      `,
    })
  } catch { /* best-effort */ }

  return NextResponse.json({ graduate, certificateNumber })
}

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const { first_name, last_name, email, mentoring_interest, equity_statement } = body
  if (!first_name || !last_name || !email || !mentoring_interest || !equity_statement) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
  }

  const { data, error } = await supabase.from('residency_mentor_applications').insert({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    phone: body.phone || null,
    school_name: body.school_name || null,
    role_at_school: body.role_at_school || null,
    credential_type: body.credential_type || null,
    years_experience: body.years_experience || null,
    school_types: body.school_types || [],
    mentoring_interest: body.mentoring_interest,
    equity_statement: body.equity_statement,
    availability: body.availability || [],
    role_description_confirmed: body.role_description_confirmed || false,
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send confirmation to applicant
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
      to: email,
      subject: 'Mentor Application Received — Montessori Makers Residency',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0E1A7A; padding: 2rem; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #fff; font-size: 20px; margin: 0;">Montessori Makers Residency</h1>
          </div>
          <div style="padding: 2rem; border: 1px solid #e2ddd6; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0E1A7A; font-size: 18px;">Thank you, ${first_name}!</h2>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              We have received your application to become a Mentor Teacher with the Montessori Makers Residency.
              Our team will review your qualifications and be in touch within two weeks.
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

    // Notify Hannah
    await resend.emails.send({
      from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
      to: 'hannah@montessorimakersgroup.org',
      subject: `New Mentor Application: ${first_name} ${last_name}`,
      html: `
        <div style="font-family: system-ui, sans-serif;">
          <h2 style="color: #0E1A7A;">New Mentor Application</h2>
          <p><strong>${first_name} ${last_name}</strong> (${email})</p>
          <p>Credential: ${body.credential_type || 'Not specified'}</p>
          <p>Experience: ${body.years_experience || '?'} years</p>
          <p><a href="https://montessorimakersgroup.org/residency/admin/mentor-applications" style="color: #0E1A7A;">Review in Admin Panel</a></p>
        </div>
      `,
    })
  } catch { /* best-effort */ }

  return NextResponse.json({ id: data.id })
}

export async function GET() {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('residency_mentor_applications')
    .select('*')
    .is('deleted_at', null)
    .order('submitted_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

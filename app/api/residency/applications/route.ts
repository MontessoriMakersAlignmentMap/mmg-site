import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const { first_name, last_name, email, why_montessori, track_interest } = body
  if (!first_name || !last_name || !email || !why_montessori || !track_interest) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
  }

  const { data, error } = await supabase.from('residency_applications').insert({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    phone: body.phone || null,
    city: body.city || null,
    state: body.state || null,
    applicant_role: body.applicant_role || null,
    school_name: body.school_name || null,
    years_experience: body.years_experience || null,
    education_level: body.education_level || null,
    track_interest: body.track_interest,
    montessori_experience: body.montessori_experience || null,
    why_montessori: body.why_montessori,
    equity_fellows: body.equity_fellows || false,
    equity_statement: body.equity_statement || null,
    heard_about: body.heard_about || null,
  }).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Send confirmation email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
      to: email,
      subject: 'Application Received — Montessori Makers Residency',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0E1A7A; padding: 2rem; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #fff; font-size: 20px; margin: 0;">Montessori Makers Residency</h1>
          </div>
          <div style="padding: 2rem; border: 1px solid #e2ddd6; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0E1A7A; font-size: 18px;">Thank you, ${first_name}!</h2>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              We have received your application to the Montessori Makers Residency
              (${track_interest === 'primary' ? 'Primary' : 'Elementary'} track).
            </p>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              Our admissions team reviews applications on a rolling basis. You can expect to hear
              from us within two weeks regarding your application status.
            </p>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              If you have any questions in the meantime, please don't hesitate to reach out.
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

  return NextResponse.json({ id: data.id })
}

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  let query = supabase
    .from('residency_applications')
    .select('*')
    .is('deleted_at', null)
    .order('submitted_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()
  const { id, action, internal_notes, cohort_id } = body

  if (!id || !action) {
    return NextResponse.json({ error: 'id and action required' }, { status: 400 })
  }

  // Load application
  const { data: app } = await supabase.from('residency_applications').select('*').eq('id', id).single()
  if (!app) return NextResponse.json({ error: 'Application not found' }, { status: 404 })

  const resend = new Resend(process.env.RESEND_API_KEY)

  if (action === 'accept') {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: app.email,
      password: crypto.randomUUID().slice(0, 12),
      email_confirm: true,
      user_metadata: { first_name: app.first_name, last_name: app.last_name },
    })

    if (authError) {
      return NextResponse.json({ error: `Account creation failed: ${authError.message}` }, { status: 500 })
    }

    const userId = authData.user.id

    // Create residency profile
    await supabase.from('residency_profiles').insert({
      id: userId,
      role: 'resident',
      first_name: app.first_name,
      last_name: app.last_name,
      email: app.email,
    })

    // Create resident record with cohort if provided
    await supabase.from('residency_residents').insert({
      profile_id: userId,
      cohort_id: cohort_id || null,
      status: 'enrolled',
    })

    // Update application
    await supabase.from('residency_applications').update({
      status: 'accepted',
      accepted_at: new Date().toISOString(),
      reviewed_at: new Date().toISOString(),
      internal_notes: internal_notes || app.internal_notes,
    }).eq('id', id)

    // Generate password reset link so user can set their own password
    const { data: resetData } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: app.email,
      options: { redirectTo: 'https://montessorimakersgroup.org/residency/auth/login' },
    })

    const loginLink = resetData?.properties?.action_link || 'https://montessorimakersgroup.org/residency/auth/login'

    // Send acceptance email
    try {
      await resend.emails.send({
        from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
        to: app.email,
        subject: 'Welcome to the Montessori Makers Residency!',
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0E1A7A; padding: 2rem; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: #d6a758; font-size: 20px; margin: 0;">Congratulations!</h1>
            </div>
            <div style="padding: 2rem; border: 1px solid #e2ddd6; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #0E1A7A; font-size: 18px;">Welcome, ${app.first_name}!</h2>
              <p style="font-size: 15px; line-height: 1.7; color: #333;">
                We are excited to inform you that your application to the Montessori Makers Residency
                has been accepted. You are now officially a resident in the
                ${app.track_interest === 'primary' ? 'Primary' : 'Elementary'} track.
              </p>
              <p style="font-size: 15px; line-height: 1.7; color: #333;">
                Your account has been created. Click the link below to access your portal:
              </p>
              <div style="text-align: center; margin: 2rem 0;">
                <a href="${loginLink}" style="
                  background: #0E1A7A; color: #fff; padding: 12px 32px; border-radius: 8px;
                  text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;
                ">Access Your Portal</a>
              </div>
              <p style="font-size: 14px; line-height: 1.7; color: #666;">
                You'll be able to view your curriculum, submit album entries, log practicum hours, and connect
                with your cohort through the resident portal.
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

    return NextResponse.json({ success: true, userId })
  }

  if (action === 'waitlist') {
    await supabase.from('residency_applications').update({
      status: 'waitlisted',
      reviewed_at: new Date().toISOString(),
      internal_notes: internal_notes || app.internal_notes,
    }).eq('id', id)

    try {
      await resend.emails.send({
        from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
        to: app.email,
        subject: 'Application Update — Montessori Makers Residency',
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0E1A7A; padding: 2rem; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: #fff; font-size: 20px; margin: 0;">Montessori Makers Residency</h1>
            </div>
            <div style="padding: 2rem; border: 1px solid #e2ddd6; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #0E1A7A; font-size: 18px;">Dear ${app.first_name},</h2>
              <p style="font-size: 15px; line-height: 1.7; color: #333;">
                Thank you for your interest in the Montessori Makers Residency. After careful review,
                we have placed your application on our waitlist for the
                ${app.track_interest === 'primary' ? 'Primary' : 'Elementary'} track.
              </p>
              <p style="font-size: 15px; line-height: 1.7; color: #333;">
                This means that should a spot become available, we will reach out to you promptly.
                We were genuinely impressed by your application and hope to welcome you into a future cohort.
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

    return NextResponse.json({ success: true })
  }

  if (action === 'decline') {
    await supabase.from('residency_applications').update({
      status: 'declined',
      declined_at: new Date().toISOString(),
      reviewed_at: new Date().toISOString(),
      internal_notes: internal_notes || app.internal_notes,
    }).eq('id', id)

    try {
      await resend.emails.send({
        from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
        to: app.email,
        subject: 'Application Update — Montessori Makers Residency',
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0E1A7A; padding: 2rem; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: #fff; font-size: 20px; margin: 0;">Montessori Makers Residency</h1>
            </div>
            <div style="padding: 2rem; border: 1px solid #e2ddd6; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #0E1A7A; font-size: 18px;">Dear ${app.first_name},</h2>
              <p style="font-size: 15px; line-height: 1.7; color: #333;">
                Thank you for your application to the Montessori Makers Residency. After careful review,
                we are unable to offer you a spot in this cohort.
              </p>
              <p style="font-size: 15px; line-height: 1.7; color: #333;">
                We encourage you to continue pursuing your Montessori journey and welcome you to apply
                again for a future cohort. You may also
                <a href="https://montessorimakersgroup.org/residency/waitlist" style="color: #0E1A7A; font-weight: 600;">join our waitlist</a>
                to stay informed about upcoming enrollment periods.
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

    return NextResponse.json({ success: true })
  }

  if (action === 'update_notes') {
    await supabase.from('residency_applications').update({
      internal_notes: internal_notes,
    }).eq('id', id)
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}

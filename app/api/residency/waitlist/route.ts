import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const { first_name, last_name, email } = body
  if (!first_name || !last_name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const { error } = await supabase.from('residency_waitlist').insert({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    phone: body.phone || null,
    track_interest: body.track_interest || null,
    applicant_role: body.applicant_role || null,
    source: 'waitlist_page',
  })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'This email is already on the waitlist' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Send confirmation
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
      to: email,
      subject: "You're on the waitlist — Montessori Makers Residency",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0E1A7A; padding: 2rem; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #fff; font-size: 20px; margin: 0;">Montessori Makers Residency</h1>
          </div>
          <div style="padding: 2rem; border: 1px solid #e2ddd6; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #0E1A7A; font-size: 18px;">Hi ${first_name}!</h2>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              You've been added to the waitlist for the Montessori Makers Residency.
              We'll notify you as soon as enrollment opens for the next cohort.
            </p>
            <p style="font-size: 15px; line-height: 1.7; color: #333;">
              In the meantime, you can explore our
              <a href="https://montessorimakersgroup.org/residency/curriculum" style="color: #0E1A7A; font-weight: 600;">curriculum overview</a>
              to learn more about the program.
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

export async function GET() {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('residency_waitlist')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

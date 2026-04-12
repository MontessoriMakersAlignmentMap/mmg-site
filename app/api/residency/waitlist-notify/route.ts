import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const { ids } = await req.json()

  if (!ids?.length) return NextResponse.json({ sent: 0 })

  const { data: entries } = await supabase
    .from('residency_waitlist')
    .select('id, first_name, email')
    .in('id', ids)

  if (!entries?.length) return NextResponse.json({ sent: 0 })

  const resend = new Resend(process.env.RESEND_API_KEY)
  let sent = 0

  for (const entry of entries) {
    try {
      await resend.emails.send({
        from: 'Montessori Makers Residency <noreply@montessorimakersgroup.org>',
        to: entry.email,
        subject: 'Enrollment is Now Open — Montessori Makers Residency',
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0E1A7A; padding: 2rem; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: #d6a758; font-size: 20px; margin: 0;">Enrollment is Open!</h1>
            </div>
            <div style="padding: 2rem; border: 1px solid #e2ddd6; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #0E1A7A; font-size: 18px;">Hi ${entry.first_name}!</h2>
              <p style="font-size: 15px; line-height: 1.7; color: #333;">
                Great news — enrollment for the next Montessori Makers Residency cohort is now open!
                As someone on our waitlist, we wanted to make sure you were among the first to know.
              </p>
              <div style="text-align: center; margin: 2rem 0;">
                <a href="https://montessorimakersgroup.org/residency/apply" style="
                  background: #0E1A7A; color: #fff; padding: 12px 32px; border-radius: 8px;
                  text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;
                ">Apply Now</a>
              </div>
              <p style="font-size: 14px; line-height: 1.7; color: #666;">
                Spots are limited and applications are reviewed on a rolling basis. We encourage you
                to apply early.
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

      await supabase.from('residency_waitlist').update({
        notified_at: new Date().toISOString(),
      }).eq('id', entry.id)

      sent++
    } catch { /* best-effort */ }
  }

  return NextResponse.json({ sent })
}

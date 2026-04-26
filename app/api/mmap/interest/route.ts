import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { schoolName, contactName, email, enrollment, tierInterest, addons, notes } = body

    if (!schoolName || !contactName || !email || !enrollment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const adminEmail = process.env.ADMIN_EMAIL ?? 'hannah@montessorimakers.org'

    const tierLabels: Record<string, string> = {
      surveyor:  'Surveyor — $2/student/month',
      'north-star': 'North Star — $3/student/month',
      mapmaker:  'Mapmaker — $5/student/month',
      atlas:     'Atlas — $7/student/month',
      not_sure:  'Not sure yet',
    }

    const addonLabels: Record<string, string> = {
      finance:   'Finance Engine (+$2/student/mo)',
      pulse:     'Family Pulse (+$0.50/student/mo)',
      peace:     'Peace & Restoration (+$0.50/student/mo)',
      handbook:  'Handbook Templates (flat rate)',
      api:       'API / SIS Integration (quote)',
    }

    const addonList = Array.isArray(addons) && addons.length > 0
      ? addons.map((k: string) => addonLabels[k] ?? k).join(', ')
      : 'None selected'

    const tierLabel = tierLabels[tierInterest] ?? tierInterest

    // Estimate monthly cost for the notification
    const tierRates: Record<string, number> = {
      surveyor: 2, 'north-star': 3, mapmaker: 5, atlas: 7,
    }
    const addonRates: Record<string, number> = {
      finance: 2, pulse: 0.5, peace: 0.5,
    }
    const count = parseInt(enrollment) || 0
    const tierRate = tierRates[tierInterest] ?? 0
    const addonRate = Array.isArray(addons)
      ? addons.reduce((sum: number, k: string) => sum + (addonRates[k] ?? 0), 0)
      : 0
    const estMonthly = count > 0 ? ((tierRate + addonRate) * count).toFixed(0) : null

    function row(label: string, value: string) {
      return `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #f2ede6;vertical-align:top;width:140px;">
            <span style="font-size:10px;color:#8a6014;letter-spacing:0.12em;text-transform:uppercase;font-family:Arial,sans-serif;">${label}</span>
          </td>
          <td style="padding:8px 0 8px 20px;border-bottom:1px solid #f2ede6;vertical-align:top;">
            <span style="font-size:13px;color:#374151;font-family:Arial,sans-serif;line-height:1.6;">${value}</span>
          </td>
        </tr>`
    }

    // ── Admin notification ────────────────────────────────────────────────────
    const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e2ddd6;">
        <tr>
          <td style="background:#0e1a7a;padding:28px 36px;">
            <p style="margin:0;color:#d6a758;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,sans-serif;">MMAP · New Interest</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-family:Georgia,serif;font-weight:normal;">${schoolName}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('Contact', contactName)}
              ${row('Email', `<a href="mailto:${email}" style="color:#0e1a7a;">${email}</a>`)}
              ${row('Enrollment', `${enrollment} students`)}
              ${row('Tier interest', tierLabel)}
              ${row('Add-ons', addonList)}
              ${estMonthly ? row('Est. monthly', `$${estMonthly}/mo · $${(parseInt(estMonthly) * 12).toLocaleString()}/yr`) : ''}
              ${notes ? row('Notes', notes.replace(/\n/g, '<br/>')) : ''}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8f7f4;border-top:1px solid #e2ddd6;padding:14px 36px 16px;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:bold;color:#0e1a7a;font-family:Arial,sans-serif;">Next steps</p>
            <p style="margin:0;font-size:12px;color:#374151;font-family:Arial,sans-serif;line-height:1.6;">
              1. Schedule onboarding call &nbsp;·&nbsp;
              2. Send subscription agreement via Dropbox Sign &nbsp;·&nbsp;
              3. Create Stripe subscription (${enrollment} × ${tierLabel})
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f8f7f4;border-top:1px solid #e2ddd6;padding:12px 36px;">
            <p style="margin:0;font-size:11px;color:#94a3b8;font-family:Arial,sans-serif;">Source: montessorimakersgroup.org/mmap/pricing</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim()

    // ── School confirmation ───────────────────────────────────────────────────
    const confirmHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2ddd6;">
        <tr>
          <td style="background:#0e1a7a;padding:28px 36px;">
            <p style="margin:0;color:#d6a758;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,sans-serif;">Montessori Makers · MMAP</p>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 36px 28px;">
            <p style="margin:0 0 8px;font-size:11px;color:#d6a758;letter-spacing:0.15em;text-transform:uppercase;font-family:Arial,sans-serif;">Request received</p>
            <h1 style="margin:0 0 24px;font-size:24px;color:#0e1a7a;line-height:1.2;font-family:Georgia,serif;font-weight:normal;">
              We'll be in touch shortly.
            </h1>
            <p style="margin:0 0 18px;font-size:15px;color:#374151;line-height:1.7;font-family:Arial,sans-serif;">
              Hi ${contactName},
            </p>
            <p style="margin:0 0 18px;font-size:15px;color:#374151;line-height:1.7;font-family:Arial,sans-serif;">
              Thank you for your interest in MMAP for ${schoolName}. Hannah or a member of our team will be in touch within two business days to schedule your onboarding call.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.7;font-family:Arial,sans-serif;">
              Every MMAP subscription starts with a setup call — not as a formality, but because we configure every school's platform in partnership to make sure it reflects how you actually operate.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;border:1px solid #e2ddd6;margin-bottom:28px;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 8px;font-size:10px;color:#8a6014;letter-spacing:0.15em;text-transform:uppercase;font-family:Arial,sans-serif;">Your submission</p>
                  <p style="margin:0 0 4px;font-size:13px;color:#374151;font-family:Arial,sans-serif;"><strong>School:</strong> ${schoolName}</p>
                  <p style="margin:0 0 4px;font-size:13px;color:#374151;font-family:Arial,sans-serif;"><strong>Enrollment:</strong> ${enrollment} students</p>
                  <p style="margin:0 0 4px;font-size:13px;color:#374151;font-family:Arial,sans-serif;"><strong>Tier:</strong> ${tierLabel}</p>
                  ${addonList !== 'None selected' ? `<p style="margin:0;font-size:13px;color:#374151;font-family:Arial,sans-serif;"><strong>Add-ons:</strong> ${addonList}</p>` : ''}
                </td>
              </tr>
            </table>
            <p style="margin:0;font-size:14px;color:#374151;font-family:Arial,sans-serif;">— Hannah &amp; the Montessori Makers team</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f8f7f4;border-top:1px solid #e2ddd6;padding:16px 36px;">
            <p style="margin:0;font-size:11px;color:#94a3b8;font-family:Arial,sans-serif;line-height:1.5;">
              Montessori Makers Group · montessorimakersgroup.org<br/>
              Questions? Reply to this email.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim()

    await Promise.all([
      sendEmail({
        to: adminEmail,
        subject: `MMAP Interest: ${schoolName} — ${enrollment} students, ${tierLabel}${estMonthly ? ` (~$${estMonthly}/mo)` : ''}`,
        html: adminHtml,
      }),
      sendEmail({
        to: email,
        subject: 'Your MMAP interest request — Montessori Makers',
        html: confirmHtml,
      }),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('MMAP interest form error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { schoolName, contactName, email, phone, enrollment, tierInterest, addons } = body

    if (!schoolName || !contactName || !email || !enrollment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const tierLabels: Record<string, string> = {
      surveyor: 'Surveyor — $2/student/month',
      north_star: 'North Star — $3/student/month',
      mapmaker: 'Mapmaker — $5/student/month',
      atlas: 'Atlas — $7/student/month',
      not_sure: 'Not sure yet',
    }

    const addonLabels: Record<string, string> = {
      finance_engine: 'Finance Engine',
      family_pulse: 'Family Pulse',
      peace_restoration: 'Peace and Restoration',
      sms_broadcasts: 'SMS Broadcasts',
      handbook_templates: 'Handbook Templates',
      assessment_equity_analytics: 'Assessment Equity Analytics (quote)',
      custom_integration: 'API / SIS Integration (quote)',
    }

    const addonList = Array.isArray(addons) && addons.length > 0
      ? addons.map((k: string) => addonLabels[k] ?? k).join(', ')
      : 'None selected'

    function row(label: string, value: string) {
      return `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #f2ede6;vertical-align:top;width:160px;">
            <span style="font-size:10px;color:#8a6014;letter-spacing:0.12em;text-transform:uppercase;font-family:Arial,sans-serif;">${label}</span>
          </td>
          <td style="padding:8px 0 8px 20px;border-bottom:1px solid #f2ede6;vertical-align:top;">
            <span style="font-size:13px;color:#374151;font-family:Arial,sans-serif;line-height:1.6;">${value}</span>
          </td>
        </tr>`
    }

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e2ddd6;">
        <tr>
          <td style="background:#0e1a7a;padding:28px 36px;">
            <p style="margin:0;color:#d6a758;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,sans-serif;">MMAP</p>
            <h1 style="margin:8px 0 0;font-size:20px;color:#ffffff;font-family:Georgia,serif;font-weight:normal;">New MMAP Interest Form Submission</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('School', schoolName)}
              ${row('Contact', contactName)}
              ${row('Email', `<a href="mailto:${email}" style="color:#0e1a7a;">${email}</a>`)}
              ${row('Phone', phone || 'Not provided')}
              ${row('Enrollment', `${enrollment} students`)}
              ${row('Tier interest', tierLabels[tierInterest] ?? tierInterest)}
              ${row('Add-ons', addonList)}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8f7f4;border-top:1px solid #e2ddd6;padding:16px 36px;">
            <p style="margin:0;font-size:11px;color:#94a3b8;font-family:Arial,sans-serif;">Source: /mmap/pricing interest form</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim()

    await sendEmail({
      to: 'info@montessorimakers.org',
      subject: `MMAP Interest: ${schoolName} (${enrollment} students, ${tierLabels[tierInterest] ?? tierInterest})`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('MMAP interest form error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Email helper using Resend's HTTP API — no SDK required.
// Required env vars:
//   RESEND_API_KEY   — from resend.com
//   ADMIN_EMAIL      — address to receive admin notifications

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html?: string
  text?: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn('sendEmail: missing RESEND_API_KEY — skipping')
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'Montessori Makers <noreply@montessorimakers.co>',
      to,
      subject,
      ...(html ? { html } : {}),
      ...(text ? { text } : {}),
    }),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Resend API error ${res.status}: ${errBody}`)
  }
}

// ─── Admin notification (plain text, always goes to ADMIN_EMAIL) ──────────────

export async function sendAdminNotification({
  subject,
  text,
}: {
  subject: string
  text: string
}): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.warn('sendAdminNotification: missing ADMIN_EMAIL — skipping')
    return
  }
  await sendEmail({ to: adminEmail, subject, text })
}

// ─── Job approved notification (HTML, goes to the school contact) ────────────

export async function sendJobApprovedEmail({
  to,
  contactName,
  jobTitle,
  schoolName,
  expiresAt,
}: {
  to: string
  contactName: string
  jobTitle: string
  schoolName: string
  expiresAt: string | null
}): Promise<void> {
  const subject = 'Your MatchHub job post is now live'

  const expiryLine = expiresAt
    ? `<p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
        Your listing will remain active until
        <strong>${new Date(expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>.
        If you need to make edits or extend your listing, just reply to this email.
      </p>`
    : `<p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
        If you need to make any edits to your listing, just reply to this email.
      </p>`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2ddd6;">

          <!-- Header -->
          <tr>
            <td style="background:#0e1a7a;padding:32px 40px;">
              <p style="margin:0;color:#d6a758;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,sans-serif;">
                Montessori Makers MatchHub
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:11px;color:#d6a758;letter-spacing:0.15em;text-transform:uppercase;font-family:Arial,sans-serif;">
                Your listing is live
              </p>
              <h1 style="margin:0 0 28px;font-size:26px;color:#0e1a7a;line-height:1.2;font-family:Georgia,serif;">
                Your role is now live on MatchHub.
              </h1>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
                ${contactName ? `Hi ${contactName},` : 'Hi there,'}
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
                Great news — your job post for <strong>${jobTitle}</strong> at
                <strong>${schoolName}</strong> has been reviewed and approved.
                It is now visible to Montessori guides and educators on the MatchHub jobs board.
              </p>
              ${expiryLine}

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr><td style="border-top:1px solid #e2ddd6;"></td></tr>
              </table>

              <!-- Summary block -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:20px 24px;margin-bottom:32px;">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-size:10px;color:#8a6014;letter-spacing:0.15em;text-transform:uppercase;font-family:Arial,sans-serif;">
                      Listing summary
                    </p>
                    <p style="margin:0 0 4px;font-size:13px;color:#374151;font-family:Arial,sans-serif;">
                      <strong>School:</strong> ${schoolName}
                    </p>
                    <p style="margin:0 0 4px;font-size:13px;color:#374151;font-family:Arial,sans-serif;">
                      <strong>Role:</strong> ${jobTitle}
                    </p>
                    <p style="margin:0;font-size:13px;color:#374151;font-family:Arial,sans-serif;">
                      <strong>Status:</strong> Live
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#374151;font-family:Arial,sans-serif;">
                — The MatchHub Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f7f4;border-top:1px solid #e2ddd6;padding:20px 40px;">
              <p style="margin:0;font-size:11px;color:#94a3b8;font-family:Arial,sans-serif;line-height:1.5;">
                Montessori Makers Group &nbsp;·&nbsp; montessorimakers.co<br />
                You're receiving this because you have an active job post on MatchHub.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  await sendEmail({ to, subject, html })
}

// ─── Job rejected / needs revision (HTML, goes to the school contact) ─────────

export async function sendJobRejectedEmail({
  to,
  contactName,
  jobTitle,
  schoolName,
}: {
  to: string
  contactName: string
  jobTitle: string
  schoolName: string
}): Promise<void> {
  const subject = 'Your MatchHub job post needs revision'

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2ddd6;">

          <!-- Header -->
          <tr>
            <td style="background:#0e1a7a;padding:32px 40px;">
              <p style="margin:0;color:#d6a758;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,sans-serif;">
                Montessori Makers MatchHub
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 8px;font-size:11px;color:#8a6014;letter-spacing:0.15em;text-transform:uppercase;font-family:Arial,sans-serif;">
                Action needed
              </p>
              <h1 style="margin:0 0 28px;font-size:26px;color:#0e1a7a;line-height:1.2;font-family:Georgia,serif;">
                Your listing needs a few updates.
              </h1>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
                ${contactName ? `Hi ${contactName},` : 'Hi there,'}
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
                We reviewed your MatchHub submission for <strong>${jobTitle}</strong> at
                <strong>${schoolName}</strong> and need one or more updates before it can be published.
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
                This isn't a permanent rejection — it simply means your listing isn't quite ready
                to go live yet. Please reply to this email with any updates or questions and we'll
                work with you to get it published as quickly as possible.
              </p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr><td style="border-top:1px solid #e2ddd6;"></td></tr>
              </table>

              <!-- Summary block -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:20px 24px;margin-bottom:32px;">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-size:10px;color:#8a6014;letter-spacing:0.15em;text-transform:uppercase;font-family:Arial,sans-serif;">
                      Submission summary
                    </p>
                    <p style="margin:0 0 4px;font-size:13px;color:#374151;font-family:Arial,sans-serif;">
                      <strong>School:</strong> ${schoolName}
                    </p>
                    <p style="margin:0 0 4px;font-size:13px;color:#374151;font-family:Arial,sans-serif;">
                      <strong>Role:</strong> ${jobTitle}
                    </p>
                    <p style="margin:0;font-size:13px;color:#374151;font-family:Arial,sans-serif;">
                      <strong>Status:</strong> Needs revision
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#374151;font-family:Arial,sans-serif;">
                — The MatchHub Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f7f4;border-top:1px solid #e2ddd6;padding:20px 40px;">
              <p style="margin:0;font-size:11px;color:#94a3b8;font-family:Arial,sans-serif;line-height:1.5;">
                Montessori Makers Group &nbsp;·&nbsp; montessorimakers.co<br />
                You're receiving this because you submitted a job post through MatchHub.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  await sendEmail({ to, subject, html })
}

// ─── School confirmation (HTML, goes to the submitting school) ────────────────

export async function sendSchoolConfirmation({
  to,
  contactName,
  jobTitle,
  schoolName,
}: {
  to: string
  contactName: string
  jobTitle: string
  schoolName: string
}): Promise<void> {
  const subject = 'Your MatchHub job post has been received'

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2ddd6;">

          <!-- Header -->
          <tr>
            <td style="background:#0e1a7a;padding:32px 40px;">
              <p style="margin:0;color:#d6a758;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,sans-serif;">
                Montessori Makers MatchHub
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
                Hi ${contactName},
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
                Thank you — your payment has been received and your job post for
                <strong>${jobTitle}</strong> at <strong>${schoolName}</strong> is now in our review queue.
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
                Our team will review your listing within <strong>one business day</strong>. Once approved,
                your role will go live on the MatchHub jobs board and you'll receive a confirmation
                email letting you know it's live.
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
                Your job post will be visible on MatchHub for <strong>30 days</strong> from the date it is approved.
                You'll have the option to extend or repost your listing if needed.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#374151;line-height:1.6;font-family:Arial,sans-serif;">
                If you have any questions in the meantime, reply to this email or reach out through
                the MatchHub contact page.
              </p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr><td style="border-top:1px solid #e2ddd6;"></td></tr>
              </table>

              <!-- Summary block -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:20px 24px;margin-bottom:32px;">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-size:10px;color:#8a6014;letter-spacing:0.15em;text-transform:uppercase;font-family:Arial,sans-serif;">
                      Submission summary
                    </p>
                    <p style="margin:0 0 4px;font-size:13px;color:#374151;font-family:Arial,sans-serif;">
                      <strong>School:</strong> ${schoolName}
                    </p>
                    <p style="margin:0 0 4px;font-size:13px;color:#374151;font-family:Arial,sans-serif;">
                      <strong>Role:</strong> ${jobTitle}
                    </p>
                    <p style="margin:0;font-size:13px;color:#374151;font-family:Arial,sans-serif;">
                      <strong>Payment:</strong> Received
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#374151;font-family:Arial,sans-serif;">
                — The MatchHub Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f7f4;border-top:1px solid #e2ddd6;padding:20px 40px;">
              <p style="margin:0;font-size:11px;color:#94a3b8;font-family:Arial,sans-serif;line-height:1.5;">
                Montessori Makers Group &nbsp;·&nbsp; montessorimakers.co<br />
                You're receiving this because you submitted a job post through MatchHub.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  await sendEmail({ to, subject, html })
}

// ─── Contact form notification (HTML, goes to ADMIN_EMAIL) ───────────────────

export async function sendContactFormEmail({
  name,
  email,
  organization,
  role,
  supportType,
  message,
  situation,
  goals,
  timeline,
  schoolSize,
  service,
  source,
}: {
  name: string
  email: string
  organization: string
  role: string
  supportType?: string
  message: string
  situation?: string
  goals?: string
  timeline: string
  schoolSize?: string
  service: string
  source: string
}): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'hannah@montessorimakers.org'

  function row(label: string, value: string | undefined) {
    if (!value) return ''
    return `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #f2ede6;vertical-align:top;">
          <span style="font-size:10px;color:#8a6014;letter-spacing:0.12em;text-transform:uppercase;font-family:Arial,sans-serif;">${label}</span>
        </td>
        <td style="padding:8px 0 8px 20px;border-bottom:1px solid #f2ede6;vertical-align:top;">
          <span style="font-size:13px;color:#374151;font-family:Arial,sans-serif;line-height:1.6;">${value.replace(/\n/g, '<br/>')}</span>
        </td>
      </tr>`
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e2ddd6;">

        <!-- Header -->
        <tr>
          <td style="background:#0e1a7a;padding:28px 36px;">
            <p style="margin:0;color:#d6a758;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,sans-serif;">
              Montessori Makers Group
            </p>
            <h1 style="margin:8px 0 0;font-size:20px;color:#ffffff;font-family:Georgia,serif;font-weight:normal;">
              New Contact Form Submission
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('Service area', service)}
              ${row('Name', name)}
              ${row('Email', `<a href="mailto:${email}" style="color:#0e1a7a;">${email}</a>`)}
              ${row('Organization', organization)}
              ${row('Role', role)}
              ${row('Support type', supportType)}
              ${row('Timeline', timeline)}
              ${row('School size', schoolSize)}
            </table>

            ${message ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#f8f7f4;border:1px solid #e2ddd6;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 8px;font-size:10px;color:#8a6014;letter-spacing:0.12em;text-transform:uppercase;font-family:Arial,sans-serif;">What feels unclear, stuck, or not working?</p>
                  <p style="margin:0;font-size:14px;color:#374151;font-family:Arial,sans-serif;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
                </td>
              </tr>
            </table>` : ''}

            ${situation ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;background:#f8f7f4;border:1px solid #e2ddd6;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 8px;font-size:10px;color:#8a6014;letter-spacing:0.12em;text-transform:uppercase;font-family:Arial,sans-serif;">Current situation</p>
                  <p style="margin:0;font-size:14px;color:#374151;font-family:Arial,sans-serif;line-height:1.7;">${situation.replace(/\n/g, '<br/>')}</p>
                </td>
              </tr>
            </table>` : ''}

            ${goals ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;background:#f8f7f4;border:1px solid #e2ddd6;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 8px;font-size:10px;color:#8a6014;letter-spacing:0.12em;text-transform:uppercase;font-family:Arial,sans-serif;">Hoping to improve or change</p>
                  <p style="margin:0;font-size:14px;color:#374151;font-family:Arial,sans-serif;line-height:1.7;">${goals.replace(/\n/g, '<br/>')}</p>
                </td>
              </tr>
            </table>` : ''}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f7f4;border-top:1px solid #e2ddd6;padding:16px 36px;">
            <p style="margin:0;font-size:11px;color:#94a3b8;font-family:Arial,sans-serif;line-height:1.5;">
              Source: ${source} &nbsp;·&nbsp; montessorimakers.org
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`.trim()

  await sendEmail({
    to: adminEmail,
    subject: 'New Contact Form Submission',
    html,
  })
}

// ─── Field Intelligence / Field Pulse submission (plain text, to ADMIN_EMAIL) ──

export async function sendFieldIntelligenceEmail({
  q1,
  q2,
  q3,
  source,
}: {
  q1: string
  q2: string
  q3: string
  source: string
}): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.warn('sendFieldIntelligenceEmail: missing ADMIN_EMAIL — skipping')
    return
  }
  await sendEmail({
    to: adminEmail,
    subject: 'New Field Intelligence Submission',
    text: [
      'New Field Pulse contribution received.',
      '',
      `Source: ${source}`,
      '',
      'Q1 — What is taking up the most of your leadership attention right now?',
      q1 || '(no response)',
      '',
      'Q2 — What feels more uncertain or harder to navigate than it did six months ago?',
      q2 || '(no response)',
      '',
      'Q3 — Is there a pattern you are noticing across your school community that rarely gets named publicly?',
      q3 || '(no response)',
    ].join('\n'),
  })
}

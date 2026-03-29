import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name       = (formData.get('name')       as string | null) ?? ''
    const email      = (formData.get('email')      as string | null) ?? ''
    const phone      = (formData.get('phone')      as string | null) ?? ''
    const roleTitle  = (formData.get('roleTitle')  as string | null) ?? ''
    const schoolName = (formData.get('schoolName') as string | null) ?? ''
    const message    = (formData.get('message')    as string | null) ?? ''
    const hp         = (formData.get('hp')         as string | null) ?? ''
    const resumeFile = formData.get('resume')      as File | null

    // Honeypot check
    if (hp) return NextResponse.json({ ok: true }) // silently discard spam

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    let resumeUrl: string | null = null

    // Upload resume to Supabase storage if provided
    if (resumeFile && resumeFile.size > 0) {
      const client = createServiceClient()
      const ext = resumeFile.name.split('.').pop() ?? 'pdf'
      const path = `role-applications/${Date.now()}-${name.replace(/\s+/g, '-').toLowerCase()}.${ext}`
      const buffer = await resumeFile.arrayBuffer()

      const { data, error: uploadError } = await client.storage
        .from('resumes')
        .upload(path, buffer, {
          contentType: resumeFile.type || 'application/pdf',
          upsert: false,
        })

      if (!uploadError && data) {
        const { data: urlData } = client.storage.from('resumes').getPublicUrl(data.path)
        resumeUrl = urlData.publicUrl
      }
    }

    // Send notification email via contact API pattern
    const adminEmail = process.env.ADMIN_EMAIL ?? 'hannah@montessorimakers.org'
    const subject = `Role Application: ${roleTitle} — ${schoolName}`
    const body = [
      `Applicant: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      ``,
      `Role: ${roleTitle}`,
      `School: ${schoolName}`,
      ``,
      message ? `Cover letter / message:\n${message}` : null,
      resumeUrl ? `\nResume: ${resumeUrl}` : null,
    ].filter(Boolean).join('\n')

    // Use the existing email infrastructure (Resend)
    const { sendEmail } = await import('@/lib/email').catch(() => ({ sendEmail: null }))
    if (sendEmail) {
      await (sendEmail as (opts: { to: string; subject: string; text: string }) => Promise<void>)({
        to: adminEmail,
        subject,
        text: body,
      }).catch(() => {})
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('apply-role error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'

const RESUME_MAX_BYTES = 10 * 1024 * 1024 // 10 MB

// Browsers (especially on Windows) often send docx as application/octet-stream
// or application/zip. Accept by extension as a fallback.
const ALLOWED_RESUME_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/octet-stream',
  'application/zip',
  'application/x-zip-compressed',
])
const ALLOWED_RESUME_EXT = new Set(['.pdf', '.doc', '.docx'])

function isAllowedResume(file: File): boolean {
  const ext = '.' + (file.name.split('.').pop() ?? '').toLowerCase()
  return ALLOWED_RESUME_MIME.has(file.type) && ALLOWED_RESUME_EXT.has(ext)
    || ALLOWED_RESUME_EXT.has(ext)
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()

    // ── Validate resume ─────────────────────────────────────────────────────────
    const resume = form.get('resume') as File | null
    if (!resume || resume.size === 0) {
      return NextResponse.json({ error: 'A resume is required.' }, { status: 400 })
    }
    if (!isAllowedResume(resume)) {
      return NextResponse.json({ error: 'Resume must be a PDF or Word document (.pdf, .doc, or .docx).' }, { status: 400 })
    }
    if (resume.size > RESUME_MAX_BYTES) {
      return NextResponse.json({ error: 'Resume must be under 10 MB.' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const id = crypto.randomUUID()

    // ── Upload resume ────────────────────────────────────────────────────────────
    const rawExt = resume.name.split('.').pop()?.toLowerCase() ?? ''
    const ext = ['pdf', 'doc', 'docx'].includes(rawExt) ? rawExt : 'pdf'
    const resumeKey = `${id}.${ext}`

    const { error: uploadErr } = await supabase.storage
      .from('interim-leader-resumes')
      .upload(resumeKey, resume, { contentType: resume.type, upsert: false })

    if (uploadErr) {
      console.error('[interim-leader-profile] upload error:', uploadErr.message)
      return NextResponse.json({ error: 'Resume upload failed. Please try again.' }, { status: 500 })
    }

    const { data: { publicUrl: resumeUrl } } = supabase.storage
      .from('interim-leader-resumes')
      .getPublicUrl(resumeKey)

    // ── Parse fields ─────────────────────────────────────────────────────────────
    const str = (key: string) => (form.get(key) as string | null) ?? null
    const arr = (key: string): string[] => {
      const v = form.get(key) as string | null
      if (!v) return []
      try { return JSON.parse(v) } catch { return [] }
    }

    const record = {
      id,
      full_name:                 str('full_name'),
      email:                     str('email'),
      phone:                     str('phone'),
      location:                  str('location'),
      current_position:          str('current_position'),
      years_in_montessori:       str('years_in_montessori'),
      credentials:               str('credentials'),
      levels_taught:             arr('levels_taught'),
      school_types:              arr('school_types'),
      resume_url:                resumeUrl,
      leadership_roles:          str('leadership_roles'),
      board_experience:          str('board_experience'),
      hard_decision:             str('hard_decision'),
      staff_management:          str('staff_management'),
      financial_responsibility:  str('financial_responsibility'),
      purpose_of_interim:        str('purpose_of_interim'),
      entering_unknown_community:str('entering_unknown_community'),
      equity_in_practice:        str('equity_in_practice'),
      least_equipped:            str('least_equipped'),
      scenario_a_level:          str('scenario_a_level'),
      scenario_a_description:    str('scenario_a_description'),
      scenario_b_level:          str('scenario_b_level'),
      scenario_b_description:    str('scenario_b_description'),
      scenario_c_level:          str('scenario_c_level'),
      scenario_c_description:    str('scenario_c_description'),
      scenario_d_level:          str('scenario_d_level'),
      scenario_d_description:    str('scenario_d_description'),
      availability:              str('availability'),
      regions:                   arr('regions'),
      engagement_length:         str('engagement_length'),
      constraints:               str('constraints'),
      compensation:              str('compensation'),
      reference_1_name:          str('reference_1_name'),
      reference_1_role:          str('reference_1_role'),
      reference_1_relationship:  str('reference_1_relationship'),
      reference_1_contact:       str('reference_1_contact'),
      reference_2_name:          str('reference_2_name'),
      reference_2_role:          str('reference_2_role'),
      reference_2_relationship:  str('reference_2_relationship'),
      reference_2_contact:       str('reference_2_contact'),
      open_field:                str('open_field'),
    }

    // ── Insert record ────────────────────────────────────────────────────────────
    const { error: dbErr } = await supabase.from('interim_leader_profiles').insert(record)
    if (dbErr) {
      console.error('[interim-leader-profile] db error:', dbErr.message)
      return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
    }

    // ── Email notification ───────────────────────────────────────────────────────
    try {
      await sendEmail({
        to: 'hannah@montessorimakers.org',
        subject: `New interim leader profile: ${record.full_name ?? 'Unknown'}`,
        html: `
          <div style="font-family:sans-serif;max-width:480px">
            <h2 style="color:#0e1a7a;margin-bottom:16px">New Interim Leader Profile</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:6px 0;color:#64748B;width:120px">Name</td><td style="padding:6px 0;font-weight:600">${record.full_name ?? '—'}</td></tr>
              <tr><td style="padding:6px 0;color:#64748B">Email</td><td style="padding:6px 0">${record.email ?? '—'}</td></tr>
              <tr><td style="padding:6px 0;color:#64748B">Location</td><td style="padding:6px 0">${record.location ?? '—'}</td></tr>
              <tr><td style="padding:6px 0;color:#64748B">Current role</td><td style="padding:6px 0">${record.current_position ?? '—'}</td></tr>
              <tr><td style="padding:6px 0;color:#64748B">Availability</td><td style="padding:6px 0">${record.availability ?? '—'}</td></tr>
            </table>
            <div style="margin-top:24px">
              <a href="https://montessorimakersgroup.org/admin/interim-leaders?id=${id}"
                 style="background:#0e1a7a;color:#d6a758;padding:12px 24px;text-decoration:none;font-weight:600;font-size:13px;display:inline-block">
                View Full Profile →
              </a>
            </div>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('[interim-leader-profile] email error:', emailErr)
    }

    return NextResponse.json({ success: true, id })
  } catch (err) {
    console.error('[interim-leader-profile] unexpected error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

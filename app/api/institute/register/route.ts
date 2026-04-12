import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      course_slug?: string
      course_title?: string
      name?: string
      email?: string
      phone?: string
      organization?: string
      role?: string
      notes?: string
      hp?: string
    }

    const { course_slug, course_title, name, email, phone, organization, role, notes, hp } = body

    if (hp) return NextResponse.json({ ok: true }) // honeypot

    if (!course_slug || !name || !email) {
      return NextResponse.json({ error: 'Course, name, and email are required.' }, { status: 400 })
    }

    const client = createServiceClient()

    // Check registration is still open
    const { data: settings } = await client
      .from('institute_course_settings')
      .select('registration_open')
      .eq('course_slug', course_slug)
      .single()

    if (!settings?.registration_open) {
      return NextResponse.json({ error: 'Registration for this course is currently closed.' }, { status: 403 })
    }

    // Save registration
    const { error: insertError } = await client.from('institute_registrations').insert({
      course_slug,
      course_title: course_title ?? '',
      name,
      email,
      phone: phone || null,
      organization: organization || null,
      role: role || null,
      notes: notes || null,
    })

    if (insertError) {
      console.error('institute/register insert error:', insertError)
      return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
    }

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL ?? 'hannah@montessorimakers.org'
    const subject = `New Institute Registration: ${course_title}`
    const text = [
      `Course: ${course_title}`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      organization ? `Organization: ${organization}` : null,
      role ? `Role: ${role}` : null,
      notes ? `\nNotes: ${notes}` : null,
    ].filter(Boolean).join('\n')

    sendEmail({ to: adminEmail, subject, text }).catch((err) => {
      console.error('institute/register: email notification failed:', err)
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('institute/register error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

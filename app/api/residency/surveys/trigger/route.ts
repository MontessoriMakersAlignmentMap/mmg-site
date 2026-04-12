import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// POST: trigger surveys for eligible residents
// Called on a schedule (e.g., daily cron) or manually by admin
export async function POST() {
  const supabase = createServiceClient()
  const now = new Date()
  const triggered: string[] = []

  // Get all active/enrolled residents with their enrollment dates
  const { data: residents } = await supabase
    .from('residency_residents')
    .select('id, status, enrolled_at, profile:residency_profiles(first_name, last_name, email)')
    .in('status', ['enrolled', 'active'])

  // Get existing survey instances to avoid duplicates
  const { data: existingInstances } = await supabase
    .from('residency_survey_instances')
    .select('resident_id, survey_type')
    .is('deleted_at', null)

  const existingSet = new Set(
    (existingInstances || []).map(i => `${i.resident_id}:${i.survey_type}`)
  )

  // Get completed residents for completion surveys
  const { data: completedResidents } = await supabase
    .from('residency_residents')
    .select('id, status, profile:residency_profiles(first_name, last_name, email)')
    .eq('status', 'completed')

  const toCreate: { resident_id: string; survey_type: string; email: string; name: string }[] = []

  // Week 2 and Week 6 triggers based on enrolled_at
  for (const r of residents || []) {
    if (!r.enrolled_at) continue
    const enrolledAt = new Date(r.enrolled_at)
    const daysSinceEnrollment = Math.floor((now.getTime() - enrolledAt.getTime()) / (1000 * 60 * 60 * 24))
    const profile = r.profile as any
    if (!profile?.email) continue

    // Week 2: trigger at 14+ days
    if (daysSinceEnrollment >= 14 && !existingSet.has(`${r.id}:week_2`)) {
      toCreate.push({ resident_id: r.id, survey_type: 'week_2', email: profile.email, name: profile.first_name })
    }

    // Week 6: trigger at 42+ days
    if (daysSinceEnrollment >= 42 && !existingSet.has(`${r.id}:week_6`)) {
      toCreate.push({ resident_id: r.id, survey_type: 'week_6', email: profile.email, name: profile.first_name })
    }
  }

  // Completion survey: trigger when status is 'completed'
  for (const r of completedResidents || []) {
    const profile = r.profile as any
    if (!profile?.email) continue
    if (!existingSet.has(`${r.id}:completion`)) {
      toCreate.push({ resident_id: r.id, survey_type: 'completion', email: profile.email, name: profile.first_name })
    }
  }

  // Create instances and send notification emails
  for (const item of toCreate) {
    const { error } = await supabase.from('residency_survey_instances').insert({
      resident_id: item.resident_id,
      survey_type: item.survey_type,
    })

    if (!error) {
      triggered.push(`${item.resident_id}:${item.survey_type}`)

      const surveyLabel = item.survey_type === 'week_2' ? 'Week 2 Check-In'
        : item.survey_type === 'week_6' ? 'Week 6 Midpoint Survey'
        : 'Completion Survey'

      try {
        await resend.emails.send({
          from: 'Montessori Makers Residency <residency@montessorimakersgroup.org>',
          to: item.email,
          subject: `Your ${surveyLabel} is ready`,
          html: `
            <p>Hi ${item.name},</p>
            <p>Your <strong>${surveyLabel}</strong> is now available. We value your feedback — it helps us continuously improve the residency experience.</p>
            <p>Please log in to your resident portal to complete the survey. It should take about 5-10 minutes.</p>
            <p>Thank you,<br/>Montessori Makers Residency</p>
          `,
        })
      } catch (e) {
        // Email failure shouldn't block survey creation
      }
    }
  }

  return NextResponse.json({ triggered: triggered.length, details: triggered })
}

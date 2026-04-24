import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Basic presence check on required fields
    const required = [
      'school_name', 'contact_name', 'contact_email',
      'job_title', 'level', 'location', 'credential',
      'compensation', 'employment_type', 'school_type',
      'school_description', 'job_summary',
    ]
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const id = crypto.randomUUID()
    const supabase = createServiceClient()

    const { error } = await supabase
      .from('jobs')
      .insert({
        id,
        school_name:        data.school_name,
        contact_name:       data.contact_name,
        contact_email:      data.contact_email,
        job_title:          data.job_title,
        level:              data.level,
        location:           data.location,
        start_date:         data.start_date ?? null,
        credential:         data.credential,
        compensation:       data.compensation,
        employment_type:    data.employment_type,
        school_type:        data.school_type,
        school_description: data.school_description,
        job_summary:        data.job_summary,
        application_link:   data.application_link ?? '',
        plan_type:          data.plan_type ?? 'single',
        source:             data.source ?? 'MatchHub job post',
        status:             'pending',
        payment_status:     'unpaid',
      })

    if (error) {
      console.error('[submit-job] db error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ id })
  } catch (err) {
    console.error('[submit-job] unexpected error:', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}

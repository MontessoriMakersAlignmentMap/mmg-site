import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// GET: fetch responses for a survey instance or all responses for admin
export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)
  const instanceId = searchParams.get('instance_id')
  const surveyType = searchParams.get('type')

  if (instanceId) {
    const { data, error } = await supabase
      .from('residency_survey_responses')
      .select('*')
      .eq('survey_instance_id', instanceId)
      .order('question_key')

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  // Admin: get all responses for a survey type (with instance + resident info)
  if (surveyType) {
    const { data: instances } = await supabase
      .from('residency_survey_instances')
      .select('id, resident_id, survey_type, triggered_at, completed_at, resident:residency_residents(profile:residency_profiles(first_name, last_name), cohort:residency_cohorts(name, track))')
      .eq('survey_type', surveyType)
      .is('deleted_at', null)
      .order('triggered_at', { ascending: false })

    const instanceIds = (instances || []).filter(i => i.completed_at).map(i => i.id)

    let responses: any[] = []
    if (instanceIds.length > 0) {
      const { data } = await supabase
        .from('residency_survey_responses')
        .select('*')
        .in('survey_instance_id', instanceIds)

      responses = data || []
    }

    return NextResponse.json({ instances: instances || [], responses })
  }

  return NextResponse.json({ error: 'Provide instance_id or type' }, { status: 400 })
}

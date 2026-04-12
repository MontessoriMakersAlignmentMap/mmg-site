import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { surveyQuestions } from '@/lib/residency/survey-questions'

// GET: list survey instances (optionally filtered by resident or type)
export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)
  const residentId = searchParams.get('resident_id')
  const surveyType = searchParams.get('type')

  let query = supabase
    .from('residency_survey_instances')
    .select('*, resident:residency_residents(id, profile:residency_profiles(first_name, last_name), cohort:residency_cohorts(name, track))')
    .is('deleted_at', null)
    .order('triggered_at', { ascending: false })

  if (residentId) query = query.eq('resident_id', residentId)
  if (surveyType) query = query.eq('survey_type', surveyType)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST: submit survey responses
export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()
  const { survey_instance_id, responses } = body

  if (!survey_instance_id || !responses || !Array.isArray(responses)) {
    return NextResponse.json({ error: 'Missing survey_instance_id or responses' }, { status: 400 })
  }

  // Verify instance exists and is not already completed
  const { data: instance } = await supabase
    .from('residency_survey_instances')
    .select('id, completed_at, survey_type')
    .eq('id', survey_instance_id)
    .single()

  if (!instance) return NextResponse.json({ error: 'Survey not found' }, { status: 404 })
  if (instance.completed_at) return NextResponse.json({ error: 'Survey already completed' }, { status: 400 })

  // Validate responses against question definitions
  const questions = surveyQuestions[instance.survey_type as keyof typeof surveyQuestions]
  const questionMap = new Map(questions.map(q => [q.key, q]))

  const inserts = responses.map((r: any) => {
    const q = questionMap.get(r.question_key)
    if (!q) return null
    return {
      survey_instance_id,
      question_key: r.question_key,
      question_text: q.text,
      response_type: q.type,
      response_text: q.type === 'text' ? r.value : null,
      response_scale: q.type === 'scale' ? Number(r.value) : null,
    }
  }).filter(Boolean)

  const { error: insertError } = await supabase
    .from('residency_survey_responses')
    .insert(inserts)

  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 })

  // Mark instance as completed
  await supabase
    .from('residency_survey_instances')
    .update({ completed_at: new Date().toISOString() })
    .eq('id', survey_instance_id)

  return NextResponse.json({ success: true })
}

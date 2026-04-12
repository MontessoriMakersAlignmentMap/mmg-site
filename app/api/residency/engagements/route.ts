import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const ENGAGEMENT_THRESHOLD_SECONDS = 180 // 3 minutes

/**
 * POST: Log time spent on a lesson. Called periodically from the client.
 * Body: { resident_id, lesson_id, bundle_id?, seconds_to_add }
 */
export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()
  const { resident_id, lesson_id, bundle_id, seconds_to_add } = body

  if (!resident_id || !lesson_id || !seconds_to_add) {
    return NextResponse.json({ error: 'resident_id, lesson_id, and seconds_to_add required' }, { status: 400 })
  }

  // Upsert lesson engagement
  const { data: existing } = await supabase
    .from('residency_lesson_engagements')
    .select('id, total_seconds, engaged')
    .eq('resident_id', resident_id)
    .eq('lesson_id', lesson_id)
    .maybeSingle()

  const newTotal = (existing?.total_seconds || 0) + seconds_to_add
  const nowEngaged = newTotal >= ENGAGEMENT_THRESHOLD_SECONDS

  if (existing) {
    const { error } = await supabase
      .from('residency_lesson_engagements')
      .update({
        total_seconds: newTotal,
        engaged: nowEngaged,
        last_activity_at: new Date().toISOString(),
        ...(bundle_id && !existing.engaged ? { bundle_id } : {}),
      })
      .eq('id', existing.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  } else {
    const { error } = await supabase
      .from('residency_lesson_engagements')
      .insert({
        resident_id,
        lesson_id,
        bundle_id,
        total_seconds: seconds_to_add,
        engaged: seconds_to_add >= ENGAGEMENT_THRESHOLD_SECONDS,
      })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // If now engaged and we have a bundle_id, update bundle engagement
  if (nowEngaged && bundle_id) {
    await updateBundleEngagement(supabase, resident_id, bundle_id, lesson_id)
  }

  return NextResponse.json({ total_seconds: newTotal, engaged: nowEngaged })
}

async function updateBundleEngagement(
  supabase: ReturnType<typeof createServiceClient>,
  residentId: string,
  bundleId: string,
  lessonId: string
) {
  // Get or create bundle engagement record
  const { data: be } = await supabase
    .from('residency_bundle_engagements')
    .select('id, lessons_engaged')
    .eq('resident_id', residentId)
    .eq('bundle_id', bundleId)
    .maybeSingle()

  const currentLessons: string[] = be?.lessons_engaged || []
  if (currentLessons.includes(lessonId)) return

  const updatedLessons = [...currentLessons, lessonId]

  // Check total lessons in this bundle
  const { count } = await supabase
    .from('residency_bundle_lessons')
    .select('id', { count: 'exact', head: true })
    .eq('bundle_id', bundleId)

  const totalLessons = count || 0
  const isComplete = updatedLessons.length >= totalLessons

  if (be) {
    const { error } = await supabase
      .from('residency_bundle_engagements')
      .update({
        lessons_engaged: updatedLessons,
        completion_status: isComplete ? 'complete' : 'in_progress',
        completed_at: isComplete ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', be.id)
    if (error) console.error('Bundle engagement update failed:', error.message)
  } else {
    const { error } = await supabase
      .from('residency_bundle_engagements')
      .insert({
        resident_id: residentId,
        bundle_id: bundleId,
        lessons_engaged: updatedLessons,
        completion_status: isComplete ? 'complete' : 'in_progress',
        completed_at: isComplete ? new Date().toISOString() : null,
      })
    if (error) console.error('Bundle engagement insert failed:', error.message)
  }
}

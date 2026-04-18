import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('residency_bundles')
    .select(`
      *,
      bundle_lessons:residency_bundle_lessons(
        id, sequence_order,
        lesson:residency_lessons(id, title, slug, sort_order, strand:residency_strands(name))
      ),
      cohort:residency_cohorts(id, name, track)
    `)
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createServiceClient()
  const body = await req.json()

  const allowedFields = [
    'status', 'unlock_date', 'lock_date', 'weekly_theme',
    'practicum_focus', 'album_prompt', 'album_submission_required',
    'live_session_week', 'live_session_discussion_theme',
    'deck_url',
  ]

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
  for (const f of allowedFields) {
    if (body[f] !== undefined) updates[f] = body[f]
  }

  // If shifting this bundle's unlock date, optionally shift all subsequent bundles
  if (body.unlock_date && body.shift_subsequent) {
    const { data: bundle } = await supabase
      .from('residency_bundles')
      .select('cohort_id, bundle_number, unlock_date')
      .eq('id', id)
      .single()

    if (bundle) {
      const oldDate = new Date(bundle.unlock_date)
      const newDate = new Date(body.unlock_date)
      const diffDays = Math.round((newDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays !== 0) {
        // Get all subsequent bundles
        const { data: subsequent } = await supabase
          .from('residency_bundles')
          .select('id, unlock_date, lock_date')
          .eq('cohort_id', bundle.cohort_id)
          .gt('bundle_number', bundle.bundle_number)
          .order('bundle_number')

        for (const sub of subsequent || []) {
          const subUnlock = new Date(sub.unlock_date)
          subUnlock.setDate(subUnlock.getDate() + diffDays)
          const subLock = sub.lock_date ? new Date(sub.lock_date) : null
          if (subLock) subLock.setDate(subLock.getDate() + diffDays)

          await supabase
            .from('residency_bundles')
            .update({
              unlock_date: subUnlock.toISOString().split('T')[0],
              lock_date: subLock ? subLock.toISOString().split('T')[0] : null,
              updated_at: new Date().toISOString(),
            })
            .eq('id', sub.id)
        }
      }
    }
  }

  const { data, error } = await supabase
    .from('residency_bundles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

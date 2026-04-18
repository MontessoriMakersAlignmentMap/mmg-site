import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { PRIMARY_SEQUENCE, ELEMENTARY_SEQUENCE, parseLessonCodes } from '@/lib/residency/curriculum-sequence'
import { getDeckUrl } from '@/lib/residency/deck-mapping'

export async function GET() {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('residency_cohorts')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()
  const { name, track, start_date } = body

  if (!name || !track || !start_date) {
    return NextResponse.json({ error: 'name, track, and start_date are required' }, { status: 400 })
  }

  // Create cohort
  const { data: cohort, error: cohortErr } = await supabase
    .from('residency_cohorts')
    .insert({ name, track, start_date, status: 'draft' })
    .select()
    .single()

  if (cohortErr) return NextResponse.json({ error: cohortErr.message }, { status: 500 })

  // Get the sequence for this track
  const sequence = track === 'primary' ? PRIMARY_SEQUENCE : ELEMENTARY_SEQUENCE

  // Load lessons for this level
  const levelName = track === 'primary' ? 'Primary' : 'Elementary'
  const { data: level } = await supabase
    .from('residency_levels')
    .select('id')
    .eq('name', levelName)
    .single()

  if (!level) return NextResponse.json({ error: `Level ${levelName} not found` }, { status: 500 })

  // Load all strands for this level
  const { data: strands } = await supabase
    .from('residency_strands')
    .select('id, name')
    .eq('level_id', level.id)

  const strandMap: Record<string, string> = {}
  for (const s of strands || []) {
    strandMap[s.name.toLowerCase()] = s.id
  }

  // Load all lessons for this level (we need id, sort_order, strand_id)
  const { data: lessons } = await supabase
    .from('residency_lessons')
    .select('id, sort_order, strand_id')
    .eq('level_id', level.id)

  // Build lesson lookup: (strand_id, sort_order) -> lesson_id
  const lessonLookup: Record<string, string> = {}
  for (const l of lessons || []) {
    lessonLookup[`${l.strand_id}:${l.sort_order}`] = l.id
  }

  // Adjust start date to nearest Sunday on or after the given date
  const startDate = new Date(start_date)
  const dayOfWeek = startDate.getUTCDay()
  const adjustedStart = new Date(startDate)
  if (dayOfWeek !== 0) {
    adjustedStart.setDate(startDate.getDate() + (7 - dayOfWeek))
  }
  const startAdjusted = dayOfWeek !== 0

  // Update cohort record with adjusted start date if needed
  if (startAdjusted) {
    await supabase
      .from('residency_cohorts')
      .update({ start_date: adjustedStart.toISOString().split('T')[0] })
      .eq('id', cohort.id)
  }

  const bundles = []
  const bundleLessons: { bundle_index: number; lesson_id: string; seq: number }[] = []

  for (let i = 0; i < sequence.length; i++) {
    const tmpl = sequence[i]
    // Each bundle unlocks on Sunday
    const unlockDate = new Date(adjustedStart)
    unlockDate.setDate(adjustedStart.getDate() + (tmpl.week - 1) * 7)
    // Lock date is Saturday (6 days after Sunday)
    const lockDate = new Date(unlockDate)
    lockDate.setDate(unlockDate.getDate() + 6)

    bundles.push({
      cohort_id: cohort.id,
      bundle_number: tmpl.week,
      week_number: tmpl.week,
      month: tmpl.month,
      weekly_theme: tmpl.theme,
      strands_included: tmpl.strands,
      practicum_focus: tmpl.practicumFocus,
      album_submission_required: tmpl.albumDue,
      album_prompt: tmpl.albumDue
        ? `Reflect on this week's theme "${tmpl.theme}" and connect what you read to what you observed or practiced in your practicum placement. How does ${tmpl.strands.toLowerCase()} work show up in the children you are observing?`
        : null,
      live_session_week: tmpl.liveSession,
      live_session_discussion_theme: tmpl.discussionTheme,
      unlock_date: unlockDate.toISOString().split('T')[0],
      lock_date: lockDate.toISOString().split('T')[0],
      status: 'scheduled',
      deck_url: getDeckUrl(track, tmpl.week),
    })

    // Parse lesson codes and resolve to lesson IDs
    const parsed = parseLessonCodes(tmpl.lessonCodes, track)
    let seq = 0
    for (const { strandName, lessonNumber } of parsed) {
      const strandId = strandMap[strandName.toLowerCase()]
      if (!strandId) continue
      const lessonId = lessonLookup[`${strandId}:${lessonNumber}`]
      if (lessonId) {
        bundleLessons.push({ bundle_index: i, lesson_id: lessonId, seq: seq++ })
      }
    }
  }

  // Insert all bundles
  const { data: insertedBundles, error: bundleErr } = await supabase
    .from('residency_bundles')
    .insert(bundles)
    .select('id')

  if (bundleErr) {
    return NextResponse.json({ error: bundleErr.message }, { status: 500 })
  }

  // Insert bundle-lesson links
  const links = bundleLessons.map(bl => ({
    bundle_id: insertedBundles[bl.bundle_index].id,
    lesson_id: bl.lesson_id,
    sequence_order: bl.seq,
  }))

  if (links.length > 0) {
    const { error: linkErr } = await supabase
      .from('residency_bundle_lessons')
      .insert(links)

    if (linkErr) {
      return NextResponse.json({ error: linkErr.message }, { status: 500 })
    }
  }

  return NextResponse.json({
    cohort,
    bundles_created: insertedBundles.length,
    lessons_linked: links.length,
    start_adjusted: startAdjusted,
    adjusted_start_date: adjustedStart.toISOString().split('T')[0],
  })
}

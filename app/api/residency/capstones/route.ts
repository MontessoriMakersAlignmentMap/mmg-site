import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const { resident_id, video_url, reflection, lesson_title, lesson_strand, age_group } = body
  if (!resident_id || !video_url || !reflection) {
    return NextResponse.json({ error: 'resident_id, video_url, and reflection are required' }, { status: 400 })
  }

  const { data, error } = await supabase.from('residency_capstones').insert({
    resident_id,
    video_url,
    reflection,
    lesson_title: lesson_title || null,
    lesson_strand: lesson_strand || null,
    age_group: age_group || null,
    status: 'submitted',
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const residentId = req.nextUrl.searchParams.get('resident_id')

  let query = supabase
    .from('residency_capstones')
    .select('*, reviews:residency_capstone_reviews(*, reviewer:residency_profiles(first_name, last_name, role))')
    .is('deleted_at', null)
    .order('submitted_at', { ascending: false })

  if (residentId) {
    query = query.eq('resident_id', residentId)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  if (body.action === 'review') {
    const { capstone_id, reviewer_id, reviewer_role, verdict, strengths, growth_areas, practicum_connection, revision_notes } = body
    if (!capstone_id || !reviewer_id || !verdict) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 })
    }

    // Insert review
    const { error: reviewError } = await supabase.from('residency_capstone_reviews').insert({
      capstone_id,
      reviewer_id,
      reviewer_role,
      verdict,
      strengths: strengths || null,
      growth_areas: growth_areas || null,
      practicum_connection: practicum_connection || null,
      revision_notes: revision_notes || null,
    })

    if (reviewError) return NextResponse.json({ error: reviewError.message }, { status: 500 })

    // Check if both mentor and instructor have approved
    const { data: allReviews } = await supabase
      .from('residency_capstone_reviews')
      .select('reviewer_role, verdict')
      .eq('capstone_id', capstone_id)
      .order('reviewed_at', { ascending: false })

    const latestByRole: Record<string, string> = {}
    for (const r of allReviews || []) {
      if (!latestByRole[r.reviewer_role]) {
        latestByRole[r.reviewer_role] = r.verdict
      }
    }

    let newStatus = 'in_review'
    if (verdict === 'revision_needed') {
      newStatus = 'revision_requested'
    } else if (latestByRole['mentor'] === 'approved' && latestByRole['instructor'] === 'approved') {
      newStatus = 'approved'
    }

    await supabase.from('residency_capstones').update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    }).eq('id', capstone_id)

    return NextResponse.json({ success: true, newStatus })
  }

  if (body.action === 'resubmit') {
    const { capstone_id, video_url, reflection } = body
    if (!capstone_id) return NextResponse.json({ error: 'capstone_id required' }, { status: 400 })

    const updates: any = { status: 'submitted', updated_at: new Date().toISOString() }
    if (video_url) updates.video_url = video_url
    if (reflection) updates.reflection = reflection

    await supabase.from('residency_capstones').update(updates).eq('id', capstone_id)
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}

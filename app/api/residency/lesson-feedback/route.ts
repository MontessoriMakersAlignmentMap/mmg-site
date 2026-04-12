import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const { lesson_id, resident_id, flag_type, notes } = await req.json()

  if (!lesson_id || !resident_id || !flag_type) {
    return NextResponse.json({ error: 'lesson_id, resident_id, and flag_type required' }, { status: 400 })
  }

  const { error } = await supabase.from('residency_lesson_feedback').insert({
    lesson_id, resident_id, flag_type, notes: notes || null,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function GET() {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('residency_lesson_feedback')
    .select('*, lesson:residency_lessons(title), resident:residency_residents(profile:residency_profiles(first_name, last_name))')
    .is('deleted_at', null)
    .order('submitted_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const supabase = createServiceClient()
  const { id, status, admin_notes } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const updates: any = {}
  if (status) updates.status = status
  if (admin_notes !== undefined) updates.admin_notes = admin_notes
  if (status === 'reviewed') updates.reviewed_at = new Date().toISOString()
  if (status === 'resolved') updates.resolved_at = new Date().toISOString()

  await supabase.from('residency_lesson_feedback').update(updates).eq('id', id)
  return NextResponse.json({ success: true })
}

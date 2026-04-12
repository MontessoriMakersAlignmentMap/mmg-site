import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const { resident_id, lesson_id, video_url, watch_duration_seconds } = await req.json()

  if (!resident_id || !lesson_id || !video_url) {
    return NextResponse.json({ error: 'resident_id, lesson_id, and video_url required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('residency_lesson_video_engagements')
    .insert({
      resident_id,
      lesson_id,
      video_url,
      watch_duration_seconds: watch_duration_seconds || 0,
    })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ id: data.id })
}

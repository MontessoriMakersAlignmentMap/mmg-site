import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Runs every Sunday at noon UTC via Vercel cron.
// Closes registration for any course whose start date falls within the next 7 days.
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = createServiceClient()

  const today = new Date()
  const weekFromNow = new Date(today)
  weekFromNow.setDate(weekFromNow.getDate() + 7)

  const todayStr = today.toISOString().slice(0, 10)
  const weekStr = weekFromNow.toISOString().slice(0, 10)

  const { data, error } = await client
    .from('institute_course_settings')
    .update({ registration_open: false, updated_at: new Date().toISOString() })
    .gte('course_date', todayStr)
    .lte('course_date', weekStr)
    .eq('registration_open', true)
    .select('course_slug, course_title')

  if (error) {
    console.error('[cron] close-institute-registration error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const closed = data?.map((r) => r.course_slug) ?? []
  console.log('[cron] closed registration for:', closed)
  return NextResponse.json({ closed })
}

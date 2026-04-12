import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const ADMIN_EMAIL = 'hannah@montessorimakers.org'

function isAuthorized(req: NextRequest) {
  const pw = req.headers.get('x-admin-key')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

// GET all course settings (public — needed by course pages)
export async function GET() {
  const client = createServiceClient()
  const { data, error } = await client
    .from('institute_course_settings')
    .select('course_slug, course_title, registration_open, updated_at')
    .order('course_slug')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ settings: data })
}

// POST toggle registration open/closed (admin only)
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { course_slug, registration_open } = await req.json() as {
    course_slug: string
    registration_open: boolean
  }

  if (!course_slug || typeof registration_open !== 'boolean') {
    return NextResponse.json({ error: 'course_slug and registration_open required' }, { status: 400 })
  }

  const client = createServiceClient()
  const { error } = await client
    .from('institute_course_settings')
    .update({ registration_open, updated_at: new Date().toISOString() })
    .eq('course_slug', course_slug)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

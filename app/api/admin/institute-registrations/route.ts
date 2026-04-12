import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(req: NextRequest): boolean {
  const pw = req.headers.get('x-admin-pw')
  const email = req.headers.get('x-admin-email')
  return !!pw && pw === process.env.ADMIN_PASSWORD && email === 'hannah@montessorimakers.org'
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = createServiceClient()
  const { data, error } = await client
    .from('institute_registrations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ registrations: data })
}

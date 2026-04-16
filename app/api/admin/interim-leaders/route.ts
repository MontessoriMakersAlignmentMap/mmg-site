import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password')
  return pw === process.env.ADMIN_PASSWORD
}

// GET /api/admin/interim-leaders — list all profiles
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('interim_leader_profiles')
    .select('*')
    .order('submitted_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ profiles: data ?? [] })
}

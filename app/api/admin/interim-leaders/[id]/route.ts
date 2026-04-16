import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password')
  return pw === process.env.ADMIN_PASSWORD
}

// PATCH /api/admin/interim-leaders/[id] — update status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const { status } = body
  const VALID = new Set(['new', 'in_review', 'active', 'placed', 'not_a_fit'])
  if (!VALID.has(status)) {
    return NextResponse.json({ error: 'Invalid status.' }, { status: 400 })
  }
  const supabase = createServiceClient()
  const { error } = await supabase
    .from('interim_leader_profiles')
    .update({ status })
    .eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

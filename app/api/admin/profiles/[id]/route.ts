import { NextRequest, NextResponse } from 'next/server'
import { updateProfileStatus } from '@/lib/db/profiles'

function checkAuth(req: NextRequest): boolean {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await context.params
  const { action } = await req.json() as { action: 'approve' | 'reject' }
  if (!['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }
  const status = action === 'approve' ? 'approved' : 'rejected'
  const { error } = await updateProfileStatus(id, status)
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ ok: true })
}

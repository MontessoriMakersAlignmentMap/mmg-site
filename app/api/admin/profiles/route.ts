import { NextRequest, NextResponse } from 'next/server'
import { getAllProfilesAdmin } from '@/lib/db/profiles'

function checkAuth(req: NextRequest): boolean {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const profiles = await getAllProfilesAdmin()
  return NextResponse.json(profiles)
}

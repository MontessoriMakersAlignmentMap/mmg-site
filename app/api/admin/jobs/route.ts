import { NextRequest, NextResponse } from 'next/server'
import { getAllJobsAdmin } from '@/lib/db/jobs'

function checkAuth(req: NextRequest): boolean {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const jobs = await getAllJobsAdmin()
  return NextResponse.json(jobs)
}

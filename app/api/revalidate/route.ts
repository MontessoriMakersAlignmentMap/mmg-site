import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const SECRET = process.env.REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  const { secret, path } = await req.json().catch(() => ({}))

  if (SECRET && secret !== SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const target = path ?? '/matchhub/open-roles'
  revalidatePath(target)

  return NextResponse.json({ revalidated: true, path: target })
}

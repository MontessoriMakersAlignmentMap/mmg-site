import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('careers_admin', process.env.ADMIN_PASSWORD!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('careers_admin')
  return NextResponse.json({ ok: true })
}

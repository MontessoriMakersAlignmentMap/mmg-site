import { NextRequest, NextResponse } from 'next/server'
import { sendNewProfileNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name?: string
      email?: string
      roleType?: string | null
      location?: string
      yearsExperience?: number
      credential?: string
    }

    const { name, email, roleType, location, yearsExperience, credential } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    await sendNewProfileNotification({
      name,
      email,
      roleType:        roleType ?? null,
      location:        location ?? '',
      yearsExperience: yearsExperience ?? 0,
      credential:      credential ?? '',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[notify-new-profile] error:', err)
    // Don't surface errors to the client — profile was already saved
    return NextResponse.json({ ok: true })
  }
}

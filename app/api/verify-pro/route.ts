import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let email: string
  try {
    const body = await req.json()
    email = (body.email ?? '').trim().toLowerCase()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const db = createServiceClient()
  const { data, error } = await db
    .from('matchhub_pro_subscriptions')
    .select('active')
    .eq('email', email)
    .eq('active', true)
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('verify-pro: supabase error', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }

  return NextResponse.json({ isPro: !!data })
}

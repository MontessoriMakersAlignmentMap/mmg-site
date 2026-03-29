import { NextResponse } from 'next/server'
import { getActiveTalentProfiles } from '@/lib/db/talent-pool'

export async function GET() {
  return NextResponse.json(await getActiveTalentProfiles())
}

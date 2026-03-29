import { NextResponse } from 'next/server'
import { getPublishedPartners } from '@/lib/db/partners'

export async function GET() {
  return NextResponse.json(await getPublishedPartners())
}

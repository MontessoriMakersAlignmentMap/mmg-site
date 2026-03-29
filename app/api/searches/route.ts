import { NextResponse } from 'next/server'
import { getActiveSearches } from '@/lib/db/searches'

export async function GET() {
  return NextResponse.json(await getActiveSearches())
}

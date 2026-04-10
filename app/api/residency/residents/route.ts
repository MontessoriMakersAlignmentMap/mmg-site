import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)
  const mentorId = searchParams.get('mentor_id')

  let query = supabase
    .from('residency_residents')
    .select('*, profile:residency_profiles(*), mentor:residency_profiles!residency_residents_mentor_id_fkey(first_name, last_name)')
    .order('created_at', { ascending: false })

  if (mentorId) query = query.eq('mentor_id', mentorId)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

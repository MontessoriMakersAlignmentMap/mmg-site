import { createServiceClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...fields } = body

    if (!id) return NextResponse.json({ error: 'Missing search id' }, { status: 400 })

    const update: Record<string, unknown> = {}
    const allowed = [
      'levels_required',
      'role_type_required',
      'credential_required',
      'years_experience_min',
      'location_city',
      'location_state',
      'location_flexible',
      'languages_required',
    ]
    for (const key of allowed) {
      if (key in fields) {
        update[key] = fields[key] === '' ? null : fields[key]
      }
    }

    const client = createServiceClient()
    const { error } = await client.from('crm_searches').update(update).eq('id', id)

    if (error) {
      console.error('update-search-criteria:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('update-search-criteria exception:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

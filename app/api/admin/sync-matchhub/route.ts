import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

function checkAuth(req: NextRequest) {
  const pw = req.headers.get('x-admin-password')
  return !!pw && pw === process.env.ADMIN_PASSWORD
}

function mapLevel(level: string): string | null {
  if (level.startsWith('Infant/Toddler'))   return 'Infant/Toddler'
  if (level.startsWith('Primary'))          return 'Primary'
  if (level.startsWith('Lower Elementary')) return 'Lower Elementary'
  if (level.startsWith('Upper Elementary')) return 'Upper Elementary'
  if (level.startsWith('Adolescent'))       return 'Middle School'
  return null
}

function parseLocation(location: string): { city: string | null; state: string | null } {
  const parts = location.split(',')
  return {
    city:  parts[0]?.trim() || null,
    state: parts[1]?.trim() || null,
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()

  // Fetch all MatchHub profiles with open_to_placement = true
  const { data: profiles, error: fetchError } = await supabase
    .from('guide_profiles')
    .select('*')
    .eq('open_to_placement', true)

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 })
  }

  if (!profiles || profiles.length === 0) {
    return NextResponse.json({ inserted: 0, updated: 0, total: 0 })
  }

  // Fetch existing CRM candidates by email for dedup
  const emails = profiles.map(p => p.email).filter(Boolean)
  const { data: existing } = await supabase
    .from('crm_candidates')
    .select('id, email')
    .in('email', emails)

  const existingByEmail = new Map((existing ?? []).map(r => [r.email, r.id]))

  let inserted = 0
  let updated  = 0

  for (const profile of profiles) {
    const fullName = profile.first_name + (profile.last_initial ? ` ${profile.last_initial}.` : '')
    const { city, state } = parseLocation(profile.location ?? '')
    const crmLevels = (profile.levels ?? []).map(mapLevel).filter(Boolean) as string[]
    const matchhubUrl = 'https://montessorimakersgroup.org/matchhub/talent'

    const existingId = existingByEmail.get(profile.email)

    if (existingId) {
      await supabase
        .from('crm_candidates')
        .update({
          actively_looking:    true,
          source:              'MatchHub',
          matchhub_profile_url: matchhubUrl,
          matchhub_synced_at:  new Date().toISOString(),
        })
        .eq('id', existingId)
      updated++
    } else {
      await supabase
        .from('crm_candidates')
        .insert({
          full_name:           fullName,
          email:               profile.email,
          location_city:       city,
          location_state:      state,
          credential:          profile.credential === 'Other' ? 'None' : profile.credential,
          levels_certified:    crmLevels.length > 0 ? crmLevels : null,
          years_experience:    profile.years_experience,
          actively_looking:    true,
          source:              'MatchHub',
          notes:               profile.summary,
          matchhub_profile_url: matchhubUrl,
          matchhub_synced_at:  new Date().toISOString(),
        })
      inserted++
    }
  }

  return NextResponse.json({ inserted, updated, total: inserted + updated })
}

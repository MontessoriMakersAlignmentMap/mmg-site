import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const residentId = req.nextUrl.searchParams.get('resident_id')

  if (!residentId) {
    return NextResponse.json({ error: 'resident_id required' }, { status: 400 })
  }

  // Load resident with cohort and level
  const { data: resident } = await supabase
    .from('residency_residents')
    .select('*, cohort:residency_cohorts(id, name, track), profile:residency_profiles(first_name, last_name, email)')
    .eq('id', residentId)
    .single()

  if (!resident) return NextResponse.json({ error: 'Resident not found' }, { status: 404 })

  const track = (resident.cohort as any)?.track || 'primary'
  const requiredHours = 540
  const requiredObservations = 6

  // 1. Bundle completion: check how many bundles they've engaged with
  const { count: bundleCount } = await supabase
    .from('residency_bundle_engagements')
    .select('*', { count: 'exact', head: true })
    .eq('resident_id', residentId)

  // Total bundles for their cohort
  const cohortId = (resident.cohort as any)?.id
  const { count: totalBundles } = cohortId ? await supabase
    .from('residency_bundles')
    .select('*', { count: 'exact', head: true })
    .eq('cohort_id', cohortId) : { count: 0 }

  // 2. Album entries: completed count
  const { count: albumsComplete } = await supabase
    .from('residency_album_entries')
    .select('*', { count: 'exact', head: true })
    .eq('resident_id', residentId)
    .eq('status', 'complete')

  // Total album entries needed (lessons in their level)
  const { count: totalLessons } = await supabase
    .from('residency_lessons')
    .select('*', { count: 'exact', head: true })
    .eq('level_id', resident.assigned_level_id)
    .eq('published', true)

  // 3. Practicum hours
  const { data: practicumLogs } = await supabase
    .from('residency_practicum_logs')
    .select('hours_teaching, hours_observation')
    .eq('resident_id', residentId)
    .is('deleted_at', null)

  const totalHours = (practicumLogs || []).reduce(
    (sum, l) => sum + (Number(l.hours_teaching) || 0) + (Number(l.hours_observation) || 0),
    0
  )

  // 4. Observations
  const { count: observationCount } = await supabase
    .from('residency_observation_forms')
    .select('*', { count: 'exact', head: true })
    .eq('resident_id', residentId)
    .is('deleted_at', null)

  // 5. Capstone
  const { data: capstone } = await supabase
    .from('residency_capstones')
    .select('id, status')
    .eq('resident_id', residentId)
    .is('deleted_at', null)
    .order('submitted_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const capstoneComplete = capstone?.status === 'approved'

  // 6. Handbook acknowledgment
  const { data: handbook } = await supabase
    .from('residency_handbook_acks')
    .select('id')
    .eq('resident_id', residentId)
    .limit(1)
    .maybeSingle()

  const handbookAcknowledged = !!handbook

  // 7. Check if already graduated
  const { data: graduate } = await supabase
    .from('residency_graduates')
    .select('id, completed_at, certificate_number')
    .eq('resident_id', residentId)
    .is('deleted_at', null)
    .maybeSingle()

  const requirements = {
    bundles: {
      label: 'Bundle Completion',
      current: bundleCount || 0,
      required: totalBundles || 0,
      met: (bundleCount || 0) >= (totalBundles || 1),
    },
    albums: {
      label: 'Album Entries',
      current: albumsComplete || 0,
      required: totalLessons || 0,
      met: (albumsComplete || 0) >= (totalLessons || 1),
    },
    practicum: {
      label: 'Practicum Hours',
      current: Math.round(totalHours),
      required: requiredHours,
      met: totalHours >= requiredHours,
    },
    observations: {
      label: 'Classroom Observations',
      current: observationCount || 0,
      required: requiredObservations,
      met: (observationCount || 0) >= requiredObservations,
    },
    capstone: {
      label: 'Capstone Project',
      current: capstoneComplete ? 1 : 0,
      required: 1,
      met: capstoneComplete,
      status: capstone?.status || 'not_submitted',
    },
    handbook: {
      label: 'Handbook Acknowledgment',
      current: handbookAcknowledged ? 1 : 0,
      required: 1,
      met: handbookAcknowledged,
    },
  }

  const allMet = Object.values(requirements).every(r => r.met)

  return NextResponse.json({
    resident: {
      id: resident.id,
      name: `${(resident.profile as any)?.first_name} ${(resident.profile as any)?.last_name}`,
      track,
      cohort: (resident.cohort as any)?.name,
    },
    requirements,
    eligible: allMet,
    graduated: !!graduate,
    graduate,
  })
}

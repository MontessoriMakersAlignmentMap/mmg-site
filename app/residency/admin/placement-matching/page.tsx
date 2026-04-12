'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function PlacementMatchingPage() {
  const [unplaced, setUnplaced] = useState<any[]>([])
  const [mentors, setMentors] = useState<any[]>([])
  const [schools, setSchools] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const [selectedMentor, setSelectedMentor] = useState('')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [placing, setPlacing] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    // Unplaced residents: accepted but no placement
    const { data: allResidents } = await supabase
      .from('residency_residents')
      .select('id, status, mentor_id, placement_site_id, profile:residency_profiles(first_name, last_name, email), cohort:residency_cohorts(name, track)')
      .in('status', ['enrolled', 'active'])

    const { data: placements } = await supabase.from('residency_placements').select('resident_id').is('deleted_at', null)
    const placedIds = new Set((placements || []).map(p => p.resident_id))
    setUnplaced((allResidents || []).filter(r => !placedIds.has(r.id) && !r.mentor_id))

    // Available mentors
    const { data: mentorData } = await supabase
      .from('residency_profiles')
      .select('id, first_name, last_name, credential_type, availability_type, mentor_capacity, onboarding_status')
      .eq('role', 'mentor')

    // Count current assignments per mentor
    const { data: mentorAssignments } = await supabase
      .from('residency_residents')
      .select('mentor_id')
      .not('mentor_id', 'is', null)

    const mentorCounts: Record<string, number> = {}
    for (const r of mentorAssignments || []) {
      if (r.mentor_id) mentorCounts[r.mentor_id] = (mentorCounts[r.mentor_id] || 0) + 1
    }

    setMentors((mentorData || []).map(m => ({
      ...m,
      currentCount: mentorCounts[m.id] || 0,
      available: (mentorCounts[m.id] || 0) < (m.mentor_capacity || 3),
    })))

    // Schools with capacity
    const { data: schoolData } = await supabase
      .from('residency_schools')
      .select('id, name, city, state, partnership_status, resident_capacity, practicum_agreement_signed')
      .is('deleted_at', null)
      .eq('partnership_status', 'active')

    const { data: schoolPlacements } = await supabase
      .from('residency_placements')
      .select('school_id')
      .is('deleted_at', null)

    const schoolCounts: Record<string, number> = {}
    for (const p of schoolPlacements || []) {
      if (p.school_id) schoolCounts[p.school_id] = (schoolCounts[p.school_id] || 0) + 1
    }

    setSchools((schoolData || []).map(s => ({
      ...s,
      currentCount: schoolCounts[s.id] || 0,
      available: (schoolCounts[s.id] || 0) < (s.resident_capacity || 5),
    })))

    setLoading(false)
  }

  async function confirmPlacement() {
    if (!selected || !selectedMentor || !selectedSchool) return
    setPlacing(true)

    // Update resident with mentor
    await supabase.from('residency_residents').update({
      mentor_id: selectedMentor,
      placement_site_id: selectedSchool,
    }).eq('id', selected.id)

    // Create placement record
    await supabase.from('residency_placements').insert({
      resident_id: selected.id,
      site_id: selectedSchool,
      mentor_id: selectedMentor,
      status: 'active',
    })

    setSelected(null)
    setSelectedMentor('')
    setSelectedSchool('')
    setPlacing(false)
    await load()
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  const availableMentors = mentors.filter(m => m.available)
  const availableSchools = schools.filter(s => s.available)

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Placement Matching</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        {unplaced.length} unplaced &middot; {availableMentors.length} available mentors &middot; {availableSchools.length} available schools
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr 1fr 1.2fr' : '1fr 1fr 1fr', gap: '1rem' }}>
        {/* Unplaced Residents */}
        <div>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Unplaced Residents ({unplaced.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', maxHeight: '70vh', overflowY: 'auto' }}>
            {unplaced.map(r => (
              <div key={r.id} onClick={() => { setSelected(r); setSelectedMentor(''); setSelectedSchool('') }}
                className="r-card" style={{
                  padding: '0.75rem', cursor: 'pointer', fontSize: '0.8125rem',
                  borderLeft: selected?.id === r.id ? '3px solid var(--r-navy)' : '3px solid transparent',
                }}>
                <p style={{ fontWeight: 600 }}>{(r.profile as any)?.first_name} {(r.profile as any)?.last_name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                  {(r.cohort as any)?.name} &middot; {(r.cohort as any)?.track}
                </p>
              </div>
            ))}
            {unplaced.length === 0 && <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', padding: '1rem' }}>All residents placed</p>}
          </div>
        </div>

        {/* Available Mentors */}
        <div>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Available Mentors ({availableMentors.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', maxHeight: '70vh', overflowY: 'auto' }}>
            {mentors.map(m => (
              <div key={m.id} onClick={() => selected && setSelectedMentor(m.id)}
                className="r-card" style={{
                  padding: '0.75rem', fontSize: '0.8125rem',
                  cursor: selected ? 'pointer' : 'default',
                  opacity: m.available ? 1 : 0.5,
                  borderLeft: selectedMentor === m.id ? '3px solid var(--r-navy)' : '3px solid transparent',
                }}>
                <p style={{ fontWeight: 600 }}>{m.first_name} {m.last_name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                  {m.credential_type || 'No credential'} &middot; {m.currentCount}/{m.mentor_capacity || 3} residents
                </p>
                {m.onboarding_status !== 'complete' && (
                  <span style={{ fontSize: '0.5625rem', color: '#b45309' }}>Onboarding: {m.onboarding_status}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Schools */}
        <div>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Approved Schools ({availableSchools.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', maxHeight: '70vh', overflowY: 'auto' }}>
            {schools.map(s => (
              <div key={s.id} onClick={() => selected && setSelectedSchool(s.id)}
                className="r-card" style={{
                  padding: '0.75rem', fontSize: '0.8125rem',
                  cursor: selected ? 'pointer' : 'default',
                  opacity: s.available ? 1 : 0.5,
                  borderLeft: selectedSchool === s.id ? '3px solid var(--r-navy)' : '3px solid transparent',
                }}>
                <p style={{ fontWeight: 600 }}>{s.name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                  {[s.city, s.state].filter(Boolean).join(', ')} &middot; {s.currentCount}/{s.resident_capacity || 5} residents
                </p>
                {!s.practicum_agreement_signed && (
                  <span style={{ fontSize: '0.5625rem', color: '#b45309' }}>Agreement pending</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Placement Panel */}
        {selected && (
          <div className="r-card" style={{ padding: '1.5rem', alignSelf: 'start' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Place Resident</h2>
            <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
              {(selected.profile as any)?.first_name} {(selected.profile as any)?.last_name}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1.25rem' }}>
              {(selected.cohort as any)?.name} &middot; {(selected.cohort as any)?.track}
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label className="r-label">Mentor</label>
              <select className="r-input" value={selectedMentor} onChange={e => setSelectedMentor(e.target.value)}>
                <option value="">Select a mentor</option>
                {availableMentors.map(m => (
                  <option key={m.id} value={m.id}>{m.first_name} {m.last_name} ({m.credential_type})</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="r-label">School</label>
              <select className="r-input" value={selectedSchool} onChange={e => setSelectedSchool(e.target.value)}>
                <option value="">Select a school</option>
                {availableSchools.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({[s.city, s.state].filter(Boolean).join(', ')})</option>
                ))}
              </select>
            </div>

            <button className="r-btn r-btn-primary" onClick={confirmPlacement}
              disabled={placing || !selectedMentor || !selectedSchool}
              style={{ width: '100%', justifyContent: 'center' }}>
              {placing ? 'Placing...' : 'Confirm Placement'}
            </button>

            <button onClick={() => setSelected(null)}
              className="r-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

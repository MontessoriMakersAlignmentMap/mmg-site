'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

export default function SchoolResidentsPage() {
  const [residents, setResidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: partner } = await supabase
        .from('residency_school_partners')
        .select('school_id')
        .eq('profile_id', user.id)
        .is('deleted_at', null)
        .single()

      if (partner?.school_id) {
        // Get placements at this school
        const { data: placements } = await supabase
          .from('residency_placements')
          .select(`
            *,
            resident:residency_residents(
              id, status,
              profile:residency_profiles(first_name, last_name, email),
              cohort:residency_cohorts(name, track)
            )
          `)
          .eq('site_id', partner.school_id)

        setResidents(placements || [])
      }

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Placed Residents</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Residents currently completing practicum at your school.
      </p>

      {residents.length === 0 ? (
        <EmptyState title="No residents placed" message="Residents assigned to your school will appear here." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {residents.map(p => {
            const res = p.resident as any
            return (
              <div key={p.id} className="r-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.125rem' }}>
                      {res?.profile?.first_name} {res?.profile?.last_name}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                      {res?.cohort?.name || 'No cohort'} &middot; {res?.cohort?.track || '—'}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase',
                    padding: '0.25rem 0.625rem', borderRadius: '4px',
                    background: res?.status === 'enrolled' ? '#d1fae5' : '#fef3c7',
                    color: res?.status === 'enrolled' ? '#2d6a4f' : '#b45309',
                  }}>
                    {res?.status || '—'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

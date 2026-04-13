'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import EmptyState from '../../components/EmptyState'

const FOCUS_LABELS: Record<string, string> = {
  prepared_environment: 'Prepared Environment',
  lesson_presentation: 'Lesson Presentation',
  child_interaction: 'Child Interaction & Independence',
  observation_documentation: 'Observation & Documentation',
  adult_presence: 'Adult Presence & Grace',
  classroom_management: 'Classroom Management & Flow',
  other: 'Other',
}

export default function ObservationsListPage() {
  const [observations, setObservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('residency_observation_forms')
        .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name))')
        .eq('observer_id', user.id)
        .is('deleted_at', null)
        .order('observation_date', { ascending: false })

      if (data) setObservations(data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Observations</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Structured observation forms from practicum site visits.
          </p>
        </div>
        <Link href="/residency/mentor/observations/new" className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          New Observation
        </Link>
      </div>

      {observations.length === 0 ? (
        <EmptyState
          title="No observations yet"
          message="Completed observation forms will appear here."
          action={
            <Link href="/residency/mentor/observations/new" className="r-btn r-btn-primary">
              Record an Observation
            </Link>
          }
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {observations.map(o => (
            <div key={o.id} className="r-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>
                  {o.resident?.profile?.first_name} {o.resident?.profile?.last_name}
                </p>
                <h3 style={{ fontSize: '1rem', margin: 0, marginBottom: '0.25rem' }}>
                  {FOCUS_LABELS[o.observation_focus] ?? o.observation_focus_other ?? o.observation_focus}
                </h3>
                {o.semester && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>{o.semester}</p>
                )}
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                {o.indicators_present && o.indicators_present.length > 0 && (
                  <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--r-navy)', marginBottom: '0.25rem' }}>
                    {o.indicators_present.length} indicators
                  </p>
                )}
                <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                  {new Date(o.observation_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

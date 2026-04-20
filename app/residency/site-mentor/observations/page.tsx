'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

export default function SiteMentorObservationsPage() {
  const { profile } = useResidencyAuth(['site_mentor'])
  const [observations, setObservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data } = await supabase
        .from('residency_site_mentor_observations')
        .select('*, resident:residency_residents(profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name))')
        .eq('site_mentor_profile_id', profile!.id)
        .order('observation_date', { ascending: false })

      if (data) setObservations(data)
      setLoading(false)
    }
    load()
  }, [profile])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const drafts = observations.filter(o => o.status === 'draft')
  const submitted = observations.filter(o => o.status === 'submitted')

  return (
    <div>
      <Link href="/residency/site-mentor" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Quarterly Observations</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Submit one structured observation per quarter using the MMR rubric.
          </p>
        </div>
        <Link href="/residency/site-mentor/observations/new" className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem', textDecoration: 'none' }}>
          New Observation
        </Link>
      </div>

      {drafts.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Drafts ({drafts.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {drafts.map(o => (
              <Link key={o.id} href={`/residency/site-mentor/observations/${o.id}`} className="r-card" style={{
                padding: '1rem', textDecoration: 'none', color: 'inherit', display: 'block',
                borderLeft: '4px solid var(--r-gold)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {o.resident?.profile?.first_name} {o.resident?.profile?.last_name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      {o.quarter} {o.academic_year} · {new Date(o.observation_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>Draft</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {submitted.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Submitted ({submitted.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {submitted.map(o => (
              <Link key={o.id} href={`/residency/site-mentor/observations/${o.id}`} className="r-card" style={{
                padding: '1rem', textDecoration: 'none', color: 'inherit', display: 'block',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {o.resident?.profile?.first_name} {o.resident?.profile?.last_name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      {o.quarter} {o.academic_year} · {new Date(o.observation_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.6875rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', background: 'var(--r-success-light)', color: 'var(--r-success)', fontWeight: 600 }}>Submitted</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {observations.length === 0 && (
        <div className="r-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--r-text-muted)' }}>No observations yet. Click "New Observation" to get started.</p>
        </div>
      )}
    </div>
  )
}

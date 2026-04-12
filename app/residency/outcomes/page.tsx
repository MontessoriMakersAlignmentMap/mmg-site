'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function OutcomesPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [grads, residents, schools, cohorts] = await Promise.all([
        supabase.from('residency_graduates').select('id, track, completed_at').is('deleted_at', null),
        supabase.from('residency_residents').select('id, status'),
        supabase.from('residency_schools').select('id, state').eq('partnership_status', 'active').is('deleted_at', null),
        supabase.from('residency_cohorts').select('id, status').is('deleted_at', null),
      ])

      const gradData = grads.data || []
      const activeResidents = (residents.data || []).filter(r => r.status === 'enrolled' || r.status === 'active')
      const schoolData = schools.data || []
      const activeCohorts = (cohorts.data || []).filter(c => c.status === 'active')

      const states = new Set(schoolData.map(s => s.state).filter(Boolean))

      setStats({
        totalGraduates: gradData.length,
        primaryGrads: gradData.filter(g => g.track === 'primary').length,
        elemGrads: gradData.filter(g => g.track === 'elementary').length,
        activeResidents: activeResidents.length,
        partnerSchools: schoolData.length,
        statesServed: states.size,
        activeCohorts: activeCohorts.length,
      })
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.25rem', color: 'var(--r-navy)', marginBottom: '0.5rem', textAlign: 'center' }}>
        Program Outcomes
      </h1>
      <p style={{
        fontSize: '1.0625rem', color: 'var(--r-text-muted)', textAlign: 'center',
        maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.7,
      }}>
        The Montessori Makers Residency prepares the next generation of credentialed Montessori educators
        through a practice-centered, equity-driven model.
      </p>

      {loading ? (
        <p style={{ color: 'var(--r-text-muted)', textAlign: 'center' }}>Loading outcomes data...</p>
      ) : stats && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <p style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--r-navy)', lineHeight: 1 }}>{stats.totalGraduates}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', marginTop: '0.5rem' }}>Credentialed Graduates</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <p style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--r-navy)', lineHeight: 1 }}>{stats.activeResidents}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', marginTop: '0.5rem' }}>Residents in Training</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <p style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--r-navy)', lineHeight: 1 }}>{stats.partnerSchools}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', marginTop: '0.5rem' }}>Partner Schools</p>
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem',
          }}>
            <div className="r-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--r-navy)' }}>Graduates by Track</h2>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{stats.primaryGrads}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Primary (Ages 3-6)</p>
                </div>
                <div>
                  <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{stats.elemGrads}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Elementary (Ages 6-12)</p>
                </div>
              </div>
            </div>
            <div className="r-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--r-navy)' }}>Program Reach</h2>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{stats.statesServed}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>States Served</p>
                </div>
                <div>
                  <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{stats.activeCohorts}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Active Cohorts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="r-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--r-navy)' }}>
              Interested in partnering?
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--r-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Schools can host residents for practicum placements. Graduates are matched with hiring schools through MatchHub.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <a href="/residency/apply" className="r-btn r-btn-primary" style={{ textDecoration: 'none' }}>
                Apply to the Residency
              </a>
              <a href="/residency/mentors" className="r-btn" style={{ textDecoration: 'none' }}>
                Become a Mentor
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

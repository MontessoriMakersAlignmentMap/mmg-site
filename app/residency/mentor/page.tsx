'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import ProgressBar from '../components/ProgressBar'

export default function MentorDashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [residents, setResidents] = useState<any[]>([])
  const [pendingCount, setPendingCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: prof } = await supabase
        .from('residency_profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      if (prof) setProfile(prof)

      // Get residents with their assigned level
      const { data: res } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name, email), assigned_level:residency_levels(name, age_range)')
        .eq('mentor_id', user.id)

      if (!res) { setLoading(false); return }

      // For each resident, get assignment counts and pending submissions
      const enriched = await Promise.all(res.map(async (r: any) => {
        const [assignmentsResult, pendingResult] = await Promise.all([
          supabase
            .from('residency_assignments')
            .select('status')
            .eq('resident_id', r.id),
          supabase
            .from('residency_album_entries')
            .select('id', { count: 'exact', head: true })
            .eq('resident_id', r.id)
            .eq('status', 'submitted'),
        ])

        const assignments = assignmentsResult.data ?? []
        const total = assignments.length
        const completed = assignments.filter((a: any) => a.status === 'completed').length

        return {
          ...r,
          total_assignments: total,
          completed_assignments: completed,
          pending_submissions: pendingResult.count ?? 0,
        }
      }))

      setResidents(enriched)

      // Total pending
      const totalPending = enriched.reduce((sum: number, r: any) => sum + r.pending_submissions, 0)
      setPendingCount(totalPending)

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
        {profile ? `Welcome, ${profile.first_name}` : 'Mentor Dashboard'}
      </h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Your residents and pending reviews.
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="r-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--r-navy)' }}>{residents.length}</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Assigned Residents</p>
        </div>
        <Link href="/residency/mentor/submissions" className="r-card" style={{
          textAlign: 'center', padding: '1.5rem', textDecoration: 'none', color: 'inherit',
          borderColor: pendingCount > 0 ? 'var(--r-gold)' : undefined,
          background: pendingCount > 0 ? 'var(--r-gold-light)' : undefined,
        }}>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: pendingCount > 0 ? 'var(--r-gold)' : 'var(--r-navy)' }}>{pendingCount}</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
            {pendingCount > 0 ? 'Reviews Waiting' : 'Pending Reviews'}
          </p>
        </Link>
      </div>

      {/* Resident cards */}
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>My Residents</h2>

      {residents.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--r-text-muted)' }}>
          <p>No residents assigned yet.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}>
          {residents.map((r: any) => (
            <Link
              key={r.id}
              href={`/residency/mentor/residents/${r.id}`}
              className="r-card"
              style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}
            >
              {/* Pending flag */}
              {r.pending_submissions > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'var(--r-gold)',
                  color: 'var(--r-white)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.625rem',
                  borderRadius: '9999px',
                }}>
                  {r.pending_submissions} to review
                </span>
              )}

              <div style={{ marginBottom: '0.75rem' }}>
                <h3 style={{
                  fontFamily: 'var(--r-font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--r-navy)',
                  marginBottom: '0.25rem',
                }}>
                  {r.profile?.first_name} {r.profile?.last_name}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {r.assigned_level && (
                    <span className="r-badge r-badge-level" style={{ fontSize: '0.6875rem' }}>
                      {r.assigned_level.name}
                    </span>
                  )}
                  {r.cohort && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      Cohort: {r.cohort}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div style={{ marginTop: '0.75rem' }}>
                <ProgressBar
                  completed={r.completed_assignments}
                  total={r.total_assignments}
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
                  {r.total_assignments === 0
                    ? 'No assignments yet'
                    : `${r.completed_assignments} of ${r.total_assignments} lessons completed`
                  }
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

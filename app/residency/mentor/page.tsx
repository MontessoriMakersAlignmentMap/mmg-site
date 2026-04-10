'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../components/StatusBadge'

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

      const { data: res } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name, email)')
        .eq('mentor_id', user.id)

      if (res) setResidents(res)

      // Count pending submissions across all mentees
      const { count } = await supabase
        .from('residency_album_entries')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'submitted')
        .in('resident_id', (res ?? []).map((r: any) => r.id))

      setPendingCount(count ?? 0)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

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
        <Link href="/residency/mentor/submissions" className="r-card" style={{ textAlign: 'center', padding: '1.5rem', textDecoration: 'none', color: 'inherit' }}>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: pendingCount > 0 ? 'var(--r-gold)' : 'var(--r-navy)' }}>{pendingCount}</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>Pending Reviews</p>
        </Link>
      </div>

      {/* Residents */}
      <div className="r-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem' }}>My Residents</h2>
          <Link href="/residency/mentor/residents" style={{ fontSize: '0.8125rem', color: 'var(--r-navy)' }}>View all</Link>
        </div>
        {residents.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No residents assigned yet.</p>
        ) : (
          <table className="r-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Cohort</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {residents.map((r: any) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 500 }}>{r.profile?.first_name} {r.profile?.last_name}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td style={{ color: 'var(--r-text-muted)' }}>{r.cohort ?? '\u2014'}</td>
                  <td>
                    <Link href={`/residency/mentor/residents/${r.id}`}
                      style={{ fontSize: '0.8125rem', color: 'var(--r-navy)' }}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

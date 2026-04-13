'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../../components/StatusBadge'
import ProgressBar from '../../components/ProgressBar'

export default function MentorResidentsPage() {
  const [residents, setResidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name, email)')
        .eq('mentor_id', user.id)
        .order('created_at', { ascending: false })

      if (data) {
        const enriched = await Promise.all(data.map(async (r: any) => {
          const { data: assignments } = await supabase
            .from('residency_assignments')
            .select('status')
            .eq('resident_id', r.id)

          const total = (assignments ?? []).length
          const completed = (assignments ?? []).filter((a: any) => a.status === 'completed').length
          return { ...r, total, completed }
        }))
        setResidents(enriched)
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>My Residents</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Residents assigned to you for mentorship.
      </p>

      {residents.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--r-text-muted)' }}>
          <p>No residents assigned.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {residents.map((r: any) => (
            <Link key={r.id} href={`/residency/mentor/residents/${r.id}`}
              className="r-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem', margin: 0 }}>{r.profile?.first_name} {r.profile?.last_name}</h3>
                <StatusBadge status={r.status} />
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                {r.cohort ?? 'No cohort'} &bull; Enrolled {r.enrollment_date}
              </p>
              {r.total > 0 && <ProgressBar completed={r.completed} total={r.total} />}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

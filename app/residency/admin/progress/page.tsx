'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../../components/StatusBadge'
import ProgressBar from '../../components/ProgressBar'

export default function AdminProgressPage() {
  const [residents, setResidents] = useState<any[]>([])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // Get all residents with assignment counts
      const { data: residentData } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name)')
        .in('status', ['enrolled', 'active'])
        .order('created_at', { ascending: false })

      if (residentData) {
        const enriched = await Promise.all(residentData.map(async (r: any) => {
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

      // Pending submissions
      const { data: subs } = await supabase
        .from('residency_album_entries')
        .select('*, lesson:residency_lessons(title), resident:residency_residents!inner(*, profile:residency_profiles(first_name, last_name))')
        .eq('status', 'submitted')
        .order('submitted_at', { ascending: true })
        .limit(20)

      if (subs) setSubmissions(subs)

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Progress Monitor</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Track resident progress and review pending submissions.
      </p>

      {/* Resident progress */}
      <div className="r-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Resident Completion</h2>
        {residents.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No active residents.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {residents.map((r: any) => (
              <div key={r.id}>
                <Link href={`/residency/admin/residents/${r.id}`} style={{
                  fontWeight: 500, fontSize: '0.875rem', color: 'var(--r-navy)', textDecoration: 'none',
                }}>
                  {r.profile?.first_name} {r.profile?.last_name}
                </Link>
                <ProgressBar completed={r.completed} total={r.total} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending submissions */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Pending Submissions</h2>
        {submissions.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No submissions awaiting review.</p>
        ) : (
          <table className="r-table">
            <thead>
              <tr>
                <th>Resident</th>
                <th>Entry</th>
                <th>Lesson</th>
                <th>Submitted</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s: any) => (
                <tr key={s.id}>
                  <td>{s.resident?.profile?.first_name} {s.resident?.profile?.last_name}</td>
                  <td style={{ fontWeight: 500 }}>{s.title}</td>
                  <td>{s.lesson?.title}</td>
                  <td style={{ color: 'var(--r-text-muted)' }}>
                    {s.submitted_at ? new Date(s.submitted_at).toLocaleDateString() : '\u2014'}
                  </td>
                  <td><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

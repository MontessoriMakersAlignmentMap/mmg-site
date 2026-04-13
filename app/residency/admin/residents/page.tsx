'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../../components/StatusBadge'
import EmptyState from '../../components/EmptyState'

export default function AdminResidentsPage() {
  const [residents, setResidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(*), mentor:residency_profiles!residency_residents_mentor_id_fkey(first_name, last_name)')
        .order('created_at', { ascending: false })

      if (data) setResidents(data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Residents</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        All enrolled residents and their current status.
      </p>

      {residents.length === 0 ? (
        <EmptyState title="No residents yet" message="Residents will appear here once they register." />
      ) : (
        <div className="r-card" style={{ overflow: 'auto' }}>
          <table className="r-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Cohort</th>
                <th>Mentor</th>
                <th>Status</th>
                <th>Enrolled</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {residents.map((r: any) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 500 }}>{r.profile?.first_name} {r.profile?.last_name}</td>
                  <td style={{ color: 'var(--r-text-muted)' }}>{r.profile?.email}</td>
                  <td>{r.cohort ?? '\u2014'}</td>
                  <td>{r.mentor ? `${r.mentor.first_name} ${r.mentor.last_name}` : '\u2014'}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td style={{ color: 'var(--r-text-muted)' }}>{r.enrollment_date}</td>
                  <td>
                    <Link href={`/residency/admin/residents/${r.id}`}
                      style={{ fontSize: '0.8125rem', color: 'var(--r-navy)' }}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

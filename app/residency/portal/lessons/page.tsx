'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../../components/StatusBadge'
import EmptyState from '../../components/EmptyState'

export default function MyLessonsPage() {
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (resident) {
        const { data } = await supabase
          .from('residency_assignments')
          .select('*, lesson:residency_lessons(*, strand:residency_strands(*), level:residency_levels(*), category:residency_categories(*))')
          .eq('resident_id', resident.id)
          .order('created_at', { ascending: false })

        if (data) setAssignments(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = filter === 'all'
    ? assignments
    : assignments.filter(a => a.status === filter)

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>My Lessons</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        All lessons assigned to you across the residency.
      </p>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'assigned', 'in_progress', 'submitted', 'completed'].map(s => (
          <button key={s}
            onClick={() => setFilter(s)}
            className={`r-badge ${filter === s ? 'r-badge-strand' : ''}`}
            style={{ cursor: 'pointer', border: '1px solid var(--r-border)', background: filter === s ? undefined : 'var(--r-white)' }}>
            {s === 'all' ? 'All' : s.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No lessons found" message="No lessons match this filter." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map((a: any) => (
            <Link key={a.id} href={`/residency/portal/lessons/${a.lesson_id}`}
              className="r-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                    {a.lesson?.strand && <span className="r-badge r-badge-strand">{a.lesson.strand.name}</span>}
                    {a.lesson?.level && <span className="r-badge r-badge-level">{a.lesson.level.name}</span>}
                  </div>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>{a.lesson?.title}</h3>
                  {a.lesson?.description && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                      {a.lesson.description.substring(0, 120)}
                      {a.lesson.description.length > 120 ? '...' : ''}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <StatusBadge status={a.status} />
                  {a.due_date && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
                      Due: {a.due_date}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

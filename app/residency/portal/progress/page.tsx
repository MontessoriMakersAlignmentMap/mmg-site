'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import ProgressBar from '../../components/ProgressBar'
import EmptyState from '../../components/EmptyState'
import type { ProgressSummary } from '@/lib/residency/types'

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressSummary[]>([])
  const [totals, setTotals] = useState({ completed: 0, total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (!resident) { setLoading(false); return }

      const { data: strands } = await supabase
        .from('residency_strands')
        .select('*')
        .order('sort_order')

      const { data: assignments } = await supabase
        .from('residency_assignments')
        .select('*, lesson:residency_lessons(strand_id)')
        .eq('resident_id', resident.id)

      if (strands && assignments) {
        const prog = strands.map((s: any) => {
          const sa = assignments.filter((a: any) => a.lesson?.strand_id === s.id)
          return {
            strand_id: s.id,
            strand_name: s.name,
            total_lessons: sa.length,
            completed: sa.filter((a: any) => a.status === 'completed').length,
            in_progress: sa.filter((a: any) => ['in_progress', 'submitted', 'reviewed'].includes(a.status)).length,
            not_started: sa.filter((a: any) => a.status === 'assigned').length,
          }
        })
        setProgress(prog)
        setTotals({
          completed: prog.reduce((sum, p) => sum + p.completed, 0),
          total: prog.reduce((sum, p) => sum + p.total_lessons, 0),
        })
      }

      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Progress</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Track your completion across every strand of the residency.
      </p>

      {/* Overall */}
      {totals.total > 0 && (
        <div className="r-card" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.375rem' }}>Overall Progress</h2>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            {totals.completed} of {totals.total} lessons completed ({totals.total > 0 ? Math.round((totals.completed / totals.total) * 100) : 0}%)
          </p>
          <ProgressBar completed={totals.completed} total={totals.total} />
        </div>
      )}

      {/* By strand */}
      {progress.filter(p => p.total_lessons > 0).length === 0 ? (
        <EmptyState
          title="No progress data yet"
          message="Once lessons are assigned, your progress across each strand will appear here."
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {progress.filter(p => p.total_lessons > 0).map(p => (
            <div key={p.strand_id} className="r-card">
              <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>{p.strand_name}</h3>
              <ProgressBar completed={p.completed} total={p.total_lessons} />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                <span>{p.completed} completed</span>
                <span>{p.in_progress} in progress</span>
                <span>{p.not_started} not started</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

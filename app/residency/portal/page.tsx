'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import StatusBadge from '../components/StatusBadge'
import ProgressBar from '../components/ProgressBar'
import EmptyState from '../components/EmptyState'
import type { ResidencyProfile, Assignment, ProgressSummary } from '@/lib/residency/types'

export default function PortalDashboard() {
  const [profile, setProfile] = useState<ResidencyProfile | null>(null)
  const [recentAssignments, setRecentAssignments] = useState<any[]>([])
  const [progress, setProgress] = useState<ProgressSummary[]>([])
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

      // Get resident record
      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (resident) {
        // Recent assignments
        const { data: assignments } = await supabase
          .from('residency_assignments')
          .select('*, lesson:residency_lessons(title, strand:residency_strands(name))')
          .eq('resident_id', resident.id)
          .order('created_at', { ascending: false })
          .limit(5)

        if (assignments) setRecentAssignments(assignments)

        // Progress by strand
        const { data: strands } = await supabase
          .from('residency_strands')
          .select('*')
          .order('sort_order')

        const { data: allAssignments } = await supabase
          .from('residency_assignments')
          .select('*, lesson:residency_lessons(strand_id)')
          .eq('resident_id', resident.id)

        if (strands && allAssignments) {
          setProgress(strands.map((s: any) => {
            const sa = allAssignments.filter((a: any) => a.lesson?.strand_id === s.id)
            return {
              strand_id: s.id,
              strand_name: s.name,
              total_lessons: sa.length,
              completed: sa.filter((a: any) => a.status === 'completed').length,
              in_progress: sa.filter((a: any) => ['in_progress', 'submitted', 'reviewed'].includes(a.status)).length,
              not_started: sa.filter((a: any) => a.status === 'assigned').length,
            }
          }))
        }
      }

      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return <p style={{ color: 'var(--r-text-muted)', padding: '2rem' }}>Loading...</p>
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
        {profile ? `Welcome, ${profile.first_name}` : 'Dashboard'}
      </h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Your residency at a glance.
      </p>

      {/* Progress overview */}
      {progress.length > 0 && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Progress by Strand</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {progress.filter(p => p.total_lessons > 0).map(p => (
              <ProgressBar
                key={p.strand_id}
                label={p.strand_name}
                completed={p.completed}
                total={p.total_lessons}
              />
            ))}
            {progress.every(p => p.total_lessons === 0) && (
              <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
                No lessons assigned yet. Your progress will appear here once assignments begin.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Recent assignments */}
      <div className="r-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.125rem' }}>Recent Assignments</h2>
          <Link href="/residency/portal/lessons" style={{ fontSize: '0.8125rem', color: 'var(--r-navy)' }}>
            View all
          </Link>
        </div>

        {recentAssignments.length === 0 ? (
          <EmptyState
            title="No assignments yet"
            message="Assignments from your mentor will appear here."
          />
        ) : (
          <table className="r-table">
            <thead>
              <tr>
                <th>Lesson</th>
                <th>Strand</th>
                <th>Status</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {recentAssignments.map((a: any) => (
                <tr key={a.id}>
                  <td>
                    <Link href={`/residency/portal/lessons/${a.lesson_id}`} style={{ color: 'var(--r-navy)', fontWeight: 500, textDecoration: 'none' }}>
                      {a.lesson?.title}
                    </Link>
                  </td>
                  <td>{a.lesson?.strand?.name}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td style={{ color: 'var(--r-text-muted)' }}>{a.due_date ?? '\u2014'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

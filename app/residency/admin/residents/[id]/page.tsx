'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import StatusBadge from '../../../components/StatusBadge'
import ProgressBar from '../../../components/ProgressBar'

export default function AdminResidentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [resident, setResident] = useState<any>(null)
  const [assignments, setAssignments] = useState<any[]>([])
  const [progress, setProgress] = useState<any[]>([])
  const [mentors, setMentors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: r } = await supabase
        .from('residency_residents')
        .select('*, profile:residency_profiles(*)')
        .eq('id', id)
        .single()

      if (r) setResident(r)

      const { data: a } = await supabase
        .from('residency_assignments')
        .select('*, lesson:residency_lessons(title, strand:residency_strands(name))')
        .eq('resident_id', id)
        .order('created_at', { ascending: false })

      if (a) setAssignments(a)

      // Progress
      const { data: strands } = await supabase.from('residency_strands').select('*').order('sort_order')
      if (strands && a) {
        setProgress(strands.map((s: any) => {
          const sa = a.filter((assign: any) => assign.lesson?.strand?.name === s.name)
          return {
            name: s.name,
            total: sa.length,
            completed: sa.filter((x: any) => x.status === 'completed').length,
          }
        }).filter((p: any) => p.total > 0))
      }

      // Load mentors for assignment
      const { data: m } = await supabase
        .from('residency_profiles')
        .select('id, first_name, last_name')
        .eq('role', 'mentor')

      if (m) setMentors(m)

      setLoading(false)
    }
    load()
  }, [id])

  async function updateMentor(mentorId: string) {
    await supabase
      .from('residency_residents')
      .update({ mentor_id: mentorId || null })
      .eq('id', id)
  }

  async function updateStatus(status: string) {
    await supabase
      .from('residency_residents')
      .update({ status })
      .eq('id', id)
    setResident((prev: any) => ({ ...prev, status }))
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>
  if (!resident) return <p>Resident not found.</p>

  return (
    <div>
      <Link href="/residency/admin/residents" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Residents
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
            {resident.profile?.first_name} {resident.profile?.last_name}
          </h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            {resident.profile?.email} &bull; Enrolled {resident.enrollment_date}
          </p>
        </div>
        <StatusBadge status={resident.status} size="md" />
      </div>

      {/* Management */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="r-card">
          <label className="r-label">Status</label>
          <select className="r-input" value={resident.status} onChange={e => updateStatus(e.target.value)}>
            <option value="enrolled">Enrolled</option>
            <option value="active">Active</option>
            <option value="on_leave">On Leave</option>
            <option value="completed">Completed</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>
        <div className="r-card">
          <label className="r-label">Assigned Mentor</label>
          <select className="r-input" value={resident.mentor_id ?? ''} onChange={e => updateMentor(e.target.value)}>
            <option value="">No mentor assigned</option>
            {mentors.map((m: any) => (
              <option key={m.id} value={m.id}>{m.first_name} {m.last_name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress */}
      {progress.length > 0 && (
        <div className="r-card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Progress by Strand</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {progress.map((p: any) => (
              <ProgressBar key={p.name} label={p.name} completed={p.completed} total={p.total} />
            ))}
          </div>
        </div>
      )}

      {/* Assignments */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Assignments ({assignments.length})</h2>
        {assignments.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No assignments yet.</p>
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
              {assignments.map((a: any) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 500 }}>{a.lesson?.title}</td>
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

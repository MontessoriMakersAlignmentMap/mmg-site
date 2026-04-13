'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface Seminar {
  id: string
  title: string
  seminar_date: string
  description: string | null
}

interface AttendanceRecord {
  id: string
  seminar_id: string
  resident_id: string
  status: string
  notes: string | null
  resident?: { profile?: { first_name: string; last_name: string } }
}

export default function SeminarsPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([])
  const [residents, setResidents] = useState<any[]>([])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSeminar, setSelectedSeminar] = useState<string | null>(null)

  // Create seminar form
  const [showCreate, setShowCreate] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [saving, setSaving] = useState(false)

  async function loadData() {
    const [{ data: s }, { data: r }] = await Promise.all([
      supabase.from('residency_seminars').select('*').order('seminar_date', { ascending: false }),
      supabase.from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name)')
        .in('status', ['active', 'enrolled'])
        .order('created_at'),
    ])
    if (s) setSeminars(s)
    if (r) setResidents(r)
    setLoading(false)
  }

  async function loadAttendance(seminarId: string) {
    const { data } = await supabase
      .from('residency_seminar_attendance')
      .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name))')
      .eq('seminar_id', seminarId)
    if (data) setAttendance(data)
  }

  useEffect(() => { loadData() }, [])

  useEffect(() => {
    if (selectedSeminar) loadAttendance(selectedSeminar)
  }, [selectedSeminar])

  async function createSeminar(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await supabase.from('residency_seminars').insert({
      title: newTitle,
      seminar_date: newDate,
      description: newDesc || null,
    })
    setShowCreate(false)
    setNewTitle('')
    setNewDate('')
    setNewDesc('')
    setSaving(false)
    setLoading(true)
    loadData()
  }

  async function markAttendance(residentId: string, status: string) {
    if (!selectedSeminar) return
    await supabase.from('residency_seminar_attendance').upsert({
      seminar_id: selectedSeminar,
      resident_id: residentId,
      status,
    }, { onConflict: 'seminar_id,resident_id' })
    loadAttendance(selectedSeminar)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  // Absence counts per resident across all seminars
  const selectedSeminarData = seminars.find(s => s.id === selectedSeminar)
  const attendanceMap = new Map(attendance.map(a => [a.resident_id, a.status]))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Seminar Attendance</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Track monthly seminar attendance. MACTE requires 90% attendance (max 1 absence per 9 seminars).
          </p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showCreate ? 'Cancel' : 'Add Seminar'}
        </button>
      </div>

      {/* Create seminar form */}
      {showCreate && (
        <form onSubmit={createSeminar} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>New Seminar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Title</label>
              <input className="r-input" value={newTitle} onChange={e => setNewTitle(e.target.value)} required
                placeholder="e.g., Monthly Seminar — April" />
            </div>
            <div>
              <label className="r-label">Date</label>
              <input type="date" className="r-input" value={newDate} onChange={e => setNewDate(e.target.value)} required />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Description (optional)</label>
            <textarea className="r-textarea" value={newDesc} onChange={e => setNewDesc(e.target.value)}
              placeholder="Topics covered, guest speakers, etc." style={{ minHeight: '60px' }} />
          </div>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Creating...' : 'Create Seminar'}
          </button>
        </form>
      )}

      {/* Seminar list */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>
        <div className="r-card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Seminars</h2>
          {seminars.length === 0 ? (
            <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No seminars created yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {seminars.map(s => (
                <button key={s.id} onClick={() => setSelectedSeminar(s.id)} style={{
                  padding: '0.5rem 0.75rem',
                  background: selectedSeminar === s.id ? 'var(--r-navy)' : 'var(--r-cream)',
                  color: selectedSeminar === s.id ? '#fff' : 'inherit',
                  borderRadius: '6px',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                }}>
                  <p style={{ fontWeight: 500 }}>{s.title}</p>
                  <p style={{ fontSize: '0.6875rem', opacity: 0.7 }}>
                    {new Date(s.seminar_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Attendance sheet */}
        <div className="r-card">
          {!selectedSeminar ? (
            <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>Select a seminar to take attendance.</p>
          ) : (
            <>
              <h2 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{selectedSeminarData?.title}</h2>
              <p style={{ color: 'var(--r-text-muted)', fontSize: '0.75rem', marginBottom: '1rem' }}>
                {selectedSeminarData && new Date(selectedSeminarData.seminar_date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {residents.map(r => {
                  const status = attendanceMap.get(r.id) ?? 'unmarked'
                  return (
                    <div key={r.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0.75rem',
                      background: 'var(--r-cream)',
                      borderRadius: '6px',
                    }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                        {r.profile?.first_name} {r.profile?.last_name}
                      </span>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {['present', 'absent', 'excused'].map(s => (
                          <button key={s} onClick={() => markAttendance(r.id, s)} style={{
                            padding: '0.25rem 0.625rem',
                            borderRadius: '6px',
                            border: '1px solid',
                            borderColor: status === s ? 'transparent' : 'var(--r-border)',
                            background: status === s
                              ? s === 'present' ? 'var(--r-success-light)' : s === 'absent' ? '#fce4ec' : 'var(--r-feedback-bg)'
                              : 'transparent',
                            color: status === s
                              ? s === 'present' ? 'var(--r-success)' : s === 'absent' ? '#c62828' : 'var(--r-feedback-color)'
                              : 'var(--r-text-muted)',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                          }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
                {residents.length === 0 && (
                  <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No active residents.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

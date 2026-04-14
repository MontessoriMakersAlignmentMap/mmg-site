'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

interface Seminar {
  id: string
  title: string
  seminar_date: string
  description: string | null
  session_type: 'curriculum_integration' | 'practicum_community' | null
  month_number: number | null
}

interface AttendanceRecord {
  id: string
  seminar_id: string
  resident_id: string
  status: string
  notes: string | null
  resident?: { profile?: { first_name: string; last_name: string } }
}

const SESSION_LABELS: Record<string, { short: string; full: string; color: string; bg: string }> = {
  curriculum_integration: { short: 'Session A', full: 'Session A — Curriculum Integration', color: '#1565c0', bg: '#e3f2fd' },
  practicum_community: { short: 'Session B', full: 'Session B — Practicum & Community', color: '#7b1fa2', bg: '#f3e5f5' },
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function SeminarsPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([])
  const [residents, setResidents] = useState<any[]>([])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSeminar, setSelectedSeminar] = useState<string | null>(null)

  // Create session form
  const [showCreate, setShowCreate] = useState(false)
  const [newMonth, setNewMonth] = useState(() => new Date().getMonth() + 1)
  const [newYear, setNewYear] = useState(() => new Date().getFullYear())
  const [newDateA, setNewDateA] = useState('')
  const [newDateB, setNewDateB] = useState('')
  const [newDescA, setNewDescA] = useState('')
  const [newDescB, setNewDescB] = useState('')
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

  async function createSessionPair(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const monthName = MONTH_NAMES[newMonth - 1]

    const sessions = []
    if (newDateA) {
      sessions.push({
        title: `Session A — ${monthName} ${newYear}`,
        seminar_date: newDateA,
        description: newDescA || `Curriculum integration session for ${monthName}.`,
        session_type: 'curriculum_integration',
        month_number: newMonth,
      })
    }
    if (newDateB) {
      sessions.push({
        title: `Session B — ${monthName} ${newYear}`,
        seminar_date: newDateB,
        description: newDescB || `Practicum & community session for ${monthName}.`,
        session_type: 'practicum_community',
        month_number: newMonth,
      })
    }

    if (sessions.length > 0) {
      await supabase.from('residency_seminars').insert(sessions)
    }

    setShowCreate(false)
    setNewDateA('')
    setNewDateB('')
    setNewDescA('')
    setNewDescB('')
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

  const selectedSeminarData = seminars.find(s => s.id === selectedSeminar)
  const attendanceMap = new Map(attendance.map(a => [a.resident_id, a.status]))

  // Group seminars by month
  const seminarsByMonth = new Map<string, Seminar[]>()
  seminars.forEach(s => {
    const d = new Date(s.seminar_date + 'T12:00:00')
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const group = seminarsByMonth.get(key) || []
    group.push(s)
    seminarsByMonth.set(key, group)
  })

  // Check month completion (both A and B attended)
  function getMonthCompletionForResident(monthSeminars: Seminar[], residentId: string) {
    // This is a simplified check — full check would load all attendance
    const hasA = monthSeminars.some(s => s.session_type === 'curriculum_integration')
    const hasB = monthSeminars.some(s => s.session_type === 'practicum_community')
    return { hasA, hasB, complete: hasA && hasB }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Session Attendance</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Track twice-monthly session attendance. MACTE requires 90% attendance. Each month has a Session A (curriculum integration) and Session B (practicum &amp; community).
          </p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showCreate ? 'Cancel' : 'Add Month Sessions'}
        </button>
      </div>

      {/* Create session pair form */}
      {showCreate && (
        <form onSubmit={createSessionPair} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Schedule Monthly Session Pair</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Month</label>
              <select className="r-input" value={newMonth} onChange={e => setNewMonth(Number(e.target.value))}>
                {MONTH_NAMES.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">Year</label>
              <input type="number" className="r-input" value={newYear} onChange={e => setNewYear(Number(e.target.value))} />
            </div>
          </div>

          {/* Session A */}
          <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1565c0', marginBottom: '0.75rem' }}>
              Session A — Curriculum Integration
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
              First half of the month. Focus: curriculum themes, bundle content review, pedagogical discussions.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="r-label">Date</label>
                <input type="date" className="r-input" value={newDateA} onChange={e => setNewDateA(e.target.value)} required />
              </div>
              <div>
                <label className="r-label">Description (optional)</label>
                <input className="r-input" value={newDescA} onChange={e => setNewDescA(e.target.value)}
                  placeholder="Topics, guest speakers, etc." />
              </div>
            </div>
          </div>

          {/* Session B */}
          <div style={{ padding: '1rem', background: '#f3e5f5', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#7b1fa2', marginBottom: '0.75rem' }}>
              Session B — Practicum &amp; Community
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
              Second half of the month. Focus: practicum reflections, observation debriefs, peer support.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="r-label">Date</label>
                <input type="date" className="r-input" value={newDateB} onChange={e => setNewDateB(e.target.value)} required />
              </div>
              <div>
                <label className="r-label">Description (optional)</label>
                <input className="r-input" value={newDescB} onChange={e => setNewDescB(e.target.value)}
                  placeholder="Practicum topics, observation focus, etc." />
              </div>
            </div>
          </div>

          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Creating...' : 'Create Session Pair'}
          </button>
        </form>
      )}

      {/* Session list */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' }}>
        <div className="r-card">
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Sessions</h2>
          {seminars.length === 0 ? (
            <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No sessions created yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Array.from(seminarsByMonth.entries()).map(([monthKey, monthSeminars]) => {
                const d = new Date(monthKey + '-15T12:00:00')
                const monthLabel = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                const { hasA, hasB } = getMonthCompletionForResident(monthSeminars, '')

                return (
                  <div key={monthKey}>
                    <p style={{
                      fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '0.08em', color: 'var(--r-text-muted)', marginBottom: '0.375rem',
                    }}>
                      {monthLabel}
                      {hasA && hasB && (
                        <span style={{ marginLeft: '0.5rem', color: 'var(--r-success)' }}>● Pair Complete</span>
                      )}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {monthSeminars
                        .sort((a, b) => a.seminar_date.localeCompare(b.seminar_date))
                        .map(s => {
                          const typeInfo = s.session_type ? SESSION_LABELS[s.session_type] : null
                          return (
                            <button key={s.id} onClick={() => setSelectedSeminar(s.id)} style={{
                              padding: '0.5rem 0.75rem',
                              background: selectedSeminar === s.id ? 'var(--r-navy)' : 'var(--r-cream)',
                              color: selectedSeminar === s.id ? '#fff' : 'inherit',
                              borderRadius: '6px',
                              border: 'none',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.8125rem',
                              borderLeft: typeInfo ? `3px solid ${typeInfo.color}` : undefined,
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontWeight: 500 }}>{s.title}</p>
                                {typeInfo && (
                                  <span style={{
                                    fontSize: '0.5625rem',
                                    fontWeight: 700,
                                    padding: '0.125rem 0.375rem',
                                    borderRadius: '3px',
                                    background: selectedSeminar === s.id ? 'rgba(255,255,255,0.2)' : typeInfo.bg,
                                    color: selectedSeminar === s.id ? '#fff' : typeInfo.color,
                                  }}>
                                    {typeInfo.short}
                                  </span>
                                )}
                              </div>
                              <p style={{ fontSize: '0.6875rem', opacity: 0.7 }}>
                                {new Date(s.seminar_date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                              </p>
                            </button>
                          )
                        })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Attendance sheet */}
        <div className="r-card">
          {!selectedSeminar ? (
            <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>Select a session to take attendance.</p>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{selectedSeminarData?.title}</h2>
                  <p style={{ color: 'var(--r-text-muted)', fontSize: '0.75rem' }}>
                    {selectedSeminarData && new Date(selectedSeminarData.seminar_date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                {selectedSeminarData?.session_type && SESSION_LABELS[selectedSeminarData.session_type] && (
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '6px',
                    background: SESSION_LABELS[selectedSeminarData.session_type].bg,
                    color: SESSION_LABELS[selectedSeminarData.session_type].color,
                  }}>
                    {SESSION_LABELS[selectedSeminarData.session_type].full}
                  </span>
                )}
              </div>
              {selectedSeminarData?.description && (
                <p style={{ fontSize: '0.8125rem', color: 'var(--r-text)', marginBottom: '1rem', lineHeight: 1.6 }}>
                  {selectedSeminarData.description}
                </p>
              )}
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

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

interface ReadingAssignment {
  id: string
  book_title: string
  author: string | null
  chapters_pages: string | null
  focus_question: string | null
  purchase_link: string | null
  free_access_link: string | null
  month_number: number
  track: string
}

interface ReadingLogEntry {
  id: string
  reading_assignment_id: string
  completed: boolean
  notes: string | null
  completed_at: string | null
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function ReadingLogPage() {
  const [assignments, setAssignments] = useState<ReadingAssignment[]>([])
  const [logEntries, setLogEntries] = useState<ReadingLogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [residentId, setResidentId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesText, setNotesText] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id, assigned_level:residency_levels(name)')
        .eq('profile_id', user.id)
        .single()

      if (!resident) { setLoading(false); return }
      setResidentId(resident.id)

      const track = (resident.assigned_level as any)?.name?.toLowerCase() === 'elementary' ? 'elementary' : 'primary'

      const [{ data: ra }, { data: rl }] = await Promise.all([
        supabase
          .from('residency_reading_assignments')
          .select('*')
          .eq('track', track)
          .order('month_number'),
        supabase
          .from('residency_reading_log')
          .select('*')
          .eq('resident_id', resident.id),
      ])

      if (ra) setAssignments(ra)
      if (rl) setLogEntries(rl)
      setLoading(false)
    }
    load()
  }, [])

  async function toggleComplete(assignmentId: string) {
    if (!residentId) return
    setSavingId(assignmentId)

    const existing = logEntries.find(l => l.reading_assignment_id === assignmentId)

    if (existing) {
      const newCompleted = !existing.completed
      await supabase.from('residency_reading_log').update({
        completed: newCompleted,
        completed_at: newCompleted ? new Date().toISOString() : null,
      }).eq('id', existing.id)

      setLogEntries(prev => prev.map(l =>
        l.id === existing.id ? { ...l, completed: newCompleted, completed_at: newCompleted ? new Date().toISOString() : null } : l
      ))
    } else {
      const { data } = await supabase.from('residency_reading_log').insert({
        resident_id: residentId,
        reading_assignment_id: assignmentId,
        completed: true,
        completed_at: new Date().toISOString(),
      }).select().single()

      if (data) setLogEntries(prev => [...prev, data])
    }

    setSavingId(null)
  }

  async function saveNotes(assignmentId: string) {
    if (!residentId) return
    setSavingId(assignmentId)

    const existing = logEntries.find(l => l.reading_assignment_id === assignmentId)

    if (existing) {
      await supabase.from('residency_reading_log').update({ notes: notesText || null }).eq('id', existing.id)
      setLogEntries(prev => prev.map(l =>
        l.id === existing.id ? { ...l, notes: notesText || null } : l
      ))
    } else {
      const { data } = await supabase.from('residency_reading_log').insert({
        resident_id: residentId,
        reading_assignment_id: assignmentId,
        completed: false,
        notes: notesText || null,
      }).select().single()

      if (data) setLogEntries(prev => [...prev, data])
    }

    setEditingNotes(null)
    setNotesText('')
    setSavingId(null)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const completedCount = logEntries.filter(l => l.completed).length
  const totalCount = assignments.length

  // Group by month
  const byMonth = new Map<number, ReadingAssignment[]>()
  assignments.forEach(a => {
    const group = byMonth.get(a.month_number) || []
    group.push(a)
    byMonth.set(a.month_number, group)
  })

  const currentMonth = new Date().getMonth() + 1

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Reading Log</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Track your required reading throughout the program. Mark each reading complete and add reflections.
          </p>
        </div>
        {totalCount > 0 && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>
              {completedCount}/{totalCount}
            </p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>readings completed</p>
          </div>
        )}
      </div>

      {assignments.length === 0 ? (
        <EmptyState title="No readings assigned yet" message="Required readings will appear here when your program adds them." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {Array.from(byMonth.entries())
            .sort(([a], [b]) => a - b)
            .map(([month, monthAssignments]) => {
              const isCurrent = month === currentMonth
              const allComplete = monthAssignments.every(a =>
                logEntries.find(l => l.reading_assignment_id === a.id)?.completed
              )

              return (
                <div key={month}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <h2 style={{
                      fontSize: '1rem', fontWeight: 600,
                      color: isCurrent ? 'var(--r-navy)' : 'var(--r-text-muted)',
                    }}>
                      {MONTH_NAMES[month - 1]}
                    </h2>
                    {isCurrent && (
                      <span style={{
                        fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase',
                        padding: '0.125rem 0.5rem', borderRadius: '3px',
                        background: 'var(--r-info-light)', color: 'var(--r-info)',
                      }}>
                        Current
                      </span>
                    )}
                    {allComplete && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--r-success)', fontWeight: 600 }}>✓ Complete</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {monthAssignments.map(a => {
                      const logEntry = logEntries.find(l => l.reading_assignment_id === a.id)
                      const isComplete = logEntry?.completed ?? false
                      const isEditingThis = editingNotes === a.id

                      return (
                        <div key={a.id} className="r-card" style={{
                          borderLeft: isComplete ? '3px solid var(--r-success)' : '3px solid var(--r-border)',
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                {a.book_title}
                              </h3>
                              {a.author && (
                                <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>
                                  by {a.author}
                                </p>
                              )}
                              {a.chapters_pages && (
                                <p style={{ fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                                  <strong>Chapters/Pages:</strong> {a.chapters_pages}
                                </p>
                              )}
                              {a.focus_question && (
                                <p style={{
                                  fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--r-text)',
                                  background: 'var(--r-bg-muted)', padding: '0.5rem 0.75rem', borderRadius: '6px',
                                  marginBottom: '0.5rem', lineHeight: 1.6,
                                }}>
                                  Focus: {a.focus_question}
                                </p>
                              )}
                              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                {a.purchase_link && (
                                  <a href={a.purchase_link} target="_blank" rel="noopener noreferrer"
                                    style={{ fontSize: '0.75rem', color: 'var(--r-navy)', fontWeight: 600 }}>
                                    Purchase →
                                  </a>
                                )}
                                {a.free_access_link && (
                                  <a href={a.free_access_link} target="_blank" rel="noopener noreferrer"
                                    style={{ fontSize: '0.75rem', color: 'var(--r-success)', fontWeight: 600 }}>
                                    Free Access →
                                  </a>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => toggleComplete(a.id)}
                              disabled={savingId === a.id}
                              style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                border: isComplete ? 'none' : '2px solid var(--r-border)',
                                background: isComplete ? 'var(--r-success)' : 'transparent',
                                color: isComplete ? 'white' : 'var(--r-text-muted)',
                                cursor: 'pointer', fontSize: '1rem', fontWeight: 700,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, marginLeft: '1rem',
                              }}
                            >
                              {isComplete ? '✓' : ''}
                            </button>
                          </div>

                          {/* Notes section */}
                          {logEntry?.notes && !isEditingThis && (
                            <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: 'var(--r-cream)', borderRadius: '6px' }}>
                              <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>My Notes</p>
                              <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{logEntry.notes}</p>
                            </div>
                          )}

                          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                            {!isEditingThis ? (
                              <button
                                onClick={() => { setEditingNotes(a.id); setNotesText(logEntry?.notes || '') }}
                                style={{
                                  background: 'none', border: 'none', fontSize: '0.75rem',
                                  color: 'var(--r-navy)', cursor: 'pointer', fontWeight: 600, padding: 0,
                                }}
                              >
                                {logEntry?.notes ? 'Edit Notes' : 'Add Notes'}
                              </button>
                            ) : (
                              <div style={{ width: '100%' }}>
                                <textarea
                                  className="r-textarea"
                                  value={notesText}
                                  onChange={e => setNotesText(e.target.value)}
                                  placeholder="Your reflections on this reading..."
                                  style={{ minHeight: '80px', fontSize: '0.8125rem', marginBottom: '0.5rem' }}
                                />
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button onClick={() => saveNotes(a.id)} className="r-btn r-btn-primary"
                                    disabled={savingId === a.id} style={{ fontSize: '0.75rem' }}>
                                    Save
                                  </button>
                                  <button onClick={() => { setEditingNotes(null); setNotesText('') }}
                                    style={{ background: 'none', border: 'none', fontSize: '0.75rem', color: 'var(--r-text-muted)', cursor: 'pointer' }}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          {isComplete && logEntry?.completed_at && (
                            <p style={{ fontSize: '0.625rem', color: 'var(--r-text-muted)', marginTop: '0.5rem' }}>
                              Completed {new Date(logEntry.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

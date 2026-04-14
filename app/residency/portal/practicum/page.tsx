'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'

interface PracticumLog {
  id: string
  log_date: string
  hours_teaching: number
  hours_observation: number
  lessons_given: number
  observations_made: number
  reflection: string | null
  questions: string | null
  verified_by: string | null
  verified_at: string | null
}

const TEACHING_TARGET = 540
const OBSERVATION_TARGET = 90

export default function PracticumPage() {
  const { profile } = useResidencyAuth(['resident'])
  const [logs, setLogs] = useState<PracticumLog[]>([])
  const [residentId, setResidentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form state
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0])
  const [hoursTeaching, setHoursTeaching] = useState('')
  const [hoursObservation, setHoursObservation] = useState('')
  const [lessonsGiven, setLessonsGiven] = useState('')
  const [observationsMade, setObservationsMade] = useState('')
  const [reflection, setReflection] = useState('')
  const [questions, setQuestions] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', profile!.id)
        .single()

      if (!resident) { setLoading(false); return }
      setResidentId(resident.id)

      const { data } = await supabase
        .from('residency_practicum_logs')
        .select('*')
        .eq('resident_id', resident.id)
        .is('deleted_at', null)
        .order('log_date', { ascending: false })

      if (data) setLogs(data)
      setLoading(false)
    }
    load()
  }, [profile])

  const totalTeaching = logs.reduce((s, l) => s + Number(l.hours_teaching), 0)
  const totalObservation = logs.reduce((s, l) => s + Number(l.hours_observation), 0)
  const totalLessons = logs.reduce((s, l) => s + l.lessons_given, 0)
  const totalObservationsMade = logs.reduce((s, l) => s + l.observations_made, 0)
  const teachingPct = Math.min(100, (totalTeaching / TEACHING_TARGET) * 100)
  const observationPct = Math.min(100, (totalObservation / OBSERVATION_TARGET) * 100)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!residentId) return
    setSaving(true)

    const { error } = await supabase.from('residency_practicum_logs').upsert({
      resident_id: residentId,
      log_date: logDate,
      hours_teaching: parseFloat(hoursTeaching) || 0,
      hours_observation: parseFloat(hoursObservation) || 0,
      lessons_given: parseInt(lessonsGiven) || 0,
      observations_made: parseInt(observationsMade) || 0,
      reflection: reflection || null,
      questions: questions || null,
    }, { onConflict: 'resident_id,log_date' })

    if (!error) {
      // Reload
      const { data } = await supabase
        .from('residency_practicum_logs')
        .select('*')
        .eq('resident_id', residentId)
        .is('deleted_at', null)
        .order('log_date', { ascending: false })
      if (data) setLogs(data)
      setShowForm(false)
      setHoursTeaching('')
      setHoursObservation('')
      setLessonsGiven('')
      setObservationsMade('')
      setReflection('')
      setQuestions('')
    }
    setSaving(false)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Practicum Hours</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Track your daily teaching and observation hours toward MACTE requirements.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showForm ? 'Cancel' : 'Log Hours'}
        </button>
      </div>

      {/* Progress bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="r-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Teaching Hours</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
              {totalTeaching.toFixed(1)} / {TEACHING_TARGET}
            </span>
          </div>
          <div style={{ height: '8px', background: 'var(--r-border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${teachingPct}%`,
              background: teachingPct >= 100 ? 'var(--r-success)' : 'var(--r-navy)',
              borderRadius: '4px',
              transition: 'width 0.3s',
            }} />
          </div>
          <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
            {teachingPct >= 100 ? 'Requirement met!' : `${(TEACHING_TARGET - totalTeaching).toFixed(1)} hours remaining`}
          </p>
        </div>

        <div className="r-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Observation Hours</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
              {totalObservation.toFixed(1)} / {OBSERVATION_TARGET}
            </span>
          </div>
          <div style={{ height: '8px', background: 'var(--r-border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${observationPct}%`,
              background: observationPct >= 100 ? 'var(--r-success)' : 'var(--r-info)',
              borderRadius: '4px',
              transition: 'width 0.3s',
            }} />
          </div>
          <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
            {observationPct >= 100 ? 'Requirement met!' : `${(OBSERVATION_TARGET - totalObservation).toFixed(1)} hours remaining`}
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Days Logged', value: logs.length },
          { label: 'Lessons Given', value: totalLessons },
          { label: 'Observations Made', value: totalObservationsMade },
          { label: 'Days Verified', value: logs.filter(l => l.verified_at).length },
        ].map(s => (
          <div key={s.label} className="r-card" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--r-navy)', marginBottom: '0.125rem' }}>{s.value}</p>
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Log entry form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Daily Practicum Log</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Date</label>
              <input type="date" className="r-input" value={logDate} onChange={e => setLogDate(e.target.value)} required />
            </div>
            <div>
              <label className="r-label">Teaching Hours</label>
              <input type="number" step="0.5" min="0" max="12" className="r-input"
                value={hoursTeaching} onChange={e => setHoursTeaching(e.target.value)}
                placeholder="0.0" />
            </div>
            <div>
              <label className="r-label">Observation Hours</label>
              <input type="number" step="0.5" min="0" max="12" className="r-input"
                value={hoursObservation} onChange={e => setHoursObservation(e.target.value)}
                placeholder="0.0" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Lessons Given</label>
              <input type="number" min="0" className="r-input"
                value={lessonsGiven} onChange={e => setLessonsGiven(e.target.value)}
                placeholder="0" />
            </div>
            <div>
              <label className="r-label">Observations Made</label>
              <input type="number" min="0" className="r-input"
                value={observationsMade} onChange={e => setObservationsMade(e.target.value)}
                placeholder="0" />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Reflection</label>
            <textarea className="r-textarea" value={reflection} onChange={e => setReflection(e.target.value)}
              placeholder="What did you learn today? What went well? What would you do differently?"
              style={{ minHeight: '80px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Questions for Cohort Guide</label>
            <textarea className="r-textarea" value={questions} onChange={e => setQuestions(e.target.value)}
              placeholder="Any questions or areas you'd like to discuss with your Cohort Guide?"
              style={{ minHeight: '60px' }} />
          </div>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Saving...' : 'Save Log Entry'}
          </button>
        </form>
      )}

      {/* Log history */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Log History</h2>
        {logs.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No practicum hours logged yet. Click "Log Hours" to start tracking.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {logs.map(l => (
              <div key={l.id} style={{
                padding: '0.625rem 0.875rem',
                background: 'var(--r-cream)',
                borderRadius: '6px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {new Date(l.log_date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--r-navy)', fontWeight: 600 }}>
                      {Number(l.hours_teaching).toFixed(1)}h teaching
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--r-info)', fontWeight: 600 }}>
                      {Number(l.hours_observation).toFixed(1)}h observation
                    </span>
                    {l.verified_at && (
                      <span style={{ fontSize: '0.625rem', padding: '0.125rem 0.5rem', background: 'var(--r-success-light)', color: 'var(--r-success)', borderRadius: '9999px', fontWeight: 600 }}>
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                  {l.lessons_given > 0 && <span>{l.lessons_given} lesson{l.lessons_given !== 1 ? 's' : ''} given</span>}
                  {l.observations_made > 0 && <span>{l.observations_made} observation{l.observations_made !== 1 ? 's' : ''} made</span>}
                </div>
                {l.reflection && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginTop: '0.375rem', lineHeight: 1.4 }}>
                    {l.reflection.length > 150 ? l.reflection.slice(0, 150) + '...' : l.reflection}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

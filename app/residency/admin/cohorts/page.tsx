'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

interface Cohort {
  id: string
  name: string
  track: string
  start_date: string
  status: string
  instructor_id: string | null
  created_at: string
}

export default function CohortsPage() {
  const [cohorts, setCohorts] = useState<Cohort[]>([])
  const [instructors, setInstructors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', track: 'primary', start_date: '' })
  const [preview, setPreview] = useState<any>(null)

  useEffect(() => { load() }, [])

  async function load() {
    const [cohortRes, instrRes] = await Promise.all([
      supabase.from('residency_cohorts').select('*').is('deleted_at', null).order('created_at', { ascending: false }),
      supabase.from('residency_profiles').select('id, first_name, last_name').eq('role', 'instructor'),
    ])
    setCohorts(cohortRes.data || [])
    setInstructors(instrRes.data || [])
    setLoading(false)
  }

  function generatePreview() {
    if (!form.start_date) return
    const start = new Date(form.start_date)
    const dayOfWeek = start.getUTCDay()
    const adjusted = new Date(start)
    if (dayOfWeek !== 0) adjusted.setDate(start.getDate() + (7 - dayOfWeek))
    const totalWeeks = form.track === 'primary' ? 36 : 48
    const weeks = []
    for (let w = 0; w < totalWeeks; w++) {
      const unlock = new Date(adjusted)
      unlock.setDate(adjusted.getDate() + w * 7)
      const lock = new Date(unlock)
      lock.setDate(unlock.getDate() + 6)
      weeks.push({
        week: w + 1,
        unlock: unlock.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        lock: lock.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      })
    }
    const endDate = new Date(adjusted)
    endDate.setDate(adjusted.getDate() + (totalWeeks - 1) * 7 + 6)
    setPreview({
      weeks,
      endDate: endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      totalWeeks,
      adjusted: dayOfWeek !== 0,
      adjustedDate: adjusted.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    })
  }

  async function handleCreate() {
    setCreating(true)
    try {
      const res = await fetch('/api/residency/cohorts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await res.json()
      if (res.ok) {
        setShowForm(false)
        setForm({ name: '', track: 'primary', start_date: '' })
        setPreview(null)
        load()
        const adj = result.start_adjusted ? ` Start date adjusted to ${result.adjusted_start_date} (nearest Sunday).` : ''
        alert(`Cohort created with ${result.bundles_created} bundles and ${result.lessons_linked} lesson links.${adj}`)
      } else {
        alert('Error: ' + result.error)
      }
    } finally {
      setCreating(false)
    }
  }

  async function activateCohort(id: string) {
    await supabase.from('residency_cohorts').update({ status: 'active', updated_at: new Date().toISOString() }).eq('id', id)
    load()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Cohorts</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Create and manage cohorts with auto-generated bundle calendars.
          </p>
        </div>
        <button className="r-btn r-btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Cohort'}
        </button>
      </div>

      {showForm && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Create New Cohort</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Cohort Name</label>
              <input
                className="r-input"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Fall 2026 Primary"
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Track</label>
              <select className="r-input" value={form.track} onChange={e => setForm({ ...form, track: e.target.value })}>
                <option value="primary">Primary (9 months, 36 weeks)</option>
                <option value="elementary">Elementary (12 months, 48 weeks)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Start Date (Sunday)</label>
              <input
                className="r-input"
                type="date"
                value={form.start_date}
                onChange={e => {
                  setForm({ ...form, start_date: e.target.value })
                  setPreview(null)
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <button className="r-btn" onClick={generatePreview} disabled={!form.start_date}>
              Preview Calendar
            </button>
            <button
              className="r-btn r-btn-primary"
              onClick={handleCreate}
              disabled={creating || !form.name || !form.start_date}
            >
              {creating ? 'Generating Bundles...' : 'Create Cohort & Generate Bundles'}
            </button>
          </div>

          {preview && (
            <div style={{ background: 'var(--r-bg-muted)', borderRadius: '8px', padding: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
              {preview.adjusted && (
                <p style={{ fontSize: '0.75rem', color: 'var(--r-feedback-color)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Start date adjusted to {preview.adjustedDate} (nearest Sunday)
                </p>
              )}
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {preview.totalWeeks} weeks (Sun&ndash;Sat) through {preview.endDate}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.25rem', fontSize: '0.6875rem' }}>
                {preview.weeks.map((w: any) => (
                  <div key={w.week} style={{ padding: '0.25rem 0.5rem', background: 'white', borderRadius: '4px' }}>
                    <strong>Week {w.week}</strong>
                    <div style={{ color: 'var(--r-text-muted)' }}>{w.unlock} &ndash; {w.lock}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Existing cohorts */}
      {cohorts.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--r-text-muted)' }}>No cohorts yet. Create your first cohort above.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {cohorts.map(c => {
            const assignedInstr = instructors.find(i => i.id === c.instructor_id)
            return (
              <div key={c.id} className="r-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{c.name}</h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                      <span style={{ textTransform: 'capitalize' }}>{c.track} Track</span>
                      <span>Starts {new Date(c.start_date).toLocaleDateString()}</span>
                      <span style={{
                        fontWeight: 600,
                        color: c.status === 'active' ? 'var(--r-success)' : c.status === 'draft' ? 'var(--r-feedback-color)' : 'var(--r-text-muted)',
                      }}>
                        {c.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {c.status === 'draft' && (
                      <button className="r-btn" style={{ fontSize: '0.75rem' }} onClick={() => activateCohort(c.id)}>
                        Activate
                      </button>
                    )}
                    <Link href={`/residency/admin/cohorts/${c.id}/calendar`} className="r-btn r-btn-primary" style={{ fontSize: '0.75rem', textDecoration: 'none' }}>
                      View Calendar
                    </Link>
                  </div>
                </div>
                {/* Instructor assignment */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--r-border)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)' }}>Instructor:</span>
                  <select
                    className="r-input"
                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.5rem', width: 'auto', minWidth: '180px' }}
                    value={c.instructor_id || ''}
                    onChange={async (e) => {
                      const val = e.target.value || null
                      await supabase.from('residency_cohorts').update({ instructor_id: val, updated_at: new Date().toISOString() }).eq('id', c.id)
                      load()
                    }}
                  >
                    <option value="">Unassigned</option>
                    {instructors.map(i => (
                      <option key={i.id} value={i.id}>{i.first_name} {i.last_name}</option>
                    ))}
                  </select>
                  {assignedInstr && (
                    <span style={{ fontSize: '0.6875rem', color: 'var(--r-success)' }}>
                      {assignedInstr.first_name} {assignedInstr.last_name}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

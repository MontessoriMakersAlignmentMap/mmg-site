'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

export default function SiteMentorCheckinsPage() {
  const { profile } = useResidencyAuth(['site_mentor'])
  const [checkins, setCheckins] = useState<any[]>([])
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formResident, setFormResident] = useState('')
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0])
  const [formNotes, setFormNotes] = useState('')
  const [formProgress, setFormProgress] = useState('')
  const [formConcerns, setFormConcerns] = useState('')
  const [formActions, setFormActions] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      const [{ data: chk }, { data: assign }] = await Promise.all([
        supabase.from('residency_site_mentor_checkins')
          .select('*, resident:residency_residents(profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name))')
          .eq('site_mentor_profile_id', profile!.id)
          .order('checkin_date', { ascending: false }),
        supabase.from('residency_site_mentor_assignments')
          .select('resident_id, resident:residency_residents(id, mentor_id, profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name))')
          .eq('site_mentor_profile_id', profile!.id)
          .eq('status', 'active'),
      ])
      if (chk) setCheckins(chk)
      if (assign) setAssignments(assign)
      setLoading(false)
    }
    load()
  }, [profile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!profile || !formResident) return
    setSaving(true)

    const assignment = assignments.find(a => a.resident_id === formResident)
    const cohortGuideId = (assignment?.resident as any)?.mentor_id

    await supabase.from('residency_site_mentor_checkins').insert({
      site_mentor_profile_id: profile.id,
      cohort_guide_id: cohortGuideId || profile.id,
      resident_id: formResident,
      checkin_date: formDate,
      notes: formNotes || null,
      resident_progress_summary: formProgress || null,
      concerns: formConcerns || null,
      action_items: formActions || null,
    })

    const { data } = await supabase.from('residency_site_mentor_checkins')
      .select('*, resident:residency_residents(profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name))')
      .eq('site_mentor_profile_id', profile.id)
      .order('checkin_date', { ascending: false })
    if (data) setCheckins(data)

    setShowForm(false)
    setFormNotes(''); setFormProgress(''); setFormConcerns(''); setFormActions('')
    setSaving(false)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <Link href="/residency/site-mentor" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Check-Ins</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Log your monthly check-ins with the Cohort Guide about resident progress.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showForm ? 'Cancel' : 'Log Check-In'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>New Check-In</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Resident</label>
              <select className="r-input" value={formResident} onChange={e => setFormResident(e.target.value)} required>
                <option value="">Select resident...</option>
                {assignments.map((a: any) => (
                  <option key={a.resident_id} value={a.resident_id}>
                    {a.resident?.profile?.first_name} {a.resident?.profile?.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">Check-In Date</label>
              <input type="date" className="r-input" value={formDate} onChange={e => setFormDate(e.target.value)} required />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Progress Summary</label>
            <textarea className="r-textarea" value={formProgress} onChange={e => setFormProgress(e.target.value)}
              style={{ minHeight: '80px' }}
              placeholder="How is the resident progressing in the classroom?" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Concerns</label>
            <textarea className="r-textarea" value={formConcerns} onChange={e => setFormConcerns(e.target.value)}
              style={{ minHeight: '60px' }}
              placeholder="Any concerns to discuss with the Cohort Guide?" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Action Items</label>
            <textarea className="r-textarea" value={formActions} onChange={e => setFormActions(e.target.value)}
              style={{ minHeight: '60px' }}
              placeholder="What was decided? Any follow-up actions?" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Additional Notes</label>
            <textarea className="r-textarea" value={formNotes} onChange={e => setFormNotes(e.target.value)}
              style={{ minHeight: '60px' }}
              placeholder="Anything else to record..." />
          </div>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Saving...' : 'Save Check-In'}
          </button>
        </form>
      )}

      {checkins.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {checkins.map(c => (
            <div key={c.id} className="r-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                    {c.resident?.profile?.first_name} {c.resident?.profile?.last_name}
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                    {new Date(c.checkin_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              {c.resident_progress_summary && (
                <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>Progress: </strong>
                  {c.resident_progress_summary}
                </p>
              )}
              {c.concerns && (
                <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, marginBottom: '0.5rem', color: 'var(--r-error)' }}>
                  <strong style={{ fontSize: '0.6875rem' }}>Concerns: </strong>
                  {c.concerns}
                </p>
              )}
              {c.action_items && (
                <p style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
                  <strong style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>Actions: </strong>
                  {c.action_items}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="r-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--r-text-muted)' }}>No check-ins logged yet.</p>
        </div>
      )}
    </div>
  )
}

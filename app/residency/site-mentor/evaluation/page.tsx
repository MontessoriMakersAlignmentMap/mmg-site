'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

const READINESS_OPTIONS = [
  { value: 'ready', label: 'Ready for Independent Teaching', description: 'Demonstrates consistent competence across all areas.' },
  { value: 'ready_with_support', label: 'Ready with Additional Support', description: 'Competent in most areas but would benefit from continued mentorship.' },
  { value: 'not_ready', label: 'Not Yet Ready', description: 'Significant areas still need development before independent practice.' },
]

export default function SiteMentorEvaluationPage() {
  const { profile } = useResidencyAuth(['site_mentor'])
  const [assignments, setAssignments] = useState<any[]>([])
  const [evaluations, setEvaluations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formResident, setFormResident] = useState('')
  const [formYear, setFormYear] = useState('2026-2027')
  const [formReadiness, setFormReadiness] = useState('')
  const [formStrengths, setFormStrengths] = useState('')
  const [formGrowth, setFormGrowth] = useState('')
  const [formRecommendation, setFormRecommendation] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      const [{ data: assign }, { data: evals }] = await Promise.all([
        supabase.from('residency_site_mentor_assignments')
          .select('resident_id, resident:residency_residents(profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name))')
          .eq('site_mentor_profile_id', profile!.id)
          .eq('status', 'active'),
        supabase.from('residency_site_mentor_evaluations')
          .select('*, resident:residency_residents(profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name))')
          .eq('site_mentor_profile_id', profile!.id)
          .order('created_at', { ascending: false }),
      ])
      if (assign) setAssignments(assign)
      if (evals) setEvaluations(evals)
      setLoading(false)
    }
    load()
  }, [profile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!profile || !formResident || !formReadiness) return
    setSaving(true)

    await supabase.from('residency_site_mentor_evaluations').insert({
      site_mentor_profile_id: profile.id,
      resident_id: formResident,
      academic_year: formYear,
      classroom_readiness: formReadiness,
      strengths: formStrengths || null,
      areas_for_growth: formGrowth || null,
      recommendation: formRecommendation || null,
      submitted_at: new Date().toISOString(),
    })

    const { data } = await supabase.from('residency_site_mentor_evaluations')
      .select('*, resident:residency_residents(profile:residency_profiles!residency_residents_profile_id_fkey(first_name, last_name))')
      .eq('site_mentor_profile_id', profile.id)
      .order('created_at', { ascending: false })
    if (data) setEvaluations(data)

    setShowForm(false)
    setFormStrengths(''); setFormGrowth(''); setFormRecommendation(''); setFormReadiness('')
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
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Final Evaluation</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Submit your end-of-year assessment of the resident's readiness for independent teaching.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showForm ? 'Cancel' : 'New Evaluation'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="r-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
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
              <label className="r-label">Academic Year</label>
              <input type="text" className="r-input" value={formYear} onChange={e => setFormYear(e.target.value)} required />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="r-label">Classroom Readiness</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {READINESS_OPTIONS.map(opt => (
                <label key={opt.value} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  padding: '1rem', borderRadius: '8px', cursor: 'pointer',
                  background: formReadiness === opt.value ? 'var(--r-navy)' : 'var(--r-cream)',
                  color: formReadiness === opt.value ? 'white' : 'inherit',
                  border: '1px solid ' + (formReadiness === opt.value ? 'var(--r-navy)' : 'var(--r-border)'),
                }}>
                  <input type="radio" name="readiness" value={opt.value}
                    checked={formReadiness === opt.value}
                    onChange={e => setFormReadiness(e.target.value)}
                    style={{ marginTop: '0.125rem' }} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.125rem' }}>{opt.label}</p>
                    <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>{opt.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Strengths</label>
            <textarea className="r-textarea" value={formStrengths} onChange={e => setFormStrengths(e.target.value)}
              style={{ minHeight: '120px' }} required
              placeholder="What are this resident's greatest strengths as a developing Montessori educator?" />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Areas for Growth</label>
            <textarea className="r-textarea" value={formGrowth} onChange={e => setFormGrowth(e.target.value)}
              style={{ minHeight: '120px' }} required
              placeholder="What areas still need development? Be specific and constructive." />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Recommendation</label>
            <textarea className="r-textarea" value={formRecommendation} onChange={e => setFormRecommendation(e.target.value)}
              style={{ minHeight: '100px' }}
              placeholder="Any additional recommendations for the resident or program..." />
          </div>

          <button type="submit" className="r-btn r-btn-primary" disabled={saving || !formReadiness} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Submitting...' : 'Submit Evaluation'}
          </button>
        </form>
      )}

      {evaluations.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {evaluations.map(ev => (
            <div key={ev.id} className="r-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '1rem' }}>
                    {ev.resident?.profile?.first_name} {ev.resident?.profile?.last_name}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>{ev.academic_year}</p>
                </div>
                <span style={{
                  fontSize: '0.6875rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: 600,
                  background: ev.classroom_readiness === 'ready' ? 'var(--r-success-light)' : ev.classroom_readiness === 'ready_with_support' ? '#E3F2FD' : 'var(--r-error-light)',
                  color: ev.classroom_readiness === 'ready' ? 'var(--r-success)' : ev.classroom_readiness === 'ready_with_support' ? '#1565C0' : 'var(--r-error)',
                }}>
                  {READINESS_OPTIONS.find(o => o.value === ev.classroom_readiness)?.label ?? ev.classroom_readiness}
                </span>
              </div>
              {ev.strengths && <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, marginBottom: '0.5rem' }}><strong>Strengths:</strong> {ev.strengths}</p>}
              {ev.areas_for_growth && <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, marginBottom: '0.5rem' }}><strong>Growth:</strong> {ev.areas_for_growth}</p>}
              {ev.recommendation && <p style={{ fontSize: '0.8125rem', lineHeight: 1.5 }}><strong>Recommendation:</strong> {ev.recommendation}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="r-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--r-text-muted)' }}>No evaluations submitted yet.</p>
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'

const EVAL_AREAS = [
  { key: 'lesson_planning_score', label: 'Lesson Planning' },
  { key: 'classroom_management_score', label: 'Classroom Management' },
  { key: 'child_observation_score', label: 'Child Observation' },
  { key: 'environment_preparation_score', label: 'Environment Preparation' },
  { key: 'professional_conduct_score', label: 'Professional Conduct' },
  { key: 'communication_score', label: 'Communication' },
  { key: 'growth_mindset_score', label: 'Growth Mindset' },
  { key: 'equity_practice_score', label: 'Equity in Practice' },
]

const RECOMMENDATION_OPTIONS = [
  { value: 'ready', label: 'Ready for Credential', color: 'var(--r-success)' },
  { value: 'ready_with_conditions', label: 'Ready with Conditions', color: 'var(--r-info)' },
  { value: 'needs_additional_support', label: 'Needs Additional Support', color: 'var(--r-feedback-color)' },
  { value: 'not_recommended', label: 'Not Recommended', color: '#c62828' },
]

export default function MentorEvaluationsPage() {
  const { profile } = useResidencyAuth(['mentor'])
  const [residents, setResidents] = useState<any[]>([])
  const [evaluations, setEvaluations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form state
  const [selectedResident, setSelectedResident] = useState('')
  const [evalType, setEvalType] = useState<'mid_year' | 'end_of_year'>('mid_year')
  const [academicYear, setAcademicYear] = useState('2025-2026')
  const [scores, setScores] = useState<Record<string, string>>({})
  const [strengths, setStrengths] = useState('')
  const [areasForGrowth, setAreasForGrowth] = useState('')
  const [recommendations, setRecommendations] = useState('')
  const [overallAssessment, setOverallAssessment] = useState('')
  const [finalRec, setFinalRec] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      const [{ data: r }, { data: e }] = await Promise.all([
        supabase.from('residency_residents')
          .select('*, profile:residency_profiles(first_name, last_name)')
          .eq('mentor_id', profile!.id)
          .in('status', ['active', 'enrolled']),
        supabase.from('residency_mentor_evaluations')
          .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name))')
          .eq('mentor_id', profile!.id)
          .order('created_at', { ascending: false }),
      ])
      if (r) setResidents(r)
      if (e) setEvaluations(e)
      setLoading(false)
    }
    load()
  }, [profile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return
    setSaving(true)

    const record: any = {
      resident_id: selectedResident,
      mentor_id: profile.id,
      evaluation_type: evalType,
      academic_year: academicYear,
      strengths: strengths || null,
      areas_for_growth: areasForGrowth || null,
      recommendations: recommendations || null,
      overall_assessment: overallAssessment || null,
      submitted_at: new Date().toISOString(),
    }

    EVAL_AREAS.forEach(a => {
      record[a.key] = scores[a.key] ? parseFloat(scores[a.key]) : null
    })

    if (evalType === 'end_of_year' && finalRec) {
      record.final_recommendation = finalRec
    }

    await supabase.from('residency_mentor_evaluations').upsert(record, {
      onConflict: 'resident_id,evaluation_type,academic_year',
    })

    // Notify resident
    const resident = residents.find(r => r.id === selectedResident)
    if (resident) {
      await supabase.from('residency_notifications').insert({
        recipient_id: resident.profile_id,
        type: 'evaluation',
        title: `${evalType === 'mid_year' ? 'Mid-Year' : 'End-of-Year'} Evaluation Submitted`,
        message: 'Your Cohort Guide has submitted an evaluation. View it in your portfolio.',
        link: '/residency/portal/portfolio',
      })
    }

    setShowForm(false)
    setSelectedResident('')
    setScores({})
    setStrengths('')
    setAreasForGrowth('')
    setRecommendations('')
    setOverallAssessment('')
    setFinalRec('')
    setSaving(false)
    setLoading(true)
    // Reload
    const { data: ev } = await supabase.from('residency_mentor_evaluations')
      .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name))')
      .eq('mentor_id', profile.id)
      .order('created_at', { ascending: false })
    if (ev) setEvaluations(ev)
    setLoading(false)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Evaluations</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Submit mid-year and end-of-year evaluations for your assigned residents.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showForm ? 'Cancel' : 'New Evaluation'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Cohort Guide Evaluation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Resident</label>
              <select className="r-input" value={selectedResident} onChange={e => setSelectedResident(e.target.value)} required>
                <option value="">Select...</option>
                {residents.map(r => (
                  <option key={r.id} value={r.id}>{r.profile?.first_name} {r.profile?.last_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">Evaluation Type</label>
              <select className="r-input" value={evalType} onChange={e => setEvalType(e.target.value as any)}>
                <option value="mid_year">Mid-Year</option>
                <option value="end_of_year">End-of-Year</option>
              </select>
            </div>
            <div>
              <label className="r-label">Academic Year</label>
              <input className="r-input" value={academicYear} onChange={e => setAcademicYear(e.target.value)} required />
            </div>
          </div>

          <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.75rem' }}>Performance Scores (1.0 – 4.0)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {EVAL_AREAS.map(a => (
              <div key={a.key}>
                <label className="r-label" style={{ fontSize: '0.6875rem' }}>{a.label}</label>
                <input type="number" step="0.25" min="1" max="4" className="r-input"
                  value={scores[a.key] ?? ''} onChange={e => setScores(prev => ({ ...prev, [a.key]: e.target.value }))}
                  placeholder="—" />
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Strengths</label>
              <textarea className="r-textarea" value={strengths} onChange={e => setStrengths(e.target.value)}
                placeholder="Areas of notable strength..." style={{ minHeight: '80px' }} />
            </div>
            <div>
              <label className="r-label">Areas for Growth</label>
              <textarea className="r-textarea" value={areasForGrowth} onChange={e => setAreasForGrowth(e.target.value)}
                placeholder="Areas needing development..." style={{ minHeight: '80px' }} />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Recommendations</label>
            <textarea className="r-textarea" value={recommendations} onChange={e => setRecommendations(e.target.value)}
              placeholder="Specific recommendations for continued growth..." style={{ minHeight: '60px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Overall Assessment</label>
            <textarea className="r-textarea" value={overallAssessment} onChange={e => setOverallAssessment(e.target.value)}
              placeholder="Overall summary of candidate's progress and readiness..." style={{ minHeight: '80px' }} />
          </div>

          {evalType === 'end_of_year' && (
            <div style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--r-muted-light)', borderRadius: '8px' }}>
              <label className="r-label">Final Recommendation</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                {RECOMMENDATION_OPTIONS.map(opt => (
                  <button key={opt.value} type="button" onClick={() => setFinalRec(opt.value)} style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    border: finalRec === opt.value ? `2px solid ${opt.color}` : '1px solid var(--r-border)',
                    background: finalRec === opt.value ? `${opt.color}15` : 'white',
                    color: opt.color,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Submitting...' : 'Submit Evaluation'}
          </button>
        </form>
      )}

      {/* Previous evaluations */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Submitted Evaluations</h2>
        {evaluations.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No evaluations submitted yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {evaluations.map(ev => {
              const scoreKeys = EVAL_AREAS.map(a => a.key)
              const validScores = scoreKeys.filter(k => ev[k] != null).map(k => Number(ev[k]))
              const avgScore = validScores.length > 0 ? validScores.reduce((s, v) => s + v, 0) / validScores.length : null
              return (
                <div key={ev.id} style={{ padding: '0.75rem 0.875rem', background: 'var(--r-cream)', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        {ev.resident?.profile?.first_name} {ev.resident?.profile?.last_name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginLeft: '0.5rem' }}>
                        {ev.evaluation_type === 'mid_year' ? 'Mid-Year' : 'End-of-Year'} — {ev.academic_year}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {avgScore != null && (
                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--r-navy)' }}>{avgScore.toFixed(2)}</span>
                      )}
                      {ev.final_recommendation && (
                        <span style={{
                          padding: '0.125rem 0.5rem', borderRadius: '9999px', fontSize: '0.625rem', fontWeight: 600,
                          background: ev.final_recommendation === 'ready' ? 'var(--r-success-light)' : 'var(--r-feedback-bg)',
                          color: ev.final_recommendation === 'ready' ? 'var(--r-success)' : 'var(--r-feedback-color)',
                        }}>
                          {ev.final_recommendation.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

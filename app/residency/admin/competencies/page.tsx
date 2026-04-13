'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const MACTE_COMPETENCIES = [
  { key: 'philosophy_theory', label: 'Montessori Philosophy & Theory' },
  { key: 'child_development', label: 'Child Development & Psychology' },
  { key: 'observation_assessment', label: 'Observation & Assessment' },
  { key: 'classroom_leadership', label: 'Classroom Leadership & Management' },
  { key: 'curriculum_implementation', label: 'Curriculum Design & Implementation' },
  { key: 'family_community', label: 'Family & Community Partnerships' },
  { key: 'professional_development', label: 'Professional Development & Ethics' },
  { key: 'equity_inclusion', label: 'Equity, Diversity & Inclusion' },
]

export default function CompetenciesPage() {
  const [residents, setResidents] = useState<any[]>([])
  const [signoffs, setSignoffs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Sign-off form
  const [showForm, setShowForm] = useState(false)
  const [selectedResident, setSelectedResident] = useState('')
  const [selectedCompetency, setSelectedCompetency] = useState('')
  const [rubricScore, setRubricScore] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  async function loadData() {
    const [{ data: r }, { data: s }] = await Promise.all([
      supabase.from('residency_residents')
        .select('*, profile:residency_profiles(first_name, last_name)')
        .in('status', ['active', 'enrolled'])
        .order('created_at'),
      supabase.from('residency_competency_signoffs')
        .select('*, resident:residency_residents(profile:residency_profiles(first_name, last_name)), signer:residency_profiles!residency_competency_signoffs_signed_off_by_fkey(first_name, last_name)')
        .order('created_at', { ascending: false }),
    ])
    if (r) setResidents(r)
    if (s) setSignoffs(s)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  async function signOff(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }

    const score = parseFloat(rubricScore)
    const met = score >= 3.5

    await supabase.from('residency_competency_signoffs').upsert({
      resident_id: selectedResident,
      competency_area: selectedCompetency,
      met,
      rubric_score: score,
      signed_off_by: user.id,
      signed_off_at: met ? new Date().toISOString() : null,
      notes: notes || null,
    }, { onConflict: 'resident_id,competency_area' })

    // Notify resident
    const resident = residents.find(r => r.id === selectedResident)
    const compLabel = MACTE_COMPETENCIES.find(c => c.key === selectedCompetency)?.label ?? selectedCompetency
    if (resident && met) {
      await supabase.from('residency_notifications').insert({
        recipient_id: resident.profile_id,
        type: 'competency_signoff',
        title: `Competency Met: ${compLabel}`,
        message: `Score: ${score.toFixed(2)}. ${notes || ''}`,
        link: '/residency/portal/portfolio',
      })
    }

    setShowForm(false)
    setSelectedResident('')
    setSelectedCompetency('')
    setRubricScore('')
    setNotes('')
    setSaving(false)
    setLoading(true)
    loadData()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  // Build matrix: resident x competency
  const signoffMap = new Map<string, any>()
  signoffs.forEach(s => signoffMap.set(`${s.resident_id}:${s.competency_area}`, s))

  const totalMet = signoffs.filter(s => s.met).length
  const totalPossible = residents.length * MACTE_COMPETENCIES.length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Competency Sign-Off</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            8 MACTE competency areas. Met at rubric score 3.5+.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showForm ? 'Cancel' : 'Record Sign-Off'}
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="r-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{totalMet}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Competencies Met</p>
        </div>
        <div className="r-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>{totalPossible - totalMet}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Remaining</p>
        </div>
        <div className="r-card" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--r-navy)' }}>
            {residents.filter(r => {
              const met = MACTE_COMPETENCIES.every(c => signoffMap.get(`${r.id}:${c.key}`)?.met)
              return met
            }).length}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Fully Competent Candidates</p>
        </div>
      </div>

      {/* Sign-off form */}
      {showForm && (
        <form onSubmit={signOff} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Record Competency Sign-Off</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Resident</label>
              <select className="r-input" value={selectedResident} onChange={e => setSelectedResident(e.target.value)} required>
                <option value="">Select resident...</option>
                {residents.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.profile?.first_name} {r.profile?.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">Competency Area</label>
              <select className="r-input" value={selectedCompetency} onChange={e => setSelectedCompetency(e.target.value)} required>
                <option value="">Select competency...</option>
                {MACTE_COMPETENCIES.map(c => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Rubric Score</label>
              <input type="number" step="0.01" min="1" max="4" className="r-input"
                value={rubricScore} onChange={e => setRubricScore(e.target.value)}
                placeholder="1.00 — 4.00" required />
            </div>
            <div>
              <label className="r-label">Notes</label>
              <input className="r-input" value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Evidence or comments..." />
            </div>
          </div>
          {rubricScore && (
            <p style={{
              fontSize: '0.75rem',
              padding: '0.5rem',
              borderRadius: '6px',
              marginBottom: '1rem',
              background: parseFloat(rubricScore) >= 3.5 ? 'var(--r-success-light)' : 'var(--r-feedback-bg)',
              color: parseFloat(rubricScore) >= 3.5 ? 'var(--r-success)' : 'var(--r-feedback-color)',
            }}>
              {parseFloat(rubricScore) >= 3.5
                ? 'Score meets competency threshold (3.5+). Will be marked as MET.'
                : 'Score below threshold. Will be recorded but NOT marked as met.'}
            </p>
          )}
          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Saving...' : 'Record Sign-Off'}
          </button>
        </form>
      )}

      {/* Competency matrix */}
      <div className="r-card" style={{ overflowX: 'auto' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Competency Matrix</h2>
        {residents.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No active residents.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid var(--r-border)', fontWeight: 600 }}>Candidate</th>
                {MACTE_COMPETENCIES.map(c => (
                  <th key={c.key} style={{
                    textAlign: 'center',
                    padding: '0.5rem 0.25rem',
                    borderBottom: '2px solid var(--r-border)',
                    fontWeight: 600,
                    maxWidth: '80px',
                    fontSize: '0.625rem',
                    lineHeight: 1.2,
                  }}>
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {residents.map(r => (
                <tr key={r.id}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--r-border)', fontWeight: 500 }}>
                    {r.profile?.first_name} {r.profile?.last_name}
                  </td>
                  {MACTE_COMPETENCIES.map(c => {
                    const so = signoffMap.get(`${r.id}:${c.key}`)
                    return (
                      <td key={c.key} style={{ textAlign: 'center', padding: '0.375rem', borderBottom: '1px solid var(--r-border)' }}>
                        {so ? (
                          <span style={{
                            display: 'inline-block',
                            width: '24px',
                            height: '24px',
                            lineHeight: '24px',
                            borderRadius: '50%',
                            fontSize: '0.625rem',
                            fontWeight: 700,
                            background: so.met ? 'var(--r-success-light)' : 'var(--r-feedback-bg)',
                            color: so.met ? 'var(--r-success)' : 'var(--r-feedback-color)',
                          }}>
                            {so.met ? '\u2713' : Number(so.rubric_score).toFixed(1)}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--r-border)' }}>&mdash;</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

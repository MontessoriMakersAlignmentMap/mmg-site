'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'

interface Requirement {
  id: string
  artifact_type: string
  label: string
  description: string | null
  required_count: number
  sort_order: number
}

interface Artifact {
  id: string
  requirement_id: string | null
  artifact_type: string
  title: string
  description: string | null
  file_url: string | null
  file_name: string | null
  status: string
  mentor_feedback: string | null
  created_at: string
}

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  draft: { bg: 'var(--r-muted-light)', color: 'var(--r-muted)', label: 'Draft' },
  submitted: { bg: 'var(--r-info-light)', color: 'var(--r-info)', label: 'Submitted' },
  approved: { bg: 'var(--r-success-light)', color: 'var(--r-success)', label: 'Approved' },
  revision_requested: { bg: 'var(--r-feedback-bg)', color: 'var(--r-feedback-color)', label: 'Revision Needed' },
}

export default function ArtifactsPage() {
  const { profile } = useResidencyAuth(['resident'])
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [artifacts, setArtifacts] = useState<Artifact[]>([])
  const [residentId, setResidentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Upload form
  const [showForm, setShowForm] = useState(false)
  const [selectedReq, setSelectedReq] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

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

      const [{ data: reqs }, { data: arts }] = await Promise.all([
        supabase.from('residency_portfolio_requirements').select('*').order('sort_order'),
        supabase.from('residency_portfolio_artifacts')
          .select('*')
          .eq('resident_id', resident.id)
          .is('deleted_at', null)
          .order('created_at', { ascending: false }),
      ])

      if (reqs) setRequirements(reqs)
      if (arts) setArtifacts(arts)
      setLoading(false)
    }
    load()
  }, [profile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!residentId) return
    setSaving(true)

    const req = requirements.find(r => r.id === selectedReq)

    await supabase.from('residency_portfolio_artifacts').insert({
      resident_id: residentId,
      requirement_id: selectedReq || null,
      artifact_type: req?.artifact_type ?? 'other',
      title,
      description: description || null,
      status: 'draft',
    })

    // Reload artifacts
    const { data } = await supabase
      .from('residency_portfolio_artifacts')
      .select('*')
      .eq('resident_id', residentId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
    if (data) setArtifacts(data)

    setShowForm(false)
    setSelectedReq('')
    setTitle('')
    setDescription('')
    setSaving(false)
  }

  async function submitArtifact(id: string) {
    await supabase.from('residency_portfolio_artifacts').update({ status: 'submitted' }).eq('id', id)
    setArtifacts(prev => prev.map(a => a.id === id ? { ...a, status: 'submitted' } : a))
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  // Calculate completion per requirement
  const completionMap = requirements.map(req => {
    const matching = artifacts.filter(a => a.requirement_id === req.id)
    const approved = matching.filter(a => a.status === 'approved').length
    return { ...req, submitted: matching.length, approved, complete: approved >= req.required_count }
  })

  const totalRequired = requirements.reduce((s, r) => s + r.required_count, 0)
  const totalApproved = completionMap.reduce((s, r) => s + r.approved, 0)
  const overallPct = totalRequired > 0 ? Math.min(100, (totalApproved / totalRequired) * 100) : 0

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Portfolio Artifacts</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Upload and track required portfolio items for MACTE accreditation.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem' }}>
          {showForm ? 'Cancel' : 'Add Artifact'}
        </button>
      </div>

      {/* Overall progress */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Overall Portfolio Completion</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
            {totalApproved} / {totalRequired} items approved
          </span>
        </div>
        <div className="r-progress-track">
          <div className="r-progress-fill" style={{
            width: `${overallPct}%`,
            background: overallPct >= 100 ? 'var(--r-success)' : undefined,
          }} />
        </div>
      </div>

      {/* Add artifact form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Add Portfolio Artifact</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Requirement Category</label>
            <select className="r-input" value={selectedReq} onChange={e => setSelectedReq(e.target.value)} required>
              <option value="">Select category...</option>
              {requirements.map(r => {
                const matching = artifacts.filter(a => a.requirement_id === r.id)
                return (
                  <option key={r.id} value={r.id}>
                    {r.label} ({matching.length}/{r.required_count})
                  </option>
                )
              })}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Title</label>
            <input className="r-input" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Practical Life — Pouring Lesson" required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Description</label>
            <textarea className="r-textarea" value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of this artifact..."
              style={{ minHeight: '80px' }} />
          </div>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving} style={{ fontSize: '0.8125rem' }}>
            {saving ? 'Saving...' : 'Save Artifact'}
          </button>
        </form>
      )}

      {/* Requirement checklist */}
      <div className="r-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Requirements Checklist</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {completionMap.map(req => (
            <div key={req.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 0.875rem',
              background: req.complete ? 'var(--r-success-light)' : 'var(--r-cream)',
              borderRadius: '6px',
              border: req.complete ? '1px solid var(--r-success)' : '1px solid transparent',
            }}>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: req.complete ? 'var(--r-success)' : 'inherit' }}>
                  {req.complete ? '\u2713 ' : ''}{req.label}
                </p>
                {req.description && (
                  <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.125rem' }}>
                    {req.description}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: req.complete ? 'var(--r-success)' : req.submitted > 0 ? 'var(--r-info)' : 'var(--r-text-muted)',
                }}>
                  {req.approved}/{req.required_count} approved
                </span>
                {req.submitted > req.approved && (
                  <span style={{ fontSize: '0.625rem', color: 'var(--r-feedback-color)' }}>
                    ({req.submitted - req.approved} pending)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submitted artifacts */}
      <div className="r-card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Your Artifacts</h2>
        {artifacts.length === 0 ? (
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>No artifacts added yet. Click "Add Artifact" to start building your portfolio.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {artifacts.map(a => {
              const s = STATUS_STYLES[a.status] ?? STATUS_STYLES.draft
              return (
                <div key={a.id} style={{
                  padding: '0.625rem 0.875rem',
                  background: 'var(--r-cream)',
                  borderRadius: '6px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{a.title}</p>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                        {a.artifact_type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        {' — '}{new Date(a.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        background: s.bg,
                        color: s.color,
                      }}>
                        {s.label}
                      </span>
                      {a.status === 'draft' && (
                        <button onClick={() => submitArtifact(a.id)}
                          style={{
                            padding: '0.25rem 0.625rem',
                            borderRadius: '6px',
                            border: '1px solid var(--r-border)',
                            background: 'transparent',
                            fontSize: '0.625rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            color: 'var(--r-navy)',
                          }}>
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                  {a.mentor_feedback && (
                    <div className="r-feedback-block" style={{ marginTop: '0.375rem' }}>
                      <p className="r-feedback-label">Mentor Feedback</p>
                      <p className="r-feedback-text">{a.mentor_feedback}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

export default function CapstonePortalPage() {
  const [residentId, setResidentId] = useState('')
  const [capstone, setCapstone] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    video_url: '',
    reflection: '',
    lesson_title: '',
    lesson_strand: '',
    age_group: '',
  })

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (resident) {
        setResidentId(resident.id)

        const { data: capstones } = await supabase
          .from('residency_capstones')
          .select('*, reviews:residency_capstone_reviews(*, reviewer:residency_profiles(first_name, last_name, role))')
          .eq('resident_id', resident.id)
          .is('deleted_at', null)
          .order('submitted_at', { ascending: false })
          .limit(1)

        if (capstones?.[0]) {
          setCapstone(capstones[0])
          setForm({
            video_url: capstones[0].video_url,
            reflection: capstones[0].reflection,
            lesson_title: capstones[0].lesson_title || '',
            lesson_strand: capstones[0].lesson_strand || '',
            age_group: capstones[0].age_group || '',
          })
        }
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSubmit() {
    if (!form.video_url || !form.reflection) return
    setSubmitting(true)
    setError('')

    try {
      const res = capstone && capstone.status === 'revision_requested'
        ? await fetch('/api/residency/capstones', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'resubmit',
              capstone_id: capstone.id,
              video_url: form.video_url,
              reflection: form.reflection,
            }),
          })
        : await fetch('/api/residency/capstones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resident_id: residentId, ...form }),
          })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Submission failed. Please try again.')
        setSubmitting(false)
        return
      }

      // Reload capstone data
      const { data: updated } = await supabase
        .from('residency_capstones')
        .select('*, reviews:residency_capstone_reviews(reviewer_role, verdict, strengths, growth_areas, practicum_connection, revision_notes, created_at)')
        .eq('resident_id', residentId)
        .maybeSingle()
      if (updated) setCapstone(updated)
    } catch {
      setError('Network error. Please try again.')
    }
    setSubmitting(false)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
    submitted: { label: 'Submitted', color: '#b45309', bg: 'var(--r-warning-light)' },
    in_review: { label: 'In Review', color: '#6b21a8', bg: 'var(--r-purple-light)' },
    revision_requested: { label: 'Revision Requested', color: '#991b1b', bg: 'var(--r-error-light)' },
    approved: { label: 'Approved', color: '#2d6a4f', bg: 'var(--r-success-light)' },
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Capstone Project</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Record a lesson and write a reflection to demonstrate your readiness as a Montessori educator.
      </p>

      {/* Requirements info */}
      <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '3px solid var(--r-gold)' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Capstone Requirements</h2>
        <div style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--r-text-muted)' }}>
          <p><strong style={{ color: 'var(--r-text)' }}>1. Recorded Lesson</strong> — Video of you delivering a Montessori lesson to children (15-30 minutes). Upload to YouTube, Vimeo, or Google Drive and share the link.</p>
          <p><strong style={{ color: 'var(--r-text)' }}>2. Reflection Paper</strong> — A written reflection (500-1000 words) analyzing your lesson delivery, what went well, what you would change, and how it connects to your practicum experience.</p>
        </div>
      </div>

      {!capstone && !showForm && (
        <EmptyState
          title="No capstone submitted yet"
          message="When you're ready, submit your recorded lesson and reflection paper for review."
          action={
            <button className="r-btn r-btn-primary" onClick={() => setShowForm(true)}>
              Begin Capstone Submission
            </button>
          }
        />
      )}

      {(showForm || (capstone?.status === 'revision_requested')) && !capstone?.status?.match(/^(submitted|in_review|approved)$/) && (
        <div className="r-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>
            {capstone?.status === 'revision_requested' ? 'Resubmit Capstone' : 'Submit Capstone'}
          </h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Lesson Title</label>
            <input className="r-input" value={form.lesson_title}
              onChange={e => setForm({ ...form, lesson_title: e.target.value })}
              placeholder="e.g., Introduction to the Binomial Cube" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Strand</label>
              <input className="r-input" value={form.lesson_strand}
                onChange={e => setForm({ ...form, lesson_strand: e.target.value })}
                placeholder="e.g., Sensorial" />
            </div>
            <div>
              <label className="r-label">Age Group</label>
              <input className="r-input" value={form.age_group}
                onChange={e => setForm({ ...form, age_group: e.target.value })}
                placeholder="e.g., 3-6" />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Video URL *</label>
            <input className="r-input" type="url" value={form.video_url}
              onChange={e => setForm({ ...form, video_url: e.target.value })}
              placeholder="YouTube, Vimeo, or Google Drive link" required />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="r-label">Reflection Paper *</label>
            <textarea className="r-textarea" rows={12} value={form.reflection}
              onChange={e => setForm({ ...form, reflection: e.target.value })}
              placeholder="Write your reflection here (500-1000 words)..." required />
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
              {form.reflection.split(/\s+/).filter(Boolean).length} words
            </p>
          </div>

          {error && (
            <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '0.5rem' }}>{error}</p>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="r-btn r-btn-primary" onClick={handleSubmit}
              disabled={submitting || !form.video_url || !form.reflection}>
              {submitting ? 'Submitting...' : capstone ? 'Resubmit Capstone' : 'Submit Capstone'}
            </button>
            {!capstone && (
              <button className="r-btn" onClick={() => setShowForm(false)}>Cancel</button>
            )}
          </div>
        </div>
      )}

      {capstone && capstone.status !== 'revision_requested' && (
        <div>
          <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.125rem', margin: 0 }}>Your Submission</h2>
              <span style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '0.25rem 0.625rem',
                borderRadius: '4px',
                color: statusLabels[capstone.status]?.color,
                background: statusLabels[capstone.status]?.bg,
              }}>
                {statusLabels[capstone.status]?.label}
              </span>
            </div>

            {capstone.lesson_title && (
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--r-navy)', marginBottom: '0.5rem' }}>
                {capstone.lesson_title}
                {capstone.lesson_strand && <span style={{ fontWeight: 400, color: 'var(--r-text-muted)' }}> — {capstone.lesson_strand}</span>}
              </p>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Video</p>
              <a href={capstone.video_url} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--r-navy)', fontWeight: 500, fontSize: '0.875rem' }}>
                {capstone.video_url}
              </a>
            </div>

            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Reflection</p>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{capstone.reflection}</p>
            </div>
          </div>

          {/* Reviews */}
          {capstone.reviews?.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                Reviews ({capstone.reviews.length})
              </h2>
              {capstone.reviews.map((r: any) => (
                <div key={r.id} className="r-card" style={{ padding: '1.25rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      {r.reviewer?.first_name} {r.reviewer?.last_name}
                      <span style={{ fontWeight: 400, color: 'var(--r-text-muted)', marginLeft: '0.375rem' }}>
                        ({r.reviewer_role})
                      </span>
                    </p>
                    <span style={{
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '4px',
                      color: r.verdict === 'approved' ? '#2d6a4f' : '#991b1b',
                      background: r.verdict === 'approved' ? 'var(--r-success-light)' : 'var(--r-error-light)',
                    }}>
                      {r.verdict === 'approved' ? 'Approved' : 'Needs Revision'}
                    </span>
                  </div>
                  {r.strengths && (
                    <div style={{ marginBottom: '0.5rem' }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--r-success)', marginBottom: '0.125rem' }}>Strengths</p>
                      <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>{r.strengths}</p>
                    </div>
                  )}
                  {r.growth_areas && (
                    <div style={{ marginBottom: '0.5rem' }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#b45309', marginBottom: '0.125rem' }}>Growth Areas</p>
                      <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>{r.growth_areas}</p>
                    </div>
                  )}
                  {r.practicum_connection && (
                    <div style={{ marginBottom: '0.5rem' }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--r-navy)', marginBottom: '0.125rem' }}>Practicum Connection</p>
                      <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>{r.practicum_connection}</p>
                    </div>
                  )}
                  {r.revision_notes && (
                    <div>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#991b1b', marginBottom: '0.125rem' }}>Revision Notes</p>
                      <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>{r.revision_notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {capstone?.status === 'revision_requested' && (
        <div>
          {/* Show revision feedback before the resubmit form */}
          {capstone.reviews?.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                Feedback to Address
              </h2>
              {capstone.reviews
                .filter((r: any) => r.verdict === 'revision_needed')
                .map((r: any) => (
                  <div key={r.id} className="r-card" style={{ padding: '1.25rem', marginBottom: '0.75rem', borderLeft: '3px solid #991b1b' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {r.reviewer?.first_name} {r.reviewer?.last_name} ({r.reviewer_role})
                    </p>
                    {r.revision_notes && <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }}>{r.revision_notes}</p>}
                    {r.growth_areas && (
                      <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, marginTop: '0.375rem', color: 'var(--r-text-muted)' }}>
                        Growth areas: {r.growth_areas}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

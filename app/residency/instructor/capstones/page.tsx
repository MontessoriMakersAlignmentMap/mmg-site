'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

export default function InstructorCapstonesPage() {
  const [capstones, setCapstones] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const [reviewerId, setReviewerId] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    verdict: 'approved',
    strengths: '',
    growth_areas: '',
    practicum_connection: '',
    revision_notes: '',
  })

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setReviewerId(user.id)

      const { data } = await supabase
        .from('residency_capstones')
        .select(`
          *,
          resident:residency_residents(
            id,
            profile:residency_profiles(first_name, last_name),
            cohort:residency_cohorts(name, track)
          ),
          reviews:residency_capstone_reviews(*, reviewer:residency_profiles(first_name, last_name, role))
        `)
        .is('deleted_at', null)
        .order('submitted_at', { ascending: false })

      setCapstones(data || [])
      setLoading(false)
    }
    load()
  }, [])

  async function submitReview() {
    if (!selected) return
    setSubmittingReview(true)

    const res = await fetch('/api/residency/capstones', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'review',
        capstone_id: selected.id,
        reviewer_id: reviewerId,
        reviewer_role: 'instructor',
        ...reviewForm,
      }),
    })

    if (res.ok) {
      setSelected(null)
      setReviewForm({ verdict: 'approved', strengths: '', growth_areas: '', practicum_connection: '', revision_notes: '' })
      window.location.reload()
    }
    setSubmittingReview(false)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const needsReview = capstones.filter(c => c.status === 'submitted' || c.status === 'in_review')
  const reviewed = capstones.filter(c => c.status === 'approved' || c.status === 'revision_requested')

  if (selected) {
    const res = selected.resident as any
    return (
      <div>
        <button onClick={() => setSelected(null)}
          style={{ background: 'none', border: 'none', color: 'var(--r-navy)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem', padding: 0 }}>
          &larr; Back to Capstones
        </button>

        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
          {res?.profile?.first_name} {res?.profile?.last_name}
        </h1>
        <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          {res?.cohort?.name} &middot; Submitted {new Date(selected.submitted_at).toLocaleDateString()}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
          <div>
            {/* Submission */}
            <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              {selected.lesson_title && (
                <p style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--r-navy)', marginBottom: '0.75rem' }}>
                  {selected.lesson_title}
                  {selected.lesson_strand && <span style={{ fontWeight: 400, color: 'var(--r-text-muted)' }}> — {selected.lesson_strand}</span>}
                  {selected.age_group && <span style={{ fontWeight: 400, color: 'var(--r-text-muted)' }}> ({selected.age_group})</span>}
                </p>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Video</p>
                <a href={selected.video_url} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--r-navy)', fontWeight: 500, fontSize: '0.875rem' }}>
                  Watch Recording
                </a>
              </div>

              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Reflection</p>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{selected.reflection}</p>
              </div>
            </div>

            {/* Prior reviews */}
            {selected.reviews?.length > 0 && (
              <div>
                <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>
                  Previous Reviews
                </h2>
                {selected.reviews.map((r: any) => (
                  <div key={r.id} className="r-card" style={{ padding: '1rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                        {r.reviewer?.first_name} {r.reviewer?.last_name} ({r.reviewer_role})
                      </p>
                      <span style={{
                        fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase',
                        color: r.verdict === 'approved' ? '#2d6a4f' : '#991b1b',
                      }}>
                        {r.verdict === 'approved' ? 'Approved' : 'Revision Needed'}
                      </span>
                    </div>
                    {r.strengths && <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '0.25rem' }}>Strengths: {r.strengths}</p>}
                    {r.growth_areas && <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '0.25rem' }}>Growth: {r.growth_areas}</p>}
                    {r.revision_notes && <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: '#991b1b' }}>Notes: {r.revision_notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Form */}
          <div className="r-card" style={{ padding: '1.5rem', alignSelf: 'start' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Your Review</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label className="r-label">Verdict</label>
              <select className="r-input" value={reviewForm.verdict}
                onChange={e => setReviewForm({ ...reviewForm, verdict: e.target.value })}>
                <option value="approved">Approve</option>
                <option value="revision_needed">Request Revision</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="r-label">Strengths</label>
              <textarea className="r-textarea" rows={3} value={reviewForm.strengths}
                onChange={e => setReviewForm({ ...reviewForm, strengths: e.target.value })}
                placeholder="What did this resident do well?" />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="r-label">Growth Areas</label>
              <textarea className="r-textarea" rows={3} value={reviewForm.growth_areas}
                onChange={e => setReviewForm({ ...reviewForm, growth_areas: e.target.value })}
                placeholder="Areas for continued development..." />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="r-label">Practicum Connection</label>
              <textarea className="r-textarea" rows={2} value={reviewForm.practicum_connection}
                onChange={e => setReviewForm({ ...reviewForm, practicum_connection: e.target.value })}
                placeholder="How does this connect to practicum experience?" />
            </div>

            {reviewForm.verdict === 'revision_needed' && (
              <div style={{ marginBottom: '1rem' }}>
                <label className="r-label">Revision Notes *</label>
                <textarea className="r-textarea" rows={3} value={reviewForm.revision_notes}
                  onChange={e => setReviewForm({ ...reviewForm, revision_notes: e.target.value })}
                  placeholder="What specifically needs to be revised?" />
              </div>
            )}

            <button className="r-btn r-btn-primary" onClick={submitReview} disabled={submittingReview}
              style={{ width: '100%', justifyContent: 'center' }}>
              {submittingReview ? 'Submitting...' : reviewForm.verdict === 'approved' ? 'Approve Capstone' : 'Request Revision'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Capstone Reviews</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Review resident capstone projects (recorded lessons and reflections).
      </p>

      {needsReview.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
            Needs Review ({needsReview.length})
          </h2>
          {needsReview.map(c => {
            const res = c.resident as any
            return (
              <div key={c.id} className="r-card" onClick={() => setSelected(c)}
                style={{ padding: '1rem', marginBottom: '0.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                    {res?.profile?.first_name} {res?.profile?.last_name}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                    {c.lesson_title || 'Untitled'} &middot; {res?.cohort?.name}
                  </p>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                  {new Date(c.submitted_at).toLocaleDateString()}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {reviewed.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
            Reviewed ({reviewed.length})
          </h2>
          {reviewed.map(c => {
            const res = c.resident as any
            return (
              <div key={c.id} className="r-card" onClick={() => setSelected(c)}
                style={{ padding: '1rem', marginBottom: '0.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                    {res?.profile?.first_name} {res?.profile?.last_name}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)' }}>
                    {c.lesson_title || 'Untitled'}
                  </p>
                </div>
                <span style={{
                  fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase',
                  padding: '0.25rem 0.5rem', borderRadius: '4px',
                  color: c.status === 'approved' ? '#2d6a4f' : '#991b1b',
                  background: c.status === 'approved' ? 'var(--r-success-light)' : 'var(--r-error-light)',
                }}>
                  {c.status === 'approved' ? 'Approved' : 'Revision Requested'}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {capstones.length === 0 && (
        <EmptyState title="No capstones submitted" message="Capstone submissions from residents will appear here." />
      )}
    </div>
  )
}

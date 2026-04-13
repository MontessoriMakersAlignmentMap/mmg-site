'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'

const READINESS_OPTIONS = [
  { value: 'ready_for_practicum', label: 'Ready for Practicum' },
  { value: 'developing_well', label: 'Developing Well' },
  { value: 'needs_more_practice', label: 'Needs More Practice' },
]

export default function MentorMaterialsPracticePage() {
  const { profile } = useResidencyAuth(['mentor', 'admin'])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [reviewingId, setReviewingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Review form state
  const [feedbackTechnique, setFeedbackTechnique] = useState('')
  const [feedbackPacing, setFeedbackPacing] = useState('')
  const [feedbackIsolation, setFeedbackIsolation] = useState('')
  const [feedbackPresence, setFeedbackPresence] = useState('')
  const [readinessRating, setReadinessRating] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      // Get submissions for residents assigned to this mentor
      const { data } = await supabase
        .from('residency_remote_materials_practice')
        .select('*, resident:residency_residents(id, profile:residency_profiles(first_name, last_name, email))')
        .order('submitted_at', { ascending: false })

      // Filter to only mentor's assigned residents (or show all for admin)
      if (data) {
        if (profile!.role === 'admin') {
          setSubmissions(data)
        } else {
          const { data: myResidents } = await supabase
            .from('residency_residents')
            .select('id')
            .eq('mentor_id', profile!.id)

          const myResidentIds = new Set((myResidents || []).map((r: any) => r.id))
          setSubmissions(data.filter((s: any) => myResidentIds.has(s.resident_id)))
        }
      }
      setLoading(false)
    }
    load()
  }, [profile])

  function startReview(submission: any) {
    setReviewingId(submission.id)
    setFeedbackTechnique(submission.feedback_technique || '')
    setFeedbackPacing(submission.feedback_pacing || '')
    setFeedbackIsolation(submission.feedback_isolation || '')
    setFeedbackPresence(submission.feedback_presence || '')
    setReadinessRating(submission.readiness_rating || '')
  }

  async function submitReview() {
    if (!reviewingId || !profile) return
    setSaving(true)

    await supabase
      .from('residency_remote_materials_practice')
      .update({
        mentor_id: profile.id,
        feedback_technique: feedbackTechnique || null,
        feedback_pacing: feedbackPacing || null,
        feedback_isolation: feedbackIsolation || null,
        feedback_presence: feedbackPresence || null,
        readiness_rating: readinessRating || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', reviewingId)

    setSubmissions(prev => prev.map(s =>
      s.id === reviewingId
        ? { ...s, mentor_id: profile.id, feedback_technique: feedbackTechnique, feedback_pacing: feedbackPacing, feedback_isolation: feedbackIsolation, feedback_presence: feedbackPresence, readiness_rating: readinessRating, reviewed_at: new Date().toISOString() }
        : s
    ))
    setReviewingId(null)
    setSaving(false)
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const pending = submissions.filter(s => !s.reviewed_at)
  const reviewed = submissions.filter(s => s.reviewed_at)

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Materials Practice Videos</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Review remote practice videos submitted by your residents.
      </p>

      {/* Pending reviews */}
      <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>
        Awaiting Review {pending.length > 0 && <span style={{ color: 'var(--r-feedback-color)', fontWeight: 400, fontSize: '0.875rem' }}>({pending.length})</span>}
      </h2>

      {pending.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--r-text-muted)', marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.875rem' }}>No videos awaiting review.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {pending.map(s => {
            const name = s.resident?.profile
              ? `${s.resident.profile.first_name} ${s.resident.profile.last_name}`
              : 'Unknown'

            return (
              <div key={s.id} className="r-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', margin: 0, marginBottom: '0.125rem' }}>{s.lesson_title}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', margin: 0 }}>
                      {name} &bull; {s.strand} &bull; {new Date(s.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                  <a href={s.video_url} target="_blank" rel="noopener noreferrer"
                    className="r-btn r-btn-secondary" style={{ fontSize: '0.75rem', textDecoration: 'none' }}>
                    Watch Video
                  </a>
                </div>

                <p style={{ fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                  <strong>Materials:</strong> {s.materials_used}
                </p>

                <div style={{ padding: '0.75rem', background: 'var(--r-cream)', borderRadius: '6px', marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Resident Self-Reflection</p>
                  <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, margin: 0 }}>{s.self_reflection}</p>
                </div>

                {reviewingId === s.id ? (
                  <div style={{ padding: '1rem', border: '1px solid var(--r-border)', borderRadius: '8px', marginTop: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.9375rem', color: 'var(--r-navy)', marginBottom: '1rem' }}>Your Feedback</h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label className="r-label">Technique</label>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Precision and economy of movement</p>
                        <textarea className="r-textarea" value={feedbackTechnique}
                          onChange={e => setFeedbackTechnique(e.target.value)}
                          style={{ minHeight: '80px' }} />
                      </div>
                      <div>
                        <label className="r-label">Pacing</label>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Appropriate speed for a child to follow</p>
                        <textarea className="r-textarea" value={feedbackPacing}
                          onChange={e => setFeedbackPacing(e.target.value)}
                          style={{ minHeight: '80px' }} />
                      </div>
                      <div>
                        <label className="r-label">Isolation of Movement</label>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Key movements clear and distinct</p>
                        <textarea className="r-textarea" value={feedbackIsolation}
                          onChange={e => setFeedbackIsolation(e.target.value)}
                          style={{ minHeight: '80px' }} />
                      </div>
                      <div>
                        <label className="r-label">Presence with Materials</label>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginBottom: '0.25rem' }}>Confidence and care in handling</p>
                        <textarea className="r-textarea" value={feedbackPresence}
                          onChange={e => setFeedbackPresence(e.target.value)}
                          style={{ minHeight: '80px' }} />
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label className="r-label">Overall Readiness</label>
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.375rem' }}>
                        {READINESS_OPTIONS.map(o => (
                          <label key={o.value} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            fontSize: '0.8125rem',
                            cursor: 'pointer',
                          }}>
                            <input type="radio" name="readiness" value={o.value}
                              checked={readinessRating === o.value}
                              onChange={() => setReadinessRating(o.value)}
                              style={{ accentColor: 'var(--r-navy)' }} />
                            {o.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={submitReview} className="r-btn r-btn-primary" disabled={saving}
                        style={{ fontSize: '0.8125rem' }}>
                        {saving ? 'Saving...' : 'Submit Feedback'}
                      </button>
                      <button onClick={() => setReviewingId(null)} className="r-btn r-btn-secondary"
                        style={{ fontSize: '0.8125rem' }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => startReview(s)} className="r-btn r-btn-primary"
                    style={{ fontSize: '0.8125rem' }}>
                    Review This Video
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Already reviewed */}
      {reviewed.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Reviewed ({reviewed.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {reviewed.map(s => {
              const name = s.resident?.profile
                ? `${s.resident.profile.first_name} ${s.resident.profile.last_name}`
                : 'Unknown'
              return (
                <div key={s.id} className="r-card" style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '0.9375rem', margin: 0 }}>{s.lesson_title}</h3>
                      <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', margin: 0 }}>
                        {name} &bull; {s.strand} &bull; Reviewed {new Date(s.reviewed_at).toLocaleDateString()}
                      </p>
                    </div>
                    {s.readiness_rating && (
                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.625rem',
                        borderRadius: '9999px',
                        background: s.readiness_rating === 'ready_for_practicum' ? 'var(--r-success-light)' : s.readiness_rating === 'developing_well' ? 'var(--r-info-light)' : 'var(--r-feedback-bg)',
                        color: s.readiness_rating === 'ready_for_practicum' ? 'var(--r-success)' : s.readiness_rating === 'developing_well' ? 'var(--r-info)' : 'var(--r-feedback-color)',
                      }}>
                        {s.readiness_rating.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

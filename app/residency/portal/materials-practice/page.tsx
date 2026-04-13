'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

const READINESS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  ready_for_practicum: { bg: 'var(--r-success-light)', color: 'var(--r-success)', label: 'Ready for Practicum' },
  developing_well: { bg: 'var(--r-info-light)', color: 'var(--r-info)', label: 'Developing Well' },
  needs_more_practice: { bg: 'var(--r-feedback-bg)', color: 'var(--r-feedback-color)', label: 'Needs More Practice' },
}

export default function MaterialsPracticePage() {
  const { profile } = useResidencyAuth(['resident'])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', profile!.id)
        .single()

      if (!resident) { setLoading(false); return }

      const { data } = await supabase
        .from('residency_remote_materials_practice')
        .select('*')
        .eq('resident_id', resident.id)
        .order('submitted_at', { ascending: false })

      if (data) setSubmissions(data)
      setLoading(false)
    }
    load()
  }, [profile])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Materials Practice</h1>
        <Link href="/residency/portal/materials-practice/submit" className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem', textDecoration: 'none' }}>
          Submit Practice Video
        </Link>
      </div>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem', lineHeight: 1.6 }}>
        Record yourself giving a Montessori presentation and submit it for mentor feedback.
        This is an invitation to practice and refine your technique — whether you&apos;re preparing for practicum
        or building confidence with materials you haven&apos;t had the chance to work with on-site.
      </p>

      {submissions.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎥</p>
          <p style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.375rem' }}>No submissions yet</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
            When you&apos;re ready, record yourself presenting a lesson and submit it for your mentor&apos;s feedback.
          </p>
          <Link href="/residency/portal/materials-practice/submit" className="r-btn r-btn-primary" style={{ fontSize: '0.8125rem', textDecoration: 'none' }}>
            Submit Your First Video
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {submissions.map(s => {
            const reviewed = !!s.reviewed_at
            const readiness = s.readiness_rating ? READINESS_STYLES[s.readiness_rating] : null
            return (
              <div key={s.id} className="r-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', margin: 0, marginBottom: '0.125rem' }}>{s.lesson_title}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', margin: 0 }}>
                      {s.strand} &bull; {new Date(s.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.625rem',
                    borderRadius: '9999px',
                    background: reviewed ? 'var(--r-success-light)' : 'var(--r-feedback-bg)',
                    color: reviewed ? 'var(--r-success)' : 'var(--r-feedback-color)',
                  }}>
                    {reviewed ? 'Reviewed' : 'Pending Review'}
                  </span>
                </div>

                <p style={{ fontSize: '0.8125rem', color: 'var(--r-text)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                  <strong>Materials:</strong> {s.materials_used}
                </p>

                {reviewed && (
                  <div style={{ marginTop: '0.75rem', padding: '1rem', background: 'var(--r-cream)', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                      Mentor Feedback — {new Date(s.reviewed_at).toLocaleDateString()}
                    </p>

                    {readiness && (
                      <span style={{
                        display: 'inline-block',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.625rem',
                        borderRadius: '9999px',
                        background: readiness.bg,
                        color: readiness.color,
                        marginBottom: '0.75rem',
                      }}>
                        {readiness.label}
                      </span>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      {[
                        { label: 'Technique', value: s.feedback_technique },
                        { label: 'Pacing', value: s.feedback_pacing },
                        { label: 'Isolation of Movement', value: s.feedback_isolation },
                        { label: 'Presence with Materials', value: s.feedback_presence },
                      ].filter(f => f.value).map(f => (
                        <div key={f.label}>
                          <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--r-navy)', marginBottom: '0.125rem' }}>{f.label}</p>
                          <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, margin: 0 }}>{f.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

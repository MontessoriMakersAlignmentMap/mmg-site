'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { surveyQuestions, surveyLabels, type SurveyType } from '@/lib/residency/survey-questions'
import EmptyState from '../../components/EmptyState'

export default function ResidentSurveysPage() {
  const [surveys, setSurveys] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSurvey, setActiveSurvey] = useState<any>(null)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', user.id)
        .single()

      if (!resident) return

      const { data } = await supabase
        .from('residency_survey_instances')
        .select('*')
        .eq('resident_id', resident.id)
        .is('deleted_at', null)
        .order('triggered_at', { ascending: false })

      setSurveys(data || [])
      setLoading(false)
    }
    load()
  }, [])

  function startSurvey(survey: any) {
    setActiveSurvey(survey)
    setResponses({})
    setSubmitted(false)
  }

  async function submitSurvey() {
    if (!activeSurvey) return
    setSubmitting(true)

    const questions = surveyQuestions[activeSurvey.survey_type as SurveyType]
    const responseArray = questions.map(q => ({
      question_key: q.key,
      value: responses[q.key] || '',
    })).filter(r => r.value)

    const res = await fetch('/api/residency/surveys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        survey_instance_id: activeSurvey.id,
        responses: responseArray,
      }),
    })

    if (res.ok) {
      setSubmitted(true)
      setSurveys(prev => prev.map(s =>
        s.id === activeSurvey.id ? { ...s, completed_at: new Date().toISOString() } : s
      ))
    }
    setSubmitting(false)
  }

  if (loading) return <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>

  const pending = surveys.filter(s => !s.completed_at)
  const completed = surveys.filter(s => s.completed_at)

  if (activeSurvey && !submitted) {
    const questions = surveyQuestions[activeSurvey.survey_type as SurveyType]
    const scaleQuestions = questions.filter(q => q.type === 'scale')
    const textQuestions = questions.filter(q => q.type === 'text')
    const allAnswered = questions.every(q =>
      q.type === 'scale' ? responses[q.key] : (responses[q.key]?.trim())
    )

    return (
      <div style={{ maxWidth: '700px' }}>
        <button onClick={() => setActiveSurvey(null)} className="r-btn" style={{ marginBottom: '1.5rem', fontSize: '0.8125rem' }}>
          &larr; Back to Surveys
        </button>

        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
          {surveyLabels[activeSurvey.survey_type as SurveyType]}
        </h1>
        <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Your responses are confidential and help us improve the program. Please answer all questions.
        </p>

        {/* Scale questions */}
        {scaleQuestions.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Rate each area (1 = Low, 5 = High)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {scaleQuestions.map(q => (
                <div key={q.key} className="r-card" style={{ padding: '1rem 1.25rem' }}>
                  <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>{q.text}</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} onClick={() => setResponses(prev => ({ ...prev, [q.key]: String(n) }))}
                        style={{
                          width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                          border: responses[q.key] === String(n) ? '2px solid var(--r-navy)' : '1px solid var(--r-border)',
                          background: responses[q.key] === String(n) ? 'var(--r-navy)' : 'white',
                          color: responses[q.key] === String(n) ? 'white' : 'var(--r-text)',
                          fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                        }}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Text questions */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Open Responses</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {textQuestions.map(q => (
              <div key={q.key}>
                <label className="r-label" style={{ lineHeight: 1.5, marginBottom: '0.5rem', display: 'block' }}>{q.text}</label>
                <textarea className="r-textarea" rows={4}
                  value={responses[q.key] || ''}
                  onChange={e => setResponses(prev => ({ ...prev, [q.key]: e.target.value }))}
                  placeholder="Share your thoughts..."
                />
              </div>
            ))}
          </div>
        </div>

        <button className="r-btn r-btn-primary" onClick={submitSurvey}
          disabled={submitting || !allAnswered}
          style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
          {submitting ? 'Submitting...' : 'Submit Survey'}
        </button>
      </div>
    )
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: '500px', textAlign: 'center', padding: '3rem 0' }}>
        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Thank you!</p>
        <p style={{ color: 'var(--r-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Your feedback has been submitted. It helps us make the residency better for everyone.
        </p>
        <button className="r-btn" onClick={() => { setActiveSurvey(null); setSubmitted(false) }}>
          Back to Surveys
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Feedback Surveys</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Your feedback shapes the program. Surveys are confidential.
      </p>

      {pending.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Awaiting Your Response ({pending.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {pending.map(s => (
              <div key={s.id} className="r-card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                    {surveyLabels[s.survey_type as SurveyType]}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                    Sent {new Date(s.triggered_at).toLocaleDateString()}
                  </p>
                </div>
                <button className="r-btn r-btn-primary" onClick={() => startSurvey(s)} style={{ fontSize: '0.8125rem' }}>
                  Take Survey
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Completed ({completed.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {completed.map(s => (
              <div key={s.id} className="r-card" style={{ padding: '0.875rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.7 }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    {surveyLabels[s.survey_type as SurveyType]}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                    Completed {new Date(s.completed_at).toLocaleDateString()}
                  </p>
                </div>
                <span style={{
                  fontSize: '0.625rem', fontWeight: 600, textTransform: 'uppercase',
                  padding: '0.25rem 0.5rem', borderRadius: '4px',
                  color: '#2d6a4f', background: '#d1fae5',
                }}>
                  Done
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {surveys.length === 0 && (
        <EmptyState title="No surveys yet" message="Surveys will appear here at key milestones in your residency." />
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { surveyQuestions, surveyLabels, type SurveyType } from '@/lib/residency/survey-questions'

export default function AdminSurveyDashboardPage() {
  const [surveyType, setSurveyType] = useState<SurveyType>('week_2')
  const [instances, setInstances] = useState<any[]>([])
  const [responses, setResponses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [triggerResult, setTriggerResult] = useState<string | null>(null)
  const [triggering, setTriggering] = useState(false)

  useEffect(() => { loadData(surveyType) }, [surveyType])

  async function loadData(type: SurveyType) {
    setLoading(true)
    const res = await fetch(`/api/residency/surveys/responses?type=${type}`)
    const data = await res.json()
    setInstances(data.instances || [])
    setResponses(data.responses || [])
    setLoading(false)
  }

  async function triggerSurveys() {
    setTriggering(true)
    setTriggerResult(null)
    const res = await fetch('/api/residency/surveys/trigger', { method: 'POST' })
    const data = await res.json()
    setTriggerResult(`Triggered ${data.triggered} new survey(s)`)
    setTriggering(false)
    await loadData(surveyType)
  }

  function exportCsv() {
    const completedInstances = instances.filter(i => i.completed_at)
    if (completedInstances.length === 0) return

    const questions = surveyQuestions[surveyType]
    const header = ['Resident', 'Cohort', 'Track', 'Completed', ...questions.map(q => q.text)]

    const rows = completedInstances.map(inst => {
      const profile = (inst.resident as any)?.profile
      const cohort = (inst.resident as any)?.cohort
      const name = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim()
      const instResponses = responses.filter(r => r.survey_instance_id === inst.id)
      const responseMap = new Map(instResponses.map(r => [r.question_key, r]))

      return [
        name,
        cohort?.name || '',
        cohort?.track || '',
        new Date(inst.completed_at).toLocaleDateString(),
        ...questions.map(q => {
          const r = responseMap.get(q.key)
          if (!r) return ''
          return r.response_type === 'scale' ? String(r.response_scale) : (r.response_text || '').replace(/"/g, '""')
        }),
      ]
    })

    const csv = [header, ...rows].map(row =>
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `survey-${surveyType}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const total = instances.length
  const completed = instances.filter(i => i.completed_at).length
  const responseRate = total > 0 ? Math.round((completed / total) * 100) : 0
  const questions = surveyQuestions[surveyType]

  // Compute averages for scale questions
  const scaleAverages: Record<string, { avg: number; count: number }> = {}
  for (const q of questions.filter(q => q.type === 'scale')) {
    const vals = responses.filter(r => r.question_key === q.key && r.response_scale != null)
    if (vals.length > 0) {
      const sum = vals.reduce((s, r) => s + r.response_scale, 0)
      scaleAverages[q.key] = { avg: Math.round((sum / vals.length) * 10) / 10, count: vals.length }
    }
  }

  // Collect text responses grouped by question
  const textByQuestion: Record<string, { text: string; name: string }[]> = {}
  for (const q of questions.filter(q => q.type === 'text')) {
    const texts = responses
      .filter(r => r.question_key === q.key && r.response_text)
      .map(r => {
        const inst = instances.find(i => i.id === r.survey_instance_id)
        const profile = (inst?.resident as any)?.profile
        return {
          text: r.response_text,
          name: `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim(),
        }
      })
    if (texts.length > 0) textByQuestion[q.key] = texts
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Feedback Surveys</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Response rates, quantitative trends, and qualitative feedback
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button className="r-btn" onClick={triggerSurveys} disabled={triggering}
            style={{ fontSize: '0.8125rem' }}>
            {triggering ? 'Checking...' : 'Run Survey Triggers'}
          </button>
          <button className="r-btn" onClick={exportCsv} disabled={completed === 0}
            style={{ fontSize: '0.8125rem' }}>
            Export CSV
          </button>
        </div>
      </div>

      {triggerResult && (
        <div style={{
          padding: '0.75rem 1rem', marginBottom: '1rem', borderRadius: '6px',
          background: '#d1fae5', color: '#065f46', fontSize: '0.8125rem',
        }}>
          {triggerResult}
        </div>
      )}

      {/* Survey type tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--r-border)' }}>
        {(['week_2', 'week_6', 'completion'] as SurveyType[]).map(type => (
          <button key={type} onClick={() => setSurveyType(type)}
            style={{
              background: 'none', border: 'none',
              borderBottom: surveyType === type ? '2px solid var(--r-navy)' : '2px solid transparent',
              padding: '0.5rem 1rem', fontSize: '0.8125rem',
              fontWeight: surveyType === type ? 600 : 400,
              color: surveyType === type ? 'var(--r-navy)' : 'var(--r-text-muted)',
              cursor: 'pointer',
            }}>
            {surveyLabels[type]}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>
      ) : (
        <>
          {/* Response Rate */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
            <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--r-navy)' }}>{total}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Surveys Sent</p>
            </div>
            <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--r-success)' }}>{completed}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Completed</p>
            </div>
            <div className="r-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.75rem', fontWeight: 700, color: responseRate >= 80 ? 'var(--r-success)' : responseRate >= 50 ? 'var(--r-warning)' : 'var(--r-error)' }}>
                {responseRate}%
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>Response Rate</p>
            </div>
          </div>

          {/* Quantitative Summary */}
          {Object.keys(scaleAverages).length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Quantitative Summary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {questions.filter(q => q.type === 'scale').map(q => {
                  const data = scaleAverages[q.key]
                  if (!data) return null
                  const pct = (data.avg / 5) * 100
                  return (
                    <div key={q.key} className="r-card" style={{ padding: '0.875rem 1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                        <p style={{ fontSize: '0.8125rem', flex: 1 }}>{q.text}</p>
                        <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--r-navy)', marginLeft: '1rem', whiteSpace: 'nowrap' }}>
                          {data.avg} / 5
                        </span>
                      </div>
                      <div style={{ height: '6px', borderRadius: '3px', background: 'var(--r-border)', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: '3px', width: `${pct}%`,
                          background: data.avg >= 4 ? 'var(--r-success)' : data.avg >= 3 ? 'var(--r-warning)' : 'var(--r-error)',
                        }} />
                      </div>
                      <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                        {data.count} response{data.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Qualitative Responses */}
          {Object.keys(textByQuestion).length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Qualitative Responses</h2>
              {questions.filter(q => q.type === 'text').map(q => {
                const texts = textByQuestion[q.key]
                if (!texts) return null
                return (
                  <div key={q.key} style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--r-navy)' }}>
                      {q.text}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      {texts.map((t, i) => (
                        <div key={i} style={{
                          padding: '0.75rem 1rem', background: 'var(--r-bg-muted, #f5f5f0)',
                          borderRadius: '6px', fontSize: '0.8125rem', lineHeight: 1.6,
                        }}>
                          <p>{t.text}</p>
                          <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                            &mdash; {t.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Pending Responses */}
          {instances.filter(i => !i.completed_at).length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Awaiting Response</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {instances.filter(i => !i.completed_at).map(inst => {
                  const profile = (inst.resident as any)?.profile
                  const cohort = (inst.resident as any)?.cohort
                  return (
                    <div key={inst.id} className="r-card" style={{ padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                          {profile?.first_name} {profile?.last_name}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginLeft: '0.5rem' }}>
                          {cohort?.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)' }}>
                        Sent {new Date(inst.triggered_at).toLocaleDateString()}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {total === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--r-text-muted)' }}>
              <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No surveys triggered yet</p>
              <p style={{ fontSize: '0.8125rem' }}>Click "Run Survey Triggers" to check for eligible residents.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

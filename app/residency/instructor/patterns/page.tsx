'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

const AI_FIELD_LABELS: Record<string, string> = {
  why_this_lesson_matters: 'Why This Lesson Matters',
  direct_aim: 'Direct Aim',
  indirect_aim: 'Indirect Aim',
  equity_aim: 'Equity Aim',
  materials: 'Materials',
  presentation: 'The Presentation',
  points_of_interest: 'Points of Interest',
  variations: 'Variations and Extensions',
  neurodivergence_notes: 'Neurodivergence and Behavior',
}

export default function AlbumPatternsPage() {
  const [cohorts, setCohorts] = useState<any[]>([])
  const [selectedCohort, setSelectedCohort] = useState('')
  const [patterns, setPatterns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('residency_cohorts')
        .select('id, name, track')
        .eq('instructor_id', user.id)
        .is('deleted_at', null)
      if (data) {
        setCohorts(data)
        if (data.length > 0) setSelectedCohort(data[0].id)
      }
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    if (!selectedCohort) return
    async function loadPatterns() {
      // Get residents for this cohort
      const { data: residents } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('cohort_id', selectedCohort)
      const residentIds = (residents || []).map((r: any) => r.id)
      if (residentIds.length === 0) { setPatterns([]); return }

      // Get all entries for these residents
      const { data: entries } = await supabase
        .from('residency_album_entries')
        .select('id, lesson:residency_lessons(title)')
        .in('resident_id', residentIds)
      const entryIds = (entries || []).map((e: any) => e.id)
      const entryMap = Object.fromEntries((entries || []).map((e: any) => [e.id, e.lesson?.title || 'Unknown']))
      if (entryIds.length === 0) { setPatterns([]); return }

      // Get all AI review cycles
      const { data: cycles } = await supabase
        .from('residency_ai_review_cycles')
        .select('entry_id, field_feedback, created_at')
        .in('entry_id', entryIds)
        .order('created_at', { ascending: false })

      // Aggregate by field
      const fieldData: Record<string, { count: number; recentLessons: Set<string> }> = {}
      for (const cycle of cycles || []) {
        const ff = cycle.field_feedback || {}
        for (const [key, val] of Object.entries(ff) as any) {
          if (val?.verdict === 'needs_revision' || val?.verdict === 'missing') {
            if (!fieldData[key]) fieldData[key] = { count: 0, recentLessons: new Set() }
            fieldData[key].count++
            const lessonTitle = entryMap[cycle.entry_id]
            if (lessonTitle && fieldData[key].recentLessons.size < 3) {
              fieldData[key].recentLessons.add(lessonTitle)
            }
          }
        }
      }

      const sorted = Object.entries(fieldData)
        .sort(([, a], [, b]) => b.count - a.count)
        .map(([key, data]) => ({
          key,
          label: AI_FIELD_LABELS[key] || key,
          count: data.count,
          recentLessons: Array.from(data.recentLessons),
        }))

      setPatterns(sorted)
    }
    loadPatterns()
  }, [selectedCohort])

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Album Patterns</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Fields most frequently flagged by AI review across your cohorts. Address these in live sessions.
      </p>

      {cohorts.length > 1 && (
        <select
          className="r-input"
          value={selectedCohort}
          onChange={e => setSelectedCohort(e.target.value)}
          style={{ marginBottom: '1.5rem', maxWidth: '300px' }}
        >
          {cohorts.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      )}

      {patterns.length === 0 ? (
        <div className="r-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--r-text-muted)' }}>
          No AI review data for this cohort yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {patterns.map((p, idx) => (
            <div key={p.key} className="r-card" style={{
              borderLeft: `4px solid ${idx === 0 ? '#c62828' : idx < 3 ? 'var(--r-feedback-color)' : 'var(--r-border)'}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>{p.label}</h3>
                <span style={{
                  fontSize: '1.25rem', fontWeight: 700,
                  color: idx === 0 ? '#c62828' : idx < 3 ? 'var(--r-feedback-color)' : 'var(--r-text-muted)',
                }}>
                  {p.count}
                </span>
              </div>
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)' }}>
                flagged across {p.count} review{p.count !== 1 ? 's' : ''}
              </p>
              {p.recentLessons.length > 0 && (
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.375rem' }}>
                  Recent lessons: {p.recentLessons.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

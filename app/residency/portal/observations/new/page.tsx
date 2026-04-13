'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

const SCHOOL_TYPES = [
  { value: 'private_independent', label: 'Private Independent Montessori' },
  { value: 'public_district', label: 'Public District Montessori' },
  { value: 'charter', label: 'Charter Montessori' },
  { value: 'bilingual_dual_language', label: 'Bilingual or Dual Language Montessori' },
  { value: 'other', label: 'Other' },
]

const MATERIALS_AREAS = [
  'Practical Life',
  'Sensorial',
  'Language',
  'Mathematics',
  'Geometry',
  'Cultural Studies',
  'Theory',
  'Behavior Support',
  'Other',
]

export default function NewObservationPage() {
  const { profile } = useResidencyAuth(['resident'])
  const searchParams = useSearchParams()
  const router = useRouter()
  const monthParam = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1))

  const [residentId, setResidentId] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [observationDate, setObservationDate] = useState(new Date().toISOString().split('T')[0])
  const [schoolName, setSchoolName] = useState('')
  const [supervisingGuide, setSupervisingGuide] = useState('')
  const [guideCredential, setGuideCredential] = useState('')
  const [schoolType, setSchoolType] = useState('')
  const [hours, setHours] = useState('6')
  const [reflectionConnection, setReflectionConnection] = useState('')
  const [reflectionSurprise, setReflectionSurprise] = useState('')
  const [reflectionQuestions, setReflectionQuestions] = useState('')
  const [reflectionNextMonth, setReflectionNextMonth] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  // Materials session state
  const [materialsCompleted, setMaterialsCompleted] = useState(false)
  const [materialsSessionDuration, setMaterialsSessionDuration] = useState('60')
  const [materialsAreas, setMaterialsAreas] = useState<string[]>([])
  const [materialsOtherArea, setMaterialsOtherArea] = useState('')
  const [materialsGuideFeedback, setMaterialsGuideFeedback] = useState('')
  const [materialsPracticeNotes, setMaterialsPracticeNotes] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id, assigned_level:residency_levels(*)')
        .eq('profile_id', profile!.id)
        .single()

      if (!resident) { setLoading(false); return }
      setResidentId(resident.id)

      const level = Array.isArray(resident.assigned_level) ? resident.assigned_level[0] : resident.assigned_level
      const track = level?.name?.toLowerCase() === 'elementary' ? 'elementary' : 'primary'

      const { data: obsPrompt } = await supabase
        .from('residency_observation_prompts')
        .select('*')
        .eq('track', track)
        .eq('month_number', monthParam)
        .single()

      if (obsPrompt) setPrompt(obsPrompt)
      setLoading(false)
    }
    load()
  }, [profile, monthParam])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!residentId || !confirmed) return
    setSaving(true)
    setError('')

    // Validate materials session fields if completed
    if (materialsCompleted) {
      const feedbackWords = materialsGuideFeedback.trim().split(/\s+/).filter(Boolean).length
      const notesWords = materialsPracticeNotes.trim().split(/\s+/).filter(Boolean).length
      if (materialsAreas.length === 0) {
        setError('Please select at least one materials area.')
        setSaving(false)
        return
      }
      if (feedbackWords < 30) {
        setError(`Guide feedback needs at least 30 words (currently ${feedbackWords}).`)
        setSaving(false)
        return
      }
      if (notesWords < 50) {
        setError(`Personal practice notes need at least 50 words (currently ${notesWords}).`)
        setSaving(false)
        return
      }
    }

    const { error: insertError } = await supabase
      .from('residency_observation_logs')
      .insert({
        resident_id: residentId,
        month_number: monthParam,
        observation_date: observationDate,
        school_name: schoolName,
        supervising_guide: supervisingGuide || null,
        guide_credential: guideCredential || null,
        school_type: schoolType || null,
        hours: parseFloat(hours) || 6,
        reflection_connection: reflectionConnection,
        reflection_surprise: reflectionSurprise,
        reflection_questions: reflectionQuestions,
        reflection_next_month: reflectionNextMonth,
        confirmation_checkbox: confirmed,
        materials_session_completed: materialsCompleted,
        materials_session_duration: materialsCompleted ? parseInt(materialsSessionDuration) || 60 : null,
        materials_areas: materialsCompleted ? materialsAreas : null,
        materials_guide_feedback: materialsCompleted ? materialsGuideFeedback : null,
        materials_practice_notes: materialsCompleted ? materialsPracticeNotes : null,
      })

    if (insertError) {
      setError(insertError.message.includes('unique') || insertError.message.includes('duplicate')
        ? 'You have already submitted an observation for this month.'
        : insertError.message)
      setSaving(false)
      return
    }

    router.push('/residency/portal/observations')
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const monthName = new Date(2024, monthParam - 1).toLocaleDateString('en-US', { month: 'long' })

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/residency/portal/observations" style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none' }}>
          &larr; Back to Observation Log
        </Link>
      </div>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
        {monthName} Observation Visit
      </h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Record your monthly observation visit and reflect on what you saw.
      </p>

      {/* Curriculum connection prompt */}
      {prompt && (
        <div style={{
          background: '#f5e8cc',
          borderLeft: '4px solid var(--r-navy)',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
        }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--r-navy)', marginBottom: '0.375rem' }}>
            This Month&apos;s Focus
          </p>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--r-text)' }}>
            {prompt.curriculum_connection}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Site details */}
        <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--r-navy)' }}>Site Details</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Observation Date</label>
              <input type="date" className="r-input" value={observationDate}
                onChange={e => setObservationDate(e.target.value)} required />
            </div>
            <div>
              <label className="r-label">Hours</label>
              <input type="number" step="0.5" min="1" max="12" className="r-input"
                value={hours} onChange={e => setHours(e.target.value)} required />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">School Name</label>
            <input type="text" className="r-input" value={schoolName}
              onChange={e => setSchoolName(e.target.value)} required
              placeholder="Name of the Montessori school you visited" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Supervising Guide</label>
              <input type="text" className="r-input" value={supervisingGuide}
                onChange={e => setSupervisingGuide(e.target.value)}
                placeholder="Full name of lead guide" />
            </div>
            <div>
              <label className="r-label">Guide Credential</label>
              <input type="text" className="r-input" value={guideCredential}
                onChange={e => setGuideCredential(e.target.value)}
                placeholder="e.g., AMS, AMI, MACTE" />
            </div>
          </div>

          <div>
            <label className="r-label">School Type</label>
            <select className="r-input" value={schoolType} onChange={e => setSchoolType(e.target.value)}>
              <option value="">Select school type...</option>
              {SCHOOL_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reflections */}
        <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.375rem', color: 'var(--r-navy)' }}>Reflections</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Take your time with these. This is your reflective journal for the month.
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="r-label">What did you observe that connected directly to what you have been studying this month?</label>
            <textarea className="r-textarea" value={reflectionConnection}
              onChange={e => setReflectionConnection(e.target.value)}
              style={{ minHeight: '120px' }}
              placeholder="Write at least 100 characters..." />
            <p style={{ fontSize: '0.6875rem', color: reflectionConnection.length >= 100 ? 'var(--r-success)' : 'var(--r-text-muted)', marginTop: '0.25rem' }}>
              {reflectionConnection.length} / 100 characters minimum
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="r-label">What surprised you?</label>
            <textarea className="r-textarea" value={reflectionSurprise}
              onChange={e => setReflectionSurprise(e.target.value)}
              style={{ minHeight: '100px' }}
              placeholder="Write at least 50 characters..." />
            <p style={{ fontSize: '0.6875rem', color: reflectionSurprise.length >= 50 ? 'var(--r-success)' : 'var(--r-text-muted)', marginTop: '0.25rem' }}>
              {reflectionSurprise.length} / 50 characters minimum
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="r-label">What questions did this observation raise for you?</label>
            <textarea className="r-textarea" value={reflectionQuestions}
              onChange={e => setReflectionQuestions(e.target.value)}
              style={{ minHeight: '100px' }}
              placeholder="Write at least 50 characters..." />
            <p style={{ fontSize: '0.6875rem', color: reflectionQuestions.length >= 50 ? 'var(--r-success)' : 'var(--r-text-muted)', marginTop: '0.25rem' }}>
              {reflectionQuestions.length} / 50 characters minimum
            </p>
          </div>

          <div>
            <label className="r-label">What will you look for differently next month?</label>
            <textarea className="r-textarea" value={reflectionNextMonth}
              onChange={e => setReflectionNextMonth(e.target.value)}
              style={{ minHeight: '100px' }}
              placeholder="Write at least 50 characters..." />
            <p style={{ fontSize: '0.6875rem', color: reflectionNextMonth.length >= 50 ? 'var(--r-success)' : 'var(--r-text-muted)', marginTop: '0.25rem' }}>
              {reflectionNextMonth.length} / 50 characters minimum
            </p>
          </div>
        </div>

        {/* Materials Session */}
        <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.375rem', color: 'var(--r-navy)' }}>Materials Session</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Did you have the opportunity to practice with materials during this visit?
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: materialsCompleted ? '1.5rem' : '0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
              <input type="radio" name="materialsCompleted" checked={materialsCompleted}
                onChange={() => setMaterialsCompleted(true)}
                style={{ accentColor: 'var(--r-navy)' }} />
              Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
              <input type="radio" name="materialsCompleted" checked={!materialsCompleted}
                onChange={() => setMaterialsCompleted(false)}
                style={{ accentColor: 'var(--r-navy)' }} />
              No
            </label>
          </div>

          {!materialsCompleted && (
            <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.75rem', lineHeight: 1.5, fontStyle: 'italic' }}>
              If you were unable to complete a materials session this month, note the reason in your observation reflections above and reach out to your mentor to discuss alternative practice opportunities.
            </p>
          )}

          {materialsCompleted && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="r-label">Session Duration (minutes)</label>
                <input type="number" min="15" max="480" step="15" className="r-input"
                  value={materialsSessionDuration}
                  onChange={e => setMaterialsSessionDuration(e.target.value)}
                  style={{ maxWidth: '160px' }} />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="r-label">Materials Areas Covered</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.375rem' }}>
                  {MATERIALS_AREAS.map(area => (
                    <label key={area} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                      border: `1px solid ${materialsAreas.includes(area) ? 'var(--r-navy)' : 'var(--r-border)'}`,
                      background: materialsAreas.includes(area) ? 'var(--r-navy)' : 'transparent',
                      color: materialsAreas.includes(area) ? 'white' : 'var(--r-text)',
                      transition: 'all 0.15s ease',
                    }}>
                      <input type="checkbox" checked={materialsAreas.includes(area)}
                        onChange={e => {
                          if (e.target.checked) setMaterialsAreas(prev => [...prev, area])
                          else setMaterialsAreas(prev => prev.filter(a => a !== area))
                        }}
                        style={{ display: 'none' }} />
                      {area}
                    </label>
                  ))}
                </div>
                {materialsAreas.includes('Other') && (
                  <input type="text" className="r-input" value={materialsOtherArea}
                    onChange={e => setMaterialsOtherArea(e.target.value)}
                    placeholder="Describe the other area..."
                    style={{ marginTop: '0.5rem' }} />
                )}
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="r-label">Guide Feedback</label>
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>
                  What feedback did the supervising guide give you during or after the materials session?
                </p>
                <textarea className="r-textarea" value={materialsGuideFeedback}
                  onChange={e => setMaterialsGuideFeedback(e.target.value)}
                  style={{ minHeight: '100px' }}
                  placeholder="Share the guide's observations and suggestions..." />
                <p style={{
                  fontSize: '0.6875rem',
                  color: materialsGuideFeedback.trim().split(/\s+/).filter(Boolean).length >= 30 ? 'var(--r-success)' : 'var(--r-text-muted)',
                  marginTop: '0.25rem',
                }}>
                  {materialsGuideFeedback.trim().split(/\s+/).filter(Boolean).length} / 30 words minimum
                </p>
              </div>

              <div>
                <label className="r-label">Personal Practice Notes</label>
                <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.375rem' }}>
                  What did you practice? What felt natural and confident? What needs more work? Be specific.
                </p>
                <textarea className="r-textarea" value={materialsPracticeNotes}
                  onChange={e => setMaterialsPracticeNotes(e.target.value)}
                  style={{ minHeight: '140px' }}
                  placeholder="Describe your hands-on experience with the materials..." />
                <p style={{
                  fontSize: '0.6875rem',
                  color: materialsPracticeNotes.trim().split(/\s+/).filter(Boolean).length >= 50 ? 'var(--r-success)' : 'var(--r-text-muted)',
                  marginTop: '0.25rem',
                }}>
                  {materialsPracticeNotes.trim().split(/\s+/).filter(Boolean).length} / 50 words minimum
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Confirmation and submit */}
        <div className="r-card" style={{ padding: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', marginBottom: '1.25rem' }}>
            <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)}
              style={{ marginTop: '0.25rem', accentColor: 'var(--r-navy)' }} />
            <span style={{ fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--r-text)' }}>
              I confirm this observation took place at an approved Montessori site with a credentialed guide.
            </span>
          </label>

          {error && (
            <p style={{ color: 'var(--r-error)', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>
          )}

          <button type="submit" className="r-btn r-btn-primary"
            disabled={!confirmed || saving}
            style={{ fontSize: '0.8125rem', opacity: confirmed ? 1 : 0.5 }}>
            {saving ? 'Submitting...' : 'Submit Observation Log'}
          </button>
        </div>
      </form>
    </div>
  )
}

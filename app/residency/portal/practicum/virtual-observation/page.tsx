'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function VirtualObservationPage() {
  const { profile } = useResidencyAuth(['resident'])
  const router = useRouter()
  const [residentId, setResidentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [observationDate, setObservationDate] = useState('')
  const [recordingLink, setRecordingLink] = useState('')
  const [recordingDuration, setRecordingDuration] = useState('')
  const [contextNote, setContextNote] = useState('')
  const [familyConsent, setFamilyConsent] = useState(false)
  const [durationError, setDurationError] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id')
        .eq('profile_id', profile!.id)
        .single()
      if (resident) setResidentId(resident.id)
      setLoading(false)
    }
    load()
  }, [profile])

  function handleDurationChange(val: string) {
    setRecordingDuration(val)
    const mins = parseInt(val)
    if (val && mins < 90) {
      setDurationError('Virtual observations require a minimum of 90 continuous minutes of classroom footage.')
    } else {
      setDurationError('')
    }
  }

  function wordCount(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!residentId) return
    setError('')

    if (parseInt(recordingDuration) < 90) {
      setError('Recording must be at least 90 minutes.')
      return
    }
    if (wordCount(contextNote) < 100) {
      setError('Context note must be at least 100 words.')
      return
    }
    if (!familyConsent) {
      setError('You must confirm family consent before submitting.')
      return
    }

    setSaving(true)

    const { error: insertError } = await supabase
      .from('residency_virtual_observations')
      .insert({
        resident_id: residentId,
        observation_date: observationDate,
        recording_link: recordingLink,
        recording_duration_minutes: parseInt(recordingDuration),
        context_note: contextNote,
        family_consent_confirmed: familyConsent,
      })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    // Send notification email via API
    await fetch('/api/residency/virtual-observation/notify-guide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resident_id: residentId,
        observation_date: observationDate,
        recording_link: recordingLink,
        context_note: contextNote,
      }),
    })

    router.push('/residency/portal/practicum')
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  return (
    <div>
      <Link href="/residency/portal/practicum" style={{
        fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'block',
      }}>
        &larr; Back to Practicum
      </Link>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Submit Virtual Observation</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Upload a classroom recording for your Cohort Guide to review. This counts toward your required observations.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '700px' }}>
        {/* Recording Details */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Recording Details</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="r-label">Observation Date</label>
              <input type="date" className="r-input" value={observationDate}
                onChange={e => setObservationDate(e.target.value)} required />
              <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                The date the recording was made.
              </p>
            </div>
            <div>
              <label className="r-label">Recording Duration (minutes)</label>
              <input type="number" min="1" className="r-input" value={recordingDuration}
                onChange={e => handleDurationChange(e.target.value)} required
                placeholder="e.g., 120" />
              {durationError && (
                <p style={{ fontSize: '0.6875rem', color: 'var(--r-error)', marginTop: '0.25rem', fontWeight: 500 }}>
                  {durationError}
                </p>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="r-label">Recording Link</label>
            <input type="url" className="r-input" value={recordingLink}
              onChange={e => setRecordingLink(e.target.value)} required
              placeholder="https://drive.google.com/..." />
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
              Paste a link to the recording hosted on Google Drive, Dropbox, YouTube (unlisted), Vimeo (private), or any secure video hosting service. The link must be accessible to your Cohort Guide without requiring a login — unless you have shared access with them directly.
            </p>
          </div>
        </div>

        {/* Context Note */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Context Note</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Tell your Cohort Guide what was happening in this recording. What time of day was it? What was the work cycle like? Were there any unusual circumstances? Was there anything specific you want them to pay attention to?
          </p>
          <textarea className="r-textarea" value={contextNote}
            onChange={e => setContextNote(e.target.value)} required
            style={{ minHeight: '180px' }}
            placeholder="Describe the context of this recording..." />
          <p style={{ fontSize: '0.6875rem', color: wordCount(contextNote) >= 100 ? 'var(--r-success)' : 'var(--r-text-muted)', marginTop: '0.375rem' }}>
            {wordCount(contextNote)} / 100 words minimum
          </p>
        </div>

        {/* Family Consent */}
        <div className="r-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={familyConsent}
              onChange={e => setFamilyConsent(e.target.checked)}
              style={{ marginTop: '0.25rem', width: '18px', height: '18px' }} />
            <span style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
              I confirm that my school has obtained written family consent for classroom recording as required by the MMR partner school agreement.
            </span>
          </label>
        </div>

        {error && (
          <p style={{ color: 'var(--r-error)', fontSize: '0.8125rem', marginBottom: '1rem', padding: '0.75rem', background: 'var(--r-error-light)', borderRadius: '6px' }}>
            {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="submit" className="r-btn r-btn-primary" disabled={saving || !!durationError}>
            {saving ? 'Submitting...' : 'Submit Virtual Observation'}
          </button>
          <Link href="/residency/portal/practicum" className="r-btn r-btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

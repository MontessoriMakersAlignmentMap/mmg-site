'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import Link from 'next/link'

export default function SubmitPracticeVideoPage() {
  const { profile } = useResidencyAuth(['resident'])
  const router = useRouter()
  const [residentId, setResidentId] = useState<string | null>(null)
  const [level, setLevel] = useState('')
  const [strands, setStrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [lessonTitle, setLessonTitle] = useState('')
  const [strand, setStrand] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [materialsUsed, setMaterialsUsed] = useState('')
  const [selfReflection, setSelfReflection] = useState('')

  useEffect(() => {
    if (!profile) return
    async function load() {
      const { data: resident } = await supabase
        .from('residency_residents')
        .select('id, assigned_level:residency_levels(id, name)')
        .eq('profile_id', profile!.id)
        .single()

      if (!resident) { setLoading(false); return }
      setResidentId(resident.id)

      const lvl = Array.isArray(resident.assigned_level) ? resident.assigned_level[0] : resident.assigned_level
      setLevel(lvl?.name || 'Primary')

      const { data: strandData } = await supabase
        .from('residency_strands')
        .select('id, name')
        .eq('level_id', lvl?.id)
        .order('sort_order')

      if (strandData) setStrands(strandData)
      setLoading(false)
    }
    load()
  }, [profile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!residentId) return
    setSaving(true)
    setError('')

    // Validate word count
    const words = selfReflection.trim().split(/\s+/).filter(Boolean).length
    if (words < 100) {
      setError(`Self-reflection needs at least 100 words (currently ${words}).`)
      setSaving(false)
      return
    }

    // Validate video URL
    const urlLower = videoUrl.toLowerCase()
    if (!urlLower.includes('youtube') && !urlLower.includes('youtu.be') && !urlLower.includes('vimeo') && !urlLower.includes('drive.google')) {
      setError('Please use a YouTube, Vimeo, or Google Drive link for your video.')
      setSaving(false)
      return
    }

    const { error: insertError } = await supabase
      .from('residency_remote_materials_practice')
      .insert({
        resident_id: residentId,
        lesson_title: lessonTitle,
        strand,
        level,
        video_url: videoUrl,
        materials_used: materialsUsed,
        self_reflection: selfReflection,
      })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    // Notify mentor
    const { data: resident } = await supabase
      .from('residency_residents')
      .select('mentor_id')
      .eq('id', residentId)
      .single()

    if (resident?.mentor_id) {
      await supabase.from('residency_notifications').insert({
        recipient_id: resident.mentor_id,
        type: 'materials_practice',
        title: 'New practice video ready for review',
        message: `${profile?.first_name} ${profile?.last_name} submitted a remote materials practice video: ${lessonTitle}`,
        link: '/residency/mentor/materials-practice',
      })
    }

    router.push('/residency/portal/materials-practice')
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const reflectionWords = selfReflection.trim().split(/\s+/).filter(Boolean).length

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link href="/residency/portal/materials-practice" style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', textDecoration: 'none' }}>
          &larr; Back to Materials Practice
        </Link>
      </div>

      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Submit Practice Video</h1>
      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Record yourself giving a complete Montessori presentation using real materials
        or appropriate household substitutes, then share the video for your Cohort Guide&apos;s feedback.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--r-navy)' }}>Presentation Details</h2>

          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Lesson Title</label>
            <input type="text" className="r-input" value={lessonTitle}
              onChange={e => setLessonTitle(e.target.value)} required
              placeholder="e.g., Introduction to the Decimal System" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label className="r-label">Strand</label>
              <select className="r-input" value={strand} onChange={e => setStrand(e.target.value)} required>
                <option value="">Select strand...</option>
                {strands.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="r-label">Level</label>
              <input type="text" className="r-input" value={level} readOnly
                style={{ background: 'var(--r-cream)', cursor: 'default' }} />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label className="r-label">Video URL</label>
            <input type="url" className="r-input" value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)} required
              placeholder="YouTube, Vimeo, or Google Drive link" />
            <p style={{ fontSize: '0.6875rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
              Upload your video to YouTube (unlisted), Vimeo, or Google Drive and paste the link here.
            </p>
          </div>

          <div>
            <label className="r-label">Materials Used</label>
            <textarea className="r-textarea" value={materialsUsed}
              onChange={e => setMaterialsUsed(e.target.value)} required
              style={{ minHeight: '80px' }}
              placeholder="Were you using real Montessori materials or household substitutes? List what you used." />
          </div>
        </div>

        <div className="r-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.375rem', color: 'var(--r-navy)' }}>Self-Reflection</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Before submitting for Cohort Guide feedback, reflect on your own presentation.
            What went well? What do you want your Cohort Guide to focus on?
          </p>

          <textarea className="r-textarea" value={selfReflection}
            onChange={e => setSelfReflection(e.target.value)}
            style={{ minHeight: '180px' }}
            placeholder="Take a moment to watch your video back before writing this reflection. What do you notice about your technique, pacing, and presence? What felt confident? What do you want your Cohort Guide to pay attention to?" />
          <p style={{
            fontSize: '0.6875rem',
            color: reflectionWords >= 100 ? 'var(--r-success)' : 'var(--r-text-muted)',
            marginTop: '0.25rem',
          }}>
            {reflectionWords} / 100 words minimum
          </p>
        </div>

        {error && (
          <p style={{ color: 'var(--r-error)', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>
        )}

        <button type="submit" className="r-btn r-btn-primary" disabled={saving}
          style={{ fontSize: '0.8125rem' }}>
          {saving ? 'Submitting...' : 'Submit for Cohort Guide Review'}
        </button>
      </form>
    </div>
  )
}

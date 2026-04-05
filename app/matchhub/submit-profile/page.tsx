'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitGuideProfile } from '@/lib/db/profiles'
import type { GuideProfileInsert } from '@/lib/types/matchhub'

const serif = { fontFamily: 'var(--font-heading)' }

const trainingTypeOptions = ['AMI', 'AMS', 'MACTE', 'Other']

const roleTypeOptions = [
  'Head of School / Executive Director',
  'Principal / Assistant Principal',
  'Assistant Head / Associate Director',
  'Program Director',
  'Coach',
  'Primary Guide (3–6)',
  'Elementary Guide (6–12)',
  'Infant & Toddler Guide (0–3)',
  'Adolescent / Middle School Guide',
  'Admissions & Enrollment',
  'Administrative & Operations',
  'Other',
]

const ageLevelOptions = [
  'Infant/Toddler (0–3)',
  'Primary (3–6)',
  'Lower Elementary (6–9)',
  'Upper Elementary (9–12)',
  'Adolescent (12–15)',
]

const RESUME_MAX  = 10 * 1024 * 1024   // 10 MB
const PHOTO_MAX   =  5 * 1024 * 1024   //  5 MB
const PHOTO_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])

const inputClass = "w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] placeholder-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors"
const labelClass = "block text-[#374151] text-sm font-medium mb-2"

export default function SubmitProfilePage() {
  const [submitted,   setSubmitted]   = useState(false)
  const [submitStep,  setSubmitStep]  = useState<'idle' | 'uploading' | 'saving'>('idle')
  const [error,       setError]       = useState<string | null>(null)

  // File state — hold the actual File objects
  const [resumeFile,  setResumeFile]  = useState<File | null>(null)
  const [photoFile,   setPhotoFile]   = useState<File | null>(null)
  const [photoPreview,setPhotoPreview]= useState<string | null>(null)

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    role_type: '',
    is_trained: '',       // 'yes' | 'no'
    credential: '',
    location: '',
    years_experience: '',
    open_to_relocate: '',
    summary: '',
  })
  const [selectedLevels,  setSelectedLevels]  = useState<string[]>([])
  const [leadership,      setLeadership]      = useState(false)
  const [bilingual,       setBilingual]       = useState(false)
  const [publicMontessori,setPublicMontessori]= useState(false)

  function set(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function toggleLevel(level: string) {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    )
  }

  // ── Client-side file validation ─────────────────────────────────────────────

  function validateResumeFile(file: File): string | null {
    if (file.type !== 'application/pdf') return 'Resume must be a PDF file.'
    if (file.size > RESUME_MAX) return 'Resume must be under 10 MB.'
    return null
  }

  function validatePhotoFile(file: File): string | null {
    if (!PHOTO_TYPES.has(file.type)) return 'Photo must be a JPG, PNG, or WebP file.'
    if (file.size > PHOTO_MAX) return 'Photo must be under 5 MB.'
    return null
  }

  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (!file) { setResumeFile(null); return }
    const err = validateResumeFile(file)
    if (err) { setError(err); e.target.value = ''; return }
    setError(null)
    setResumeFile(file)
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (!file) { setPhotoFile(null); setPhotoPreview(null); return }
    const err = validatePhotoFile(file)
    if (err) { setError(err); e.target.value = ''; return }
    setError(null)
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  // ── Submit ──────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!resumeFile) {
      setError('A PDF resume is required.')
      return
    }

    setSubmitStep('uploading')

    // ── Step 1: Upload files via server route ──────────────────────────────
    const formData = new FormData()
    formData.append('resume', resumeFile)
    if (photoFile) formData.append('photo', photoFile)

    let resumeUrl: string
    let photoUrl: string | null = null

    try {
      const uploadRes = await fetch('/api/upload-profile-files', {
        method: 'POST',
        body: formData,
      })
      const uploadJson = await uploadRes.json() as { resumeUrl?: string; photoUrl?: string | null; error?: string }

      if (!uploadRes.ok || uploadJson.error) {
        setError(uploadJson.error ?? 'File upload failed. Please try again.')
        setSubmitStep('idle')
        return
      }

      resumeUrl = uploadJson.resumeUrl!
      photoUrl  = uploadJson.photoUrl ?? null
    } catch {
      setError('Upload failed. Check your connection and try again.')
      setSubmitStep('idle')
      return
    }

    // ── Step 2: Save profile row with file URLs ────────────────────────────
    setSubmitStep('saving')

    const nameParts  = form.full_name.trim().split(/\s+/)
    const first_name = nameParts[0] ?? form.full_name
    const last_initial = nameParts.length > 1 ? (nameParts[nameParts.length - 1][0] ?? '') : ''

    const tags: string[] = []
    if (leadership)      tags.push('Leadership')
    if (bilingual)       tags.push('Bilingual')
    if (publicMontessori)tags.push('Public Montessori')

    const payload: GuideProfileInsert = {
      first_name,
      last_initial,
      email:            form.email,
      role_type:        form.role_type || null,
      credential:       form.credential,
      location:         form.location,
      years_experience: parseInt(form.years_experience, 10) || 0,
      open_to_relocate: form.open_to_relocate,
      levels:           selectedLevels,
      summary:          form.summary,
      tags,
      leadership_experience: leadership,
      bilingual,
      public_montessori: publicMontessori,
      resume_url: resumeUrl,
      photo_url:  photoUrl,
      source: 'MatchHub talent',
    }

    const { error: err } = await submitGuideProfile(payload)

    if (err) {
      setError('Profile could not be saved. Please try again.')
      setSubmitStep('idle')
      return
    }

    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isSubmitting = submitStep !== 'idle'
  const buttonLabel =
    submitStep === 'uploading' ? 'Uploading files…' :
    submitStep === 'saving'    ? 'Saving profile…'  :
    'Submit Profile'

  // ── Success ─────────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <section className="bg-[#0e1a7a] min-h-screen flex items-center px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center py-32">
          <div className="w-14 h-14 rounded-full bg-[#d6a758]/20 border border-[#d6a758]/40 flex items-center justify-center mx-auto mb-10">
            <span className="text-[#d6a758] text-2xl">✓</span>
          </div>
          <h1 className="text-4xl md:text-5xl text-white leading-tight mb-6" style={serif}>
            Profile received.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-4 max-w-lg mx-auto">
            Your profile has been received and will be reviewed before being added to the MatchHub pool.
          </p>
          <p className="text-[#64748B] text-sm max-w-sm mx-auto mb-10">
            We review profiles to ensure quality and alignment. You&rsquo;ll hear from us if there&rsquo;s a match.
          </p>
          <Link href="/matchhub" className="text-[#d6a758] text-sm font-medium tracking-wide hover:underline">
            ← Back to MatchHub
          </Link>
        </div>
      </section>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────────

  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">Find Your School — Submit a Profile</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-6" style={serif}>
            Submit your profile.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
            Whether you&rsquo;re a classroom educator, a school leader, a coach, or in operations — get in front of Montessori schools looking for aligned people. Profiles are reviewed before being added to the pool.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="border-l-2 border-[#d6a758] pl-5 mb-12">
            <p className="text-[#374151] text-sm leading-relaxed">
              Free to submit, always. Profiles are reviewed by the MatchHub team to ensure alignment with the schools we work with.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name + Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" required placeholder="Your full name" className={inputClass}
                  value={form.full_name} onChange={e => set('full_name', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" required placeholder="you@example.com" className={inputClass}
                  value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
            </div>

            {/* Role Type */}
            <div>
              <label className={labelClass}>Role Type</label>
              <select required className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] transition-colors bg-white appearance-none"
                value={form.role_type} onChange={e => set('role_type', e.target.value)}>
                <option value="">Select the role you&apos;re seeking</option>
                {roleTypeOptions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Training */}
            <div>
              <label className={labelClass}>Montessori Training</label>
              <div className="flex gap-6 pt-1 mb-4">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                    <input type="radio" name="is_trained" value={opt.toLowerCase()} required className="accent-[#0e1a7a]"
                      checked={form.is_trained === opt.toLowerCase()}
                      onChange={() => {
                        set('is_trained', opt.toLowerCase())
                        if (opt === 'No') set('credential', '')
                      }} />
                    {opt}
                  </label>
                ))}
              </div>
              {form.is_trained === 'yes' && (
                <select required className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] transition-colors bg-white appearance-none"
                  value={form.credential} onChange={e => set('credential', e.target.value)}>
                  <option value="">Select training type</option>
                  {trainingTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              )}
            </div>

            {/* Location */}
            <div>
              <label className={labelClass}>Location</label>
              <input type="text" required placeholder="City, State" className={inputClass}
                value={form.location} onChange={e => set('location', e.target.value)} />
            </div>

            {/* Experience + Relocation */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Years of Experience</label>
                <input type="number" required min="0" max="50" placeholder="e.g. 4" className={inputClass}
                  value={form.years_experience} onChange={e => set('years_experience', e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Open to relocation?</label>
                <div className="flex gap-6 pt-3">
                  {['Yes', 'No', 'Depends on the role'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-[#374151] cursor-pointer">
                      <input type="radio" name="relocation" value={opt} required className="accent-[#0e1a7a]"
                        checked={form.open_to_relocate === opt}
                        onChange={() => set('open_to_relocate', opt)} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Age levels */}
            <div>
              <label className={labelClass}>
                Age Level(s) <span className="text-[#94A3B8] font-normal">(if applicable)</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {ageLevelOptions.map(level => {
                  const active = selectedLevels.includes(level)
                  return (
                    <button key={level} type="button" onClick={() => toggleLevel(level)}
                      className={`text-xs px-4 py-2.5 border transition-colors ${
                        active
                          ? 'bg-[#0e1a7a] border-[#0e1a7a] text-white'
                          : 'border-[#E2DDD6] text-[#374151] hover:border-[#0e1a7a]'
                      }`}
                    >
                      {level}
                    </button>
                  )
                })}
              </div>
              <p className="text-[#94A3B8] text-xs mt-2">Select all that apply. Leave blank if your role is not classroom-based.</p>
            </div>

            {/* Bio */}
            <div>
              <label className={labelClass}>Short Bio</label>
              <textarea required rows={5}
                placeholder="Tell schools who you are, what you bring, and what you're looking for..."
                className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] placeholder-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors resize-none"
                value={form.summary} onChange={e => set('summary', e.target.value)} />
              <p className="text-[#64748B] text-xs mt-1.5">Keep it to 2–3 sentences. This is what schools see first.</p>
            </div>

            {/* Extras */}
            <div>
              <label className={labelClass}>Additional</label>
              <div className="flex flex-wrap gap-5">
                {[
                  { state: leadership,       setter: setLeadership,       label: 'Leadership experience' },
                  { state: bilingual,        setter: setBilingual,        label: 'Bilingual' },
                  { state: publicMontessori, setter: setPublicMontessori, label: 'Public Montessori experience' },
                ].map(({ state, setter, label }) => (
                  <label key={label} className="flex items-center gap-2.5 cursor-pointer">
                    <div onClick={() => setter(!state)}
                      className={`w-4 h-4 border flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 ${state ? 'bg-[#0e1a7a] border-[#0e1a7a]' : 'border-[#E2DDD6]'}`}
                    >
                      {state && <span className="text-white" style={{ fontSize: 9 }}>✓</span>}
                    </div>
                    <span className="text-[#374151] text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Profile Photo (optional) */}
            <div>
              <label className={labelClass}>
                Profile Photo <span className="text-[#94A3B8] font-normal">(optional — JPG, PNG, or WebP, max 5 MB)</span>
              </label>
              <label className="flex items-center gap-5 border border-dashed border-[#E2DDD6] px-5 py-4 cursor-pointer hover:border-[#0e1a7a] transition-colors group">
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoPreview} alt="Preview" className="w-14 h-14 rounded-full object-cover flex-shrink-0 border border-[#E2DDD6]" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-[#F2EDE6] border border-[#E2DDD6] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <span className="text-[#64748B] text-xs tracking-wide group-hover:text-[#0e1a7a] transition-colors flex-1">
                  {photoFile?.name ?? 'Square crop works best'}
                </span>
                <input type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden"
                  onChange={handlePhotoChange} />
                <span className="ml-auto text-[#0e1a7a] text-xs font-medium border border-[#0e1a7a] px-3 py-1.5 flex-shrink-0 group-hover:bg-[#0e1a7a] group-hover:text-white transition-colors">Browse</span>
              </label>
            </div>

            {/* Resume (required, PDF only) */}
            <div>
              <label className={labelClass}>
                Resume <span className="text-[#94A3B8] font-normal">(required — PDF only, max 10 MB)</span>
              </label>
              <label className={`flex items-center gap-4 border border-dashed px-5 py-4 cursor-pointer hover:border-[#0e1a7a] transition-colors group ${
                resumeFile ? 'border-[#0e1a7a]' : 'border-[#E2DDD6]'
              }`}>
                <span className={`text-xs tracking-wide transition-colors flex-1 ${
                  resumeFile ? 'text-[#0e1a7a] font-medium' : 'text-[#64748B] group-hover:text-[#0e1a7a]'
                }`}>
                  {resumeFile?.name ?? 'Choose a PDF file'}
                </span>
                <input type="file" accept=".pdf" className="hidden"
                  onChange={handleResumeChange} />
                <span className="ml-auto text-[#0e1a7a] text-xs font-medium border border-[#0e1a7a] px-3 py-1.5 flex-shrink-0 group-hover:bg-[#0e1a7a] group-hover:text-white transition-colors">Browse</span>
              </label>
              {!resumeFile && (
                <p className="text-[#94A3B8] text-xs mt-1.5">PDF only. Word documents are not accepted.</p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 px-5 py-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <div className="pt-4">
              <button type="submit" disabled={isSubmitting}
                className="bg-[#d6a758] text-white text-sm px-12 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed min-w-[180px]">
                {buttonLabel}
              </button>
              <p className="text-[#64748B] text-xs mt-3">
                Free to submit, always. Profiles are reviewed before being added to the MatchHub pool.
              </p>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}

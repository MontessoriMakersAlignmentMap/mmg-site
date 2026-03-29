'use client'

import { useState } from 'react'
import type { PublicTalentProfile } from '@/lib/types/talent-pool'

const serif = { fontFamily: 'var(--font-heading)' }
const inputClass =
  'w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors'
const labelClass = 'block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2'
const labelLongClass = 'block text-[#374151] text-sm font-medium mb-2'

interface Props {
  profiles: PublicTalentProfile[]
}

type FormState = {
  schoolName: string
  contactName: string
  email: string
  phone: string
  candidateId: string
  roleOfInterest: string
  message: string
  agreedToFee: boolean
}

const emptyForm: FormState = {
  schoolName: '',
  contactName: '',
  email: '',
  phone: '',
  candidateId: '',
  roleOfInterest: '',
  message: '',
  agreedToFee: false,
}

// ── Profile modal ────────────────────────────────────────────────────────────

function ProfileModal({
  profile,
  onClose,
  onRequestIntro,
}: {
  profile: PublicTalentProfile
  onClose: () => void
  onRequestIntro: (id: string) => void
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0e1a7a] px-8 py-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-2">
              {profile.candidate_id}
            </p>
            <h2 className="text-2xl text-white leading-tight" style={serif}>
              {profile.display_title ?? 'Candidate Profile'}
            </h2>
            <p className="text-[#94A3B8] text-sm mt-1">
              {[profile.levels?.join(', '), profile.training].filter(Boolean).join(' · ')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-2xl leading-none flex-shrink-0 mt-1"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6">
          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Experience', value: profile.years_experience },
              { label: 'Region', value: profile.region },
              {
                label: 'Relocation',
                value: profile.open_to_relocate ? 'Open to relocate' : 'Not seeking relocation',
              },
              { label: 'Training', value: profile.training },
            ]
              .filter(s => s.value)
              .map(stat => (
                <div key={stat.label}>
                  <p className="text-[#64748B] text-xs tracking-[0.12em] uppercase mb-1">
                    {stat.label}
                  </p>
                  <p className="text-[#374151] text-sm font-medium">{stat.value}</p>
                </div>
              ))}
          </div>

          {/* Summary */}
          {profile.public_summary && (
            <div>
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-3">Profile</p>
              <p className="text-[#374151] text-base leading-relaxed">{profile.public_summary}</p>
            </div>
          )}

          {/* Tags */}
          {profile.tags?.length > 0 && (
            <div>
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-3">
                Strengths & Focus Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-[#F2EDE6] text-[#8A6014] text-xs px-3 py-1 border border-[#E2DDD6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-4">
            <p className="text-[#64748B] text-xs leading-relaxed">
              This profile is intentionally anonymized. Introductions are facilitated through
              Montessori Makers. A placement fee applies if your school hires a candidate introduced
              through this process.
            </p>
          </div>

          <button
            onClick={() => {
              onClose()
              onRequestIntro(profile.candidate_id)
            }}
            className="w-full bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
          >
            Request Introduction
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Profile card ─────────────────────────────────────────────────────────────

function ProfileCard({
  profile,
  onView,
  onRequestIntro,
}: {
  profile: PublicTalentProfile
  onView: () => void
  onRequestIntro: (id: string) => void
}) {
  const chips = [
    profile.training,
    profile.years_experience,
    profile.region,
    profile.open_to_relocate ? 'Open to relocate' : null,
  ].filter(Boolean) as string[]

  return (
    <div className="bg-white border border-[#E2DDD6] flex flex-col hover:border-[#0e1a7a] transition-colors">
      <div className="p-7 flex-1">
        {/* Eyebrow */}
        <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">
          Talent Pool Profile
        </p>

        {/* Title */}
        <h3 className="text-[#0e1a7a] font-semibold text-lg leading-snug mb-1" style={serif}>
          {profile.display_title ?? 'Montessori Educator'}
        </h3>

        {/* Candidate ID + levels */}
        <p className="text-[#374151] text-sm mb-4">
          {profile.candidate_id}
          {profile.levels?.length > 0 && (
            <span className="text-[#64748B]"> · {profile.levels.join(', ')}</span>
          )}
        </p>

        {/* Detail chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {chips.map(chip => (
              <span
                key={chip}
                className="bg-[#F2EDE6] text-[#8A6014] text-[10px] px-2 py-0.5 border border-[#E2DDD6]"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Summary — 3 lines max */}
        {profile.public_summary && (
          <p className="text-[#374151] text-sm leading-relaxed mb-4 line-clamp-3">
            {profile.public_summary}
          </p>
        )}

        {/* Strength tags — up to 5 */}
        {profile.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {profile.tags.slice(0, 5).map(tag => (
              <span
                key={tag}
                className="bg-[#FAF9F7] text-[#64748B] text-[10px] px-2 py-0.5 border border-[#E2DDD6]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-7 pb-7 pt-4 border-t border-[#E2DDD6] mt-auto flex items-center gap-3">
        <button
          onClick={() => onRequestIntro(profile.candidate_id)}
          className="flex-1 bg-[#d6a758] text-white text-xs px-4 py-2.5 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
        >
          Request Introduction →
        </button>
        <button
          onClick={onView}
          className="text-[#64748B] text-xs hover:text-[#0e1a7a] transition-colors whitespace-nowrap flex-shrink-0"
        >
          View Profile
        </button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TalentPoolClient({ profiles }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [modalProfile, setModalProfile] = useState<PublicTalentProfile | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [hp, setHp] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  function openRequestForm(candidateId: string) {
    setForm(prev => ({ ...prev, candidateId }))
    document.getElementById('request-intro')?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.agreedToFee) {
      setFormError('Please acknowledge the placement fee before submitting.')
      return
    }
    setLoading(true)
    setFormError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.contactName,
          email: form.email,
          organization: form.schoolName,
          role: form.roleOfInterest,
          message: form.message,
          schoolSize: form.phone,   // repurposing field for phone
          situation: `Candidate ID: ${form.candidateId}`,
          service: 'Talent Pool Introduction Request',
          source: 'talent-pool page',
          hp,
        }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setFormError('Something went wrong. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  // Derived data for filters
  const allLevels = Array.from(new Set(profiles.flatMap(p => p.levels ?? [])))
  const filteredProfiles =
    activeFilter === 'all'
      ? profiles
      : profiles.filter(p => p.levels?.includes(activeFilter))

  return (
    <>
      {/* Filters + profile grid */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase">
              Current Talent Profiles
            </p>
            {allLevels.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`text-xs px-3 py-1.5 transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-[#0e1a7a] text-white'
                      : 'text-[#64748B] border border-[#E2DDD6] hover:border-[#0e1a7a]'
                  }`}
                >
                  All
                </button>
                {allLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => setActiveFilter(level)}
                    className={`text-xs px-3 py-1.5 transition-colors ${
                      activeFilter === level
                        ? 'bg-[#0e1a7a] text-white'
                        : 'text-[#64748B] border border-[#E2DDD6] hover:border-[#0e1a7a]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>

          {filteredProfiles.length === 0 ? (
            <div className="py-20 max-w-lg">
              <p className="text-[#374151] text-lg leading-relaxed mb-4">
                No profiles are currently being shared.
              </p>
              <p className="text-[#64748B] text-base leading-relaxed">
                Check back soon or reach out directly if your school is hiring.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map(profile => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onView={() => setModalProfile(profile)}
                  onRequestIntro={openRequestForm}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Request Introduction form */}
      <section
        id="request-intro"
        className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Introductions
            </p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Interested in Learning More?
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-6">
              If you&rsquo;d like to request a full candidate profile or introduction,
              submit the form below and reference the candidate ID.
            </p>
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-6">
              <p className="text-[#64748B] text-sm leading-relaxed">
                Introductions are handled through Montessori Makers. Please reference the
                candidate ID when inquiring. A placement fee applies if your school hires
                a candidate introduced through this process.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-10">
                <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Received</p>
                <p className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>
                  Thank you, {form.contactName || 'there'}.
                </p>
                <p className="text-[#374151] text-sm leading-relaxed">
                  Your introduction request has been received. If there is alignment,
                  we&rsquo;ll be in touch within two weeks.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="hp"
                  value={hp}
                  onChange={e => setHp(e.target.value)}
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
                />

                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    required
                    value={form.contactName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Email <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@school.org"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Phone (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    School / Organization <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    required
                    value={form.schoolName}
                    onChange={handleChange}
                    placeholder="Your school name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Candidate ID <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="text"
                    name="candidateId"
                    required
                    value={form.candidateId}
                    onChange={handleChange}
                    placeholder="e.g. MMG-001"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelLongClass}>Role you are hiring for</label>
                  <input
                    type="text"
                    name="roleOfInterest"
                    value={form.roleOfInterest}
                    onChange={handleChange}
                    placeholder="Primary Guide, Head of School..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelLongClass}>Anything else we should know?</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="School context, timeline, what you're looking for..."
                    className={`${inputClass} resize-none leading-relaxed`}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreedToFee"
                    name="agreedToFee"
                    checked={form.agreedToFee}
                    onChange={handleChange}
                    className="mt-1 flex-shrink-0 accent-[#0e1a7a]"
                  />
                  <label htmlFor="agreedToFee" className="text-[#374151] text-sm leading-relaxed cursor-pointer">
                    I understand that a placement fee applies if my school hires a candidate
                    introduced through Montessori Makers.
                  </label>
                </div>

                {formError && <p className="text-red-600 text-sm">{formError}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? 'Submitting…' : 'Request Introduction'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Profile modal */}
      {modalProfile && (
        <ProfileModal
          profile={modalProfile}
          onClose={() => setModalProfile(null)}
          onRequestIntro={id => {
            setModalProfile(null)
            openRequestForm(id)
          }}
        />
      )}
    </>
  )
}

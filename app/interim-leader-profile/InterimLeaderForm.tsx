'use client'

import { useState, useRef } from 'react'

// ── Constants ──────────────────────────────────────────────────────────────────

const LEVELS_OPTIONS = [
  'Infant/Toddler', 'Primary', 'Lower Elementary',
  'Upper Elementary', 'Middle School', 'High School',
]
const SCHOOL_TYPE_OPTIONS = [
  'Independent/private', 'Public Montessori', 'Charter',
  'International', 'Justice-centered or community school', 'Other',
]
const AVAILABILITY_OPTIONS = [
  'Available immediately', 'Within 30 days', 'Within 60–90 days', 'Timing is flexible',
]
const REGION_OPTIONS = [
  'Northeast', 'Mid-Atlantic', 'Southeast', 'Midwest',
  'South Central', 'Mountain West', 'Pacific Northwest', 'Pacific Southwest', 'International',
]
const ENGAGEMENT_OPTIONS = ['1–3 months', '3–6 months', '6–12 months', 'Flexible']
const EXPERIENCE_LEVELS = ['Direct experience', 'Adjacent experience', 'No experience yet']

const SCENARIOS = [
  {
    key: 'a',
    label: 'Scenario A',
    description:
      'The founding head leaves abruptly. Staff morale is low, the board is divided, and families are leaving.',
  },
  {
    key: 'b',
    label: 'Scenario B',
    description:
      'The school is mid-accreditation when the head departs. The visiting team arrives in four months. Records are disorganized.',
  },
  {
    key: 'c',
    label: 'Scenario C',
    description:
      'Years of permissive leadership have eroded the culture. Montessori fidelity is low. Families are confused about what they enrolled in.',
  },
  {
    key: 'd',
    label: 'Scenario D',
    description:
      'The board has been overstepping governance, micromanaging operations. The previous head never pushed back.',
  },
]

// ── Types ──────────────────────────────────────────────────────────────────────

interface ILFormData {
  full_name: string
  email: string
  phone: string
  location: string
  current_position: string
  years_in_montessori: string
  credentials: string
  levels_taught: string[]
  school_types: string[]
  leadership_roles: string
  board_experience: string
  hard_decision: string
  staff_management: string
  financial_responsibility: string
  purpose_of_interim: string
  entering_unknown_community: string
  equity_in_practice: string
  least_equipped: string
  scenario_a_level: string
  scenario_a_description: string
  scenario_b_level: string
  scenario_b_description: string
  scenario_c_level: string
  scenario_c_description: string
  scenario_d_level: string
  scenario_d_description: string
  availability: string
  regions: string[]
  engagement_length: string
  constraints: string
  compensation: string
  reference_1_name: string
  reference_1_role: string
  reference_1_relationship: string
  reference_1_contact: string
  reference_2_name: string
  reference_2_role: string
  reference_2_relationship: string
  reference_2_contact: string
  open_field: string
}

const EMPTY: ILFormData = {
  full_name: '', email: '', phone: '', location: '', current_position: '',
  years_in_montessori: '', credentials: '', levels_taught: [], school_types: [],
  leadership_roles: '', board_experience: '', hard_decision: '', staff_management: '',
  financial_responsibility: '', purpose_of_interim: '', entering_unknown_community: '',
  equity_in_practice: '', least_equipped: '',
  scenario_a_level: '', scenario_a_description: '',
  scenario_b_level: '', scenario_b_description: '',
  scenario_c_level: '', scenario_c_description: '',
  scenario_d_level: '', scenario_d_description: '',
  availability: '', regions: [], engagement_length: '', constraints: '', compensation: '',
  reference_1_name: '', reference_1_role: '', reference_1_relationship: '', reference_1_contact: '',
  reference_2_name: '', reference_2_role: '', reference_2_relationship: '', reference_2_contact: '',
  open_field: '',
}

// ── Style tokens ───────────────────────────────────────────────────────────────

const serif = { fontFamily: 'var(--font-heading)' }

const inputCls =
  'w-full border border-[#E2DDD6] bg-white px-3 py-2.5 text-sm text-[#374151] ' +
  'focus:outline-none focus:border-[#0e1a7a] transition-colors placeholder:text-[#94A3B8]'

const textareaCls =
  'w-full border border-[#E2DDD6] bg-white px-3 py-2.5 text-sm text-[#374151] ' +
  'focus:outline-none focus:border-[#0e1a7a] transition-colors resize-y ' +
  'placeholder:text-[#94A3B8]'

const labelCls = 'block text-[11px] font-semibold text-[#374151] uppercase tracking-[0.08em] mb-1.5'
const hintCls = 'text-[11px] text-[#64748B] mb-2'

function SectionHeader({ num, title }: { num: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[#E2DDD6]">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0e1a7a] text-white text-xs font-bold flex-shrink-0">
        {num}
      </div>
      <h2 className="text-xl font-semibold text-[#0e1a7a]" style={serif}>{title}</h2>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function InterimLeaderForm() {
  const [form, setForm] = useState<ILFormData>(EMPTY)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resumeRef = useRef<HTMLInputElement>(null)

  // ── Field helpers ────────────────────────────────────────────────────────────

  function field(key: keyof ILFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [key]: e.target.value }))
  }

  function toggle(key: 'levels_taught' | 'school_types' | 'regions', value: string) {
    setForm(p => {
      const arr = p[key] as string[]
      return { ...p, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }
    })
  }

  function radio(key: keyof ILFormData, value: string) {
    setForm(p => ({ ...p, [key]: value }))
  }

  // ── Submit ───────────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!resumeFile) {
      setError('Please upload your resume before submitting.')
      document.getElementById('resume-upload')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('resume', resumeFile)
      for (const [key, value] of Object.entries(form)) {
        fd.append(key, Array.isArray(value) ? JSON.stringify(value) : value)
      }
      const res = await fetch('/api/interim-leader-profile', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Submission failed. Please try again.'); return }
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success state ────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center px-6 py-24">
        <div className="max-w-lg text-center">
          <div className="w-14 h-14 bg-[#0e1a7a] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-[#d6a758]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl text-[#0e1a7a] mb-4" style={serif}>Profile received.</h1>
          <p className="text-[#374151] leading-relaxed mb-3">
            Thank you for taking the time to complete this. Hannah will review your profile and be in touch if there is a potential fit with an active search.
          </p>
          <p className="text-[#64748B] text-sm leading-relaxed">
            Questions in the meantime?{' '}
            <a href="mailto:hannah@montessorimakers.org" className="text-[#d6a758] hover:underline">
              hannah@montessorimakers.org
            </a>
          </p>
        </div>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#FAF9F7]">

      {/* Header */}
      <div className="bg-[#0e1a7a] pt-16 pb-14 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-5">
            Montessori Makers Group
          </p>
          <h1 className="text-4xl md:text-5xl text-white leading-tight mb-5" style={serif}>
            Interim Leader Profile
          </h1>
          <p className="text-[#94A3B8] text-base leading-relaxed max-w-2xl">
            This form helps us understand your background, approach, and availability for interim
            leadership placements in Montessori schools and organizations. Most people take
            30–45 minutes to complete it thoughtfully.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 md:px-0 py-14 space-y-16">

        {/* ── 1. Professional Background ──────────────────────────────── */}
        <section>
          <SectionHeader num={1} title="Professional Background" />
          <div className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Full name <span className="text-red-500 normal-case font-normal">*</span></label>
                <input required value={form.full_name} onChange={field('full_name')} className={inputCls} placeholder="Jane Smith" />
              </div>
              <div>
                <label className={labelCls}>Email address <span className="text-red-500 normal-case font-normal">*</span></label>
                <input required type="email" value={form.email} onChange={field('email')} className={inputCls} placeholder="jane@example.com" />
              </div>
              <div>
                <label className={labelCls}>Phone number</label>
                <input type="tel" value={form.phone} onChange={field('phone')} className={inputCls} placeholder="(555) 000-0000" />
              </div>
              <div>
                <label className={labelCls}>Current location <span className="normal-case font-normal text-[#64748B]">(city, state/country)</span></label>
                <input value={form.location} onChange={field('location')} className={inputCls} placeholder="Chicago, IL" />
              </div>
            </div>

            <div>
              <label className={labelCls}>Current or most recent role and school</label>
              <input value={form.current_position} onChange={field('current_position')} className={inputCls} placeholder="Head of School, Sunrise Montessori" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Years in Montessori education</label>
                <input value={form.years_in_montessori} onChange={field('years_in_montessori')} className={inputCls} placeholder="12 years" />
              </div>
              <div>
                <label className={labelCls}>Montessori credentials</label>
                <input value={form.credentials} onChange={field('credentials')} className={inputCls} placeholder="AMI 3–6, AMS Administration" />
              </div>
            </div>

            <div>
              <label className={labelCls}>Levels taught or led</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 mt-2">
                {LEVELS_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={form.levels_taught.includes(opt)} onChange={() => toggle('levels_taught', opt)} className="accent-[#0e1a7a] w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-[#374151]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>School types</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 mt-2">
                {SCHOOL_TYPE_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={form.school_types.includes(opt)} onChange={() => toggle('school_types', opt)} className="accent-[#0e1a7a] w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-[#374151]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div id="resume-upload">
              <label className={labelCls}>
                Resume <span className="text-red-500 normal-case font-normal">*</span>{' '}
                <span className="normal-case font-normal text-[#64748B]">(PDF or Word)</span>
              </label>
              {resumeFile ? (
                <div className="flex items-center gap-3 px-4 py-3 bg-[#f5e8cc] border border-[#d6a758]">
                  <svg className="w-4 h-4 text-[#8A6014] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-[#8A6014] font-medium truncate flex-1">{resumeFile.name}</span>
                  <button type="button" onClick={() => { setResumeFile(null); if (resumeRef.current) resumeRef.current.value = '' }} className="text-xs text-[#8A6014] hover:text-red-600 flex-shrink-0">
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-[#d6a758] bg-white cursor-pointer hover:bg-[#fdf8f0] transition-colors">
                  <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setResumeFile(e.target.files?.[0] ?? null)} />
                  <svg className="w-4 h-4 text-[#d6a758] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="text-sm text-[#64748B]">Click to upload resume (PDF or Word, max 10 MB)</span>
                </label>
              )}
            </div>

          </div>
        </section>

        {/* ── 2. Leadership Experience ────────────────────────────────── */}
        <section>
          <SectionHeader num={2} title="Leadership Experience" />
          <div className="space-y-5">
            <div>
              <label className={labelCls}>Formal leadership roles held</label>
              <p className={hintCls}>Titles, organizations, and approximate dates.</p>
              <textarea rows={4} value={form.leadership_roles} onChange={field('leadership_roles')} className={textareaCls} placeholder="Head of School, River Montessori, 2018–2023…" />
            </div>
            <div>
              <label className={labelCls}>Board experience</label>
              <p className={hintCls}>Board membership, governance roles, or advisory experience.</p>
              <textarea rows={3} value={form.board_experience} onChange={field('board_experience')} className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>Describe a time you had to make a hard decision that not everyone agreed with</label>
              <p className={hintCls}>What was the situation, what did you decide, and what happened?</p>
              <textarea rows={5} value={form.hard_decision} onChange={field('hard_decision')} className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>Staff management experience</label>
              <p className={hintCls}>Include hiring and separation experience.</p>
              <textarea rows={4} value={form.staff_management} onChange={field('staff_management')} className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>Financial and operational responsibility held</label>
              <p className={hintCls}>Budget size, oversight scope, operational decisions made.</p>
              <textarea rows={3} value={form.financial_responsibility} onChange={field('financial_responsibility')} className={textareaCls} />
            </div>
          </div>
        </section>

        {/* ── 3. Philosophy and Approach ──────────────────────────────── */}
        <section>
          <SectionHeader num={3} title="Philosophy and Approach" />
          <div className="space-y-5">
            <div>
              <label className={labelCls}>How do you think about the purpose of interim leadership?</label>
              <textarea rows={4} value={form.purpose_of_interim} onChange={field('purpose_of_interim')} className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>How do you approach entering an unknown school community?</label>
              <textarea rows={4} value={form.entering_unknown_community} onChange={field('entering_unknown_community')} className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>What does equity look like in your leadership practice?</label>
              <textarea rows={4} value={form.equity_in_practice} onChange={field('equity_in_practice')} className={textareaCls} />
            </div>
            <div>
              <label className={labelCls}>What situations are you least equipped to handle?</label>
              <p className={hintCls}>Honest answers here are more useful than confident ones.</p>
              <textarea rows={4} value={form.least_equipped} onChange={field('least_equipped')} className={textareaCls} />
            </div>
          </div>
        </section>

        {/* ── 4. Scenario Experience ──────────────────────────────────── */}
        <section>
          <SectionHeader num={4} title="Scenario Experience" />
          <p className="text-sm text-[#64748B] leading-relaxed -mt-4 mb-8">
            For each scenario, select your level of experience and briefly describe it.
            If you have no direct experience, describe how you would approach it.
          </p>
          <div className="space-y-6">
            {SCENARIOS.map(scenario => {
              const lvlKey = `scenario_${scenario.key}_level` as keyof ILFormData
              const descKey = `scenario_${scenario.key}_description` as keyof ILFormData
              return (
                <div key={scenario.key} className="border border-[#E2DDD6] bg-white overflow-hidden">
                  <div className="px-5 py-2.5 bg-[#f5e8cc] border-b border-[#E2DDD6]">
                    <span className="text-[11px] font-bold text-[#8A6014] uppercase tracking-[0.12em]">
                      {scenario.label}
                    </span>
                  </div>
                  <div className="p-5 space-y-4">
                    <p className="text-sm text-[#374151] leading-relaxed">{scenario.description}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {EXPERIENCE_LEVELS.map(lvl => (
                        <label key={lvl} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`scenario_${scenario.key}_level`}
                            value={lvl}
                            checked={form[lvlKey] === lvl}
                            onChange={() => radio(lvlKey, lvl)}
                            className="accent-[#0e1a7a] w-4 h-4"
                          />
                          <span className="text-sm text-[#374151]">{lvl}</span>
                        </label>
                      ))}
                    </div>
                    <textarea
                      rows={3}
                      value={form[descKey] as string}
                      onChange={e => setForm(p => ({ ...p, [descKey]: e.target.value }))}
                      className={textareaCls}
                      placeholder="Describe your experience or approach…"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── 5. Availability and Logistics ──────────────────────────── */}
        <section>
          <SectionHeader num={5} title="Availability and Logistics" />
          <div className="space-y-6">

            <div>
              <label className={labelCls}>On-site availability</label>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                {AVAILABILITY_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="availability" value={opt} checked={form.availability === opt} onChange={() => radio('availability', opt)} className="accent-[#0e1a7a] w-4 h-4" />
                    <span className="text-sm text-[#374151]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>US regions available for on-site service</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 mt-2">
                {REGION_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={form.regions.includes(opt)} onChange={() => toggle('regions', opt)} className="accent-[#0e1a7a] w-4 h-4 flex-shrink-0" />
                    <span className="text-sm text-[#374151]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Preferred engagement length</label>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                {ENGAGEMENT_OPTIONS.map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="engagement_length" value={opt} checked={form.engagement_length === opt} onChange={() => radio('engagement_length', opt)} className="accent-[#0e1a7a] w-4 h-4" />
                    <span className="text-sm text-[#374151]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelCls}>Constraints or considerations</label>
              <p className={hintCls}>Travel, family, geography, timing — anything relevant.</p>
              <textarea rows={3} value={form.constraints} onChange={field('constraints')} className={textareaCls} />
            </div>

            <div>
              <label className={labelCls}>Compensation expectations</label>
              <textarea rows={2} value={form.compensation} onChange={field('compensation')} className={textareaCls} placeholder="Daily rate, monthly retainer, open to discussion, etc." />
            </div>

          </div>
        </section>

        {/* ── 6. References ───────────────────────────────────────────── */}
        <section>
          <SectionHeader num={6} title="References" />
          <div className="space-y-6">
            {([1, 2] as const).map(num => (
              <div key={num} className="border border-[#E2DDD6] bg-white overflow-hidden">
                <div className="px-5 py-2.5 bg-[#f5e8cc] border-b border-[#E2DDD6]">
                  <span className="text-[11px] font-bold text-[#8A6014] uppercase tracking-[0.12em]">
                    Reference {num}
                  </span>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Name</label>
                    <input
                      value={form[`reference_${num}_name`]}
                      onChange={field(`reference_${num}_name`)}
                      className={inputCls}
                      placeholder="Dr. Maria Johnson"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Role / title</label>
                    <input
                      value={form[`reference_${num}_role`]}
                      onChange={field(`reference_${num}_role`)}
                      className={inputCls}
                      placeholder="Board Chair, AMI Consultant"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Relationship to you</label>
                    <input
                      value={form[`reference_${num}_relationship`]}
                      onChange={field(`reference_${num}_relationship`)}
                      className={inputCls}
                      placeholder="Former supervisor, colleague, board member"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Contact information</label>
                    <input
                      value={form[`reference_${num}_contact`]}
                      onChange={field(`reference_${num}_contact`)}
                      className={inputCls}
                      placeholder="email or phone"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Open Field ───────────────────────────────────────────── */}
        <section>
          <SectionHeader num={7} title="Anything else?" />
          <div>
            <label className={labelCls}>
              Is there something important about your background, values, or way of working that this form didn&apos;t ask about?
            </label>
            <textarea rows={5} value={form.open_field} onChange={field('open_field')} className={textareaCls} />
          </div>
        </section>

        {/* ── Submit ──────────────────────────────────────────────────── */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 leading-relaxed">
            {error}
          </div>
        )}

        <div className="pb-12 space-y-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#0e1a7a] text-[#d6a758] text-sm font-semibold px-14 py-4 tracking-wide hover:bg-[#162270] transition-colors disabled:opacity-50"
          >
            {submitting ? 'Submitting…' : 'Submit Profile'}
          </button>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Your information is private and used only for placement consideration. It will not be shared without your permission.
          </p>
        </div>

      </form>
    </div>
  )
}

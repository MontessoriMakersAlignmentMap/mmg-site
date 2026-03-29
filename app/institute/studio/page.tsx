'use client'

import { useState } from 'react'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const inputClass =
  'w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors'
const labelClass = 'block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2'
const labelLongClass = 'block text-[#374151] text-sm font-medium mb-2'

const sessionDates = [
  'September 8, 2026',
  'October 13, 2026',
  'November 10, 2026',
  'December 8, 2026',
  'January 12, 2027',
  'February 9, 2027',
  'March 9, 2027',
  'April 13, 2027',
  'May 11, 2027',
]

const caseQuestions = [
  'What is actually happening?',
  'What developmental or organizational need is unmet?',
  'What conditions created this pattern?',
  'What response preserves dignity and order?',
]

const sessionOutcomes = [
  'A clearer response to a current leadership challenge',
  'Language you can use immediately in conversation',
  'A framework you can apply again',
  'Understanding of why the situation occurred',
]

const longerOutcomes = [
  'stronger decision-making',
  'calmer communication',
  'reduced reactive cycles',
  'increased staff trust',
  'confidence in complex moments',
]

const admissionCriteria = [
  'experience level',
  'leadership role',
  'ability to engage in rigorous, confidential case work',
]

const cohortStats = [
  { label: 'Cohort', value: 'September 2026 &ndash; May 2027' },
  { label: 'Cadence', value: 'Monthly · 9 sessions' },
  { label: 'Format', value: 'Live online · 90 min · not recorded' },
  { label: 'Cohort Size', value: '8&ndash;12 members' },
]

type FormState = {
  name: string
  email: string
  role: string
  organization: string
  timeline: string   // Years in Montessori
  schoolSize: string // Age level experience
  message: string    // Leadership situations currently navigating
  goals: string      // What would make this cohort valuable
  situation: string  // Pattern trying to shift
}

const emptyForm: FormState = {
  name: '',
  email: '',
  role: '',
  organization: '',
  timeline: '',
  schoolSize: '',
  message: '',
  goals: '',
  situation: '',
}

export default function StudioPage() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [hp, setHp] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setFormError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          role: form.role,
          organization: form.organization,
          timeline: form.timeline,
          schoolSize: form.schoolSize,
          message: form.message,
          goals: form.goals,
          situation: form.situation,
          service: 'Leadership Studio',
          source: 'studio page — cohort application',
          hp,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setFormError(
        'Something went wrong. Please try again or email us at info@montessorimakers.org.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Leadership Studio
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              An ongoing practice. Not a one-time course.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
              A monthly peer learning community for active Montessori leaders.
              Structured reflection, real case work, and sustained practice with
              a small cohort who understand the work.
            </p>
            <p className="text-[#7A8FA3] text-base leading-relaxed mb-12 max-w-2xl">
              Not a lecture series. Not a support group. A community of practice
              with real rigor and real confidentiality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#apply"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Apply for the Cohort
              </a>
              <a
                href="#what-it-is"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Learn About the Studio &darr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Framing */}
      <section className="bg-white py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              Leadership Studio creates a structured space to think carefully
              before acting quickly.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              School leaders make dozens of decisions each week that affect
              trust, culture, and stability. Most are never taught how to reason
              through these moments.
            </p>
          </div>
          <div>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              Over time, this creates inconsistency &mdash; and inconsistency
              erodes trust.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              The Studio builds the ability to reason clearly in complex
              situations &mdash; not just once, but repeatedly.
            </p>
          </div>
        </div>
      </section>

      {/* What It Is */}
      <section id="what-it-is" className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              What It Is
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              A standing cohort for leaders who need a thinking community.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-[#374151] text-lg leading-relaxed mb-6">
                Each session is structured around a real case &mdash; a specific
                situation brought anonymously by a member of the group.
              </p>
              <p className="text-[#374151] text-base leading-relaxed mb-6">
                The group works it together:
              </p>
              <div className="space-y-3">
                {[
                  'naming what is actually happening',
                  'applying Montessori principles',
                  'reaching a response that is grounded and actionable',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">
                      &mdash;
                    </span>
                    <span className="text-[#374151] text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white border border-[#E2DDD6] p-8">
                <div className="space-y-4">
                  {[
                    'This is not coaching.',
                    'This is not open discussion.',
                    'It is guided reasoning.',
                  ].map((line) => (
                    <p key={line} className="text-[#374151] text-base leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              How It Works
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Every session is built around a real case.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4 font-mono">
                01
              </p>
              <h3
                className="text-[#0e1a7a] font-semibold text-lg mb-2"
                style={serif}
              >
                Applied Montessori Lens
              </h3>
              <p className="text-[#64748B] text-sm mb-4">30 minutes</p>
              <p className="text-[#374151] text-base leading-relaxed">
                Translate a Montessori principle into organizational reasoning.
              </p>
            </div>

            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4 font-mono">
                02
              </p>
              <h3
                className="text-[#0e1a7a] font-semibold text-lg mb-2"
                style={serif}
              >
                Case Studio
              </h3>
              <p className="text-[#64748B] text-sm mb-4">60 minutes</p>
              <p className="text-[#374151] text-base leading-relaxed mb-5">
                Work through a real leadership situation step-by-step:
              </p>
              <div className="space-y-3">
                {caseQuestions.map((q) => (
                  <div key={q} className="flex items-start gap-3">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">
                      &mdash;
                    </span>
                    <span className="text-[#374151] text-sm">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-2xl">
            <blockquote className="border-l-4 border-[#d6a758] pl-6 py-1">
              <p className="text-[#374151] text-base italic leading-relaxed mb-3">
                Participants are never required to share personal situations
                publicly.
              </p>
              <p className="text-[#374151] text-base italic leading-relaxed">
                Confidentiality is not optional &mdash; it is what makes the
                work possible.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Outcomes
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8"
              style={serif}
            >
              What you leave each session with.
            </h2>
            <div className="space-y-0">
              {sessionOutcomes.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 py-3 border-b border-[#D4CEC6] last:border-0"
                >
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&mdash;</span>
                  <span className="text-[#374151] text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[#64748B] text-xs uppercase tracking-widest mb-6">
              Over time, leaders develop
            </p>
            <div className="space-y-0">
              {longerOutcomes.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 py-3 border-b border-[#D4CEC6] last:border-0"
                >
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&mdash;</span>
                  <span className="text-[#374151] text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Who It&rsquo;s For
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              People who need a thinking community, not more information.
            </h2>
          </div>
          <div className="space-y-6 pt-2">
            <p className="text-[#374151] text-lg leading-relaxed">
              Heads of school and directors responsible for culture and
              decision-making.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Associate and emerging leaders building leadership capacity
              alongside their current roles.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Leaders who have tried other professional development and found it
              too generic, too abstract, or too disconnected from real
              situations.
            </p>
          </div>
        </div>
      </section>

      {/* Cohort Details */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-10">
            Next Cohort
          </p>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p
                className="text-[#0e1a7a] text-2xl font-semibold mb-8"
                style={serif}
              >
                September 2026 &ndash; May 2027
              </p>
              <p className="text-[#64748B] text-xs uppercase tracking-widest mb-4">
                Session Dates · Second Tuesday of each month
              </p>
              <div className="space-y-0">
                {sessionDates.map((date) => (
                  <div
                    key={date}
                    className="flex items-center gap-4 py-3 border-b border-[#D4CEC6] last:border-0"
                  >
                    <span className="text-[#8A6014] flex-shrink-0">&mdash;</span>
                    <span className="text-[#374151] text-sm">{date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {cohortStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-[#E2DDD6] p-5"
                  >
                    <p className="text-[#64748B] text-xs uppercase tracking-widest mb-2">
                      {stat.label}
                    </p>
                    <p
                      className="text-[#0e1a7a] text-sm font-semibold leading-snug"
                      dangerouslySetInnerHTML={{ __html: stat.value }}
                    />
                  </div>
                ))}
              </div>

              <div className="border border-[#E2DDD6] bg-white p-8">
                <h3
                  className="text-[#0e1a7a] text-lg font-semibold mb-6"
                  style={serif}
                >
                  Investment
                </h3>
                <p className="text-5xl text-[#0e1a7a] font-medium mb-2" style={serif}>
                  $1,350
                </p>
                <p className="text-[#64748B] text-xs uppercase tracking-widest mb-4">
                  Per Person
                </p>
                <p className="text-[#374151] text-sm leading-relaxed mb-3">
                  Includes all 9 sessions.
                </p>
                <p className="text-[#374151] text-sm leading-relaxed">
                  This is not passive content. It is structured, facilitated
                  thinking work designed to change how you lead &mdash; not just
                  what you know.
                </p>
              </div>

              <div className="border border-[#E2DDD6] bg-white p-8">
                <h3
                  className="text-[#0e1a7a] text-lg font-semibold mb-4"
                  style={serif}
                >
                  Commitment
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-4">
                  This is not a drop-in experience.
                </p>
                <p className="text-[#374151] text-sm leading-relaxed">
                  The value comes from sustained practice &mdash; returning to
                  the same cohort, applying the same reasoning structures, and
                  building judgment over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Admission
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Admission is by application.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-[#374151] text-lg leading-relaxed mb-4">
                Cohorts are curated for:
              </p>
              <div className="space-y-0">
                {admissionCriteria.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0"
                  >
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&mdash;</span>
                    <span className="text-[#374151] text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 pt-2">
              <p className="text-[#374151] text-lg leading-relaxed">
                Not every applicant is admitted.
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                The Studio is designed for cohort coherence &mdash; the work
                depends on people being able to bring real situations and trust
                the room. Curation protects that.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="#apply"
                  className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap font-medium"
                >
                  Apply for the Cohort
                </a>
                <Link
                  href="/contact"
                  className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
                >
                  Schedule a Conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Left — image + intro */}
            <div>
              <img
                src="/institute/leadership-studio.png"
                alt="Leadership Studio — 9-Month Cohort"
                className="w-full block mb-10"
              />
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
                Application
              </p>
              <h2
                className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4"
                style={serif}
              >
                Apply for the Cohort
              </h2>
              <p className="text-[#374151] text-base leading-relaxed">
                Applications are reviewed for fit. Accepted participants will
                receive enrollment details and payment instructions.
              </p>
            </div>

            {/* Right — form */}
            <div>
            {submitted ? (
              <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-10">
                <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
                  Received
                </p>
                <p
                  className="text-[#0e1a7a] text-xl font-semibold mb-3"
                  style={serif}
                >
                  Thank you, {form.name || 'there'}.
                </p>
                <p className="text-[#374151] text-sm leading-relaxed">
                  Your application has been received. We review applications for
                  cohort fit and will be in touch within a few business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot */}
                <input
                  type="text"
                  name="hp"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                />

                {/* Full Name */}
                <div>
                  <label className={labelClass}>
                    Full Name <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>

                {/* Email */}
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

                {/* Current Role */}
                <div>
                  <label className={labelClass}>
                    Current Role <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    required
                    value={form.role}
                    onChange={handleChange}
                    placeholder="Head of School, Director, Emerging Leader..."
                    className={inputClass}
                  />
                </div>

                {/* School / Organization */}
                <div>
                  <label className={labelClass}>
                    School / Organization <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    required
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="School or organization name"
                    className={inputClass}
                  />
                </div>

                {/* Years in Montessori */}
                <div>
                  <label className={labelClass}>Years in Montessori</label>
                  <input
                    type="text"
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    placeholder="e.g. 3 years, 12 years..."
                    className={inputClass}
                  />
                </div>

                {/* Age Level Experience */}
                <div>
                  <label className={labelClass}>Age Level Experience</label>
                  <input
                    type="text"
                    name="schoolSize"
                    value={form.schoolSize}
                    onChange={handleChange}
                    placeholder="e.g. Primary, Lower Elementary, All levels..."
                    className={inputClass}
                  />
                </div>

                {/* Leadership situations */}
                <div>
                  <label className={labelLongClass}>
                    What leadership situations are you currently navigating?{' '}
                    <span className="text-[#8A6014]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe the situations in your school or role that are most alive for you right now."
                    className={`${inputClass} resize-none leading-relaxed`}
                  />
                </div>

                {/* What would make the cohort valuable */}
                <div>
                  <label className={labelLongClass}>
                    What would make this cohort valuable for you over the next 9 months?
                  </label>
                  <textarea
                    name="goals"
                    value={form.goals}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What would you want to walk away with — in terms of skills, clarity, or relationships?"
                    className={`${inputClass} resize-none leading-relaxed`}
                  />
                </div>

                {/* Pattern trying to shift */}
                <div>
                  <label className={labelLongClass}>
                    What is one pattern in your leadership you are trying to shift?
                  </label>
                  <textarea
                    name="situation"
                    value={form.situation}
                    onChange={handleChange}
                    rows={4}
                    placeholder="This can be specific or general — we are looking for self-awareness and readiness to work."
                    className={`${inputClass} resize-none leading-relaxed`}
                  />
                </div>

                {formError && (
                  <p className="text-red-600 text-sm">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
            </div>{/* end right column */}
          </div>{/* end grid */}
        </div>{/* end max-w-7xl */}
      </section>

      {/* Final CTA */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p
              className="text-[#0e1a7a] text-2xl font-medium leading-snug mb-4"
              style={serif}
            >
              The problems keep coming. So does the clarity.
            </p>
            <p className="text-[#64748B] text-base leading-relaxed">
              A sustained practice with a small, serious cohort of Montessori
              leaders.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#apply"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap font-medium"
            >
              Apply for the Cohort
            </a>
            <Link
              href="/contact"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Schedule a Conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

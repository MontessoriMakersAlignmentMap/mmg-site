'use client'

import { useState } from 'react'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const inputClass =
  'w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors'
const labelClass = 'block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2'
const labelLongClass = 'block text-[#374151] text-sm font-medium mb-2'

const steps = [
  {
    number: '01',
    label: 'Situation Mapping',
    description:
      'We begin by building a clear, honest picture of what you are actually navigating. Not symptoms — the underlying structure of the challenge. What decisions are unresolved. What forces are in tension. What you are carrying that is not yet named.',
  },
  {
    number: '02',
    label: 'Montessori Lens',
    description:
      'Montessori philosophy is not just a pedagogy — it is a framework for reasoning about people, environments, and organizational design. We apply it to your specific situation: what it illuminates, what it demands, and where it creates clarity.',
  },
  {
    number: '03',
    label: 'Response Design',
    description:
      'Together we develop a response — not a reaction. Grounded in values. Built for real constraints. Tested against the actual people and systems involved. Each session ends with a concrete next action, not an open conversation.',
  },
  {
    number: '04',
    label: 'Reflection & Pattern Recognition',
    description:
      'Over time, patterns become visible: how you make decisions under pressure, where your reasoning holds and where it doesn&rsquo;t, what your defaults are when the stakes are high. This layer of the work changes how you lead permanently.',
  },
]

const whoItIsFor = [
  'Heads of school in their first two years navigating the gap between preparation and reality',
  'Leaders stepping into elevated responsibility without a clear predecessor or roadmap',
  'School leaders navigating board conflict, community division, or significant staff transitions',
  'Leaders building something new — a program, a school, a system — without a clear model to follow',
  'Experienced heads in a period of organizational crisis or reinvention',
]

const applicationConsiders = [
  'The nature and complexity of your current leadership situation',
  'Your readiness to engage in rigorous, structured self-examination',
  'The organizational context and what the residency would need to hold',
  'Fit with Hannah&rsquo;s current capacity and available cohort',
]

type FormState = {
  name: string
  email: string
  role: string
  organization: string
  timeline: string   // Years in Montessori leadership
  message: string    // Leadership situation currently navigating (required)
  situation: string  // Why seeking Residency support now
  goals: string      // What would make this engagement meaningful
  schoolSize: string // Anything else Hannah should understand
}

const emptyForm: FormState = {
  name: '',
  email: '',
  role: '',
  organization: '',
  timeline: '',
  message: '',
  situation: '',
  goals: '',
  schoolSize: '',
}

export default function ResidencyPage() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [hp, setHp] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
          message: form.message,
          situation: form.situation,
          goals: form.goals,
          schoolSize: form.schoolSize,
          service: 'Leadership Residency',
          source: 'residency page — application',
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
              Leadership Residency
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Formation at the edge of what you&rsquo;re carrying.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
              A 6–9 month sustained engagement with Hannah Richardson — for leaders navigating
              significant transition, elevated responsibility, or a critical period of organizational
              change.
            </p>
            <p className="text-[#7A8FA3] text-base leading-relaxed mb-12 max-w-2xl">
              This is not coaching, therapy, or open discussion. It is guided reasoning.
              This is not certification. It is formation within real leadership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#apply"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Apply for Residency
              </a>
              <Link
                href="/institute/catalog"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Browse All Programs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What It Is */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">What It Is</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              The Institute&rsquo;s highest-commitment offering.
            </h2>
          </div>
          <div className="space-y-6 pt-2">
            <p className="text-[#374151] text-lg leading-relaxed">
              The Leadership Residency is a one-to-one, 6–9 month engagement with Hannah Richardson
              directly. It is built around a single leader, their specific situation, and the real
              organizational challenges they are navigating in real time.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              There is no curriculum to complete, no framework to install, no certification at the end.
              What changes is how you think, how you reason, and how you lead — permanently.
            </p>
            <blockquote className="border-l-4 border-[#d6a758] pl-6 py-1">
              <p className="text-[#374151] text-base italic leading-relaxed">
                &ldquo;This is not coaching, therapy, or open discussion. It is guided reasoning.
                This is not certification. It is formation within real leadership.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Process</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Four moves. Repeated as the work demands.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Each session works through this structure — not as a checklist, but as a discipline.
              Over time, the pattern becomes internalized. That&rsquo;s the formation.
            </p>
          </div>
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white border border-[#E2DDD6] p-8 grid md:grid-cols-4 gap-6 items-start"
              >
                <div className="md:col-span-1">
                  <span className="text-[#8A6014] text-xs tracking-[0.2em] font-medium">
                    {step.number}
                  </span>
                  <h3 className="text-[#0e1a7a] font-semibold text-lg mt-1" style={serif}>
                    {step.label}
                  </h3>
                </div>
                <div className="md:col-span-3">
                  <p
                    className="text-[#374151] text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-[#0e1a7a] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Who It&rsquo;s For</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-6" style={serif}>
              For leaders at a genuine inflection point.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              The Residency is not for every leader at every stage. It is for leaders who are
              in it — navigating something real, under real stakes, with real consequences.
            </p>
          </div>
          <div className="space-y-4 pt-2">
            {whoItIsFor.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 py-3 border-b border-white/10 last:border-0"
              >
                <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                <span className="text-white text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Application</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Limited availability. Application-based.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Hannah works with a small number of residency clients at any given time. The Residency
              is not a product — it is a commitment. Applications are reviewed on a rolling basis.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              The application begins below.
            </p>
          </div>
          <div>
            <p className="text-[#64748B] text-xs tracking-[0.2em] uppercase tracking-widest mb-6">
              What the Application Considers
            </p>
            <div className="space-y-4">
              {applicationConsiders.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0"
                >
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                  <span
                    className="text-[#374151] text-base"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Engagement
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Built for leaders who can&rsquo;t wait for the right conditions.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <p className="text-[#374151] text-lg leading-relaxed">
                The Residency is not a product you purchase. It is an engagement you apply for.
                Hannah works with a small number of residency leaders at any given time &mdash;
                and each engagement is built around that leader&rsquo;s specific situation.
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                Three to four leaders are accepted each year. Applications are reviewed on a
                rolling basis.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Duration', value: '6\u20139 months' },
                { label: 'Sessions', value: 'Bi-weekly (24\u201336 total)' },
                { label: 'Format', value: '1:1 with Hannah Richardson' },
                { label: 'Availability', value: '3\u20134 leaders per year' },
                { label: 'Admission', value: 'Application-based' },
                { label: 'Designed for', value: 'Leaders navigating significant transition' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-[#64748B] text-xs uppercase tracking-widest mb-2">
                    {stat.label}
                  </p>
                  <p className="text-[#0e1a7a] text-base font-semibold leading-snug">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Application Form */}
      <section id="apply" className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Left — heading + context */}
            <div>
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
                Application
              </p>
              <h2
                className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
                style={serif}
              >
                Apply for Residency
              </h2>
              <p className="text-[#374151] text-base leading-relaxed mb-8">
                This application is reviewed personally. If the Residency seems like the right
                fit, the next step will be a conversation.
              </p>
              <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-6">
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Availability is extremely limited. Applications are reviewed on a rolling
                  basis, and not all inquiries will move forward to conversation.
                </p>
              </div>
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
                    Your application has been received and will be reviewed personally.
                    If your situation is a strong fit, you will hear back within two weeks.
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
                      placeholder="Head of School, Director, Executive Director..."
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

                  {/* Years in Montessori leadership */}
                  <div>
                    <label className={labelClass}>
                      Years in Montessori Leadership
                    </label>
                    <input
                      type="text"
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      placeholder="e.g. 2 years as head, 8 years total in Montessori..."
                      className={inputClass}
                    />
                  </div>

                  {/* Leadership situation */}
                  <div>
                    <label className={labelLongClass}>
                      What leadership situation are you currently navigating?{' '}
                      <span className="text-[#8A6014]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe what you are navigating — the specific challenge, transition, or decision you are in the middle of."
                      className={`${inputClass} resize-none leading-relaxed`}
                    />
                  </div>

                  {/* Why seeking Residency now */}
                  <div>
                    <label className={labelLongClass}>
                      Why are you seeking Residency support now?
                    </label>
                    <textarea
                      name="situation"
                      value={form.situation}
                      onChange={handleChange}
                      rows={4}
                      placeholder="What has changed, or what has become clear, that makes this the right time?"
                      className={`${inputClass} resize-none leading-relaxed`}
                    />
                  </div>

                  {/* What would make it meaningful */}
                  <div>
                    <label className={labelLongClass}>
                      What would make this engagement meaningful or necessary for you over the next 6–9 months?
                    </label>
                    <textarea
                      name="goals"
                      value={form.goals}
                      onChange={handleChange}
                      rows={4}
                      placeholder="What would need to be true for you to look back and say this was worth it?"
                      className={`${inputClass} resize-none leading-relaxed`}
                    />
                  </div>

                  {/* Anything else */}
                  <div>
                    <label className={labelLongClass}>
                      Anything else Hannah should understand about your context before a conversation
                    </label>
                    <textarea
                      name="schoolSize"
                      value={form.schoolSize}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Board dynamics, staff situation, personal context — anything that would help frame the conversation."
                      className={`${inputClass} resize-none leading-relaxed`}
                    />
                  </div>

                  {formError && (
                    <p className="text-red-600 text-sm">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#0e1a7a] text-2xl font-medium leading-snug mb-4" style={serif}>
              The weight of real leadership deserves a real thinking partner.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-3">
              If you are navigating something significant — and you are doing it mostly alone — the
              Residency was built for that.
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Applications are reviewed personally. Availability is extremely limited.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#apply"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap font-medium"
            >
              Apply for Residency
            </a>
            <Link
              href="/institute/register"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Explore Other Pathways &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

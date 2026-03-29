'use client'

import { useState, useEffect } from 'react'

const serif = { fontFamily: 'var(--font-heading)' }

const services = [
  {
    id: 'advisory',
    label: 'Advisory',
    tagline: 'Leadership, systems, or organizational alignment',
    prompt: 'Tell us about the challenge your school is navigating right now. What is getting in the way?',
    rolePlaceholder: 'Head of School, Board Chair, Director...',
  },
  {
    id: 'institute',
    label: 'Institute',
    tagline: 'Leadership development, seminars, or intensive work',
    prompt: 'What aspect of your leadership practice are you working to develop? Which program are you considering?',
    rolePlaceholder: 'Head of School, Emerging Leader, Director...',
  },
  {
    id: 'mmap',
    label: 'Platforms (MMAP / MMAS)',
    tagline: 'MMAP or MMAS — school operations and assessment',
    prompt: 'Describe your current systems and what you need them to do differently. Which platform interests you?',
    rolePlaceholder: 'Head of School, Guide, Curriculum Director...',
  },
  {
    id: 'matchhub',
    label: 'MatchHub',
    tagline: 'Hiring or strategic search',
    prompt: 'What role are you looking to fill — or what kind of position are you seeking? Tell us about the search.',
    rolePlaceholder: 'Head of School, HR Lead, Guide seeking placement...',
  },
  {
    id: 'studio',
    label: 'Studio',
    tagline: 'Clarity, messaging, or visibility',
    prompt: 'Describe your organization and the communication challenge you are facing. What needs to land differently?',
    rolePlaceholder: 'Executive Director, Head of School, Program Director...',
  },
]

type FormState = {
  name: string
  email: string
  organization: string
  role: string
  supportType: string
  message: string
  situation: string
  goals: string
  timeline: string
  schoolSize: string
}

const emptyForm: FormState = {
  name: '',
  email: '',
  organization: '',
  role: '',
  supportType: '',
  message: '',
  situation: '',
  goals: '',
  timeline: '',
  schoolSize: '',
}

export default function ContactPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [urlSource, setUrlSource] = useState<string | null>(null)
  const [hp, setHp] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const src = params.get('source')
    if (src) setUrlSource(src)
  }, [])

  const activeService = services.find((s) => s.id === selected)

  function handleSelect(id: string) {
    setSelected((prev) => (prev === id ? null : id))
    setForm(emptyForm)
    setSubmitted(false)
    setFormError(null)
  }

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
          organization: form.organization,
          role: form.role,
          supportType: form.supportType,
          message: form.message,
          situation: form.situation,
          goals: form.goals,
          timeline: form.timeline,
          schoolSize: form.schoolSize,
          service: activeService?.label ?? 'General',
          source: urlSource ?? `contact page — ${activeService?.label ?? 'general'}`,
          hp,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setFormError('Something went wrong. Please try again or email us directly at info@montessorimakers.org.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">Contact</p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-6"
              style={serif}
            >
              Let&rsquo;s get clear on what you need.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
              You don&rsquo;t need to have the solution figured out.
              You just need to know what feels off.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1 — What do you need? */}
      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Step 1</p>
            <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight" style={serif}>
              What area are you reaching out about?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {services.map((service) => {
              const isActive = selected === service.id
              return (
                <button
                  key={service.id}
                  onClick={() => handleSelect(service.id)}
                  className={`group flex flex-col items-start px-6 py-4 border transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-[#0e1a7a] border-[#0e1a7a] text-white'
                      : 'bg-white border-[#E2DDD6] text-[#374151] hover:border-[#0e1a7a] hover:bg-[#F8F7FF]'
                  }`}
                >
                  <span
                    className={`text-sm font-semibold tracking-wide mb-1 ${
                      isActive ? 'text-white' : 'text-[#0e1a7a]'
                    }`}
                  >
                    {service.label}
                  </span>
                  <span className="text-xs leading-snug text-[#64748B]">
                    {service.tagline}
                  </span>
                </button>
              )
            })}
          </div>
          {!selected && (
            <p className="text-[#64748B] text-sm mt-6 italic">
              Select an area above to continue.
            </p>
          )}
        </div>
      </section>

      {/* Section 2 — Dynamic Form */}
      {selected && activeService && (
        <section className="bg-white py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-10">
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Step 2</p>
              <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight" style={serif}>
                Tell me what&rsquo;s going on.
              </h2>
              <p className="text-[#64748B] text-sm mt-2">
                For:{' '}
                <span className="font-medium text-[#374151]">{activeService.label}</span>
                {' '}&mdash;{' '}{activeService.tagline}
              </p>
            </div>

            {submitted ? (
              <div className="max-w-xl bg-[#FAF9F7] border border-[#E2DDD6] p-10">
                <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Received</p>
                <p className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>
                  Thank you, {form.name || 'there'}.
                </p>
                <p className="text-[#374151] text-sm leading-relaxed mb-6">
                  We have your message and will be in touch within two business days.
                  If you have a time-sensitive situation, call us directly at (773) 234-2412.
                </p>
                <button
                  onClick={() => { setSelected(null); setForm(emptyForm); setSubmitted(false) }}
                  className="text-[#0e1a7a] text-xs font-medium hover:underline tracking-wide"
                >
                  &larr; Start over
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
                {/* Honeypot — hidden from real users, traps bots */}
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

                {/* Name */}
                <div>
                  <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">
                    Name <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">
                    Email <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@school.org"
                    className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">
                    Organization <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    required
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="School or organization name"
                    className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">
                    Your Role <span className="text-[#8A6014]">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    required
                    value={form.role}
                    onChange={handleChange}
                    placeholder={activeService.rolePlaceholder}
                    className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors"
                  />
                </div>

                {/* What type of support */}
                <div>
                  <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">
                    What type of support are you looking for?
                  </label>
                  <select
                    name="supportType"
                    value={form.supportType}
                    onChange={handleChange}
                    className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] transition-colors appearance-none"
                  >
                    <option value="">Select an option</option>
                    <option value="website-build">Website + systems build</option>
                    <option value="matchhub">Hiring / MatchHub support</option>
                    <option value="advisory">Leadership / Advisory</option>
                    <option value="general">General inquiry</option>
                  </select>
                </div>

                {/* What feels unclear, stuck, or not working? */}
                <div>
                  <label className="block text-[#374151] text-sm font-medium mb-2">
                    What are you working on or hoping to address?{' '}
                    <span className="text-[#8A6014]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={activeService.prompt}
                    className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Current situation */}
                <div>
                  <label className="block text-[#374151] text-sm font-medium mb-2">
                    Tell us about your current situation
                  </label>
                  <textarea
                    name="situation"
                    value={form.situation}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What's working, what's not, and what prompted you to reach out?"
                    className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-[#374151] text-sm font-medium mb-2">
                    What are you hoping to improve or change?
                  </label>
                  <textarea
                    name="goals"
                    value={form.goals}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enrollment, hiring, communication, systems, etc."
                    className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Timeline + School size — side by side on wider screens */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">
                      Timeline <span className="text-[#8A6014]">*</span>
                    </label>
                    <select
                      name="timeline"
                      required
                      value={form.timeline}
                      onChange={handleChange}
                      className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] transition-colors appearance-none"
                    >
                      <option value="" disabled>Select your timeline</option>
                      <option value="asap">As soon as possible</option>
                      <option value="3months">Within 3 months</option>
                      <option value="3-6months">3–6 months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">
                      School size
                    </label>
                    <select
                      name="schoolSize"
                      value={form.schoolSize}
                      onChange={handleChange}
                      className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] transition-colors appearance-none"
                    >
                      <option value="">Select size</option>
                      <option value="under-50">Under 50 students</option>
                      <option value="50-150">50–150</option>
                      <option value="150-300">150–300</option>
                      <option value="300+">300+</option>
                    </select>
                  </div>
                </div>

                <div>
                  {formError && (
                    <div className="bg-red-50 border border-red-200 px-4 py-3 mb-4">
                      <p className="text-red-700 text-sm leading-relaxed">{formError}</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide font-medium transition-colors ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#162270]'}`}
                  >
                    {loading ? 'Sending…' : 'Start the Conversation →'}
                  </button>
                  <p className="text-[#94A3B8] text-xs mt-3 leading-relaxed">
                    You&rsquo;ll hear back personally. If there&rsquo;s a better path, I&rsquo;ll point you there.
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>
      )}

      {/* Schedule a Conversation */}
      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
              Schedule a Conversation
            </p>
            <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-3" style={serif}>
              Prefer to book a time directly?
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed max-w-lg mb-8">
              Schedule directly using the calendar below. No pitch &mdash; just a real conversation
              about where your school is and what alignment would look like.
            </p>
            <a
              href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors font-medium"
            >
              Schedule a Consult &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Prefer email? */}
      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Prefer to reach us directly?
            </p>
            <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              We&rsquo;re easy to reach.
            </h2>
            <div className="flex flex-col sm:flex-row gap-10">
              <div>
                <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-2">Email</p>
                <a
                  href="mailto:info@montessorimakers.org"
                  className="text-[#0e1a7a] text-base font-medium hover:underline"
                >
                  info@montessorimakers.org
                </a>
              </div>
              <div>
                <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-2">Phone</p>
                <a
                  href="tel:7732342412"
                  className="text-[#0e1a7a] text-base font-medium hover:underline"
                >
                  (773) 234-2412
                </a>
              </div>
            </div>
            <p className="text-[#64748B] text-sm mt-8 leading-relaxed max-w-lg">
              We respond within two business days. For time-sensitive situations,
              calling is the fastest path.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <section className="bg-[#0e1a7a] py-14 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <p className="text-[#94A3B8] text-sm italic leading-relaxed max-w-sm">
            &ldquo;Every engagement starts with a real conversation about where your school is
            and what it needs.&rdquo;
            <span className="block text-[#7A8FA3] text-xs mt-2 not-italic">
              &mdash; Hannah Richardson, Founder
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <p className="text-[#7A8FA3] text-[10px] tracking-[0.18em] uppercase mb-2">Email</p>
              <a
                href="mailto:info@montessorimakers.org"
                className="text-white text-sm hover:text-[#d6a758] transition-colors"
              >
                info@montessorimakers.org
              </a>
            </div>
            <div>
              <p className="text-[#7A8FA3] text-[10px] tracking-[0.18em] uppercase mb-2">Phone</p>
              <a
                href="tel:7732342412"
                className="text-white text-sm hover:text-[#d6a758] transition-colors"
              >
                (773) 234-2412
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

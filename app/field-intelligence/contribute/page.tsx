'use client'

import { useState } from 'react'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const questions = [
  {
    number: '01',
    question: 'What is taking up the most of your leadership attention right now?',
    type: 'Open — one to two sentences',
    field: 'q1' as const,
  },
  {
    number: '02',
    question: 'What feels more uncertain or harder to navigate than it did six months ago?',
    type: 'Open — one to two sentences',
    field: 'q2' as const,
  },
  {
    number: '03',
    question: 'Is there a pattern you are noticing across your school community that rarely gets named publicly?',
    type: 'Optional — brief',
    field: 'q3' as const,
  },
]

export default function ContributePage() {
  const [form, setForm] = useState({ q1: '', q2: '', q3: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [hp, setHp] = useState('')

  function handleChange(field: 'q1' | 'q2' | 'q3', value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.q1 && !form.q2 && !form.q3) {
      setFormError('Please answer at least one question before submitting.')
      return
    }
    setLoading(true)
    setFormError(null)
    try {
      const res = await fetch('/api/field-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q1: form.q1,
          q2: form.q2,
          q3: form.q3,
          source: 'Field Intelligence contribute page',
          hp,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setFormError('Something went wrong. Please try again or reach out directly.')
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
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Field Pulse &middot; Contribute
            </p>
            <h1
              className="text-4xl md:text-5xl text-white leading-[1.07] tracking-tight mb-8"
              style={serif}
            >
              Take the current pulse.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl mb-4">
              Three minutes. Anonymous. Monthly.
            </p>
            <p className="text-[#7A8FA3] text-base leading-relaxed max-w-2xl">
              This work helps surface patterns leaders are carrying privately but rarely
              name publicly. Your contribution becomes part of the aggregate signal
              &mdash; never identified, always counted.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#FAF9F7] py-14 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Anonymous', desc: 'No name, no school, no identifying information. The pattern is what matters.' },
              { label: '3 minutes', desc: 'Three open questions. Brief responses. No lengthy surveys or required fields.' },
              { label: 'Monthly', desc: 'A new pulse opens each month. Contribution is always optional, always welcome.' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <div>
                  <p className="text-[#0e1a7a] text-sm font-semibold mb-2">{item.label}</p>
                  <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Questions + Form */}
      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">April 2026 Pulse</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Three questions. That&rsquo;s it.
            </h2>
          </div>

          {submitted ? (
            <div className="bg-[#F2EDE6] border border-[#E2DDD6] p-8 md:p-10 max-w-2xl">
              <div className="w-10 h-10 rounded-full bg-[#d6a758]/20 border border-[#d6a758]/40 flex items-center justify-center mb-6">
                <span className="text-[#d6a758] text-lg">✓</span>
              </div>
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">Received</p>
              <p className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>
                Thank you for contributing.
              </p>
              <p className="text-[#374151] text-sm leading-relaxed mb-6">
                Your responses have been added to the April pulse. They will be
                reflected — anonymously — in the aggregate signal when the next
                issue publishes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/field-intelligence/latest"
                  className="bg-[#0e1a7a] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#162270] transition-colors text-center"
                >
                  Read the March Pulse
                </Link>
                <button
                  onClick={() => { setForm({ q1: '', q2: '', q3: '' }); setSubmitted(false) }}
                  className="text-[#64748B] text-sm hover:text-[#0e1a7a] transition-colors text-center"
                >
                  Submit another response
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl">
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

              <div className="space-y-0 mb-10">
                {questions.map((q) => (
                  <div
                    key={q.number}
                    className="bg-white border border-[#E2DDD6] p-7 mb-3"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <span className="text-[#8A6014] text-xs tracking-[0.2em] font-medium flex-shrink-0 mt-0.5">
                        {q.number}
                      </span>
                      <div>
                        <p className="text-[#0e1a7a] text-base font-medium leading-snug mb-1" style={serif}>
                          {q.question}
                        </p>
                        <p className="text-[#64748B] text-xs">{q.type}</p>
                      </div>
                    </div>
                    <textarea
                      name={q.field}
                      value={form[q.field]}
                      onChange={(e) => handleChange(q.field, e.target.value)}
                      rows={3}
                      placeholder="Write your response here…"
                      className="w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors resize-none leading-relaxed"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-[#F2EDE6] border border-[#E2DDD6] p-7">
                <p className="text-[#374151] text-xs leading-relaxed mb-5">
                  Responses are anonymous — no name, email, or school is required or collected.
                  Your contribution enters the aggregate signal for the April 2026 pulse.
                </p>

                {formError && (
                  <div className="bg-red-50 border border-red-200 px-4 py-3 mb-5">
                    <p className="text-red-700 text-sm leading-relaxed">{formError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide font-medium transition-colors ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#162270]'}`}
                >
                  {loading ? 'Submitting…' : 'Submit Your Pulse Check-In →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              Why Contribute
            </p>
            <h2 className="text-2xl md:text-3xl text-white leading-tight mb-6" style={serif}>
              The signal only becomes visible when more leaders add to it.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed mb-4">
              What you are navigating right now is not unique to you. But the only way
              that pattern becomes visible &mdash; and useful to others &mdash; is if leaders
              name it.
            </p>
            <p className="text-[#7A8FA3] text-sm leading-relaxed">
              Field Pulse is a Montessori Makers project. It exists to surface what the
              field is carrying &mdash; accurately, anonymously, and without overclaiming
              what the data says.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              href="/field-intelligence/latest"
              className="block bg-white/5 border border-white/20 p-6 hover:bg-white/10 transition-colors"
            >
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-2">See What Others Are Naming</p>
              <p className="text-white text-base font-medium" style={serif}>Read the March 2026 Pulse &rarr;</p>
            </Link>
            <Link
              href="/field-intelligence"
              className="block bg-white/5 border border-white/20 p-6 hover:bg-white/10 transition-colors"
            >
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-2">About Field Pulse</p>
              <p className="text-white text-base font-medium" style={serif}>How This Works &rarr;</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

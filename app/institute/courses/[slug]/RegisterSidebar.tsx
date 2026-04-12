'use client'

import { useState } from 'react'

const inputClass =
  'w-full border border-[#E2DDD6] bg-white px-3 py-2.5 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors'
const labelClass = 'block text-[#64748B] text-[10px] tracking-[0.15em] uppercase mb-1.5'

interface Props {
  courseSlug: string
  courseTitle: string
  price: string
  format: string
  dates: string
  stripeHref?: string
  registrationOpen: boolean
}

export default function RegisterSidebar({
  courseSlug,
  courseTitle,
  price,
  format,
  dates,
  stripeHref,
  registrationOpen,
}: Props) {
  const [step, setStep] = useState<'info' | 'form' | 'done'>('info')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hp, setHp] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', organization: '', role: '', notes: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/institute/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, course_slug: courseSlug, course_title: courseTitle, hp }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Submission failed')
      setStep('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-[#E2DDD6] p-8 sticky top-8">
      <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase font-medium mb-6">
        Registration
      </p>

      <div className="space-y-4 mb-8 text-sm">
        <div>
          <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">Format</p>
          <p className="text-[#374151] font-medium">{format}</p>
        </div>
        <div>
          <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">Date</p>
          <p className="text-[#374151]">{dates}</p>
        </div>
        <div>
          <p className="text-[#94A3B8] text-xs uppercase tracking-wider mb-1">Price</p>
          <p className="text-[#374151] font-semibold text-lg">{price}</p>
        </div>
      </div>

      {/* Closed state */}
      {!registrationOpen && (
        <>
          <div className="bg-[#F2EDE6] border border-[#D4CEC6] px-4 py-3 mb-4 text-center">
            <p className="text-[#8A6014] text-xs font-semibold tracking-wide uppercase mb-1">Registration Closed</p>
            <p className="text-[#64748B] text-xs leading-relaxed">
              Registration for this course is currently closed.
            </p>
          </div>
          <a
            href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full border border-[#0e1a7a] text-[#0e1a7a] text-xs px-6 py-3 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
          >
            Book a Consultation
          </a>
        </>
      )}

      {/* Open — step 1: show register button */}
      {registrationOpen && step === 'info' && (
        <>
          <button
            onClick={() => setStep('form')}
            className="block w-full bg-[#d6a758] text-white text-sm px-6 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium mb-3"
          >
            Register →
          </button>
          <a
            href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full border border-[#0e1a7a] text-[#0e1a7a] text-xs px-6 py-3 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
          >
            Book a Consultation
          </a>
        </>
      )}

      {/* Open — step 2: registration form */}
      {registrationOpen && step === 'form' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot */}
          <input
            type="text"
            name="hp"
            value={hp}
            onChange={e => setHp(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />
          <div>
            <label className={labelClass}>Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@school.org" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Optional" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>School / Organization</label>
            <input name="organization" value={form.organization} onChange={handleChange} placeholder="Optional" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Your Role</label>
            <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Head of School" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Anything we should know?" rows={2} className={`${inputClass} resize-none`} />
          </div>
          {error && <p className="text-red-600 text-xs leading-relaxed">{error}</p>}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => { setStep('info'); setError(null) }}
              className="flex-1 border border-[#E2DDD6] text-[#64748B] text-xs px-4 py-3 hover:border-[#0e1a7a] transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#d6a758] text-white text-xs px-4 py-3 hover:bg-[#c09240] transition-colors disabled:opacity-50 font-medium"
            >
              {loading ? 'Submitting…' : 'Submit & Pay →'}
            </button>
          </div>
        </form>
      )}

      {/* Done — redirect to Stripe */}
      {step === 'done' && stripeHref && (
        <div className="text-center">
          <p className="text-[#0e1a7a] font-semibold text-sm mb-2">You&rsquo;re registered!</p>
          <p className="text-[#64748B] text-xs leading-relaxed mb-5">
            Your spot is saved. Complete payment below to confirm your enrollment.
          </p>
          <a
            href={stripeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#0e1a7a] text-white text-sm px-6 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center font-medium"
          >
            Complete Payment →
          </a>
        </div>
      )}
      {step === 'done' && !stripeHref && (
        <div className="text-center">
          <p className="text-[#0e1a7a] font-semibold text-sm mb-2">You&rsquo;re registered!</p>
          <p className="text-[#64748B] text-xs leading-relaxed">
            We&rsquo;ll follow up with payment details and course information.
          </p>
        </div>
      )}
    </div>
  )
}

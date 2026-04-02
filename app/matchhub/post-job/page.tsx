'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { submitJob } from '@/lib/db/jobs'
import type { JobInsert } from '@/lib/types/matchhub'

const serif = { fontFamily: 'var(--font-heading)' }


const LEVELS = ['Infant/Toddler (0–3)', 'Primary (3–6)', 'Lower Elementary (6–9)', 'Upper Elementary (9–12)', 'Adolescent (12–15)', 'Leadership / Administration']
const CREDENTIALS = ['AMI preferred', 'AMS preferred', 'Any Montessori credential', 'No credential required']
const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Interim']
const SCHOOL_TYPES = ['AMI-affiliated', 'AMS-affiliated', 'Independent Montessori', 'Public Montessori']

const inputClass = "w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] placeholder-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors"
const selectClass = "w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] bg-white focus:outline-none focus:border-[#0e1a7a] appearance-none transition-colors"
const labelClass = "block text-[#374151] text-sm font-medium mb-2"

function PostJobForm() {
  const searchParams = useSearchParams()
  const isPro = searchParams.get('plan') === 'pro'
  const planType = isPro ? 'pro' : (searchParams.get('plan') ?? 'single')

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)
  const [addOns, setAddOns] = useState({ featured: false, social: false })

  const [form, setForm] = useState({
    school_name: '',
    contact_name: '',
    contact_email: '',
    job_title: '',
    level: '',
    location: '',
    start_date: '',
    credential: '',
    compensation: '',
    employment_type: '',
    school_type: '',
    school_description: '',
    job_summary: '',
    application_link: '',
  })

  function set(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function toggleAddon(key: 'featured' | 'social') {
    setAddOns(prev => ({ ...prev, [key]: !prev[key] }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const payload: JobInsert = {
      ...form,
      job_title: form.job_title,
      plan_type: planType,
      start_date: form.start_date || null,
      source: 'MatchHub job post',
    }

    const { id, error: err } = await submitJob(payload)

    if (err || !id) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
      return
    }

    setJobId(id)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleCheckout() {
    if (!jobId) return
    setCheckingOut(true)
    setError(null)

    const selectedAddOns: string[] = []
    if (addOns.featured) selectedAddOns.push('featured')
    if (addOns.social) selectedAddOns.push('social')

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, addOns: selectedAddOns }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error ?? 'No checkout URL returned')
      window.location.href = data.url
    } catch (err) {
      setError('Payment setup failed. Please try again.')
      setCheckingOut(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-16 max-w-xl">
        <div className="w-12 h-12 rounded-full bg-[#d6a758]/20 border border-[#d6a758]/40 flex items-center justify-center mb-8">
          <span className="text-[#d6a758] text-xl">✓</span>
        </div>
        <h2 className="text-3xl text-[#0e1a7a] mb-4 leading-snug" style={serif}>
          Role received.
        </h2>
        <p className="text-[#374151] text-base leading-relaxed mb-2">
          Your role has been received and will be reviewed before posting.
        </p>
        <p className="text-[#64748B] text-sm leading-relaxed mb-10">
          A confirmation email is on its way. Your listing will go live within one business day of payment.
        </p>

        {!isPro && (
          <div className="border-t border-[#E2DDD6] pt-8 mb-8">
            <p className="text-[#374151] text-sm font-medium mb-4">Optional add-ons before payment</p>
            <div className="space-y-3 mb-6">
              {[
                { key: 'featured' as const, label: 'Featured Placement', price: '+$59', desc: 'Appears at the top of search results for 30 days.' },
                { key: 'social' as const, label: 'Social Boost', price: '+$79', desc: 'Promoted across Montessori Makers social channels.' },
              ].map(({ key, label, price, desc }) => (
                <label key={key} className="flex items-start gap-4 cursor-pointer group">
                  <div
                    onClick={() => toggleAddon(key)}
                    className={`w-5 h-5 border flex-shrink-0 mt-0.5 flex items-center justify-center cursor-pointer transition-colors ${addOns[key] ? 'bg-[#0e1a7a] border-[#0e1a7a]' : 'border-[#E2DDD6] group-hover:border-[#0e1a7a]'}`}
                  >
                    {addOns[key] && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div onClick={() => toggleAddon(key)} className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[#374151] text-sm font-medium">{label}</span>
                      <span className="text-[#0e1a7a] text-sm font-semibold">{price}</span>
                    </div>
                    <p className="text-[#64748B] text-xs mt-0.5">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 px-5 py-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {isPro ? (
          <div className="bg-[#d6a758]/10 border border-[#d6a758]/30 px-6 py-4 mb-8">
            <p className="text-[#8A6014] text-xs tracking-[0.12em] uppercase font-semibold mb-1">MatchHub Pro</p>
            <p className="text-[#374151] text-sm">Featured placement and social promotion are included automatically.</p>
          </div>
        ) : (
          <button
            onClick={handleCheckout}
            disabled={checkingOut}
            className="inline-block bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {checkingOut ? 'Redirecting to payment…' : 'Continue to Payment →'}
          </button>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* ── Pricing summary ──────────────────────────────────────────────── */}
      <div className="bg-white border border-[#E2DDD6] p-7">
        <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-5">Your Plan</p>

        {isPro ? (
          <>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[#0e1a7a] text-lg font-semibold" style={serif}>MatchHub Pro</span>
              <span className="text-[#0e1a7a] font-bold text-2xl">$499<span className="text-sm font-normal text-[#64748B]">/yr</span></span>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Unlimited job posts with featured placement and social promotion automatically included on every role.
            </p>
          </>
        ) : (
          <>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[#0e1a7a] text-lg font-semibold" style={serif}>Single Job Post</span>
              <span className="text-[#0e1a7a] font-bold text-2xl">$49</span>
            </div>
            <p className="text-[#64748B] text-sm leading-relaxed mb-5">
              One listing, reviewed and live within one business day of payment.
            </p>

            <div className="border-t border-[#E2DDD6] pt-5">
              <p className="text-[#374151] text-xs font-semibold tracking-wide uppercase mb-3">Optional Add-ons</p>
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[#374151] text-sm font-medium">Featured Placement</span>
                    <p className="text-[#64748B] text-xs mt-0.5">Appears at the top of search results for 30 days.</p>
                  </div>
                  <span className="text-[#0e1a7a] text-sm font-bold flex-shrink-0">+$59</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[#374151] text-sm font-medium">Social Boost</span>
                    <p className="text-[#64748B] text-xs mt-0.5">Promoted across Montessori Makers social channels.</p>
                  </div>
                  <span className="text-[#0e1a7a] text-sm font-bold flex-shrink-0">+$79</span>
                </div>
              </div>
              <p className="text-[#94A3B8] text-xs mt-4">Add-ons are selected after you submit the form.</p>
            </div>
          </>
        )}

        <a
          href="/matchhub/pricing"
          className="text-[#0e1a7a] text-xs font-medium hover:underline mt-5 inline-block"
        >
          Compare all plans →
        </a>
      </div>

      {/* School info */}
      <div>
        <p className="text-[#8A6014] text-[10px] tracking-[0.18em] uppercase mb-5">School Information</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>School Name</label>
            <input type="text" required placeholder="e.g. Sunrise Montessori School" className={inputClass}
              value={form.school_name} onChange={e => set('school_name', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>School Type</label>
            <select required className={selectClass} value={form.school_type} onChange={e => set('school_type', e.target.value)}>
              <option value="">Select type</option>
              {SCHOOL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className={labelClass}>About Your School</label>
          <textarea required rows={3} placeholder="Brief description of your school, culture, and Montessori approach..."
            className={`${inputClass} resize-none`}
            value={form.school_description} onChange={e => set('school_description', e.target.value)} />
        </div>
      </div>

      {/* Contact info */}
      <div>
        <p className="text-[#8A6014] text-[10px] tracking-[0.18em] uppercase mb-5">Contact Information</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Contact Name</label>
            <input type="text" required placeholder="Your full name" className={inputClass}
              value={form.contact_name} onChange={e => set('contact_name', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Contact Email</label>
            <input type="email" required placeholder="hiring@yourschool.org" className={inputClass}
              value={form.contact_email} onChange={e => set('contact_email', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Role details */}
      <div>
        <p className="text-[#8A6014] text-[10px] tracking-[0.18em] uppercase mb-5">Role Details</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Job Title</label>
            <input type="text" required placeholder="e.g. Primary Guide, Head of School" className={inputClass}
              value={form.job_title} onChange={e => set('job_title', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Level</label>
            <select required className={selectClass} value={form.level} onChange={e => set('level', e.target.value)}>
              <option value="">Select level</option>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input type="text" required placeholder="City, State" className={inputClass}
              value={form.location} onChange={e => set('location', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Employment Type</label>
            <select required className={selectClass} value={form.employment_type} onChange={e => set('employment_type', e.target.value)}>
              <option value="">Select type</option>
              {EMPLOYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Target Start Date <span className="text-[#94A3B8] font-normal">(optional)</span></label>
            <input type="date" className={inputClass}
              value={form.start_date} onChange={e => set('start_date', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Compensation</label>
            <input type="text" required placeholder="e.g. $48,000–$55,000" className={inputClass}
              value={form.compensation} onChange={e => set('compensation', e.target.value)} />
          </div>
        </div>
        <div className="mt-6">
          <label className={labelClass}>Credential Requirement</label>
          <select required className={selectClass} value={form.credential} onChange={e => set('credential', e.target.value)}>
            <option value="">Select credential preference</option>
            {CREDENTIALS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="mt-6">
          <label className={labelClass}>Role Description</label>
          <textarea required rows={6} placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
            className={`${inputClass} resize-none`}
            value={form.job_summary} onChange={e => set('job_summary', e.target.value)} />
        </div>
        <div className="mt-6">
          <label className={labelClass}>Application Link <span className="text-[#94A3B8] font-normal">(optional)</span></label>
          <input type="url" placeholder="https://yourschool.org/apply" className={inputClass}
            value={form.application_link} onChange={e => set('application_link', e.target.value)} />
          <p className="text-[#64748B] text-xs mt-1.5">Where should interested candidates apply? Leave blank to receive inquiries through MatchHub.</p>
        </div>
      </div>

      {/* Pro banner */}
      {isPro && (
        <div className="bg-[#d6a758]/10 border border-[#d6a758]/30 px-6 py-5">
          <p className="text-[#d6a758] text-xs tracking-[0.15em] uppercase font-semibold mb-1">MatchHub Pro</p>
          <p className="text-[#374151] text-sm">Featured placement and social media promotion are automatically included in your Pro plan.</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 px-5 py-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-[#E2DDD6]">
        <p className="text-[#64748B] text-xs leading-relaxed max-w-xs">
          Your listing will be reviewed before going live. Payment is completed on the next step.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting…' : 'Submit Role →'}
        </button>
      </div>
    </form>
  )
}

export default function PostJobPage() {
  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-20 md:pt-40 md:pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">Post a Job</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-6" style={serif}>
            Tell us about the role.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            Fill in the details below. Your listing will be reviewed before going live—typically within one business day of payment.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <Suspense fallback={<div className="text-[#64748B] text-sm">Loading form…</div>}>
            <PostJobForm />
          </Suspense>
        </div>
      </section>
    </>
  )
}

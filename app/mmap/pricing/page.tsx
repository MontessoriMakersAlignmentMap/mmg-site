'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }
const CONTACT = '/contact?source=MMAP-pricing'

// ── Launch gate ────────────────────────────────────────────────────────────────
// Flip to true (or change date) to open full purchase/scheduling flow.
const PRICING_LIVE = new Date('2026-05-01T00:00:00-04:00')
function isPricingLive() {
  return new Date() >= PRICING_LIVE
}

// ── Data ───────────────────────────────────────────────────────────────────────

const tiers = [
  {
    id: 'surveyor',
    name: 'Surveyor',
    scope: 'Classroom',
    price: 2,
    color: '#d6a758',
    desc: 'Classroom documentation for guides — lesson tracking, observations, and curriculum mapping.',
    features: [
      'Lesson tracking — per-student presentation log across the album',
      'Montessori album — full curriculum library with scope & sequence',
      'Observations with work-sample photo attachments',
      'Student progress maps and mastery tracking',
      'Standards alignment & CCSS mapping',
      'Classroom management & guide assignment',
      'Classroom Guide View — whole-roster, overdue-presentation flags',
      'Substitute Plans Generator',
      'Transition Library — 15 seeded activities',
    ],
  },
  {
    id: 'north-star',
    name: 'North Star',
    scope: 'School',
    price: 3,
    color: '#2D6A4F',
    desc: 'Core school operations — student records, attendance, family communication, and enrollment.',
    features: [
      'Everything in Surveyor',
      'Full Student Information System (SIS)',
      'Daily attendance — staff & student, absences, patterns',
      'Family Portal — messages, calendar, photos, documents',
      'Admissions pipeline — application through deposit',
      'Re-enrollment campaigns with parent-facing forms',
      'Family Learning Modules — 48 modules, Nido → high school',
      'Meal program, field trips, FERPA compliance',
    ],
  },
  {
    id: 'mapmaker',
    name: 'Mapmaker',
    scope: 'Organization',
    price: 5,
    color: '#1D4ED8',
    desc: 'Admissions CRM, HR, adult culture, equity dashboards, and SMS — all in one system.',
    features: [
      'Everything in North Star',
      'Full Admissions CRM — pipeline, tours, offers, placement',
      'HR Hub — hiring, onboarding, appraisals, coaching, PTO',
      'Adult culture tools — role clarity, culture hub, upward feedback',
      'Equity dashboards — demographics, ABAR pathways, pulse surveys',
      'SMS Broadcasts — included, no separate account needed',
      'Progress reports, SSO, Google Classroom sync',
      'Full Adolescent Program suite',
    ],
    popular: true,
  },
  {
    id: 'atlas',
    name: 'Atlas',
    scope: 'Leadership',
    price: 7,
    color: '#7C3AED',
    desc: "Leadership, governance, financial visibility, and the Leader's Desk command center.",
    features: [
      'Everything in Mapmaker',
      "Leader's Desk — open decisions, risks, monthly rhythm",
      'Board dashboard, snapshots & governance reports',
      'Strategic Planning Hub — multi-year goals & progress',
      'Embedded email drafting — 4 tones, for hard messages',
      'Decision Triage Log with automatic legal flag detection',
      'Document Generator — 7 templates (PIP, termination & more)',
      'Annual Rhythm Calendar — 28 seeded admin tasks by month',
      'Risk & Legal Flags — central registry with severity tracking',
      'Meeting Prep Workspace — agendas, objections, outcomes',
    ],
  },
]

const addons = [
  {
    id: 'finance',
    name: 'Finance Engine',
    price: 2,
    desc: 'Full tuition billing, Stripe payments, invoicing, and financial aid management.',
  },
  {
    id: 'pulse',
    name: 'Family Pulse',
    price: 0.5,
    desc: 'Belonging surveys and trend tracking. Understand family engagement before it becomes a retention problem.',
  },
  {
    id: 'peace',
    name: 'Peace & Restoration',
    price: 0.5,
    desc: 'Restorative justice workflow — incident documentation, circle facilitation, and outcome tracking.',
  },
]

const sizeExamples = [60, 120, 250, 400]

function fmtDollar(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

// ── Tier card ──────────────────────────────────────────────────────────────────

function TierCard({
  tier,
  live,
  onEstimate,
}: {
  tier: typeof tiers[0]
  live: boolean
  onEstimate: () => void
}) {
  return (
    <div
      className="bg-white border border-[#E2DDD6] flex flex-col relative"
      style={{ borderTop: `3px solid ${tier.color}` }}
    >
      {tier.popular && (
        <div
          className="absolute top-0 right-6 text-white text-[9px] tracking-[0.16em] uppercase font-semibold px-3 py-1"
          style={{ background: tier.color, transform: 'translateY(-100%)' }}
        >
          Most Popular
        </div>
      )}
      <div className="p-7 flex flex-col flex-1">
        <p className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: tier.color }}>
          {tier.scope}
        </p>
        <h3 className="text-[#0e1a7a] text-2xl mb-2" style={serif}>{tier.name}</h3>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-[#0e1a7a] text-4xl font-bold tracking-tight" style={serif}>
            ${tier.price}
          </span>
          <span className="text-[#64748B] text-sm">/student/month</span>
        </div>
        <p className="text-[#374151] text-sm leading-relaxed mb-6 mt-2">{tier.desc}</p>

        <div className="flex-1 space-y-2 mb-7">
          {tier.features.map((f) => (
            <div key={f} className="flex items-start gap-2.5">
              <span
                className="flex-shrink-0 mt-[5px] w-[5px] h-[5px] rounded-full"
                style={{ background: tier.color }}
              />
              <span className="text-[#374151] text-xs leading-snug">{f}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <button
            onClick={onEstimate}
            className="w-full py-3 text-white text-sm font-medium tracking-wide transition-colors hover:opacity-90"
            style={{ background: tier.color }}
          >
            Estimate my cost →
          </button>
          <a
            href={live ? CONTACT : '#interest-form'}
            className="block w-full py-3 border border-[#E2DDD6] text-[#374151] text-sm text-center tracking-wide hover:border-[#0e1a7a] hover:text-[#0e1a7a] transition-colors"
          >
            {live ? 'Get started' : 'Request access'}
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Calculator ─────────────────────────────────────────────────────────────────

function Calculator({ defaultTierId = 'mapmaker' }: { defaultTierId?: string }) {
  const [students, setStudents] = useState(120)
  const [tierId, setTierId] = useState(defaultTierId)
  const [activeAddons, setActiveAddons] = useState<Set<string>>(new Set())

  const tier = tiers.find((t) => t.id === tierId)!

  const { monthly, annual, perStudentAnnual } = useMemo(() => {
    let total = tier.price
    for (const id of activeAddons) {
      const a = addons.find((x) => x.id === id)
      if (a) total += a.price
    }
    const monthly = total * Math.max(students, 1)
    return { monthly, annual: monthly * 12, perStudentAnnual: monthly > 0 ? (monthly * 12) / Math.max(students, 1) : 0 }
  }, [tier, students, activeAddons])

  function toggleAddon(id: string) {
    setActiveAddons((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div id="calculator" className="bg-white border border-[#E2DDD6]">
      {/* Header bar */}
      <div className="bg-[#0e1a7a] px-8 py-5">
        <p className="text-[#d6a758] text-[11px] tracking-[0.2em] uppercase mb-1">Pricing Calculator</p>
        <p className="text-white text-xl" style={serif}>See what it costs for your school</p>
      </div>

      <div className="p-8 grid md:grid-cols-[1fr_auto] gap-10">
        {/* Left: inputs */}
        <div className="space-y-7">
          {/* Student count */}
          <div>
            <label className="block text-[#374151] text-sm font-medium mb-2">
              Enrolled students
            </label>
            <input
              type="number"
              min={1}
              max={5000}
              value={students}
              onChange={(e) => setStudents(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full border border-[#E2DDD6] px-4 py-3 text-[#0e1a7a] text-xl font-semibold focus:outline-none focus:border-[#0e1a7a] transition-colors"
            />
          </div>

          {/* Tier */}
          <div>
            <label className="block text-[#374151] text-sm font-medium mb-2">Tier</label>
            <div className="space-y-2">
              {tiers.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTierId(t.id)}
                  className="w-full flex items-center gap-4 px-4 py-3 border transition-all text-left"
                  style={{
                    borderColor: tierId === t.id ? t.color : '#E2DDD6',
                    background: tierId === t.id ? `${t.color}10` : '#fff',
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0 transition-all"
                    style={{ background: tierId === t.id ? t.color : '#D1D5DB' }}
                  />
                  <span className="flex-1 text-sm font-medium text-[#0e1a7a]">{t.name}</span>
                  <span className="text-sm font-semibold tabular-nums" style={{ color: t.color }}>
                    ${t.price}/student
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="block text-[#374151] text-sm font-medium mb-1">
              Add-ons{' '}
              <span className="font-normal text-[#94A3B8]">— optional, any tier</span>
            </label>
            <div className="space-y-2 mt-2">
              {addons.map((a) => (
                <button
                  key={a.id}
                  onClick={() => toggleAddon(a.id)}
                  className="w-full flex items-center gap-4 px-4 py-3 border transition-all text-left"
                  style={{
                    borderColor: activeAddons.has(a.id) ? '#d6a758' : '#E2DDD6',
                    background: activeAddons.has(a.id) ? '#d6a75810' : '#fff',
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: activeAddons.has(a.id) ? '#d6a758' : '#D1D5DB' }}
                  />
                  <span className="flex-1 text-sm text-[#0e1a7a]">{a.name}</span>
                  <span className="text-sm text-[#64748B] tabular-nums">+${a.price}/student</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: output */}
        <div className="md:w-72 flex flex-col">
          <div className="bg-[#0e1a7a] p-7 flex flex-col gap-5 flex-1">
            <div>
              <p className="text-[#d6a758] text-[10px] tracking-[0.2em] uppercase mb-2">Monthly total</p>
              <p className="text-white text-5xl font-bold tracking-tight leading-none" style={serif}>
                {fmtDollar(monthly)}
              </p>
              <p className="text-white/50 text-sm mt-1">per month</p>
            </div>

            <div className="border-t border-white/10 pt-5 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-white/60 text-sm">Annual total</span>
                <span className="text-white font-semibold" style={serif}>{fmtDollar(annual)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white/60 text-sm">Per student / year</span>
                <span className="text-white font-semibold" style={serif}>{fmtDollar(perStudentAnnual)}</span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="border-t border-white/10 pt-5 space-y-2">
              <p className="text-white/30 text-[10px] tracking-[0.16em] uppercase mb-3">Breakdown</p>
              <div className="flex justify-between text-xs">
                <span className="text-white/60">{tier.name} × {students} students</span>
                <span className="text-white tabular-nums">{fmtDollar(tier.price * students)}</span>
              </div>
              {Array.from(activeAddons).map((id) => {
                const a = addons.find((x) => x.id === id)!
                return (
                  <div key={id} className="flex justify-between text-xs">
                    <span className="text-white/60">{a.name} × {students}</span>
                    <span className="text-white tabular-nums">{fmtDollar(a.price * students)}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-auto pt-3">
              <a
                href="#interest-form"
                className="block w-full bg-[#d6a758] text-white text-sm text-center py-3 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
              >
                Get a quote →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── School size table ──────────────────────────────────────────────────────────

function SizeTable() {
  const [withFinance, setWithFinance] = useState(false)

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setWithFinance(false)}
          className="text-sm px-5 py-2 border transition-colors"
          style={{
            background: !withFinance ? '#0e1a7a' : 'transparent',
            borderColor: !withFinance ? '#0e1a7a' : '#E2DDD6',
            color: !withFinance ? '#fff' : '#64748B',
          }}
        >
          Base only
        </button>
        <button
          onClick={() => setWithFinance(true)}
          className="text-sm px-5 py-2 border transition-colors"
          style={{
            background: withFinance ? '#0e1a7a' : 'transparent',
            borderColor: withFinance ? '#0e1a7a' : '#E2DDD6',
            color: withFinance ? '#fff' : '#64748B',
          }}
        >
          + Finance Engine
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#E2DDD6]">
              <th className="text-left pb-3 pr-8 text-[#94A3B8] text-[10px] tracking-[0.18em] uppercase font-medium w-40">
                Tier
              </th>
              {sizeExamples.map((n) => (
                <th key={n} className="text-right pb-3 px-4 text-[#94A3B8] text-[10px] tracking-[0.18em] uppercase font-medium">
                  {n} students
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr key={tier.id} className="border-b border-[#E2DDD6] last:border-0">
                <td className="py-4 pr-8">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: tier.color }} />
                    <div>
                      <span className="text-[#0e1a7a] font-semibold">{tier.name}</span>
                      <span className="text-[#94A3B8] text-xs ml-2">${tier.price}/student</span>
                    </div>
                  </div>
                </td>
                {sizeExamples.map((students) => {
                  const base = tier.price * students
                  const financeAdd = withFinance ? 2 * students : 0
                  const monthly = base + financeAdd
                  return (
                    <td key={students} className="py-4 px-4 text-right">
                      <div className="text-[#0e1a7a] font-semibold tabular-nums" style={serif}>
                        {fmtDollar(monthly)}<span className="text-[#94A3B8] font-normal text-xs">/mo</span>
                      </div>
                      <div className="text-[#64748B] text-xs mt-0.5 tabular-nums">
                        {fmtDollar(monthly * 12)}/yr
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {withFinance && (
        <p className="text-[#64748B] text-xs mt-4 leading-relaxed">
          Finance Engine adds $2/student/month. Family Pulse (+$0.50) and Peace &amp; Restoration (+$0.50) are additional.
        </p>
      )}
    </div>
  )
}

// ── Interest form ──────────────────────────────────────────────────────────────

type FormState = 'idle' | 'submitting' | 'success' | 'error'

function InterestForm({ live }: { live: boolean }) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    schoolName: '',
    contactName: '',
    email: '',
    enrollment: '',
    tierInterest: 'mapmaker',
    addons: [] as string[],
    notes: '',
  })

  function toggleAddon(id: string) {
    setForm((f) => ({
      ...f,
      addons: f.addons.includes(id) ? f.addons.filter((a) => a !== id) : [...f.addons, id],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('submitting')
    try {
      const res = await fetch('/api/mmap/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  const inputCls = 'w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d6a758] transition-colors'

  if (formState === 'success') {
    return (
      <div className="bg-white/10 border border-white/20 p-12 text-center max-w-2xl mx-auto">
        <p className="text-[#d6a758] text-[11px] tracking-[0.2em] uppercase mb-4">Received</p>
        <h3 className="text-white text-2xl mb-4" style={serif}>We&rsquo;ll be in touch.</h3>
        <p className="text-[#94A3B8] text-base leading-relaxed">
          Hannah or a member of our team will reach out within two business days to schedule your onboarding call.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">School name *</label>
          <input required type="text" value={form.schoolName}
            onChange={(e) => setForm((f) => ({ ...f, schoolName: e.target.value }))}
            className={inputCls} />
        </div>
        <div>
          <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">Your name *</label>
          <input required type="text" value={form.contactName}
            onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
            className={inputCls} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">Email *</label>
          <input required type="email" value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputCls} />
        </div>
        <div>
          <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">Current enrollment *</label>
          <input required type="number" min="1" placeholder="Number of students" value={form.enrollment}
            onChange={(e) => setForm((f) => ({ ...f, enrollment: e.target.value }))}
            className={inputCls} />
        </div>
      </div>
      <div>
        <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">Tier you&rsquo;re considering *</label>
        <select required value={form.tierInterest}
          onChange={(e) => setForm((f) => ({ ...f, tierInterest: e.target.value }))}
          className="w-full bg-[#0e1a7a] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d6a758] transition-colors">
          {tiers.map((t) => (
            <option key={t.id} value={t.id}>{t.name} — ${t.price}/student/month</option>
          ))}
          <option value="not_sure">Not sure yet</option>
        </select>
      </div>
      <div>
        <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-3 block">
          Add-ons you&rsquo;re considering <span className="normal-case font-normal">(check all that apply)</span>
        </label>
        <div className="grid sm:grid-cols-2 gap-2">
          {[...addons, { id: 'handbook', name: 'Handbook Templates' }, { id: 'api', name: 'API / SIS Integration' }].map((a) => (
            <label key={a.id} className="flex items-center gap-3 cursor-pointer group py-1">
              <input type="checkbox" checked={form.addons.includes(a.id)}
                onChange={() => toggleAddon(a.id)} className="w-4 h-4 accent-[#d6a758]" />
              <span className="text-white/70 text-sm group-hover:text-white transition-colors">{a.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">Anything else?</label>
        <textarea value={form.notes} rows={3}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          className={`${inputCls} resize-none`} />
      </div>

      {formState === 'error' && (
        <p className="text-red-300 text-sm">Something went wrong. Please try again or email us directly.</p>
      )}

      <button type="submit" disabled={formState === 'submitting'}
        className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium disabled:opacity-60">
        {formState === 'submitting'
          ? 'Sending…'
          : live
          ? 'Schedule Onboarding Call →'
          : 'Request Early Access →'}
      </button>
    </form>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function MMAPPricingPage() {
  const live = isPricingLive()
  const [calcTierId, setCalcTierId] = useState('mapmaker')

  function scrollToCalc(id: string) {
    setCalcTierId(id)
    setTimeout(() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <>
      {/* Pre-launch banner */}
      {!live && (
        <div className="bg-[#d6a758] px-6 py-3 text-center">
          <p className="text-white text-sm font-medium">
            The Alignment Map opens for new school subscriptions on May 1, 2026.{' '}
            <a href="#interest-form" className="underline hover:no-underline">Submit your interest now</a>{' '}
            and we&rsquo;ll be in touch to schedule your onboarding call.
          </p>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-28 pb-20 md:pt-36 md:pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              MMAP · Pricing
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-6" style={serif}>
              Simple, per-student pricing.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-4 max-w-2xl">
              One number per student. Scales with enrollment. No seat minimums, no module
              fees, no hidden line items — just a monthly rate that reflects exactly what
              your school is using.
            </p>
            <p className="text-[#94A3B8] text-base leading-relaxed max-w-2xl">
              Every tier includes everything below it. Add-ons are optional and available
              on any tier. SMS Broadcasts are built into Mapmaker and Atlas at no extra cost.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] border-b border-[#E2DDD6] py-14 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 max-w-4xl">
          {[
            { n: '01', title: 'Per enrolled student', body: 'You pay based on actual enrollment — not seats or user accounts. Set your count when you start; adjust as your school grows.' },
            { n: '02', title: 'Billed monthly, annual agreement', body: 'Invoiced monthly under an annual commitment. No locking funds up-front, no surprise quarterly bills.' },
            { n: '03', title: 'Starts with an onboarding call', body: "No school goes live without a setup call. Every subscription is configured in partnership with Hannah's team to make sure the platform reflects your program." },
          ].map((item) => (
            <div key={item.n} className="flex gap-5">
              <span className="text-[#d6a758] text-[11px] tracking-[0.18em] mt-1 flex-shrink-0">{item.n}</span>
              <div>
                <h3 className="text-[#0e1a7a] font-semibold text-base mb-2" style={serif}>{item.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIER CARDS ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Tiers</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
            Four tiers. One platform.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Start where your school is. Every tier builds on the one below it — you never
            lose access to lower-tier features.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {tiers.map((tier) => (
              <TierCard
                key={tier.id}
                tier={tier}
                live={live}
                onEstimate={() => scrollToCalc(tier.id)}
              />
            ))}
          </div>
          <p className="text-[#94A3B8] text-sm">
            All prices are per enrolled student, per month, under an annual agreement.{' '}
            <a href="#interest-form" className="text-[#8A6014] hover:underline">Questions? Reach out.</a>
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ───────────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Estimate Your Cost</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
            See the number for your school.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-12 max-w-2xl">
            Enter your student count, pick a tier, and toggle any add-ons. The number
            updates instantly.
          </p>
          <Calculator defaultTierId={calcTierId} />
        </div>
      </section>

      {/* ── ADD-ONS ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Optional Add-ons</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
            Add what you need. Nothing you don&rsquo;t.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Add-ons are per-student, per-month — same pricing model as the base tiers.
            Available on any tier, any time.
          </p>
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {addons.map((addon) => (
              <div key={addon.id} className="bg-[#FAF9F7] border border-[#E2DDD6] p-7">
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <h3 className="text-[#0e1a7a] font-semibold text-lg" style={serif}>{addon.name}</h3>
                  <span className="text-[#d6a758] font-semibold flex-shrink-0" style={serif}>
                    +${addon.price}/student/mo
                  </span>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed">{addon.desc}</p>
              </div>
            ))}
          </div>

          {/* Handbook + SMS note side by side */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-7">
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <h3 className="text-[#0e1a7a] font-semibold text-lg" style={serif}>Handbook Templates</h3>
                <span className="text-[#64748B] text-sm flex-shrink-0">Flat per-school rate</span>
              </div>
              <p className="text-[#374151] text-sm leading-relaxed mb-4">
                Configurable family handbook, staff handbook, and board handbook. Built-in
                annually updated language with school-level customization.
              </p>
              <a href="#interest-form" className="text-[#8A6014] text-sm hover:underline">Ask about pricing →</a>
            </div>

            <div className="bg-[#0e1a7a] p-7">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-[#d6a758] text-lg mt-0.5 flex-shrink-0">✓</span>
                <h3 className="text-white font-semibold text-lg leading-snug" style={serif}>
                  SMS Broadcasts — included in Mapmaker &amp; Atlas
                </h3>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                No Twilio account, no compliance management — MMG handles the
                infrastructure. Send to your whole school or targeted groups from inside MMAP.
                Not available as a standalone add-on on lower tiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHOOL SIZE EXAMPLES ─────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">By School Size</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
            What schools like yours pay.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-12 max-w-2xl">
            Monthly and annual totals across common Montessori school sizes. Toggle
            Finance Engine on to see the difference.
          </p>
          <SizeTable />
        </div>
      </section>

      {/* ── FULLY LOADED EXAMPLE ─────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Fully Loaded Example</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Everything on, for 120 students.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              Atlas with all three per-student add-ons — Finance Engine, Family Pulse, and
              Peace &amp; Restoration — for a 120-student school.
            </p>
            <p className="text-[#374151] text-lg leading-relaxed">
              That&rsquo;s a complete school platform: leadership tools, tuition billing,
              equity surveys, and restorative justice — for about{' '}
              <strong className="text-[#0e1a7a]">$83 per student per year</strong> fully loaded.
            </p>
          </div>
          <div>
            {[
              { label: 'Atlas base', calc: '120 × $7', mo: 840 },
              { label: 'Finance Engine', calc: '120 × $2', mo: 240 },
              { label: 'Family Pulse', calc: '120 × $0.50', mo: 60 },
              { label: 'Peace & Restoration', calc: '120 × $0.50', mo: 60 },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-4 border-b border-[#E2DDD6]">
                <div>
                  <p className="text-[#374151] text-sm font-medium">{row.label}</p>
                  <p className="text-[#94A3B8] text-xs mt-0.5">{row.calc}</p>
                </div>
                <p className="text-[#0e1a7a] font-semibold tabular-nums" style={serif}>
                  {fmtDollar(row.mo)}/mo
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between py-5 px-5 bg-[#0e1a7a] mt-0">
              <div>
                <p className="text-white font-semibold">Total</p>
                <p className="text-[#94A3B8] text-xs mt-0.5">$10/student/month · $120/student/year</p>
              </div>
              <div className="text-right">
                <p className="text-[#d6a758] text-2xl font-bold tabular-nums" style={serif}>$1,200/mo</p>
                <p className="text-[#94A3B8] text-xs mt-0.5">$14,400/year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Enterprise &amp; Integrations</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Quoted separately.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-8">
              Some capabilities are scoped to the school and quoted individually.
              Reach out and we&rsquo;ll build a custom proposal.
            </p>
            <a
              href="#interest-form"
              className="inline-block bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors font-medium"
            >
              Request an enterprise quote
            </a>
          </div>
          <div>
            {[
              {
                name: 'Assessment Equity Analytics',
                desc: 'Advanced equity analysis across academic and behavioral data. Scoped per school.',
              },
              {
                name: 'API / External SIS Integration',
                desc: 'Two-way sync with FACTS, Blackbaud, state reporting systems, and other external SIS platforms.',
              },
              {
                name: 'Multi-campus / Network pricing',
                desc: 'Schools operating multiple campuses or networks. Volume discounts available.',
              },
            ].map((item) => (
              <div key={item.name} className="flex items-start gap-5 py-5 border-b border-[#E2DDD6] last:border-0">
                <span className="text-[#d6a758] flex-shrink-0 mt-1">—</span>
                <div>
                  <p className="text-[#0e1a7a] font-semibold text-base mb-1" style={serif}>{item.name}</p>
                  <p className="text-[#374151] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEREST FORM ────────────────────────────────────────────────────── */}
      <section id="interest-form" className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6 text-center">
            {live ? 'Get Started' : 'Request Early Access'}
          </p>
          <h2 className="text-4xl md:text-5xl text-white leading-tight mb-4 text-center" style={serif}>
            {live ? "Ready to get started?" : "Get in line before May 1."}
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-14 max-w-xl mx-auto text-center">
            {live
              ? "Tell us about your school and Hannah or a member of our team will be in touch within two business days to schedule your onboarding call."
              : "Tell us about your school and we'll be in touch to schedule your onboarding call before the Alignment Map opens on May 1, 2026."}
          </p>
          <InterestForm live={live} />
        </div>
      </section>

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-14 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <p className="text-[#374151] text-base">Want to see the Alignment Map in action before you decide?</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/mmap/demo"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-3 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center">
              Watch the Demo
            </Link>
            <Link href="/mmap"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-3 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center">
              Back to MMAP Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Fine print */}
      <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#94A3B8] text-xs leading-relaxed max-w-4xl">
            Pricing is per enrolled student, per month, billed monthly under an annual agreement.
            SMS Broadcasts are included in Mapmaker and Atlas — MMG manages Twilio infrastructure and compliance on your behalf.
            Finance Engine, Family Pulse, and Peace &amp; Restoration are optional add-ons available on any tier.
            Handbook Templates are priced as a flat per-school annual rate; contact us for details.
            Assessment Equity Analytics and API/SIS integrations are quoted separately based on scope.
            All prices are subject to change; contracted rates are honored for the subscription term.
          </p>
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}

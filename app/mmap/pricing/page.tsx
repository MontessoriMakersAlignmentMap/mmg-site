'use client'

import { useState } from 'react'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

// ── Launch gate ───────────────────────────────────────────────────────────────
// Change this date to open full purchase/scheduling flow. No other code change needed.
const PRICING_LIVE = new Date('2026-05-01T00:00:00-04:00')

function isPricingLive() {
  return new Date() >= PRICING_LIVE
}

// ── Tier data ─────────────────────────────────────────────────────────────────
const tiers = [
  {
    key: 'surveyor',
    name: 'Surveyor',
    rate: 2,
    minimum: null as number | null,
    tagline: 'For schools beginning structured alignment work for the first time.',
    features: [
      'Curriculum alignment mapping',
      'Observation and documentation tools',
      'Core Montessori assessment framework',
      'School operations basics',
      'Guide workflow support',
      'Family communication log',
    ],
    implementation: false,
    highlight: false,
  },
  {
    key: 'north_star',
    name: 'North Star',
    rate: 3,
    minimum: 300 as number | null,
    tagline: 'For schools ready to build shared vision and alignment across the leadership team.',
    features: [
      'Everything in Surveyor',
      'Expanded alignment reporting',
      'School-wide benchmarking',
      'Leadership dashboard',
      'Strategic goal tracking',
      'Board-ready reporting summaries',
    ],
    implementation: true,
    highlight: false,
  },
  {
    key: 'mapmaker',
    name: 'Mapmaker',
    rate: 5,
    minimum: 500 as number | null,
    tagline: 'For schools doing serious organizational development across programs and leadership.',
    features: [
      'Everything in North Star',
      'Full alignment mapping',
      'Cross-classroom analytics',
      'Multi-program coordination',
      'Staff development tracking',
      'Culture and retention tools',
    ],
    implementation: true,
    highlight: true,
  },
  {
    key: 'atlas',
    name: 'Atlas',
    rate: 7,
    minimum: 800 as number | null,
    tagline: 'For schools seeking comprehensive whole-school implementation with full platform access.',
    features: [
      'Everything in Mapmaker',
      'Full platform access',
      'Strategic alignment tools',
      'Advanced analytics suite',
      'Priority implementation support',
      'Dedicated onboarding sessions',
    ],
    implementation: true,
    highlight: false,
  },
]

const addons = [
  {
    name: 'Finance Engine',
    key: 'finance_engine',
    rate: 2,
    minimum: 250,
    billing: 'per student / month',
    desc: 'School finance analytics and budget alignment tools integrated within MMAP.',
    quoteOnly: false,
    flatRate: false,
  },
  {
    name: 'Family Pulse',
    key: 'family_pulse',
    rate: 0.5,
    minimum: 100,
    billing: 'per student / month',
    desc: 'Family engagement tracking and communication tools.',
    quoteOnly: false,
    flatRate: false,
  },
  {
    name: 'Peace and Restoration',
    key: 'peace_restoration',
    rate: 0.5,
    minimum: 100,
    billing: 'per student / month',
    desc: 'Restorative practice tracking and peace education tools.',
    quoteOnly: false,
    flatRate: false,
  },
  {
    name: 'SMS Broadcasts',
    key: 'sms_broadcasts',
    rate: 0.5,
    minimum: 100,
    billing: 'per student / month',
    desc: 'SMS communication broadcasts to families through MMAP.',
    quoteOnly: false,
    flatRate: false,
  },
  {
    name: 'Handbook Templates',
    key: 'handbook_templates',
    rate: null as number | null,
    minimum: null as number | null,
    billing: 'flat rate per school',
    desc: 'Editable staff and family handbook templates customized for Montessori schools.',
    quoteOnly: false,
    flatRate: true,
  },
  {
    name: 'Assessment Equity Analytics',
    key: 'assessment_equity_analytics',
    rate: null as number | null,
    minimum: null as number | null,
    billing: 'quote',
    desc: 'Advanced equity-focused assessment analytics and disaggregated reporting.',
    quoteOnly: true,
    flatRate: false,
  },
  {
    name: 'API / SIS Integration',
    key: 'custom_integration',
    rate: null as number | null,
    minimum: null as number | null,
    billing: 'quote',
    desc: 'Custom API and Student Information System integration with MMAP.',
    quoteOnly: true,
    flatRate: false,
  },
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function MmapPricingPage() {
  const live = isPricingLive()

  const [students, setStudents] = useState('')
  const [calcTier, setCalcTier] = useState('mapmaker')

  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    schoolName: '',
    contactName: '',
    email: '',
    phone: '',
    enrollment: '',
    tierInterest: 'mapmaker',
    addons: [] as string[],
  })

  function calcEstimate() {
    const count = parseInt(students)
    if (!count || count <= 0) return null
    const tier = tiers.find((t) => t.key === calcTier)!
    const raw = count * tier.rate
    const monthly = tier.minimum ? Math.max(raw, tier.minimum) : raw
    const minimumApplies = !!tier.minimum && raw < tier.minimum
    return { monthly, annual: monthly * 12, minimumApplies, minimum: tier.minimum, raw }
  }

  function handleAddonToggle(key: string) {
    setForm((f) => ({
      ...f,
      addons: f.addons.includes(key) ? f.addons.filter((a) => a !== key) : [...f.addons, key],
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

  const estimate = calcEstimate()
  const ctaLabel = live ? 'Schedule Your Onboarding Call' : 'Request Early Access'

  function CtaButton({ className = '' }: { className?: string }) {
    // TODO (after May 1): replace href with Calendly scheduling link
    // e.g. href="https://calendly.com/hannahrichardson/mmap-onboarding"
    return (
      <a
        href="#interest-form"
        className={`bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium inline-block text-center ${className}`}
      >
        {ctaLabel} &rarr;
      </a>
    )
  }

  return (
    <>
      {/* Pre-launch banner — hidden on/after May 1 */}
      {!live && (
        <div className="bg-[#d6a758] px-6 py-3 text-center">
          <p className="text-white text-sm font-medium">
            MMAP opens for new school subscriptions on May 1, 2026.{' '}
            <a href="#interest-form" className="underline hover:no-underline">
              Submit your interest now
            </a>{' '}
            and we will be in touch to schedule your onboarding call before launch.
          </p>
        </div>
      )}

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              MMAP &middot; Pricing
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              Transparent pricing.
              <br />
              Built for how schools actually work.
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-8 max-w-2xl">
              MMAP is licensed per enrolled student, billed monthly under an annual agreement.
              Every subscription begins with an onboarding call &mdash; not as a formality, but
              because every school is set up in partnership with Hannah and the MMAP team to make
              sure the platform is configured correctly from day one.
            </p>
            <CtaButton />
          </div>
        </div>
      </section>

      {/* ── 2. HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-16 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
            {[
              {
                n: '01',
                title: 'Per enrolled student',
                body: 'You pay based on your actual enrollment. Set the quantity when creating your subscription — it adjusts as your school grows.',
              },
              {
                n: '02',
                title: 'Monthly, annual agreement',
                body: 'Billed monthly. All subscriptions are annual commitments. Monthly minimums apply for North Star, Mapmaker, and Atlas.',
              },
              {
                n: '03',
                title: 'Starts with an onboarding call',
                body: "No school goes live without a setup call. It's how we make sure the platform reflects your program, not a generic default.",
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-5">
                <span className="text-[#d6a758] text-[11px] tracking-[0.18em] mt-1 flex-shrink-0">
                  {item.n}
                </span>
                <div>
                  <h3 className="text-[#0e1a7a] font-semibold text-base mb-2" style={serif}>
                    {item.title}
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TIER CARDS ───────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            Subscription Tiers
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-4"
            style={serif}
          >
            Four tiers. One platform.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Every tier runs on the same MMAP platform. The difference is depth of access,
            reporting, and the scope of organizational work the tools are designed to support.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                className={`flex flex-col border ${
                  tier.highlight
                    ? 'border-[#d6a758] shadow-[0_4px_24px_rgba(214,167,88,0.18)]'
                    : 'border-[#E2DDD6]'
                } bg-white`}
              >
                <div className={`h-1 ${tier.highlight ? 'bg-[#d6a758]' : 'bg-[#0e1a7a]'}`} />
                <div className="p-7 flex flex-col flex-1">
                  {tier.highlight && (
                    <span className="text-[#8A6014] text-[10px] tracking-[0.18em] uppercase mb-3">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-[#0e1a7a] text-2xl font-semibold mb-1" style={serif}>
                    {tier.name}
                  </h3>
                  <div className="mb-1">
                    <span className="text-[#d6a758] text-3xl font-semibold" style={serif}>
                      ${tier.rate}
                    </span>
                    <span className="text-[#64748B] text-sm ml-1">/ student / month</span>
                  </div>
                  {tier.minimum ? (
                    <p className="text-[#64748B] text-xs mb-4">
                      ${tier.minimum.toLocaleString()} monthly minimum
                    </p>
                  ) : (
                    <p className="text-[#64748B] text-xs mb-4">No minimum</p>
                  )}
                  <p className="text-[#374151] text-sm leading-relaxed mb-6 flex-1">
                    {tier.tagline}
                  </p>
                  <ul className="space-y-2 mb-7">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-[#374151]">
                        <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {tier.implementation && (
                    <p className="text-[#64748B] text-[11px] leading-relaxed mb-5 border-t border-[#F2EDE6] pt-4">
                      Includes one-time $2,500 implementation fee
                    </p>
                  )}
                  <CtaButton className="w-full" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-6 max-w-3xl">
            <p className="text-[#374151] text-sm leading-relaxed">
              <span className="font-semibold text-[#0e1a7a]">Implementation fee:</span> North Star,
              Mapmaker, and Atlas schools pay a one-time $2,500 implementation fee at the start of
              their subscription. This covers platform configuration, data setup, onboarding
              sessions, and first-month support. The fee is waived for pilot schools.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. CALCULATOR ───────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            Estimate Your Cost
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-4"
            style={serif}
          >
            See what MMAP would cost your school.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-12 max-w-2xl">
            Enter your enrolled student count and select a tier. This is a planning estimate
            &mdash; your actual invoice is based on the quantity set when your subscription is
            created.
          </p>

          <div className="bg-white border border-[#E2DDD6] p-8 md:p-12 max-w-2xl">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-[#0e1a7a] text-xs tracking-[0.14em] uppercase font-medium mb-2 block">
                  Enrolled students
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 120"
                  value={students}
                  onChange={(e) => setStudents(e.target.value)}
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-[#0e1a7a] text-base focus:outline-none focus:border-[#0e1a7a] transition-colors"
                />
              </div>
              <div>
                <label className="text-[#0e1a7a] text-xs tracking-[0.14em] uppercase font-medium mb-2 block">
                  Tier
                </label>
                <select
                  value={calcTier}
                  onChange={(e) => setCalcTier(e.target.value)}
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-[#0e1a7a] text-base focus:outline-none focus:border-[#0e1a7a] transition-colors bg-white"
                >
                  {tiers.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.name} — ${t.rate}/student
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {estimate ? (
              <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-6">
                <p className="text-[#8A6014] text-[10px] tracking-[0.18em] uppercase mb-4">
                  Estimated cost
                </p>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-[#0e1a7a] text-4xl font-semibold" style={serif}>
                    ${estimate.monthly.toLocaleString()}
                  </span>
                  <span className="text-[#64748B] text-sm mb-1">/ month</span>
                </div>
                <p className="text-[#374151] text-sm mb-1">
                  ${estimate.annual.toLocaleString()} annual commitment
                </p>
                {estimate.minimumApplies && (
                  <p className="text-[#8A6014] text-xs mt-3 leading-relaxed">
                    Monthly minimum of ${estimate.minimum?.toLocaleString()} applies &mdash; your
                    student count alone would be ${estimate.raw.toLocaleString()}/month.
                  </p>
                )}
                <p className="text-[#94A3B8] text-[11px] mt-4">
                  This is an estimate. Actual billing is based on the enrollment quantity set at
                  subscription creation.
                </p>
              </div>
            ) : (
              <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-6 text-center">
                <p className="text-[#64748B] text-sm">
                  Enter your student count above to see an estimate.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 5. ADD-ONS ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            Add-On Modules
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-4"
            style={serif}
          >
            Extend what MMAP does for your school.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Add-ons layer onto any tier. They are licensed the same way &mdash; per student,
            monthly.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {addons.map((addon) => (
              <div key={addon.key} className="border border-[#E2DDD6] p-7">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3
                    className="text-[#0e1a7a] font-semibold text-lg leading-snug"
                    style={serif}
                  >
                    {addon.name}
                  </h3>
                  <div className="text-right flex-shrink-0">
                    {addon.quoteOnly ? (
                      <span className="text-[#64748B] text-sm">Quote only</span>
                    ) : addon.flatRate ? (
                      <span className="text-[#64748B] text-sm">Flat rate per school</span>
                    ) : (
                      <>
                        <span className="text-[#d6a758] font-semibold text-lg" style={serif}>
                          ${addon.rate}
                        </span>
                        <span className="text-[#64748B] text-xs ml-1">{addon.billing}</span>
                        {addon.minimum && (
                          <p className="text-[#64748B] text-xs">
                            ${addon.minimum} minimum
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed">{addon.desc}</p>
                {addon.quoteOnly && (
                  <a
                    href="#interest-form"
                    className="text-[#0e1a7a] text-xs font-medium hover:underline mt-3 inline-block"
                  >
                    Request a quote &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. INTEREST FORM ────────────────────────────────────────────────── */}
      <section id="interest-form" className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6">
              {live ? 'Schedule Your Onboarding Call' : 'Request Early Access'}
            </p>
            <h2
              className="text-4xl md:text-5xl text-white leading-tight tracking-tight mb-4"
              style={serif}
            >
              {live ? 'Ready to get started?' : 'Get in line before May 1.'}
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12">
              {live
                ? 'Tell us about your school and Hannah or a member of the MMAP team will be in touch within two business days to schedule your onboarding call.'
                : 'Tell us about your school and we will be in touch to schedule your onboarding call before MMAP opens on May 1, 2026.'}
            </p>

            {formState === 'success' ? (
              <div className="bg-white/10 border border-white/20 p-10 text-center">
                <p className="text-[#d6a758] text-[11px] tracking-[0.18em] uppercase mb-4">
                  Received
                </p>
                <h3 className="text-white text-2xl mb-4" style={serif}>
                  We&rsquo;ll be in touch.
                </h3>
                <p className="text-[#94A3B8] text-base leading-relaxed">
                  Hannah or a member of the MMAP team will reach out within two business days to
                  schedule your onboarding call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">
                      School name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.schoolName}
                      onChange={(e) => setForm((f) => ({ ...f, schoolName: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d6a758] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">
                      Your name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.contactName}
                      onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d6a758] transition-colors"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d6a758] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d6a758] transition-colors"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">
                      Current enrollment *
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      placeholder="Number of students"
                      value={form.enrollment}
                      onChange={(e) => setForm((f) => ({ ...f, enrollment: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d6a758] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-2 block">
                      Tier interest *
                    </label>
                    <select
                      required
                      value={form.tierInterest}
                      onChange={(e) => setForm((f) => ({ ...f, tierInterest: e.target.value }))}
                      className="w-full bg-[#0e1a7a] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d6a758] transition-colors"
                    >
                      {tiers.map((t) => (
                        <option key={t.key} value={t.key}>
                          {t.name} &mdash; ${t.rate}/student/month
                        </option>
                      ))}
                      <option value="not_sure">Not sure yet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs tracking-[0.12em] uppercase mb-3 block">
                    Add-ons you&rsquo;re considering
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {addons.map((addon) => (
                      <label
                        key={addon.key}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={form.addons.includes(addon.key)}
                          onChange={() => handleAddonToggle(addon.key)}
                          className="w-4 h-4 accent-[#d6a758]"
                        />
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                          {addon.name}
                          {addon.quoteOnly && (
                            <span className="text-white/40"> (quote)</span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {formState === 'error' && (
                  <p className="text-red-300 text-sm">
                    Something went wrong. Please try again or email info@montessorimakers.org
                    directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium disabled:opacity-60"
                >
                  {formState === 'submitting' ? 'Sending\u2026' : `${ctaLabel} \u2192`}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 7. BOTTOM NAV ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <p className="text-[#374151] text-base">Want to see MMAP in action first?</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/mmap/demo"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-[13px] px-8 py-3 tracking-[0.07em] hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
            >
              Watch a Demo
            </Link>
            <Link
              href="/mmap/tour"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-[13px] px-8 py-3 tracking-[0.07em] hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
            >
              Platform Tour
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

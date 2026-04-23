'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Stripe catalog (live mode) ────────────────────────────────────────────────
const STRIPE_CATALOG = {
  tiers: [
    { key: 'surveyor',   label: 'Surveyor',   rate: 2,   priceId: 'price_1TPCsXPGvmx1ACnD2K5awYU7', productId: 'prod_UNypCqbEZfFWv3' },
    { key: 'north_star', label: 'North Star', rate: 3,   priceId: 'price_1TPCsaPGvmx1ACnDwnZN8pGF', productId: 'prod_UNypm6jODuuzpD' },
    { key: 'mapmaker',   label: 'Mapmaker',   rate: 5,   priceId: 'price_1TPCsdPGvmx1ACnDBzLt65ER', productId: 'prod_UNyp5rSC0GIsQL' },
    { key: 'atlas',      label: 'Atlas',      rate: 7,   priceId: 'price_1TPCsgPGvmx1ACnDiRukxaHH', productId: 'prod_UNypOPls8R6Gnl' },
  ],
  addons: [
    { key: 'finance', label: 'Finance Engine',    rate: 2,   priceId: 'price_1TPCsjPGvmx1ACnDTW56AnUs', productId: 'prod_UNypdSvsTwT9HO' },
    { key: 'pulse',   label: 'Family Pulse',      rate: 0.5, priceId: 'price_1TPCsmPGvmx1ACnDns0jaw2m', productId: 'prod_UNyppnwVjOlnns' },
    { key: 'peace',   label: 'Peace & Restoration', rate: 0.5, priceId: 'price_1TPCspPGvmx1ACnDaUvzxhRA', productId: 'prod_UNypu8LQLISFks' },
  ],
}

// ── Types ─────────────────────────────────────────────────────────────────────
type TierKey = 'surveyor' | 'north_star' | 'mapmaker' | 'atlas'
type AddonKey = 'finance' | 'pulse' | 'peace'

interface EnrollmentRecord {
  id: string
  createdAt: string
  completedAt?: string
  step: number
  // Step 1
  schoolName: string
  contactName: string
  contactEmail: string
  enrollment: string
  tier: TierKey | ''
  addons: AddonKey[]
  notes: string
  pilotWaived: boolean
  // Step 2
  callScheduled: boolean
  callDate: string
  callCompleted: boolean
  callNotes: string
  // Step 3
  agreementSent: boolean
  agreementSentDate: string
  agreementSigned: boolean
  agreementSignedDate: string
  // Step 4
  stripeCustomerId: string
  // Step 5
  stripeSubscriptionId: string
  implFeePaid: boolean
  // Step 6
  platformActivated: boolean
  welcomeEmailSent: boolean
  addedToTracking: boolean
  goLiveNotes: string
}

const BLANK_ENROLLMENT = (): EnrollmentRecord => ({
  id: `enr_${Date.now()}`,
  createdAt: new Date().toISOString(),
  step: 1,
  schoolName: '', contactName: '', contactEmail: '', enrollment: '', tier: '', addons: [], notes: '', pilotWaived: false,
  callScheduled: false, callDate: '', callCompleted: false, callNotes: '',
  agreementSent: false, agreementSentDate: '', agreementSigned: false, agreementSignedDate: '',
  stripeCustomerId: '',
  stripeSubscriptionId: '', implFeePaid: false,
  platformActivated: false, welcomeEmailSent: false, addedToTracking: false, goLiveNotes: '',
})

const STEP_LABELS = [
  'School Details',
  'Onboarding Call',
  'Agreement',
  'Stripe Customer',
  'Stripe Subscription',
  'Go Live',
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(iso: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function calcMonthly(enrollment: string, tier: TierKey | '', addons: AddonKey[]) {
  const n = parseInt(enrollment) || 0
  const t = STRIPE_CATALOG.tiers.find(x => x.key === tier)
  if (!n || !t) return null
  const addonRate = addons.reduce((sum, k) => {
    const a = STRIPE_CATALOG.addons.find(x => x.key === k)
    return sum + (a?.rate ?? 0)
  }, 0)
  return (t.rate + addonRate) * n
}

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button onClick={copy} className="ml-2 text-[10px] px-2 py-0.5 border border-gray-200 text-gray-500 hover:border-[#0e1a7a] hover:text-[#0e1a7a] transition-colors rounded">
      {copied ? '✓' : 'Copy'}
    </button>
  )
}

function PriceRow({ label, priceId, productId, rate }: { label: string; priceId: string; productId: string; rate: number }) {
  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-2 pr-4 text-xs text-gray-700 font-medium w-36">{label}</td>
      <td className="py-2 pr-2 text-xs text-gray-400 w-16">${rate}/mo</td>
      <td className="py-2">
        <span className="font-mono text-[11px] text-gray-600">{priceId}</span>
        <CopyBtn value={priceId} />
      </td>
      <td className="py-2 pl-4">
        <span className="font-mono text-[10px] text-gray-400">{productId}</span>
      </td>
    </tr>
  )
}

// ── Step components ───────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0e1a7a] transition-colors'
const checkCls = 'w-4 h-4 accent-[#0e1a7a] cursor-pointer'

// ── Main page ─────────────────────────────────────────────────────────────────
export default function MmapAdminPage() {
  const [auth, setAuth]     = useState(false)
  const [adminPw, setAdminPw] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState<string | null>(null)

  const [enrollment, setEnrollment] = useState<EnrollmentRecord | null>(null)
  const [history, setHistory] = useState<EnrollmentRecord[]>([])
  const [showRef, setShowRef] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  // Restore session + draft
  useEffect(() => {
    const saved = localStorage.getItem('adminPw')
    if (saved) { setAdminPw(saved); setAuth(true) }
    try {
      const draft = localStorage.getItem('mmap_enrollment_draft')
      if (draft) setEnrollment(JSON.parse(draft))
      const hist = localStorage.getItem('mmap_enrollment_history')
      if (hist) setHistory(JSON.parse(hist))
    } catch { /* ignore corrupt data */ }
  }, [])

  const save = useCallback((updated: EnrollmentRecord) => {
    setEnrollment(updated)
    localStorage.setItem('mmap_enrollment_draft', JSON.stringify(updated))
  }, [])

  const upd = useCallback((patch: Partial<EnrollmentRecord>) => {
    setEnrollment(prev => {
      if (!prev) return prev
      const next = { ...prev, ...patch }
      localStorage.setItem('mmap_enrollment_draft', JSON.stringify(next))
      return next
    })
  }, [])

  function startNew() {
    const blank = BLANK_ENROLLMENT()
    save(blank)
  }

  function completeEnrollment() {
    if (!enrollment) return
    const completed = { ...enrollment, completedAt: new Date().toISOString(), step: 7 }
    const newHistory = [completed, ...history]
    setHistory(newHistory)
    localStorage.setItem('mmap_enrollment_history', JSON.stringify(newHistory))
    localStorage.removeItem('mmap_enrollment_draft')
    setEnrollment(null)
  }

  function discardDraft() {
    if (!confirm('Discard this enrollment draft? This cannot be undone.')) return
    localStorage.removeItem('mmap_enrollment_draft')
    setEnrollment(null)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setPwError(null)
    const res = await fetch('/api/admin/jobs', { headers: { 'x-admin-password': pwInput } })
    if (res.status === 401) { setPwError('Incorrect password.'); return }
    localStorage.setItem('adminPw', pwInput)
    setAdminPw(pwInput)
    setAuth(true)
  }

  const monthly = enrollment ? calcMonthly(enrollment.enrollment, enrollment.tier, enrollment.addons) : null
  const tierInfo = enrollment ? STRIPE_CATALOG.tiers.find(t => t.key === enrollment.tier) : null
  const addonInfos = enrollment ? STRIPE_CATALOG.addons.filter(a => enrollment.addons.includes(a.key as AddonKey)) : []

  // ── Login gate ───────────────────────────────────────────────────────────────
  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 text-center">MMAP Admin</p>
          <h1 className="text-xl font-semibold text-gray-900 text-center mb-8">Enrollment Flow</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={pwInput} onChange={e => setPwInput(e.target.value)}
              placeholder="Admin password" autoFocus autoComplete="current-password"
              className={inputCls} />
            {pwError && <p className="text-red-600 text-sm">{pwError}</p>}
            <button type="submit" className="w-full bg-[#0e1a7a] text-white text-sm py-3 tracking-wide hover:bg-[#162270] transition-colors font-medium">
              Enter
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-6">
            <a href="/admin" className="hover:text-gray-600">← Back to Admin</a>
          </p>
        </div>
      </div>
    )
  }

  // ── Dashboard ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Montessori Makers Group</p>
            <h1 className="text-2xl font-semibold text-gray-900">MMAP Enrollment Flow</h1>
            <p className="text-sm text-gray-500 mt-0.5">Guided onboarding for new school subscriptions</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/admin" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">← Admin</a>
            <button onClick={() => { localStorage.removeItem('adminPw'); setAuth(false) }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Sign out
            </button>
          </div>
        </div>

        {/* Stripe Reference Panel */}
        <div className="mb-6 border border-gray-200 bg-white">
          <button onClick={() => setShowRef(v => !v)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d6a758] inline-block" />
              Stripe Price ID Reference
            </span>
            <span className="text-gray-400 text-xs">{showRef ? '▲ hide' : '▼ show'}</span>
          </button>
          {showRef && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 mt-3 mb-4">
                These are the live-mode prices. Use these IDs when creating subscriptions in Stripe. Quantity = enrolled student count.
              </p>
              <div className="mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Base Tiers</p>
                <table className="w-full">
                  <tbody>
                    {STRIPE_CATALOG.tiers.map(t => (
                      <PriceRow key={t.key} label={t.label} priceId={t.priceId} productId={t.productId} rate={t.rate} />
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Add-Ons</p>
                <table className="w-full">
                  <tbody>
                    {STRIPE_CATALOG.addons.map(a => (
                      <PriceRow key={a.key} label={a.label} priceId={a.priceId} productId={a.productId} rate={a.rate} />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                <a href="https://dashboard.stripe.com/customers" target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[#0e1a7a] hover:underline">Stripe Customers →</a>
                <a href="https://dashboard.stripe.com/subscriptions" target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[#0e1a7a] hover:underline">Stripe Subscriptions →</a>
                <a href="https://dashboard.stripe.com/products" target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[#0e1a7a] hover:underline">Stripe Products →</a>
              </div>
            </div>
          )}
        </div>

        {/* Active enrollment or start button */}
        {!enrollment ? (
          <div className="text-center bg-white border border-gray-200 py-16 px-6">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-3">No active enrollment</p>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to onboard a new school?</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
              This flow walks you through every step — from their interest form through Stripe activation. It takes about 20–30 minutes end to end.
            </p>
            <button onClick={startNew}
              className="bg-[#0e1a7a] text-white text-sm px-10 py-3.5 hover:bg-[#162270] transition-colors font-medium tracking-wide">
              Start New Enrollment →
            </button>
          </div>
        ) : (
          <div>
            {/* Progress bar */}
            <div className="bg-white border border-gray-200 p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Active enrollment</p>
                  <p className="text-base font-semibold text-gray-900 mt-0.5">
                    {enrollment.schoolName || 'New School'}{' '}
                    {monthly !== null && (
                      <span className="text-[#0e1a7a] font-normal text-sm">
                        — ${monthly.toLocaleString()}/mo · ${(monthly * 12).toLocaleString()}/yr
                      </span>
                    )}
                  </p>
                </div>
                <button onClick={discardDraft} className="text-xs text-red-400 hover:text-red-600 transition-colors">
                  Discard
                </button>
              </div>
              {/* Step dots */}
              <div className="flex items-center gap-0">
                {STEP_LABELS.map((label, i) => {
                  const stepNum = i + 1
                  const done = enrollment.step > stepNum
                  const active = enrollment.step === stepNum
                  return (
                    <div key={stepNum} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                          done    ? 'bg-green-500 text-white' :
                          active  ? 'bg-[#0e1a7a] text-white' :
                                    'bg-gray-100 text-gray-400'
                        }`}>
                          {done ? '✓' : stepNum}
                        </div>
                        <span className={`text-[9px] mt-1 text-center leading-tight ${active ? 'text-[#0e1a7a] font-semibold' : 'text-gray-400'}`}>
                          {label}
                        </span>
                      </div>
                      {i < STEP_LABELS.length - 1 && (
                        <div className={`h-0.5 w-full mx-1 mt-[-16px] ${done ? 'bg-green-400' : 'bg-gray-100'}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Step content */}
            <div className="bg-white border border-gray-200 p-6">

              {/* ── STEP 1: School Details ────────────────────────────────── */}
              {enrollment.step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Step 1 — School Details</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Enter the school information from the interest form.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="School Name">
                      <input className={inputCls} value={enrollment.schoolName} onChange={e => upd({ schoolName: e.target.value })} placeholder="Sunrise Montessori" />
                    </Field>
                    <Field label="Contact Name">
                      <input className={inputCls} value={enrollment.contactName} onChange={e => upd({ contactName: e.target.value })} placeholder="Jane Smith" />
                    </Field>
                    <Field label="Contact Email">
                      <input className={inputCls} type="email" value={enrollment.contactEmail} onChange={e => upd({ contactEmail: e.target.value })} placeholder="jane@school.org" />
                    </Field>
                    <Field label="Enrolled Students">
                      <input className={inputCls} type="number" min="1" value={enrollment.enrollment} onChange={e => upd({ enrollment: e.target.value })} placeholder="120" />
                    </Field>
                  </div>
                  <Field label="Subscription Tier">
                    <div className="grid grid-cols-4 gap-2">
                      {STRIPE_CATALOG.tiers.map(t => (
                        <button key={t.key} onClick={() => upd({ tier: t.key as TierKey })}
                          className={`border px-3 py-3 text-sm font-medium transition-colors text-left ${
                            enrollment.tier === t.key
                              ? 'border-[#0e1a7a] bg-[#0e1a7a] text-white'
                              : 'border-gray-200 text-gray-700 hover:border-gray-400'
                          }`}>
                          <div>{t.label}</div>
                          <div className={`text-[11px] mt-0.5 ${enrollment.tier === t.key ? 'text-white/70' : 'text-gray-400'}`}>${t.rate}/student</div>
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Add-Ons">
                    <div className="flex gap-4 flex-wrap">
                      {STRIPE_CATALOG.addons.map(a => (
                        <label key={a.key} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className={checkCls} checked={enrollment.addons.includes(a.key as AddonKey)}
                            onChange={e => {
                              const next = e.target.checked
                                ? [...enrollment.addons, a.key as AddonKey]
                                : enrollment.addons.filter(k => k !== a.key)
                              upd({ addons: next })
                            }} />
                          <span className="text-sm text-gray-700">{a.label} <span className="text-gray-400">(+${a.rate}/student)</span></span>
                        </label>
                      ))}
                    </div>
                  </Field>
                  <Field label="Implementation Fee">
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" className={checkCls} checked={!enrollment.pilotWaived} onChange={() => upd({ pilotWaived: false })} />
                        <span className="text-sm text-gray-700">Charge $2,500</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" className={checkCls} checked={enrollment.pilotWaived} onChange={() => upd({ pilotWaived: true })} />
                        <span className="text-sm text-gray-700">Waive (pilot school)</span>
                      </label>
                    </div>
                  </Field>
                  <Field label="Notes from Interest Form">
                    <textarea className={inputCls} rows={3} value={enrollment.notes} onChange={e => upd({ notes: e.target.value })} placeholder="Any context from their submission..." />
                  </Field>

                  {/* Cost summary */}
                  {monthly !== null && tierInfo && (
                    <div className="bg-[#f8f7f4] border border-[#e2ddd6] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8a6014] mb-2">Cost Summary</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{tierInfo.label} × {enrollment.enrollment} students</span>
                          <span className="text-gray-700">${(tierInfo.rate * parseInt(enrollment.enrollment || '0')).toLocaleString()}/mo</span>
                        </div>
                        {addonInfos.map(a => (
                          <div key={a.key} className="flex justify-between">
                            <span className="text-gray-600">{a.label} × {enrollment.enrollment} students</span>
                            <span className="text-gray-700">${(a.rate * parseInt(enrollment.enrollment || '0')).toLocaleString()}/mo</span>
                          </div>
                        ))}
                        {!enrollment.pilotWaived && (
                          <div className="flex justify-between text-gray-500">
                            <span>Implementation fee (one-time)</span>
                            <span>$2,500</span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-2 mt-2">
                          <span>Monthly subscription</span>
                          <span>${monthly.toLocaleString()}/mo</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-xs">
                          <span>Annual commitment</span>
                          <span>${(monthly * 12).toLocaleString()}/yr</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => upd({ step: 2 })}
                      disabled={!enrollment.schoolName || !enrollment.contactName || !enrollment.contactEmail || !enrollment.enrollment || !enrollment.tier}
                      className="bg-[#0e1a7a] text-white text-sm px-8 py-3 hover:bg-[#162270] transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                      Continue to Step 2 →
                    </button>
                    <p className="text-xs text-gray-400 mt-2">All fields required except Notes</p>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Onboarding Call ───────────────────────────────── */}
              {enrollment.step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Step 2 — Onboarding Call</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Schedule and complete the setup call with {enrollment.schoolName}.</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-800">
                    Contact: <strong>{enrollment.contactName}</strong> — <a href={`mailto:${enrollment.contactEmail}`} className="underline">{enrollment.contactEmail}</a>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className={`${checkCls} mt-0.5`} checked={enrollment.callScheduled} onChange={e => upd({ callScheduled: e.target.checked })} />
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700 cursor-pointer">Call scheduled</label>
                        {enrollment.callScheduled && (
                          <input type="date" className={`${inputCls} mt-2 max-w-xs`} value={enrollment.callDate} onChange={e => upd({ callDate: e.target.value })} />
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className={`${checkCls} mt-0.5`} checked={enrollment.callCompleted} onChange={e => upd({ callCompleted: e.target.checked })} />
                      <label className="text-sm font-medium text-gray-700 cursor-pointer">Call completed</label>
                    </div>
                  </div>

                  <Field label="Call Notes">
                    <textarea className={inputCls} rows={3} value={enrollment.callNotes} onChange={e => upd({ callNotes: e.target.value })}
                      placeholder="What came up? Any configuration notes, special needs, concerns..." />
                  </Field>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => upd({ step: 1 })} className="text-sm border border-gray-200 text-gray-500 px-5 py-2.5 hover:border-gray-400 transition-colors">← Back</button>
                    <button onClick={() => upd({ step: 3 })} disabled={!enrollment.callCompleted}
                      className="bg-[#0e1a7a] text-white text-sm px-8 py-2.5 hover:bg-[#162270] transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                      Continue to Step 3 →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Subscription Agreement ───────────────────────── */}
              {enrollment.step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Step 3 — Subscription Agreement</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Send and collect the signed MMAP Subscription Agreement.</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 space-y-1">
                    <p className="font-medium">Before sending, fill in the Subscription Details section:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-amber-700">
                      <li>Effective Date</li>
                      <li>Subscription Tier: <strong>{tierInfo?.label ?? '—'}</strong></li>
                      <li>Enrolled Students: <strong>{enrollment.enrollment}</strong></li>
                      <li>Monthly Fee: <strong>{monthly !== null ? `$${monthly.toLocaleString()}/mo` : '—'}</strong></li>
                      <li>Annual Commitment: <strong>{monthly !== null ? `$${(monthly * 12).toLocaleString()}/yr` : '—'}</strong></li>
                      <li>Add-Ons: <strong>{addonInfos.length > 0 ? addonInfos.map(a => a.label).join(', ') : 'None'}</strong></li>
                      <li>Implementation Fee: <strong>{enrollment.pilotWaived ? 'Waived (pilot)' : '$2,500 — charged'}</strong></li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <a href="https://app.hellosign.com" target="_blank" rel="noopener noreferrer"
                      className="text-xs border border-[#0e1a7a] text-[#0e1a7a] px-4 py-2 hover:bg-[#0e1a7a] hover:text-white transition-colors">
                      Open Dropbox Sign →
                    </a>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className={`${checkCls} mt-0.5`} checked={enrollment.agreementSent} onChange={e => upd({ agreementSent: e.target.checked })} />
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700 cursor-pointer">Agreement sent to {enrollment.contactName}</label>
                        {enrollment.agreementSent && (
                          <div className="mt-2 flex items-center gap-2">
                            <input type="date" className={`${inputCls} max-w-xs`} value={enrollment.agreementSentDate} onChange={e => upd({ agreementSentDate: e.target.value })} />
                            <span className="text-xs text-gray-400">date sent</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className={`${checkCls} mt-0.5`} checked={enrollment.agreementSigned} onChange={e => upd({ agreementSigned: e.target.checked })} />
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700 cursor-pointer">Agreement signed and returned</label>
                        {enrollment.agreementSigned && (
                          <div className="mt-2 flex items-center gap-2">
                            <input type="date" className={`${inputCls} max-w-xs`} value={enrollment.agreementSignedDate} onChange={e => upd({ agreementSignedDate: e.target.value })} />
                            <span className="text-xs text-gray-400">date signed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => upd({ step: 2 })} className="text-sm border border-gray-200 text-gray-500 px-5 py-2.5 hover:border-gray-400 transition-colors">← Back</button>
                    <button onClick={() => upd({ step: 4 })} disabled={!enrollment.agreementSigned}
                      className="bg-[#0e1a7a] text-white text-sm px-8 py-2.5 hover:bg-[#162270] transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                      Continue to Step 4 →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Stripe Customer ───────────────────────────────── */}
              {enrollment.step === 4 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Step 4 — Create Stripe Customer</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Create the customer record in Stripe before building the subscription.</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4 space-y-2 text-sm">
                    <p className="font-semibold text-gray-700">Use these values when creating the customer:</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                      <div><span className="text-gray-400">Name</span><span className="ml-2 font-medium text-gray-700">{enrollment.schoolName}</span></div>
                      <div><span className="text-gray-400">Email</span><span className="ml-2 font-medium text-gray-700">{enrollment.contactEmail}</span></div>
                    </div>
                    <p className="text-xs text-gray-400 pt-1">In the Description or Metadata field, note: contact name ({enrollment.contactName}), enrollment ({enrollment.enrollment} students), tier ({tierInfo?.label}).</p>
                  </div>

                  <a href="https://dashboard.stripe.com/customers/create" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-[#635BFF] text-white text-sm px-6 py-2.5 hover:bg-[#5a53e6] transition-colors font-medium">
                    Create Customer in Stripe →
                  </a>

                  <Field label="Stripe Customer ID (paste after creating)">
                    <input className={inputCls} value={enrollment.stripeCustomerId} onChange={e => upd({ stripeCustomerId: e.target.value })}
                      placeholder="cus_XXXXXXXXXXXXXXXX" />
                    <p className="text-xs text-gray-400 mt-1">Found in the URL: dashboard.stripe.com/customers/<strong>cus_...</strong></p>
                  </Field>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => upd({ step: 3 })} className="text-sm border border-gray-200 text-gray-500 px-5 py-2.5 hover:border-gray-400 transition-colors">← Back</button>
                    <button onClick={() => upd({ step: 5 })} disabled={!enrollment.stripeCustomerId.startsWith('cus_')}
                      className="bg-[#0e1a7a] text-white text-sm px-8 py-2.5 hover:bg-[#162270] transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                      Continue to Step 5 →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 5: Stripe Subscription ──────────────────────────── */}
              {enrollment.step === 5 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Step 5 — Create Stripe Subscription</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Build the subscription with the exact prices and quantities below.</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Subscription Line Items</p>
                    <p className="text-xs text-gray-400">Customer: <span className="font-mono">{enrollment.stripeCustomerId}</span> <CopyBtn value={enrollment.stripeCustomerId} /></p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left pb-2 text-[10px] uppercase tracking-wider text-gray-400 font-medium">Item</th>
                          <th className="text-left pb-2 text-[10px] uppercase tracking-wider text-gray-400 font-medium">Price ID</th>
                          <th className="text-right pb-2 text-[10px] uppercase tracking-wider text-gray-400 font-medium">Qty</th>
                          <th className="text-right pb-2 text-[10px] uppercase tracking-wider text-gray-400 font-medium">Monthly</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tierInfo && (
                          <tr className="border-b border-gray-100">
                            <td className="py-2 text-gray-700 font-medium">{tierInfo.label}</td>
                            <td className="py-2">
                              <span className="font-mono text-xs text-gray-600">{tierInfo.priceId}</span>
                              <CopyBtn value={tierInfo.priceId} />
                            </td>
                            <td className="py-2 text-right text-gray-700">{enrollment.enrollment}</td>
                            <td className="py-2 text-right text-gray-700">${(tierInfo.rate * parseInt(enrollment.enrollment || '0')).toLocaleString()}</td>
                          </tr>
                        )}
                        {addonInfos.map(a => (
                          <tr key={a.key} className="border-b border-gray-100">
                            <td className="py-2 text-gray-600">{a.label}</td>
                            <td className="py-2">
                              <span className="font-mono text-xs text-gray-500">{a.priceId}</span>
                              <CopyBtn value={a.priceId} />
                            </td>
                            <td className="py-2 text-right text-gray-600">{enrollment.enrollment}</td>
                            <td className="py-2 text-right text-gray-600">${(a.rate * parseInt(enrollment.enrollment || '0')).toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={3} className="pt-3 text-right text-xs font-semibold text-gray-700">Total monthly</td>
                          <td className="pt-3 text-right font-bold text-gray-900">${monthly?.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 space-y-1">
                    <p className="font-medium">In Stripe — create the subscription:</p>
                    <ol className="list-decimal list-inside space-y-0.5 text-amber-700 text-xs">
                      <li>Go to Customer → <span className="font-mono">{enrollment.stripeCustomerId}</span> → Create subscription</li>
                      <li>Add each line item above by Price ID with quantity = {enrollment.enrollment}</li>
                      <li>Set billing cycle: monthly, starts today</li>
                      <li>Enable automatic invoice collection</li>
                      {!enrollment.pilotWaived && <li>Add a one-time invoice item: Implementation Fee — $2,500</li>}
                    </ol>
                  </div>

                  <a href={`https://dashboard.stripe.com/customers/${enrollment.stripeCustomerId}/subscriptions/create`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-[#635BFF] text-white text-sm px-6 py-2.5 hover:bg-[#5a53e6] transition-colors font-medium">
                    Create Subscription in Stripe →
                  </a>

                  <div className="space-y-3">
                    <Field label="Stripe Subscription ID (paste after creating)">
                      <input className={inputCls} value={enrollment.stripeSubscriptionId} onChange={e => upd({ stripeSubscriptionId: e.target.value })}
                        placeholder="sub_XXXXXXXXXXXXXXXX" />
                    </Field>
                    {!enrollment.pilotWaived && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className={checkCls} checked={enrollment.implFeePaid} onChange={e => upd({ implFeePaid: e.target.checked })} />
                        <span className="text-sm text-gray-700">Implementation fee ($2,500) invoice created and sent</span>
                      </label>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => upd({ step: 4 })} className="text-sm border border-gray-200 text-gray-500 px-5 py-2.5 hover:border-gray-400 transition-colors">← Back</button>
                    <button onClick={() => upd({ step: 6 })}
                      disabled={!enrollment.stripeSubscriptionId.startsWith('sub_') || (!enrollment.pilotWaived && !enrollment.implFeePaid)}
                      className="bg-[#0e1a7a] text-white text-sm px-8 py-2.5 hover:bg-[#162270] transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                      Continue to Step 6 →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 6: Go Live ───────────────────────────────────────── */}
              {enrollment.step === 6 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">Step 6 — Go Live</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Final activation checklist before marking this enrollment complete.</p>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">Enrollment Summary</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                      <div><span className="text-gray-500">School</span> <span className="font-medium text-gray-800">{enrollment.schoolName}</span></div>
                      <div><span className="text-gray-500">Contact</span> <span className="font-medium text-gray-800">{enrollment.contactName}</span></div>
                      <div><span className="text-gray-500">Students</span> <span className="font-medium text-gray-800">{enrollment.enrollment}</span></div>
                      <div><span className="text-gray-500">Tier</span> <span className="font-medium text-gray-800">{tierInfo?.label}</span></div>
                      <div><span className="text-gray-500">Monthly</span> <span className="font-medium text-gray-800">${monthly?.toLocaleString()}/mo</span></div>
                      <div><span className="text-gray-500">Annual</span> <span className="font-medium text-gray-800">${monthly !== null ? (monthly * 12).toLocaleString() : '—'}/yr</span></div>
                      <div><span className="text-gray-500">Customer</span> <span className="font-mono text-xs text-gray-700">{enrollment.stripeCustomerId}</span></div>
                      <div><span className="text-gray-500">Subscription</span> <span className="font-mono text-xs text-gray-700">{enrollment.stripeSubscriptionId}</span></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className={checkCls} checked={enrollment.platformActivated} onChange={e => upd({ platformActivated: e.target.checked })} />
                      <span className="text-sm text-gray-700">MMAP account created and platform activated for {enrollment.schoolName}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className={checkCls} checked={enrollment.welcomeEmailSent} onChange={e => upd({ welcomeEmailSent: e.target.checked })} />
                      <span className="text-sm text-gray-700">Welcome email sent to {enrollment.contactName} at {enrollment.contactEmail}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className={checkCls} checked={enrollment.addedToTracking} onChange={e => upd({ addedToTracking: e.target.checked })} />
                      <span className="text-sm text-gray-700">School added to pilot cohort tracking sheet</span>
                    </label>
                  </div>

                  <Field label="Go-Live Notes">
                    <textarea className={inputCls} rows={3} value={enrollment.goLiveNotes} onChange={e => upd({ goLiveNotes: e.target.value })}
                      placeholder="Anything to remember for ongoing support — configuration notes, commitments made, follow-up needed..." />
                  </Field>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => upd({ step: 5 })} className="text-sm border border-gray-200 text-gray-500 px-5 py-2.5 hover:border-gray-400 transition-colors">← Back</button>
                    <button
                      onClick={completeEnrollment}
                      disabled={!enrollment.platformActivated || !enrollment.welcomeEmailSent || !enrollment.addedToTracking}
                      className="bg-green-600 text-white text-sm px-8 py-2.5 hover:bg-green-700 transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                      ✓ Mark Enrollment Complete
                    </button>
                  </div>
                  {(!enrollment.platformActivated || !enrollment.welcomeEmailSent || !enrollment.addedToTracking) && (
                    <p className="text-xs text-gray-400">Check all three boxes to complete the enrollment.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enrollment History */}
        {history.length > 0 && (
          <div className="mt-8">
            <button onClick={() => setShowHistory(v => !v)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-3">
              <span>Completed Enrollments ({history.length})</span>
              <span className="text-gray-400 text-xs">{showHistory ? '▲' : '▼'}</span>
            </button>
            {showHistory && (
              <div className="space-y-2">
                {history.map(h => {
                  const hMonthly = calcMonthly(h.enrollment, h.tier, h.addons)
                  return (
                    <div key={h.id} className="bg-white border border-gray-200 px-5 py-4 flex items-start justify-between gap-6">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{h.schoolName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {h.contactName} · {h.enrollment} students · {STRIPE_CATALOG.tiers.find(t => t.key === h.tier)?.label}
                          {h.addons.length > 0 && ` + ${h.addons.length} add-on${h.addons.length > 1 ? 's' : ''}`}
                        </p>
                        <p className="text-[11px] font-mono text-gray-400 mt-1">
                          {h.stripeCustomerId} · {h.stripeSubscriptionId}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {hMonthly !== null && (
                          <p className="text-sm font-medium text-[#0e1a7a]">${hMonthly.toLocaleString()}/mo</p>
                        )}
                        <p className="text-xs text-gray-400 mt-0.5">Completed {fmt(h.completedAt ?? '')}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

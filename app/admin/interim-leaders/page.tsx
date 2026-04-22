'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

interface ILProfile {
  id: string
  submitted_at: string
  status: string
  full_name: string | null
  email: string | null
  phone: string | null
  location: string | null
  current_position: string | null
  years_in_montessori: string | null
  credentials: string | null
  levels_taught: string[] | null
  school_types: string[] | null
  resume_url: string | null
  leadership_roles: string | null
  board_experience: string | null
  hard_decision: string | null
  staff_management: string | null
  financial_responsibility: string | null
  purpose_of_interim: string | null
  entering_unknown_community: string | null
  equity_in_practice: string | null
  least_equipped: string | null
  scenario_a_level: string | null
  scenario_a_description: string | null
  scenario_b_level: string | null
  scenario_b_description: string | null
  scenario_c_level: string | null
  scenario_c_description: string | null
  scenario_d_level: string | null
  scenario_d_description: string | null
  availability: string | null
  regions: string[] | null
  engagement_length: string | null
  constraints: string | null
  compensation: string | null
  reference_1_name: string | null
  reference_1_role: string | null
  reference_1_relationship: string | null
  reference_1_contact: string | null
  reference_2_name: string | null
  reference_2_role: string | null
  reference_2_relationship: string | null
  reference_2_contact: string | null
  open_field: string | null
}

const STATUS_OPTIONS = [
  { value: 'new',        label: 'New' },
  { value: 'in_review',  label: 'In Review' },
  { value: 'active',     label: 'Active' },
  { value: 'placed',     label: 'Placed' },
  { value: 'not_a_fit',  label: 'Not a Fit' },
]

const STATUS_STYLE: Record<string, string> = {
  new:        'bg-blue-50 text-blue-700 border-blue-200',
  in_review:  'bg-yellow-50 text-yellow-700 border-yellow-200',
  active:     'bg-green-50 text-green-700 border-green-200',
  placed:     'bg-purple-50 text-purple-700 border-purple-200',
  not_a_fit:  'bg-gray-100 text-gray-500 border-gray-200',
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmt(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function tags(arr: string[] | null) {
  if (!arr || arr.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {arr.map(v => (
        <span key={v} className="text-[10px] bg-[#f5e8cc] text-[#8A6014] border border-[#d6a758]/40 px-2 py-0.5">
          {v}
        </span>
      ))}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="py-3 border-b border-[#E2DDD6] last:border-0">
      <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-1">{label}</p>
      <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap">{value}</p>
    </div>
  )
}

function ScenarioBlock({ label, level, description }: { label: string; level: string | null; description: string | null }) {
  if (!level && !description) return null
  return (
    <div className="border border-[#E2DDD6] mb-3 overflow-hidden">
      <div className="px-4 py-2 bg-[#f5e8cc] border-b border-[#E2DDD6]">
        <span className="text-[10px] font-bold text-[#8A6014] uppercase tracking-[0.12em]">{label}</span>
        {level && <span className="ml-3 text-[10px] text-[#8A6014]">· {level}</span>}
      </div>
      {description && <p className="px-4 py-3 text-sm text-[#374151] leading-relaxed whitespace-pre-wrap">{description}</p>}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function InterimLeadersAdminPage() {
  const ADMIN_EMAIL = 'hannah@montessorimakers.org'

  const [auth, setAuth] = useState(false)
  const [adminPw, setAdminPw] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState<string | null>(null)

  const [profiles, setProfiles] = useState<ILProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<ILProfile | null>(null)
  const [savingStatus, setSavingStatus] = useState<string | null>(null)

  // Restore session
  useEffect(() => {
    const saved = localStorage.getItem('adminPw')
    if (saved) { setAdminPw(saved); setAuth(true) }
  }, [])

  const loadProfiles = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/interim-leaders', {
        headers: { 'x-admin-password': password },
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      const data = await res.json()
      setProfiles(data.profiles ?? [])
    } catch {
      setError('Failed to load profiles.')
    } finally {
      setLoading(false)
    }
  }, [adminPw])

  useEffect(() => {
    if (auth) loadProfiles()
  }, [auth, loadProfiles])

  // If the profile detail is open, keep it in sync with the profiles list
  useEffect(() => {
    if (selected) {
      const updated = profiles.find(p => p.id === selected.id)
      if (updated) setSelected(updated)
    }
  }, [profiles]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleExpired() {
    setAuth(false)
    localStorage.removeItem('adminPw')
    setError('Session expired — please log in again.')
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setPwError(null)
    if (emailInput.trim().toLowerCase() !== ADMIN_EMAIL) {
      setPwError('Unrecognized email address.')
      return
    }
    const res = await fetch('/api/admin/interim-leaders', {
      headers: { 'x-admin-password': pwInput },
    })
    if (res.status === 401) { setPwError('Incorrect password.'); return }
    const data = await res.json()
    localStorage.setItem('adminPw', pwInput)
    setAdminPw(pwInput)
    setAuth(true)
    setProfiles(data.profiles ?? [])
  }

  async function handleStatusChange(id: string, status: string) {
    setSavingStatus(id)
    try {
      const res = await fetch(`/api/admin/interim-leaders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({ status }),
      })
      if (res.status === 401) { handleExpired(); return }
      if (!res.ok) throw new Error()
      setProfiles(prev => prev.map(p => p.id === id ? { ...p, status } : p))
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : prev)
    } catch {
      setError('Could not update status.')
    } finally {
      setSavingStatus(null)
    }
  }

  // ── Login gate ───────────────────────────────────────────────────────────────

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 text-center">
            Montessori Makers Group
          </p>
          <h1 className="text-xl font-semibold text-gray-900 text-center mb-8">
            Interim Leaders · Admin
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder="Email address"
              autoFocus
              autoComplete="email"
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e1a7a] transition-colors"
            />
            <input
              type="password"
              value={pwInput}
              onChange={e => setPwInput(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#0e1a7a] transition-colors"
            />
            {pwError && <p className="text-red-600 text-sm">{pwError}</p>}
            <button type="submit" className="w-full bg-[#0e1a7a] text-white text-sm py-3 tracking-wide hover:bg-[#162270] transition-colors font-medium">
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Detail panel ─────────────────────────────────────────────────────────────

  if (selected) {
    const p = selected
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-10">
          {/* Back + header */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <button onClick={() => setSelected(null)} className="text-xs text-[#0e1a7a] hover:underline mb-3 flex items-center gap-1">
                ← Back to list
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">{p.full_name ?? 'Unknown'}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{p.email} · submitted {fmt(p.submitted_at)}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              {p.resume_url && (
                <a href={p.resume_url} target="_blank" rel="noopener noreferrer"
                   className="text-xs bg-[#0e1a7a] text-white px-4 py-2 hover:bg-[#162270] transition-colors">
                  Download Resume ↗
                </a>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                <select
                  value={p.status}
                  disabled={savingStatus === p.id}
                  onChange={e => handleStatusChange(p.id, e.target.value)}
                  className="border border-gray-200 text-sm px-3 py-1.5 focus:outline-none focus:border-[#0e1a7a] bg-white"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Section 1 */}
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[10px] font-bold text-[#8A6014] uppercase tracking-[0.15em] mb-4">Professional Background</p>
              <div className="grid grid-cols-2 gap-x-8">
                <Field label="Location" value={p.location} />
                <Field label="Current / most recent position" value={p.current_position} />
                <Field label="Years in Montessori" value={p.years_in_montessori} />
                <Field label="Credentials" value={p.credentials} />
              </div>
              <div className="py-3 border-b border-[#E2DDD6]">
                <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-1">Levels taught or led</p>
                {tags(p.levels_taught) ?? <p className="text-sm text-[#94A3B8]">—</p>}
              </div>
              <div className="py-3">
                <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-1">School types</p>
                {tags(p.school_types) ?? <p className="text-sm text-[#94A3B8]">—</p>}
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[10px] font-bold text-[#8A6014] uppercase tracking-[0.15em] mb-4">Leadership Experience</p>
              <Field label="Formal leadership roles held" value={p.leadership_roles} />
              <Field label="Board experience" value={p.board_experience} />
              <Field label="Hard decision narrative" value={p.hard_decision} />
              <Field label="Staff management" value={p.staff_management} />
              <Field label="Financial & operational responsibility" value={p.financial_responsibility} />
            </div>

            {/* Section 3 */}
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[10px] font-bold text-[#8A6014] uppercase tracking-[0.15em] mb-4">Philosophy and Approach</p>
              <Field label="Purpose of interim leadership" value={p.purpose_of_interim} />
              <Field label="Entering an unknown school community" value={p.entering_unknown_community} />
              <Field label="Equity in leadership practice" value={p.equity_in_practice} />
              <Field label="Least equipped to handle" value={p.least_equipped} />
            </div>

            {/* Section 4 */}
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[10px] font-bold text-[#8A6014] uppercase tracking-[0.15em] mb-4">Scenario Experience</p>
              <ScenarioBlock label="Scenario A — Abrupt departure, low morale, divided board" level={p.scenario_a_level} description={p.scenario_a_description} />
              <ScenarioBlock label="Scenario B — Mid-accreditation departure, disorganized records" level={p.scenario_b_level} description={p.scenario_b_description} />
              <ScenarioBlock label="Scenario C — Culture erosion, low fidelity, confused families" level={p.scenario_c_level} description={p.scenario_c_description} />
              <ScenarioBlock label="Scenario D — Board overreach, previous head never pushed back" level={p.scenario_d_level} description={p.scenario_d_description} />
            </div>

            {/* Section 5 */}
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[10px] font-bold text-[#8A6014] uppercase tracking-[0.15em] mb-4">Availability and Logistics</p>
              <div className="grid grid-cols-2 gap-x-8">
                <Field label="On-site availability" value={p.availability} />
                <Field label="Engagement length" value={p.engagement_length} />
              </div>
              <div className="py-3 border-b border-[#E2DDD6]">
                <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-1">Regions</p>
                {tags(p.regions) ?? <p className="text-sm text-[#94A3B8]">—</p>}
              </div>
              <Field label="Constraints or considerations" value={p.constraints} />
              <Field label="Compensation expectations" value={p.compensation} />
            </div>

            {/* Section 6 */}
            <div className="bg-white border border-[#E2DDD6] p-6">
              <p className="text-[10px] font-bold text-[#8A6014] uppercase tracking-[0.15em] mb-4">References</p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-3">Reference 1</p>
                  <Field label="Name" value={p.reference_1_name} />
                  <Field label="Role" value={p.reference_1_role} />
                  <Field label="Relationship" value={p.reference_1_relationship} />
                  <Field label="Contact" value={p.reference_1_contact} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-3">Reference 2</p>
                  <Field label="Name" value={p.reference_2_name} />
                  <Field label="Role" value={p.reference_2_role} />
                  <Field label="Relationship" value={p.reference_2_relationship} />
                  <Field label="Contact" value={p.reference_2_contact} />
                </div>
              </div>
            </div>

            {/* Section 7 */}
            {p.open_field && (
              <div className="bg-white border border-[#E2DDD6] p-6">
                <p className="text-[10px] font-bold text-[#8A6014] uppercase tracking-[0.15em] mb-4">Anything else?</p>
                <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap">{p.open_field}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── List view ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Montessori Makers Group</p>
            <h1 className="text-2xl font-semibold text-gray-900">Interim Leader Profiles</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => loadProfiles()} className="text-xs text-gray-400 hover:text-gray-600">↻ Refresh</button>
            <button onClick={() => { localStorage.removeItem('adminPw'); setAuth(false) }} className="text-xs text-gray-400 hover:text-gray-600">Sign out</button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6 flex justify-between">
            {error}
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 ml-4">×</button>
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-400 py-20 text-center">Loading…</p>
        ) : profiles.length === 0 ? (
          <p className="text-sm text-gray-400 py-20 text-center">No submissions yet.</p>
        ) : (
          <div className="bg-white border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Name</th>
                  <th className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Email</th>
                  <th className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Location</th>
                  <th className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Submitted</th>
                  <th className="text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((p, i) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className={`border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">{p.full_name ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{p.email ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{p.location ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{fmt(p.submitted_at)}</td>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                      <select
                        value={p.status}
                        disabled={savingStatus === p.id}
                        onChange={e => handleStatusChange(p.id, e.target.value)}
                        className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-1 border focus:outline-none focus:border-[#0e1a7a] bg-white disabled:opacity-50 ${STATUS_STYLE[p.status] ?? STATUS_STYLE.new}`}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelected(p)}
                        className="text-xs text-[#0e1a7a] hover:underline font-medium"
                      >
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

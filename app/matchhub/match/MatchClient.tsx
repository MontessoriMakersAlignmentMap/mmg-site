'use client'

import { useState } from 'react'

const serif = { fontFamily: 'var(--font-heading)' }

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CRMSearch {
  id: string
  school_name: string
  position_title: string
  position_description: string | null
  credential_required: string | null
  levels_required: string | null
  role_type_required: string | null
  years_experience_min: number | null
  location_city: string | null
  location_state: string | null
  location_flexible: boolean
  languages_required: string | null
  status: string
  compensation_range: string | null
}

export interface CRMCandidate {
  id: string
  full_name: string
  email: string | null
  phone: string | null
  location_city: string | null
  location_state: string | null
  credential: string | null
  levels_certified: string[] | null
  years_experience: number | null
  languages: string[] | null
  role_types: string[] | null
  open_to_role_types: string[] | null
  actively_looking: boolean
  notes: string | null
  linkedin_url: string | null
  resume_url: string | null
}

interface MatchResult {
  candidate: CRMCandidate
  score: number
  reasons: string[]
  gaps: string[]
  tier: 'strong' | 'good' | 'partial' | 'weak'
}

// ── Scoring engine ────────────────────────────────────────────────────────────

function scoreCandidate(candidate: CRMCandidate, search: CRMSearch): MatchResult {
  let score = 0
  const reasons: string[] = []
  const gaps: string[] = []

  // Actively looking bonus
  if (candidate.actively_looking) {
    score += 5
    reasons.push('Actively looking')
  }

  // Level match (40pts — most important for guide roles)
  const requiredLevels = search.levels_required
    ? search.levels_required.split(',').map((l) => l.trim())
    : []
  const candidateLevels = candidate.levels_certified || []
  if (requiredLevels.length > 0) {
    const levelMatch = requiredLevels.some((l) => candidateLevels.includes(l))
    if (levelMatch) {
      score += 40
      reasons.push(`Certified: ${candidateLevels.join(', ')}`)
    } else {
      gaps.push(`Level needed: ${requiredLevels.join(', ')}`)
    }
  }

  // Role type match (30pts)
  const requiredRole = search.role_type_required
  const candidateOpenTo = candidate.open_to_role_types || []
  if (requiredRole) {
    if (candidateOpenTo.includes(requiredRole)) {
      score += 30
      reasons.push(`Open to: ${requiredRole}`)
    } else {
      gaps.push(`Not open to ${requiredRole}`)
    }
  }

  // Credential match (20pts)
  const reqCred = search.credential_required
  if (reqCred && reqCred !== 'None') {
    const hasCred =
      reqCred === 'Certified'
        ? candidate.credential === 'AMI' || candidate.credential === 'AMS'
        : candidate.credential === reqCred
    if (hasCred) {
      score += 20
      reasons.push(`${candidate.credential} certified`)
    } else {
      gaps.push(
        reqCred === 'Certified' ? 'AMI/AMS credential preferred' : `${reqCred} credential preferred`
      )
    }
  }

  // Experience threshold (10pts)
  const minYears = search.years_experience_min
  if (minYears != null && candidate.years_experience != null) {
    if (candidate.years_experience >= minYears) {
      score += 10
      reasons.push(`${candidate.years_experience} yrs experience`)
    } else {
      gaps.push(`${minYears}+ years preferred`)
    }
  } else if (candidate.years_experience) {
    score += 5
  }

  // Language match (10pts)
  const reqLangs = search.languages_required
    ? search.languages_required.split(',').map((l) => l.trim())
    : []
  if (reqLangs.length > 0 && candidate.languages && candidate.languages.length > 0) {
    const langMatch = reqLangs.some((l) => candidate.languages!.includes(l))
    if (langMatch) {
      score += 10
      reasons.push(`Language match: ${candidate.languages.join(', ')}`)
    } else {
      gaps.push(`Language needed: ${reqLangs.join(', ')}`)
    }
  }

  const tier: MatchResult['tier'] =
    score >= 75 ? 'strong' : score >= 55 ? 'good' : score >= 35 ? 'partial' : 'weak'

  return { candidate, score, reasons, gaps, tier }
}

function buildMatches(candidates: CRMCandidate[], search: CRMSearch): MatchResult[] {
  return candidates
    .map((c) => scoreCandidate(c, search))
    .sort((a, b) => b.score - a.score)
}

// ── Tier badge ────────────────────────────────────────────────────────────────

function TierBadge({ tier }: { tier: MatchResult['tier'] }) {
  const styles = {
    strong: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    good: 'bg-blue-50 text-blue-700 border-blue-200',
    partial: 'bg-amber-50 text-amber-700 border-amber-200',
    weak: 'bg-[#F2EDE6] text-[#64748B] border-[#E2DDD6]',
  }
  const labels = { strong: 'Strong match', good: 'Good match', partial: 'Partial', weak: 'Weak' }
  return (
    <span
      className={`text-[10px] font-semibold tracking-[0.08em] uppercase px-2 py-0.5 border rounded ${styles[tier]}`}
    >
      {labels[tier]}
    </span>
  )
}

// ── Tier border styles ────────────────────────────────────────────────────────

const tierBorder: Record<MatchResult['tier'], string> = {
  strong:  'border-2 border-emerald-400',
  good:    'border-2 border-blue-400',
  partial: 'border-2 border-amber-300',
  weak:    'border-2 border-amber-200',
}

// ── Profile modal ─────────────────────────────────────────────────────────────

function ProfileModal({
  result,
  onClose,
}: {
  result: MatchResult
  onClose: () => void
}) {
  const c = result.candidate
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-8 py-5 border-b-4 flex items-start justify-between gap-4 ${
          result.tier === 'strong' ? 'border-emerald-400' :
          result.tier === 'good'   ? 'border-blue-400'    :
                                     'border-amber-300'
        }`}>
          <div>
            <h3 className="text-[#0e1a7a] font-semibold text-xl" style={serif}>{c.full_name}</h3>
            <p className="text-[#64748B] text-sm mt-1">
              {[
                c.location_city && c.location_state ? `${c.location_city}, ${c.location_state}` : c.location_state || null,
                c.credential && c.credential !== 'None' ? c.credential : null,
                c.years_experience != null ? `${c.years_experience} yrs experience` : null,
              ].filter(Boolean).join(' · ')}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#0e1a7a] text-xs font-semibold">{result.score}pts</span>
              <TierBadge tier={result.tier} />
              {c.actively_looking && (
                <span className="text-emerald-700 text-xs">✓ Actively looking</span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-[#374151] text-xl leading-none flex-shrink-0">✕</button>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Levels + roles */}
          {((c.levels_certified?.length ?? 0) > 0 || (c.open_to_role_types?.length ?? 0) > 0) && (
            <div>
              <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-2">Levels &amp; Role Types</p>
              <div className="flex flex-wrap gap-1.5">
                {(c.levels_certified || []).map((l) => (
                  <span key={l} className="text-xs bg-[#F2EDE6] text-[#374151] px-2.5 py-1 rounded">{l}</span>
                ))}
                {(c.open_to_role_types || []).map((r) => (
                  <span key={r} className="text-xs bg-[#EEF2FF] text-[#3730A3] px-2.5 py-1 rounded">{r}</span>
                ))}
              </div>
            </div>
          )}

          {/* Match reasons + gaps */}
          {(result.reasons.length > 0 || result.gaps.length > 0) && (
            <div className="grid grid-cols-2 gap-4">
              {result.reasons.length > 0 && (
                <div>
                  <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-2">Match</p>
                  <div className="space-y-1 text-emerald-700 text-xs">
                    {result.reasons.map((r) => <div key={r} className="flex items-center gap-1"><span>✓</span><span>{r}</span></div>)}
                  </div>
                </div>
              )}
              {result.gaps.length > 0 && (
                <div>
                  <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-2">Gaps</p>
                  <div className="space-y-1 text-amber-700 text-xs">
                    {result.gaps.map((g) => <div key={g} className="flex items-center gap-1"><span>—</span><span>{g}</span></div>)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Languages */}
          {(c.languages?.length ?? 0) > 0 && (
            <div>
              <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-2">Languages</p>
              <p className="text-[#374151] text-sm">{c.languages!.join(', ')}</p>
            </div>
          )}

          {/* Contact */}
          {(c.email || c.phone) && (
            <div>
              <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-2">Contact</p>
              <div className="space-y-1 text-sm">
                {c.email && <p className="text-[#374151]">{c.email}</p>}
                {c.phone && <p className="text-[#374151]">{c.phone}</p>}
              </div>
            </div>
          )}

          {/* Notes */}
          {c.notes && (
            <div>
              <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-2">Notes</p>
              <p className="text-[#374151] text-sm leading-relaxed whitespace-pre-wrap">{c.notes}</p>
            </div>
          )}

          {/* External links */}
          <div className="flex gap-4 pt-2 border-t border-[#E2DDD6]">
            {c.linkedin_url && (
              <a href={c.linkedin_url} target="_blank" rel="noopener noreferrer"
                className="text-[#0e1a7a] text-sm font-medium hover:underline">LinkedIn →</a>
            )}
            {c.resume_url && (
              <a href={c.resume_url} target="_blank" rel="noopener noreferrer"
                className="text-[#0e1a7a] text-sm font-medium hover:underline">Resume →</a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Email draft modal ─────────────────────────────────────────────────────────

function EmailDraftModal({
  candidate,
  search,
  onClose,
}: {
  candidate: CRMCandidate
  search: CRMSearch
  onClose: () => void
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [draft, setDraft] = useState('')
  const [subject, setSubject] = useState('')
  const [copied, setCopied] = useState(false)

  async function generate() {
    setState('loading')
    try {
      const res = await fetch('/api/matchhub/draft-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate, search }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setDraft(data.draft)
      setSubject(data.subject)
      setState('done')
    } catch {
      setState('error')
    }
  }

  function copyAll() {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${draft}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#E2DDD6]">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.18em] uppercase mb-0.5">
              Outreach draft
            </p>
            <h3 className="text-[#0e1a7a] font-semibold text-lg" style={serif}>
              {candidate.full_name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#374151] text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="px-8 py-6">
          {state === 'idle' && (
            <div className="text-center py-8">
              <p className="text-[#374151] text-sm leading-relaxed mb-6">
                Draft a personalized outreach email to {candidate.full_name} about the{' '}
                <strong>{search.position_title}</strong> role at {search.school_name}.
              </p>
              <button
                onClick={generate}
                className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors"
              >
                Draft email →
              </button>
            </div>
          )}

          {state === 'loading' && (
            <div className="text-center py-12">
              <div className="w-6 h-6 border-2 border-[#0e1a7a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#64748B] text-sm">Writing draft…</p>
            </div>
          )}

          {state === 'error' && (
            <div className="text-center py-8">
              <p className="text-red-500 text-sm mb-4">Something went wrong. Try again.</p>
              <button
                onClick={generate}
                className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-8 py-3 hover:bg-[#0e1a7a] hover:text-white transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {state === 'done' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">
                  Subject
                </label>
                <input
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#0e1a7a] focus:outline-none focus:border-[#0e1a7a]"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">
                  Body
                </label>
                <textarea
                  className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] leading-relaxed focus:outline-none focus:border-[#0e1a7a] resize-none"
                  rows={14}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={copyAll}
                  className="flex-1 bg-[#0e1a7a] text-white text-sm px-6 py-3 tracking-wide hover:bg-[#162270] transition-colors"
                >
                  {copied ? 'Copied ✓' : 'Copy subject + body'}
                </button>
                <button
                  onClick={generate}
                  className="border border-[#E2DDD6] text-[#64748B] text-sm px-6 py-3 hover:border-[#0e1a7a] hover:text-[#0e1a7a] transition-colors"
                >
                  Regenerate
                </button>
              </div>
              {candidate.email && (
                <p className="text-[#94A3B8] text-xs pt-1">
                  Candidate email on file:{' '}
                  <span className="text-[#374151] font-medium">{candidate.email}</span>
                </p>
              )}
              {!candidate.email && (
                <p className="text-amber-600 text-xs pt-1">
                  No email on file — you'll need to look up contact info separately.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Candidate card ────────────────────────────────────────────────────────────

function CandidateCard({
  result,
  search,
  rank,
}: {
  result: MatchResult
  search: CRMSearch
  rank: number
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const c = result.candidate

  return (
    <>
      <div className={`p-5 bg-white transition-colors ${tierBorder[result.tier]}`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-[#94A3B8] text-xs w-5 flex-shrink-0">#{rank}</span>
            <div>
              <h4 className="text-[#0e1a7a] font-semibold text-sm" style={serif}>
                {c.full_name}
              </h4>
              <p className="text-[#64748B] text-xs mt-0.5">
                {c.location_city ? `${c.location_city}, ${c.location_state}` : c.location_state || 'Location unknown'}
                {c.credential && c.credential !== 'None' && ` · ${c.credential}`}
                {c.years_experience != null && ` · ${c.years_experience} yrs`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[#0e1a7a] text-xs font-semibold">{result.score}pts</span>
            <TierBadge tier={result.tier} />
          </div>
        </div>

        {/* Levels + roles */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(c.levels_certified || []).map((l) => (
            <span key={l} className="text-[10px] bg-[#F2EDE6] text-[#374151] px-2 py-0.5 rounded">
              {l}
            </span>
          ))}
          {(c.open_to_role_types || []).map((r) => (
            <span key={r} className="text-[10px] bg-[#EEF2FF] text-[#3730A3] px-2 py-0.5 rounded">
              {r}
            </span>
          ))}
        </div>

        {/* Match reasons + gaps */}
        <div className="flex gap-4 mb-4 text-xs">
          {result.reasons.length > 0 && (
            <div className="text-emerald-700 space-y-0.5">
              {result.reasons.map((r) => (
                <div key={r} className="flex items-center gap-1">
                  <span>✓</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          )}
          {result.gaps.length > 0 && (
            <div className="text-amber-700 space-y-0.5">
              {result.gaps.map((g) => (
                <div key={g} className="flex items-center gap-1">
                  <span>—</span>
                  <span>{g}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setProfileOpen(true)}
            className="text-[#374151] text-xs font-medium border border-[#E2DDD6] px-4 py-2 hover:border-[#0e1a7a] hover:text-[#0e1a7a] transition-colors"
          >
            View Profile
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="text-[#0e1a7a] text-xs font-medium border border-[#0e1a7a]/30 px-4 py-2 hover:bg-[#0e1a7a] hover:text-white transition-colors"
          >
            Draft outreach email
          </button>
          {c.linkedin_url && (
            <a
              href={c.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748B] text-xs hover:text-[#0e1a7a] transition-colors"
            >
              LinkedIn →
            </a>
          )}
          {c.resume_url && (
            <a
              href={c.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64748B] text-xs hover:text-[#0e1a7a] transition-colors"
            >
              Resume →
            </a>
          )}
        </div>
      </div>

      {profileOpen && (
        <ProfileModal
          result={result}
          onClose={() => setProfileOpen(false)}
        />
      )}
      {modalOpen && (
        <EmailDraftModal
          candidate={c}
          search={search}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

// ── Criteria editor ───────────────────────────────────────────────────────────

function CriteriaEditor({
  search,
  onSaved,
}: {
  search: CRMSearch
  onSaved: (updated: CRMSearch) => void
}) {
  const [open, setOpen] = useState(!search.levels_required && !search.role_type_required)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    levels_required: search.levels_required || '',
    role_type_required: search.role_type_required || '',
    credential_required: search.credential_required || '',
    years_experience_min: search.years_experience_min?.toString() || '',
    location_city: search.location_city || '',
    location_state: search.location_state || '',
    location_flexible: search.location_flexible,
    languages_required: search.languages_required || '',
  })

  async function save() {
    setSaving(true)
    try {
      const res = await fetch('/api/matchhub/update-search-criteria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: search.id, ...form, years_experience_min: form.years_experience_min ? parseInt(form.years_experience_min) : null }),
      })
      if (res.ok) {
        onSaved({ ...search, ...form, years_experience_min: form.years_experience_min ? parseInt(form.years_experience_min) : null })
        setOpen(false)
      }
    } finally {
      setSaving(false)
    }
  }

  const LEVELS = ['Infant/Toddler', 'Primary', 'Elementary', 'Adolescent', 'Admin']
  const ROLE_TYPES = ['Lead Guide', 'School Leader', 'Consultant', 'Trainer', 'Specialist', 'Curriculum', 'Admin']
  const CREDS = ['AMI', 'AMS', 'Certified', 'None']

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-[#0e1a7a] text-xs font-medium tracking-wide flex items-center gap-2 hover:opacity-70 transition-opacity"
      >
        <span>{open ? '▲' : '▼'}</span>
        {search.levels_required || search.role_type_required ? 'Edit match criteria' : 'Set match criteria to rank candidates'}
      </button>

      {open && (
        <div className="mt-4 border border-[#E2DDD6] bg-[#FAF9F7] p-6 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">Level required</label>
            <select className="w-full border border-[#E2DDD6] bg-white px-3 py-2 text-sm text-[#374151] focus:outline-none" value={form.levels_required} onChange={(e) => setForm((f) => ({ ...f, levels_required: e.target.value }))}>
              <option value="">Any</option>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">Role type</label>
            <select className="w-full border border-[#E2DDD6] bg-white px-3 py-2 text-sm text-[#374151] focus:outline-none" value={form.role_type_required} onChange={(e) => setForm((f) => ({ ...f, role_type_required: e.target.value }))}>
              <option value="">Any</option>
              {ROLE_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">Credential</label>
            <select className="w-full border border-[#E2DDD6] bg-white px-3 py-2 text-sm text-[#374151] focus:outline-none" value={form.credential_required} onChange={(e) => setForm((f) => ({ ...f, credential_required: e.target.value }))}>
              <option value="">Not required</option>
              {CREDS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">Min years experience</label>
            <input type="number" min="0" className="w-full border border-[#E2DDD6] bg-white px-3 py-2 text-sm text-[#374151] focus:outline-none" value={form.years_experience_min} onChange={(e) => setForm((f) => ({ ...f, years_experience_min: e.target.value }))} placeholder="0" />
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">Location city</label>
            <input className="w-full border border-[#E2DDD6] bg-white px-3 py-2 text-sm text-[#374151] focus:outline-none" value={form.location_city} onChange={(e) => setForm((f) => ({ ...f, location_city: e.target.value }))} placeholder="e.g. Chicago" />
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">Location state</label>
            <input className="w-full border border-[#E2DDD6] bg-white px-3 py-2 text-sm text-[#374151] focus:outline-none" value={form.location_state} onChange={(e) => setForm((f) => ({ ...f, location_state: e.target.value }))} placeholder="e.g. IL" />
          </div>
          <div>
            <label className="block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2">Languages required</label>
            <input className="w-full border border-[#E2DDD6] bg-white px-3 py-2 text-sm text-[#374151] focus:outline-none" value={form.languages_required} onChange={(e) => setForm((f) => ({ ...f, languages_required: e.target.value }))} placeholder="e.g. Spanish" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-[#374151]">
              <input type="checkbox" checked={form.location_flexible} onChange={(e) => setForm((f) => ({ ...f, location_flexible: e.target.checked }))} className="accent-[#0e1a7a]" />
              Location flexible / remote ok
            </label>
          </div>
          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button onClick={save} disabled={saving} className="bg-[#0e1a7a] text-white text-xs px-8 py-3 hover:bg-[#162270] transition-colors disabled:opacity-60">
              {saving ? 'Saving…' : 'Save criteria'}
            </button>
            <button onClick={() => setOpen(false)} className="text-[#64748B] text-xs px-4 py-3 hover:text-[#374151]">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Search panel ──────────────────────────────────────────────────────────────

function SearchPanel({
  initialSearch,
  candidates,
}: {
  initialSearch: CRMSearch
  candidates: CRMCandidate[]
}) {
  const [search, setSearch] = useState(initialSearch)
  const [filter, setFilter] = useState<'all' | 'strong' | 'good'>('all')

  const matches = buildMatches(candidates, search)
  const filtered = filter === 'all' ? matches : matches.filter((m) => m.tier === filter || (filter === 'good' && (m.tier === 'good' || m.tier === 'strong')))
  const strongCount = matches.filter((m) => m.tier === 'strong').length
  const goodCount = matches.filter((m) => m.tier === 'good').length

  return (
    <div className="border border-[#E2DDD6] bg-white">
      <div className="p-8 border-b border-[#E2DDD6]">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-1">{search.school_name}</p>
            <h3 className="text-[#0e1a7a] text-2xl font-semibold" style={serif}>{search.position_title}</h3>
          </div>
          <div className="flex gap-3 text-center flex-shrink-0">
            <div>
              <div className="text-emerald-700 text-xl font-semibold">{strongCount}</div>
              <div className="text-[#64748B] text-[10px] uppercase tracking-wide">Strong</div>
            </div>
            <div>
              <div className="text-blue-700 text-xl font-semibold">{goodCount}</div>
              <div className="text-[#64748B] text-[10px] uppercase tracking-wide">Good</div>
            </div>
            <div>
              <div className="text-[#374151] text-xl font-semibold">{matches.length}</div>
              <div className="text-[#64748B] text-[10px] uppercase tracking-wide">Total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <CriteriaEditor search={search} onSaved={setSearch} />

        <div className="flex gap-2 mb-5">
          {(['all', 'good', 'strong'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-4 py-2 border transition-colors ${filter === f ? 'bg-[#0e1a7a] text-white border-[#0e1a7a]' : 'border-[#E2DDD6] text-[#374151] hover:border-[#0e1a7a]'}`}
            >
              {f === 'all' ? 'All candidates' : f === 'good' ? 'Strong + Good' : 'Strong only'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-[#64748B] text-sm py-4">No candidates match the current filter.</p>
          ) : (
            filtered.map((result, i) => (
              <CandidateCard key={result.candidate.id} result={result} search={search} rank={i + 1} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function MatchClient({
  searches,
  candidates,
}: {
  searches: CRMSearch[]
  candidates: CRMCandidate[]
}) {
  const [activeSearch, setActiveSearch] = useState(searches[0]?.id ?? null)
  const current = searches.find((s) => s.id === activeSearch)

  return (
    <div>
      {/* Search tabs */}
      {searches.length > 1 && (
        <div className="flex gap-1 mb-8 overflow-x-auto">
          {searches.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSearch(s.id)}
              className={`text-sm px-5 py-3 whitespace-nowrap border transition-colors flex-shrink-0 ${activeSearch === s.id ? 'bg-[#0e1a7a] text-white border-[#0e1a7a]' : 'border-[#E2DDD6] text-[#374151] hover:border-[#0e1a7a]'}`}
            >
              {s.position_title}
              <span className="ml-2 text-[10px] opacity-70">{s.school_name}</span>
            </button>
          ))}
        </div>
      )}

      {current && <SearchPanel initialSearch={current} candidates={candidates} />}
    </div>
  )
}

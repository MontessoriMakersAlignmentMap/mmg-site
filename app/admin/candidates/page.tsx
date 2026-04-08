'use client'

import { useEffect, useState, useCallback } from 'react'

type Candidate = {
  id: string
  name: string
  location: string | null
  credential: string | null
  level_experience: string | null
  source: string | null
  open_to_work: boolean
  bio: string | null
  skills: string[] | null
  profile_url: string | null
  search_query: string | null
  discovered_at: string
  outreach_sent: boolean
  notes: string | null
}

type OutreachDrafts = {
  facebook_post: string
  newsletter: string
  twitter_post: string
  training_email: string
}

type ActiveSearchOption = {
  role_id: string
  crm_search_id: string | null
  school_name: string
  role_title: string
  role_description: string | null
  location: string | null
  level: string | null
}

type CRMMatchResult = {
  candidate_id: string
  full_name: string
  overall_score: number
  credential_score: number
  location_score: number
  level_score: number
  role_score: number
  match_summary: string
  contact_priority: 'Immediate' | 'This Week' | 'Pipeline'
  credential: string | null
  location_city: string | null
  location_state: string | null
  actively_looking: boolean
  levels_certified: string[]
}

type CandidateEmail = {
  subject: string
  body: string
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function CandidatesAdminPage() {
  const [auth, setAuth] = useState(false)
  const [adminPw, setAdminPw] = useState('')
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState<string | null>(null)

  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [filterCredential, setFilterCredential] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [filterOpenToWork, setFilterOpenToWork] = useState<'all' | 'yes' | 'no'>('all')
  const [filterOutreach, setFilterOutreach] = useState<'all' | 'sent' | 'not_sent'>('all')

  // Search trigger
  const [searching, setSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<string | null>(null)

  // Outreach modal
  const [outreachOpen, setOutreachOpen] = useState(false)
  const [outreachRole, setOutreachRole] = useState('')
  const [outreachRegion, setOutreachRegion] = useState('')
  const [outreachLevel, setOutreachLevel] = useState('')
  const [generatingDrafts, setGeneratingDrafts] = useState(false)
  const [drafts, setDrafts] = useState<OutreachDrafts | null>(null)
  const [draftsError, setDraftsError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  // Active searches for role picker
  const [activeSearches, setActiveSearches] = useState<ActiveSearchOption[]>([])
  const [selectedSearchRoleId, setSelectedSearchRoleId] = useState<string>('')
  const [selectedCrmSearchId, setSelectedCrmSearchId] = useState<string | null>(null)
  const [crmMatches, setCrmMatches] = useState<CRMMatchResult[]>([])
  const [crmMatchLoading, setCrmMatchLoading] = useState(false)
  const [crmMatchError, setCrmMatchError] = useState<string | null>(null)

  // Per-candidate email drafts: keyed by candidate_id
  const [candidateEmails, setCandidateEmails] = useState<Record<string, CandidateEmail | 'loading' | 'error'>>({})
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  // Restore session
  useEffect(() => {
    const saved = localStorage.getItem('adminPw')
    if (saved) { setAdminPw(saved); setAuth(true) }
  }, [])

  const loadCandidates = useCallback(async (pw?: string) => {
    const password = pw ?? adminPw
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/candidates', {
        headers: { 'x-admin-password': password },
      })
      if (res.status === 401) { setAuth(false); setAdminPw(''); localStorage.removeItem('adminPw'); return }
      if (!res.ok) throw new Error()
      setCandidates(await res.json())
    } catch {
      setError('Could not load candidates.')
    } finally {
      setLoading(false)
    }
  }, [adminPw])

  useEffect(() => {
    if (auth) loadCandidates()
  }, [auth, loadCandidates])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!pwInput.trim()) { setPwError('Password required.'); return }
    setAdminPw(pwInput)
    localStorage.setItem('adminPw', pwInput)
    setAuth(true)
    setPwError(null)
    loadCandidates(pwInput)
  }

  async function triggerSearch() {
    setSearching(true)
    setSearchResult(null)
    try {
      const res = await fetch('/api/cron/candidate-discovery', {
        method: 'POST',
        headers: { 'x-admin-password': adminPw },
      })
      const data = await res.json()
      if (res.ok) {
        setSearchResult(`Search complete. Found ${data.total_found} candidates across ${data.searches?.length ?? 4} searches.`)
        await loadCandidates()
      } else {
        setSearchResult(`Error: ${data.error ?? 'Search failed.'}`)
      }
    } catch {
      setSearchResult('Search failed. Check console.')
    } finally {
      setSearching(false)
    }
  }

  async function markOutreachSent(id: string) {
    await fetch('/api/admin/candidates', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
      body: JSON.stringify({ id, outreach_sent: true }),
    })
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, outreach_sent: true } : c))
  }

  async function loadActiveSearches() {
    try {
      const res = await fetch('/api/admin/active-searches', {
        headers: { 'x-admin-password': adminPw },
      })
      if (res.ok) {
        const data = await res.json()
        setActiveSearches(data.options ?? [])
      }
    } catch { /* non-fatal */ }
  }

  function openOutreachModal() {
    setOutreachOpen(true)
    setDrafts(null)
    setDraftsError(null)
    setCrmMatches([])
    setCrmMatchError(null)
    setSelectedSearchRoleId('')
    setSelectedCrmSearchId(null)
    setCandidateEmails({})
    setCopiedEmail(null)
    loadActiveSearches()
  }

  function selectSearchRole(roleId: string) {
    setSelectedSearchRoleId(roleId)
    const option = activeSearches.find(o => o.role_id === roleId)
    if (!option) return
    setSelectedCrmSearchId(option.crm_search_id)
    setOutreachRole(`${option.role_title} at ${option.school_name}`)
    setOutreachRegion(option.location ?? '')
    setOutreachLevel(option.level ?? '')
  }

  async function generateDrafts() {
    setGeneratingDrafts(true)
    setDraftsError(null)
    setDrafts(null)
    setCrmMatches([])
    setCrmMatchError(null)

    // Run broadcast draft generation and CRM matching in parallel
    const draftsPromise = fetch('/api/generate-outreach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
      body: JSON.stringify({ role: outreachRole, region: outreachRegion, level: outreachLevel }),
    })

    const matchPromise = selectedCrmSearchId
      ? fetch('/api/placement/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
          body: JSON.stringify({ search_id: selectedCrmSearchId }),
        })
      : Promise.resolve(null)

    try {
      const [draftsRes, matchRes] = await Promise.all([draftsPromise, matchPromise])
      const draftsData = await draftsRes.json()
      if (draftsRes.ok) setDrafts(draftsData)
      else setDraftsError(draftsData.error ?? 'Failed to generate drafts.')

      if (matchRes) {
        const matchData = await matchRes.json()
        if (matchRes.ok) setCrmMatches(matchData.matches ?? [])
        else setCrmMatchError(matchData.error ?? 'Matching failed.')
      }
    } catch {
      setDraftsError('Request failed.')
    } finally {
      setGeneratingDrafts(false)
    }
  }

  async function draftCandidateEmail(match: CRMMatchResult) {
    const option = activeSearches.find(o => o.role_id === selectedSearchRoleId)
    setCandidateEmails(prev => ({ ...prev, [match.candidate_id]: 'loading' }))
    try {
      const res = await fetch('/api/generate-candidate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPw },
        body: JSON.stringify({
          candidate: {
            name: match.full_name,
            credential: match.credential,
            levels: match.levels_certified,
            location_city: match.location_city,
            location_state: match.location_state,
          },
          role: {
            title: option?.role_title ?? outreachRole,
            school_name: option?.school_name ?? '',
            description: option?.role_description,
            level: option?.level,
          },
          match_rationale: match.match_summary,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setCandidateEmails(prev => ({ ...prev, [match.candidate_id]: data as CandidateEmail }))
      } else {
        setCandidateEmails(prev => ({ ...prev, [match.candidate_id]: 'error' }))
      }
    } catch {
      setCandidateEmails(prev => ({ ...prev, [match.candidate_id]: 'error' }))
    }
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  // Unique values for filter dropdowns
  const credentials = [...new Set(candidates.map(c => c.credential).filter(Boolean))] as string[]
  const levels = [...new Set(candidates.map(c => c.level_experience).filter(Boolean))] as string[]

  // Apply filters
  const filtered = candidates.filter(c => {
    if (filterCredential && c.credential !== filterCredential) return false
    if (filterLevel && c.level_experience !== filterLevel) return false
    if (filterOpenToWork === 'yes' && !c.open_to_work) return false
    if (filterOpenToWork === 'no' && c.open_to_work) return false
    if (filterOutreach === 'sent' && !c.outreach_sent) return false
    if (filterOutreach === 'not_sent' && c.outreach_sent) return false
    return true
  })

  // ── Login gate ────────────────────────────────────────────────────────────────
  if (!auth) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="bg-white border border-[#E2DDD6] p-10 w-full max-w-sm flex flex-col gap-4">
          <h1 className="text-xl font-semibold text-[#0e1a7a]">Candidates Admin</h1>
          <input
            type="password"
            placeholder="Admin password"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            className="border border-[#E2DDD6] px-4 py-3 text-sm focus:outline-none focus:border-[#0e1a7a]"
          />
          {pwError && <p className="text-red-600 text-xs">{pwError}</p>}
          <button type="submit" className="bg-[#0e1a7a] text-white text-sm px-6 py-3 hover:bg-[#162270] transition-colors">
            Sign In
          </button>
        </form>
      </div>
    )
  }

  // ── Main dashboard ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Header */}
      <div className="bg-[#0e1a7a] px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-1">Admin</p>
            <h1 className="text-2xl text-white font-semibold">Candidate Discovery</h1>
            <p className="text-[#94A3B8] text-sm mt-1">{candidates.length} candidates in database</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={triggerSearch}
              disabled={searching}
              className="bg-[#d6a758] text-white text-sm px-5 py-2.5 hover:bg-[#c09240] transition-colors disabled:opacity-50 font-medium"
            >
              {searching ? 'Searching…' : 'Run Search Now'}
            </button>
            <button
              onClick={openOutreachModal}
              className="border border-white/30 text-white text-sm px-5 py-2.5 hover:border-white/60 transition-colors"
            >
              Generate Outreach Drafts
            </button>
          </div>
        </div>
        {searchResult && (
          <div className="max-w-7xl mx-auto mt-4">
            <p className="text-[#94A3B8] text-sm bg-white/10 px-4 py-2 rounded-sm">{searchResult}</p>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {/* Filter bar */}
        <div className="bg-white border border-[#E2DDD6] p-4 mb-6 flex flex-wrap gap-3 items-center">
          <span className="text-[#64748B] text-xs tracking-wide uppercase">Filter</span>

          <select
            value={filterCredential}
            onChange={e => setFilterCredential(e.target.value)}
            className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white"
          >
            <option value="">All credentials</option>
            {credentials.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={filterLevel}
            onChange={e => setFilterLevel(e.target.value)}
            className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white"
          >
            <option value="">All levels</option>
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <select
            value={filterOpenToWork}
            onChange={e => setFilterOpenToWork(e.target.value as 'all' | 'yes' | 'no')}
            className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white"
          >
            <option value="all">Open to work: all</option>
            <option value="yes">Open to work: yes</option>
            <option value="no">Open to work: no</option>
          </select>

          <select
            value={filterOutreach}
            onChange={e => setFilterOutreach(e.target.value as 'all' | 'sent' | 'not_sent')}
            className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white"
          >
            <option value="all">Outreach: all</option>
            <option value="sent">Outreach sent</option>
            <option value="not_sent">Outreach not sent</option>
          </select>

          {(filterCredential || filterLevel || filterOpenToWork !== 'all' || filterOutreach !== 'all') && (
            <button
              onClick={() => { setFilterCredential(''); setFilterLevel(''); setFilterOpenToWork('all'); setFilterOutreach('all') }}
              className="text-xs text-[#64748B] hover:text-[#0e1a7a] underline"
            >
              Clear filters
            </button>
          )}

          <span className="ml-auto text-xs text-[#64748B]">{filtered.length} shown</span>
        </div>

        {/* Error */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Loading */}
        {loading && (
          <div className="text-[#64748B] text-sm py-12 text-center">Loading candidates…</div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-[#64748B]">
            <p className="text-base mb-2">No candidates yet.</p>
            <p className="text-sm">Run a search to discover educators from the public web.</p>
          </div>
        )}

        {/* Candidate cards */}
        <div className="grid gap-4">
          {filtered.map(c => (
            <div key={c.id} className="bg-white border border-[#E2DDD6] p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="text-[#0e1a7a] font-semibold text-lg">{c.name}</h2>
                    {c.open_to_work && (
                      <span className="text-[10px] tracking-wide uppercase bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 font-medium">
                        Open to Work
                      </span>
                    )}
                    {c.outreach_sent && (
                      <span className="text-[10px] tracking-wide uppercase bg-[#f5e8cc] text-[#8A6014] border border-[#d6a758]/40 px-2 py-0.5 font-medium">
                        Outreach Sent
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#64748B] mb-3">
                    {c.location && <span>{c.location}</span>}
                    {c.credential && <span className="text-[#8A6014] font-medium">{c.credential}</span>}
                    {c.level_experience && <span>{c.level_experience}</span>}
                    {c.source && <span className="truncate max-w-[200px]">{c.source}</span>}
                  </div>

                  {c.bio && (
                    <p className="text-[#374151] text-sm leading-relaxed mb-3">{c.bio}</p>
                  )}

                  {c.skills && c.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {c.skills.map((s, i) => (
                        <span key={i} className="text-[11px] bg-[#F2EDE6] text-[#374151] px-2 py-0.5">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 items-center mt-2">
                    {c.profile_url && (
                      <a
                        href={c.profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#0e1a7a] underline hover:text-[#162270]"
                      >
                        View Profile →
                      </a>
                    )}
                    <span className="text-[11px] text-[#94A3B8]">
                      Discovered {fmt(c.discovered_at)}
                      {c.search_query && ` via "${c.search_query}"`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  {!c.outreach_sent && (
                    <button
                      onClick={() => markOutreachSent(c.id)}
                      className="text-[11px] font-medium px-3 py-1.5 border border-[#0e1a7a] text-[#0e1a7a] hover:bg-[#0e1a7a] hover:text-white transition-colors whitespace-nowrap"
                    >
                      Mark Outreach Sent
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outreach drafts modal */}
      {outreachOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0e1a7a] px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-semibold">Generate Outreach Drafts</h2>
              <button onClick={() => setOutreachOpen(false)} className="text-white/60 hover:text-white text-xl leading-none">
                &times;
              </button>
            </div>

            <div className="p-6">
              {!drafts && (
                <div className="flex flex-col gap-4 mb-6">
                  {/* Role picker — pull from active Strategic Searches */}
                  {activeSearches.length > 0 && (
                    <div>
                      <label className="text-xs text-[#64748B] uppercase tracking-wide block mb-1">Load from Active Search</label>
                      <select
                        value={selectedSearchRoleId}
                        onChange={e => selectSearchRole(e.target.value)}
                        className="w-full border border-[#d6a758] bg-[#fffdf7] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]"
                      >
                        <option value="">— pick a posted role —</option>
                        {activeSearches.map(o => (
                          <option key={o.role_id} value={o.role_id}>
                            {o.school_name} · {o.role_title}
                          </option>
                        ))}
                      </select>
                      {selectedCrmSearchId && (
                        <p className="text-[10px] text-green-700 mt-1">✓ Linked to CRM — will also run candidate matching</p>
                      )}
                      {selectedSearchRoleId && !selectedCrmSearchId && (
                        <p className="text-[10px] text-[#64748B] mt-1">No CRM search linked yet — broadcast drafts only</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="text-xs text-[#64748B] uppercase tracking-wide block mb-1">Role (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. AMI-credentialed primary guide"
                      value={outreachRole}
                      onChange={e => setOutreachRole(e.target.value)}
                      className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#64748B] uppercase tracking-wide block mb-1">Region (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Southeast US"
                      value={outreachRegion}
                      onChange={e => setOutreachRegion(e.target.value)}
                      className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#64748B] uppercase tracking-wide block mb-1">Level (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. lead guide, director"
                      value={outreachLevel}
                      onChange={e => setOutreachLevel(e.target.value)}
                      className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]"
                    />
                  </div>
                  <button
                    onClick={generateDrafts}
                    disabled={generatingDrafts}
                    className="bg-[#0e1a7a] text-white text-sm px-6 py-3 hover:bg-[#162270] transition-colors disabled:opacity-50 font-medium"
                  >
                    {generatingDrafts
                      ? selectedCrmSearchId ? 'Generating drafts + matching…' : 'Generating…'
                      : selectedCrmSearchId ? 'Generate Drafts + Find CRM Matches' : 'Generate Drafts'
                    }
                  </button>
                  {draftsError && <p className="text-red-600 text-sm">{draftsError}</p>}
                </div>
              )}

              {drafts && (
                <div className="flex flex-col gap-5">

                  {/* ── CRM Matches ── */}
                  {(crmMatchLoading || crmMatches.length > 0 || crmMatchError) && (
                    <div className="border border-[#0e1a7a]/20 bg-[#f5f7ff]">
                      <div className="bg-[#060d3a] px-4 py-3 flex items-center justify-between">
                        <p className="text-white text-xs font-semibold uppercase tracking-wide">CRM Matches — Who to Contact First</p>
                        <span className="text-[#94A3B8] text-xs">{crmMatches.length} candidate{crmMatches.length !== 1 ? 's' : ''}</span>
                      </div>
                      {crmMatchLoading && <p className="text-sm text-[#64748B] p-4">Running matching engine…</p>}
                      {crmMatchError && <p className="text-sm text-red-600 p-4">{crmMatchError}</p>}
                      {crmMatches.length > 0 && (
                        <div className="divide-y divide-[#E2DDD6]">
                          {crmMatches.map(m => {
                            const priorityStyle =
                              m.contact_priority === 'Immediate'
                                ? 'bg-[#d6a758] text-white'
                                : m.contact_priority === 'This Week'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-[#F1F5F9] text-[#64748B]'
                            const emailState = candidateEmails[m.candidate_id]
                            const emailDraft = emailState && emailState !== 'loading' && emailState !== 'error'
                              ? emailState as CandidateEmail
                              : null
                            return (
                              <div key={m.candidate_id} className="px-4 py-3">
                                <div className="flex items-start gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                      <span className="font-medium text-[#0e1a7a] text-sm">{m.full_name}</span>
                                      <span className={`text-[10px] font-medium px-2 py-0.5 ${priorityStyle}`}>
                                        {m.contact_priority}
                                      </span>
                                      {m.credential && (
                                        <span className="text-[10px] text-[#64748B]">{m.credential}</span>
                                      )}
                                    </div>
                                    <p className="text-xs text-[#64748B] leading-relaxed">{m.match_summary}</p>
                                    <div className="flex gap-3 mt-1 text-[10px] text-[#94A3B8]">
                                      <span>Overall: <strong className="text-[#374151]">{m.overall_score}/10</strong></span>
                                      <span>Cred: {m.credential_score}</span>
                                      <span>Loc: {m.location_score}</span>
                                      <span>Level: {m.level_score}</span>
                                      <span>Role: {m.role_score}</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => draftCandidateEmail(m)}
                                    disabled={emailState === 'loading'}
                                    className="shrink-0 text-[11px] border border-[#d6a758] text-[#8A6014] px-3 py-1.5 hover:bg-[#d6a758] hover:text-white transition-colors disabled:opacity-50 whitespace-nowrap"
                                  >
                                    {emailState === 'loading' ? 'Drafting…' : emailDraft ? 'Re-draft Email' : 'Draft Email'}
                                  </button>
                                </div>

                                {/* Inline email draft */}
                                {emailState === 'error' && (
                                  <p className="text-xs text-red-500 mt-2">Failed to generate email — try again.</p>
                                )}
                                {emailDraft && (
                                  <div className="mt-3 bg-[#FAF9F7] border border-[#E2DDD6] p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <div>
                                        <p className="text-[10px] text-[#64748B] uppercase tracking-wide mb-0.5">Subject</p>
                                        <p className="text-sm font-medium text-[#0e1a7a]">{emailDraft.subject}</p>
                                      </div>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(`Subject: ${emailDraft.subject}\n\n${emailDraft.body}`)
                                          setCopiedEmail(m.candidate_id)
                                          setTimeout(() => setCopiedEmail(null), 2000)
                                        }}
                                        className="shrink-0 text-[11px] border border-[#0e1a7a] text-[#0e1a7a] px-2 py-1 hover:bg-[#0e1a7a] hover:text-white transition-colors"
                                      >
                                        {copiedEmail === m.candidate_id ? '✓ Copied' : 'Copy'}
                                      </button>
                                    </div>
                                    <div className="border-t border-[#E2DDD6] pt-3 mt-2">
                                      <p className="text-[10px] text-[#64748B] uppercase tracking-wide mb-1">Body</p>
                                      <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap">{emailDraft.body}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                      {crmMatches.length === 0 && !crmMatchLoading && !crmMatchError && (
                        <p className="text-sm text-[#64748B] p-4">No strong matches found in CRM database.</p>
                      )}
                    </div>
                  )}

                  {/* ── Broadcast Drafts ── */}
                  <p className="text-xs text-[#8A6014] uppercase tracking-wide font-medium">Broadcast Drafts</p>
                  {([
                    { key: 'facebook_post', label: 'Facebook Group Post' },
                    { key: 'newsletter', label: 'Newsletter' },
                    { key: 'twitter_post', label: 'Twitter / X Post' },
                    { key: 'training_email', label: 'Training Program Email' },
                  ] as const).map(({ key, label }) => (
                    <div key={key} className="border border-[#E2DDD6] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-[#8A6014] tracking-wide uppercase font-medium">{label}</p>
                        <button
                          onClick={() => copyToClipboard(drafts[key], key)}
                          className="text-xs text-[#0e1a7a] border border-[#0e1a7a] px-2 py-1 hover:bg-[#0e1a7a] hover:text-white transition-colors"
                        >
                          {copied === key ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-[#374151] text-sm leading-relaxed whitespace-pre-wrap">{drafts[key]}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => { setDrafts(null); setDraftsError(null); setCrmMatches([]); setCrmMatchError(null); setCandidateEmails({}) }}
                    className="text-sm text-[#64748B] underline text-left"
                  >
                    Generate new drafts
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

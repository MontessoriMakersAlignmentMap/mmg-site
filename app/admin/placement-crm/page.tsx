'use client'

import { useEffect, useState, useCallback } from 'react'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { CRMCandidate, CRMSearch, CRMPipelineEntry } from './types'
import CandidatesTab from './CandidatesTab'
import SearchesTab from './SearchesTab'
import PipelineTab from './PipelineTab'
import AddNewTab from './AddNewTab'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
})

type Tab = 'candidates' | 'searches' | 'pipeline' | 'add-new'

export default function PlacementCRMPage() {
  const [auth, setAuth] = useState(false)
  const [adminPw, setAdminPw] = useState('')
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('candidates')

  const [candidates, setCandidates] = useState<CRMCandidate[]>([])
  const [searches, setSearches] = useState<CRMSearch[]>([])
  const [pipeline, setPipeline] = useState<CRMPipelineEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<string | null>(null)

  // Restore session
  useEffect(() => {
    const saved = localStorage.getItem('adminPw')
    if (saved) { setAdminPw(saved); setAuth(true) }
  }, [])

  const api = useCallback((path: string, opts?: RequestInit, pw?: string) =>
    fetch(path, { ...opts, headers: { 'Content-Type': 'application/json', 'x-admin-password': pw ?? adminPw, ...(opts?.headers ?? {}) } }),
    [adminPw]
  )

  const loadAll = useCallback(async (pw?: string) => {
    setLoading(true)
    try {
      const password = pw ?? adminPw
      const headers = { 'x-admin-password': password }
      const [cRes, sRes, pRes] = await Promise.all([
        fetch('/api/admin/crm/candidates', { headers }),
        fetch('/api/admin/crm/searches', { headers }),
        fetch('/api/admin/crm/pipeline', { headers }),
      ])
      if (cRes.status === 401) { setAuth(false); setAdminPw(''); localStorage.removeItem('adminPw'); return }
      setCandidates(await cRes.json())
      setSearches(await sRes.json())
      setPipeline(await pRes.json())
    } finally {
      setLoading(false)
    }
  }, [adminPw])

  useEffect(() => { if (auth) loadAll() }, [auth, loadAll])

  async function handleSyncMatchHub() {
    setSyncing(true)
    setSyncMsg(null)
    try {
      const res = await api('/api/admin/sync-matchhub', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) { setSyncMsg(`Error: ${data.error ?? 'sync failed'}`); return }
      setSyncMsg(`Synced: ${data.inserted} inserted, ${data.updated} updated`)
      if (data.total > 0) loadAll()
    } finally {
      setSyncing(false)
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!pwInput.trim()) { setPwError('Password required.'); return }
    localStorage.setItem('adminPw', pwInput)
    setAdminPw(pwInput)
    setAuth(true)
    setPwError(null)
    loadAll(pwInput)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'candidates', label: 'Candidates' },
    { id: 'searches', label: 'Searches' },
    { id: 'pipeline', label: 'Pipeline' },
    { id: 'add-new', label: 'Add New' },
  ]

  if (!auth) {
    return (
      <div className={`${cormorant.variable} ${dmSans.variable} min-h-screen bg-[#060d3a] flex items-center justify-center px-6`}
        style={{ fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
        <form onSubmit={handleLogin} className="bg-white p-10 w-full max-w-sm flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-[#060d3a]" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>
            Placement CRM
          </h1>
          <input type="password" placeholder="Admin password" value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            className="border border-[#E2DDD6] px-4 py-3 text-sm focus:outline-none focus:border-[#0e1a7a]" />
          {pwError && <p className="text-red-600 text-xs">{pwError}</p>}
          <button type="submit" className="bg-[#0e1a7a] text-white text-sm px-6 py-3 hover:bg-[#060d3a] transition-colors">
            Sign In
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className={`${cormorant.variable} ${dmSans.variable} min-h-screen bg-[#FAF9F7]`}
      style={{ fontFamily: 'var(--font-dm-sans, sans-serif)' }}>

      {/* Header */}
      <div className="bg-[#060d3a] px-6 md:px-10 pt-6 pb-0">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-1">Admin</p>
              <h1 className="text-3xl text-white" style={{ fontFamily: 'var(--font-cormorant, serif)', fontWeight: 600 }}>
                Placement CRM
              </h1>
            </div>
            <div className="flex items-center gap-4 pb-2">
              <div className="text-right text-xs text-[#94A3B8]">
                <span>{candidates.length} candidates · {searches.length} searches · </span>
                <span className="text-[#d6a758] font-medium">
                  {candidates.filter(c => c.source === 'MatchHub').length} MatchHub inbound
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={handleSyncMatchHub}
                  disabled={syncing}
                  className="text-xs border border-[#d6a758] text-[#d6a758] px-3 py-1.5 hover:bg-[#d6a758] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {syncing ? 'Syncing…' : 'Sync MatchHub Profiles'}
                </button>
                {syncMsg && <p className="text-[10px] text-[#94A3B8]">{syncMsg}</p>}
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-0">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === t.id
                    ? 'border-[#d6a758] text-white'
                    : 'border-transparent text-[#94A3B8] hover:text-white'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-8">
        {loading && candidates.length === 0 ? (
          <p className="text-[#64748B] text-sm text-center py-20">Loading…</p>
        ) : (
          <>
            {activeTab === 'candidates' && (
              <CandidatesTab candidates={candidates} pipeline={pipeline} searches={searches} adminPw={adminPw} api={api} onRefresh={loadAll} />
            )}
            {activeTab === 'searches' && (
              <SearchesTab searches={searches} pipeline={pipeline} candidates={candidates} adminPw={adminPw} api={api} onRefresh={loadAll} />
            )}
            {activeTab === 'pipeline' && (
              <PipelineTab pipeline={pipeline} adminPw={adminPw} api={api} onRefresh={loadAll} />
            )}
            {activeTab === 'add-new' && (
              <AddNewTab candidates={candidates} searches={searches} adminPw={adminPw} api={api} onRefresh={() => { loadAll(); setActiveTab('candidates') }} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

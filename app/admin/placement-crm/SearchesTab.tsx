'use client'

import { useState } from 'react'
import { CRMSearch, CRMPipelineEntry, CRMCandidate, SEARCH_STATUSES, getPipelineStage } from './types'
import type { MatchResult } from '@/app/api/placement/match/route'

type Props = {
  searches: CRMSearch[]
  pipeline: CRMPipelineEntry[]
  candidates: CRMCandidate[]
  adminPw: string
  api: (path: string, opts?: RequestInit) => Promise<Response>
  onRefresh: () => void
}

const statusStyle: Record<string, string> = {
  active:    'bg-[#f5e8cc] text-[#8A6014] border border-[#d6a758]/40',
  filled:    'bg-green-50 text-green-700 border border-green-200',
  closed:    'bg-[#F1F5F9] text-[#64748B] border border-[#E2DDD6]',
  'on hold': 'bg-amber-50 text-amber-700 border border-amber-200',
}

export default function SearchesTab({ searches, pipeline, candidates, adminPw, api, onRefresh }: Props) {
  const [selectedSearchId, setSelectedSearchId] = useState<string | null>(null)
  const [matchSearchId, setMatchSearchId] = useState<string | null>(null)
  const [matchLoading, setMatchLoading] = useState(false)
  const [matchResults, setMatchResults] = useState<MatchResult[]>([])
  const [matchSearch, setMatchSearch] = useState<CRMSearch | null>(null)
  const [matchErr, setMatchErr] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState('')

  const filtered = filterStatus ? searches.filter(s => s.status === filterStatus) : searches
  const candidateMap = Object.fromEntries(candidates.map(c => [c.id, c]))

  async function runMatch(searchId: string) {
    setMatchSearchId(searchId)
    setMatchLoading(true)
    setMatchResults([])
    setMatchErr(null)
    try {
      const res = await api('/api/placement/match', {
        method: 'POST',
        body: JSON.stringify({ search_id: searchId }),
      })
      const data = await res.json()
      if (!res.ok) { setMatchErr(data.error ?? 'Match failed'); return }
      setMatchResults(data.matches ?? [])
      setMatchSearch(data.search ?? null)
    } catch {
      setMatchErr('Request failed')
    } finally {
      setMatchLoading(false)
    }
  }

  const selectedSearch = searches.find(s => s.id === selectedSearchId)
  const searchPipeline = pipeline.filter(p => p.search_id === selectedSearchId)

  return (
    <div>
      {/* Filter */}
      <div className="flex items-center gap-3 mb-4">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] bg-white focus:outline-none focus:border-[#0e1a7a]">
          <option value="">All statuses</option>
          {SEARCH_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-xs text-[#64748B]">{filtered.length} search{filtered.length !== 1 ? 'es' : ''}</span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#64748B] text-sm">No searches yet. Add one in the Add New tab.</div>
      ) : (
        <div className="bg-white border border-[#E2DDD6] overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2DDD6] text-[#64748B] text-xs uppercase tracking-wide">
                <th className="text-left px-4 py-3 font-medium">School</th>
                <th className="text-left px-4 py-3 font-medium">Position</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Level</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Location</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Start Date</th>
                <th className="text-left px-4 py-3 font-medium">Candidates</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id}
                  onClick={() => setSelectedSearchId(prev => prev === s.id ? null : s.id)}
                  className={`border-b border-[#E2DDD6] cursor-pointer transition-colors ${
                    selectedSearchId === s.id ? 'bg-[#f5e8cc]' : i % 2 === 0 ? 'bg-white hover:bg-[#FAF9F7]' : 'bg-[#FAF9F7] hover:bg-[#f5f0ea]'
                  }`}>
                  <td className="px-4 py-3 font-medium text-[#0e1a7a]">{s.school_name}</td>
                  <td className="px-4 py-3 text-[#374151]">{s.position_title}</td>
                  <td className="px-4 py-3 text-[#374151] hidden md:table-cell">{s.level ?? '—'}</td>
                  <td className="px-4 py-3 text-[#374151] hidden md:table-cell">
                    {[s.location_city, s.location_state].filter(Boolean).join(', ') || '—'}
                  </td>
                  <td className="px-4 py-3 text-[#374151] hidden lg:table-cell">{s.start_date ?? '—'}</td>
                  <td className="px-4 py-3 text-[#374151]">{s.pipeline_count ?? 0}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-medium px-2 py-0.5 capitalize ${statusStyle[s.status] ?? statusStyle.closed}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    {s.status === 'active' && (
                      <button
                        onClick={() => runMatch(s.id)}
                        className="text-xs border border-[#0e1a7a] text-[#0e1a7a] px-3 py-1 hover:bg-[#0e1a7a] hover:text-white transition-colors whitespace-nowrap">
                        Find Matches
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pipeline detail panel */}
      {selectedSearch && (
        <div className="bg-white border border-[#E2DDD6] mb-6">
          <div className="bg-[#060d3a] px-5 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>
                {selectedSearch.school_name} — {selectedSearch.position_title}
              </h3>
              <p className="text-[#94A3B8] text-xs mt-0.5">
                {[selectedSearch.location_city, selectedSearch.location_state].filter(Boolean).join(', ')}
                {selectedSearch.level ? ` · ${selectedSearch.level}` : ''}
              </p>
            </div>
            <button onClick={() => setSelectedSearchId(null)} className="text-white/60 hover:text-white text-xl">&times;</button>
          </div>
          <div className="p-5">
            {searchPipeline.length === 0 ? (
              <p className="text-sm text-[#94A3B8]">No candidates in this pipeline yet. Add one in the Add New tab.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2DDD6] text-[#64748B] text-xs uppercase tracking-wide">
                    <th className="text-left px-3 py-2 font-medium">Candidate</th>
                    <th className="text-left px-3 py-2 font-medium">Credential</th>
                    <th className="text-left px-3 py-2 font-medium">Stage</th>
                    <th className="text-left px-3 py-2 font-medium">Score</th>
                    <th className="text-left px-3 py-2 font-medium">Disposition</th>
                  </tr>
                </thead>
                <tbody>
                  {searchPipeline.map(p => (
                    <tr key={p.id} className="border-b border-[#E2DDD6]">
                      <td className="px-3 py-2.5 font-medium text-[#0e1a7a]">
                        {candidateMap[p.candidate_id]?.full_name ?? p.candidate_name ?? '—'}
                      </td>
                      <td className="px-3 py-2.5 text-[#374151]">{candidateMap[p.candidate_id]?.credential ?? '—'}</td>
                      <td className="px-3 py-2.5">
                        <span className="text-[11px] bg-[#060d3a] text-white px-2 py-0.5">{getPipelineStage(p)}</span>
                      </td>
                      <td className="px-3 py-2.5 text-[#374151]">{p.interview_score ?? '—'}</td>
                      <td className="px-3 py-2.5 text-[#374151]">{p.disposition ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Match results modal */}
      {(matchLoading || matchResults.length > 0 || matchErr) && matchSearchId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] flex flex-col">
            <div className="bg-[#060d3a] px-6 py-4 flex items-center justify-between shrink-0">
              <h2 className="text-white font-semibold" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>
                AI Match Results {matchSearch ? `— ${matchSearch.school_name}` : ''}
              </h2>
              <button onClick={() => { setMatchSearchId(null); setMatchResults([]); setMatchErr(null) }}
                className="text-white/60 hover:text-white text-xl">&times;</button>
            </div>
            <div className="overflow-y-auto p-6">
              {matchLoading && <p className="text-sm text-[#64748B] text-center py-8">Running AI match analysis…</p>}
              {matchErr && <p className="text-red-600 text-sm">{matchErr}</p>}
              {matchResults.length > 0 && (
                <div className="flex flex-col gap-3">
                  {matchResults.map((m, i) => (
                    <div key={m.candidate_id} className="border border-[#E2DDD6] p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-[#060d3a]" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>
                            #{i + 1}
                          </span>
                          <div>
                            <p className="font-medium text-[#0e1a7a]">{m.full_name}</p>
                            <p className="text-xs text-[#64748B]">
                              {m.credential} · {[m.location_city, m.location_state].filter(Boolean).join(', ')}
                              {m.actively_looking && ' · Actively looking'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#d6a758]" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>
                            {m.score}
                          </span>
                          <span className="text-[#64748B] text-xs">/10</span>
                        </div>
                      </div>
                      <p className="text-sm text-[#374151] leading-relaxed">{m.reason}</p>
                      <div className="flex gap-2 mt-2">
                        {m.holds_role_type && <span className="text-[10px] bg-[#E8F0FE] text-[#0e1a7a] px-2 py-0.5">Holds this role type</span>}
                        {m.open_to_role_type && <span className="text-[10px] bg-[#f5e8cc] text-[#8A6014] px-2 py-0.5">Open to grow into role</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

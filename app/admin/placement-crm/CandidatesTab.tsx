'use client'

import { useState, useRef } from 'react'
import { CRMCandidate, CRMPipelineEntry, CRMSearch, CREDENTIALS, LEVELS, ROLE_TYPES } from './types'
import CandidatePanel from './CandidatePanel'

type Props = {
  candidates: CRMCandidate[]
  pipeline: CRMPipelineEntry[]
  searches: CRMSearch[]
  adminPw: string
  api: (path: string, opts?: RequestInit, pw?: string) => Promise<Response>
  onRefresh: () => void
}

function MultiSelectDropdown({
  label, options, selected, onChange,
}: { label: string; options: readonly string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggle = (val: string) => {
    onChange(selected.includes(val) ? selected.filter(s => s !== val) : [...selected, val])
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] bg-white flex items-center gap-2 min-w-[140px] justify-between focus:outline-none focus:border-[#0e1a7a]"
      >
        <span>{selected.length ? `${label}: ${selected.length}` : label}</span>
        <span className="text-[10px] text-[#94A3B8]">▾</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 z-30 bg-white border border-[#E2DDD6] shadow-lg mt-1 py-1 min-w-[200px] max-h-60 overflow-y-auto">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#FAF9F7] cursor-pointer text-sm text-[#374151]">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} className="accent-[#0e1a7a]" />
              {opt}
            </label>
          ))}
          {selected.length > 0 && (
            <button onClick={() => { onChange([]); setOpen(false) }}
              className="w-full text-left px-3 py-1.5 text-xs text-[#64748B] hover:bg-[#FAF9F7] border-t border-[#E2DDD6] mt-1">
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function CandidatesTab({ candidates, pipeline, searches, adminPw, api, onRefresh }: Props) {
  const [search, setSearch] = useState('')
  const [filterCredential, setFilterCredential] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [filterState, setFilterState] = useState('')
  const [filterLooking, setFilterLooking] = useState<'all' | 'yes' | 'no'>('all')
  const [filterLanguage, setFilterLanguage] = useState('')
  const [filterRoleTypes, setFilterRoleTypes] = useState<string[]>([])
  const [filterOpenRoleTypes, setFilterOpenRoleTypes] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const states = [...new Set(candidates.map(c => c.location_state).filter(Boolean))].sort() as string[]
  const languages = [...new Set(candidates.flatMap(c => c.languages ?? []).filter(Boolean))].sort()

  const filtered = candidates.filter(c => {
    if (search) {
      const q = search.toLowerCase()
      const match = [c.full_name, c.email, c.location_city, c.location_state, c.credential, c.training_program, c.notes]
        .some(f => f?.toLowerCase().includes(q))
      if (!match) return false
    }
    if (filterCredential && c.credential !== filterCredential) return false
    if (filterLevel && !(c.levels_certified ?? []).includes(filterLevel)) return false
    if (filterState && c.location_state !== filterState) return false
    if (filterLooking === 'yes' && !c.actively_looking) return false
    if (filterLooking === 'no' && c.actively_looking) return false
    if (filterLanguage && !(c.languages ?? []).includes(filterLanguage)) return false
    if (filterRoleTypes.length && !filterRoleTypes.some(r => (c.role_types ?? []).includes(r))) return false
    if (filterOpenRoleTypes.length && !filterOpenRoleTypes.some(r => (c.open_to_role_types ?? []).includes(r))) return false
    return true
  })

  const selected = candidates.find(c => c.id === selectedId) ?? null
  const candidatePipeline = pipeline.filter(p => p.candidate_id === selectedId)

  const hasFilters = filterCredential || filterLevel || filterState || filterLooking !== 'all' || filterLanguage || filterRoleTypes.length || filterOpenRoleTypes.length

  return (
    <div className="flex gap-6">
      {/* Main list */}
      <div className={`flex-1 min-w-0 ${selected ? 'hidden lg:block' : ''}`}>

        {/* Search + filters */}
        <div className="bg-white border border-[#E2DDD6] p-4 mb-4">
          <input
            type="text"
            placeholder="Search by name, email, location, credential…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] mb-3"
          />
          <div className="flex flex-wrap gap-2 items-center">
            <select value={filterCredential} onChange={e => setFilterCredential(e.target.value)}
              className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] bg-white focus:outline-none focus:border-[#0e1a7a]">
              <option value="">All credentials</option>
              {CREDENTIALS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)}
              className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] bg-white focus:outline-none focus:border-[#0e1a7a]">
              <option value="">All levels</option>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <select value={filterState} onChange={e => setFilterState(e.target.value)}
              className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] bg-white focus:outline-none focus:border-[#0e1a7a]">
              <option value="">All states</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={filterLooking} onChange={e => setFilterLooking(e.target.value as 'all' | 'yes' | 'no')}
              className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] bg-white focus:outline-none focus:border-[#0e1a7a]">
              <option value="all">Actively looking: all</option>
              <option value="yes">Actively looking: yes</option>
              <option value="no">Actively looking: no</option>
            </select>
            {languages.length > 0 && (
              <select value={filterLanguage} onChange={e => setFilterLanguage(e.target.value)}
                className="border border-[#E2DDD6] px-3 py-1.5 text-sm text-[#374151] bg-white focus:outline-none focus:border-[#0e1a7a]">
                <option value="">All languages</option>
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            )}
            <MultiSelectDropdown label="Role types" options={ROLE_TYPES} selected={filterRoleTypes} onChange={setFilterRoleTypes} />
            <MultiSelectDropdown label="Open to roles" options={ROLE_TYPES} selected={filterOpenRoleTypes} onChange={setFilterOpenRoleTypes} />
            {hasFilters && (
              <button onClick={() => { setFilterCredential(''); setFilterLevel(''); setFilterState(''); setFilterLooking('all'); setFilterLanguage(''); setFilterRoleTypes([]); setFilterOpenRoleTypes([]) }}
                className="text-xs text-[#64748B] hover:text-[#0e1a7a] underline">
                Clear filters
              </button>
            )}
            <span className="ml-auto text-xs text-[#64748B]">{filtered.length} of {candidates.length}</span>
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#64748B] text-sm">No candidates match the current filters.</div>
        ) : (
          <div className="bg-white border border-[#E2DDD6] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E2DDD6] text-[#64748B] text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Location</th>
                  <th className="text-left px-4 py-3 font-medium">Credential</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Levels</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Role Types</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Source</th>
                  <th className="text-left px-4 py-3 font-medium">Looking</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={`border-b border-[#E2DDD6] cursor-pointer transition-colors ${
                      selectedId === c.id ? 'bg-[#f5e8cc]' : i % 2 === 0 ? 'bg-white hover:bg-[#FAF9F7]' : 'bg-[#FAF9F7] hover:bg-[#f5f0ea]'
                    }`}>
                    <td className="px-4 py-3 font-medium text-[#0e1a7a]">{c.full_name}</td>
                    <td className="px-4 py-3 text-[#374151]">{[c.location_city, c.location_state].filter(Boolean).join(', ') || '—'}</td>
                    <td className="px-4 py-3">
                      {c.credential && (
                        <span className="text-[11px] font-medium bg-[#060d3a] text-white px-2 py-0.5">{c.credential}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#374151] hidden md:table-cell">
                      <span className="text-xs">{(c.levels_certified ?? []).join(', ') || '—'}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {(c.role_types ?? []).slice(0, 2).map(r => (
                          <span key={r} className="text-[10px] bg-[#E8F0FE] text-[#0e1a7a] px-1.5 py-0.5">{r}</span>
                        ))}
                        {(c.open_to_role_types ?? []).slice(0, 2).map(r => (
                          <span key={r} className="text-[10px] bg-[#f5e8cc] text-[#8A6014] px-1.5 py-0.5">→ {r}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#64748B] hidden lg:table-cell text-xs">{c.source ?? '—'}</td>
                    <td className="px-4 py-3">
                      {c.actively_looking
                        ? <span className="text-[10px] font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-0.5">Yes</span>
                        : <span className="text-[10px] text-[#64748B]">No</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-over panel */}
      {selected && (
        <div className="w-full lg:w-[520px] flex-shrink-0">
          <CandidatePanel
            candidate={selected}
            pipeline={candidatePipeline}
            searches={searches}
            adminPw={adminPw}
            api={api}
            onUpdate={updated => {
              onRefresh()
              setSelectedId(updated.id)
            }}
            onClose={() => setSelectedId(null)}
          />
        </div>
      )}
    </div>
  )
}

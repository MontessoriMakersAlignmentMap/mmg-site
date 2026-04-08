'use client'

import { useState } from 'react'
import type { MatchResult } from '@/app/api/placement/match/route'
import { CRMSearch, CRMCandidate } from './types'

type Props = {
  matchResults: MatchResult[]
  matchSearch: CRMSearch | null
  matchLoading: boolean
  matchErr: string | null
  onClose: () => void
  candidates: CRMCandidate[]
  api: (path: string, opts?: RequestInit) => Promise<Response>
}

const priorityStyle: Record<string, string> = {
  'Immediate': 'bg-[#d6a758] text-white',
  'This Week': 'bg-amber-100 text-amber-800 border border-amber-200',
  'Pipeline':  'bg-[#F1F5F9] text-[#64748B] border border-[#E2DDD6]',
}

function ScorePip({ label, score }: { label: string; score: number }) {
  const color =
    score >= 8 ? 'text-green-700 bg-green-50 border-green-200' :
    score >= 5 ? 'text-amber-700 bg-amber-50 border-amber-200' :
                 'text-[#94A3B8] bg-[#F8F8F8] border-[#E2DDD6]'
  return (
    <div className={`text-center px-2 py-1.5 border ${color}`}>
      <div className="text-[9px] uppercase tracking-wide leading-none mb-0.5 font-medium">{label}</div>
      <div className="text-sm font-bold leading-none">{score}</div>
    </div>
  )
}

export default function MatchModal({ matchResults, matchSearch, matchLoading, matchErr, onClose, candidates, api }: Props) {
  const [contactedIds,  setContactedIds]  = useState<Set<string>>(new Set())
  const [contactingId,  setContactingId]  = useState<string | null>(null)
  const [viewProfileId, setViewProfileId] = useState<string | null>(null)

  const candidateMap = Object.fromEntries(candidates.map(c => [c.id, c]))

  async function markContacted(candidateId: string) {
    if (!matchSearch) return
    setContactingId(candidateId)
    const today = new Date().toISOString().slice(0, 10)
    try {
      await api('/api/admin/crm/pipeline', {
        method: 'POST',
        body: JSON.stringify({
          candidate_id:    candidateId,
          search_id:       matchSearch.id,
          date_applied:    today,
          resume_reviewed: true,
          contacted:       true,
          contacted_date:  today,
        }),
      })
      setContactedIds(prev => new Set([...prev, candidateId]))
    } finally {
      setContactingId(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="bg-[#060d3a] px-6 py-4 flex items-start justify-between shrink-0">
          <div>
            <p className="text-[#d6a758] text-[10px] tracking-[0.2em] uppercase mb-1">AI Match Results</p>
            {matchSearch && (
              <h2 className="text-white font-semibold text-lg leading-tight" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>
                {matchSearch.school_name} — {matchSearch.position_title}
              </h2>
            )}
            {matchSearch && (matchSearch.location_city || matchSearch.credential_required || matchSearch.role_type_required) && (
              <p className="text-[#94A3B8] text-xs mt-0.5">
                {[matchSearch.location_city, matchSearch.location_state].filter(Boolean).join(', ')}
                {matchSearch.role_type_required && ` · ${matchSearch.role_type_required}`}
                {matchSearch.credential_required && ` · ${matchSearch.credential_required} required`}
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-2xl leading-none px-1 ml-4 shrink-0">&times;</button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {matchLoading && (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-2 border-[#d6a758] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#64748B] text-sm">Analyzing candidates…</p>
              <p className="text-[#94A3B8] text-xs mt-1">This typically takes 15–30 seconds.</p>
            </div>
          )}

          {matchErr && (
            <div className="bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-red-700 text-sm">{matchErr}</p>
            </div>
          )}

          {!matchLoading && !matchErr && matchResults.length === 0 && (
            <p className="text-[#64748B] text-sm text-center py-12">No candidates scored 5 or above for this search.</p>
          )}

          {matchResults.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-[#64748B]">
                {matchResults.length} candidate{matchResults.length !== 1 ? 's' : ''} matched — sorted by overall fit score
              </p>

              {matchResults.map((m, i) => {
                const fullCandidate = candidateMap[m.candidate_id]
                const isMatchHub = fullCandidate?.source === 'MatchHub' || !!fullCandidate?.matchhub_profile_url
                const isViewing   = viewProfileId === m.candidate_id
                const isContacted = contactedIds.has(m.candidate_id)

                return (
                  <div key={m.candidate_id} className="border border-[#E2DDD6] overflow-hidden">

                    {/* Card header row */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#FAF9F7] border-b border-[#E2DDD6]">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[#060d3a] text-xl font-bold shrink-0 w-7" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>
                          #{i + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-[#0e1a7a] text-sm">{m.full_name}</p>
                            {isMatchHub && (
                              <span className="text-[9px] font-bold bg-[#d6a758] text-white px-1.5 py-0.5 shrink-0">MatchHub</span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#64748B]">
                            {m.credential ?? '—'} · {[m.location_city, m.location_state].filter(Boolean).join(', ') || '—'}
                            {m.actively_looking ? ' · Actively looking' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-3">
                        <span className={`text-[10px] font-medium px-2 py-0.5 whitespace-nowrap ${priorityStyle[m.contact_priority] ?? priorityStyle['Pipeline']}`}>
                          {m.contact_priority}
                        </span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#d6a758]" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>
                            {m.overall_score}
                          </span>
                          <span className="text-[#94A3B8] text-xs">/10</span>
                        </div>
                      </div>
                    </div>

                    {/* Sub-scores */}
                    <div className="grid grid-cols-4 gap-px bg-[#E2DDD6] border-b border-[#E2DDD6]">
                      <ScorePip label="Credential" score={m.credential_score} />
                      <ScorePip label="Location"   score={m.location_score} />
                      <ScorePip label="Level"      score={m.level_score} />
                      <ScorePip label="Role"       score={m.role_score} />
                    </div>

                    {/* Summary + levels + actions */}
                    <div className="px-4 py-3">
                      <p className="text-sm text-[#374151] leading-relaxed mb-2">{m.match_summary}</p>

                      {m.levels_certified.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {m.levels_certified.map(l => (
                            <span key={l} className="text-[10px] bg-[#E8F0FE] text-[#0e1a7a] px-2 py-0.5">{l}</span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setViewProfileId(isViewing ? null : m.candidate_id)}
                          className="text-xs border border-[#0e1a7a] text-[#0e1a7a] px-3 py-1.5 hover:bg-[#0e1a7a] hover:text-white transition-colors"
                        >
                          {isViewing ? 'Close Profile' : 'View Profile'}
                        </button>
                        {isContacted ? (
                          <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5">✓ Added to Pipeline</span>
                        ) : (
                          <button
                            onClick={() => markContacted(m.candidate_id)}
                            disabled={contactingId === m.candidate_id}
                            className="text-xs border border-[#d6a758] text-[#8A6014] px-3 py-1.5 hover:bg-[#f5e8cc] transition-colors disabled:opacity-50"
                          >
                            {contactingId === m.candidate_id ? 'Adding…' : 'Mark as Contacted'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline profile panel */}
                    {isViewing && fullCandidate && (
                      <div className="border-t border-[#E2DDD6] bg-[#FAF9F7] px-4 py-4">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          {fullCandidate.training_program && (
                            <div>
                              <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide mb-0.5">Training</p>
                              <p className="text-[#374151]">{fullCandidate.training_program}</p>
                            </div>
                          )}
                          {fullCandidate.years_experience != null && (
                            <div>
                              <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide mb-0.5">Experience</p>
                              <p className="text-[#374151]">{fullCandidate.years_experience} years</p>
                            </div>
                          )}
                          {(fullCandidate.role_types ?? []).length > 0 && (
                            <div className="col-span-2">
                              <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide mb-1">Role Types</p>
                              <div className="flex flex-wrap gap-1">
                                {(fullCandidate.role_types ?? []).map(r => (
                                  <span key={r} className="bg-[#E8F0FE] text-[#0e1a7a] px-2 py-0.5">{r}</span>
                                ))}
                                {(fullCandidate.open_to_role_types ?? []).map(r => (
                                  <span key={r} className="bg-[#f5e8cc] text-[#8A6014] px-2 py-0.5">→ {r}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          {fullCandidate.notes && (
                            <div className="col-span-2">
                              <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide mb-0.5">Notes</p>
                              <p className="text-[#374151] leading-relaxed">{fullCandidate.notes}</p>
                            </div>
                          )}
                          {fullCandidate.linkedin_url && (
                            <div className="col-span-2">
                              <a href={fullCandidate.linkedin_url} target="_blank" rel="noopener noreferrer"
                                className="text-[#0e1a7a] underline text-xs">
                                LinkedIn Profile →
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

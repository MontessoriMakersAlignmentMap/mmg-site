'use client'

import { useEffect, useState } from 'react'
import { CRMCandidate, CRMPipelineEntry, CRMSearch, CRMInterviewNote, CRMReference, CREDENTIALS, LEVELS, SOURCES, QUESTION_CATEGORIES, ROLE_TYPES, getPipelineStage } from './types'

type Props = {
  candidate: CRMCandidate
  pipeline: CRMPipelineEntry[]
  searches: CRMSearch[]
  adminPw: string
  api: (path: string, opts?: RequestInit, pw?: string) => Promise<Response>
  onUpdate: (c: CRMCandidate) => void
  onClose: () => void
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="text-[10px] text-[#64748B] uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-[#374151]">{value || <span className="text-[#94A3B8]">—</span>}</p>
    </div>
  )
}

function TagList({ items }: { items: string[] }) {
  if (!items.length) return <span className="text-[#94A3B8] text-sm">—</span>
  return (
    <div className="flex flex-wrap gap-1">
      {items.map(i => <span key={i} className="text-[11px] bg-[#F2EDE6] text-[#374151] px-2 py-0.5">{i}</span>)}
    </div>
  )
}

export default function CandidatePanel({ candidate, pipeline, searches, adminPw, api, onUpdate, onClose }: Props) {
  const [tab, setTab] = useState<'profile' | 'pipeline' | 'notes' | 'refs'>('profile')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<Partial<CRMCandidate>>({})
  const [saving, setSaving] = useState(false)
  const [saveErr, setSaveErr] = useState<string | null>(null)

  const [notes, setNotes] = useState<CRMInterviewNote[]>([])
  const [refs, setRefs] = useState<CRMReference[]>([])
  const [loadingNotes, setLoadingNotes] = useState(false)
  const [loadingRefs, setLoadingRefs] = useState(false)

  // Apollo enrichment
  const [enriching, setEnriching] = useState(false)
  const [enrichMsg, setEnrichMsg] = useState<string | null>(null)

  useEffect(() => {
    setEditing(false)
    setForm({})
    setSaveErr(null)
    setEnrichMsg(null)
  }, [candidate.id])

  useEffect(() => {
    if (tab === 'notes' && notes.length === 0) {
      setLoadingNotes(true)
      api(`/api/admin/crm/notes?candidate_id=${candidate.id}`)
        .then(r => r.json()).then(setNotes).finally(() => setLoadingNotes(false))
    }
    if (tab === 'refs' && refs.length === 0) {
      setLoadingRefs(true)
      api(`/api/admin/crm/refs?candidate_id=${candidate.id}`)
        .then(r => r.json()).then(setRefs).finally(() => setLoadingRefs(false))
    }
  }, [tab, candidate.id, api, notes.length, refs.length])

  function startEdit() {
    setForm({ ...candidate })
    setEditing(true)
    setSaveErr(null)
  }

  async function saveEdit() {
    setSaving(true)
    setSaveErr(null)
    try {
      const res = await api('/api/admin/crm/candidates', {
        method: 'PATCH',
        body: JSON.stringify({ id: candidate.id, ...form }),
      })
      if (!res.ok) { const d = await res.json(); setSaveErr(d.error ?? 'Save failed'); return }
      const updated = await res.json()
      onUpdate(updated)
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  async function enrich() {
    setEnriching(true)
    setEnrichMsg(null)
    try {
      const res = await api('/api/placement/enrich-contact', {
        method: 'POST',
        body: JSON.stringify({
          full_name: candidate.full_name,
          linkedin_url: candidate.linkedin_url,
        }),
      })
      const data = await res.json()
      if (data.not_found) { setEnrichMsg('No match found in Apollo.'); return }
      if (data.error) { setEnrichMsg(`Error: ${data.error}`); return }
      // Patch the candidate with enriched data
      const updates: Partial<CRMCandidate> = { email_enriched: true, enrichment_source: 'Apollo' } as never
      if (data.email && !candidate.email) (updates as Record<string, unknown>).email = data.email
      if (data.phone && !candidate.phone) (updates as Record<string, unknown>).phone = data.phone
      const patchRes = await api('/api/admin/crm/candidates', {
        method: 'PATCH',
        body: JSON.stringify({ id: candidate.id, ...updates }),
      })
      if (patchRes.ok) { onUpdate(await patchRes.json()); setEnrichMsg('Enriched via Apollo') }
    } finally {
      setEnriching(false)
    }
  }

  const f = editing ? form as Record<string, unknown> : candidate as unknown as Record<string, unknown>
  const set = (k: string, v: unknown) => setForm(prev => ({ ...prev, [k]: v }))

  const searchMap = Object.fromEntries(searches.map(s => [s.id, s]))

  const notesByCategory = QUESTION_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = notes.filter(n => n.question_category === cat)
    return acc
  }, {} as Record<string, CRMInterviewNote[]>)

  return (
    <div className="bg-white border border-[#E2DDD6] h-full flex flex-col" style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
      {/* Panel header */}
      <div className="bg-[#060d3a] px-5 py-4 flex items-start justify-between sticky top-0 z-10">
        <div>
          <h2 className="text-white text-lg font-semibold" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>
            {candidate.full_name}
          </h2>
          <p className="text-[#94A3B8] text-xs mt-0.5">
            {[candidate.location_city, candidate.location_state].filter(Boolean).join(', ')}
            {candidate.credential && ` · ${candidate.credential}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!editing && (
            <button onClick={startEdit}
              className="text-xs border border-[#d6a758] text-[#d6a758] px-3 py-1.5 hover:bg-[#d6a758] hover:text-white transition-colors">
              Edit
            </button>
          )}
          <button onClick={onClose} className="text-white/60 hover:text-white text-xl leading-none px-1">&times;</button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex border-b border-[#E2DDD6] bg-[#FAF9F7] px-4">
        {(['profile', 'pipeline', 'notes', 'refs'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs uppercase tracking-wide capitalize border-b-2 transition-colors ${
              tab === t ? 'border-[#0e1a7a] text-[#0e1a7a] font-medium' : 'border-transparent text-[#64748B] hover:text-[#0e1a7a]'
            }`}>
            {t === 'refs' ? 'References' : t}
          </button>
        ))}
      </div>

      <div className="p-5 flex-1">
        {/* ── Profile ── */}
        {tab === 'profile' && (
          <div>
            {editing ? (
              <div className="flex flex-col gap-3">
                {[
                  { k: 'full_name', label: 'Full Name', type: 'text' },
                  { k: 'email', label: 'Email', type: 'email' },
                  { k: 'phone', label: 'Phone', type: 'text' },
                  { k: 'location_city', label: 'City', type: 'text' },
                  { k: 'location_state', label: 'State', type: 'text' },
                  { k: 'training_program', label: 'Training Program', type: 'text' },
                  { k: 'years_experience', label: 'Years Experience', type: 'number' },
                  { k: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
                  { k: 'resume_url', label: 'Resume URL', type: 'url' },
                ].map(({ k, label, type }) => (
                  <div key={k}>
                    <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">{label}</label>
                    <input type={type} value={(f[k] as string) ?? ''} onChange={e => set(k, e.target.value)}
                      className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a]" />
                  </div>
                ))}

                <div>
                  <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Credential</label>
                  <select value={(f.credential as string) ?? ''} onChange={e => set('credential', e.target.value)}
                    className="w-full border border-[#E2DDD6] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0e1a7a]">
                    <option value="">Select…</option>
                    {CREDENTIALS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Source</label>
                  <select value={(f.source as string) ?? ''} onChange={e => set('source', e.target.value)}
                    className="w-full border border-[#E2DDD6] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0e1a7a]">
                    <option value="">Select…</option>
                    {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Levels Certified</label>
                  <div className="flex flex-col gap-1">
                    {LEVELS.map(l => (
                      <label key={l} className="flex items-center gap-2 text-sm text-[#374151]">
                        <input type="checkbox" className="accent-[#0e1a7a]"
                          checked={(f.levels_certified as string[] ?? []).includes(l)}
                          onChange={e => {
                            const cur = (f.levels_certified as string[]) ?? []
                            set('levels_certified', e.target.checked ? [...cur, l] : cur.filter(x => x !== l))
                          }} />
                        {l}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Role Types (currently holds)</label>
                  <div className="flex flex-wrap gap-1">
                    {ROLE_TYPES.map(r => (
                      <label key={r} className="flex items-center gap-1 text-xs border border-[#E2DDD6] px-2 py-1 cursor-pointer hover:bg-[#FAF9F7]">
                        <input type="checkbox" className="accent-[#0e1a7a]"
                          checked={(f.role_types as string[] ?? []).includes(r)}
                          onChange={e => {
                            const cur = (f.role_types as string[]) ?? []
                            set('role_types', e.target.checked ? [...cur, r] : cur.filter(x => x !== r))
                          }} />
                        {r}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Open To Role Types (growth targets)</label>
                  <div className="flex flex-wrap gap-1">
                    {ROLE_TYPES.map(r => (
                      <label key={r} className="flex items-center gap-1 text-xs border border-[#E2DDD6] px-2 py-1 cursor-pointer hover:bg-[#FAF9F7]">
                        <input type="checkbox" className="accent-[#d6a758]"
                          checked={(f.open_to_role_types as string[] ?? []).includes(r)}
                          onChange={e => {
                            const cur = (f.open_to_role_types as string[]) ?? []
                            set('open_to_role_types', e.target.checked ? [...cur, r] : cur.filter(x => x !== r))
                          }} />
                        {r}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-[#374151]">
                    <input type="checkbox" className="accent-[#0e1a7a]"
                      checked={(f.actively_looking as boolean) ?? false}
                      onChange={e => set('actively_looking', e.target.checked)} />
                    Actively looking for work
                  </label>
                </div>

                <div>
                  <label className="text-[10px] text-[#64748B] uppercase tracking-wide block mb-0.5">Notes</label>
                  <textarea rows={3} value={(f.notes as string) ?? ''} onChange={e => set('notes', e.target.value)}
                    className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] resize-y" />
                </div>

                {saveErr && <p className="text-red-600 text-xs">{saveErr}</p>}
                <div className="flex gap-2">
                  <button onClick={saveEdit} disabled={saving}
                    className="bg-[#0e1a7a] text-white text-sm px-5 py-2 hover:bg-[#060d3a] transition-colors disabled:opacity-50">
                    {saving ? 'Saving…' : 'Save Changes'}
                  </button>
                  <button onClick={() => setEditing(false)}
                    className="border border-[#E2DDD6] text-[#374151] text-sm px-5 py-2 hover:bg-[#FAF9F7] transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Apollo enrich button */}
                <div className="mb-4 flex items-center gap-3">
                  {candidate.email ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#374151]">{candidate.email}</span>
                      {(candidate as unknown as Record<string, unknown>).email_enriched && (
                        <span className="text-[10px] bg-[#f5e8cc] text-[#8A6014] border border-[#d6a758]/40 px-2 py-0.5 font-medium">Enriched via Apollo</span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#94A3B8]">No email on record</span>
                      <button onClick={enrich} disabled={enriching}
                        className="text-xs border border-[#d6a758] text-[#8A6014] px-3 py-1 hover:bg-[#f5e8cc] transition-colors disabled:opacity-50">
                        {enriching ? 'Enriching…' : '⚡ Enrich via Apollo'}
                      </button>
                    </div>
                  )}
                  {!candidate.email && enrichMsg && (
                    <span className={`text-xs ${enrichMsg.startsWith('No match') ? 'text-[#64748B]' : enrichMsg.startsWith('Enriched') ? 'text-green-700' : 'text-red-600'}`}>
                      {enrichMsg}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-x-6">
                  <Field label="Phone" value={candidate.phone} />
                  <Field label="Location" value={[candidate.location_city, candidate.location_state].filter(Boolean).join(', ')} />
                  <Field label="Credential" value={candidate.credential} />
                  <Field label="Training Program" value={candidate.training_program} />
                  <Field label="Years Experience" value={candidate.years_experience} />
                  <Field label="Source" value={candidate.source} />
                  <Field label="Actively Looking" value={candidate.actively_looking ? 'Yes' : 'No'} />
                  <Field label="Added By" value={candidate.added_by} />
                </div>

                <div className="mb-3">
                  <p className="text-[10px] text-[#64748B] uppercase tracking-wide mb-1">Levels Certified</p>
                  <TagList items={candidate.levels_certified ?? []} />
                </div>
                <div className="mb-3">
                  <p className="text-[10px] text-[#64748B] uppercase tracking-wide mb-1">Languages</p>
                  <TagList items={candidate.languages ?? []} />
                </div>
                <div className="mb-3">
                  <p className="text-[10px] text-[#64748B] uppercase tracking-wide mb-1">Role Types (holds)</p>
                  <TagList items={candidate.role_types ?? []} />
                </div>
                <div className="mb-3">
                  <p className="text-[10px] text-[#64748B] uppercase tracking-wide mb-1">Open To Role Types (growth)</p>
                  <div className="flex flex-wrap gap-1">
                    {(candidate.open_to_role_types ?? []).length ? (candidate.open_to_role_types ?? []).map(r => (
                      <span key={r} className="text-[11px] bg-[#f5e8cc] text-[#8A6014] px-2 py-0.5">→ {r}</span>
                    )) : <span className="text-[#94A3B8] text-sm">—</span>}
                  </div>
                </div>
                {candidate.notes && (
                  <div className="mb-3">
                    <p className="text-[10px] text-[#64748B] uppercase tracking-wide mb-1">Notes</p>
                    <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap">{candidate.notes}</p>
                  </div>
                )}
                {candidate.linkedin_url && (
                  <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#0e1a7a] underline hover:text-[#060d3a]">LinkedIn →</a>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Pipeline history ── */}
        {tab === 'pipeline' && (
          <div>
            <h3 className="text-[#64748B] text-xs uppercase tracking-wide mb-3">Pipeline across all searches</h3>
            {pipeline.length === 0 ? (
              <p className="text-sm text-[#94A3B8]">Not in any search pipelines yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {pipeline.map(p => {
                  const s = searchMap[p.search_id]
                  const stage = getPipelineStage(p)
                  return (
                    <div key={p.id} className="border border-[#E2DDD6] p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-[#0e1a7a] text-sm">{s?.school_name ?? 'Unknown School'}</p>
                          <p className="text-xs text-[#64748B]">{s?.position_title} {s?.level ? `· ${s.level}` : ''}</p>
                        </div>
                        <span className="text-[11px] font-medium bg-[#060d3a] text-white px-2 py-0.5 whitespace-nowrap">{stage}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 text-xs text-[#64748B]">
                        {p.date_applied && <span>Applied: {p.date_applied}</span>}
                        {p.interview_date && <span>Interview: {p.interview_date}</span>}
                        {p.interview_score !== null && <span>Score: {p.interview_score}/10</span>}
                        {p.disposition && <span className="text-[#8A6014]">Disposition: {p.disposition}</span>}
                      </div>
                      {p.disposition_notes && (
                        <p className="text-xs text-[#374151] mt-2 italic">{p.disposition_notes}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Interview notes ── */}
        {tab === 'notes' && (
          <div>
            {loadingNotes ? (
              <p className="text-sm text-[#94A3B8]">Loading…</p>
            ) : notes.length === 0 ? (
              <p className="text-sm text-[#94A3B8]">No interview notes recorded yet.</p>
            ) : (
              <div className="flex flex-col gap-5">
                {QUESTION_CATEGORIES.filter(cat => notesByCategory[cat]?.length > 0).map(cat => (
                  <div key={cat}>
                    <h4 className="text-[10px] text-[#8A6014] uppercase tracking-wide font-medium mb-2 border-b border-[#E2DDD6] pb-1">{cat}</h4>
                    <div className="flex flex-col gap-3">
                      {notesByCategory[cat].map(n => (
                        <div key={n.id} className="pl-3 border-l-2 border-[#E2DDD6]">
                          {n.question_text && <p className="text-xs text-[#64748B] mb-0.5 italic">{n.question_text}</p>}
                          <p className="text-sm text-[#374151] leading-relaxed">{n.response_notes || <span className="text-[#94A3B8]">No notes</span>}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── References ── */}
        {tab === 'refs' && (
          <div>
            {loadingRefs ? (
              <p className="text-sm text-[#94A3B8]">Loading…</p>
            ) : refs.length === 0 ? (
              <p className="text-sm text-[#94A3B8]">No references recorded yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {refs.map(r => (
                  <div key={r.id} className="border border-[#E2DDD6] p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-[#0e1a7a] text-sm">{r.reference_name ?? 'Unknown'}</p>
                        <p className="text-xs text-[#64748B]">{r.relationship} {r.how_long_known ? `· known ${r.how_long_known}` : ''}</p>
                      </div>
                      <div className="flex gap-2 text-[11px]">
                        {r.would_rehire !== null && (
                          <span className={`px-2 py-0.5 border ${r.would_rehire ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                            {r.would_rehire ? 'Would rehire' : 'Would not rehire'}
                          </span>
                        )}
                        {r.comfortable_with_children !== null && (
                          <span className={`px-2 py-0.5 border ${r.comfortable_with_children ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                            {r.comfortable_with_children ? 'Safe with children' : 'Concern: children'}
                          </span>
                        )}
                      </div>
                    </div>
                    {r.work_habits_notes && <Field label="Work Habits" value={r.work_habits_notes} />}
                    {r.fit_notes && <Field label="Fit Notes" value={r.fit_notes} />}
                    {r.overall_notes && <Field label="Overall" value={r.overall_notes} />}
                    {r.checked_date && <p className="text-[10px] text-[#94A3B8] mt-2">Checked {r.checked_date} by {r.checked_by}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

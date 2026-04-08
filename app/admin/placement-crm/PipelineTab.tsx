'use client'

import { useState } from 'react'
import { CRMPipelineEntry, KANBAN_STAGES, KanbanStage, getPipelineStage, stageDropUpdates } from './types'

type Props = {
  pipeline: CRMPipelineEntry[]
  adminPw: string
  api: (path: string, opts?: RequestInit) => Promise<Response>
  onRefresh: () => void
}

const STAGE_COLORS: Record<KanbanStage, string> = {
  'Applied':            'border-t-[#94A3B8]',
  'Resume Reviewed':    'border-t-[#6366F1]',
  'Contacted':          'border-t-[#0e1a7a]',
  'Screener Done':      'border-t-[#d6a758]',
  'Interview Scheduled':'border-t-[#F59E0B]',
  'Interview Complete': 'border-t-[#10B981]',
  'Reference Check':    'border-t-[#8B5CF6]',
  'Decision':           'border-t-[#060d3a]',
}

export default function PipelineTab({ pipeline, api, onRefresh }: Props) {
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overStage, setOverStage] = useState<KanbanStage | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [dispositionModal, setDispositionModal] = useState<{ pipelineId: string } | null>(null)
  const [disposition, setDisposition] = useState('')
  const [dispositionNotes, setDispositionNotes] = useState('')

  const byStage = KANBAN_STAGES.reduce((acc, s) => {
    acc[s] = pipeline.filter(p => getPipelineStage(p) === s)
    return acc
  }, {} as Record<KanbanStage, CRMPipelineEntry[]>)

  async function moveCard(pipelineId: string, targetStage: KanbanStage) {
    if (targetStage === 'Decision') {
      setDispositionModal({ pipelineId })
      return
    }
    setUpdating(pipelineId)
    try {
      await api('/api/admin/crm/pipeline', {
        method: 'PATCH',
        body: JSON.stringify({ id: pipelineId, ...stageDropUpdates(targetStage) }),
      })
      onRefresh()
    } finally {
      setUpdating(null)
    }
  }

  async function saveDisposition() {
    if (!dispositionModal) return
    setUpdating(dispositionModal.pipelineId)
    try {
      await api('/api/admin/crm/pipeline', {
        method: 'PATCH',
        body: JSON.stringify({
          id: dispositionModal.pipelineId,
          disposition,
          disposition_notes: dispositionNotes,
          placed: disposition === 'Placed',
          placed_date: disposition === 'Placed' ? new Date().toISOString().slice(0, 10) : null,
        }),
      })
      onRefresh()
      setDispositionModal(null)
      setDisposition('')
      setDispositionNotes('')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div>
      <p className="text-xs text-[#64748B] mb-4">Drag cards between columns to advance a candidate&apos;s stage. Click a card to view the full record.</p>

      <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: '60vh' }}>
        {KANBAN_STAGES.map(stage => (
          <div
            key={stage}
            onDragOver={e => { e.preventDefault(); setOverStage(stage) }}
            onDragLeave={() => setOverStage(null)}
            onDrop={e => {
              e.preventDefault()
              setOverStage(null)
              if (draggingId) moveCard(draggingId, stage)
              setDraggingId(null)
            }}
            className={`flex-shrink-0 w-52 flex flex-col gap-2 transition-colors ${
              overStage === stage ? 'bg-[#F2EDE6]' : ''
            }`}
          >
            {/* Column header */}
            <div className={`bg-white border border-[#E2DDD6] border-t-4 px-3 py-2 ${STAGE_COLORS[stage]}`}>
              <p className="text-xs font-medium text-[#374151] uppercase tracking-wide">{stage}</p>
              <p className="text-[10px] text-[#94A3B8]">{byStage[stage].length}</p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 min-h-[100px]">
              {byStage[stage].map(p => (
                <div
                  key={p.id}
                  draggable
                  onDragStart={() => setDraggingId(p.id)}
                  onDragEnd={() => { setDraggingId(null); setOverStage(null) }}
                  className={`bg-white border border-[#E2DDD6] p-3 cursor-grab active:cursor-grabbing transition-opacity select-none ${
                    draggingId === p.id ? 'opacity-40' : ''
                  } ${updating === p.id ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <p className="font-medium text-[#0e1a7a] text-xs leading-tight mb-1">
                    {p.candidate_name ?? 'Unknown'}
                  </p>
                  <p className="text-[10px] text-[#64748B] leading-tight">
                    {p.search_school_name ?? '—'}
                  </p>
                  {p.search_level && (
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">{p.search_level}</p>
                  )}
                  {p.candidate_credential && (
                    <span className="text-[9px] bg-[#060d3a] text-white px-1.5 py-0.5 mt-1 inline-block">
                      {p.candidate_credential}
                    </span>
                  )}
                  {p.interview_score !== null && (
                    <span className="text-[10px] text-[#d6a758] font-medium ml-2">{p.interview_score}/10</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Disposition modal */}
      {dispositionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md">
            <div className="bg-[#060d3a] px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-semibold" style={{ fontFamily: 'var(--font-cormorant, serif)' }}>Set Final Decision</h3>
              <button onClick={() => setDispositionModal(null)} className="text-white/60 hover:text-white text-xl">&times;</button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-xs text-[#64748B] uppercase tracking-wide block mb-1">Disposition</label>
                <select value={disposition} onChange={e => setDisposition(e.target.value)}
                  className="w-full border border-[#E2DDD6] px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#0e1a7a]">
                  <option value="">Select…</option>
                  {['Placed', 'Not Recommended', 'Withdrew', 'No Response', 'Position Filled by Other', 'On Hold'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-[#64748B] uppercase tracking-wide block mb-1">Notes (optional)</label>
                <textarea rows={3} value={dispositionNotes} onChange={e => setDispositionNotes(e.target.value)}
                  className="w-full border border-[#E2DDD6] px-3 py-2 text-sm focus:outline-none focus:border-[#0e1a7a] resize-none" />
              </div>
              <button onClick={saveDisposition} disabled={!disposition || !!updating}
                className="bg-[#0e1a7a] text-white text-sm px-6 py-3 hover:bg-[#060d3a] transition-colors disabled:opacity-50">
                {updating ? 'Saving…' : 'Save Decision'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

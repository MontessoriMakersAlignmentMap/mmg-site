'use client'

import { useCallback, useEffect, useState } from 'react'

type Stats = {
  raw_sources: {
    total: number
    compiled: number
    uncompiled: number
    by_type: { web: number; drive: number }
  }
  wiki_pages: number
  recent_log: Array<{
    id: string
    ts: string
    action: string
    status: string
    notes: string | null
  }>
}

const NAVY = '#0e1a7a'
const GOLD = '#d6a758'
const LIGHT_GOLD = '#f5e8cc'

export default function SecondBrainAdmin() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [stats, setStats] = useState<Stats | null>(null)
  const [folderIds, setFolderIds] = useState('')
  const [busy, setBusy] = useState<string | null>(null)
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')

  const loadStats = useCallback(async (pw: string) => {
    const res = await fetch('/api/admin/second-brain/stats', {
      headers: { 'x-admin-password': pw },
    })
    if (!res.ok) {
      setError('Unauthorized or failed to load stats.')
      return false
    }
    setStats(await res.json())
    setError('')
    return true
  }, [])

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('sb_pw') : ''
    if (saved) {
      setPassword(saved)
      loadStats(saved).then((ok) => setAuthed(ok))
    }
  }, [loadStats])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const ok = await loadStats(password)
    if (ok) {
      sessionStorage.setItem('sb_pw', password)
      setAuthed(true)
    }
  }

  async function ingestDrive() {
    // Accept raw IDs, full folder URLs, or a mix. Extract the ID segment
    // from any drive.google.com/.../folders/<id>[?...] URL.
    const ids = folderIds
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const urlMatch = s.match(/\/folders\/([A-Za-z0-9_-]+)/)
        return urlMatch ? urlMatch[1] : s
      })
    if (ids.length === 0) {
      setError('Paste one or more Drive folder IDs (or folder URLs) first.')
      return
    }
    setBusy('drive')
    setError('')
    setMessage('')
    try {
      const res = await fetch('/api/admin/second-brain/ingest-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ folderIds: ids }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Ingest failed')
      setMessage(
        `Drive: ${data.stats.ingested} ingested, ${data.stats.updated} updated, ${data.stats.skipped} skipped, ${data.stats.errors} errors (${data.stats.files} files scanned).`
      )
      await loadStats(password)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  async function ingestWeb() {
    setBusy('web')
    setError('')
    setMessage('')
    try {
      const res = await fetch('/api/admin/second-brain/ingest-web', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Ingest failed')
      setMessage(
        `Web: ${data.stats.ingested} ingested, ${data.stats.updated} updated, ${data.stats.skipped} skipped, ${data.stats.errors} errors (${data.stats.total} URLs).`
      )
      await loadStats(password)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  // Compile in a loop until everything is done. Each HTTP round-trip still
  // processes a small batch (5 in parallel on the server, safe for Vercel's
  // function time limit), but the client auto-chains so Hannah clicks once.
  async function compile() {
    setBusy('compile')
    setError('')
    setMessage('')
    let totalCompiled = 0
    let totalErrors = 0
    let batches = 0
    try {
      while (true) {
        const res = await fetch('/api/admin/second-brain/compile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
          body: JSON.stringify({ batchSize: 5 }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Compile failed')

        batches++
        totalCompiled += data.compiled ?? 0
        totalErrors += data.errors?.length ?? 0

        // Live progress — updates between batches so Hannah can watch it tick.
        setMessage(
          `Batch ${batches}: ${totalCompiled} compiled, ${totalErrors} errors, ${data.remaining ?? 0} remaining…`
        )
        await loadStats(password)

        if ((data.remaining ?? 0) === 0 || (data.compiled ?? 0) === 0) break
      }
      setMessage(
        `Done. Compiled ${totalCompiled} sources across ${batches} batches, ${totalErrors} errors.`
      )
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: LIGHT_GOLD, padding: 48 }}>
        <div style={{ maxWidth: 420, margin: '0 auto', backgroundColor: 'white', padding: 32, borderRadius: 8, border: `2px solid ${NAVY}` }}>
          <h1 style={{ color: NAVY, fontSize: 22, fontWeight: 700, marginBottom: 16 }}>MMG Second Brain — Admin</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 4, marginBottom: 12 }}
            />
            <button
              type="submit"
              style={{ width: '100%', padding: 10, backgroundColor: NAVY, color: 'white', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}
            >
              Sign in
            </button>
            {error && <p style={{ color: '#b91c1c', fontSize: 13, marginTop: 12 }}>{error}</p>}
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: LIGHT_GOLD, padding: 32 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ color: NAVY, fontSize: 28, fontWeight: 700, marginBottom: 4 }}>MMG Second Brain</h1>
          <p style={{ color: NAVY, opacity: 0.7, fontSize: 14 }}>
            Karpathy LLM Wiki pattern · raw → compile → query ·{' '}
            <a href="/second-brain" style={{ color: NAVY, textDecoration: 'underline' }}>
              open chat →
            </a>
          </p>
        </header>

        {/* Stats */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          <StatCard label="Raw sources" value={stats?.raw_sources.total ?? 0} />
          <StatCard label="Compiled" value={stats?.raw_sources.compiled ?? 0} />
          <StatCard label="Uncompiled" value={stats?.raw_sources.uncompiled ?? 0} accent />
          <StatCard label="Wiki pages" value={stats?.wiki_pages ?? 0} />
        </section>

        {stats && (
          <p style={{ fontSize: 12, color: NAVY, opacity: 0.6, marginBottom: 24 }}>
            By type — Drive: {stats.raw_sources.by_type.drive} · Web: {stats.raw_sources.by_type.web}
          </p>
        )}

        {/* Actions */}
        <section style={{ backgroundColor: 'white', padding: 24, borderRadius: 8, border: `2px solid ${NAVY}`, marginBottom: 24 }}>
          <h2 style={{ color: NAVY, fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Ingest</h2>

          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 6 }}>
            Google Drive folder IDs or URLs (comma or newline separated)
          </label>
          <textarea
            value={folderIds}
            onChange={(e) => setFolderIds(e.target.value)}
            placeholder="1AbC...xyz, 1DeF...uvw"
            rows={3}
            style={{ width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 4, fontFamily: 'monospace', fontSize: 13 }}
          />
          <p style={{ fontSize: 11, color: '#64748B', marginTop: 6, marginBottom: 12 }}>
            Each folder must be shared (Viewer or higher) with{' '}
            <code>mmg-automations@mmg-automations-493012.iam.gserviceaccount.com</code>. Sub-folders are walked recursively. Works for Hannah&apos;s Drive and info@ folders alike.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Btn onClick={ingestDrive} busy={busy === 'drive'} disabled={!!busy}>
              Ingest Drive
            </Btn>
            <Btn onClick={ingestWeb} busy={busy === 'web'} disabled={!!busy}>
              Ingest Website
            </Btn>
            <Btn onClick={compile} busy={busy === 'compile'} disabled={!!busy} primary>
              Compile all remaining
            </Btn>
          </div>

          {message && (
            <p style={{ marginTop: 16, padding: 10, backgroundColor: LIGHT_GOLD, color: NAVY, borderRadius: 4, fontSize: 13 }}>
              {message}
            </p>
          )}
          {error && (
            <p style={{ marginTop: 16, padding: 10, backgroundColor: '#fee', color: '#b91c1c', borderRadius: 4, fontSize: 13 }}>
              {error}
            </p>
          )}
        </section>

        {/* Recent log */}
        <section style={{ backgroundColor: 'white', padding: 24, borderRadius: 8, border: `2px solid ${NAVY}` }}>
          <h2 style={{ color: NAVY, fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Recent activity</h2>
          <div style={{ fontFamily: 'monospace', fontSize: 12, color: NAVY }}>
            {(stats?.recent_log ?? []).map((row) => (
              <div key={row.id} style={{ padding: '6px 0', borderBottom: `1px solid ${LIGHT_GOLD}` }}>
                <span style={{ opacity: 0.6 }}>{new Date(row.ts).toLocaleString()}</span>{' '}
                <span style={{ fontWeight: 700 }}>{row.action}</span>{' '}
                <span style={{ color: row.status === 'error' ? '#b91c1c' : row.status === 'skipped' ? '#64748B' : GOLD }}>
                  [{row.status}]
                </span>{' '}
                <span>{row.notes}</span>
              </div>
            ))}
            {(!stats?.recent_log || stats.recent_log.length === 0) && (
              <p style={{ opacity: 0.5 }}>No activity yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        border: `2px solid ${accent ? GOLD : NAVY}`,
      }}
    >
      <div style={{ fontSize: 11, color: NAVY, opacity: 0.7, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: NAVY, marginTop: 4 }}>{value}</div>
    </div>
  )
}

function Btn({
  children,
  onClick,
  busy,
  disabled,
  primary,
}: {
  children: React.ReactNode
  onClick: () => void
  busy: boolean
  disabled: boolean
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 16px',
        backgroundColor: primary ? GOLD : NAVY,
        color: primary ? NAVY : 'white',
        border: `2px solid ${primary ? GOLD : NAVY}`,
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {busy ? 'Working…' : children}
    </button>
  )
}

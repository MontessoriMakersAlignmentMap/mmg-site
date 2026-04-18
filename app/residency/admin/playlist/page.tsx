'use client'

import { useEffect, useRef, useState } from 'react'

interface Track {
  title: string
  artist: string
  url: string
  credit: string
}

interface Playlist {
  focus: Track[]
  vibe: Track[]
}

export default function PlaylistAdmin() {
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [activeTab, setActiveTab] = useState<'focus' | 'vibe'>('focus')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  /* New track form */
  const [newTitle, setNewTitle] = useState('')
  const [newArtist, setNewArtist] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newCredit, setNewCredit] = useState('')

  useEffect(() => {
    fetch('/data/mmr-playlist.json')
      .then(r => r.json())
      .then((data: Playlist) => setPlaylist(data))
      .catch(() => {})
  }, [])

  const tracks = playlist?.[activeTab] ?? []

  function addTrack() {
    if (!playlist || !newTitle || !newUrl) return
    const track: Track = {
      title: newTitle,
      artist: newArtist,
      url: newUrl,
      credit: newCredit || `${newArtist} - ${newTitle}`,
    }
    setPlaylist({
      ...playlist,
      [activeTab]: [...playlist[activeTab], track],
    })
    setNewTitle('')
    setNewArtist('')
    setNewUrl('')
    setNewCredit('')
  }

  function removeTrack(idx: number) {
    if (!playlist) return
    setPlaylist({
      ...playlist,
      [activeTab]: playlist[activeTab].filter((_, i) => i !== idx),
    })
  }

  function moveTrack(idx: number, dir: -1 | 1) {
    if (!playlist) return
    const arr = [...playlist[activeTab]]
    const target = idx + dir
    if (target < 0 || target >= arr.length) return
    ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
    setPlaylist({ ...playlist, [activeTab]: arr })
  }

  function preview(url: string) {
    if (previewUrl === url) {
      audioRef.current?.pause()
      setPreviewUrl(null)
      return
    }
    if (audioRef.current) audioRef.current.pause()
    audioRef.current = new Audio(url)
    audioRef.current.volume = 0.5
    audioRef.current.play().catch(() => {})
    setPreviewUrl(url)
    audioRef.current.addEventListener('ended', () => setPreviewUrl(null))
  }

  async function savePlaylist() {
    if (!playlist) return
    setSaving(true)
    try {
      const res = await fetch('/api/residency/playlist', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlist),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch { /* noop */ }
    setSaving(false)
  }

  if (!playlist) {
    return <div className="r-loading" role="status"><span>Loading playlist</span></div>
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Music Playlist</h1>
        <button
          className="r-btn r-btn-primary"
          onClick={savePlaylist}
          disabled={saving}
          style={{ minWidth: 120 }}
        >
          {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <p style={{ color: 'var(--r-text-muted)', fontSize: '0.8125rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Manage the ambient music that plays on the resident portal. <strong>Focus</strong> mode plays during reading and writing tasks.{' '}
        <strong>Vibe</strong> mode plays during reflection and community pages. Changes take effect immediately after saving.
      </p>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 0, marginBottom: '1.5rem', borderBottom: '2px solid var(--r-border)' }}>
        {(['focus', 'vibe'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer',
              fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit',
              background: 'none',
              color: activeTab === tab ? 'var(--r-navy)' : 'var(--r-text-muted)',
              borderBottom: activeTab === tab ? '2px solid var(--r-navy)' : '2px solid transparent',
              marginBottom: -2,
              transition: 'all 0.15s',
            }}
          >
            {tab === 'focus' ? '✏️ Focus' : '♪ Vibe'} ({playlist[tab].length})
          </button>
        ))}
      </div>

      {/* Track list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1.5rem' }}>
        {tracks.map((track, idx) => (
          <div
            key={`${track.url}-${idx}`}
            className="r-card"
            style={{ padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <button
                onClick={() => moveTrack(idx, -1)}
                disabled={idx === 0}
                aria-label="Move up"
                style={{
                  background: 'none', border: 'none', cursor: idx === 0 ? 'default' : 'pointer',
                  color: idx === 0 ? 'var(--r-border)' : 'var(--r-text-muted)', fontSize: 12, padding: 0,
                }}
              >▲</button>
              <button
                onClick={() => moveTrack(idx, 1)}
                disabled={idx === tracks.length - 1}
                aria-label="Move down"
                style={{
                  background: 'none', border: 'none', cursor: idx === tracks.length - 1 ? 'default' : 'pointer',
                  color: idx === tracks.length - 1 ? 'var(--r-border)' : 'var(--r-text-muted)', fontSize: 12, padding: 0,
                }}
              >▼</button>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '0.8125rem' }}>{track.title}</div>
              <div style={{ color: 'var(--r-text-muted)', fontSize: '0.75rem' }}>{track.artist}</div>
              <div style={{ color: 'var(--r-muted)', fontSize: '0.6875rem', marginTop: 2 }}>{track.credit}</div>
            </div>

            <button
              onClick={() => preview(track.url)}
              aria-label={previewUrl === track.url ? 'Stop preview' : 'Preview track'}
              style={{
                background: previewUrl === track.url ? 'var(--r-navy)' : 'var(--r-navy-tint)',
                color: previewUrl === track.url ? '#fff' : 'var(--r-navy)',
                border: 'none', borderRadius: 6, padding: '4px 10px',
                fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {previewUrl === track.url ? '■ Stop' : '▶ Preview'}
            </button>

            <button
              onClick={() => removeTrack(idx)}
              aria-label="Remove track"
              style={{
                background: 'var(--r-error-light)', color: 'var(--r-error)',
                border: 'none', borderRadius: 6, padding: '4px 10px',
                fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Remove
            </button>
          </div>
        ))}

        {tracks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            No tracks in {activeTab} playlist. Add one below.
          </div>
        )}
      </div>

      {/* Add track form */}
      <div className="r-card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.9375rem', marginTop: 0, marginBottom: '1rem' }}>Add Track</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: 4, color: 'var(--r-text-muted)' }}>
              Title *
            </label>
            <input
              className="r-input"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Track title"
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: 4, color: 'var(--r-text-muted)' }}>
              Artist *
            </label>
            <input
              className="r-input"
              value={newArtist}
              onChange={e => setNewArtist(e.target.value)}
              placeholder="Artist name"
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: 4, color: 'var(--r-text-muted)' }}>
            Audio URL *
          </label>
          <input
            className="r-input"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            placeholder="https://files.freemusicarchive.org/..."
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: 4, color: 'var(--r-text-muted)' }}>
            Credit / Attribution
          </label>
          <input
            className="r-input"
            value={newCredit}
            onChange={e => setNewCredit(e.target.value)}
            placeholder="Artist - Title (CC BY 3.0)"
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="r-btn r-btn-primary"
            onClick={addTrack}
            disabled={!newTitle || !newUrl}
          >
            Add to {activeTab === 'focus' ? 'Focus' : 'Vibe'} Playlist
          </button>
          {newUrl && (
            <button
              className="r-btn"
              onClick={() => preview(newUrl)}
              style={{ background: 'var(--r-navy-tint)', color: 'var(--r-navy)', border: 'none' }}
            >
              {previewUrl === newUrl ? '■ Stop' : '▶ Preview'}
            </button>
          )}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--r-warning-light)', borderRadius: 8, fontSize: '0.8125rem', lineHeight: 1.6 }}>
        <strong>Note:</strong> The starter playlist uses Free Music Archive tracks under Creative Commons licenses.
        When MMR is generating tuition revenue, consider upgrading to <a href="https://www.musicbed.com" target="_blank" rel="noopener" style={{ color: 'var(--r-warning)' }}>Musicbed</a> or{' '}
        <a href="https://artlist.io" target="_blank" rel="noopener" style={{ color: 'var(--r-warning)' }}>Artlist</a> (~$200/year)
        for professionally curated catalogs with full commercial licensing.
      </div>
    </div>
  )
}

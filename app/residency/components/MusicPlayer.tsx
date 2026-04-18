'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

/* ─── Types ─────────────────────────────────────────────────────────────── */
type PlaylistMode = 'focus' | 'vibe'

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

/* ─── Page-to-mode mapping ──────────────────────────────────────────────── */
const FOCUS_PATHS = ['/portal', '/portal/lessons', '/portal/albums', '/portal/observations', '/portal/reading-log']
const VIBE_PATHS = ['/portal/progress', '/portal/portfolio', '/portal/practicum', '/portal/sessions', '/portal/board', '/portal/artifacts']

function suggestMode(pathname: string): PlaylistMode {
  if (FOCUS_PATHS.some(p => pathname.endsWith(p))) return 'focus'
  if (VIBE_PATHS.some(p => pathname.endsWith(p))) return 'vibe'
  return 'focus'
}

/* ─── localStorage helpers ──────────────────────────────────────────────── */
const LS_KEY = 'mmr-music'

interface MusicPrefs {
  autoplay: boolean
  volume: number
  dismissed: boolean
  tooltipSeen: boolean
  modeOverrides: Record<string, PlaylistMode>
}

function loadPrefs(): MusicPrefs {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* noop */ }
  return { autoplay: false, volume: 0.5, dismissed: false, tooltipSeen: false, modeOverrides: {} }
}

function savePrefs(prefs: MusicPrefs) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(prefs)) } catch { /* noop */ }
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function MusicPlayer() {
  const pathname = usePathname()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [mode, setMode] = useState<PlaylistMode>('focus')
  const [trackIdx, setTrackIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [mobileSheet, setMobileSheet] = useState(false)
  const [hasEverPlayed, setHasEverPlayed] = useState(false)

  const prefsRef = useRef<MusicPrefs>(loadPrefs())

  /* Load playlist JSON */
  useEffect(() => {
    fetch('/data/mmr-playlist.json')
      .then(r => r.json())
      .then((data: Playlist) => setPlaylist(data))
      .catch(() => {})
  }, [])

  /* Initial setup from prefs */
  useEffect(() => {
    const p = prefsRef.current
    setVolume(p.volume)
    setDismissed(p.dismissed)

    /* Fade-in after 3 seconds */
    const t = setTimeout(() => {
      if (!p.dismissed) {
        setVisible(true)
        if (!p.tooltipSeen) {
          setShowTooltip(true)
          setTimeout(() => setShowTooltip(false), 5000)
          p.tooltipSeen = true
          savePrefs(p)
        }
      }
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  /* Suggest mode based on page, respecting overrides */
  useEffect(() => {
    const p = prefsRef.current
    const pageKey = pathname.replace('/residency', '')
    const suggested = p.modeOverrides[pageKey] || suggestMode(pathname)
    setMode(suggested)
    setTrackIdx(0)
  }, [pathname])

  /* Autoplay on return visit */
  useEffect(() => {
    if (playlist && prefsRef.current.autoplay && !hasEverPlayed) {
      setPlaying(true)
      setHasEverPlayed(true)
    }
  }, [playlist, hasEverPlayed])

  /* Audio engine */
  useEffect(() => {
    if (!playlist) return
    const tracks = playlist[mode]
    if (!tracks.length) return

    const track = tracks[trackIdx % tracks.length]
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener('ended', () => {
        setTrackIdx(prev => prev + 1)
      })
    }
    const audio = audioRef.current
    audio.src = track.url
    audio.volume = volume
    if (playing) {
      audio.play().catch(() => {})
    }
    return () => { audio.pause() }
  }, [playlist, mode, trackIdx, playing, volume])

  /* Keep volume synced */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const currentTrack = playlist?.[mode]?.[trackIdx % (playlist?.[mode]?.length || 1)]

  const togglePlay = useCallback(() => {
    setPlaying(prev => {
      const next = !prev
      if (next && !hasEverPlayed) setHasEverPlayed(true)
      const p = prefsRef.current
      p.autoplay = next
      savePrefs(p)
      if (next) {
        audioRef.current?.play().catch(() => {})
      } else {
        audioRef.current?.pause()
      }
      return next
    })
  }, [hasEverPlayed])

  const skip = useCallback(() => {
    setTrackIdx(prev => prev + 1)
  }, [])

  const switchMode = useCallback((m: PlaylistMode) => {
    setMode(m)
    setTrackIdx(0)
    const p = prefsRef.current
    const pageKey = pathname.replace('/residency', '')
    p.modeOverrides[pageKey] = m
    savePrefs(p)
  }, [pathname])

  const handleVolumeChange = useCallback((v: number) => {
    setVolume(v)
    const p = prefsRef.current
    p.volume = v
    savePrefs(p)
  }, [])

  const dismiss = useCallback(() => {
    setDismissed(true)
    setPlaying(false)
    audioRef.current?.pause()
    const p = prefsRef.current
    p.dismissed = true
    p.autoplay = false
    savePrefs(p)
  }, [])

  const restore = useCallback(() => {
    setDismissed(false)
    setVisible(true)
    const p = prefsRef.current
    p.dismissed = false
    savePrefs(p)
  }, [])

  if (!playlist) return null

  /* ─── Mobile: floating button + bottom sheet ──────────────────────────── */
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  if (dismissed) {
    return (
      <button
        onClick={restore}
        aria-label="Show music player"
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9998,
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--r-navy, #0e1a7a)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0.4, transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}
      >
        <MusicNoteIcon size={14} color="#d6a758" />
      </button>
    )
  }

  if (!visible) return null

  /* ─── Desktop pill player ─────────────────────────────────────────────── */
  return (
    <>
      {/* Tooltip */}
      {showTooltip && (
        <div
          role="tooltip"
          style={{
            position: 'fixed', bottom: 90, right: 20, zIndex: 10001,
            background: 'var(--r-navy, #0e1a7a)', color: '#fff',
            padding: '10px 16px', borderRadius: 10, fontSize: 12,
            maxWidth: 220, lineHeight: 1.5,
            fontFamily: 'var(--r-font-body, system-ui)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            animation: 'mmr-fade-in 0.4s ease',
          }}
        >
          <span style={{ fontStyle: 'italic', fontWeight: 600, color: '#d6a758' }}>This is MMR.</span>{' '}
          We set the mood. Click to play.
          <div style={{
            position: 'absolute', bottom: -6, right: 24,
            width: 12, height: 12, background: 'var(--r-navy, #0e1a7a)',
            transform: 'rotate(45deg)',
          }} />
        </div>
      )}

      {/* Mobile bottom sheet overlay */}
      {mobileSheet && (
        <div
          onClick={() => setMobileSheet(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.4)',
          }}
        />
      )}

      {/* Mobile: FAB button */}
      {isMobile && !mobileSheet && (
        <button
          onClick={() => setMobileSheet(true)}
          aria-label={playing ? 'Music playing — tap to expand' : 'Open music player'}
          style={{
            position: 'fixed', bottom: 20, right: 20, zIndex: 10000,
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--r-navy, #0e1a7a)', border: '2px solid #d6a758',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          }}
        >
          {playing ? <Equalizer /> : <MusicNoteIcon size={18} color="#d6a758" />}
        </button>
      )}

      {/* Mobile bottom sheet */}
      {isMobile && mobileSheet && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000,
          background: 'var(--r-navy, #0e1a7a)', borderRadius: '16px 16px 0 0',
          padding: '20px 20px 32px', color: '#fff',
          fontFamily: 'var(--r-font-body, system-ui)',
          animation: 'mmr-slide-up 0.25s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.3)' }} />
          </div>
          <PlayerControls
            currentTrack={currentTrack}
            playing={playing}
            mode={mode}
            volume={volume}
            onTogglePlay={togglePlay}
            onSkip={skip}
            onSwitchMode={switchMode}
            onVolumeChange={handleVolumeChange}
            onDismiss={dismiss}
            expanded
          />
        </div>
      )}

      {/* Desktop: pill player */}
      {!isMobile && (
        <div
          role="region"
          aria-label="Music player"
          style={{
            position: 'fixed', bottom: 20, right: 20, zIndex: 10000,
            background: 'var(--r-navy, #0e1a7a)',
            borderRadius: expanded ? 16 : 32,
            width: expanded ? 300 : 280,
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            transition: 'all 0.25s ease',
            fontFamily: 'var(--r-font-body, system-ui)',
            border: expanded ? '1px solid rgba(214,167,88,0.3)' : 'none',
            animation: 'mmr-fade-in 0.4s ease',
          }}
        >
          {/* Collapsed bar */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 16px', cursor: 'pointer',
            }}
            onClick={() => setExpanded(!expanded)}
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse music player' : 'Expand music player'}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded) } }}
          >
            <div style={{ flexShrink: 0, width: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {playing ? <Equalizer /> : <MusicNoteIcon size={16} color="#d6a758" />}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                color: '#fff', fontSize: 11, fontWeight: 600,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {currentTrack?.title || 'MMR Music'}
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.6)', fontSize: 10,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {currentTrack?.artist || ''}
              </div>
            </div>

            <button
              onClick={e => { e.stopPropagation(); togglePlay() }}
              aria-label={playing ? 'Pause' : 'Play'}
              style={{
                flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
                background: '#d6a758', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            <div style={{
              flexShrink: 0, color: 'rgba(255,255,255,0.5)', fontSize: 14,
              transition: 'transform 0.2s',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}>
              ▾
            </div>
          </div>

          {/* Expanded controls */}
          {expanded && (
            <div style={{ padding: '0 16px 14px' }}>
              <PlayerControls
                currentTrack={currentTrack}
                playing={playing}
                mode={mode}
                volume={volume}
                onTogglePlay={togglePlay}
                onSkip={skip}
                onSwitchMode={switchMode}
                onVolumeChange={handleVolumeChange}
                onDismiss={dismiss}
                expanded={false}
              />
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes mmr-fade-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes mmr-slide-up { from { transform: translateY(100%) } to { transform: translateY(0) } }
        @keyframes mmr-eq-pulse { 0%, 100% { height: 4px } 50% { height: 14px } }
      `}</style>
    </>
  )
}

/* ─── Sub-components ────────────────────────────────────────────────────── */

function PlayerControls({
  currentTrack, playing, mode, volume,
  onTogglePlay, onSkip, onSwitchMode, onVolumeChange, onDismiss,
  expanded,
}: {
  currentTrack: Track | undefined
  playing: boolean
  mode: PlaylistMode
  volume: number
  onTogglePlay: () => void
  onSkip: () => void
  onSwitchMode: (m: PlaylistMode) => void
  onVolumeChange: (v: number) => void
  onDismiss: () => void
  expanded: boolean
}) {
  return (
    <div>
      {/* Mode selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <ModeButton
          label="Focus"
          icon={<PencilIcon />}
          active={mode === 'focus'}
          onClick={() => onSwitchMode('focus')}
        />
        <ModeButton
          label="Vibe"
          icon={<MusicNoteIcon size={12} color={mode === 'vibe' ? '#0e1a7a' : '#d6a758'} />}
          active={mode === 'vibe'}
          onClick={() => onSwitchMode('vibe')}
        />
      </div>

      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>♪</span>
        <input
          type="range"
          min={0} max={1} step={0.05}
          value={volume}
          onChange={e => onVolumeChange(parseFloat(e.target.value))}
          aria-label="Volume"
          style={{
            flex: 1, height: 4, accentColor: '#d6a758',
            WebkitAppearance: 'none', appearance: 'none',
            background: `linear-gradient(to right, #d6a758 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
            borderRadius: 2, outline: 'none', cursor: 'pointer',
          }}
        />
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>♫</span>
      </div>

      {/* Skip + dismiss */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onSkip}
          aria-label="Skip track"
          style={{
            background: 'none', border: '1px solid rgba(214,167,88,0.3)',
            color: '#d6a758', borderRadius: 6, padding: '4px 12px',
            fontSize: 11, cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          Skip ⟫
        </button>

        {currentTrack && (
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentTrack.credit.split('(')[0]?.trim()}
          </span>
        )}

        <button
          onClick={onDismiss}
          aria-label="Hide music player (Alt+M to restore)"
          title="Hide player"
          style={{
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.3)', fontSize: 14,
            cursor: 'pointer', padding: '4px',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

function ModeButton({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${label} mode`}
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        padding: '6px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
        fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
        background: active ? '#d6a758' : 'rgba(255,255,255,0.08)',
        color: active ? '#0e1a7a' : '#d6a758',
        transition: 'all 0.15s',
      }}
    >
      {icon} {label}
    </button>
  )
}

/* ─── Icons ─────────────────────────────────────────────────────────────── */

function Equalizer() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }} aria-hidden="true">
      {[0, 0.2, 0.1].map((delay, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 1.5, background: '#d6a758',
          animation: `mmr-eq-pulse 0.8s ease-in-out ${delay}s infinite`,
        }} />
      ))}
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3.5 1.75L11.5 7L3.5 12.25V1.75Z" fill="#0e1a7a" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="3" y="2" width="3" height="10" rx="1" fill="#0e1a7a" />
      <rect x="8" y="2" width="3" height="10" rx="1" fill="#0e1a7a" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MusicNoteIcon({ size = 14, color = '#d6a758' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5 11V3L12 1.5V9.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="3.5" cy="11" r="1.5" stroke={color} strokeWidth="1.2" />
      <circle cx="10.5" cy="9.5" r="1.5" stroke={color} strokeWidth="1.2" />
    </svg>
  )
}

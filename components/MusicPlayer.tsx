'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { PLAYLIST } from '@/lib/playlist'

const LS_WAS_PLAYING = 'mmg_player_was_playing'
const LS_TOOLTIP_SHOWN = 'mmg_player_tooltip_shown'
const LS_TRACK_INDEX = 'mmg_player_track_index'

// ── Icon sub-components ────────────────────────────────────────────────────────

function Equalizer() {
  return (
    <div className="flex items-end gap-[2px] h-4" aria-hidden>
      <span className="eq-bar eq-bar-1 w-[3px] rounded-sm bg-[#d6a758] h-full inline-block" />
      <span className="eq-bar eq-bar-2 w-[3px] rounded-sm bg-[#d6a758] h-full inline-block" />
      <span className="eq-bar eq-bar-3 w-[3px] rounded-sm bg-[#d6a758] h-full inline-block" />
    </div>
  )
}

function MusicNoteIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#d6a758]">
      <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}

function SkipIcon() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
    </svg>
  )
}

function ChevronIcon({ up }: { up: boolean }) {
  return (
    <svg
      aria-hidden
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      className={`transition-transform duration-200 ${up ? 'rotate-180' : ''}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function VolumeIcon() {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/40 flex-shrink-0">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(false)

  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipFading, setTooltipFading] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)

  // Keep ref in sync with state (needed in callbacks that close over stale state)
  useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])

  const track = PLAYLIST[trackIndex]

  // Init audio on mount
  useEffect(() => {
    const savedIndex = parseInt(localStorage.getItem(LS_TRACK_INDEX) ?? '0', 10)
    const startIndex = !isNaN(savedIndex) && savedIndex < PLAYLIST.length ? savedIndex : 0
    setTrackIndex(startIndex)

    const audio = new Audio(PLAYLIST[startIndex].url)
    audio.volume = 0.7
    audio.preload = 'metadata'
    audioRef.current = audio

    // Autoplay on return visit if was playing
    if (localStorage.getItem(LS_WAS_PLAYING) === 'true') {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    }

    return () => { audio.pause() }
  }, [])

  // Update audio src when track changes (after mount)
  const isMounted = useRef(false)
  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return }
    if (!audioRef.current) return
    audioRef.current.src = PLAYLIST[trackIndex].url
    audioRef.current.load()
    if (isPlayingRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }, [trackIndex])

  // Volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // Fade in after 3s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  // Tooltip: first visit only
  useEffect(() => {
    if (!visible) return
    if (localStorage.getItem(LS_TOOLTIP_SHOWN)) return
    localStorage.setItem(LS_TOOLTIP_SHOWN, '1')
    setShowTooltip(true)
    const fadeT = setTimeout(() => setTooltipFading(true), 3500)
    const hideT = setTimeout(() => setShowTooltip(false), 4000)
    return () => { clearTimeout(fadeT); clearTimeout(hideT) }
  }, [visible])

  // Save state on page unload
  useEffect(() => {
    const save = () => {
      localStorage.setItem(LS_WAS_PLAYING, String(isPlayingRef.current))
      localStorage.setItem(LS_TRACK_INDEX, String(trackIndex))
    }
    window.addEventListener('beforeunload', save)
    return () => window.removeEventListener('beforeunload', save)
  }, [trackIndex])

  // Auto-advance on track end
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => setTrackIndex(i => (i + 1) % PLAYLIST.length)
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlayingRef.current) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [])

  const skipTrack = useCallback(() => {
    setTrackIndex(i => (i + 1) % PLAYLIST.length)
  }, [])

  const dismiss = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
    setDismissed(true)
  }, [])

  if (dismissed) return null

  // ── Shared controls (used in both desktop and mobile sheet) ────────────────

  const AttribLine = () => (
    <p className="text-white/30 text-[9px] leading-relaxed mt-3 pt-3 border-t border-white/10">
      Music: {track.title} by {track.artist} via Free Music Archive · {track.license}
    </p>
  )

  return (
    <>
      {/* ── Desktop pill (sm and up) ─────────────────────────────────────────── */}
      <div
        role="region"
        aria-label="Ambient music player"
        className={`fixed bottom-6 right-6 z-50 hidden sm:block transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        {/* Tooltip */}
        {showTooltip && (
          <p
            aria-live="polite"
            className={`absolute -top-8 right-2 text-[#d6a758] text-[11px] tracking-wide whitespace-nowrap transition-opacity duration-500 ${
              tooltipFading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Set the mood.
          </p>
        )}

        {/* Pill container */}
        <div
          className="bg-[#0e1a7a] shadow-2xl overflow-hidden"
          style={{ borderRadius: 40, width: 280 }}
        >
          {/* Main row */}
          <div className="flex items-center gap-2.5 px-4 h-16">
            {/* Equalizer / note */}
            <div className="flex-shrink-0 w-6 flex items-center justify-center">
              {isPlaying ? <Equalizer /> : <MusicNoteIcon />}
            </div>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-[11px] font-medium leading-tight truncate">{track.title}</p>
              <p className="text-white/45 text-[10px] leading-tight truncate">{track.artist}</p>
            </div>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-[#d6a758] hover:text-[#f0d9a1] transition-colors"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/* Expand chevron */}
            <button
              onClick={() => setIsExpanded(e => !e)}
              aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
              aria-expanded={isExpanded}
              className="flex-shrink-0 text-white/40 hover:text-white/70 transition-colors"
            >
              <ChevronIcon up={isExpanded} />
            </button>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              aria-label="Dismiss music player"
              className="flex-shrink-0 text-white/30 hover:text-white/60 transition-colors"
            >
              <XIcon />
            </button>
          </div>

          {/* Expanded panel */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-4 pb-4 border-t border-white/10">
              {/* Volume */}
              <div className="flex items-center gap-2 mt-3">
                <VolumeIcon />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  aria-label="Volume"
                  className="flex-1 h-[3px] accent-[#d6a758] cursor-pointer"
                />
              </div>

              {/* Skip */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={skipTrack}
                  aria-label="Skip to next track"
                  className="text-white/45 hover:text-white/80 transition-colors text-[10px] flex items-center gap-1"
                >
                  <SkipIcon />
                  <span>Next track</span>
                </button>
              </div>

              <AttribLine />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile floating button (below sm) ───────────────────────────────── */}
      <div
        className={`fixed bottom-6 right-6 z-50 sm:hidden transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setMobileSheetOpen(true)}
          aria-label="Open music player"
          className="w-12 h-12 rounded-full bg-[#0e1a7a] shadow-2xl flex items-center justify-center"
        >
          {isPlaying ? <Equalizer /> : <MusicNoteIcon />}
        </button>
      </div>

      {/* ── Mobile bottom sheet ──────────────────────────────────────────────── */}
      {mobileSheetOpen && (
        <div className="fixed inset-0 z-50 sm:hidden" role="dialog" aria-label="Music player">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileSheetOpen(false)}
            aria-hidden
          />
          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#0e1a7a] rounded-t-3xl p-6 pb-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white font-medium">{track.title}</p>
                <p className="text-white/50 text-sm mt-0.5">{track.artist}</p>
              </div>
              <button
                onClick={() => setMobileSheetOpen(false)}
                aria-label="Close music player"
                className="text-white/50 hover:text-white transition-colors mt-0.5"
              >
                <XIcon />
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
                className="w-12 h-12 rounded-full border border-[#d6a758] flex items-center justify-center text-[#d6a758] hover:bg-[#d6a758]/10 transition-colors"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                onClick={skipTrack}
                aria-label="Skip to next track"
                className="text-white/50 hover:text-white transition-colors"
              >
                <SkipIcon />
              </button>
              <div className="flex flex-1 items-center gap-2">
                <VolumeIcon />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={e => setVolume(parseFloat(e.target.value))}
                  aria-label="Volume"
                  className="flex-1 accent-[#d6a758] cursor-pointer"
                />
              </div>
            </div>

            <AttribLine />
          </div>
        </div>
      )}
    </>
  )
}

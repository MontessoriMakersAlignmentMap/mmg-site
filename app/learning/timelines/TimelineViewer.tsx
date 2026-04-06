'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface TimelineViewerProps {
  src: string
  alt: string
  isCircular?: boolean
}

export function TimelineViewer({ src, alt, isCircular = false }: TimelineViewerProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  return (
    <>
      {/* Thumbnail — click to open */}
      <button
        onClick={() => setOpen(true)}
        className="relative w-full group focus:outline-none"
        aria-label={`Zoom in on ${alt}`}
      >
        <div className={`relative w-full bg-white border border-[#E2DDD6] overflow-hidden ${isCircular ? 'max-w-sm mx-auto aspect-square' : 'aspect-[36/14]'}`}>
          <Image
            src={src}
            alt={alt}
            fill
            className={`${isCircular ? 'object-contain p-4' : 'object-contain'} transition-opacity group-hover:opacity-90`}
            unoptimized
          />
          {/* Zoom hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
            <div className="bg-white/90 text-[#0e1a7a] text-xs font-medium px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              Click to zoom
            </div>
          </div>
        </div>
      </button>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 rounded p-2"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Hint */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">
            Scroll to pan · Press Esc or click outside to close
          </p>

          {/* Image container — scrollable for wide strips */}
          <div
            className={`relative overflow-auto max-h-[90vh] ${isCircular ? 'max-w-[90vmin]' : 'max-w-[95vw]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className={isCircular ? 'w-full h-auto max-h-[85vh] object-contain' : 'h-[80vh] w-auto max-w-none'}
              style={{ display: 'block' }}
            />
          </div>
        </div>
      )}
    </>
  )
}

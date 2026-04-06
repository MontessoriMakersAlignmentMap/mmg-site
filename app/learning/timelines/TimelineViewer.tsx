'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

interface TimelineViewerProps {
  src: string
  alt: string
  isCircular?: boolean
}

export function TimelineViewer({ src, alt, isCircular = false }: TimelineViewerProps) {
  const [open, setOpen] = useState(false)
  const transformRef = useRef<any>(null)

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

      {/* Lightbox with pan + zoom */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center"
          onClick={close}
        >
          {/* Top bar */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zoom controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => transformRef.current?.zoomIn()}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded p-2 transition-colors"
                aria-label="Zoom in"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <button
                onClick={() => transformRef.current?.zoomOut()}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded p-2 transition-colors"
                aria-label="Zoom out"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <button
                onClick={() => transformRef.current?.resetTransform()}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded px-3 py-2 text-xs transition-colors"
                aria-label="Reset zoom"
              >
                Reset
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={close}
              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded p-2 transition-colors"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Hint */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs whitespace-nowrap z-10 pointer-events-none">
            Scroll or pinch to zoom · Drag to pan · Esc to close
          </p>

          {/* Pan + zoom container */}
          <div
            className="w-full h-full pt-14 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <TransformWrapper
              ref={transformRef}
              initialScale={isCircular ? 1 : 0.9}
              minScale={0.25}
              maxScale={8}
              centerOnInit
              wheel={{ step: 0.15 }}
              doubleClick={{ mode: 'zoomIn', step: 1 }}
            >
              <TransformComponent
                wrapperStyle={{ width: '100%', height: '100%' }}
                contentStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{
                    display: 'block',
                    maxWidth: isCircular ? '80vmin' : 'none',
                    maxHeight: isCircular ? '80vmin' : 'none',
                    width: isCircular ? 'auto' : undefined,
                    height: isCircular ? 'auto' : '80vh',
                    objectFit: 'contain',
                  }}
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}
    </>
  )
}

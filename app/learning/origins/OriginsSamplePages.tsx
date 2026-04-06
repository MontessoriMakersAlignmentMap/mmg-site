'use client'

import { useState } from 'react'
import Image from 'next/image'

const pages = [
  { key: 'universe', label: 'Origins of the Universe', rotate: '-rotate-3',  translate: 'md:translate-y-4'  },
  { key: 'life',     label: 'Origins of Life',          rotate: 'rotate-2',   translate: 'md:-translate-y-6' },
  { key: 'humanity', label: 'Origins of Humanity',      rotate: '-rotate-1',  translate: 'md:translate-y-8'  },
  { key: 'writing',  label: 'Origins of Writing',       rotate: 'rotate-3',   translate: 'md:-translate-y-2' },
  { key: 'math',     label: 'Origins of Mathematics',   rotate: '-rotate-2',  translate: 'md:translate-y-6'  },
]

export default function OriginsSamplePages() {
  const [open, setOpen] = useState<string | null>(null)
  const active = pages.find(p => p.key === open)

  return (
    <>
      {/* Scattered thumbnails */}
      <div className="relative flex flex-wrap justify-center gap-6 md:gap-0 md:flex-nowrap md:items-end md:h-[420px]">
        {pages.map((item, i) => (
          <button
            key={item.key}
            onClick={() => setOpen(item.key)}
            className={`relative flex-shrink-0 w-[160px] md:w-[200px] ${item.rotate} ${item.translate} transition-transform duration-300 hover:scale-105 hover:z-50 hover:rotate-0 cursor-zoom-in focus:outline-none`}
            style={{ zIndex: i === 2 ? 30 : i % 2 === 0 ? 10 : 20 }}
            aria-label={`View sample page from ${item.label}`}
          >
            <div className="shadow-xl border border-[#D4CEC6]">
              <Image
                src={`/learning/origins/origins-sample-${item.key}.png`}
                alt={`Sample page from ${item.label}`}
                width={612}
                height={792}
                className="w-full h-auto block"
              />
            </div>
            <p className="mt-2 text-center text-[10px] text-[#64748B] tracking-[0.1em] uppercase leading-tight">
              {item.label}
            </p>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpen(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0e1a7a]/85 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative max-w-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm tracking-wide transition-colors"
              aria-label="Close"
            >
              Close ✕
            </button>

            {/* Image */}
            <div className="shadow-2xl border border-white/20 bg-white">
              <Image
                src={`/learning/origins/origins-sample-${open}.png`}
                alt={`Sample page from ${active.label}`}
                width={612}
                height={792}
                className="w-full h-auto block"
              />
            </div>

            {/* Caption + prev/next */}
            <div className="flex items-center justify-between mt-4 px-1">
              <button
                onClick={() => {
                  const idx = pages.findIndex(p => p.key === open)
                  setOpen(pages[(idx - 1 + pages.length) % pages.length].key)
                }}
                className="text-white/60 hover:text-white text-sm tracking-wide transition-colors"
              >
                ← Prev
              </button>
              <p className="text-white/80 text-xs tracking-[0.12em] uppercase text-center">
                {active.label}
              </p>
              <button
                onClick={() => {
                  const idx = pages.findIndex(p => p.key === open)
                  setOpen(pages[(idx + 1) % pages.length].key)
                }}
                className="text-white/60 hover:text-white text-sm tracking-wide transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

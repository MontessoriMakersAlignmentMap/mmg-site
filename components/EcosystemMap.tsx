'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import { Logo, type LogoName } from '@/components/Logo'

const SIZE = 164          // face size in px
const HALF = SIZE / 2     // translateZ distance

const FACES: {
  id: string
  name: string
  logo: LogoName
  href: string
  tagline: string
  transform: string
}[] = [
  {
    id: 'advisory',
    name: 'Advisory',
    logo: 'advisory',
    href: '/advisory',
    tagline: 'Consulting & alignment',
    transform: `translateZ(${HALF}px)`,
  },
  {
    id: 'matchhub',
    name: 'MatchHub',
    logo: 'matchhub',
    href: '/matchhub',
    tagline: 'Montessori hiring',
    transform: `rotateY(180deg) translateZ(${HALF}px)`,
  },
  {
    id: 'learning',
    name: 'Learning',
    logo: 'learning',
    href: '/learning',
    tagline: 'Curriculum & materials',
    transform: `rotateY(90deg) translateZ(${HALF}px)`,
  },
  {
    id: 'toolbox',
    name: 'Toolbox',
    logo: 'toolbox',
    href: '/toolbox',
    tagline: 'Templates & frameworks',
    transform: `rotateY(-90deg) translateZ(${HALF}px)`,
  },
  {
    id: 'institute',
    name: 'Institute',
    logo: 'institute',
    href: '/institute',
    tagline: 'Leadership formation',
    transform: `rotateX(-90deg) translateZ(${HALF}px)`,
  },
  {
    id: 'studio',
    name: 'Studio',
    logo: 'studio',
    href: '/studio',
    tagline: 'Web & communication',
    transform: `rotateX(90deg) translateZ(${HALF}px)`,
  },
]

export function EcosystemMap() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const [paused, setPaused] = useState(false)

  return (
    <div ref={ref} className="flex flex-col items-center gap-10 select-none">
      <style>{`
        @keyframes mmgCubeRotate {
          0%   { transform: rotateX(-20deg) rotateY(0deg); }
          100% { transform: rotateX(-20deg) rotateY(360deg); }
        }
      `}</style>

      {/* ── 3D Scene ──────────────────────────────────────────────────────── */}
      <div
        style={{
          perspective: 640,
          width: SIZE * 2.4,
          height: SIZE * 2.4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade-in wrapper */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.85)',
            transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Cube */}
          <div
            style={{
              width: SIZE,
              height: SIZE,
              position: 'relative',
              transformStyle: 'preserve-3d',
              animation: 'mmgCubeRotate 32s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {FACES.map((face) => (
              <Link key={face.id} href={face.href} tabIndex={-1}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transform: face.transform,
                    background: '#0e1a7a',
                    border: '1.5px solid #d6a758',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    backfaceVisibility: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  {/* Logo on white square — matches existing square nodes */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(214,167,88,0.35)',
                    }}
                  >
                    <Logo name={face.logo} size={26} />
                  </div>

                  {/* Service name */}
                  <span
                    style={{
                      color: '#d6a758',
                      fontSize: 9.5,
                      letterSpacing: '0.18em',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {face.name}
                  </span>

                  {/* Tagline */}
                  <span
                    style={{
                      color: 'rgba(148,163,184,0.8)',
                      fontSize: 8.5,
                      letterSpacing: '0.04em',
                      textAlign: 'center',
                      padding: '0 14px',
                      lineHeight: 1.4,
                    }}
                  >
                    {face.tagline}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── MMAP node below ───────────────────────────────────────────────── */}
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s',
        }}
      >
        <Link href="/mmap" className="flex flex-col items-center gap-2 group">
          <div
            style={{
              width: 48,
              height: 48,
              background: '#fff',
              border: '1px solid #E2DDD6',
              boxShadow: '0 1px 5px rgba(0,0,0,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.18s, box-shadow 0.18s',
            }}
            className="group-hover:border-[#d6a758] group-hover:shadow-[0_4px_18px_rgba(214,167,88,0.25)]"
          >
            <Logo name="mmap" size={22} />
          </div>
          <span className="text-[#0e1a7a] text-[9px] font-semibold tracking-[0.14em] uppercase">
            MMAP
          </span>
          <span className="text-[#64748B] text-[8px] tracking-wide">
            School operating system
          </span>
        </Link>
      </div>
    </div>
  )
}

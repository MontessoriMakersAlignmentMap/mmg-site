'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Cube sizes ────────────────────────────────────────────────────────────────

const S = 58   // side length px
const H = S / 2

// ─── Cube face styles per brand ───────────────────────────────────────────────

type CubeStyle = 'gold' | 'white' | 'white-gold'

const FACE_COLORS: Record<CubeStyle, Record<string, string>> = {
  // MMG / Institute / MatchHub — warm gold tones from the logo
  gold: {
    top:    '#EDD07C',
    front:  '#CF9C38',
    back:   '#A87428',
    left:   '#CF9C38',
    right:  '#A87428',
    bottom: '#7A5418',
  },
  // Advisory / MMAP / MMAS / Toolbox / Learning — white with navy shadow faces
  white: {
    top:    '#FFFFFF',
    front:  '#E8ECF5',
    back:   '#B8C0D8',
    left:   '#E8ECF5',
    right:  '#B8C0D8',
    bottom: '#98A0B8',
  },
  // Studio — white faces, gold edge outlines
  'white-gold': {
    top:    '#FFFEF8',
    front:  '#FFFCF0',
    back:   '#F0EAD0',
    left:   '#FFFCF0',
    right:  '#F0EAD0',
    bottom: '#D8CCA8',
  },
}

const FACE_TRANSFORMS = [
  { key: 'front',  transform: `translateZ(${H}px)` },
  { key: 'back',   transform: `rotateY(180deg) translateZ(${H}px)` },
  { key: 'left',   transform: `rotateY(-90deg) translateZ(${H}px)` },
  { key: 'right',  transform: `rotateY(90deg) translateZ(${H}px)` },
  { key: 'top',    transform: `rotateX(90deg) translateZ(${H}px)` },
  { key: 'bottom', transform: `rotateX(-90deg) translateZ(${H}px)` },
]

// ─── Route → cube style ────────────────────────────────────────────────────────

function getCubeStyle(pathname: string): CubeStyle {
  if (pathname.startsWith('/institute'))    return 'gold'
  if (pathname.startsWith('/matchhub'))     return 'gold'
  if (pathname.startsWith('/advisory'))     return 'white'
  if (pathname.startsWith('/mmap'))         return 'white'
  if (pathname.startsWith('/mmas'))         return 'white'
  if (pathname.startsWith('/toolbox'))      return 'white'
  if (pathname.startsWith('/learning'))     return 'white'
  if (pathname.startsWith('/studio'))       return 'white-gold'
  return 'gold' // home, about, contact, insights, etc.
}

// ─── Inner rotating cube ───────────────────────────────────────────────────────

function RotatingCube({ style }: { style: CubeStyle }) {
  const colors = FACE_COLORS[style]
  const isGoldEdge = style === 'white-gold'

  return (
    <div style={{ width: S, height: S, perspective: 200 }}>
      <motion.div
        style={{
          width: S,
          height: S,
          position: 'relative',
          transformStyle: 'preserve-3d',
          rotateX: -28,
        }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      >
        {FACE_TRANSFORMS.map(({ key, transform }) => (
          <div
            key={key}
            style={{
              position: 'absolute',
              inset: 0,
              background: colors[key],
              transform,
              boxShadow: isGoldEdge
                ? 'inset 0 0 0 1px rgba(214,167,88,0.60)'
                : 'inset 0 0 0 0.5px rgba(255,255,255,0.18)',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

// ─── Exported component ────────────────────────────────────────────────────────

export function BrandCube() {
  const pathname = usePathname()
  const style = getCubeStyle(pathname)

  // Fade out when user scrolls past the hero zone (~500px)
  const [inHero, setInHero] = useState(true)

  useEffect(() => {
    setInHero(true) // reset on route change — slide in fresh
    function onScroll() {
      setInHero(window.scrollY < 480)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const dropShadow =
    style === 'gold'
      ? 'drop-shadow(0 4px 14px rgba(214,167,88,0.40))'
      : style === 'white-gold'
      ? 'drop-shadow(0 4px 14px rgba(214,167,88,0.28))'
      : 'drop-shadow(0 4px 14px rgba(14,26,122,0.22))'

  return (
    // Only show on large screens with a fine pointer (desktop)
    <div className="hidden lg:block [@media(pointer:coarse)]:hidden">
      <AnimatePresence mode="wait">
        {inHero && (
          <motion.div
            key={style + pathname}
            className="fixed top-[7.5rem] right-8 z-40 pointer-events-none"
            style={{ filter: dropShadow }}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <RotatingCube style={style} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function useMobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return { open, setOpen, toggle: () => setOpen(o => !o) }
}

export function MobileNavToggle({ open, toggle }: { open: boolean; toggle: () => void }) {
  return (
    <button className="r-mobile-toggle" onClick={toggle} aria-label={open ? 'Close menu' : 'Open menu'}>
      {open ? '\u2715' : '\u2630'}
    </button>
  )
}

export function MobileOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`r-mobile-overlay${open ? ' open' : ''}`}
      onClick={onClose}
    />
  )
}

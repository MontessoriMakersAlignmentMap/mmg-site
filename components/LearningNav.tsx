'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Shop All', href: '/learning' },
  { label: 'Decodable Books', href: '/learning/decodable-books' },
  { label: 'Reading Assessment Hub', href: '/learning/reading-assessment' },
  { label: 'Courses', href: '/learning/courses' },
  { label: 'Origins Series', href: '/learning/origins' },
  { label: 'Maps', href: '/learning/maps' },
  { label: 'Timelines', href: '/learning/timelines' },
  { label: 'Family Education', href: '/learning/family-education' },
  { label: 'Free Resources', href: '/learning/free-resources' },
]

export default function LearningNav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="sticky z-40 bg-white/95 backdrop-blur-sm border-b border-[#E2DDD6]"
      style={{
        top: scrolled ? '3.5rem' : '6.5rem',
        transition: 'top 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/learning'
                ? pathname === '/learning'
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex-shrink-0 px-3 py-3.5 text-xs tracking-[0.08em] font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#0e1a7a] border-[#0e1a7a]'
                    : 'text-[#64748B] border-transparent hover:text-[#0e1a7a] hover:border-[#0e1a7a]/30'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Logo, type LogoName } from '@/components/Logo'

const advisoryLinks = [
  { name: 'Advisory Overview', href: '/advisory', tagline: 'The full system' },
  { name: 'Montessori Mapping', href: '/advisory/mapping', tagline: 'Diagnostic & planning' },
  { name: 'Leadership Coaching', href: '/advisory/coaching', tagline: '1:1 support for leaders' },
  { name: 'Strategic Partnerships', href: '/advisory/partnership', tagline: 'Retained advisory' },
  { name: 'Workshops & Speaking', href: '/advisory/workshops-speaking', tagline: 'Entry point & PD' },
  { name: 'Leadership Transition', href: '/advisory/leadership-transition-support', tagline: 'Succession support' },
  { name: 'Communication Strategy', href: '/advisory/communication-strategy', tagline: 'Systems-level design' },
]

const instituteLinks = [
  { name: 'Institute Overview', href: '/institute', tagline: 'Leadership formation' },
  { name: 'Applied Seminars', href: '/institute/seminars', tagline: 'Half-day & full-day sessions' },
  { name: 'Leadership Intensive', href: '/institute/intensive', tagline: 'Multi-day cohort immersion' },
  { name: 'Leadership Studio', href: '/institute/studio', tagline: 'Monthly peer cohort' },
  { name: 'Leadership Alignment Retreat', href: '/institute/retreat', tagline: 'For leadership teams' },
  { name: 'Leadership Residency', href: '/institute/residency', tagline: '1:1, application-based' },
  { name: 'Course Catalog', href: '/institute/catalog', tagline: 'Dates, pricing & registration' },
]

const speakingLinks = [
  { name: 'Speaking Overview', href: '/advisory/workshops-speaking', tagline: 'Topics, formats & experience' },
  { name: 'Keynotes & Formats', href: '/advisory/workshops-speaking#formats', tagline: 'Keynote · Workshop · Intensive · Panel' },
  { name: 'Workshop Menu', href: '/advisory/workshops-speaking#workshops', tagline: '15 topics, half-day to multi-day' },
  { name: 'Book Hannah', href: '/advisory/workshops-speaking#request-workshop', tagline: 'Inquire about your event' },
]

const mmapLinks = [
  { name: 'MMAP Overview', href: '/mmap', tagline: 'The school operating system' },
  { name: 'Platform Tour', href: '/mmap/tour', tagline: 'See how it works' },
  { name: 'Watch a Demo', href: '/mmap/demo', tagline: 'Full walkthrough videos' },
  { name: 'North Star', href: '/mmap/north-star', tagline: 'Vision & alignment tool' },
  { name: 'Sign In', href: '/mmap/signin', tagline: 'Access the platform' },
]

const matchhubSections = [
  {
    label: 'Open Roles',
    links: [
      { name: 'Browse Open Roles', href: '/matchhub/open-roles', tagline: 'School openings' },
      { name: 'For Guides', href: '/matchhub/guides', tagline: 'How MatchHub works for you' },
      { name: 'Submit a Profile', href: '/matchhub/submit-profile', tagline: 'Free guide profiles' },
    ],
  },
  {
    label: 'Talent Pool',
    links: [
      { name: 'Browse Talent Pool', href: '/matchhub/talent-pool', tagline: 'Curated candidate profiles' },
      { name: 'Post a Role', href: '/matchhub/post-job', tagline: 'Self-serve posting' },
      { name: 'Pricing', href: '/matchhub/pricing', tagline: 'Plans & rates' },
    ],
  },
  {
    label: 'Strategic Search',
    links: [
      { name: 'Strategic Search', href: '/matchhub/strategic-search', tagline: 'Retained, Hannah-led' },
      { name: 'Current Searches', href: '/matchhub/current-searches', tagline: 'Open placements' },
    ],
  },
]

const ecosystemGroups = [
  {
    label: 'School Work',
    links: [
      { name: 'Advisory',  logo: 'advisory'  as LogoName, href: '/advisory',  tagline: 'Consulting & alignment' },
      { name: 'Institute', logo: 'institute' as LogoName, href: '/institute', tagline: 'Leadership formation' },
    ],
  },
  {
    label: 'Platforms',
    links: [
      { name: 'MMAP',     logo: 'mmap'     as LogoName, href: '/mmap',     tagline: 'School operating system' },
      { name: 'MMAS',     logo: 'mmas'     as LogoName, href: '/mmas',     tagline: 'Assessment platform' },
      { name: 'MatchHub', logo: 'matchhub' as LogoName, href: '/matchhub', tagline: 'Montessori hiring' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { name: 'Learning', logo: 'learning' as LogoName, href: '/learning', tagline: 'Curriculum & materials' },
      { name: 'Toolbox',  logo: 'toolbox'  as LogoName, href: '/toolbox',  tagline: 'Templates & frameworks' },
      { name: 'Studio',   logo: 'studio'   as LogoName, href: '/studio',   tagline: 'Web & communication design' },
    ],
  },
]

const allMobileLinks = [
  { name: 'Advisory', href: '/advisory' },
  { name: 'Institute', href: '/institute' },
  { name: 'MMAP', href: '/mmap' },
  { name: 'MMAS', href: '/mmas' },
  { name: 'MatchHub', href: '/matchhub' },
  { name: 'Learning', href: '/learning' },
  { name: 'Toolbox', href: '/toolbox' },
  { name: 'Studio', href: '/studio' },
  { name: 'Field Pulse', href: '/field-intelligence' },
  { name: 'In Community With', href: '/in-community-with' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(250,249,247,0.98)' : 'rgba(250,249,247,0)',
        borderColor: scrolled ? '#D4CEC6' : 'transparent',
        boxShadow: scrolled ? '0 1px 20px rgba(14,26,122,0.07)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-300"
        style={{ height: scrolled ? '3.5rem' : '4rem' }}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logos/mmg.png"
            alt="Montessori Makers Group"
            width={500}
            height={500}
            className="transition-all duration-300 rounded-sm"
            style={{ height: scrolled ? '40px' : '52px', width: 'auto' }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {/* Advisory dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[#64748B] hover:text-[#0e1a7a] text-sm tracking-wide transition-colors">
              Advisory
              <svg className="w-3 h-3 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full pt-3 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white border border-[#E2DDD6] shadow-xl w-[340px] p-4">
                <div className="space-y-0.5">
                  {advisoryLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-3 py-2.5 hover:bg-[#FAF9F7] rounded-sm transition-colors"
                    >
                      <p className="text-[#0e1a7a] text-sm font-medium">{link.name}</p>
                      <p className="text-[#64748B] text-xs mt-0.5">{link.tagline}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#F2EDE6]">
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-[#0e1a7a] text-white text-xs px-4 py-2.5 tracking-wide hover:bg-[#162270] transition-colors font-medium"
                  >
                    Book a Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Institute dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[#64748B] hover:text-[#0e1a7a] text-sm tracking-wide transition-colors">
              Institute
              <svg className="w-3 h-3 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full pt-3 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white border border-[#E2DDD6] shadow-xl w-[320px] p-4">
                <div className="space-y-0.5">
                  {instituteLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-3 py-2.5 hover:bg-[#FAF9F7] rounded-sm transition-colors"
                    >
                      <p className="text-[#0e1a7a] text-sm font-medium">{link.name}</p>
                      <p className="text-[#64748B] text-xs mt-0.5">{link.tagline}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#F2EDE6]">
                  <Link
                    href="/institute/register"
                    className="block w-full text-center bg-[#0e1a7a] text-white text-xs px-4 py-2.5 tracking-wide hover:bg-[#162270] transition-colors font-medium"
                  >
                    Register for a Program
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Speaking dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[#64748B] hover:text-[#0e1a7a] text-sm tracking-wide transition-colors">
              Speaking
              <svg className="w-3 h-3 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full pt-3 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white border border-[#E2DDD6] shadow-xl w-[460px] overflow-hidden flex">
                {/* Links */}
                <div className="flex-1 p-4">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#64748B] mb-3 font-medium px-3">
                    Keynotes & Workshops
                  </p>
                  <div className="space-y-0.5">
                    {speakingLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="block px-3 py-2.5 hover:bg-[#FAF9F7] rounded-sm transition-colors"
                      >
                        <p className="text-[#0e1a7a] text-sm font-medium">{link.name}</p>
                        <p className="text-[#64748B] text-xs mt-0.5">{link.tagline}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 px-3">
                    <Link
                      href="/advisory/workshops-speaking#request-workshop"
                      className="block w-full text-center bg-[#d6a758] text-white text-xs px-4 py-2.5 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
                    >
                      Book Hannah →
                    </Link>
                  </div>
                </div>
                {/* Hannah photo */}
                <div className="w-44 relative flex-shrink-0">
                  <Image
                    src="/images/hannah.jpg"
                    alt="Hannah Richardson"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a7a]/80 via-[#0e1a7a]/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-xs font-semibold leading-tight">Hannah Richardson</p>
                    <p className="text-white/70 text-[10px] mt-0.5 leading-relaxed">AMI USA · BMEF · VMCA · USMI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MMAP dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[#64748B] hover:text-[#0e1a7a] text-sm tracking-wide transition-colors">
              MMAP
              <svg className="w-3 h-3 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full pt-3 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white border border-[#E2DDD6] shadow-xl w-[300px] p-4">
                <div className="space-y-0.5">
                  {mmapLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-3 py-2.5 hover:bg-[#FAF9F7] rounded-sm transition-colors"
                    >
                      <p className="text-[#0e1a7a] text-sm font-medium">{link.name}</p>
                      <p className="text-[#64748B] text-xs mt-0.5">{link.tagline}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#F2EDE6]">
                  <Link
                    href="/mmap/demo"
                    className="block w-full text-center bg-[#0e1a7a] text-white text-xs px-4 py-2.5 tracking-wide hover:bg-[#162270] transition-colors font-medium"
                  >
                    Request a Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* MatchHub dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[#64748B] hover:text-[#0e1a7a] text-sm tracking-wide transition-colors">
              MatchHub
              <svg className="w-3 h-3 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full pt-3 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white border border-[#E2DDD6] shadow-xl w-[300px] p-4">
                <div className="space-y-4">
                  <div>
                    <Link
                      href="/matchhub"
                      className="block px-3 py-2 hover:bg-[#FAF9F7] rounded-sm transition-colors border-b border-[#E2DDD6] mb-2"
                    >
                      <p className="text-[#0e1a7a] text-sm font-semibold">MatchHub Overview</p>
                      <p className="text-[#64748B] text-xs mt-0.5">The Montessori hiring platform</p>
                    </Link>
                  </div>
                  {matchhubSections.map((section) => (
                    <div key={section.label}>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#64748B] mb-1.5 font-medium px-3">
                        {section.label}
                      </p>
                      <div className="space-y-0.5">
                        {section.links.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className="block px-3 py-2 hover:bg-[#FAF9F7] rounded-sm transition-colors"
                          >
                            <p className="text-[#0e1a7a] text-sm font-medium">{link.name}</p>
                            <p className="text-[#64748B] text-xs mt-0.5">{link.tagline}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ecosystem mega dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[#64748B] hover:text-[#0e1a7a] text-sm tracking-wide transition-colors">
              Ecosystem
              <svg className="w-3 h-3 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full pt-3 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white border border-[#E2DDD6] shadow-xl w-[520px] p-6">
                <div className="grid grid-cols-3 gap-6">
                  {ecosystemGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#64748B] mb-3 font-medium">
                        {group.label}
                      </p>
                      <div className="space-y-0.5">
                        {group.links.map((link) => (
                          <Link
                            key={link.name}
                            href={link.href}
                            className="flex items-center gap-2 px-3 py-2.5 hover:bg-[#FAF9F7] rounded-sm transition-colors group/item"
                          >
                            {/* Switch to variant="icon" once /public/logos/icons/ files are added */}
                            <Logo name={link.logo} size={20} className="opacity-50 group-hover/item:opacity-90 transition-opacity flex-shrink-0" />
                            <div>
                              <p className="text-[#0e1a7a] text-sm font-medium">{link.name}</p>
                              <p className="text-[#64748B] text-xs mt-0.5">{link.tagline}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#F2EDE6] flex items-center justify-between">
                  <Link href="/field-intelligence" className="text-[#64748B] text-xs hover:text-[#0e1a7a] transition-colors">
                    Field Pulse →
                  </Link>
                  <Link href="/learning/free-resources" className="text-[#64748B] text-xs hover:text-[#0e1a7a] transition-colors">
                    Free Resources →
                  </Link>
                  <Link href="/in-community-with" className="text-[#64748B] text-xs hover:text-[#0e1a7a] transition-colors">
                    In Community With →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Insights dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[#64748B] hover:text-[#0e1a7a] text-sm tracking-wide transition-colors">
              Insights
              <svg className="w-3 h-3 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full pt-3 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white border border-[#E2DDD6] shadow-xl w-[220px] p-4">
                <div className="space-y-0.5">
                  <Link
                    href="/field-intelligence"
                    className="block px-3 py-2.5 hover:bg-[#FAF9F7] rounded-sm transition-colors"
                  >
                    <p className="text-[#0e1a7a] text-sm font-medium">Field Pulse</p>
                    <p className="text-[#64748B] text-xs mt-0.5">Monthly signal from the field</p>
                  </Link>
                  <a
                    href="https://montessorimakers.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2.5 hover:bg-[#FAF9F7] rounded-sm transition-colors"
                  >
                    <p className="text-[#0e1a7a] text-sm font-medium">Substack</p>
                    <p className="text-[#64748B] text-xs mt-0.5">Long-form analysis & commentary</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* About dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[#64748B] hover:text-[#0e1a7a] text-sm tracking-wide transition-colors">
              About
              <svg className="w-3 h-3 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full pt-3 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white border border-[#E2DDD6] shadow-xl w-[240px] p-4">
                <div className="space-y-0.5">
                  <Link href="/about" className="block px-3 py-2.5 hover:bg-[#FAF9F7] rounded-sm transition-colors">
                    <p className="text-[#0e1a7a] text-sm font-medium">About MMG</p>
                    <p className="text-[#64748B] text-xs mt-0.5">Our story and founder</p>
                  </Link>
                  <Link href="/partners" className="block px-3 py-2.5 hover:bg-[#FAF9F7] rounded-sm transition-colors">
                    <p className="text-[#0e1a7a] text-sm font-medium">Partners</p>
                    <p className="text-[#64748B] text-xs mt-0.5">Organizations we work with</p>
                  </Link>
                  <Link href="/in-community-with" className="block px-3 py-2.5 hover:bg-[#FAF9F7] rounded-sm transition-colors">
                    <p className="text-[#0e1a7a] text-sm font-medium">In Community With</p>
                    <p className="text-[#64748B] text-xs mt-0.5">Organizations we uplift</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:block bg-[#0e1a7a] text-white text-sm px-5 py-2.5 tracking-wide hover:bg-[#162270] transition-colors"
          >
            Work With Us
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#0e1a7a] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E2DDD6] px-6 py-5 max-h-[80vh] overflow-y-auto">
          <div className="space-y-1">
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
              { name: 'Partners', href: '/partners' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2.5 text-[#0e1a7a] text-sm font-semibold tracking-wide border-b border-[#F2EDE6]"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="py-3">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#64748B] mb-3 font-medium">Advisory</p>
              <div className="space-y-0.5 pl-2 border-l-2 border-[#d6a758]">
                {advisoryLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-[#374151] text-sm hover:text-[#0e1a7a] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-3">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#64748B] mb-3 font-medium">Institute</p>
              <div className="space-y-0.5 pl-2 border-l-2 border-[#d6a758]">
                {instituteLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-[#374151] text-sm hover:text-[#0e1a7a] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-3">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#64748B] mb-3 font-medium">Speaking</p>
              <div className="space-y-0.5 pl-2 border-l-2 border-[#d6a758]">
                {speakingLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-[#374151] text-sm hover:text-[#0e1a7a] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-3">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#64748B] mb-3 font-medium">MMAP</p>
              <div className="space-y-0.5 pl-2 border-l-2 border-[#d6a758]">
                {mmapLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-[#374151] text-sm hover:text-[#0e1a7a] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-3">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#64748B] mb-3 font-medium">MatchHub</p>
              <Link
                href="/matchhub"
                className="block py-2 text-[#0e1a7a] text-sm font-semibold hover:underline pl-2 mb-1"
                onClick={() => setMobileOpen(false)}
              >
                MatchHub Overview →
              </Link>
              {matchhubSections.map((section) => (
                <div key={section.label} className="mb-3">
                  <p className="text-[9px] tracking-[0.12em] uppercase text-[#64748B] mb-1 pl-2">{section.label}</p>
                  <div className="space-y-0.5 pl-2 border-l-2 border-[#E2DDD6]">
                    {section.links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="block py-2 text-[#374151] text-sm hover:text-[#0e1a7a] transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="py-3">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#64748B] mb-3 font-medium">The Ecosystem</p>
              <div className="space-y-0.5 pl-2 border-l-2 border-[#d6a758]">
                {allMobileLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-[#374151] text-sm hover:text-[#0e1a7a] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-3">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#64748B] mb-3 font-medium">Insights</p>
              <div className="space-y-0.5 pl-2 border-l-2 border-[#d6a758]">
                <Link
                  href="/field-intelligence"
                  className="block py-2 text-[#374151] text-sm hover:text-[#0e1a7a] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Field Pulse
                </Link>
                <a
                  href="https://montessorimakers.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-[#374151] text-sm hover:text-[#0e1a7a] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Substack
                </a>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Link
                href="/learning/free-resources"
                className="block py-2.5 text-[#64748B] text-sm tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                Free Resources
              </Link>
              <Link
                href="/contact"
                className="block mt-2 bg-[#0e1a7a] text-white text-sm px-5 py-3 text-center tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  )
}

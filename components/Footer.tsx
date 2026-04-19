import Link from 'next/link'
import { CubeIcon } from '@/components/CubeIcon'

const workLinks = [
  { name: 'Advisory', href: '/advisory' },
  { name: 'Institute', href: '/institute' },
  { name: 'Residency', href: '/residency' },
  { name: 'Strategic Search', href: '/matchhub/strategic-search' },
  { name: 'Speaking', href: '/speaking' },
  { name: 'Studio', href: '/studio' },
]

const platformLinks = [
  { name: 'MMAP',                href: '/mmap' },
  { name: 'MMAS',                href: '/mmas' },
  { name: 'MatchHub',            href: '/matchhub' },
  { name: 'Field Guide',         href: '/field-guide' },
  { name: 'Leadership Meridian', href: '/leadership-meridian' },
]

const resourceLinks = [
  { name: 'Field Guide', href: '/field-guide' },
  { name: 'Learning', href: '/learning' },
  { name: 'Toolbox', href: '/toolbox' },
  { name: 'Free Resources', href: '/resources/free' },
  { name: 'Insights', href: '/field-intelligence' },
]

const brandLinks = [
  { name: 'About', href: '/about' },
  { name: 'Partners', href: '/partners' },
  { name: 'Careers', href: '/careers' },
  { name: 'Work With Us', href: '/contact' },
]

const followLinks = [
  { name: 'Substack', href: 'https://montessorimakers.substack.com', external: true },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/montessori-makers-group/', external: true },
  { name: 'Instagram', href: 'https://instagram.com/montessorimakersgroup', external: true },
]

export default function Footer() {
  return (
    <footer className="bg-[#080F19] px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-12">

          {/* Column 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-white font-semibold tracking-widest uppercase text-sm mb-1">MMG</p>
            <p className="text-[#8899AA] text-[10px] tracking-[0.18em] uppercase mb-5">
              Montessori Makers Group
            </p>
            <p className="text-[#7A8FA3] text-sm leading-relaxed mb-4 max-w-xs">
              A strategic ecosystem for Montessori leadership, organizational design, and school alignment.
            </p>
            <p className="text-[#8899AA] text-sm italic leading-relaxed mb-7 max-w-xs">
              &ldquo;Because children experience the organization adults create.&rdquo;
            </p>
            <div className="space-y-2">
              {brandLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-[#7A8FA3] text-sm hover:text-[#CBD5E1] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2 — Work With Us */}
          <div>
            <p className="text-[#8899AA] text-[10px] tracking-[0.18em] uppercase mb-5">
              Work With Us
            </p>
            <ul className="space-y-2.5">
              {workLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#7A8FA3] text-sm hover:text-[#CBD5E1] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Apps & Platforms */}
          <div>
            <p className="text-[#8899AA] text-[10px] tracking-[0.18em] uppercase mb-5">
              Apps &amp; Platforms
            </p>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#7A8FA3] text-sm hover:text-[#CBD5E1] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Resources */}
          <div>
            <p className="text-[#8899AA] text-[10px] tracking-[0.18em] uppercase mb-5">
              Resources
            </p>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#7A8FA3] text-sm hover:text-[#CBD5E1] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 — Contact + Follow */}
          <div>
            <p className="text-[#8899AA] text-[10px] tracking-[0.18em] uppercase mb-5">
              Contact
            </p>
            <div className="space-y-2 mb-8">
              <a
                href="mailto:info@montessorimakers.org"
                className="block text-[#7A8FA3] text-sm hover:text-[#CBD5E1] transition-colors"
              >
                info@montessorimakers.org
              </a>
              <a
                href="tel:7732342412"
                className="block text-[#7A8FA3] text-sm hover:text-[#CBD5E1] transition-colors"
              >
                (773) 234-2412
              </a>
            </div>

            <p className="text-[#8899AA] text-[10px] tracking-[0.18em] uppercase mb-4">
              Follow
            </p>
            <ul className="space-y-2.5">
              {followLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7A8FA3] text-sm hover:text-[#CBD5E1] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Ecosystem strip — cube icons, no backgrounds */}
        <div className="border-t border-[#0E1A2A] pt-12 pb-6 mb-10">
          {/* Heading: #8899AA ≈ 5.2:1 on #080F19 — meets WCAG AA standard */}
          <p className="text-[#8899AA] text-[9px] tracking-[0.22em] uppercase mb-10 text-center">
            Part of the Montessori Makers ecosystem
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 md:gap-x-12">
            {(
              [
                { name: 'Advisory',    href: '/advisory',     gold: true  },
                { name: 'Institute',   href: '/institute',    gold: true  },
                { name: 'Residency',   href: '/residency',    gold: true  },
                { name: 'MMAP',        href: '/mmap',         gold: false },
                { name: 'MMAS',        href: '/mmas',         gold: false },
                { name: 'MatchHub',    href: '/matchhub',     gold: true  },
                { name: 'Field Guide', href: '/field-guide',  gold: false },
                { name: 'Toolbox',     href: '/toolbox',      gold: false },
                { name: 'Learning',    href: '/learning',     gold: false },
                { name: 'Studio',             href: '/studio',              gold: false },
                { name: 'Leadership Meridian', href: '/leadership-meridian', gold: false },
              ]
            ).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-2.5 group"
                title={item.name}
              >
                <div className={`transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1 ${
                  item.gold
                    ? 'opacity-70 group-hover:opacity-100'
                    : 'opacity-50 group-hover:opacity-90'
                }`}>
                  <CubeIcon variant={item.gold ? 'gold' : 'white'} size={36} />
                </div>
                {/*
                  Labels: uniform cool grey treatment for both gold and white items.
                  Default #7A8FA3 ≈ 5.8:1 on #080F19 — comfortable, premium.
                  Hover   #B8C8D6 ≈ 8.2:1 — clearly elevated on interaction.
                  font-medium adds slight weight without feeling heavy.
                */}
                <span className="text-[9px] tracking-[0.18em] uppercase font-medium
                                 text-[#7A8FA3] group-hover:text-[#B8C8D6]
                                 transition-colors duration-200">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#0E1A2A] pt-7 flex flex-col md:flex-row justify-between gap-2">
          <p className="text-[#7A8FA3] text-xs">Montessori Makers Group &copy; 2026</p>
          <div className="flex items-center gap-5">
            <p className="text-[#7A8FA3] text-xs">Leadership. Alignment. Impact.</p>
            <Link href="/admin" className="text-[#3D4F60] text-xs hover:text-[#7A8FA3] transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

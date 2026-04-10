'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/residency/portal', label: 'Dashboard' },
  { href: '/residency/portal/lessons', label: 'My Lessons' },
  { href: '/residency/portal/albums', label: 'Album Entries' },
  { href: '/residency/portal/progress', label: 'Progress' },
]

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="r-sidebar-layout">
      <aside className="r-sidebar">
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--r-text-muted)',
            marginBottom: '0.75rem',
          }}>
            Resident Portal
          </p>
        </div>
        <nav className="r-sidebar-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div style={{ padding: '2rem 1.5rem' }}>
        {children}
      </div>
    </div>
  )
}

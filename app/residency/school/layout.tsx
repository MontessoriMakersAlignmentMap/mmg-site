'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import { supabase } from '@/lib/supabase/client'
import { useMobileNav, MobileNavToggle, MobileOverlay } from '../components/MobileNav'

const navItems = [
  { href: '/residency/school', label: 'Overview' },
  { href: '/residency/school/residents', label: 'Placed Residents' },
]

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, loading } = useResidencyAuth(['school_partner', 'admin'])
  const { open, setOpen, toggle } = useMobileNav()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/residency/auth/login')
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--r-text-muted)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div className="r-sidebar-layout">
      <MobileOverlay open={open} onClose={() => setOpen(false)} />
      <MobileNavToggle open={open} toggle={toggle} />
      <aside className={`r-sidebar${open ? ' open' : ''}`}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--r-text-muted)',
            marginBottom: '0.25rem',
          }}>
            School Partner
          </p>
          {profile && (
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--r-navy)' }}>
              {profile.first_name} {profile.last_name}
            </p>
          )}
        </div>
        <nav className="r-sidebar-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href || (item.href !== '/residency/school' && pathname.startsWith(item.href)) ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--r-border)' }}>
          <button
            onClick={handleSignOut}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--r-text-muted)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              padding: '0.5rem 0.875rem',
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>
      <div style={{ padding: '2rem 1.5rem' }}>
        {children}
      </div>
    </div>
  )
}

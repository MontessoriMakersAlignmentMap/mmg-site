'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import { supabase } from '@/lib/supabase/client'

const navItems = [
  { href: '/residency/portal', label: 'Dashboard' },
  { href: '/residency/portal/lessons', label: 'My Lessons' },
  { href: '/residency/portal/albums', label: 'Album Entries' },
  { href: '/residency/portal/progress', label: 'Progress' },
]

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, loading } = useResidencyAuth(['resident'])

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
      <aside className="r-sidebar">
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--r-text-muted)',
            marginBottom: '0.25rem',
          }}>
            Resident Portal
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
              className={pathname === item.href ? 'active' : ''}
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

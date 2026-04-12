'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useResidencyAuth } from '@/lib/residency/useResidencyAuth'
import { supabase } from '@/lib/supabase/client'

type NavItem = { href: string; label: string } | { section: string }

const navItems: NavItem[] = [
  { href: '/residency/admin', label: 'Overview' },

  { section: 'Pipeline' },
  { href: '/residency/admin/applications', label: 'Applications' },
  { href: '/residency/admin/waitlist', label: 'Waitlist' },
  { href: '/residency/admin/scholarships', label: 'Scholarships' },

  { section: 'Program' },
  { href: '/residency/admin/cohorts', label: 'Cohorts' },
  { href: '/residency/admin/residents', label: 'Residents' },
  { href: '/residency/admin/lessons', label: 'Lessons' },
  { href: '/residency/admin/strands', label: 'Strands & Categories' },
  { href: '/residency/admin/seminars', label: 'Seminars' },
  { href: '/residency/admin/resources', label: 'Resources' },

  { section: 'Progress & Assessment' },
  { href: '/residency/admin/progress', label: 'Progress' },
  { href: '/residency/admin/practicum', label: 'Practicum Hours' },
  { href: '/residency/admin/assessments', label: 'Assessments' },
  { href: '/residency/admin/competencies', label: 'Competencies' },
  { href: '/residency/admin/completion', label: 'Completion' },

  { section: 'Standing & Support' },
  { href: '/residency/admin/standing', label: 'Standing' },
  { href: '/residency/admin/warnings', label: 'Warnings' },
  { href: '/residency/admin/support-plans', label: 'Support Plans' },

  { section: 'Placements & Mentors' },
  { href: '/residency/admin/placements', label: 'Placements' },
  { href: '/residency/admin/placement-matching', label: 'Placement Matching' },
  { href: '/residency/admin/schools', label: 'Schools' },
  { href: '/residency/admin/mentor-applications', label: 'Mentor Applications' },

  { section: 'Feedback & Data' },
  { href: '/residency/admin/surveys', label: 'Surveys' },
  { href: '/residency/admin/lesson-feedback', label: 'Lesson Feedback' },
  { href: '/residency/admin/analytics-dashboard', label: 'Program Dashboard' },
  { href: '/residency/admin/analytics', label: 'Resident Analytics' },
  { href: '/residency/admin/ecosystem', label: 'Ecosystem' },
  { href: '/residency/admin/export', label: 'Export' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, loading } = useResidencyAuth(['admin'])

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
            Admin
          </p>
          <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--r-navy)' }}>
            Program Director
          </p>
        </div>
        <nav className="r-sidebar-nav">
          {navItems.map((item, i) => {
            if ('section' in item) {
              return (
                <p key={i} style={{
                  fontSize: '0.5625rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--r-text-muted)',
                  margin: '1rem 0 0.25rem 0.875rem',
                  opacity: 0.7,
                }}>
                  {item.section}
                </p>
              )
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href || (item.href !== '/residency/admin' && pathname.startsWith(item.href)) ? 'active' : ''}
              >
                {item.label}
              </Link>
            )
          })}
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

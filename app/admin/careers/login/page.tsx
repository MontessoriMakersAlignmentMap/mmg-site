'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CareersAdminLogin() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const res = await fetch('/api/careers/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })

    setLoading(false)

    if (!res.ok) {
      setError('Invalid token.')
      return
    }

    router.push('/admin/careers')
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-2 text-center">
          Montessori Makers Group
        </p>
        <h1 className="text-xl font-semibold text-[#0e1a7a] text-center mb-8"
          style={{ fontFamily: 'var(--font-heading)' }}>
          Careers Admin
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Admin token"
            value={token}
            onChange={e => setToken(e.target.value)}
            className="w-full border border-[#E2DDD6] px-4 py-3 text-sm text-[#374151] focus:outline-none focus:border-[#0e1a7a] bg-white"
            autoFocus
          />
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0e1a7a] text-white text-sm py-3 tracking-wide hover:bg-[#1a2b8a] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

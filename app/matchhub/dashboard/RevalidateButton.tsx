'use client'

import { useState } from 'react'

export function RevalidateButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleClick() {
    setState('loading')
    try {
      const res = await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/matchhub/open-roles' }),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
    setTimeout(() => setState('idle'), 3000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={state === 'loading'}
      className="border border-[#0e1a7a] text-[#0e1a7a] text-xs px-5 py-2 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors disabled:opacity-50"
    >
      {state === 'loading' ? 'Refreshing…' : state === 'done' ? '✓ Listings refreshed' : state === 'error' ? 'Error — try again' : 'Refresh Open Roles →'}
    </button>
  )
}

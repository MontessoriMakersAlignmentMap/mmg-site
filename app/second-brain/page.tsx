'use client'

import { useEffect, useRef, useState } from 'react'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const NAVY = '#0e1a7a'
const GOLD = '#d6a758'
const LIGHT_GOLD = '#f5e8cc'

export default function SecondBrainChat() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('sb_pw') : ''
    if (saved) {
      setPassword(saved)
      setAuthed(true)
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    sessionStorage.setItem('sb_pw', password)
    setAuthed(true)
  }

  async function send(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || busy) return
    const next: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/second-brain/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Chat failed')
      }
      setMessages([...next, { role: 'assistant', content: data.message ?? '(empty response)' }])
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: LIGHT_GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ width: 420, backgroundColor: 'white', padding: 32, borderRadius: 8, border: `2px solid ${NAVY}` }}>
          <h1 style={{ color: NAVY, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>MMG Second Brain</h1>
          <p style={{ color: NAVY, opacity: 0.7, fontSize: 13, marginBottom: 20 }}>
            Your knowledge, compiled. Ask anything.
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 4, marginBottom: 12 }}
            />
            <button
              type="submit"
              style={{ width: '100%', padding: 10, backgroundColor: NAVY, color: 'white', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: LIGHT_GOLD, display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '16px 24px', backgroundColor: NAVY, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>MMG Second Brain</div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>Compiled from your Drive + montessorimakersgroup.org</div>
        </div>
        <a href="/admin/second-brain" style={{ color: GOLD, fontSize: 13, textDecoration: 'underline' }}>
          admin →
        </a>
      </header>

      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 24, maxWidth: 820, width: '100%', margin: '0 auto' }}>
        {messages.length === 0 && (
          <div style={{ color: NAVY, opacity: 0.7, fontSize: 14, textAlign: 'center', marginTop: 64 }}>
            Ask a question grounded in your knowledge base.
            <br />
            <span style={{ fontSize: 12, opacity: 0.7 }}>
              e.g. &ldquo;What are the core Advisory offerings?&rdquo; · &ldquo;Summarize our hiring framework&rdquo;
            </span>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              margin: '12px 0',
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '78%',
                padding: '12px 16px',
                borderRadius: 12,
                backgroundColor: m.role === 'user' ? NAVY : 'white',
                color: m.role === 'user' ? 'white' : NAVY,
                border: m.role === 'user' ? 'none' : `1px solid ${GOLD}`,
                whiteSpace: 'pre-wrap',
                lineHeight: 1.55,
                fontSize: 14,
              }}
            >
              {m.content}
            </div>
          </div>
        ))}

        {busy && (
          <div style={{ margin: '12px 0', fontSize: 13, color: NAVY, opacity: 0.6 }}>thinking…</div>
        )}
        {error && (
          <div style={{ margin: '12px 0', padding: 10, backgroundColor: '#fee', color: '#b91c1c', borderRadius: 4, fontSize: 13 }}>
            {error}
          </div>
        )}
      </div>

      <form
        onSubmit={send}
        style={{
          padding: 16,
          backgroundColor: 'white',
          borderTop: `2px solid ${GOLD}`,
          display: 'flex',
          gap: 8,
          maxWidth: 820,
          width: '100%',
          margin: '0 auto',
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your second brain…"
          style={{ flex: 1, padding: 12, border: `1px solid ${NAVY}`, borderRadius: 8, fontSize: 14 }}
        />
        <button
          type="submit"
          disabled={busy}
          style={{
            padding: '0 20px',
            backgroundColor: GOLD,
            color: NAVY,
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            cursor: busy ? 'not-allowed' : 'pointer',
            opacity: busy ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </form>
    </div>
  )
}

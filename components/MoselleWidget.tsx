'use client'

import { useState, useRef, useEffect } from 'react'

const serif = { fontFamily: 'var(--font-heading)' }

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const GREETING =
  "Welcome. I'm your MMG Guide — here to help you find what you're looking for across the Montessori Makers ecosystem. Are you a school leader looking for support, an educator exploring opportunities, or somewhere else entirely?"

// Gold 3D cube avatar
function CubeAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="#0e1a7a" />
      <polygon points="40,16 62,28 40,40 18,28" fill="#f0c96a" />
      <polygon points="18,28 40,40 40,62 18,50" fill="#b8860b" />
      <polygon points="62,28 62,50 40,62 40,40" fill="#d6a758" />
      <polygon points="40,16 62,28 40,40 18,28" fill="none" stroke="#0e1a7a" strokeWidth="1" strokeLinejoin="round" />
      <polygon points="18,28 40,40 40,62 18,50" fill="none" stroke="#0e1a7a" strokeWidth="1" strokeLinejoin="round" />
      <polygon points="62,28 62,50 40,62 40,40" fill="none" stroke="#0e1a7a" strokeWidth="1" strokeLinejoin="round" />
      <line x1="40" y1="40" x2="40" y2="62" stroke="#0e1a7a" strokeWidth="1" />
    </svg>
  )
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]"
          style={{ animation: 'guideBounce 1.2s infinite', animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

export default function MoselleWidget() {
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  function handleOpen() { setOpen(true) }
  function handleDismiss() { setOpen(false); setDismissed(true) }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      if (!res.ok || !data.message) throw new Error('no message')
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Let me connect you with the team directly — montessorimakersgroup.org/contact' },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (dismissed) return null

  return (
    <>
      <style>{`
        @keyframes guideBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @keyframes guideFadeIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Chat panel */}
        {open && (
          <div
            className="bg-white border border-[#E2DDD6] shadow-2xl flex flex-col"
            style={{ width: 340, height: 480, animation: 'guideFadeIn 0.25s ease', borderRadius: 0 }}
          >
            {/* Header */}
            <div className="bg-[#0e1a7a] px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <CubeAvatar size={36} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight" style={serif}>MMG Guide</p>
                  <p className="text-[#94A3B8] text-[10px] tracking-wide">Navigation Support</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" title="Online" />
                <button
                  onClick={handleDismiss}
                  className="text-white/40 hover:text-white text-lg leading-none ml-2 transition-colors"
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAF9F7]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0 mr-2 mt-1">
                      <CubeAvatar size={24} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2.5 text-sm leading-relaxed break-words ${
                      msg.role === 'user'
                        ? 'bg-[#0e1a7a] text-white'
                        : 'bg-white border border-[#E2DDD6] text-[#374151]'
                    }`}
                    style={{ borderRadius: 0, overflowWrap: 'anywhere' }}
                  >
                    {msg.content.split(/(montessorimakersgroup\.org\/[^\s]*)/g).map((part, j) => {
                      if (!part.startsWith('montessorimakersgroup.org/')) return part
                      const clean = part.replace(/[.,!?]+$/, '')
                      const trailing = part.slice(clean.length)
                      return (
                        <span key={j}>
                          <a href={`https://${clean}`} target="_blank" rel="noopener noreferrer"
                            className="underline underline-offset-2 opacity-80 hover:opacity-100 break-all">
                            {clean}
                          </a>
                          {trailing}
                        </span>
                      )
                    })}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex-shrink-0 mr-2 mt-1">
                    <CubeAvatar size={24} />
                  </div>
                  <div className="bg-white border border-[#E2DDD6]">
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="border-t border-[#E2DDD6] flex items-center px-3 py-3 gap-2 bg-white flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message…"
                disabled={loading}
                className="flex-1 text-sm text-[#374151] placeholder-[#94A3B8] outline-none bg-transparent disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex-shrink-0 bg-[#d6a758] text-white text-xs px-3 py-2 hover:bg-[#c09240] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ borderRadius: 0 }}
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Trigger button — gold so it stands out */}
        {!open && (
          <button
            onClick={handleOpen}
            className="flex items-center gap-2.5 bg-[#d6a758] text-[#0e1a7a] pl-1.5 pr-4 py-1.5 shadow-lg hover:bg-[#c99540] transition-colors"
            style={{ borderRadius: 0 }}
          >
            <div className="rounded-full overflow-hidden border-2 border-[#0e1a7a]/20 flex-shrink-0">
              <CubeAvatar size={32} />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold leading-tight" style={serif}>MMG Guide</p>
              <p className="text-[#0e1a7a]/60 text-[10px] tracking-wide leading-tight">Can I help?</p>
            </div>
          </button>
        )}

      </div>
    </>
  )
}

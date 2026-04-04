'use client'

import { useState, useRef, useEffect } from 'react'

const serif = { fontFamily: 'var(--font-heading)' }

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const GREETING = "Hi, I'm Moselle — I can help you find what you're looking for. Are you a school leader, an educator, or exploring on behalf of a school?"

// Gold 3D cube avatar
function MoselleAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="40" cy="40" r="40" fill="#0e1a7a" />
      {/* Cube — isometric 3-face view */}
      {/* Top face */}
      <polygon points="40,16 62,28 40,40 18,28" fill="#f0c96a" />
      {/* Left face */}
      <polygon points="18,28 40,40 40,62 18,50" fill="#b8860b" />
      {/* Right face */}
      <polygon points="62,28 62,50 40,62 40,40" fill="#d6a758" />
      {/* Edge lines */}
      <polygon points="40,16 62,28 40,40 18,28" fill="none" stroke="#0e1a7a" strokeWidth="1" strokeLinejoin="round" />
      <polygon points="18,28 40,40 40,62 18,50" fill="none" stroke="#0e1a7a" strokeWidth="1" strokeLinejoin="round" />
      <polygon points="62,28 62,50 40,62 40,40" fill="none" stroke="#0e1a7a" strokeWidth="1" strokeLinejoin="round" />
      {/* Center vertical edge */}
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
          style={{
            animation: 'moselleBounce 1.2s infinite',
            animationDelay: `${i * 0.2}s`,
          }}
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
  const [nudge, setNudge] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Show a nudge bubble after 8 seconds if not yet opened
  useEffect(() => {
    if (dismissed) return
    const t = setTimeout(() => setNudge(true), 8000)
    return () => clearTimeout(t)
  }, [dismissed])

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  function handleOpen() {
    setOpen(true)
    setNudge(false)
  }

  function handleDismiss() {
    setOpen(false)
    setDismissed(true)
    setNudge(false)
  }

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
      setMessages(prev => [...prev, { role: 'assistant', content: data.message ?? "I'm not sure — want to reach the team directly? montessorimakersgroup.org/contact" }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong on my end. You can always reach us at montessorimakersgroup.org/contact" }])
    } finally {
      setLoading(false)
    }
  }

  if (dismissed) return null

  return (
    <>
      <style>{`
        @keyframes moselleBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @keyframes moselleFadeIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes moselleNudge {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* Nudge bubble */}
        {nudge && !open && (
          <div
            className="bg-white border border-[#E2DDD6] shadow-lg px-4 py-3 max-w-[220px] text-sm text-[#374151] leading-snug cursor-pointer"
            style={{ animation: 'moselleNudge 0.3s ease', borderRadius: 0 }}
            onClick={handleOpen}
          >
            <span className="font-medium text-[#0e1a7a]">Moselle</span> can help you find what you need →
            <button
              onClick={e => { e.stopPropagation(); setNudge(false) }}
              className="ml-2 text-[#94A3B8] hover:text-[#374151] text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Chat panel */}
        {open && (
          <div
            className="bg-white border border-[#E2DDD6] shadow-2xl flex flex-col"
            style={{
              width: 340,
              height: 480,
              animation: 'moselleFadeIn 0.25s ease',
              borderRadius: 0,
            }}
          >
            {/* Header */}
            <div className="bg-[#0e1a7a] px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <MoselleAvatar size={36} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight" style={serif}>Moselle</p>
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
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0 mr-2 mt-1">
                      <div>
                        <MoselleAvatar size={24} />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#0e1a7a] text-white'
                        : 'bg-white border border-[#E2DDD6] text-[#374151]'
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex-shrink-0 mr-2 mt-1">
                    <div className="rounded-full overflow-hidden border border-[#E2DDD6]">
                      <MoselleAvatar size={24} />
                    </div>
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

        {/* Trigger button */}
        {!open && (
          <button
            onClick={handleOpen}
            className="flex items-center gap-2.5 bg-[#0e1a7a] text-white pl-1.5 pr-4 py-1.5 shadow-lg hover:bg-[#162270] transition-colors group"
            style={{ borderRadius: 0 }}
          >
            <div className="rounded-full overflow-hidden border-2 border-[#d6a758]/60 flex-shrink-0">
              <MoselleAvatar size={32} />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold leading-tight" style={serif}>Moselle</p>
              <p className="text-[#94A3B8] text-[10px] tracking-wide leading-tight">Can I help?</p>
            </div>
          </button>
        )}
      </div>
    </>
  )
}

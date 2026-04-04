'use client'

import { useState, useRef, useEffect } from 'react'

const serif = { fontFamily: 'var(--font-heading)' }

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const GREETING = "Hi, I'm Moselle — I can help you find what you're looking for. Are you a school leader, an educator, or exploring on behalf of a school?"

// Stylized illustrated avatar — warm, professional
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
      {/* Hair — dark, shoulder-length */}
      <ellipse cx="40" cy="26" rx="19" ry="18" fill="#2c1a0e" />
      <path d="M21 30 Q18 50 22 62 Q30 70 40 70 Q50 70 58 62 Q62 50 59 30" fill="#2c1a0e" />
      {/* Neck */}
      <rect x="34" y="52" width="12" height="10" rx="4" fill="#d4a574" />
      {/* Face */}
      <ellipse cx="40" cy="38" rx="16" ry="18" fill="#d4a574" />
      {/* Eyes */}
      <ellipse cx="33.5" cy="35" rx="2.5" ry="2.8" fill="#2c1a0e" />
      <ellipse cx="46.5" cy="35" rx="2.5" ry="2.8" fill="#2c1a0e" />
      {/* Eye shine */}
      <circle cx="34.5" cy="33.8" r="0.9" fill="white" />
      <circle cx="47.5" cy="33.8" r="0.9" fill="white" />
      {/* Eyebrows */}
      <path d="M30 31.5 Q33.5 29.5 37 31" stroke="#2c1a0e" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M43 31 Q46.5 29.5 50 31.5" stroke="#2c1a0e" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* Nose */}
      <path d="M40 37 Q38.5 41 40 43 Q41.5 41 40 37" stroke="#b8845a" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* Smile */}
      <path d="M34 46 Q40 51 46 46" stroke="#b8845a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Shoulders / top of outfit — navy */}
      <path d="M10 80 Q15 62 28 60 Q34 68 40 68 Q46 68 52 60 Q65 62 70 80 Z" fill="#0e1a7a" />
      {/* Collar detail */}
      <path d="M34 62 L40 70 L46 62" stroke="#d6a758" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
                <div className="flex-shrink-0 rounded-full overflow-hidden border-2 border-[#d6a758]/60">
                  <MoselleAvatar size={36} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight" style={serif}>Moselle</p>
                  <p className="text-[#94A3B8] text-[10px] tracking-wide">MMG Guide</p>
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
                      <div className="rounded-full overflow-hidden border border-[#E2DDD6]">
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-white border-b border-[#E2DDD6] px-6 py-2 flex items-center gap-4 text-xs text-[#64748B]">
        <a href="/" className="hover:text-[#0e1a7a] transition-colors">← montessorimakersgroup.org</a>
        <span className="text-[#E2DDD6]">|</span>
        <a href="/admin" className="hover:text-[#0e1a7a] transition-colors">Admin Home</a>
      </div>
      {children}
    </>
  )
}

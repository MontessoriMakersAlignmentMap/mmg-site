const serif = { fontFamily: 'var(--font-heading)' }

function SkeletonCard() {
  return (
    <div className="bg-white border border-[#E2DDD6] flex flex-col animate-pulse">
      <div className="p-7 flex-1 space-y-3">
        <div className="h-2.5 w-16 bg-[#E2DDD6] rounded" />
        <div className="h-5 w-3/4 bg-[#E2DDD6] rounded" />
        <div className="h-3.5 w-1/2 bg-[#E2DDD6] rounded" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-16 bg-[#F2EDE6] rounded" />
          <div className="h-5 w-20 bg-[#F2EDE6] rounded" />
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-full bg-[#E2DDD6] rounded" />
          <div className="h-3 w-5/6 bg-[#E2DDD6] rounded" />
          <div className="h-3 w-2/3 bg-[#E2DDD6] rounded" />
        </div>
      </div>
      <div className="px-7 pb-7 pt-4 border-t border-[#E2DDD6]">
        <div className="h-9 w-full bg-[#E2DDD6] rounded" />
      </div>
    </div>
  )
}

export default function OpenRolesLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl animate-pulse space-y-6">
          <div className="h-2.5 w-32 bg-[#1e2d8a] rounded" />
          <div className="h-14 w-2/3 bg-[#1e2d8a] rounded" />
          <div className="h-5 w-full max-w-lg bg-[#1e2d8a] rounded" />
          <div className="flex gap-4 pt-2">
            <div className="h-12 w-36 bg-[#d6a758]/40 rounded" />
            <div className="h-12 w-44 bg-[#1e2d8a] rounded" />
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="h-3 w-24 bg-[#E2DDD6] rounded animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

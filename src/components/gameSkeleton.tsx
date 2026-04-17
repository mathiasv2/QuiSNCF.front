export function GameSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto animate-pulse">
      <div className="h-12 w-full bg-white/10 rounded-lg" />
      <div className="w-64 h-64 rounded-xl bg-white/10" />
      <div className="h-4 w-40 bg-white/10 rounded-full" />
    </div>
  )
}
interface Props {
  current: number
  max: number
}

export function AttemptTracker({ current, max }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 w-6 rounded-full transition-colors ${
            i < current ? "bg-red-500" : i === current ? "bg-purple-400" : "bg-white/15"
          }`}
        />
      ))}
    </div>
  )
}
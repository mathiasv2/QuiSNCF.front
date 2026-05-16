interface Props {
  name: string
  score: number
}

export function BestLeaderboard({ name, score }: Props) {
  return (
    <div className="relative w-full rounded-2xl bg-parme border-2 border-amber-400/60 px-8 py-7 flex flex-col items-center gap-1.5 overflow-hidden
      before:content-[''] before:absolute before:top-0 before:left-[15%] before:right-[15%] before:h-px before:bg-gradient-to-r before:from-transparent before:via-amber-400/80 before:to-transparent
      after:content-[''] after:absolute after:bottom-0 after:left-[15%] after:right-[15%] after:h-px after:bg-gradient-to-r after:from-transparent after:via-amber-400/80 after:to-transparent">

      <div className="relative mb-1">
        <span className="absolute -bottom-1 -right-1 text-lg leading-none">🏆</span>
      </div>

      <p className="text-amber-600 text-[10px] font-semibold tracking-[0.2em] uppercase">Meilleur score</p>
      <p className="text-aubergine font-bold text-2xl tracking-tight">{name}</p>

      <div className="flex items-baseline gap-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 px-5 py-1.5 mt-1">
        <span className="text-amber-600 font-bold text-lg tabular-nums">{score.toLocaleString()}</span>
        <span className="text-amber-600/50 text-xs font-medium">pts</span>
      </div>
    </div>
  )
}
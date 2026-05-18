import { useBillboard } from "../hooks/useBillboard"
import { BestLeaderboard } from "./bestLeaderboard"


const rankBadgeClass: Record<number, string> = {
  2: "bg-gray-300/30 border-gray-400/35 text-gray-500",
  3: "bg-amber-800/10 border-amber-800/20 text-amber-800/80",
}

export function LeaderBoard() {
  const { billboard, loading, error } = useBillboard()

  if (loading) return <p className="text-center text-white/60 py-10">Chargement...</p>
  if (error)   return <p className="text-center text-red-400 py-10">{error}</p>

  const [first, ...rest] = billboard.slice(0, 20)

  return (
    <div className="flex flex-col items-center gap-5 max-w-md mx-auto px-4">
      {first && <BestLeaderboard name={first.name} score={first.score} />}

      <div className="w-full rounded-2xl bg-parme border border-amber-500/30 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-amber-500/20 flex items-center justify-between">
          <span className="text-aubergine font-bold text-sm tracking-wide">Classement</span>
          <span className="text-amber-600/60 text-[10px] font-semibold uppercase tracking-[0.15em]">
            Top {billboard.length}
          </span>
        </div>

        <ul className="divide-y divide-amber-500/10">
          {rest.map((player, i) => {
            const rank = i + 2
            const isMedal = rank <= 3
            const rankClass = rankBadgeClass[rank] ?? "bg-aubergine/7 border-aubergine/10 text-aubergine/35"

            return (
              <li key={player.name} className={`flex items-center gap-2.5 px-4 py-2.5 transition-colors duration-150
                ${isMedal ? "bg-amber-400/[0.07]" : "hover:bg-amber-400/[0.04]"}`}>

                <div className={`w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[10px] font-bold tabular-nums flex-shrink-0 ${rankClass}`}>
                  {rank}
                </div>

   

                <span className="flex-1 text-aubergine font-medium text-sm truncate">{player.name}</span>

                <div className={`flex items-baseline gap-1 rounded-full px-3 py-0.5 border flex-shrink-0
                  ${isMedal ? "bg-amber-400/18 border-amber-400/32" : "bg-aubergine/5 border-aubergine/8"}`}>
                  <span className={`text-xs font-bold tabular-nums ${isMedal ? "text-amber-700" : "text-aubergine/60"}`}>
                    {player.score.toLocaleString()}
                  </span>
                  <span className={`text-[9px] ${isMedal ? "text-amber-600/45" : "text-aubergine/28"}`}>pts</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
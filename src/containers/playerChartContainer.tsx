import { PlayerChart } from "../components/playerChart"
import { GameSkeleton } from "../components/gameSkeleton"
import { type GameType } from "../enums/gameType"
import { useLeaderboardByPlayer } from "../hooks/useBillboard"

interface Props {
  name: string
  gametype: GameType
}

export function PlayerChartContainer({ name, gametype }: Props) {
  const { billboard, loading, error } = useLeaderboardByPlayer(name, gametype)

  if (loading) return <GameSkeleton />
  if (error)   return <p className="text-red-400 text-center">{error}</p>
  if (billboard.length === 0) return <p className="text-center text-aubergine/50 py-6 text-sm">Aucune donnée disponible.</p>

  console.log(() => billboard)
  return <PlayerChart playerScore={billboard} />
}
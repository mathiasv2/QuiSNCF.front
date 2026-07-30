import { useTotalScore } from "../hooks/useTotalScore"
import { type GameType, GameType as GT } from "../enums/gameType"
import { TotalScoreCard } from "../components/totalScorePlayerCard"

interface Props {
  name: string
  gametype: GameType
}

const GAMETYPE_KEY: Record<GameType, string> = {
  [GT.Station]: "station",
  [GT.Word]:    "word",
  [GT.Display]: "display",
}

export function TotalScoreContainer({ name, gametype }: Props) {
  const { totalScore, loading, error } = useTotalScore(name, gametype)

  if (loading) return (
    <div className="w-full bg-white/50 rounded-2xl px-6 py-4 border border-aubergine/10 animate-pulse">
      <div className="h-5 w-32 bg-aubergine/10 rounded-full" />
    </div>
  )
  if (error || totalScore === null) return null

  return <TotalScoreCard totalScore={totalScore} gametype={GAMETYPE_KEY[gametype]} />
}
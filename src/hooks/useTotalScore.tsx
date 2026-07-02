import { useEffect, useState } from "react"
import { getTotalScoreByPlayerAndGametype } from "../services/playerService"
import { type GameType } from "../enums/gameType"

export function useTotalScore(name: string, gametype: GameType) {
  const [totalScore, setTotalScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!name) return
    getTotalScoreByPlayerAndGametype(name, gametype)
      .then((data) => setTotalScore(Number(data)))
      .catch(() => setError("Impossible de charger le score"))
      .finally(() => setLoading(false))
  }, [name, gametype])

  return { totalScore, loading, error }
}
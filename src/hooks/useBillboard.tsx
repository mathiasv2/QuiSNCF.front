import { useEffect, useState } from "react"
import { getBillboard, getBillboardByGameType, getBillboardByPlayer } from "../services/playerService"
import { GameType } from "../enums/gameType"
import type { Player } from "../models/player"
import type { PlayerScore } from "../models/playerScore"

export function useBillboard() {
  const [billboard, setBillboard] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getBillboard()
      .then(setBillboard)
      .catch(() => setError("Impossible de charger le classement"))
      .finally(() => setLoading(false))
  }, [])

  return { billboard, loading, error }
}

export function useBillboardByGameType(gametype: GameType) {
  const [billboard, setBillboard] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getBillboardByGameType(gametype)
      .then(setBillboard)
      .catch(() => setError("Impossible de charger le classement"))
      .finally(() => setLoading(false))
  }, [gametype])

  return { billboard, loading, error }
}

export function useLeaderboardByPlayer(name: string, gametype: GameType) {
  const [billboard, setBillboard] = useState<PlayerScore[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  if (!name) return                        
  getBillboardByPlayer(name, gametype)
    .then((data: any[]) =>
      setBillboard(data.map((d) => ({
        ...d,
        playedDate: new Date(`${d.playedDate}T12:00:00`), 
      })))
    )
    .catch(() => setError("Impossible de charger le classement"))
    .finally(() => setLoading(false))

}, [name, gametype])   

  return { billboard, loading, error }
}


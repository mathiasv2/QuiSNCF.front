import { useEffect, useState } from "react"
import { getBillboard, getBillboardByGameType } from "../services/playerService"
import { GameType } from "../enums/gameType"
import type { Player } from "../models/player"

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
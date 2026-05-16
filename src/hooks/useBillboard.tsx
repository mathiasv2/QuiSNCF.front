import { useState, useEffect } from "react"
import type { Player } from "../models/player"
import { getBillboard } from "../services/playerService"

export function useBillboard() {
  const [billboard, setBillboard] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getBillboard()
      .then(setBillboard)
      .catch(() => setError("Impossible de charger le leaderboard"))
      .finally(() => setLoading(false))
  }, [])

  return { billboard, loading, error }
}
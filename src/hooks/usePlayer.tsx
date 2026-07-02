import { useState } from "react"
import { postPlayer } from "../services/playerService"
import type { Player } from "../models/player"

interface State {
  loading: boolean
  error: string | null
  success: boolean
  score: number | null
}

export function usePostPlayer() {
  const [state, setState] = useState<State>({
    loading: false,
    error: null,
    success: false,
    score: null,
  })

  const submit = async (player: Player) => {
    setState({ loading: true, error: null, success: false, score: null })

    const result = await postPlayer(player)

    if (result === null) {
      setState({ loading: false, error: "Impossible d'enregistrer le score.", success: false, score: null })
    } else {
      setState({ loading: false, error: null, success: true, score: result })
    }

    return result
  }

  return { submit, ...state }
}
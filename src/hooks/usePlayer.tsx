import { useState } from "react"
import { postPlayer } from "../services/playerService"
import type { Player } from "../models/player"

interface State {
  loading: boolean
  error: string | null
  success: boolean
}

export function usePostPlayer() {
  const [state, setState] = useState<State>({
    loading: false,
    error: null,
    success: false,
  })

  const submit = async (player: Player) => {
    setState({ loading: true, error: null, success: false })

    const result = await postPlayer(player)

    if (result === false) {
      setState({ loading: false, error: "Impossible d'enregistrer le score.", success: false })
    } else {
      setState({ loading: false, error: null, success: true })
    }
  }

  return { submit, ...state }
}

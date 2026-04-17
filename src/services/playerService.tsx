import api from "../api/axiosInstance"
import type { Player } from "../models/player"

export const postPlayer = async (player: Player): Promise<boolean> => {
  try {
    await api.post("player/createPlayer", {
      name: player.name,
      tries: player.tries,
      multiplier: player.multiplier,
    })
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
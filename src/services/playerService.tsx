import api from "../api/axiosInstance"
import type { Player } from "../models/player"

export const postPlayer = async (player: Player): Promise<boolean> => {
  try {
    await api.post("player/createPlayer", {
      name: player.name,
      tries: player.tries,
    })
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}


export const getBillboard = async (): Promise<Player | null> => {
  const response = await api.get("player/getBillboard")
  return response.data;
}

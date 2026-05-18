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


export const getBillboard = async (): Promise<Player[]> => {
  const response = await api.get("player/getBillboard")
  console.log(response)
  return response.data;
}
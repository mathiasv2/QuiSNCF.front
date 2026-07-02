import api from "../api/axiosInstance"
import { GameType } from "../enums/gameType"
import type { Player } from "../models/player"
import type { PlayerScoreRaw } from "../models/playerScore"

const GameTypeParam: Record<GameType, string> = {
  [GameType.Station]: "Station",
  [GameType.Word]: "Word",
}
 

export const postPlayer = async (player: Player): Promise<boolean> => {
  try {
    await api.post("player/createPlayer", {
      name: player.name,
      tries: player.tries,
      gameType: player.gameType
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

export const getBillboardByGameType = async (gametype: GameType): Promise<Player[]> => {
  const reponse = await api.get(`player/getTodayBillboard/${GameTypeParam[gametype]}`)
  console.log(reponse)
  return reponse.data;
}

export const getBillboardByPlayer = async (name: string, gametype: GameType): Promise<PlayerScoreRaw[]> => {
  const response = await api.get(`player/getByName/${name}/${gametype}`)
  return response.data
}

export const getTotalScoreByPlayerAndGametype = async (name: string, gametype: GameType): Promise<Number> => {
  const response = await api.get(`player/total/${name}/${gametype}`)
  return response.data
}
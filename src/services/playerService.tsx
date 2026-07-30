import api from "../api/axiosInstance"
import { GameType } from "../enums/gameType"
import type { Player } from "../models/player"
import type { PlayerScoreRaw } from "../models/playerScore"

const GameTypeParam: Record<GameType, string> = {
  [GameType.Station]: "Station",
  [GameType.Word]: "Word",
  [GameType.Display]: "Display",
}
 

export const postPlayer = async (player: Player): Promise<number | null> => {
  try {
    const response = await api.post("player/createPlayer", {
      name: player.name,
      tries: player.tries,
      gameType: player.gameType,
      proof: player.proof ?? null
    })
    return response.data
  } catch (err) {
    console.error(err)
    return null
  }
}


export const getBillboard = async (): Promise<Player[]> => {
  const response = await api.get("player/getBillboard/0")
  console.log(response)
  return response.data;
}

export const getBillboardByGameType = async (gametype: GameType): Promise<Player[]> => {
  const reponse = await api.get(`player/getBillboardByGameType/${GameTypeParam[gametype]}/0`)
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
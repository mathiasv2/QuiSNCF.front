import api from "../api/axiosInstance"
import { GameType } from "../enums/gameType"
import type { Player } from "../models/player"

const GameTypeParam: Record<GameType, string> = {
  [GameType.Station]: "Station",
  [GameType.Word]: "Word",
}
 

export const postPlayer = async (player: Player): Promise<number | null> => {
  try {
    const response = await api.post("player/createPlayer", {
      name: player.name,
      tries: player.tries,
      gameType: player.gameType
    })
    return response.data
  } catch (err) {
    console.error(err)
    return null
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

// export const getLeaderboardByNameAndGametype = async (name: string, gametype: GameType): Promise<PlayerScore[]> => {
//   const response = await api.get(`player/getbyname/${name}/${GameTypeParam[gametype]}`)
//   return response.data;
// }
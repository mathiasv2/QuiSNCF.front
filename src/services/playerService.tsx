import api from "../api/axiosInstance"
import type { Player } from "../models/player"


export const postPlayer = async (player: Player) => {
    try {
        const response = await api.post(`player/createPlayer`,{
            name: player.name,
            tries: player.tries,
            multiplier: player.multiplier
        })
        return response.data
    } catch(err){
        console.log(err)
        return false
    }
}
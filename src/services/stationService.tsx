import api from "../api/axiosInstance"
import type { Station } from "../models/station"

export const getRandomStation = async (): Promise<Station | null> => {
    const response = await api.get(`station/todaysStation`)
    console.log("API response:", response.data)  
    return response.data
}

export const postInput = async (input: string) => {
    try {
        const response = await api.post(`station/checkinput/${input}`)
        return response.data
    } catch(err){
        console.log(err)
        return false
    }
}
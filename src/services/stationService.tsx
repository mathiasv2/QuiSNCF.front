import api from "../api/axiosInstance"
import type { CityCheckResult } from "../models/checkInputResult"
import type { Station } from "../models/station"

export const getRandomStation = async (): Promise<Station | null> => {
    const response = await api.get(`station/todaysStation`)
    return response.data
}

export const checkStationInput = async (input: string): Promise<CityCheckResult> => {
    try {
        const response = await api.post(`station/checkinput/${encodeURIComponent(input)}`)
        return response.data
    } catch(err){
        console.log(err)
        return { correct: false, cityName: null }
    }
}

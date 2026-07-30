import api from "../api/axiosInstance"
import type { CityCheckResult } from "../models/checkInputResult"
import type { Display } from "../models/displayCity"

export const getTodaysCityDisplay = async (): Promise<Display[] | null> => {
    const response = await api.get(`city/departures`)
    return response.data
}

export const checkCityInput = async (input: string): Promise<CityCheckResult> => {
    try {
        const response = await api.post(`city/checkinput/${input})}`)
        return response.data
    } catch(err){
        console.log(err)
        return { correct: false, cityName: null }
    }
}

import api from "../api/axiosInstance"
import type { Display } from "../models/displayCity"

export const getTodaysCityDisplay = async (name: string): Promise<Display[] | null> => {
    const response = await api.get(`city/departures/${name}`)
    return response.data
}

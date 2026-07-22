import api from "../api/axiosInstance"
import type { Display } from "../models/displayCity"

export const getTodaysCityDisplay = async (): Promise<Display[] | null> => {
    const response = await api.get(`city/departures`)
    return response.data
}

import api from "../api/axiosInstance"
import type { Station } from "../models/station"

export const getRandomStation = async (): Promise<Station | null> => {
    const response = await api.get("/Station/todaysStation")
    return response.data
}


import api from "../api/axiosInstance";
import type { Word } from "../models/word";

export const getRandomWord = async (): Promise<Word | null> => {
  const response = await api.get(`word/todaysWord`)
  return response.data
}

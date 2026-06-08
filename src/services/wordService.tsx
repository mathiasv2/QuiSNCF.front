import api from "../api/axiosInstance";
import type { Word } from "../models/word";

export const getRandomWord = async (): Promise<Word | null> => {
  const response = await api.get(`word/todaysWord`)
  return response.data
}


export const verifyWord = async(word: string) => {
    try {
        const response = await api.get(`word/${word}`)
        console.log(response)
        return response.data
        
    } catch(err){
        console.log(err)
        return true
    }
}
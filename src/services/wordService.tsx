import api from "../api/axiosInstance";
import type { Word } from "../models/word";

export const getRandomWord = async (): Promise<Word | null> => {
  const response = await api.get(`word/todaysWord`)
  return response.data
}


export interface WordCheckResult {
  correct: boolean
  wordName: string | null
  token?: string | null
}

export const checkWordInput = async (input: string, state?: string | null): Promise<WordCheckResult> => {
  try {
    const response = await api.post(`word/checkinput/${encodeURIComponent(input)}`, null, {
      params: state ? { state } : {}
    })
    return response.data
  } catch(err){
    console.log(err)
    return { correct: false, wordName: null }
  }
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
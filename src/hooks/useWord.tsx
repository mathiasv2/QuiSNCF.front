import { useEffect, useState } from "react"
import type { Word } from "../models/word"
import { getRandomWord } from "../services/wordService"

export function useRandomWord(){
    const [word, setWord] = useState<Word | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      getRandomWord()
        .then(setWord)
        .catch(() => setError("Impossible de charger le mot du jour"))
        .finally(() => setLoading(false))
  }, [])
    
  return {word: word?.wordName ?? null, definition: word?.definition , loading, error}
}


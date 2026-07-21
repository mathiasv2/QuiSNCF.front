import { useState, useEffect } from "react"
import type { Display } from "../models/displayCity"
import { getTodaysCityDisplay } from "../services/displayService"

export function useDisplayStation(name: string){
    const [display, setDisplay] = useState<Display[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      getTodaysCityDisplay(name)
        .then(setDisplay)
        .catch(() => setError("Impossible de charger le penneau du jour"))
        .finally(() => setLoading(false))
  }, [])
    
  return {display: display, loading, error}
}
